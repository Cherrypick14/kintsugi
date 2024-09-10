use crate::models::Report;
use crate::storage::{
    add_report, fetch_reports, get_report, update_report as storage_update_report,
    add_comments_to_report, flag_report as storage_flag_report, update_evidence, delete_report as storage_delete_report
};
use ic_cdk_macros::*;
use candid::Nat;
use crate::storage::REPORTS;

#[update]
fn create_report(
    incident_type: String,
    description: String,
    date: String,
    location: String,
    priority: String,
    evidence: Option<Vec<String>>
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
    priority: Option<String>
) -> Result<(), String> {
    if storage_update_report(id, incident_type, description, date, location, status, comments, evidence, priority) {
        Ok(())
    } else {
        Err("Failed to update report".into())
    }
}

#[update]
fn delete_report(id: Nat) -> Result<(), String> {
    if storage_delete_report(id) {  // Directly use Nat
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
    // Log input for debugging purposes
    ic_cdk::println!("Attempting to add comments to report with id: {}. Comments: {:?}", id, comments);

    // Try to add the comments to the report
    let success = add_comments_to_report(&id, &comments);  // Pass borrowed references

    if success {
        // Log success
        ic_cdk::println!("Successfully added comments to report with id: {}", id);
        Ok(())
    } else {
        // Log failure
        ic_cdk::println!("Failed to add comments to report with id: {}", id);
        Err(format!("Failed to add comments to report with id: {}", id))
    }
}


#[update]
fn flag_report(id: Nat) -> Result<(), String> {
    if storage_flag_report(id) {  // Directly use Nat
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
