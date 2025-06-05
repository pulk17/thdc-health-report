import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { bloodTypes } from '../utils/testData';

interface PersonalInfoFormProps {
  name: string;
  setName: (name: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (dob: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  bloodType: string;
  setBloodType: (bloodType: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  name,
  setName,
  dateOfBirth,
  setDateOfBirth,
  gender,
  setGender,
  bloodType,
  setBloodType
}) => {
  // Today's date for max date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 2 }}>
        Personal Information
      </Typography>
      
      <Grid container spacing={3}>
        {/* Full Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            id="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            placeholder="Enter patient's full name"
          />
        </Grid>
        
        {/* Date of Birth */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            required
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            inputProps={{ max: today }}
            helperText="MM/DD/YYYY"
          />
        </Grid>
        
        {/* Gender */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl component="fieldset" sx={{ mt: 1 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        {/* Blood Type */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="blood-type-label">Blood Type</InputLabel>
            <Select
              labelId="blood-type-label"
              id="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              label="Blood Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {bloodTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm; 