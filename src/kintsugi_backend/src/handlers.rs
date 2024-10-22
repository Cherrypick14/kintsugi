use crate::models::{Report, Group, Proposal, ProposalStatus};
use crate::storage::{
    add_report,
    fetch_reports,
    get_report,
    update_report as storage_update_report,
    add_comments_to_report,
    flag_report as storage_flag_report,
    update_evidence,
    delete_report as storage_delete_report,
    add_group,
    fetch_groups,
    get_group,
    update_group,
    delete_group,
    add_proposal,
    fetch_proposals,
    get_proposal,
    // update_proposal,
    delete_proposal,
    update_proposal_votes,
    add_proposal_comment,
    update_proposal_status,
};
use ic_cdk_macros::*;
use candid::Nat;
use crate::storage::REPORTS;
use std::collections::HashMap;
use chrono::Utc; 


// Handle Report creation

#[update]
fn create_report(
    incident_type: String,
    description: String,
    date: String,
    location: String,
    priority: String,
    evidence: Option<Vec<String>>,
) -> Nat {
    let report = Report {
        id: Nat::from(0u64),
        incident_type,
        description,
        date,
        location,
        priority,
        status: None,
        comments: Vec::new(),
        evidence,
        flagged: false,
        escalated_to_dao: false,
    };
    add_report(report)
}

#[query]
fn get_report_handler(id: Nat) -> Option<Report> {
    get_report(id)
}

#[query]
fn fetch_reports_handler() -> Vec<Report> {
    fetch_reports()
}

#[update]
fn update_report(
    id: Nat,
    incident_type: String,
    description: String,
    date: String,
    location: String,
    status: Option<String>,
    comments: Vec<String>,
    evidence: Option<Vec<String>>,
    priority: Option<String>,
) -> Result<(), String> {
    if storage_update_report(id, incident_type, description, date, location, status, comments, evidence, priority) {
        Ok(())
    } else {
        Err("Failed to update report".into())
    }
}

#[update]
fn delete_report(id: Nat) -> Result<(), String> {
    if storage_delete_report(id) {
        Ok(())
    } else {
        Err("Failed to delete report".into())
    }
}

#[update]
fn update_status(id: Nat, status: String) -> Result<(), String> {
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.status = Some(status);
            Ok(())
        } else {
            Err("Report not found".into())
        }
    })
}

#[update]
fn add_comment(id: Nat, comments: Vec<String>) -> Result<(), String> {
    ic_cdk::println!("Attempting to add comments to report with id: {}. Comments: {:?}", id, comments);
    let success = add_comments_to_report(&id, &comments);

    if success {
        ic_cdk::println!("Successfully added comments to report with id: {}", id);
        Ok(())
    } else {
        ic_cdk::println!("Failed to add comments to report with id: {}", id);
        Err(format!("Failed to add comments to report with id: {}", id))
    }
}

#[update]
fn flag_report(id: Nat) -> Result<(), String> {
    if storage_flag_report(id) {
        Ok(())
    } else {
        Err("Failed to flag report".into())
    }
}

#[update]
fn escalate_to_dao(id: Nat) -> Result<(), String> {
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.escalated_to_dao = true;
            Ok(())
        } else {
            Err("Report not found".into())
        }
    })
}

// -------------------------------- Group and Proposal Handlers -------------------------------- //

// In-memory storage for groups and users
pub struct State {
    pub groups: HashMap<Nat, Group>, // Changed to use Nat for group_id
    pub proposals_counter: u64, // Counter to track proposal IDs
}

impl State {
    pub fn new() -> Self {
        State {
            groups: HashMap::new(),
            proposals_counter: 0,
        }
    }
}

// Initialize state globally
static mut STATE: Option<State> = None;

// Helper function to access state
pub fn get_state() -> &'static mut State {
    unsafe {
        STATE.get_or_insert_with(State::new)
    }
}

// ------------------------------ Group Handlers ------------------------------ //

