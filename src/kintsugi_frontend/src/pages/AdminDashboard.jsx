import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { kintsugi_backend } from 'declarations/kintsugi_backend';
import '../styles/admin.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [groupedReports, setGroupedReports] = useState({});
  const [comment, setComment] = useState(''); // State for comment input
  const [flagged, setFlagged] = useState(false); // State for flagged status
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [reportsPerPage] = useState(10); // Number of reports per page
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await kintsugi_backend.fetch_reports_handler();
        setReports(fetchedReports);
        groupReportsByPriority(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
        alert('Failed to fetch reports. Please try again later.');
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
        alert('Report marked as ongoing.');
      }
    } catch (error) {
      console.error('Error marking report as ongoing:', error);
      alert('Failed to mark report as ongoing. Please try again later.');
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
        alert('Report marked as finished.');
      }
    } catch (error) {
      console.error('Error marking report as finished:', error);
      alert('Failed to mark report as finished. Please try again later.');
    }
  };

  const handleEscalateToDAO = async (id) => {
    try {
      const success = await kintsugi_backend.escalate_to_dao(id);
      if (success) {
        // Navigate to DAO page
        navigate(`/dao/${id}`);
      }
    } catch (error) {
      console.error('Error escalating report to DAO:', error);
      alert('Failed to escalate report to DAO. Please try again later.');
    }
  };

  const handleAddComment = async (id) => {
    try {
      const success = await kintsugi_backend.add_comment(id, comment);
      if (success) {
        setReports(reports.map(report =>
          report.id === id ? { ...report, comment } : report
        ));
        setComment('');
        alert('Comment added successfully.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again later.');
    }
  };

  const handleFlagReport = async (id) => {
    try {
      const success = await kintsugi_backend.flag_report(id);
      if (success) {
        setReports(reports.map(report =>
          report.id === id ? { ...report, flagged: true } : report
        ));
        setFlagged(false);
        alert('Report flagged successfully.');
      }
    } catch (error) {
      console.error('Error flagging report:', error);
      alert('Failed to flag report. Please try again later.');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.incident_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search reports"
          className="search-input"
        />
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
                  <th>Evidence</th> {/* Added Evidence Column */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map(report => (
                  <tr key={report.id.toString()}>
                    <td>{report.id.toString()}</td>
                    <td>{report.incident_type}</td>
                    <td>{report.description}</td>
                    <td>{report.date}</td>
                    <td>{report.location}</td>
                    <td className={`status ${report.status}`}>{report.status || 'Pending'}</td>
                    <td>
                      {/* Display evidence preview */}
                      {report.evidence && report.evidence.map((file, index) => (
                        <div key={index}>
                          {file.type.startsWith('image/') ? (
                            <img src={file.url} alt={`Evidence ${index}`} className="evidence-preview" />
                          ) : file.type.startsWith('video/') ? (
                            <video controls src={file.url} className="evidence-preview" />
                          ) : (
                            <a href={file.url} target="_blank" rel="noopener noreferrer">View Document</a>
                          )}
                        </div>
                      ))}
                    </td>
                    <td>
                      {report.status !== 'ongoing' && (
                        <button onClick={() => handleMarkAsOngoing(report.id)}>Mark as Ongoing</button>
                      )}
                      {report.status !== 'finished' && (
                        <button onClick={() => handleMarkAsFinished(report.id)}>Mark as Finished</button>
                      )}
                      {report.status === 'finished' && (
                        <button onClick={() => handleEscalateToDAO(report.id)}>Escalate to DAO</button>
                      )}
                      {!report.flagged && (
                        <button onClick={() => handleFlagReport(report.id)}>Flag Report</button>
                      )}
                      <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Add a comment" 
                        rows="3" 
                        className="comment-input"
                      />
                      <button className="comment-button" onClick={() => handleAddComment(report.id)}>Add Comment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
