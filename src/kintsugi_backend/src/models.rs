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

#[derive(Serialize, Deserialize, Clone, CandidType)]
pub struct Group {
    pub group_id: Nat,                    // Unique ID for the group using Nat
    pub name: Option<String>,             // Optional name for the group
    pub creator_id: Nat,                  // User ID of the group creator using Nat for anonymity
    pub members: Vec<Nat>,                // List of user IDs in the group using Nat for anonymity
    pub description: String,              // Purpose or mission of the group
    pub created_date: String,             // Date the group was created
    pub location: String,                 // Group location (optional for virtual groups)
    pub shared_experiences: Vec<String>,  // Common experiences shared by group members
    pub language: String,                 // Preferred language for group discussions
    pub proposals: Vec<Proposal>,          // Proposals made by the group
    pub avatar_url: Option<String>,       // Optional URL for group avatar
    pub is_active: bool,                  // Indicates if the group is currently active
    pub last_active: Option<String>,       // Timestamp of the last activity in the group
    pub member_count: usize,               // Number of members in the group
    pub guidelines: Option<String>,        // Group behavior guidelines
    pub privacy_setting: String,           // Privacy setting of the group
    pub events: Vec<Event>,                // Upcoming events associated with the group
    pub resources: Vec<String>,            // Helpful resources for group members
    pub feedback: Vec<Feedback>,           // Feedback from group members
}



#[derive(Serialize, Deserialize, Clone, CandidType)]
pub struct Proposal {
    pub proposal_id: Nat,                          // Unique identifier for the proposal using Nat
    pub description: String,                       // Description of the proposal
    pub votes_for: Nat,                            // Number of votes in favor
    pub votes_against: Nat,                        // Number of votes against
    pub status: ProposalStatus,                     // Current status of the proposal
    pub creator_id: Nat,                           // ID of the user who created the proposal
    pub created_date: String,                       // Date the proposal was created
    pub comments: Vec<(Nat, String)>,              // Comments from users (user_id, comment)
    pub rationale: Option<String>,                  // Rationale for the proposal status
}

#[derive(Serialize, Deserialize, Clone, CandidType)]
pub enum ProposalStatus {
    Pending,                                        // Proposal is awaiting votes
    Approved,                                       // Proposal has been approved by the group
    Rejected,                                       // Proposal has been rejected
}



