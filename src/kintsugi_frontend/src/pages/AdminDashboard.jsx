import React, { useState, useEffect } from 'react';
import { kintsugi_backend } from 'declarations/kintsugi_backend';
import '../styles/admin.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [groupedReports, setGroupedReports] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await kintsugi_backend.fetch_reports_handler();
        setReports(fetchedReports);
        groupReportsByPriority(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const groupReportsByPriority = (reports) => {
    const grouped = reports.reduce((acc, report) => {
      const priority = report.priority;
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(report);
      return acc;
    }, {});
    setGroupedReports(grouped);
  };

  const handleMarkAsOngoing = async (id) => {
    try {
      const success = await kintsugi_backend.update_status(id, 'ongoing');
      if (success) {
        setReports(reports.map(report =>
          report.id === id ? { ...report, status: 'ongoing' } : report
        ));
        groupReportsByPriority(reports.map(report =>
          report.id === id ? { ...report, status: 'ongoing' } : report
        ));
      }
    } catch (error) {
      console.error('Error marking report as ongoing:', error);
    }
  };

  const handleMarkAsFinished = async (id) => {
    try {
      const success = await kintsugi_backend.update_status(id, 'finished');
      if (success) {
        setReports(reports.map(report =>
          report.id === id ? { ...report, status: 'finished' } : report
        ));
        groupReportsByPriority(reports.map(report =>
          report.id === id ? { ...report, status: 'finished' } : report
        ));
      }
    } catch (error) {
      console.error('Error marking report as finished:', error);
    }
  };

  return (
    <>
    <Header />
      <div className="container">
      <h1>Admin Dashboard</h1>
      {Object.keys(groupedReports).map(priority => (
        <div key={priority}>
          <h2>Priority {priority}</h2>
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
              {groupedReports[priority].map(report => (
                <tr key={report.id.toString()}>
                  <td>{report.id.toString()}</td>
                  <td>{report.incident_type}</td>
                  <td>{report.description}</td>
                  <td>{report.date}</td>
                  <td>{report.location}</td>
                  <td>{report.status || 'Pending'}</td>
                  <td>
                    {report.status !== 'ongoing' && (
                      <button onClick={() => handleMarkAsOngoing(report.id)}>Mark as Ongoing</button>
                    )}
                    {report.status !== 'finished' && (
                      <button onClick={() => handleMarkAsFinished(report.id)}>Mark as Finished</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
    <Footer />
    </>
   
  );
};

export default AdminDashboard;
