import { v4 as uuidv4 } from 'uuid';
import { ExtendedHealthTestItem, PredefinedTest, TestValidation } from '../types/healthReportTypes';

// Predefined test options with validation types
export const predefinedTests: PredefinedTest[] = [
  { 
    testName: 'GLUCOSE. F', 
    unit: 'mg/dl',
    recommendedValue: '70 - 110',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'GLUCOSE. PP', 
    unit: 'mg/dl',
    recommendedValue: '70 - 140',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'GLUCOSE. R', 
    unit: 'mg/dl',
    recommendedValue: '70 - 160',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'KIDNEY FUNCTION TEST (KFT):', 
    unit: '',
    recommendedValue: '',
    isCategory: true,
    validation: { type: 'text', errorMessage: '', pattern: /.*/ }
  },
  { 
    testName: 'BUN', 
    unit: 'mg/dl',
    recommendedValue: '6.0 - 21',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'CREATININE', 
    unit: 'mg/dl',
    recommendedValue: '0.6 - 1.4',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'URIC ACID', 
    unit: 'mg/dl',
    recommendedValue: 'M=3.5 - 7.2,  F=2.5 -6.2',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'LIPID PROFILE :', 
    unit: '',
    recommendedValue: '',
    isCategory: true,
    validation: { type: 'text', errorMessage: '', pattern: /.*/ }
  },
  { 
    testName: 'CHOLESTEROL', 
    unit: 'mg/dl',
    recommendedValue: '130 - 220',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'TRIGLYCERIDES', 
    unit: 'mg/dl',
    recommendedValue: '35 - 160',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'HDL CHOLESTEROL', 
    unit: 'mg/dl',
    recommendedValue: '35 - 65',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'LDL CHOLESTEROL', 
    unit: 'mg/dl',
    recommendedValue: '< 100',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'VLDL CHOLESTEROL', 
    unit: 'mg/dl',
    recommendedValue: '2.0 - 30.0',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'LIVER FUNCTION TEST (LFT) :', 
    unit: '',
    recommendedValue: '',
    isCategory: true,
    validation: { type: 'text', errorMessage: '', pattern: /.*/ }
  },
  { 
    testName: 'BILIRUBIN. T', 
    unit: 'mg/dl',
    recommendedValue: '0.2 - 1.2',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'BILIRUBIN. D', 
    unit: 'mg/dl',
    recommendedValue: '0.0 - 0.3',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'SGOT/AST', 
    unit: 'IU/L',
    recommendedValue: '8 - 37',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'SGPT/ALT.', 
    unit: 'IU/L',
    recommendedValue: '6 - 40',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'ALK. P. TASE', 
    unit: 'IU/L',
    recommendedValue: 'Adult : 15 - 112, Children: 117 - 390',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'GAMMA GT', 
    unit: 'U/L',
    recommendedValue: 'M: < 55,  F: < 38',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'TOTAL PROTEIN', 
    unit: 'gm/dl',
    recommendedValue: '6.0 - 8.0',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'ALBUMIN', 
    unit: 'gm/dl',
    recommendedValue: '3.5 - 5.2',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'GLOBULIN', 
    unit: 'gm/dl',
    recommendedValue: '2.0 - 3.5',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'A/G RATIO', 
    unit: '',
    recommendedValue: '',
    validation: { type: 'text', errorMessage: 'Invalid input', pattern: /.*/ }
  },
  { 
    testName: 'Hb.', 
    unit: 'gm/dl',
    recommendedValue: 'M: -13 - 18, F: -11.5- 16',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'PLATLET COUNT', 
    unit: 'lakhs/cumm',
    recommendedValue: '1.5-4.5 lakhs/cumm',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'CRP', 
    unit: 'mg/L',
    recommendedValue: '< 5.0 mg/L',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  },
  { 
    testName: 'ESR (WESTERGREN)', 
    unit: 'mm/hr',
    recommendedValue: 'M= 0 - 10,  F= 0 - 12',
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ }
  }
];

// Blood types
export const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/**
 * Gets the recommended value for a test based on gender
 */
export const getRecommendedValue = (testName: string, gender: string): string => {
  const test = predefinedTests.find(t => t.testName === testName);
  if (!test) return '';

  if (test.recommendedValueMale && test.recommendedValueFemale) {
    return gender.toLowerCase() === 'male' ? test.recommendedValueMale : test.recommendedValueFemale;
  }
  
  return test.recommendedValue || '';
};

/**
 * Gets the validation for a test
 */
export const getValidation = (testName: string): TestValidation => {
  const test = predefinedTests.find(t => t.testName === testName);
  return test?.validation || { 
    type: 'text', 
    errorMessage: '', 
    pattern: /.*/ 
  };
};

/**
 * Creates initial test items for all predefined tests
 */
export const createInitialTests = (): ExtendedHealthTestItem[] => [
  {
    id: uuidv4(),
    testName: 'GLUCOSE. F',
    actualValue: '',
    recommendedValue: '70 - 110',
    unit: 'mg/dl',
    isCategory: false,
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ },
    error: '',
  },
  {
    id: uuidv4(),
    testName: 'Hb.',
    actualValue: '',
    recommendedValue: 'M: -13 - 18, F: -11.5- 16',
    unit: 'gm/dl',
    isCategory: false,
    validation: { type: 'decimal', errorMessage: 'Invalid number', pattern: /^\d*\.?\d*$/ },
    error: '',
  },
];

/**
 * Validates input based on validation type and pattern
 */
export const validateInput = (value: string, validation: TestValidation): string => {
  if (!value) return '';
  
  // Check if the input matches the required pattern
  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.errorMessage;
  }
  
  return '';
}; 