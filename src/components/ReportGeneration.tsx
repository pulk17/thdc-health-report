import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import { PatientInfo } from '../types/patientInfoTypes';
import { generateExcelReport, generatePDFReport } from '../utils/reportUtils';
import { DoctorDetails } from '../pages/MainDataEntryPage';

interface ReportGenerationProps {
  patientInfo: PatientInfo;
  tests: ExtendedHealthTestItem[];
  showPrintView: boolean;
  setShowPrintView: (show: boolean) => void;
  printRef: React.RefObject<HTMLDivElement | null>;
  doctorDetails?: DoctorDetails;
}

const ReportGeneration: React.FC<ReportGenerationProps> = (props) => {
  const { 
    patientInfo,
    tests, printRef, setShowPrintView, doctorDetails
  } = props;
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  
  // Report options with icons and descriptions
  const reportOptions = [
    { 
      id: 'pdf', 
      label: 'Export as PDF', 
      icon: <PictureAsPdfIcon />,
      description: 'Create a printable PDF document'
    },
    { 
      id: 'excel', 
      label: 'Export as Excel', 
      icon: <TableViewIcon />,
      description: 'Create a spreadsheet for data analysis'
    }
  ];

  // Open dropdown menu
  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu item selection
  const handleMenuItemClick = (optionId: string) => {
    if (optionId === 'pdf') {
      generatePDFReport(printRef, setShowPrintView, patientInfo.name || '', doctorDetails);
    } else if (optionId === 'excel') {
      generateExcelReport(patientInfo, tests, doctorDetails);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Report Generation
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <ButtonGroup variant="contained" ref={buttonGroupRef} aria-label="report generation options">
          <Button 
            onClick={() => handleMenuItemClick('pdf')}
            startIcon={<PictureAsPdfIcon />}
            sx={{ width: '180px' }}
          >
            Generate PDF
          </Button>
          
          <Tooltip title="More export options">
            <Button
              size="small"
              aria-controls={open ? 'export-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select report type"
              aria-haspopup="menu"
              onClick={handleDropdownClick}
            >
              <ArrowDropDownIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        
        <Menu
          id="export-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'export-button',
          }}
        >
          {reportOptions.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleMenuItemClick(option.id)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {option.icon}
              <Box>
                {option.label}
                <Typography variant="caption" display="block" color="text.secondary">
                  {option.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default ReportGeneration; 