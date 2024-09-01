// src/pages/Form.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { kintsugi_backend } from 'declarations/kintsugi_backend';
import '../styles/styles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Form = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      incident_type: '',
      description: '',
      date: '',
      location: '',
    },
    validationSchema: Yup.object({
      incident_type: Yup.string().required('Incident type is required'),
      description: Yup.string().required('Description is required'),
      date: Yup.string().required('Date is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: async values => {
      try {
        await kintsugi_backend.create_report(
          values.incident_type,
          values.description,
          values.date,
          values.location
        );

        setMessage('Report submitted successfully!');
        setIsSuccess(true);

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
