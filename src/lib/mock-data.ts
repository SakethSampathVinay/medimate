export interface Medicine {
  id: string;
  name: string;
  imageUrl: string;
  useCase: string;
  description: string;
  dosage: string;
  sideEffects: string;
  precautions: string;
  category: string;
}

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'pill medicine',
    useCase: 'Pain relief, Fever reduction',
    description: 'Paracetamol is a common pain reliever and fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    dosage: '1-2 tablets every 4-6 hours as needed. Max 8 tablets in 24 hours.',
    sideEffects: 'Rare, but may include skin rash, allergic reactions.',
    precautions: 'Do not exceed stated dose. Avoid alcohol. Consult doctor if symptoms persist.',
    category: 'Pain Relief',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'capsule medicine',
    useCase: 'Bacterial infections',
    description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    dosage: 'As prescribed by doctor. Usually 250mg to 500mg three times a day.',
    sideEffects: 'Diarrhea, nausea, rash. Seek medical attention for severe reactions.',
    precautions: 'Complete the full course. Inform doctor of any allergies, especially to penicillin.',
    category: 'Antibiotics',
  },
  {
    id: '3',
    name: 'Loratadine 10mg',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'allergy medicine',
    useCase: 'Allergy relief',
    description: 'Loratadine is an antihistamine that treats symptoms such as itching, runny nose, watery eyes, and sneezing from "hay fever" and other allergies. It is also used to relieve itching from hives.',
    dosage: 'One tablet daily.',
    sideEffects: 'Headache, drowsiness, fatigue.',
    precautions: 'May cause drowsiness. Avoid activities requiring mental alertness until you know how it affects you.',
    category: 'Antihistamines',
  },
   {
    id: '4',
    name: 'Ibuprofen 200mg',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'painkiller pills',
    useCase: 'Pain relief, Anti-inflammatory',
    description: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, helping with fever, and reducing inflammation.',
    dosage: '1-2 tablets every 4-6 hours as needed. Max 6 tablets in 24 hours.',
    sideEffects: 'Stomach upset, heartburn, nausea. Take with food.',
    precautions: 'Do not use if you have stomach ulcers or bleeding problems. Consult doctor if you have heart, kidney, or liver disease.',
    category: 'Pain Relief',
  },
];

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact: string;
  lat: number;
  lng: number;
  services: string[];
  imageUrl: string;
}

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    address: '123 Main St, Anytown, USA',
    contact: '(555) 123-4567',
    lat: 34.0522,
    lng: -118.2437,
    services: ['Emergency', 'Cardiology', 'Oncology', 'Pediatrics'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'hospital building',
  },
  {
    id: 'h2',
    name: 'Suburb Community Clinic',
    address: '456 Oak Ave, Suburbia, USA',
    contact: '(555) 987-6543',
    lat: 34.0722,
    lng: -118.2637,
    services: ['General Practice', 'Vaccinations', 'Minor Injuries'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'clinic building',
  },
  {
    id: 'h3',
    name: 'Metro Health Center',
    address: '789 Pine Rd, Metropolis, USA',
    contact: '(555) 234-5678',
    lat: 34.0322,
    lng: -118.2037,
    services: ['Specialist Consultations', 'Diagnostics', 'Physiotherapy'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'health center',
  },
];

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  availability: Record<string, string[]>; // Date -> array of time slots
  imageUrl: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Alice Smith',
    specialty: 'Cardiology',
    location: 'City General Hospital',
    rating: 4.8,
    availability: {
      '2024-08-15': ['09:00 AM', '10:00 AM', '02:00 PM'],
      '2024-08-16': ['11:00 AM', '03:00 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'doctor profile',
  },
  {
    id: 'd2',
    name: 'Dr. Bob Johnson',
    specialty: 'Pediatrics',
    location: 'Suburb Community Clinic',
    rating: 4.5,
    availability: {
      '2024-08-15': ['09:30 AM', '11:30 AM'],
      '2024-08-17': ['01:00 PM', '04:00 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'pediatrician profile',
  },
  {
    id: 'd3',
    name: 'Dr. Carol Williams',
    specialty: 'Dermatology',
    location: 'Metro Health Center',
    rating: 4.9,
    availability: {
      '2024-08-16': ['10:00 AM', '12:00 PM', '02:30 PM'],
      '2024-08-18': ['09:00 AM', '04:30 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'dermatologist profile',
  },
];

export interface HealthCheckupPack {
  id: string;
  name: string;
  description: string;
  price: number;
  testsIncluded: string[];
  imageUrl: string;
}

export const mockHealthCheckupPacks: HealthCheckupPack[] = [
  {
    id: 'p1',
    name: 'Basic Health Check',
    description: 'A fundamental package covering essential health markers.',
    price: 499,
    testsIncluded: ['Complete Blood Count (CBC)', 'Fasting Blood Sugar', 'Lipid Profile', 'Kidney Function Test'],
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'health checkup',
  },
  {
    id: 'p2',
    name: 'Comprehensive Wellness Pack',
    description: 'An extensive check-up for a thorough health assessment.',
    price: 1299,
    testsIncluded: ['Basic Health Check tests', 'Liver Function Test', 'Thyroid Profile', 'Vitamin D & B12', 'Urine Analysis'],
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'wellness package',
  },
];

export interface HealthReel {
  id: string;
  title: string;
  videoUrl: string; // placeholder, actual video URLs would be used
  thumbnailUrl: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Wellness' | 'Yoga';
  likes: number;
  uploader: string;
  uploaderAvatar: string;
}

export const mockHealthReels: HealthReel[] = [
  {
    id: 'r1',
    title: '5 Minute Morning Yoga',
    videoUrl: 'https://placehold.co/1080x1920.mp4/000000/FFFFFF?text=Yoga+Reel',
    thumbnailUrl: 'https://placehold.co/300x500.png',
    dataAiHint: 'yoga fitness',
    category: 'Yoga',
    likes: 1200,
    uploader: 'YogaWithAdriene',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r2',
    title: 'Quick HIIT Workout',
    videoUrl: 'https://placehold.co/1080x1920.mp4/000000/FFFFFF?text=HIIT+Reel',
    thumbnailUrl: 'https://placehold.co/300x500.png',
    dataAiHint: 'workout exercise',
    category: 'Fitness',
    likes: 2500,
    uploader: 'FitnessBlender',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r3',
    title: 'Healthy Smoothie Recipe',
    videoUrl: 'https://placehold.co/1080x1920.mp4/000000/FFFFFF?text=Recipe+Reel',
    thumbnailUrl: 'https://placehold.co/300x500.png',
    dataAiHint: 'smoothie recipe',
    category: 'Nutrition',
    likes: 980,
    uploader: 'HealthyEats',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r4',
    title: 'Mindfulness Meditation Guide',
    videoUrl: 'https://placehold.co/1080x1920.mp4/000000/FFFFFF?text=Meditation+Reel',
    thumbnailUrl: 'https://placehold.co/300x500.png',
    dataAiHint: 'meditation wellness',
    category: 'Mental Wellness',
    likes: 1800,
    uploader: 'CalmMind',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
];

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'Ambulance' | 'Police' | 'Fire' | 'General Emergency';
}

export const mockEmergencyContacts: EmergencyContact[] = [
  { id: 'ec1', name: 'National Ambulance', number: '102', type: 'Ambulance' },
  { id: 'ec2', name: 'National Police', number: '100', type: 'Police' },
  { id: 'ec3', name: 'National Fire Service', number: '101', type: 'Fire' },
  { id: 'ec4', name: 'General Emergency Helpline', number: '112', type: 'General Emergency' },
];

export interface FirstAidGuide {
  id: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  steps: string[];
  category: 'Common Injuries' | 'Life Support' | 'Poisoning';
}

export const mockFirstAidGuides: FirstAidGuide[] = [
  {
    id: 'fa1',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    videoUrl: 'https://placehold.co/400x225.mp4/000000/FFFFFF?text=CPR+Guide',
    imageUrl: 'https://placehold.co/400x225.png',
    dataAiHint: 'cpr firstaid',
    steps: [
      'Check for responsiveness. Shout "Are you OK?" and gently shake the person\'s shoulder.',
      'Call for emergency help (e.g., 102 or local emergency number).',
      'Begin chest compressions: Place the heel of one hand in the center of the chest. Place your other hand on top. Push hard and fast (100-120 compressions per minute), about 2 inches deep.',
      'If trained, give rescue breaths: Tilt head, lift chin, pinch nose. Give 2 breaths, each lasting 1 second.',
      'Continue 30 compressions and 2 breaths until help arrives or the person starts breathing.'
    ],
    category: 'Life Support',
  },
  {
    id: 'fa2',
    title: 'Treating Minor Burns',
    imageUrl: 'https://placehold.co/400x225.png',
    dataAiHint: 'burn treatment',
    steps: [
      'Cool the burn. Hold under cool (not cold) running water for 10-15 minutes.',
      'Remove rings or other tight items from the burned area.',
      'Do not break blisters. If a blister breaks, clean the area with mild soap and water.',
      'Apply an antibiotic ointment and cover with a sterile bandage.',
      'Consider a pain reliever like ibuprofen or paracetamol.'
    ],
    category: 'Common Injuries',
  },
];

export interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  doctorName: string;
  dateIssued: string;
  imageUrl?: string; // Optional image of the prescription
}

export const mockPrescriptions: Prescription[] = [
  { id: 'pres1', medicineName: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', doctorName: 'Dr. Davis', dateIssued: '2024-07-01', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'prescription document' },
  { id: 'pres2', medicineName: 'Atorvastatin 20mg', dosage: '1 tablet', frequency: 'Once daily at night', doctorName: 'Dr. Evans', dateIssued: '2024-06-15' },
];

export interface TestResult {
  id: string;
  testName: string;
  dateTaken: string;
  resultSummary: string;
  reportUrl?: string; // Link to full PDF report
  imageUrl?: string; // Optional image of the result
}

export const mockTestResults: TestResult[] = [
  { id: 'tr1', testName: 'Lipid Profile', dateTaken: '2024-07-10', resultSummary: 'Total Cholesterol: 180 mg/dL (Normal)', reportUrl: '#', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'test results' },
  { id: 'tr2', testName: 'Blood Sugar Test', dateTaken: '2024-07-12', resultSummary: 'Fasting: 95 mg/dL (Normal)', reportUrl: '#'},
];

export interface TabletReminder {
  id: string;
  medicineName: string;
  time: string; // e.g., "08:00 AM"
  days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  isActive: boolean;
}

export const mockTabletReminders: TabletReminder[] = [
  { id: 'rem1', medicineName: 'Metformin 500mg', time: '08:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], isActive: true },
  { id: 'rem2', medicineName: 'Metformin 500mg', time: '08:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], isActive: true },
  { id: 'rem3', medicineName: 'Vitamin D', time: '10:00 AM', days: ['Mon', 'Wed', 'Fri'], isActive: false },
];