// Handler to create a group
#[update]
pub fn create_group(
    creator_id: Nat, // Added creator_id to associate group with a creator
    description: String,
    location: String,
    language: String,
) -> Result<Nat, String> {
    let new_group = Group {
        group_id: Nat::from(get_state().groups.len() as u64), // Unique group ID based on current size
        creator_id,
        members: Vec::new(),
        description,
        location,
        shared_experiences: Vec::new(),
        language,
        is_active: true,
    };

    let group_id = add_group(new_group);
    Ok(group_id)
}

// Handler to fetch all groups
#[query]
pub fn get_all_groups() -> Vec<Group> {
    fetch_groups()
}

// Handler to get a specific group by ID
#[query]
pub fn get_group_handler(group_id: Nat) -> Result<Group, String> {
    get_group(&group_id).ok_or_else(|| "Group not found.".to_string())
}

// Handler to delete a group by ID
#[update]
pub fn delete_group_handler(group_id: Nat) -> Result<(), String> {
    if delete_group(&group_id) {
        Ok(())
    } else {
        Err("Group not found.".to_string())
    }
}

// Handler to join a group
#[update]
pub fn join_group(group_id: Nat, user_id: Nat) -> Result<(), String> {
    let mut group = get_group(&group_id).ok_or_else(|| "Group not found.".to_string())?;

    if group.members.contains(&user_id) {
        return Err("User already a member.".to_string());
    }

    group.members.push(user_id);
    
    // Convert boolean to Result
    if update_group(&group_id, group) {
        Ok(())
    } else {
        Err("Failed to update group members.".to_string())
    }
}

// ------------------------------ Proposal Handlers ------------------------------ //

// Handler to submit a proposal
#[update]
pub fn submit_proposal(group_id: Nat, description: String, creator_id: Nat) -> Result<Nat, String> {
    let proposal = Proposal {
        proposal_id: Nat::from(0u64),
        description,
        votes_for: Nat::from(0u64),
        votes_against: Nat::from(0u64),
        creator_id, 
    };

    let proposal_id = add_proposal(proposal);
    Ok(proposal_id)
}

// Handler to fetch all proposals
#[query]
pub fn get_all_proposals() -> Vec<Proposal> {
    fetch_proposals()
}

// Handler to get a specific proposal by ID
#[query]
pub fn get_proposal_handler(proposal_id: Nat) -> Result<Proposal, String> {
    get_proposal(&proposal_id).ok_or_else(|| "Proposal not found.".to_string())
}

// Handler to delete a proposal by ID
#[update]
pub fn delete_proposal_handler(proposal_id: Nat) -> Result<(), String> {
    if delete_proposal(&proposal_id) {
        Ok(())
    } else {
        Err("Proposal not found.".to_string())
    }
}

// Handler to vote on a proposal
#[update]
pub fn vote_on_proposal(proposal_id: Nat, upvote: bool) -> Result<(), String> {
    let mut proposal = get_proposal(&proposal_id).ok_or_else(|| "Proposal not found.".to_string())?;

    if upvote {
        proposal.votes_for += Nat::from(1u64);
    } else {
        proposal.votes_against += Nat::from(1u64); 
    }

    if update_proposal_votes(&proposal_id, proposal.votes_for.clone(), proposal.votes_against.clone()) {
        Ok(())
    } else {
        Err("Failed to update proposal votes.".to_string())
    }
}

// Handler to update proposal status
// #[update]
// pub fn update_proposal_status_handler(proposal_id: Nat, status: ProposalStatus, rationale: Option<String>) -> Result<(), String> {
//     if update_proposal_status(&proposal_id, st) {
//         Ok(())
//     } else {
//         Err("Failed to update proposal status.".to_string())
//     }
// }

// Handler to add a comment to a proposal
#[update]
pub fn add_proposal_comment_handler(proposal_id: Nat, user_id: Nat, comment: String) -> Result<(), String> {
    if add_proposal_comment(&proposal_id, user_id, comment) {
        Ok(())
    } else {
        Err("Failed to add comment.".to_string())
    }
}

// -------------------------------- Helper Functions -------------------------------- //

// Helper to get the current timestamp
fn current_timestamp() -> String {
    format!("{}", chrono::Utc::now().naive_utc())
}
