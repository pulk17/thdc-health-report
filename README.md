# THDC Health Report Generator

A comprehensive medical report generation system for THDC India Ltd. This application allows healthcare professionals to enter patient information, test results, and doctor details to generate standardized health reports in Excel format.

## Deployed Application

The application is deployed and accessible at:
[https://pulk17.github.io/thdc-health-report/](https://pulk17.github.io/thdc-health-report/)

## Features

- **Personal Information Management:** Capture patients' personal and OPD details
- **Dynamic Test Management:** Add, remove, and modify medical test results on the fly 
- **Excel Report Generation:** Export comprehensive health reports in Excel format
- **Intuitive Interface:** User-friendly design focused on healthcare workflows
- **Automated Calculations:** Age calculation and data validation

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/pulk17/thdc-health-report.git
   ```

2. Install dependencies:
   ```
   cd thdc-health-report
   npm install
   ```

3. Run the application locally:
   ```
   npm start
   ```

## Usage

1. Fill in the OPD details and patient's personal information
2. Enter doctor information (if applicable)
3. Add test results, including:
   - Select test type from predefined categories
   - Enter the measured values
   - View recommended ranges automatically
4. Export the report to Excel using the "Export as Excel" button
5. Share or save the generated Excel file

## Technologies Used

- React with TypeScript
- Material-UI for component design
- ExcelJS for Excel report generation
- React Router for navigation

## License

© THDC India Ltd. All rights reserved.

---

This project was created to streamline the health reporting process at THDC facilities.
