use std::cell::RefCell;
use crate::models::Report;
use candid::Nat;
// use num_traits::ToPrimitive;


thread_local! {
    pub static REPORTS: RefCell<Vec<Report>> = RefCell::new(Vec::new());
}

// Function to add a report
pub fn add_report(mut report: Report) -> Nat {
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        report.id = Nat::from(reports.len() as u64 + 1); // Convert to Nat
        reports.push(report.clone());
        report.id
    })
}

// Function to get a report by ID
pub fn get_report(id: Nat) -> Option<Report> {
    REPORTS.with(|reports| reports.borrow().iter().find(|&r| r.id == id).cloned())
}

// Function to fetch all reports
pub fn fetch_reports() -> Vec<Report> {
    REPORTS.with(|reports| reports.borrow().clone())
}

pub fn update_report(id: u64, incident_type: String, description: String, date: String, location: String, status: Option<String>) -> bool {
    let mut updated = false;
    REPORTS.with(|reports| {
        let mut reports = reports.borrow_mut();
        if let Some(report) = reports.iter_mut().find(|r| r.id == id) {
            report.incident_type = incident_type;
            report.description = description;
            report.date = date;
            report.location = location;
            report.status = status;
            updated = true;
        }
    });
    updated
}

pub fn delete_report(id: u64) -> bool {
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

