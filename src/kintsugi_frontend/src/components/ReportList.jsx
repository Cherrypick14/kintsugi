import React from 'react';

import '../styles/dao.css';

const ReportList = ({ reports, onViewDetails, onEscalate }) => (
  <div className="report-list">
    {reports.length > 0 ? (
      <>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Incident Type</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id.toString()}>
                <td>{report.id.toString()}</td>
                <td>{report.incident_type}</td>
                <td>{report.description}</td>
                <td>{report.date}</td>
                <td>{report.location}</td>
                <td className={`status ${report.status}`}>{report.status || 'Pending'}</td>
                <td>
                  <button
                    onClick={() => onViewDetails(report.id)}
                    aria-label={`View details of report ${report.id}`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onEscalate(report.id)}
                    aria-label={`Escalate report ${report.id} further`}
                  >
                    Escalate Further
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <p>No reports available.</p>
    )}
  </div>
);

export default ReportList;
