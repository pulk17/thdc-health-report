import React from 'react';
import {
  Box,
  Typography,
  Button
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
  // Handle Excel export
  const handleExcelExport = () => {
    generateExcelReport(patientInfo, tests, doctorDetails);
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
    </>
  );
};

export default ReportGeneration; 