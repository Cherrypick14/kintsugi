mod models;
mod storage;
mod handlers;

use ic_cdk_macros::*;
use crate::storage::add_report;
use crate::models::Report;
use candid::Nat;

#[init]
fn init() {
    // Initialize any state if necessary

    let initial_report = Report {
        id: Nat::from(1u64), // Use Nat with u64
        incident_type: "Sample Incident".to_string(),
        description: "This is a sample report.".to_string(),
        date: "2024-08-14".to_string(),
        location: "Nairobi, Kenya".to_string(),
        status: None,
    };

    add_report(initial_report);

    thread_local! {
        static MAX_REPORTS: Nat = Nat::from(1000u64); // Use Nat with u64
    }
}
