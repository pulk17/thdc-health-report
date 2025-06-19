export interface PatientInfo {
  opdRegNo?: string;
  opdDate?: string;
  name?: string;
  age?: string;
  sex?: 'Male' | 'Female' | 'Other' | '';
  employeeNo?: string;
  relationshipWithEmployee?: string;
  workplace?: string;
  investigation?: string;
  presentingComplaint?: string;
  treatment?: string;
  consultant?: string;
  labNo?: string;
  bloodType?: string;
  dateOfBirth?: string;
} 