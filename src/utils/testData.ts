import { v4 as uuidv4 } from 'uuid';
import { ExtendedHealthTestItem, PredefinedTest, TestValidation } from '../types/healthReportTypes';

// Predefined test options with validation types
export const predefinedTests: PredefinedTest[] = [
  { 
    testName: 'Hemoglobin', 
    recommendedValueMale: '13.5-17.5 g/dL',
    recommendedValueFemale: '12.0-15.5 g/dL',
    validation: { 
      type: 'decimal', 
      errorMessage: 'Please enter a valid decimal number',
      pattern: /^\d*\.?\d*$/
    }
  },
  { 
    testName: 'Blood Sugar (Fasting)', 
    recommendedValueMale: '70-100 mg/dL',
    recommendedValueFemale: '70-100 mg/dL',
    validation: { 
      type: 'number', 
      errorMessage: 'Please enter a valid number',
      pattern: /^\d+$/ 
    }
  },
  { 
    testName: 'Total Cholesterol', 
    recommendedValueMale: '<200 mg/dL',
    recommendedValueFemale: '<200 mg/dL',
    validation: { 
      type: 'number', 
      errorMessage: 'Please enter a valid number',
      pattern: /^\d+$/ 
    }
  },
  { 
    testName: 'HDL Cholesterol', 
    recommendedValueMale: '>40 mg/dL',
    recommendedValueFemale: '>50 mg/dL',
    validation: { 
      type: 'number', 
      errorMessage: 'Please enter a valid number',
      pattern: /^\d+$/ 
    }
  },
  { 
    testName: 'LDL Cholesterol', 
    recommendedValueMale: '<100 mg/dL',
    recommendedValueFemale: '<100 mg/dL',
    validation: { 
      type: 'number', 
      errorMessage: 'Please enter a valid number',
      pattern: /^\d+$/ 
    }
  },
  { 
    testName: 'Triglycerides', 
    recommendedValueMale: '<150 mg/dL',
    recommendedValueFemale: '<150 mg/dL',
    validation: { 
      type: 'number', 
      errorMessage: 'Please enter a valid number',
      pattern: /^\d+$/ 
    }
  },
  { 
    testName: 'Blood Pressure', 
    recommendedValueMale: '<120/80 mmHg',
    recommendedValueFemale: '<120/80 mmHg',
    validation: { 
      type: 'text', 
      errorMessage: 'Please enter in format like 120/80',
      pattern: /^\d+\/\d+$/ 
    }
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
  
  return gender === 'male' ? test.recommendedValueMale : test.recommendedValueFemale;
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
 * Creates initial test items with the given gender
 */
export const createInitialTests = (gender: string): ExtendedHealthTestItem[] => [
  { 
    id: uuidv4(), 
    testName: 'Hemoglobin', 
    actualValue: '', 
    recommendedValue: getRecommendedValue('Hemoglobin', gender),
    validation: getValidation('Hemoglobin'),
    error: ''
  },
  { 
    id: uuidv4(), 
    testName: 'Blood Sugar (Fasting)', 
    actualValue: '', 
    recommendedValue: getRecommendedValue('Blood Sugar (Fasting)', gender),
    validation: getValidation('Blood Sugar (Fasting)'),
    error: ''
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