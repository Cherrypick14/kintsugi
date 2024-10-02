mod models;
mod storage;
mod handlers;

// import  necessary crates
use ic_cdk_macros::*;
use crate::storage::{add_report, add_group, add_proposal};
use crate::models::{Report, Group, Proposal};
use candid::Nat;

#[init]
fn init() {
    // Initialize any state if necessary
    
    // Sample report initialization
    let initial_report = Report {
        id: Nat::from(1u64), // Use Nat with u64
        incident_type: "Sample Incident".to_string(),
        description: "This is a sample report.".to_string(),
        date: "2024-08-14".to_string(),
        location: "Nairobi, Kenya".to_string(),
        status: None,
        comments: Vec::new(),
        evidence: None,
        flagged: false,            
        escalated_to_dao: false, 
        priority: "medium".to_string(),    
    };

    add_report(initial_report);
    
    // Sample group initialization
    let initial_group = Group {
        id: Nat::from(0u64), 
        name: "Sample Group".to_string(),
        description: "This is a sample group description.".to_string(),
        members: Vec::new(),
        proposals: Vec::new(),
    };
    
    // Add the initial group to storage
    let group_id = add_group(initial_group);  

    // Sample proposal initialization
    let initial_proposal = Proposal {
        id: Nat::from(0u64), 
        description: "Sample Proposal Description".to_string(),
        votes_for: 0,
        votes_against: 0,
        group_id: group_id.clone(), 
        proposer: candid::Principal::anonymous(), 
    };
    
    // Add the initial proposal to storage
    add_proposal(initial_proposal);

   // Thread-local variable for max reports
    thread_local! {
        static MAX_REPORTS: Nat = Nat::from(1000u64); // Use Nat with u64
    }
}
