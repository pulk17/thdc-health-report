import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ExtendedHealthTestItem, PredefinedTest } from '../types/healthReportTypes';

interface TestItemRowProps {
  testItem: ExtendedHealthTestItem;
  predefinedTests: PredefinedTest[];
  onTestTypeChange: (id: string, index: number) => void;
  onTestChange: (id: string, field: keyof Omit<ExtendedHealthTestItem, 'id'>, value: string) => void;
  onRemoveTest: (id: string) => void;
}

const TestItemRow: React.FC<TestItemRowProps> = ({
  testItem,
  predefinedTests,
  onTestTypeChange,
  onTestChange,
  onRemoveTest
}) => {
  const getSelectValue = (testName: string): number => {
    const index = predefinedTests.findIndex(test => test.testName === testName);
    return index >= 0 ? index : 0;
  };

  // Enhanced change handler that validates input against pattern
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // If empty, allow it (user can clear the field)
    if (value === '') {
      onTestChange(testItem.id, 'actualValue', value);
      return;
    }
    
    // Only update the value if it matches the pattern
    if (testItem.validation.pattern.test(value)) {
      onTestChange(testItem.id, 'actualValue', value);
    }
  };

  // Determine placeholder text based on validation type
  const getPlaceholder = (): string => {
    switch (testItem.validation.type) {
      case 'number':
        return 'Enter a number';
      case 'decimal':
        return 'Enter a decimal number';
      case 'text':
        if (testItem.testName === 'Blood Pressure') {
          return 'Enter as 120/80';
        }
        return 'Enter a value';
    }
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
      <Grid size={{ xs: 12, sm: 3.5 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id={`test-type-label-${testItem.id}`}>Test Type</InputLabel>
          <Select
            labelId={`test-type-label-${testItem.id}`}
            id={`test-type-${testItem.id}`}
            value={getSelectValue(testItem.testName)}
            onChange={(e) => onTestTypeChange(testItem.id, e.target.value as number)}
            label="Test Type"
          >
            {predefinedTests.map((test, idx) => (
              <MenuItem key={idx} value={idx}>
                {test.testName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 3.5 }}>
        <TextField
          fullWidth
          label="Actual Value"
          value={testItem.actualValue}
          onChange={handleInputChange}
          variant="outlined"
          error={!!testItem.error}
          helperText={testItem.error || getPlaceholder()}
          placeholder={getPlaceholder()}
          inputProps={{
            inputMode: testItem.validation.type === 'number' || testItem.validation.type === 'decimal' 
              ? 'numeric' 
              : 'text',
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3.5 }}>
        <TextField
          fullWidth
          label="Recommended Value / Range"
          value={testItem.recommendedValue}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          sx={{
            "& .MuiInputBase-input.Mui-readOnly": {
              backgroundColor: "rgba(0, 0, 0, 0.04)"
            }
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 1.5 }} sx={{ textAlign: 'right' }}>
        <IconButton onClick={() => onRemoveTest(testItem.id)} color="error">
          <DeleteOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default TestItemRow; 