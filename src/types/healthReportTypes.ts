export interface HealthTestItem {
  id: string; // Unique ID for React key and manipulation
  testName: string;
  actualValue: string;
  recommendedValue: string; // Could be a range like "70-110 mg/dL"
}

export type TestValidation = {
  type: 'number' | 'text' | 'decimal';
  errorMessage: string;
  pattern: RegExp;
};

export interface ExtendedHealthTestItem extends HealthTestItem {
  validation: TestValidation;
  error: string;
}

export interface PredefinedTest {
  testName: string;
  recommendedValueMale: string;
  recommendedValueFemale: string;
  validation: TestValidation;
} 