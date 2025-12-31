
import { Hospital, DiagnosticTest, BloodType, BloodRequest, Donor, User } from './types';

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Metropolis Specialty Hospital',
    address: 'Orbit Sector 7, Hyderabad',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Cardiology', 'Interventional Cardiology', 'Cardiothoracic Surgery', 'Vascular Surgery', 'Paediatric Cardiology', 'Nephrology', 'Urology', 'Emergency Medicine', 'Intensive Care', 'Internal Medicine'],
    description: 'A global hub for Cardiac and Renal excellence, featuring the most advanced Intensive Care units in the HS network.',
    doctors: [
      { id: 'd1', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', experience: 15, rating: 4.9, image: 'https://picsum.photos/seed/doc1/200/200', bio: 'Senior Consultant Cardiologist specializing in interventional cardiology.', slots: ['09:00 AM', '02:00 PM'] },
      { id: 'd7', name: 'Dr. Victor Vance', specialty: 'Interventional Cardiology', experience: 12, rating: 4.8, image: 'https://picsum.photos/seed/doc7/200/200', bio: 'Expert in non-invasive cardiac synchronization and valve repair.', slots: ['10:00 AM', '03:00 PM'] },
      { id: 'd8', name: 'Dr. Aria Stark', specialty: 'Cardiothoracic Surgery', experience: 18, rating: 4.9, image: 'https://picsum.photos/seed/doc8/200/200', bio: 'Pioneer in minimally invasive thoracic reconstruction.', slots: ['08:00 AM', '01:00 PM'] },
      { id: 'd6', name: 'Dr. Lisa Su', specialty: 'Vascular Surgery', experience: 18, rating: 4.8, image: 'https://picsum.photos/seed/doc6/200/200', bio: 'Leading vascular surgeon focused on arterial pathway optimization.', slots: ['10:30 AM', '04:00 PM'] },
      { id: 'd9', name: 'Dr. Ben Tennyson', specialty: 'Paediatric Cardiology', experience: 11, rating: 4.7, image: 'https://picsum.photos/seed/doc9/200/200', bio: 'Specialist in congenital cardiac anomaly correction.', slots: ['11:00 AM', '02:30 PM'] },
      { id: 'd10', name: 'Dr. Doogie Howser', specialty: 'Nephrology', experience: 14, rating: 4.9, image: 'https://picsum.photos/seed/doc10/200/200', bio: 'Expert in renal dialysis and biometric kidney filtering.', slots: ['09:30 AM', '01:30 PM'] },
      { id: 'd11', name: 'Dr. John Watson', specialty: 'Urology', experience: 16, rating: 4.6, image: 'https://picsum.photos/seed/doc11/200/200', bio: 'Advanced urological sync and andrology specialist.', slots: ['08:30 AM', '12:30 PM'] },
      { id: 'd12', name: 'Dr. Stephen Strange', specialty: 'Emergency Medicine', experience: 20, rating: 5.0, image: 'https://picsum.photos/seed/doc12/200/200', bio: 'Lead emergency coordinator for critical node trauma.', slots: ['24/7 Priority'] },
      { id: 'd13', name: 'Dr. Christine Palmer', specialty: 'Intensive Care', experience: 13, rating: 4.8, image: 'https://picsum.photos/seed/doc13/200/200', bio: 'Specialist in multi-organ failure stabilization.', slots: ['Shift Active'] },
      { id: 'd14', name: 'Dr. James Wilson', specialty: 'Internal Medicine', experience: 19, rating: 4.9, image: 'https://picsum.photos/seed/doc14/200/200', bio: 'Diagnostic expert for complex internal biological syndromes.', slots: ['10:00 AM', '04:00 PM'] }
    ]
  },
  {
    id: 'h2',
    name: 'Continental Oncology Center',
    address: 'Celestial Plaza, Gachibowli',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Haematology-Oncology', 'Proton Therapy', 'Radiology', 'Genetics'],
    description: 'A specialized center dedicated to precision cancer care and genomic medicine.',
    doctors: [
      { id: 'd3', name: 'Dr. Elena Rossi', specialty: 'Medical Oncology', experience: 20, rating: 5.0, image: 'https://picsum.photos/seed/doc3/200/200', bio: 'Renowned oncologist focusing on precision targeted cellular therapy.', slots: ['08:30 AM', '12:00 PM'] },
      { id: 'd15', name: 'Dr. J. Robert', specialty: 'Surgical Oncology', experience: 22, rating: 4.9, image: 'https://picsum.photos/seed/doc15/200/200', bio: 'Master surgeon for complex tumor excision.', slots: ['07:30 AM', '11:00 AM'] },
      { id: 'd16', name: 'Dr. Marie Curie', specialty: 'Radiation Oncology', experience: 25, rating: 5.0, image: 'https://picsum.photos/seed/doc16/200/200', bio: 'Pioneer in localized radio-sync treatment.', slots: ['09:00 AM', '02:00 PM'] },
      { id: 'd17', name: 'Dr. Dexter Morgan', specialty: 'Haematology-Oncology', experience: 14, rating: 4.8, image: 'https://picsum.photos/seed/doc17/200/200', bio: 'Specialist in blood-borne malignancies.', slots: ['10:30 AM', '03:30 PM'] },
      { id: 'd18', name: 'Dr. Oppenheimer', specialty: 'Proton Therapy', experience: 17, rating: 4.9, image: 'https://picsum.photos/seed/doc18/200/200', bio: 'Lead physicist for proton beam synchronization.', slots: ['11:00 AM', '04:00 PM'] },
      { id: 'd19', name: 'Dr. Bruce Banner', specialty: 'Radiology', experience: 20, rating: 4.7, image: 'https://picsum.photos/seed/doc19/200/200', bio: 'Expert in interventional imaging and nuclear mapping.', slots: ['08:00 AM', '01:00 PM'] },
      { id: 'd20', name: 'Dr. Gregor Mendel', specialty: 'Genetics', experience: 21, rating: 4.9, image: 'https://picsum.photos/seed/doc20/200/200', bio: 'Specialist in genomic medicine and counselor.', slots: ['10:00 AM', '03:00 PM'] }
    ]
  },
  {
    id: 'h4',
    name: 'Apex Neuro-Spine Institute',
    address: 'Cyber Heights, HITEC City',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Neurology', 'Neurosurgery', 'Spine Surgery', 'Neuro-Psychiatry', 'Joint Replacement', 'Sports Medicine', 'Arthroscopy', 'Paediatric Orthopaedics', 'Psychiatry', 'Rehabilitation'],
    description: 'Advanced institute focusing on the intricate biological pathways of the brain, spine, and musculoskeletal system.',
    doctors: [
      { id: 'd2', name: 'Dr. James Miller', specialty: 'Neurology', experience: 12, rating: 4.8, image: 'https://picsum.photos/seed/doc2/200/200', bio: 'Expert in clinical neurology and stroke management.', slots: ['10:00 AM', '03:00 PM'] },
      { id: 'd5', name: 'Dr. Alan Turing', specialty: 'Neurosurgery', experience: 22, rating: 4.9, image: 'https://picsum.photos/seed/doc5/200/200', bio: 'Specialist in robotic neurosurgery and neural interface.', slots: ['09:00 AM', '02:00 PM'] },
      { id: 'd21', name: 'Dr. Joel Miller', specialty: 'Spine Surgery', experience: 19, rating: 4.8, image: 'https://picsum.photos/seed/doc21/200/200', bio: 'Expert in complex spinal stabilization and disc replacement.', slots: ['08:00 AM', '12:00 PM'] },
      { id: 'd22', name: 'Dr. Hannibal Lecter', specialty: 'Neuro-Psychiatry', experience: 25, rating: 4.7, image: 'https://picsum.photos/seed/doc22/200/200', bio: 'Specialist in neuro-biological psychiatric disorders.', slots: ['02:00 PM', '05:00 PM'] },
      { id: 'd23', name: 'Dr. Tony Stark', specialty: 'Joint Replacement', experience: 20, rating: 5.0, image: 'https://picsum.photos/seed/doc23/200/200', bio: 'Pioneer in biomechanical joint synchronization.', slots: ['09:30 AM', '01:30 PM'] },
      { id: 'd24', name: 'Dr. Rocky Balboa', specialty: 'Sports Medicine', experience: 15, rating: 4.9, image: 'https://picsum.photos/seed/doc24/200/200', bio: 'Consultant for high-performance athletic recovery.', slots: ['10:00 AM', '04:00 PM'] },
      { id: 'd25', name: 'Dr. Bruce Wayne', specialty: 'Arthroscopy', experience: 14, rating: 4.8, image: 'https://picsum.photos/seed/doc25/200/200', bio: 'Specialist in keyhole ligament reconstruction.', slots: ['11:30 AM', '03:30 PM'] },
      { id: 'd26', name: 'Dr. Peter Parker', specialty: 'Paediatric Orthopaedics', experience: 10, rating: 4.7, image: 'https://picsum.photos/seed/doc26/200/200', bio: 'Expert in childhood skeletal growth stabilization.', slots: ['08:30 AM', '12:30 PM'] },
      { id: 'd27', name: 'Dr. Sigmund Freud', specialty: 'Psychiatry', experience: 30, rating: 4.6, image: 'https://picsum.photos/seed/doc27/200/200', bio: 'General psychiatry and depth psychology consultant.', slots: ['01:00 PM', '04:00 PM'] },
      { id: 'd28', name: 'Dr. Charles Xavier', specialty: 'Rehabilitation', experience: 22, rating: 5.0, image: 'https://picsum.photos/seed/doc28/200/200', bio: 'Director of neuro-rehabilitation and pain management.', slots: ['09:00 AM', '02:00 PM'] }
    ]
  },
  {
    id: 'h5',
    name: 'Global Transplant & Gastro Node',
    address: 'Banjara Hills',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Heart Transplant', 'Lung Transplant', 'Liver Transplant', 'Kidney Transplant', 'Pancreas Transplant', 'Bone Marrow Transplant', 'Medical Gastroenterology', 'Surgical Gastroenterology', 'Hepatology', 'Bariatric Surgery', 'Pulmonology', 'Sleep Medicine'],
    description: 'The HS network apex for multi-organ transplantation and digestive health.',
    doctors: [
      { id: 'd29', name: 'Dr. Gregory House', specialty: 'Heart Transplant', experience: 25, rating: 4.9, image: 'https://picsum.photos/seed/doc29/200/200', bio: 'Master of complex cardiac transplantation.', slots: ['08:00 AM', '01:00 PM'] },
      { id: 'd30', name: 'Dr. Shaun Murphy', specialty: 'Liver Transplant', experience: 10, rating: 5.0, image: 'https://picsum.photos/seed/doc30/200/200', bio: 'Expert in pediatric liver and pancreas transplant.', slots: ['09:00 AM', '02:00 PM'] },
      { id: 'd31', name: 'Dr. Meredith Grey', specialty: 'Kidney Transplant', experience: 18, rating: 4.9, image: 'https://picsum.photos/seed/doc31/200/200', bio: 'Specialist in paired kidney exchange programs.', slots: ['10:00 AM', '03:00 PM'] },
      { id: 'd32', name: 'Dr. Cristina Yang', specialty: 'Lung Transplant', experience: 17, rating: 4.9, image: 'https://picsum.photos/seed/doc32/200/200', bio: 'Pioneer in ex-vivo lung perfusion.', slots: ['07:00 AM', '12:00 PM'] },
      { id: 'd33', name: 'Dr. John Dorian', specialty: 'Bone Marrow Transplant', experience: 12, rating: 4.7, image: 'https://picsum.photos/seed/doc33/200/200', bio: 'Specialist in stem cell synchronization.', slots: ['11:00 AM', '04:00 PM'] },
      { id: 'd34', name: 'Dr. Gordon Ramsay', specialty: 'Medical Gastroenterology', experience: 20, rating: 4.8, image: 'https://picsum.photos/seed/doc34/200/200', bio: 'Diagnostic expert for refractory GI syndromes.', slots: ['09:30 AM', '02:30 PM'] },
      { id: 'd35', name: 'Dr. Jamie Oliver', specialty: 'Surgical Gastroenterology', experience: 16, rating: 4.7, image: 'https://picsum.photos/seed/doc35/200/200', bio: 'Specialist in laparoscopic GI reconstruction.', slots: ['10:30 AM', '03:30 PM'] },
      { id: 'd36', name: 'Dr. Bobby Flay', specialty: 'Hepatology', experience: 15, rating: 4.8, image: 'https://picsum.photos/seed/doc36/200/200', bio: 'Expert in biliary pathway optimization.', slots: ['08:30 AM', '12:30 PM'] },
      { id: 'd37', name: 'Dr. Guy Fieri', specialty: 'Bariatric Surgery', experience: 14, rating: 4.6, image: 'https://picsum.photos/seed/doc37/200/200', bio: 'Metabolic surgery and weight sync specialist.', slots: ['01:00 PM', '05:00 PM'] },
      { id: 'd38', name: 'Dr. Walter White', specialty: 'Pulmonology', experience: 22, rating: 4.9, image: 'https://picsum.photos/seed/doc38/200/200', bio: 'Specialist in chronic respiratory failure.', slots: ['10:00 AM', '04:00 PM'] },
      { id: 'd39', name: 'Dr. Jesse Pinkman', specialty: 'Sleep Medicine', experience: 10, rating: 4.5, image: 'https://picsum.photos/seed/doc39/200/200', bio: 'Expert in nocturnal sync and sleep apnea.', slots: ['08:00 PM - Node Active'] }
    ]
  },
  {
    id: 'h3',
    name: 'Lotus Women & Fertility Precinct',
    address: 'Stellar Hub, Madhapur',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Obstetrics & Gynaecology', 'Neonatology', 'Fetal Medicine', 'Paediatrics', 'Diabetology'],
    description: 'Premier medical center dedicated to the full spectrum of maternal, fetal, and child biological health.',
    doctors: [
      { id: 'd40', name: 'Dr. Addison Montgomery', specialty: 'Obstetrics & Gynaecology', experience: 22, rating: 5.0, image: 'https://picsum.photos/seed/doc40/200/200', bio: 'World-renowned neonatal surgeon and OB/GYN expert.', slots: ['09:00 AM', '02:00 PM'] },
      { id: 'd41', name: 'Dr. Arizona Robbins', specialty: 'Neonatology', experience: 15, rating: 4.9, image: 'https://picsum.photos/seed/doc41/200/200', bio: 'Specialist in ultra-complex neonatal stabilization.', slots: ['08:00 AM - Priority'] },
      { id: 'd42', name: 'Dr. Callie Torres', specialty: 'Fetal Medicine', experience: 18, rating: 4.8, image: 'https://picsum.photos/seed/doc42/200/200', bio: 'Expert in in-utero surgical synchronization.', slots: ['10:30 AM', '03:30 PM'] },
      { id: 'd4', name: 'Dr. Robert Chen', specialty: 'Paediatrics', experience: 10, rating: 4.7, image: 'https://picsum.photos/seed/doc4/200/200', bio: 'General Pediatrician focused on developmental sync.', slots: ['11:00 AM', '04:00 PM'] },
      { id: 'd43', name: 'Dr. Sheldon Cooper', specialty: 'Diabetology', experience: 16, rating: 4.6, bio: 'Specialist in gestational metabolic disorders.', slots: ['09:30 AM', '01:30 PM'], image: 'https://picsum.photos/seed/doc43/200/200' }
    ]
  },
  {
    id: 'h6',
    name: 'Urban Wellness & Allied Node',
    address: 'Zenith Square, Kondapur',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Cosmetology', 'Trichology', 'General Dermatology', 'ENT', 'Head & Neck Surgery', 'Cornea', 'Retina', 'Eye Care', 'Clinical Psychology', 'Dental Care', 'Rheumatology', 'Genetics'],
    description: 'Comprehensive node for aesthetic, sensory, and psychological wellness synchronization.',
    doctors: [
      { id: 'd44', name: 'Dr. Barbie Roberts', specialty: 'Cosmetology', experience: 12, rating: 4.9, image: 'https://picsum.photos/seed/doc44/200/200', bio: 'Expert in aesthetic biometric enhancement.', slots: ['10:00 AM', '02:00 PM'] },
      { id: 'd45', name: 'Dr. Ken Carson', specialty: 'Trichology', experience: 11, rating: 4.7, image: 'https://picsum.photos/seed/doc45/200/200', bio: 'Specialist in follicular pathway reconstruction.', slots: ['11:00 AM', '03:00 PM'] },
      { id: 'd46', name: 'Dr. John Doolittle', specialty: 'ENT', experience: 19, rating: 4.8, image: 'https://picsum.photos/seed/doc46/200/200', bio: 'Expert in sensory node (Ear, Nose, Throat) synchronization.', slots: ['09:00 AM', '01:00 PM'] },
      { id: 'd47', name: 'Dr. Moreau', specialty: 'Head & Neck Surgery', experience: 20, rating: 4.6, image: 'https://picsum.photos/seed/doc47/200/200', bio: 'Advanced surgical reconstruction for head nodes.', slots: ['08:30 AM', '12:30 PM'] },
      { id: 'd48', name: 'Dr. Cyclops', specialty: 'Retina', experience: 15, rating: 4.9, image: 'https://picsum.photos/seed/doc48/200/200', bio: 'Specialist in posterior sensory eye mapping.', slots: ['10:00 AM', '04:00 PM'] },
      { id: 'd49', name: 'Dr. Daredevil', specialty: 'Cornea', experience: 14, rating: 4.8, image: 'https://picsum.photos/seed/doc49/200/200', bio: 'Lead consultant for corneal biological grafting.', slots: ['09:30 AM', '02:30 PM'] },
      { id: 'd50', name: 'Dr. Hermonie Granger', specialty: 'Dental Care', experience: 13, rating: 4.9, image: 'https://picsum.photos/seed/doc50/200/200', bio: 'Maxillofacial and restorative dentistry expert.', slots: ['11:30 AM', '03:30 PM'] },
      { id: 'd51', name: 'Dr. Gandalf White', specialty: 'Rheumatology', experience: 28, rating: 5.0, image: 'https://picsum.photos/seed/doc51/200/200', bio: 'Specialist in autoimmune and chronic joint syndromes.', slots: ['08:00 AM', '11:00 AM'] }
    ]
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'HS-USR-001',
    name: 'John Doe',
    email: 'john.doe@hshealth.com',
    bloodType: BloodType.O_POS,
    age: 32,
    gender: 'Male',
    phone: '+91 98765 43210',
    emergencyContact: '+91 90000 12345',
    emergencyContactName: 'Jane Doe',
    weight: '74 kg',
    height: '178 cm',
    address: 'Orbit Sector 7, Hyderabad',
    insuranceProvider: 'Star Health Gold',
    insuranceId: 'SH-7728-X',
    medicalHistory: ['Hypertension', 'Leg Fracture'],
    currentMedications: ['Amlodipine', 'Calcium'],
    allergies: ['Penicillin'],
    activeTreatmentId: 'h1',
    activeDoctorId: 'd1',
    protocolName: 'Cardiac Synchronization',
    protocolDescription: 'Optimizing heart rate rhythm via interventional cardiology node.',
    recoveryDay: 3,
    treatmentLogs: [
      { day: 1, date: '2025-05-10', vitals: { bp: '130/85', pulse: 78, temp: 98.8 }, notes: 'Initial biometric cardiac sync.', status: 'Completed' },
      { day: 2, date: '2025-05-11', vitals: { bp: '122/80', pulse: 72, temp: 98.6 }, notes: 'Rhythm stabilization checked.', status: 'Completed' },
      { day: 3, date: '2025-05-12', vitals: { bp: '120/80', pulse: 70, temp: 98.4 }, notes: 'Normal sinus rhythm active.', status: 'Active' }
    ],
    pastConsultations: [
      { id: 'C-001', date: '2025-01-15', doctorName: 'Dr. Sarah Wilson', hospitalName: 'Metropolis Specialty Hospital', specialty: 'Cardiology', summary: 'Routine BP check. Recommended low sodium diet and consistent activity sync.' },
      { id: 'C-002', date: '2024-11-20', doctorName: 'Dr. James Miller', hospitalName: 'Apex Neuro-Spine Institute', specialty: 'Neurology', summary: 'Post-fracture neural pathway mapping. Vitals within normal stabilization ranges.' }
    ],
    diagnosticHistory: [
      { id: 'T-001', date: '2025-04-20', testName: 'Lipid Profile', result: 'Cholesterol 210 mg/dL', labName: 'HS Metropolis Lab', status: 'Normal' },
      { id: 'T-002', date: '2025-05-01', testName: 'ECG', result: 'Slight ST elevation noted', labName: 'HS Metropolis Lab', status: 'Critical' }
    ]
  },
  {
    id: 'HS-USR-002',
    name: 'Sarah Chen',
    email: 's.chen@medical.io',
    bloodType: BloodType.A_NEG,
    age: 45,
    gender: 'Female',
    phone: '+91 88229 11002',
    emergencyContact: '+91 88229 11003',
    emergencyContactName: 'Michael Chen',
    weight: '62 kg',
    height: '165 cm',
    address: 'Jubilee Hills, Road 36',
    insuranceProvider: 'Cigna Global',
    insuranceId: 'CG-9901-P',
    medicalHistory: ['Mild Arrhythmia'],
    currentMedications: ['Beta Blockers'],
    allergies: ['Latex'],
    activeTreatmentId: 'h1',
    activeDoctorId: 'd6',
    protocolName: 'Vascular Pathway Settle',
    protocolDescription: 'Post-operative monitoring for arterial synchronization.',
    recoveryDay: 5,
    treatmentLogs: [
      { day: 1, date: '2025-05-08', vitals: { bp: '145/95', pulse: 90, temp: 99.1 }, notes: 'Initial vascular flow sync.', status: 'Completed' },
      { day: 5, date: '2025-05-12', vitals: { bp: '128/82', pulse: 74, temp: 98.6 }, notes: 'Arterial flow stable.', status: 'Active' }
    ],
    pastConsultations: [
      { id: 'C-003', date: '2025-03-02', doctorName: 'Dr. Lisa Su', hospitalName: 'Metropolis Specialty Hospital', specialty: 'Vascular Surgery', summary: 'Pre-op synchronization evaluation. Biological pathway ready for intervention.' }
    ],
    diagnosticHistory: [
      { id: 'T-003', date: '2025-04-25', testName: 'Doppler Ultrasound', result: 'Normal flow in peripheral arteries', labName: 'HS Metropolis Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-003',
    name: 'Marcus Aurelius',
    email: 'marcus.a@stoic.health',
    bloodType: BloodType.B_POS,
    age: 58,
    gender: 'Male',
    phone: '+91 77338 22114',
    emergencyContact: '+91 77338 22115',
    emergencyContactName: 'Lucilla Aurelius',
    weight: '85 kg',
    height: '182 cm',
    address: 'Banjara Sector 2',
    insuranceProvider: 'HDFC Ergo Platinum',
    insuranceId: 'HE-PLAT-88',
    medicalHistory: ['Spinal Stenosis'],
    currentMedications: ['Gabapentin'],
    allergies: ['None'],
    activeTreatmentId: 'h4',
    activeDoctorId: 'd21',
    recoveryDay: 8,
    protocolName: 'Spine Recovery Hub',
    protocolDescription: 'Advanced robotic spinal realignment and neural mapping.',
    treatmentLogs: [
      { day: 1, date: '2025-05-05', vitals: { bp: '140/90', pulse: 82, temp: 98.8 }, notes: 'Fusion protocol initiated.', status: 'Completed' },
      { day: 8, date: '2025-05-12', vitals: { bp: '124/78', pulse: 68, temp: 98.4 }, notes: 'Neural pathway active.', status: 'Active' }
    ],
    pastConsultations: [
      { id: 'C-004', date: '2024-12-10', doctorName: 'Dr. Alan Turing', hospitalName: 'Apex Neuro-Spine Institute', specialty: 'Neurosurgery', summary: 'Deep neural diagnostic for spinal pathways. Scheduled robotic intervention phase.' }
    ],
    diagnosticHistory: [
      { id: 'T-004', date: '2025-04-15', testName: 'MRI Spine', result: 'Significant stenosis at L4-L5', labName: 'HS Apex Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-004',
    name: 'Aisha Khan',
    email: 'akhan@care.org',
    bloodType: BloodType.O_NEG,
    age: 29,
    gender: 'Female',
    phone: '+91 99001 22334',
    emergencyContact: '+91 99001 22335',
    emergencyContactName: 'Omar Khan',
    weight: '55 kg',
    height: '160 cm',
    address: 'Gachibowli Vistas',
    insuranceProvider: 'Apollo Munich Premium',
    insuranceId: 'AM-K772',
    medicalHistory: ['Early Stage Lymphoma'],
    currentMedications: ['Immunotherapy agents'],
    allergies: ['Sulfa'],
    activeTreatmentId: 'h2',
    activeDoctorId: 'd3',
    recoveryDay: 2,
    protocolName: 'Cellular Node Sync',
    protocolDescription: 'Targeted medical oncology and biological sync.',
    treatmentLogs: [
      { day: 1, date: '2025-05-11', vitals: { bp: '110/70', pulse: 85, temp: 99.5 }, notes: 'Immuno-sync Phase 1.', status: 'Completed' },
      { day: 2, date: '2025-05-12', vitals: { bp: '115/75', pulse: 80, temp: 98.9 }, notes: 'Biological count verified.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-005', date: '2025-05-05', testName: 'CBC', result: 'WBC count elevated', labName: 'HS Continental Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-005',
    name: 'Liam O\'Brien',
    email: 'liam.ob@kids.health',
    bloodType: BloodType.AB_POS,
    age: 8,
    gender: 'Male',
    phone: '+91 88776 55443',
    emergencyContact: '+91 88776 55444',
    emergencyContactName: 'Fiona O\'Brien',
    weight: '28 kg',
    height: '132 cm',
    address: 'Madhapur Skyline',
    insuranceProvider: 'Max Bupa Family Care',
    insuranceId: 'MB-FAM-01',
    medicalHistory: ['Congenital Heart Defect'],
    currentMedications: ['Digoxin'],
    allergies: ['Peanuts'],
    activeTreatmentId: 'h3',
    activeDoctorId: 'd4',
    recoveryDay: 10,
    protocolName: 'Pediatric Growth Sync',
    protocolDescription: 'Stabilizing pediatric vitals post-defect correction.',
    treatmentLogs: [
      { day: 1, date: '2025-05-02', vitals: { bp: '95/60', pulse: 110, temp: 98.6 }, notes: 'Initial pediatric stabilization.', status: 'Completed' },
      { day: 10, date: '2025-05-12', vitals: { bp: '102/65', pulse: 95, temp: 98.4 }, notes: 'Growth pathway synchronized.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-006', date: '2025-05-01', testName: 'Echocardiogram', result: 'Ventricular septal defect observed', labName: 'HS Lotus Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-006',
    name: 'Elena Petrova',
    email: 'elena.p@zenith.com',
    bloodType: BloodType.B_NEG,
    age: 34,
    gender: 'Female',
    phone: '+91 91100 22334',
    emergencyContact: '+91 91100 22335',
    emergencyContactName: 'Viktor Petrov',
    weight: '60 kg',
    height: '170 cm',
    address: 'Kondapur Residency',
    insuranceProvider: 'Star Health Women Care',
    insuranceId: 'SWC-881',
    medicalHistory: ['Endometriosis'],
    currentMedications: ['Hormone supplements'],
    allergies: ['Dust'],
    activeTreatmentId: 'h3',
    activeDoctorId: 'd40',
    recoveryDay: 4,
    protocolName: 'OB/GYN Bio-Sync',
    protocolDescription: 'Biological rhythm synchronization for hormonal health.',
    treatmentLogs: [
      { day: 1, date: '2025-05-09', vitals: { bp: '120/80', pulse: 72, temp: 98.6 }, notes: 'Protocol node start.', status: 'Completed' },
      { day: 4, date: '2025-05-12', vitals: { bp: '118/78', pulse: 74, temp: 98.7 }, notes: 'Hormonal sync optimal.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-007', date: '2025-04-10', testName: 'Pelvic Ultrasound', result: 'Endometrial tissue presence confirmed', labName: 'HS Lotus Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-007',
    name: 'David Smith',
    email: 'd.smith@tech.com',
    bloodType: BloodType.O_POS,
    age: 65,
    gender: 'Male',
    phone: '+91 94455 66778',
    emergencyContact: '+91 94455 66779',
    emergencyContactName: 'Linda Smith',
    weight: '88 kg',
    height: '175 cm',
    address: 'HITEC Hills',
    insuranceProvider: 'Niva Bupa Senior Plus',
    insuranceId: 'NB-SR-77',
    medicalHistory: ['Post-Stroke (2024)'],
    currentMedications: ['Warfarin', 'Atorvastatin'],
    allergies: ['Seafood'],
    activeTreatmentId: 'h4',
    activeDoctorId: 'd2',
    recoveryDay: 15,
    protocolName: 'Neural Recovery Node',
    protocolDescription: 'Regaining motor functions via intensive clinical neurology.',
    treatmentLogs: [
      { day: 1, date: '2025-04-27', vitals: { bp: '150/95', pulse: 88, temp: 98.2 }, notes: 'Motor rehab node start.', status: 'Completed' },
      { day: 15, date: '2025-05-12', vitals: { bp: '135/85', pulse: 78, temp: 98.4 }, notes: 'Neural mobility +20%.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-008', date: '2025-04-01', testName: 'CT Head', result: 'Ischemic stroke legacy visible', labName: 'HS Apex Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-008',
    name: 'Maria Garcia',
    email: 'm.garcia@global.es',
    bloodType: BloodType.A_POS,
    age: 39,
    gender: 'Female',
    phone: '+91 92233 44556',
    emergencyContact: '+91 92233 44557',
    emergencyContactName: 'Carlos Garcia',
    weight: '68 kg',
    height: '162 cm',
    address: 'Aura Boulevard',
    insuranceProvider: 'Reliance Health Global',
    insuranceId: 'RHG-1022',
    medicalHistory: ['Diabetes Type 2'],
    currentMedications: ['Metformin', 'Insulin Glargine'],
    allergies: ['Iodine'],
    activeTreatmentId: 'h6',
    activeDoctorId: 'd48',
    recoveryDay: 2,
    protocolName: 'Retinal Mapping Node',
    protocolDescription: 'Stabilization of posterior eye biological signatures.',
    treatmentLogs: [
      { day: 1, date: '2025-05-11', vitals: { bp: '138/88', pulse: 80, temp: 98.6 }, notes: 'Retinal sync Phase 1.', status: 'Completed' },
      { day: 2, date: '2025-05-12', vitals: { bp: '132/84', pulse: 76, temp: 98.5 }, notes: 'Vision acuity synchronized.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-009', date: '2025-05-01', testName: 'HbA1c', result: '7.8%', labName: 'HS Urban Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-009',
    name: 'Kenji Tanaka',
    email: 'k.tanaka@tokyo.net',
    bloodType: BloodType.AB_NEG,
    age: 52,
    gender: 'Male',
    phone: '+91 98877 66554',
    emergencyContact: '+91 98877 66555',
    emergencyContactName: 'Yoko Tanaka',
    weight: '70 kg',
    height: '172 cm',
    address: 'Cyber Heights',
    insuranceProvider: 'Tokio Marine Platinum',
    insuranceId: 'TMP-00X',
    medicalHistory: ['Vascular Insufficiency'],
    currentMedications: ['Clopidogrel'],
    allergies: ['Sulfa drugs'],
    activeTreatmentId: 'h5',
    activeDoctorId: 'd38',
    recoveryDay: 6,
    protocolName: 'Pulmonary Node Hub',
    protocolDescription: 'Advanced respiratory mapping and airway stabilization.',
    treatmentLogs: [
      { day: 1, date: '2025-05-06', vitals: { bp: '142/92', pulse: 88, temp: 98.8 }, notes: 'Initial pulmonary sync.', status: 'Completed' },
      { day: 6, date: '2025-05-12', vitals: { bp: '130/82', pulse: 74, temp: 98.6 }, notes: 'Oxygen saturation optimal.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-010', date: '2025-04-20', testName: 'Spirometry', result: 'Reduced FEV1', labName: 'HS Transplant Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-010',
    name: 'Fatima Al-Farsi',
    email: 'fatima.f@dubaicare.ae',
    bloodType: BloodType.O_POS,
    age: 42,
    gender: 'Female',
    phone: '+91 97711 00223',
    emergencyContact: '+91 97711 00224',
    emergencyContactName: 'Zaid Al-Farsi',
    weight: '65 kg',
    height: '168 cm',
    address: 'Zenith Square',
    insuranceProvider: 'Oman Insurance Premium',
    insuranceId: 'OIP-9922',
    medicalHistory: ['Severe Scoliosis'],
    currentMedications: ['Analgesics'],
    allergies: ['None'],
    activeTreatmentId: 'h4',
    activeDoctorId: 'd28',
    recoveryDay: 12,
    protocolName: 'Rehab Alignment Node',
    protocolDescription: 'Final phase of musculoskeletal stabilization.',
    treatmentLogs: [
      { day: 1, date: '2025-05-01', vitals: { bp: '145/95', pulse: 92, temp: 99.2 }, notes: 'Alignment protocol start.', status: 'Completed' },
      { day: 12, date: '2025-05-12', vitals: { bp: '122/80', pulse: 72, temp: 98.4 }, notes: 'Mobility sync Phase 4.', status: 'Active' }
    ],
    diagnosticHistory: [
      { id: 'T-011', date: '2025-04-15', testName: 'X-Ray Whole Spine', result: 'Cobb angle 45 degrees', labName: 'HS Apex Lab', status: 'Normal' }
    ]
  },
  {
    id: 'HS-USR-011',
    name: 'Arjun Kapur',
    email: 'arjun.k@delhihealth.in',
    bloodType: BloodType.B_NEG,
    age: 31,
    gender: 'Male',
    phone: '+91 90088 11223',
    emergencyContact: '+91 90088 11224',
    emergencyContactName: 'Karan Kapur',
    weight: '78 kg',
    height: '180 cm',
    address: 'Celestial Plaza',
    insuranceProvider: 'ICICI Lombard Gold',
    insuranceId: 'ILG-228',
    medicalHistory: ['Asthma'],
    currentMedications: ['Salbutamol'],
    allergies: ['Pollen'],
    activeTreatmentId: 'h1',
    activeDoctorId: 'd12',
    recoveryDay: 1,
    protocolName: 'Emergency Trauma Hub',
    protocolDescription: 'Acute biological stabilization at priority node.',
    treatmentLogs: [
      { day: 1, date: '2025-05-12', vitals: { bp: '125/85', pulse: 98, temp: 101.2 }, notes: 'Priority node trauma sync.', status: 'Active' }
    ]
  }
];

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  { id: 't1', name: 'Complete Blood Count (CBC)', price: 340, turnaroundTime: '12 hours', category: 'Hematology' },
  { id: 't2', name: 'HbA1c (Diabetes)', price: 450, turnaroundTime: '6 hours', category: 'Diabetes' },
  { id: 't3', name: 'Thyroid Profile (T3, T4, TSH)', price: 730, turnaroundTime: '24 hours', category: 'Hormones' },
  { id: 't4', name: 'Lipid Profile (Basic)', price: 880, turnaroundTime: '24 hours', category: 'Biochemistry' },
  { id: 't5', name: 'Liver Function Test (LFT)', price: 800, turnaroundTime: '24 hours', category: 'Biochemistry' },
  { id: 't6', name: 'Kidney Function Test (KFT)', price: 800, turnaroundTime: '24 hours', category: 'Biochemistry' },
  { id: 't7', name: 'Vitamin D (Total)', price: 1550, turnaroundTime: '48 hours', category: 'Vitamins' },
  { id: 't8', name: 'MRI Full Body', price: 15000, turnaroundTime: '48 hours', category: 'Radiology' },
  { id: 't9', name: 'ECG', price: 300, turnaroundTime: 'Instant', category: 'Cardiology' }
];

export const MOCK_DONORS: Donor[] = [
  { id: 'dn1', name: 'Arjun Reddy', bloodType: BloodType.O_POS, location: 'Hyderabad Central', availability: 'Available' },
  { id: 'dn2', name: 'Priya Sharma', bloodType: BloodType.A_NEG, location: 'Secunderabad Node', availability: 'Available' },
  { id: 'dn3', name: 'Vikram Singh', bloodType: BloodType.B_POS, location: 'Cyber City Precinct', availability: 'Busy' },
  { id: 'dn4', name: 'Saira Banu', bloodType: BloodType.O_POS, location: 'Hitech Hills', availability: 'Available' },
  { id: 'dn5', name: 'Karthik Rao', bloodType: BloodType.AB_POS, location: 'Jubilee Sector', availability: 'Available' },
];

export const MOCK_BLOOD_REQUESTS: BloodRequest[] = [
  { id: 'br1', requesterName: 'John Doe', bloodType: BloodType.O_POS, units: 2, hospital: 'Metropolis Specialty Hospital', urgency: 'Critical', timestamp: new Date().toISOString() },
  { id: 'br2', requesterName: 'Jane Smith', bloodType: BloodType.B_NEG, units: 1, hospital: 'Continental Oncology Center', urgency: 'Normal', timestamp: new Date(Date.now() - 3600000).toISOString() }
];
