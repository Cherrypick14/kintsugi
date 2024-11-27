pub mod report;
pub mod report_storage;
pub mod report_handlers;

use ic_cdk_macros::*;
use crate::report_storage::add_report;
use crate::report::Report;
use candid::Nat;

#[init]
fn init() {
    // Sample report initialization
    let initial_report = Report {
        id: Nat::from(1u64), // Use Nat with u64
        incident_type: "Sample Incident".to_string(),
        description: "This is a sample report.".to_string(),
        date: "2024-08-14".to_string(),
        location: "Nairobi, Kenya".to_string(),
        evidence: Some(vec!["evidence1.png".to_string()]), // Added evidence
        
    };

    // Add the initial report to storage
    add_report(initial_report);
}