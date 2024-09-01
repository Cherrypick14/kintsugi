use crate::models::Report;
use crate::storage::{add_report, fetch_reports, get_report};
use ic_cdk_macros::*;
use candid::Nat;
use crate::storage::REPORTS;
use crate::storage::{update_report as storage_update_report, delete_report as storage_delete_report};
use num_traits::ToPrimitive;
// use num_bigint::BigUint;

#[update]
fn create_report(incident_type: String, description: String, date: String, location: String) -> Nat {
    let report = Report {
        id: Nat::from(0u64), // Initialize with Nat
        incident_type,
        description,
        date,
        location,
        status: None, 
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
fn update_report(id: Nat, incident_type: String, description: String, date: String, location: String,status: Option<String>) -> Result<(), String> {
    let id_biguint = id.0; // Get the internal representation of Nat
    let id_u64 = id_biguint.to_u64().ok_or("Failed to convert ID")?; // Convert BigUint to u64
    storage_update_report(id_u64, incident_type, description, date, location,status);
    Ok(())
}

#[update]
fn delete_report(id: Nat) -> Result<(), String> {
    let id_biguint = id.0; // Get the internal representation of Nat
    let id_u64 = id_biguint.to_u64().ok_or("Failed to convert ID")?; // Convert BigUint to u64
    if storage_delete_report(id_u64) {
        Ok(())
    } else {
        Err("Failed to delete report".into())
    }
}

#[update]
fn update_status(id: Nat, status: String) -> Result<(), String> {
    let id_biguint = id.0.clone();
    let id_u64 = id_biguint.to_u64().ok_or("Failed to convert ID")?;
    
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










































