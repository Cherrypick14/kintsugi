use candid::{candid_method, Nat};
use crate::report::Report;
use crate::report_storage::{add_report, get_report, fetch_reports, update_report, delete_report};

// Add a report
#[candid_method(update)]
pub fn handle_add_report(
    incident_type: String,
    description: String,
    date: String,
    location: String,
    evidence: Option<Vec<String>>,
) -> Nat {
    let report = Report {
        id: Nat::from(0u64), // Use a supported type like u64 // Temporary ID, updated in storage
        incident_type,
        description,
        date,
        location,
        evidence,
        
    };
    add_report(report)
}

// Get a report by ID
#[candid_method(query)]
pub fn handle_get_report(id: Nat) -> Option<Report> {
    get_report(id)
}

// Fetch all reports
#[candid_method(query)]
pub fn handle_fetch_reports() -> Vec<Report> {
    fetch_reports()
}

// Update a report
#[candid_method(update)]
pub fn handle_update_report(
    id: Nat,
    incident_type: String,
    description: String,
    date: String,
    location: String,
    evidence: Option<Vec<String>>,

) -> bool {
    update_report(id, incident_type, description, date, location, evidence)
}

// Delete a report
#[candid_method(update)]
pub fn handle_delete_report(id: Nat) -> bool {
    delete_report(id)
}
