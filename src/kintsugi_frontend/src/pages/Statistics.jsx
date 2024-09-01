import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCheckCircle, faClock, faShieldAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../styles/statistics.css';
import Header from '../components/Header'; // Ensure the path is correct
import Footer from '../components/Footer'; // Ensure the path is correct

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const data = [
    { label: 'Total Cases Reported', value: 1200, icon: faFileAlt },
    { label: 'Cases Resolved', value: 800, icon: faCheckCircle },
    { label: 'Pending Cases', value: 400, icon: faClock },
    { label: 'Support Centers', value: 50, icon: faShieldAlt },
    { label: 'Volunteers', value: 200, icon: faUsers }
  ];

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'GBV Statistics',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(134, 22, 115, 0.6)',
        borderColor: 'rgba(134, 22, 115, 1)',
        borderWidth: 1
      }
    ]
  };

  const mapCenter = [1.2921, 36.8219]; // Coordinates for Nairobi, Kenya
  const supportCenters = [
    { lat: 1.2921, lng: 36.8219, name: 'Center 1' },
    { lat: 1.3521, lng: 36.8319, name: 'Center 2' }
  ];

  return (
    <div>
      <Header />
      <div className="statistics-container">
        <h2>GBV Platform Statistics</h2>
        <div className="statistics-grid">
          {data.map((item, index) => (
            <div key={index} className="stat-item">
              <FontAwesomeIcon icon={item.icon} className="stat-icon" />
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <div className="chart-container">
          <Bar data={chartData} />
        </div>
        <div className="map-container">
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {supportCenters.map((center, index) => (
              <Marker key={index} position={[center.lat, center.lng]}>
                <Popup>{center.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
