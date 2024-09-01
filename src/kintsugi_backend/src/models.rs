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
    pub status: Option<String>,
}