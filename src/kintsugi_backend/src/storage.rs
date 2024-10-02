use std::cell::RefCell;
use crate::models::{Group, Proposal, Report};
use candid::Nat;


// The RefCell is used to allow mutable access in a single-threaded environment


thread_local! {
    // Storage for groups and proposals in the canister
    pub static GROUPS: RefCell<HashMap<Nat, Group>> = RefCell::new(HashMap::new());
    pub static PROPOSALS: RefCell<HashMap<Nat, Proposal>> = RefCell::new(HashMap::new());
    pub static REPORTS: RefCell<Vec<Report>> = RefCell::new(Vec::new());
}

// -------------------------------- Report Storage -------------------------------- //

// Add a report
pub fn add_report(mut report: Report) -> Nat {
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        report.id = Nat::from(reports.len() as u64 + 1); // Convert to Nat
        reports.push(report.clone());
        report.id
    })
}

// Get a report by ID
pub fn get_report(id: Nat) -> Option<Report> {
    REPORTS.with(|reports| reports.borrow().iter().find(|&r| r.id == id).cloned())
}

// Fetch all reports
pub fn fetch_reports() -> Vec<Report> {
    REPORTS.with(|reports| reports.borrow().clone())
}

// Update a report
pub fn update_report(
    id: Nat,  // Changed from u64 to Nat
    incident_type: String,
    description: String,
    date: String,
    location: String,
    status: Option<String>,
    comments: Vec<String>,
    evidence: Option<Vec<String>>,
    priority: Option<String>
) -> bool {
    let mut updated = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.incident_type = incident_type;
            report.description = description;
            report.date = date;
            report.location = location;
            report.status = status;
            report.comments = comments;
            report.evidence = evidence;
            report.priority = priority.unwrap_or_default(); // Use default value if None
            updated = true;
        }
    });
    updated
}

// Delete a report
pub fn delete_report(id: Nat) -> bool {  // Changed from u64 to Nat
    let mut deleted = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(pos) = reports.iter().position(|r| r.id == id) {
            reports.remove(pos);
            deleted = true;
        }
    });
    deleted
}



// Add comments to a report
pub fn add_comments_to_report(id: &Nat, comments: &[String]) -> bool {  // Borrow id
    let mut updated = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        
        // Find the report with the given id and append each comment
        if let Some(report) = reports.iter_mut().find(|r| r.id == *id) {
            for comment in comments {
                report.comments.push(comment.clone());  // Clone the comment to avoid borrowing issues
            }
            updated = true;
        }
    });
    
    updated
}


// Update the evidence URL/path for a report
pub fn update_evidence(id: Nat, evidence: Option<Vec<String>>) -> bool {  // Changed from u64 to Nat
    let mut updated = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.evidence = evidence;  // Corrected line
            updated = true;
        }
    });
    updated
}

// Flag a report (set a flag to true)
pub fn flag_report(id: Nat) -> bool {  // No change needed, already using Nat
    let mut flagged = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.flagged = true; // Assuming 'flagged' is a boolean field in Report
            flagged = true;
        }
    });
    flagged
}

// Escalate a report to DAO
pub fn escalate_to_dao(id: Nat) -> bool {  // No change needed, already using Nat
    let mut escalated = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.escalated_to_dao = true; // Assuming 'escalated_to_dao' is a boolean field in Report
            escalated = true;
        }
    });
    escalated
}

// -------------------------------- End Of Report Storage -------------------------------- //

// -------------------------------- Group Storage -------------------------------- //

// Function to add a new group
pub fn add_group(group: Group) -> Nat {
    GROUPS.with(|groups| {
        let mut groups = groups.borrow_mut();
        let group_id = Nat::from(groups.len() as u64 + 1);
        let mut new_group = group;
        new_group.group_id = group_id.clone();  // Assign the group ID
        new_group.created_date = current_timestamp();  // Assign current timestamp as the creation date
        new_group.member_count = new_group.members.len();  // Initialize member count
        groups.insert(group_id.clone(), new_group);
        group_id
    })
}

