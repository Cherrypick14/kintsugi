use serde::{Deserialize, Serialize};
use candid::CandidType;
use candid::Nat;

#[derive(Serialize, Deserialize, Clone, CandidType)]
pub struct Report {
    pub id: Nat,
    pub incident_type: String,
    pub description: String,
    pub date: String,
    pub location: String,
    pub priority: String,           // Add priority field here
    pub status: Option<String>,
    pub comments: Vec<String>,       
    pub evidence: Option<Vec<String>>,
    pub flagged: bool,              
    pub escalated_to_dao: bool,     
}

// Structure for Peer Support Groups
#[derive(Serialize, Deserialize, Clone, CandidType)]
pub struct Group {
    pub group_id: Nat,                      // Unique ID for the group
    pub creator_id: Nat,                    // User ID of the group creator
    pub members: Vec<Nat>,                  // List of user IDs in the group
    pub description: String,                 // Purpose or mission of the group
    pub location: String,                    // Location of the group
    pub shared_experiences: Vec<String>,     // Common experiences shared by members
    pub language: String,                    // Preferred language for discussions
    pub is_active: bool,                     // Indicates if the group is active
}


// Structure for Proposals within the group
#[derive(Serialize, Deserialize, Clone, CandidType)]
pub struct Proposal {
    pub proposal_id: Nat,                    // Unique identifier for the proposal
    pub description: String,                 // Description of the proposal
    pub votes_for: Nat,                      // Votes in favor
    pub votes_against: Nat,                  // Votes against
    pub creator_id: Nat,                     // ID of the user who created the proposal
}

// Enum for Proposal Status
#[derive(Serialize, Deserialize, Clone, CandidType)]
pub enum ProposalStatus {
    Pending,                                  // Proposal awaiting votes
    Approved,                                 // Proposal approved by the group
    Rejected,                                 // Proposal rejected
}



