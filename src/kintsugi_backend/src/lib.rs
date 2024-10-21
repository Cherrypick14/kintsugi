mod models; // Ensure you have your models module imported
mod storage; // Ensure the storage module is included
mod handlers; // Ensure the handlers module is included

// Import necessary crates
use ic_cdk_macros::*;
use crate::storage::{add_report, add_group, add_proposal};
use crate::models::{Report, Group, Proposal, ProposalStatus};
use candid::{Nat, Principal};

#[init]
fn init() {
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

    // Add the initial report to storage
    add_report(initial_report);

    // Sample group initialization based on the provided structure
    let initial_group = Group {
        group_id: Nat::from(0u64), // Unique ID for the group
        creator_id: Nat::from(1u64), // User ID of the group creator
        members: Vec::new(), // List of user IDs in the group (empty initially)
        description: "This is a sample group description.".to_string(), // Purpose of the group
        location: "Nairobi, Kenya".to_string(), // Location of the group
        shared_experiences: Vec::new(), // Common experiences shared by members
        language: "English".to_string(), // Preferred language for discussions
        is_active: true, // Indicates if the group is active
    };

    // Add the initial group to storage
    add_group(initial_group);

    // Sample proposal initialization
    let initial_proposal = Proposal {
        proposal_id: Nat::from(0u64), // Unique proposal ID
        description: "Sample Proposal Description".to_string(),
        votes_for: Nat::from(0u64), // No votes in favor yet
        votes_against: Nat::from(0u64), // No votes against yet
        creator_id: Nat::from(1u64), // Sample creator ID
    
    };

    // Add the initial proposal to storage
    add_proposal(initial_proposal);

    // Thread-local variable for max reports
    thread_local! {
        static MAX_REPORTS: Nat = Nat::from(1000u64); // Maximum reports
    }
}