// Function to fetch all groups
pub fn fetch_groups() -> Vec<Group> {
    GROUPS.with(|groups| groups.borrow().values().cloned().collect())
}

// Function to get a group by ID
pub fn get_group(id: &Nat) -> Option<Group> {
    GROUPS.with(|groups| groups.borrow().get(id).cloned())
}

// Function to update a group by ID (name, description, location, etc.)
pub fn update_group(id: &Nat, updated_group: Group) -> bool {
    GROUPS.with(|groups| {
        let mut groups = groups.borrow_mut();
        if let Some(group) = groups.get_mut(id) {
            // Update only relevant fields
            group.name = updated_group.name;
            group.description = updated_group.description;
            group.location = updated_group.location;
            group.avatar_url = updated_group.avatar_url;
            group.language = updated_group.language;
            group.privacy_setting = updated_group.privacy_setting;
            group.guidelines = updated_group.guidelines;
            group.is_active = updated_group.is_active;
            group.last_active = updated_group.last_active;

            return true;
        }
        false
    })
}

// Function to delete a group by ID
pub fn delete_group(id: &Nat) -> bool {
    GROUPS.with(|groups| groups.borrow_mut().remove(id).is_some())
}

// Function to update the group member list and member count
pub fn update_group_members(id: &Nat, new_members: Vec<Nat>) -> bool {
    GROUPS.with(|groups| {
        let mut groups = groups.borrow_mut();
        if let Some(group) = groups.get_mut(id) {
            group.members = new_members;
            group.member_count = group.members.len();
            return true;
        }
        false
    })
}
// -------------------------------- End Of Group Storage -------------------------------- //


// -------------------------------- Proposal Storage -------------------------------- //

// Function to add a new proposal
pub fn add_proposal(proposal: Proposal) -> Nat {
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        let proposal_id = Nat::from(proposals.len() as u64 + 1);
        let mut new_proposal = proposal;
        new_proposal.proposal_id = proposal_id.clone();  // Assign the proposal ID
        new_proposal.created_date = current_timestamp();  // Set the proposal's creation date
        proposals.insert(proposal_id.clone(), new_proposal);
        proposal_id
    })
}

// Function to fetch all proposals
pub fn fetch_proposals() -> Vec<Proposal> {
    PROPOSALS.with(|proposals| proposals.borrow().values().cloned().collect())
}

// Function to get a proposal by ID
pub fn get_proposal(id: &Nat) -> Option<Proposal> {
    PROPOSALS.with(|proposals| proposals.borrow().get(id).cloned())
}

// Function to update a proposal (status and rationale)
pub fn update_proposal_status(id: &Nat, status: ProposalStatus, rationale: Option<String>) -> bool {
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        if let Some(proposal) = proposals.get_mut(id) {
            proposal.status = status;
            proposal.rationale = rationale;
            return true;
        }
        false
    })
}

// Function to update proposal votes (votes for and against)
pub fn update_proposal_votes(id: &Nat, votes_for: Nat, votes_against: Nat) -> bool {
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        if let Some(proposal) = proposals.get_mut(id) {
            proposal.votes_for = votes_for;
            proposal.votes_against = votes_against;
            return true;
        }
        false
    })
}

// Function to add comments to a proposal
pub fn add_proposal_comment(id: &Nat, user_id: Nat, comment: String) -> bool {
    PROPOSALS.with(|proposals| {
        let mut proposals = proposals.borrow_mut();
        if let Some(proposal) = proposals.get_mut(id) {
            proposal.comments.push((user_id, comment));
            return true;
        }
        false
    })
}

// Function to delete a proposal by ID
pub fn delete_proposal(id: &Nat) -> bool {
    PROPOSALS.with(|proposals| proposals.borrow_mut().remove(id).is_some())
}

// -------------------------------- End Of Proposal Storage -------------------------------- //


// -------------------------------- Helper Functions -------------------------------- //

// Function to get the current timestamp (pseudo-code, adjust as needed)
fn current_timestamp() -> String {
    // This can be replaced by actual logic to get the current date/time
    format!("{}", chrono::Utc::now().naive_utc())
}