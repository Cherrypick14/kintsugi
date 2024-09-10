import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { kintsugi_backend } from 'declarations/kintsugi_backend';
import '../styles/dao.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportDetails from '../components/Reportdetails';
import ReportList from '../components/ReportList';
import Pagination from '../components/Pagination';
import LoadingIndicator from '../components/Loadingindicator';
import ErrorMessage from '../components/Errormessage';

const DAODashboard = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedReports = await kintsugi_backend.fetch_dao_reports();
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching DAO reports:', error);
        setError('Failed to fetch DAO reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchReportDetails = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const detailedReport = await kintsugi_backend.get_report_details(id);
          setSelectedReport(detailedReport);
        } catch (error) {
          console.error('Error fetching report details:', error);
          setError('Failed to fetch report details. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReportDetails();
  }, [id]);

  const handleAddComment = async (reportId) => {
    setError(null);
    try {
      const success = await kintsugi_backend.add_dao_comment(reportId, comment);
      if (success) {
        setReports(reports.map(report =>
          report.id === reportId ? { ...report, comment } : report
        ));
        setComment('');
        alert('Comment added successfully.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again later.');
    }
  };

  const handleMarkAsResolved = async (reportId) => {
    setError(null);
    try {
      const success = await kintsugi_backend.mark_as_resolved(reportId);
      if (success) {
        const deletionSuccess = await kintsugi_backend.delete_report(reportId);
        if (deletionSuccess) {
          setReports(reports.filter(report => report.id !== reportId));
          setSelectedReport(null); // Clear selected report if necessary
          alert('Report marked as resolved and deleted.');
        } else {
          alert('Report marked as resolved, but failed to delete.');
        }
      }
    } catch (error) {
      console.error('Error handling report resolution:', error);
      setError('Failed to mark report as resolved and delete. Please try again later.');
    }
  };
  
  const handleEscalateFurther = async (reportId) => {
    setError(null);
    try {
      const success = await kintsugi_backend.escalate_further(reportId);
      if (success) {
        navigate(`/escalated/${reportId}`);
      }
    } catch (error) {
      console.error('Error escalating report further:', error);
      setError('Failed to escalate report further. Please try again later.');
    }
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  return (
    <>
      <Header />
      <div className="container2">
        <h1>DAO Dashboard</h1>
        {error && <ErrorMessage message={error} />}
        {loading ? (
          <LoadingIndicator />
        ) : selectedReport ? (
          <ReportDetails
            report={selectedReport}
            comment={comment}
            onCommentChange={(e) => setComment(e.target.value)}
            onAddComment={handleAddComment}
            onMarkAsResolved={handleMarkAsResolved}
            onEscalate={handleEscalateFurther}
          />
        ) : (
          <ReportList
            reports={currentReports}
            onViewDetails={(reportId) => navigate(`/dao/${reportId}`)}
            onEscalate={handleEscalateFurther}
          />
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <Footer />
    </>
  );
};

export default DAODashboard;
