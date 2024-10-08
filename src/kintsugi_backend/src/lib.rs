mod models;
mod storage;
mod handlers;

// import  necessary crates
use ic_cdk_macros::*;
use crate::storage::{add_report, add_group, add_proposal};
use crate::models::{Report, Group, Proposal, ProposalStatus};
use candid::Nat;
use candid::Principal;

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
    
    // Add the initial report to storage
    add_report(initial_report);
    
    // Sample group initialization
    let initial_group = Group {
        group_id: Nat::from(0u64), // Use Nat for group ID
        name: Some("Sample Group".to_string()), // Group name
        creator_id: Nat::from(1u64), // Creator ID (user)
        members: Vec::new(), // Empty member list initially
        description: "This is a sample group description.".to_string(),
        created_date: "2024-08-14".to_string(),
        location: "Nairobi, Kenya".to_string(),
        shared_experiences: Vec::new(), // No shared experiences yet
        language: "English".to_string(),
        proposals: Vec::new(), // No proposals yet
        avatar_url: None, // No avatar yet
        is_active: true, // Group is active
        last_active: Some("2024-08-14".to_string()), // Last active time
        member_count: 0, // No members yet
        guidelines: Some("Be respectful to others.".to_string()), // Guidelines
        privacy_setting: "Public".to_string(), // Default privacy setting
        events: Vec::new(), // No events
        resources: Vec::new(), // No resources yet
        feedback: Vec::new(), // No feedback yet
    };
    
    // Add the initial group to storage
    let group_id = add_group(initial_group);  

    // Sample proposal initialization
    let initial_proposal = Proposal {
        proposal_id: Nat::from(0u64), // Unique proposal ID
        description: "Sample Proposal Description".to_string(),
        votes_for: Nat::from(0), // No votes in favor yet
        votes_against: Nat::from(0), // No votes against yet
        status: ProposalStatus::Pending, // Initial status is pending
        creator_id: Nat::from(1u64), // Sample creator ID
        created_date: "2024-08-14".to_string(), // Proposal creation date
        comments: Vec::new(), // No comments yet
        rationale: None, // No rationale yet
    };
    
    // Add the initial proposal to storage
    add_proposal(initial_proposal);

   // Thread-local variable for max reports
    thread_local! {
        static MAX_REPORTS: Nat = Nat::from(1000u64); // Maximum reports
    }
}
