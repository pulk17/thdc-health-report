import React from 'react';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import thdcLogo from '../assets/thdclogo.png';
import hospitalBg from '../assets/hosiptal.png';
import { calculateAge } from '../utils/reportUtils';
import { DoctorDetails } from '../pages/MainDataEntryPage';

interface PrintViewProps {
  name: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  tests: ExtendedHealthTestItem[];
  printRef: React.RefObject<HTMLDivElement | null>;
  doctorDetails?: DoctorDetails;
}

// Styles object for better organization
const styles = {
  container: {
    position: 'absolute' as const,
    left: '-9999px',
    width: '250mm',
    backgroundColor: 'white',
    padding: '20mm',
    boxSizing: 'border-box' as const,
    backgroundImage: `url(${hospitalBg})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'lighten',
    backgroundOpacity: 0.1
  },
  backgroundOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 0
  },
  content: {
    position: 'relative' as const,
    zIndex: 1
  },
  header: {
    width: '100%',
    backgroundColor: '#003366',
    padding: '15px',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: '70px',
    objectFit: 'contain' as const,
    marginRight: '20px'
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '28px'
  },
  sectionHeader: {
    marginTop: '30px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    fontWeight: 'bold' as const
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: '30px'
  },
  infoColumn: {
    width: '48%'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '10px'
  },
  tableHead: {
    backgroundColor: '#f2f2f2'
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left' as const,
    fontWeight: 'bold' as const
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px'
  },
  testResultsSection: {
    marginTop: '40px'
  }
};

const PrintView: React.FC<PrintViewProps> = ({
  name,
  dateOfBirth,
  gender,
  bloodType,
  tests,
  printRef,
  doctorDetails
}) => {
  // Calculate age from date of birth
  const age = dateOfBirth ? `${calculateAge(dateOfBirth)} years` : 'N/A';
  
  // Format gender for display
  const formattedGender = gender === 'male' ? 'Male' : 'Female';
  
  return (
    <div ref={printRef} style={styles.container}>
      {/* Semi-transparent overlay for background */}
      <div style={styles.backgroundOverlay}></div>
      
      {/* Content with higher z-index */}
      <div style={styles.content}>
        {/* Header with logo */}
        <div style={styles.header}>
          <img src={thdcLogo} alt="THDC Logo" style={styles.logo} />
          <h1 style={styles.title}>THDC Health Report</h1>
        </div>
        
        {/* Information Sections Side by Side */}
        <div style={styles.infoContainer}>
          {/* Personal Information Section */}
          <div style={styles.infoColumn}>
            <h2 style={styles.sectionHeader}>Personal Information</h2>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Full Name</td>
                  <td style={styles.tableCell} className="personal-info-value">{name || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Age</td>
                  <td style={styles.tableCell} className="personal-info-value">{age}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Gender</td>
                  <td style={styles.tableCell} className="personal-info-value">{formattedGender}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Blood Type</td>
                  <td style={styles.tableCell} className="personal-info-value">{bloodType || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Doctor Information Section */}
          <div style={styles.infoColumn}>
            <h2 style={styles.sectionHeader}>Doctor Information</h2>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Doctor Name</td>
                  <td style={styles.tableCell} className="doctor-info-value">{doctorDetails?.name || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Specialization</td>
                  <td style={styles.tableCell} className="doctor-info-value">{doctorDetails?.specialization || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Contact</td>
                  <td style={styles.tableCell} className="doctor-info-value">{doctorDetails?.contact || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Test Results Section */}
        <div style={styles.testResultsSection}>
          <h2 style={styles.sectionHeader}>Test Results</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeader}>Test Name</th>
                <th style={styles.tableHeader}>Actual Value</th>
                <th style={styles.tableHeader}>Recommended Value/Range</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td style={styles.tableCell}>{test.testName}</td>
                  <td style={styles.tableCell}>{test.actualValue || 'N/A'}</td>
                  <td style={styles.tableCell}>{test.recommendedValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintView; 