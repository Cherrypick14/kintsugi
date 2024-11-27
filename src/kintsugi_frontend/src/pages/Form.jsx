import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { kintsugi_backend } from 'declarations/kintsugi_backend';
import '../styles/form.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Form = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      incident_type: '',
      description: '',
      date: '',
      location: '',
      priority: 'Medium',  // Default value for priority
    },
    validationSchema: Yup.object({
      incident_type: Yup.string().required('Incident type is required'),
      description: Yup.string().required('Description is required'),
      date: Yup.string().required('Date is required'),
      location: Yup.string().required('Location is required'),
      priority: Yup.string().required('Priority is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Convert evidenceFiles FileList to an array of file names
        const evidence = evidenceFiles.length
          ? Array.from(evidenceFiles).map(file => file.name)
          : null;

        // Call the create_report method from the backend
        const reportId = await kintsugi_backend.create_report(
          values.incident_type,
          values.description,
          values.date,
          values.location,
          values.priority,
          evidence
        );

        setMessage(`Report submitted successfully with ID: ${reportId}`);
        setIsSuccess(true);

        // Reset form and evidence after successful submission
        resetForm();
        setEvidenceFiles([]);

        // Clear file input manually
        document.getElementById('evidence').value = '';

        setTimeout(() => {
          setMessage('');
          setIsSuccess(false);
        }, 3000);
      } catch (error) {
        console.error('Error creating report:', error);
        setMessage('Failed to submit report. Please try again.');
        setIsSuccess(false);

        setTimeout(() => {
          setMessage('');
          setIsSuccess(false);
        }, 3000);
      }
    },
  });

  const handleFileChange = (event) => {
    setEvidenceFiles(event.target.files); // Update evidence files state
  };

  return (
    <>
      <Header />
      <div className="container">
        <section className="report-section">
          <h1 className="section-title">Kintsugi Incident Form</h1>
          <form className="report-form" id="reportForm" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="incident_type">Incident Type:</label>
              <input
                type="text"
                id="incident_type"
                name="incident_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.incident_type}
              />
              {formik.touched.incident_type && formik.errors.incident_type ? (
                <div className="error">{formik.errors.incident_type}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className="error">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="error">{formik.errors.date}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="error">{formik.errors.location}</div>
              ) : null}
            </div>

            {/* Priority Field */}
            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priority}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {formik.touched.priority && formik.errors.priority ? (
                <div className="error">{formik.errors.priority}</div>
              ) : null}
            </div>

            {/* Evidence Upload Section */}
            <div className="form-group">
              <label htmlFor="evidence">Upload Evidence (optional):</label>
              <input
                type="file"
                id="evidence"
                name="evidence"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4,.mp3"
                multiple
                onChange={handleFileChange}
              />
              <small className="file-format-info">
                Accepted file formats: .jpg, .jpeg, .png, .pdf, .doc, .docx, .mp4, .mp3.
                Please upload files that support your report.
              </small>
            </div>

            <button type="submit" className="submit-button">Send</button>
            {message && (
              <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Form;
