import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ExtendedHealthTestItem, PredefinedTest } from '../types/healthReportTypes';

interface TestItemRowProps {
  testItem: ExtendedHealthTestItem;
  predefinedTests: PredefinedTest[];
  onTestTypeChange: (id: string, index: number) => void;
  onTestChange: (
    id: string,
    field: keyof Omit<ExtendedHealthTestItem, 'id'>,
    value: string
  ) => void;
  onRemoveTest: (id: string) => void;
}

const TestItemRow: React.FC<TestItemRowProps> = ({
  testItem,
  predefinedTests,
  onTestTypeChange,
  onTestChange,
  onRemoveTest,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTestChange(testItem.id, name as any, value);
  };

  const getSelectValue = (testName: string): number => {
    const index = predefinedTests.findIndex(
      (test) => test.testName === testName
    );
    return index >= 0 ? index : 0;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        borderBottom: 1,
        borderColor: 'grey.200',
        gap: 2,
      }}
    >
      <Box sx={{ flex: '1 1 30%' }}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Test Type</InputLabel>
          <Select
            value={getSelectValue(testItem.testName)}
            onChange={(e) =>
              onTestTypeChange(testItem.id, e.target.value as number)
            }
            label="Test Type"
          >
            {predefinedTests.map((test, idx) =>
              !test.isCategory ? (
                <MenuItem key={idx} value={idx}>
                  {test.testName}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: '1 1 25%' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          name="actualValue"
          value={testItem.actualValue}
          onChange={handleInputChange}
          error={!!testItem.error}
          helperText={testItem.error}
          placeholder="Enter value"
          inputProps={{
            inputMode:
              testItem.validation.type === 'number' ||
              testItem.validation.type === 'decimal'
                ? 'numeric'
                : 'text',
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ flex: '1 1 15%', color: 'text.secondary' }}>
        {testItem.unit}
      </Typography>
      <Typography variant="body2" sx={{ flex: '1 1 30%', color: 'text.secondary' }}>
        {testItem.recommendedValue}
      </Typography>
      <Box sx={{ flex: '0 0 auto' }}>
        <IconButton onClick={() => onRemoveTest(testItem.id)} color="error">
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TestItemRow; 