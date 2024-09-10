use std::cell::RefCell;
use crate::models::Report;
use candid::Nat;

thread_local! {
    pub static REPORTS: RefCell<Vec<Report>> = RefCell::new(Vec::new());
}

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
