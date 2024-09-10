import React from 'react';
import '../styles/dao.css';

const ReportActions = ({ reportId, comment, onCommentChange, onAddComment, onMarkAsResolved, onEscalate }) => (
  <div className="report-actions">
    <textarea
      value={comment}
      onChange={onCommentChange}
      placeholder="Add a comment"
      rows="3"
      className="comment-input"
      aria-label="Add a comment"
    />
    <button
      className="comment-button"
      onClick={() => onAddComment(reportId)}
      aria-label="Add Comment"
    >
      Add Comment
    </button>
    {reportId && (
      <>
        {report.status !== 'resolved' && (
          <button
            onClick={() => onMarkAsResolved(reportId)}
            aria-label="Mark as Resolved"
          >
            Mark as Resolved
          </button>
        )}
        <button
          onClick={() => onEscalate(reportId)}
          aria-label="Escalate Further"
        >
          Escalate Further
        </button>
      </>
    )}
  </div>
);

export default ReportActions;
