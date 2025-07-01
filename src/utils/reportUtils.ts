import ExcelJS from 'exceljs';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import { DoctorDetails } from '../pages/MainDataEntryPage';
import { PatientInfo } from '../types/patientInfoTypes';

/**
 * Calculates age from date of birth
 * @param dateOfBirth Date of birth in YYYY-MM-DD format
 * @returns Age in years
 */
export const calculateAge = (dateOfBirth: string): number => {
  if (!dateOfBirth) return 0;
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Generates and downloads an Excel report with proper formatting using ExcelJS
 */
export const generateExcelReport = async (
  patientInfo: PatientInfo,
  tests: ExtendedHealthTestItem[],
  doctorDetails?: DoctorDetails
) => {
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Health Report');
  
  // Set column widths
  worksheet.columns = [
    { width: 30 }, // First column (labels)
    { width: 25 }, // Second column (values)
    { width: 40 }  // Third column (for test results table)
  ];
  
  // Define styles
  const titleStyle = {
    font: { bold: true, size: 16, color: { argb: '000000' } },
    alignment: { horizontal: 'center', vertical: 'middle' },
    border: {
      bottom: { style: 'thin', color: { argb: '00B050' } }
    }
  };
  
  const sectionHeaderStyle = {
    font: { bold: true, size: 12, color: { argb: '000000' } },
    alignment: { horizontal: 'left', vertical: 'middle' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E6E6E6' } } as ExcelJS.FillPattern
  };
  
  const headerLabelStyle = {
    font: { bold: true, size: 11, color: { argb: '000000' } },
    alignment: { horizontal: 'right', vertical: 'middle' }
  };
  
  const valueStyle = {
    font: { size: 11 },
    alignment: { horizontal: 'left', vertical: 'middle' }
  };
  
  const tableHeaderStyle = {
    font: { bold: true, size: 11, color: { argb: '000000' } },
    alignment: { horizontal: 'center', vertical: 'middle' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F2F2' } } as ExcelJS.FillPattern,
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };
  
  const tableValueStyle = {
    font: { size: 11 },
    alignment: { horizontal: 'center', vertical: 'middle' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };
  
  const tableRecommendedStyle = {
    font: { size: 11 },
    alignment: { horizontal: 'left', vertical: 'middle' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };
  
  // Add title
  const titleRow = worksheet.addRow(['THDC Health Report', '', '']);
  worksheet.mergeCells('A1:C1');
  titleRow.height = 30;
  applyStyleToRow(titleRow, titleStyle);
  
  // Add empty row
  worksheet.addRow(['', '', '']);
  
  let currentRow = 3;
  
  // Helper function to add a styled row
  const addStyledRow = (label: string, value: string) => {
    const row = worksheet.addRow([label, value, '']);
    applyStyleToCell(row.getCell(1), headerLabelStyle);
    applyStyleToCell(row.getCell(2), valueStyle);
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber <= 2) {
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: colNumber === 1 ? { style: 'thin' } : undefined,
                right: colNumber === 2 ? { style: 'thin' } : undefined
            };
        }
    });
    currentRow++;
  };
  
  // Add OPD Details section
  const opdHeaderRow = worksheet.addRow(['OPD Details', '', '']);
  worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
  opdHeaderRow.height = 22;
  applyStyleToRow(opdHeaderRow, sectionHeaderStyle);
  currentRow++;
  
  addStyledRow('O.P.D. Reg No.', patientInfo.opdRegNo || 'N/A');
  addStyledRow('OPD Date', patientInfo.opdDate || 'N/A');
  addStyledRow('Consultant', patientInfo.consultant || 'N/A');
  addStyledRow('Lab No.', patientInfo.labNo || 'N/A');
  
  // Add empty row
  worksheet.addRow(['', '', '']);
  currentRow++;
  
  // Add Personal Information section
  const personalInfoHeaderRow = worksheet.addRow([
    'Personal Information',
    '',
    '',
  ]);
  worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
  personalInfoHeaderRow.height = 22;
  applyStyleToRow(personalInfoHeaderRow, sectionHeaderStyle);
  currentRow++;
  
  // Add personal information rows
  addStyledRow('Full Name', patientInfo.name || 'N/A');
  addStyledRow(
    'Age',
    patientInfo.dateOfBirth
      ? `${calculateAge(patientInfo.dateOfBirth)} years`
      : 'N/A'
  );
  addStyledRow('Gender', patientInfo.sex || 'N/A');
  addStyledRow('Blood Type', patientInfo.bloodType || 'N/A');
  addStyledRow('Employee No.', patientInfo.employeeNo || 'N/A');
  addStyledRow(
    'Relationship with Employee',
    patientInfo.relationshipWithEmployee || 'N/A'
  );
  addStyledRow('Workplace', patientInfo.workplace || 'N/A');
  
  // Add empty row
  worksheet.addRow(['', '', '']);
  currentRow++;
  
  // Add doctor information if available
  if (doctorDetails) {
    const doctorInfoHeaderRow = worksheet.addRow(['Doctor Information', '', '']);
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    doctorInfoHeaderRow.height = 22;
    applyStyleToRow(doctorInfoHeaderRow, sectionHeaderStyle);
    currentRow++;
    
    addStyledRow('Doctor Name', doctorDetails.name || 'N/A');
    addStyledRow('Specialization', doctorDetails.specialization || 'N/A');
    addStyledRow('Contact', doctorDetails.contact || 'N/A');
    
    // Add empty row
    worksheet.addRow(['', '', '']);
    currentRow++;
  }
  
  // Add Test Results section
  const testResultsHeaderRow = worksheet.addRow(['Test Results', '', '']);
  worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
  testResultsHeaderRow.height = 22;
  applyStyleToRow(testResultsHeaderRow, sectionHeaderStyle);
  currentRow++;
  
  // Add test results header
  const testHeaderRow = worksheet.addRow([
    'Test Name',
    'Actual Value',
    'Recommended Value/Range',
  ]);
  applyStyleToCell(testHeaderRow.getCell(1), tableHeaderStyle);
  applyStyleToCell(testHeaderRow.getCell(2), tableHeaderStyle);
  applyStyleToCell(testHeaderRow.getCell(3), tableHeaderStyle);
  currentRow++;
  
  // Add test data
  tests.forEach((test) => {
    if (!test.isCategory) {
      const testDataRow = worksheet.addRow([
        test.testName,
        test.actualValue || 'N/A',
        test.recommendedValue,
      ]);
      applyStyleToCell(testDataRow.getCell(1), tableValueStyle);
      applyStyleToCell(testDataRow.getCell(2), tableValueStyle);
      applyStyleToCell(testDataRow.getCell(3), tableRecommendedStyle);
      currentRow++;
    } else {
      // Add category as a header
      const categoryRow = worksheet.addRow([test.testName, '', '']);
      worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
      applyStyleToCell(categoryRow.getCell(1), {
        font: { bold: true, size: 11, color: { argb: '000000' } },
        alignment: { horizontal: 'left', vertical: 'middle' },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F2F2' } } as ExcelJS.FillPattern
      });
      currentRow++;
    }
  });
  
  // Generate filename
  const fileName = `OPD${patientInfo.opdRegNo || 'Unknown'}_${
    patientInfo.name ? patientInfo.name.replace(/\s+/g, '_') : 'Report'
  }_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Save the workbook
  await workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

// Helper function to apply style to an entire row
function applyStyleToRow(row: ExcelJS.Row, style: any) {
  row.eachCell((cell) => {
    applyStyleToCell(cell, style);
  });
}

// Helper function to apply style to a cell
function applyStyleToCell(cell: ExcelJS.Cell, style: any) {
  if (style.font) {
    cell.font = style.font;
  }
  
  if (style.alignment) {
    cell.alignment = style.alignment;
  }
  
  if (style.fill) {
    cell.fill = style.fill;
  }
  
  if (style.border) {
    cell.border = style.border;
  }
} 