import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { bloodTypes } from '../utils/testData';
import { PatientInfo } from '../types/patientInfoTypes';

interface PersonalInfoFormProps {
  patientInfo: PatientInfo;
  onPatientInfoChange: (info: PatientInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  patientInfo,
  onPatientInfoChange,
}) => {
  // Today's date for max date validation
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onPatientInfoChange({ ...patientInfo, [name]: value });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    onPatientInfoChange({ ...patientInfo, [name]: value });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 2 }}>
        OPD Details
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="opdRegNo"
            name="opdRegNo"
            label="O.P.D. Reg No."
            value={patientInfo.opdRegNo || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="opdDate"
            name="opdDate"
            label="OPD Date"
            type="date"
            value={patientInfo.opdDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="consultant"
            name="consultant"
            label="Consultant"
            value={patientInfo.consultant || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="labNo"
            name="labNo"
            label="Lab No."
            value={patientInfo.labNo || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
      </Box>
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        Personal Information
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="Full Name"
            value={patientInfo.name || ''}
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter patient's full name"
          />
        </Box>

        {/* Date of Birth */}
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            required
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={patientInfo.dateOfBirth || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            inputProps={{ max: today }}
            helperText="MM/DD/YYYY"
          />
        </Box>

        {/* Gender */}
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <FormControl component="fieldset" sx={{ mt: 1 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="sex"
              value={patientInfo.sex || ''}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Blood Type */}
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="blood-type-label">Blood Type</InputLabel>
            <Select
              labelId="blood-type-label"
              id="bloodType"
              name="bloodType"
              value={patientInfo.bloodType || ''}
              onChange={handleSelectChange}
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
        </Box>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="employeeNo"
            name="employeeNo"
            label="Employee No."
            value={patientInfo.employeeNo || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            id="relationshipWithEmployee"
            name="relationshipWithEmployee"
            label="Relationship with Employee"
            value={patientInfo.relationshipWithEmployee || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: '100%' }}>
          <TextField
            fullWidth
            id="workplace"
            name="workplace"
            label="Workplace"
            value={patientInfo.workplace || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: '100%' }}>
          <TextField
            fullWidth
            id="investigation"
            name="investigation"
            label="Investigation"
            multiline
            rows={2}
            value={patientInfo.investigation || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: '100%' }}>
          <TextField
            fullWidth
            id="presentingComplaint"
            name="presentingComplaint"
            label="Presenting Complaint"
            multiline
            rows={3}
            value={patientInfo.presentingComplaint || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ p: 1.5, width: '100%' }}>
          <TextField
            fullWidth
            id="treatment"
            name="treatment"
            label="Treatment"
            multiline
            rows={3}
            value={patientInfo.treatment || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;