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
  unit?: string;
  isCategory?: boolean;
}

export interface PredefinedTest {
  testName: string;
  recommendedValue?: string; // General recommendation
  recommendedValueMale?: string; // Optional male-specific
  recommendedValueFemale?: string; // Optional female-specific
  unit?: string; // Optional unit
  isCategory?: boolean; // Optional category flag
  validation: TestValidation;
} 