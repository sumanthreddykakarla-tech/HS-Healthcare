
export enum BloodType {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
}

export interface DailyLog {
  day: number;
  date: string;
  vitals: {
    bp: string;
    pulse: number;
    temp: number;
  };
  notes: string;
  status: 'Completed' | 'Upcoming' | 'Active';
}

export interface Consultation {
  id: string;
  date: string;
  doctorName: string;
  hospitalName: string;
  specialty: string;
  summary: string;
}

export interface DiagnosticRecord {
  id: string;
  date: string;
  testName: string;
  result: string;
  labName: string;
  status: 'Critical' | 'Normal' | 'Pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  age: number;
  gender: string;
  phone: string;
  emergencyContact: string;
  emergencyContactName: string;
  weight: string;
  height: string;
  address: string;
  insuranceProvider: string;
  insuranceId: string;
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  // Session-specific treatment data
  activeTreatmentId?: string; // Links to Hospital ID
  activeDoctorId?: string; // Links to Doctor ID
  protocolName: string;
  protocolDescription: string;
  recoveryDay: number;
  treatmentLogs: DailyLog[];
  pastConsultations?: Consultation[];
  diagnosticHistory?: DiagnosticRecord[];
}

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  location: string;
  availability: 'Available' | 'Busy';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  image: string;
  rating: number;
  bio: string;
  slots: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  image: string;
  specialties: string[];
  doctors: Doctor[];
  description: string;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  price: number;
  turnaroundTime: string;
  category: string;
}

export interface BloodRequest {
  id: string;
  requesterName: string;
  bloodType: BloodType;
  units: number;
  hospital: string;
  urgency: 'Critical' | 'Normal';
  timestamp: string;
}
