import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import { PatientInfo } from '../types/patientInfoTypes';
import { generateExcelReport } from '../utils/reportUtils';
import { DoctorDetails } from '../pages/MainDataEntryPage';

interface ReportGenerationProps {
  patientInfo: PatientInfo;
  tests: ExtendedHealthTestItem[];
  doctorDetails?: DoctorDetails;
}

const ReportGeneration: React.FC<ReportGenerationProps> = ({
  patientInfo,
  tests,
  doctorDetails
}) => {
  const [error, setError] = useState<string | null>(null);

  // Validate required fields
  const validateRequiredFields = (): boolean => {
    const requiredPatientFields: (keyof PatientInfo)[] = [
      'opdRegNo', 'opdDate', 'name', 'dateOfBirth', 'sex', 
      'bloodType', 'employeeNo', 'relationshipWithEmployee', 
      'workplace', 'consultant', 'labNo'
    ];

    const missingFields = requiredPatientFields.filter(field => 
      !patientInfo[field] || patientInfo[field] === ''
    );

    // If doctor details are provided, validate them too
    const requiredDoctorFields: (keyof DoctorDetails)[] = ['name', 'specialization', 'contact'];
    const missingDoctorFields = doctorDetails 
      ? requiredDoctorFields.filter(field => !doctorDetails[field] || doctorDetails[field] === '')
      : [];

    if (missingFields.length > 0 || missingDoctorFields.length > 0) {
      let errorMessage = 'Please fill in all required fields:\n';
      
      if (missingFields.length > 0) {
        errorMessage += `Patient information: ${missingFields.join(', ')}\n`;
      }
      
      if (missingDoctorFields.length > 0) {
        errorMessage += `Doctor information: ${missingDoctorFields.join(', ')}`;
      }
      
      setError(errorMessage);
      return false;
    }

    return true;
  };

  // Handle Excel export
  const handleExcelExport = () => {
    if (validateRequiredFields()) {
      generateExcelReport(patientInfo, tests, doctorDetails);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Report Generation
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Button 
          variant="contained"
          onClick={handleExcelExport}
          startIcon={<TableViewIcon />}
          sx={{ width: '180px' }}
        >
          Export as Excel
        </Button>
      </Box>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', whiteSpace: 'pre-line' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReportGeneration; 