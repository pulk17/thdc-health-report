import React from 'react';
import {
  Typography,
  Button
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ExtendedHealthTestItem, PredefinedTest } from '../types/healthReportTypes';
import TestItemRow from './TestItemRow';

interface TestResultsSectionProps {
  tests: ExtendedHealthTestItem[];
  predefinedTests: PredefinedTest[];
  onAddTest: () => void;
  onRemoveTest: (id: string) => void;
  onTestTypeChange: (id: string, index: number) => void;
  onTestChange: (id: string, field: keyof Omit<ExtendedHealthTestItem, 'id'>, value: string) => void;
}

const TestResultsSection: React.FC<TestResultsSectionProps> = ({
  tests,
  predefinedTests,
  onAddTest,
  onRemoveTest,
  onTestTypeChange,
  onTestChange
}) => {
  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Test Results
      </Typography>
      {tests.map((testItem) => (
        <TestItemRow
          key={testItem.id}
          testItem={testItem}
          predefinedTests={predefinedTests}
          onTestTypeChange={onTestTypeChange}
          onTestChange={onTestChange}
          onRemoveTest={onRemoveTest}
        />
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddTest}
        sx={{ mt: 2 }}
      >
        Add New Test
      </Button>
    </>
  );
};

export default TestResultsSection; 