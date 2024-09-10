import React from 'react';
import ReportActions from '../components/Reportactions';
import '../styles/dao.css';

const ReportDetails = ({ report, comment, onCommentChange, onAddComment, onMarkAsResolved, onEscalate }) => (
  <div className="report-details">
    <h2>Report Details</h2>
    <p><strong>ID:</strong> {report.id.toString()}</p>
    <p><strong>Incident Type:</strong> {report.incident_type}</p>
    <p><strong>Description:</strong> {report.description}</p>
    <p><strong>Date:</strong> {report.date}</p>
    <p><strong>Location:</strong> {report.location}</p>
    <p><strong>Status:</strong> {report.status || 'Pending'}</p>
    <div className="evidence">
      <h3>Evidence</h3>
      {report.evidence ? (
        <img src={report.evidence} alt="Evidence" />
      ) : (
        <p>No evidence available.</p>
      )}
    </div>
    <div className="admin-notes">
      <h3>Admin Notes</h3>
      <p>{report.admin_notes || 'No admin notes available.'}</p>
    </div>
    <ReportActions
      reportId={report.id}
      comment={comment}
      onCommentChange={onCommentChange}
      onAddComment={onAddComment}
      onMarkAsResolved={onMarkAsResolved}
      onEscalate={onEscalate}
    />
  </div>
);

export default ReportDetails;
