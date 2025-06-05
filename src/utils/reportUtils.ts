import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { ExtendedHealthTestItem } from '../types/healthReportTypes';
import thdcLogo from '../assets/thdclogo.png';
import hospitalBg from '../assets/hosiptal.png';
import { DoctorDetails } from '../pages/MainDataEntryPage';
import ExcelJS from 'exceljs';

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
  name: string,
  dateOfBirth: string,
  gender: string,
  bloodType: string,
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
  
  // Add Personal Information section
  const personalInfoHeaderRow = worksheet.addRow(['Personal Information', '', '']);
  worksheet.mergeCells('A3:C3');
  personalInfoHeaderRow.height = 22;
  applyStyleToRow(personalInfoHeaderRow, sectionHeaderStyle);
  
  // Add personal information rows
  const nameRow = worksheet.addRow(['Full Name', name || 'N/A', '']);
  applyStyleToCell(nameRow.getCell(1), headerLabelStyle);
  applyStyleToCell(nameRow.getCell(2), valueStyle);
  
  const ageRow = worksheet.addRow(['Age', dateOfBirth ? `${calculateAge(dateOfBirth)} years` : 'N/A', '']);
  applyStyleToCell(ageRow.getCell(1), headerLabelStyle);
  applyStyleToCell(ageRow.getCell(2), valueStyle);
  
  const genderRow = worksheet.addRow(['Gender', gender === 'male' ? 'Male' : 'Female', '']);
  applyStyleToCell(genderRow.getCell(1), headerLabelStyle);
  applyStyleToCell(genderRow.getCell(2), valueStyle);
  
  const bloodTypeRow = worksheet.addRow(['Blood Type', bloodType || 'N/A', '']);
  applyStyleToCell(bloodTypeRow.getCell(1), headerLabelStyle);
  applyStyleToCell(bloodTypeRow.getCell(2), valueStyle);
  
  // Add empty row
  worksheet.addRow(['', '', '']);
  
  let currentRow = 9;
  
  // Add doctor information if available
  if (doctorDetails) {
    const doctorInfoHeaderRow = worksheet.addRow(['Doctor Information', '', '']);
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    doctorInfoHeaderRow.height = 22;
    applyStyleToRow(doctorInfoHeaderRow, sectionHeaderStyle);
    currentRow++;
    
    const doctorNameRow = worksheet.addRow(['Doctor Name', doctorDetails.name || 'N/A', '']);
    applyStyleToCell(doctorNameRow.getCell(1), headerLabelStyle);
    applyStyleToCell(doctorNameRow.getCell(2), valueStyle);
    currentRow++;
    
    const doctorSpecializationRow = worksheet.addRow(['Specialization', doctorDetails.specialization || 'N/A', '']);
    applyStyleToCell(doctorSpecializationRow.getCell(1), headerLabelStyle);
    applyStyleToCell(doctorSpecializationRow.getCell(2), valueStyle);
    currentRow++;
    
    const doctorContactRow = worksheet.addRow(['Contact', doctorDetails.contact || 'N/A', '']);
    applyStyleToCell(doctorContactRow.getCell(1), headerLabelStyle);
    applyStyleToCell(doctorContactRow.getCell(2), valueStyle);
    currentRow++;
    
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
  const testHeaderRow = worksheet.addRow(['Test Name', 'Actual Value', 'Recommended Value/Range']);
  applyStyleToCell(testHeaderRow.getCell(1), tableHeaderStyle);
  applyStyleToCell(testHeaderRow.getCell(2), tableHeaderStyle);
  applyStyleToCell(testHeaderRow.getCell(3), tableHeaderStyle);
  currentRow++;
  
  // Add test data
  tests.forEach(test => {
    const testDataRow = worksheet.addRow([test.testName, test.actualValue || 'N/A', test.recommendedValue]);
    applyStyleToCell(testDataRow.getCell(1), tableValueStyle);
    applyStyleToCell(testDataRow.getCell(2), tableValueStyle);
    applyStyleToCell(testDataRow.getCell(3), tableRecommendedStyle);
    currentRow++;
  });
  
  // Apply borders to all cells in the worksheet to ensure consistent formatting
  for (let i = 1; i <= currentRow; i++) {
    const row = worksheet.getRow(i);
    
    // Skip adding borders to title and empty rows
    if (i !== 1 && i !== 2 && i !== 8 && !(doctorDetails && i === currentRow - tests.length - 2)) {
      // Add borders to cells in info sections
      if ((i >= 3 && i <= 7) || (doctorDetails && i >= 9 && i <= 12)) {
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
      }
    }
  }
  
  // Fix alignment of Blood Type and Contact fields
  if (bloodTypeRow && bloodTypeRow.getCell(2)) {
    worksheet.getColumn(2).width = 25;
  }
  
  // Generate filename
  const fileName = `THDC_Health_Report_${name ? name.replace(/\s+/g, '_') : 'Report'}_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Save the workbook
  await workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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

/**
 * Generates and downloads a PDF report with selectable text
 */
export const generatePDFReport = async (
  printRef: React.RefObject<HTMLDivElement | null>,
  setShowPrintView: (show: boolean) => void,
  name: string,
  doctorDetails?: DoctorDetails
) => {
  try {
    // Show print view temporarily
    setShowPrintView(true);
    
    // Wait for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (printRef.current) {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Load hospital background image
      const bgImg = new Image();
      bgImg.src = hospitalBg;
      
      // Load logo image
      const logoImg = new Image();
      logoImg.src = thdcLogo;
      
      // Wait for images to load
      await Promise.all([
        new Promise<void>((resolve) => {
          bgImg.onload = () => resolve();
          setTimeout(resolve, 1000); // Fallback
        }),
        new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          setTimeout(resolve, 1000); // Fallback
        })
      ]);
      
      // Convert background to base64 with reduced opacity
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = bgImg.width;
      bgCanvas.height = bgImg.height;
      const bgCtx = bgCanvas.getContext('2d');
      
      if (bgCtx) {
        // Draw with reduced opacity (balance between visibility and readability)
        bgCtx.globalAlpha = 0.08; // 8% opacity instead of 5%
        bgCtx.drawImage(bgImg, 0, 0);
        const bgBase64 = bgCanvas.toDataURL('image/png');
        
        // Calculate dimensions to maintain aspect ratio
        const bgAspectRatio = bgImg.width / bgImg.height;
        let bgWidth = pageWidth;
        let bgHeight = bgWidth / bgAspectRatio;
        
        // If height is too large, scale based on height instead
        if (bgHeight > pageHeight) {
          bgHeight = pageHeight;
          bgWidth = bgHeight * bgAspectRatio;
        }
        
        // Calculate position to center the image
        const xOffset = (pageWidth - bgWidth) / 2;
        const yOffset = (pageHeight - bgHeight) / 2;
        
        // Add background image with proper aspect ratio
        doc.addImage(bgBase64, 'PNG', xOffset, yOffset, bgWidth, bgHeight);
      }
      
      // Convert logo to base64
      const logoCanvas = document.createElement('canvas');
      const logoWidth = logoImg.width;
      const logoHeight = logoImg.height;
      logoCanvas.width = logoWidth;
      logoCanvas.height = logoHeight;
      const logoCtx = logoCanvas.getContext('2d');
      
      if (logoCtx) {
        logoCtx.drawImage(logoImg, 0, 0);
        const logoBase64 = logoCanvas.toDataURL('image/png');
        
        // Calculate aspect ratio to prevent squashing
        const logoAspectRatio = logoWidth / logoHeight;
        const targetWidth = 40;
        const targetHeight = targetWidth / logoAspectRatio;
        
        // Add logo with proper aspect ratio
        doc.addImage(logoBase64, 'PNG', 14, 10, targetWidth, targetHeight);
      }
      
      // Add title next to the logo
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('THDC Health Report', 60, 25);
      
      // Get values from the PrintView - updating selectors for the new table-based structure
      const tables = printRef.current.querySelectorAll('table');
      const personalInfoRows: Array<[string, string]> = [];
      
      // The first table is Personal Information
      if (tables.length >= 1) {
        const personalInfoTable = tables[0];
        const personalInfoTableRows = personalInfoTable.querySelectorAll('tr');
        
        const fullNameCell = personalInfoTableRows[0]?.querySelector('td:nth-child(2)');
        const ageCell = personalInfoTableRows[1]?.querySelector('td:nth-child(2)');
        const genderCell = personalInfoTableRows[2]?.querySelector('td:nth-child(2)');
        const bloodTypeCell = personalInfoTableRows[3]?.querySelector('td:nth-child(2)');
        
        personalInfoRows.push(['Full Name', fullNameCell?.textContent || 'N/A']);
        personalInfoRows.push(['Age', ageCell?.textContent || 'N/A']);
        personalInfoRows.push(['Gender', genderCell?.textContent || 'N/A']);
        personalInfoRows.push(['Blood Type', bloodTypeCell?.textContent || 'N/A']);
      } else {
        // Fallback if table not found
        personalInfoRows.push(['Full Name', name || 'N/A']);
        personalInfoRows.push(['Age', 'N/A']);
        personalInfoRows.push(['Gender', 'N/A']);
        personalInfoRows.push(['Blood Type', 'N/A']);
      }
      
      // Extract doctor information if available (second table)
      const doctorInfoRows: Array<[string, string]> = [];
      if (tables.length >= 2) {
        const doctorInfoTable = tables[1];
        const doctorInfoTableRows = doctorInfoTable.querySelectorAll('tr');
        
        const doctorNameCell = doctorInfoTableRows[0]?.querySelector('td:nth-child(2)');
        const doctorSpecializationCell = doctorInfoTableRows[1]?.querySelector('td:nth-child(2)');
        const doctorContactCell = doctorInfoTableRows[2]?.querySelector('td:nth-child(2)');
        
        // Remove the condition that checks if doctorName is not 'N/A' to ensure doctor info is always included when available
        doctorInfoRows.push(['Doctor Name', doctorNameCell?.textContent || 'N/A']);
        doctorInfoRows.push(['Specialization', doctorSpecializationCell?.textContent || 'N/A']);
        doctorInfoRows.push(['Contact', doctorContactCell?.textContent || 'N/A']);
      } else if (doctorDetails) {
        // Fallback if table not found but doctor details are provided
        doctorInfoRows.push(['Doctor Name', doctorDetails.name || 'N/A']);
        doctorInfoRows.push(['Specialization', doctorDetails.specialization || 'N/A']);
        doctorInfoRows.push(['Contact', doctorDetails.contact || 'N/A']);
      }
      
      // Extract test results from the third table
      const testRows: Array<[string, string, string]> = [];
      if (tables.length >= 3) {
        const testTable = tables[2];
        const testTableRows = testTable.querySelectorAll('tr');
        
        // Skip the header row (index 0)
        for (let i = 1; i < testTableRows.length; i++) {
          const row = testTableRows[i];
          const cells = row.querySelectorAll('td');
          
          if (cells.length >= 3) {
            testRows.push([
              cells[0].textContent || 'N/A',
              cells[1].textContent || 'N/A',
              cells[2].textContent || 'N/A'
            ]);
          }
        }
      }
      
      // Add section headers side by side if doctor information exists
      if (doctorInfoRows.length > 0) {
        // Add personal information section header on the left
        doc.setFontSize(16);
        doc.text('Personal Information', 14, 50);
        
        // Add doctor information section header on the right
        doc.text('Doctor Information', 115, 50);
        
        // Add personal information table using the autoTable function (left side)
        autoTable(doc, {
          startY: 55,
          head: [],
          body: personalInfoRows,
          theme: 'grid',
          headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
          styles: { overflow: 'linebreak', cellWidth: 'auto', fontSize: 10 }, // Reduce font size for better fit
          columnStyles: { 0: { fontStyle: 'bold', halign: 'center' } },
          margin: { left: 14, right: pageWidth / 2 + 5 },
          tableWidth: 'wrap'
        });
        
        // Track final Y position of personal info table
        const personalInfoFinalY = (doc as any).lastAutoTable?.finalY || 90;
        
        // Add doctor information table (right side)
        autoTable(doc, {
          startY: 55,
          head: [],
          body: doctorInfoRows,
          theme: 'grid',
          headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
          styles: { overflow: 'linebreak', cellWidth: 'auto', fontSize: 10 }, // Reduce font size for better fit
          columnStyles: { 0: { fontStyle: 'bold', halign: 'center' } },
          margin: { left: 115, right: 14 },
          tableWidth: 'wrap'
        });
        
        // Track final Y position of doctor info table
        const doctorInfoFinalY = (doc as any).lastAutoTable?.finalY || 90;
        
        // Use the larger Y position of the two tables to ensure no overlap
        const finalY = Math.max(personalInfoFinalY, doctorInfoFinalY);
        
        // Add test results section with added margin to prevent overlap
        doc.setFontSize(16);
        doc.text('Test Results', 14, finalY + 20); // Increase spacing
        
        // Add test results table with proper spacing
        autoTable(doc, {
          startY: finalY + 25, // Increase spacing
          head: [['Test Name', 'Actual Value', 'Recommended Value/Range']],
          body: testRows,
          theme: 'grid',
          headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
          styles: { overflow: 'linebreak', fontSize: 10 }, // Reduce font size for better fit
          columnStyles: { 
            0: { halign: 'center', cellWidth: 70 },
            1: { halign: 'center', cellWidth: 50 },
            2: { halign: 'left', cellWidth: 80 }
          }
        });
      } else {
        // Original layout if no doctor information
        // Add personal information section
        doc.setFontSize(16);
        doc.text('Personal Information', 14, 50);
        
        // Add personal information table using the autoTable function
        autoTable(doc, {
          startY: 55,
          head: [],
          body: personalInfoRows,
          theme: 'grid',
          headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
          styles: { overflow: 'linebreak', cellWidth: 'auto', fontSize: 10 }, // Reduce font size for better fit
          columnStyles: { 
            0: { fontStyle: 'bold', halign: 'center' },
          }
        });
        
        // Get the final Y position after the first table
        const finalY = (doc as any).lastAutoTable?.finalY || 90;
        
        // Add test results section with added margin to prevent overlap
        doc.setFontSize(16);
        doc.text('Test Results', 14, finalY + 20); // Increase spacing
        
        // Add test results table with proper spacing
        autoTable(doc, {
          startY: finalY + 25, // Increase spacing
          head: [['Test Name', 'Actual Value', 'Recommended Value/Range']],
          body: testRows,
          theme: 'grid',
          headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
          styles: { overflow: 'linebreak', fontSize: 10 }, // Reduce font size for better fit
          columnStyles: { 
            0: { halign: 'center', cellWidth: 70 },
            1: { halign: 'center', cellWidth: 50 },
            2: { halign: 'left', cellWidth: 80 }
          }
        });
      }
      
      // Generate filename and save
      const fileName = `THDC_Health_Report_${name ? name.replace(/\s+/g, '_') : 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    }
    
    // Hide print view
    setShowPrintView(false);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
    setShowPrintView(false);
  }
}; 