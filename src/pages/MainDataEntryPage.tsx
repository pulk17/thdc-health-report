import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Grid
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import {
  predefinedTests,
  createInitialTests,
  getRecommendedValue,
  getValidation,
  validateInput
} from '../utils/testData';
import PrintView from '../components/PrintView';
import PersonalInfoForm from '../components/PersonalInfoForm';
import TestResultsSection from '../components/TestResultsSection';
import ReportGeneration from '../components/ReportGeneration';
import hospitalBg from '../assets/hosiptal.png';

// Main page styles
const pageStyles = {
  outerContainer: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%'
  },
  mainContainer: {
    position: 'relative' as const,
    backgroundImage: `url(${hospitalBg})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    marginTop: 4,
    marginBottom: 4,
    padding: 0,
    boxShadow: '0 4px 20px rgba(0, 51, 102, 0.15)',
    borderRadius: 2,
    overflow: 'hidden'
  },
  contentOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    zIndex: 0
  },
  paperStyle: {
    padding: 3,
    backgroundColor: 'transparent',
    position: 'relative' as const,
    zIndex: 1,
    boxShadow: 'none',
    height: '100%'
  },
  footer: {
    width: '100%',
    textAlign: 'center' as const,
    padding: '15px 0',
    backgroundColor: 'white',
    color: '#666',
    fontSize: '0.9rem',
    fontFamily: 'Arial, sans-serif',
    marginTop: 'auto'
  }
};

// Define doctor details interface
export interface DoctorDetails {
  name: string;
  specialization: string;
  contact: string;
}

const MainDataEntryPage: React.FC = () => {
  // Basic state
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [gender, setGender] = useState('male');
  const [tests, setTests] = useState<ExtendedHealthTestItem[]>(createInitialTests('male'));
  const [showPrintView, setShowPrintView] = useState(false);
  
  // Doctor details state
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    name: '',
    specialization: '',
    contact: ''
  });
  
  const printRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  // Update test recommendations when gender changes
  useEffect(() => {
    setTests(prevTests => 
      prevTests.map(test => ({
        ...test,
        recommendedValue: getRecommendedValue(test.testName, gender)
      }))
    );
  }, [gender]);

  // Test management handlers
  const handleAddTest = () => {
    setTests([
      ...tests,
      { 
        id: uuidv4(), 
        testName: predefinedTests[0].testName, 
        actualValue: '', 
        recommendedValue: getRecommendedValue(predefinedTests[0].testName, gender),
        validation: getValidation(predefinedTests[0].testName),
        error: ''
      }
    ]);
  };

  const handleRemoveTest = (id: string) => {
    setTests(tests.filter(test => test.id !== id));
  };

  const handleTestChange = (
    id: string,
    field: keyof Omit<ExtendedHealthTestItem, 'id'>,
    value: string
  ) => {
    setTests(
      tests.map(test => {
        if (test.id !== id) return test;
        
        // Validate input if changing actualValue
        let error = '';
        if (field === 'actualValue') {
          error = validateInput(value, test.validation);
        }
        
        return { ...test, [field]: value, error };
      })
    );
  };

  const handleTestTypeChange = (id: string, index: number) => {
    const selectedTest = predefinedTests[index];
    setTests(
      tests.map(test => 
        test.id === id
          ? {
              ...test,
              testName: selectedTest.testName,
              recommendedValue: getRecommendedValue(selectedTest.testName, gender),
              validation: selectedTest.validation,
              actualValue: '', // Reset actual value when test type changes
              error: ''
            }
          : test
      )
    );
  };

  // Handle doctor details change
  const handleDoctorDetailsChange = (field: keyof DoctorDetails, value: string) => {
    setDoctorDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={pageStyles.outerContainer}>
      <Container component="main" sx={pageStyles.mainContainer}>
        {/* Semi-transparent overlay for background */}
        <Box sx={pageStyles.contentOverlay} />
        
        <Paper elevation={0} sx={pageStyles.paperStyle}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 3 }}>
            THDC Health Report Generator
          </Typography>

          {/* Personal Information Form */}
          <PersonalInfoForm
            name={name}
            setName={setName}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            gender={gender}
            setGender={setGender}
            bloodType={bloodType}
            setBloodType={setBloodType}
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />

          {/* Doctor Information */}
          <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 2 }}>
            Doctor Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                id="doctorName"
                label="Doctor Name"
                value={doctorDetails.name}
                onChange={(e) => handleDoctorDetailsChange('name', e.target.value)}
                variant="outlined"
                placeholder="Enter doctor's name"
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                id="doctorSpecialization"
                label="Specialization"
                value={doctorDetails.specialization}
                onChange={(e) => handleDoctorDetailsChange('specialization', e.target.value)}
                variant="outlined"
                placeholder="E.g., Cardiologist, General Physician"
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                id="doctorContact"
                label="Contact Information"
                value={doctorDetails.contact}
                onChange={(e) => handleDoctorDetailsChange('contact', e.target.value)}
                variant="outlined"
                placeholder="Phone number or email"
              />
            </Grid>
          </Grid>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />

          {/* Test Results Section */}
          <TestResultsSection
            tests={tests}
            predefinedTests={predefinedTests}
            onAddTest={handleAddTest}
            onRemoveTest={handleRemoveTest}
            onTestTypeChange={handleTestTypeChange}
            onTestChange={handleTestChange}
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />
          
          {/* Report Generation */}
          <ReportGeneration
            name={name}
            dateOfBirth={dateOfBirth}
            gender={gender}
            bloodType={bloodType}
            tests={tests}
            showPrintView={showPrintView}
            setShowPrintView={setShowPrintView}
            printRef={printRef}
            doctorDetails={doctorDetails}
          />
          
          {/* Footer with copyright */}
          <Box component="footer" sx={pageStyles.footer}>
            &copy; {currentYear} THDC India Ltd. All rights reserved.
          </Box>
        </Paper>
      </Container>
      
      {/* Hidden Print View for PDF */}
      {showPrintView && (
        <PrintView
          name={name}
          dateOfBirth={dateOfBirth}
          gender={gender}
          bloodType={bloodType}
          tests={tests}
          printRef={printRef}
          doctorDetails={doctorDetails}
        />
      )}
    </Box>
  );
};

export default MainDataEntryPage; 