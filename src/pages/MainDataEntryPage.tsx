import React, { useState, useEffect } from 'react';
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
import { PatientInfo } from '../types/patientInfoTypes';
import {
  predefinedTests,
  createInitialTests,
  getRecommendedValue,
  getValidation,
  validateInput,
} from '../utils/testData';
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
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    dateOfBirth: '',
    sex: 'Male',
    bloodType: '',
    opdRegNo: '',
    opdDate: '',
    employeeNo: '',
    relationshipWithEmployee: '',
    workplace: '',
    consultant: '',
    labNo: '',
  });
  const [tests, setTests] = useState<ExtendedHealthTestItem[]>([]);
  
  // Doctor details state
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    name: '',
    specialization: '',
    contact: ''
  });
  
  const currentYear = new Date().getFullYear();

  // Update test recommendations when gender changes
  useEffect(() => {
    setTests(prevTests => 
      prevTests.map(test => {
        if (test.isCategory) return test;
        return {
          ...test,
          recommendedValue: getRecommendedValue(test.testName, patientInfo.sex || 'Male')
        };
      })
    );
  }, [patientInfo.sex]);

  const handlePatientInfoChange = (info: PatientInfo) => {
    setPatientInfo(info);
  };

  const handleAddTest = () => {
    const newTest: ExtendedHealthTestItem = {
      id: uuidv4(),
      testName: predefinedTests.find(t => !t.isCategory)?.testName || '',
      actualValue: '',
      recommendedValue: '',
      unit: '',
      isCategory: false,
      validation: { type: 'text', errorMessage: '', pattern: /.*/ },
      error: '',
    };
    setTests([...tests, newTest]);
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
        if (field === 'actualValue' && !test.isCategory) {
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
              recommendedValue: getRecommendedValue(
                selectedTest.testName,
                patientInfo.sex || 'Male'
              ),
              unit: selectedTest.unit || '',
              validation: selectedTest.validation,
              actualValue: '', // Reset actual value when test type changes
              error: '',
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
            patientInfo={patientInfo}
            onPatientInfoChange={handlePatientInfoChange}
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />

          {/* Doctor Information */}
          <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 2 }}>
            Doctor Information
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
            <Box sx={{ p: 1.5, width: { xs: '100%', sm: '33.33%' } }}>
              <TextField
                fullWidth
                id="doctorName"
                label="Doctor Name"
                value={doctorDetails.name}
                onChange={(e) => handleDoctorDetailsChange('name', e.target.value)}
                variant="outlined"
                placeholder="Enter doctor's name"
              />
            </Box>
            
            <Box sx={{ p: 1.5, width: { xs: '100%', sm: '33.33%' } }}>
              <TextField
                fullWidth
                id="doctorSpecialization"
                label="Specialization"
                value={doctorDetails.specialization}
                onChange={(e) => handleDoctorDetailsChange('specialization', e.target.value)}
                variant="outlined"
                placeholder="E.g., Cardiologist, General Physician"
              />
            </Box>
            
            <Box sx={{ p: 1.5, width: { xs: '100%', sm: '33.33%' } }}>
              <TextField
                fullWidth
                id="doctorContact"
                label="Contact Information"
                value={doctorDetails.contact}
                onChange={(e) => handleDoctorDetailsChange('contact', e.target.value)}
                variant="outlined"
                placeholder="Phone number or email"
              />
            </Box>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />

          {/* Test Results Section */}
          <TestResultsSection
            tests={tests}
            predefinedTests={predefinedTests}
            onTestChange={handleTestChange}
            onAddTest={handleAddTest}
            onRemoveTest={handleRemoveTest}
            onTestTypeChange={handleTestTypeChange}
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }} />
          
          {/* Report Generation */}
          <ReportGeneration
            patientInfo={patientInfo}
            tests={tests}
            doctorDetails={doctorDetails}
          />
          
          {/* Footer with copyright */}
          <Box component="footer" sx={pageStyles.footer}>
            &copy; {currentYear} THDC India Ltd. All rights reserved.
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MainDataEntryPage; 