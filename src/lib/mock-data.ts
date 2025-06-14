
export interface Medicine {
  id: string;
  name: string;
  imageUrl: string;
  dataAiHint?: string;
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
  dataAiHint?: string;
}

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'Manipal Hospital, Old Airport Road',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017, India',
    contact: '+91 80 2502 3636',
    lat: 12.9605, 
    lng: 77.6623, 
    services: ['Emergency', 'Cardiology', 'Oncology', 'Pediatrics', 'Multi-specialty'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'hospital building bangalore',
  },
  {
    id: 'h2',
    name: 'Fortis Hospital, Bannerghatta Road',
    address: '154/9, Bannerghatta Main Rd, Opposite IIM-B, Sahyadri Layout, Panduranga Nagar, Bengaluru, Karnataka 560076, India',
    contact: '+91 80 6621 4444',
    lat: 12.8904, 
    lng: 77.5971, 
    services: ['General Practice', 'Orthopedics', 'Neurology', 'Urology'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'clinic building modern',
  },
  {
    id: 'h3',
    name: 'Apollo Gleneagles Hospitals, Kolkata',
    address: '58, Canal Circular Rd, Kadapara, Phool Bagan, Kankurgachi, Kolkata, West Bengal 700054, India',
    contact: '+91 33 2320 3040',
    lat: 22.5700, 
    lng: 88.3948, 
    services: ['Specialist Consultations', 'Diagnostics', 'Physiotherapy', 'Cardiac Sciences'],
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'health center kolkata',
  },
];

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: string;
  rating: number;
  availability: Record<string, string[]>; 
  imageUrl: string;
  dataAiHint?: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    location: 'Manipal Hospital, Bangalore',
    experience: '12+ Yrs Exp.',
    rating: 4.8,
    availability: {
      '2024-08-15': ['09:00 AM', '10:00 AM', '02:00 PM'],
      '2024-08-16': ['11:00 AM', '03:00 PM'],
      '2024-08-19': ['09:00 AM', '10:30 AM', '02:30 PM', '04:00 PM'],
      '2024-08-20': ['10:00 AM', '11:00 AM', '03:00 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'indian doctor female',
  },
  {
    id: 'd2',
    name: 'Dr. Rahul Verma',
    specialty: 'Pediatrics',
    location: 'Fortis Hospital, Bangalore',
    experience: '8+ Yrs Exp.',
    rating: 4.5,
    availability: {
      '2024-08-15': ['09:30 AM', '11:30 AM'],
      '2024-08-17': ['01:00 PM', '04:00 PM'],
      '2024-08-20': ['09:00 AM', '11:00 AM', '01:30 PM'],
      '2024-08-21': ['10:30 AM', '12:30 PM', '03:30 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'indian doctor male',
  },
  {
    id: 'd3',
    name: 'Dr. Anjali Bose',
    specialty: 'Dermatology',
    location: 'Apollo Gleneagles, Kolkata',
    experience: '15+ Yrs Exp.',
    rating: 4.9,
    availability: {
      '2024-08-16': ['10:00 AM', '12:00 PM', '02:30 PM'],
      '2024-08-18': ['09:00 AM', '04:30 PM'],
      '2024-08-22': ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
      '2024-08-23': ['09:30 AM', '01:00 PM'],
    },
    imageUrl: 'https://placehold.co/150x150.png',
    dataAiHint: 'dermatologist indian',
  },
];

export interface HealthCheckupPack {
  id: string;
  tier: 'Bronze' | 'Silver' | 'Gold';
  name: string;
  price: number;
  testsIncluded: string[];
  imageUrl: string;
  dataAiHint?: string;
  iconColor: string; 
}

export const mockHealthCheckupPacks: HealthCheckupPack[] = [
  {
    id: 'p1',
    tier: 'Bronze',
    name: 'Bronze Pack',
    price: 299,
    testsIncluded: ['BP Test', 'Sugar Test'],
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'bronze health package',
    iconColor: 'fill-yellow-700 text-yellow-700',
  },
  {
    id: 'p2',
    tier: 'Silver',
    name: 'Silver Pack',
    price: 699,
    testsIncluded: ['BP Test', 'Sugar Test', 'Kidney Function', 'Thyroid'],
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'silver health package',
    iconColor: 'fill-slate-400 text-slate-400',
  },
  {
    id: 'p3',
    tier: 'Gold',
    name: 'Gold Pack',
    price: 1299,
    testsIncluded: ['BP Test', 'Sugar Test', 'Kidney Function', 'Liver Function', 'Thyroid', 'Vitamin D', 'ECG'],
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'gold health package',
    iconColor: 'fill-amber-400 text-amber-400',
  },
];


export interface HealthReel {
  id: string;
  title: string; // Corresponds to 'caption' in Supabase
  videoUrl: string; 
  thumbnailUrl: string;
  dataAiHint?: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Wellness' | 'Yoga'; // Example categories
  likes: number; // Corresponds to 'likes_count'
  uploader: string; // Corresponds to 'creator_name'
  uploaderAvatar: string; // For UI, not in Supabase schema directly but useful
}

export const mockHealthReels: HealthReel[] = [
  {
    id: 'r1',
    title: '5 Minute Morning Yoga Flow for Beginners',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=Yoga+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png', // Aspect ratio 9:16
    dataAiHint: 'yoga fitness',
    category: 'Yoga',
    likes: 1256,
    uploader: 'YogaWithDivya',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r2',
    title: 'Quick HIIT Workout - No Equipment Needed!',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=HIIT+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png',
    dataAiHint: 'workout exercise',
    category: 'Fitness',
    likes: 2530,
    uploader: 'FitBharatFitness',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r3',
    title: 'Healthy Green Smoothie Recipe for Energy',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=Recipe+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png',
    dataAiHint: 'smoothie recipe',
    category: 'Nutrition',
    likes: 980,
    uploader: 'SwasthRecipesIndia',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
  {
    id: 'r4',
    title: 'Mindfulness Meditation: 3 Minute Guide',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=Meditation+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png',
    dataAiHint: 'meditation wellness',
    category: 'Mental Wellness',
    likes: 1802,
    uploader: 'ShaantMannWellness',
    uploaderAvatar: 'https://placehold.co/50x50.png'
  },
    {
    id: 'r5',
    title: 'Stretching Routine for Desk Workers',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=Stretching+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png',
    dataAiHint: 'office stretches',
    category: 'Fitness',
    likes: 750,
    uploader: 'ActiveOffice',
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
  { id: 'ec1', name: 'Medical Emergency / Ambulance', number: '102', type: 'Ambulance' },
  { id: 'ec2', name: 'Police Control Room', number: '100', type: 'Police' },
  { id: 'ec3', name: 'Fire Control Room', number: '101', type: 'Fire' },
  { id: 'ec4', name: 'National Emergency Helpline', number: '112', type: 'General Emergency' },
];

export interface FirstAidGuide {
  id: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  dataAiHint?: string;
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
      'Call for emergency help (e.g., 102 or your local emergency number).',
      'Begin chest compressions: Place the heel of one hand in the center of the chest. Place your other hand on top. Push hard and fast (100-120 compressions per minute), about 2 inches (5 cm) deep.',
      'If trained, give rescue breaths: Tilt head, lift chin, pinch nose. Give 2 breaths, each lasting 1 second, ensuring the chest rises.',
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
      'Cool the burn. Hold under cool (not cold) running water for 10-15 minutes or until pain subsides.',
      'Remove rings or other tight items from the burned area gently and quickly, before the area swells.',
      'Do not break blisters. If a blister breaks, clean the area with mild soap and water, and apply an antibiotic ointment.',
      'Apply an antibiotic ointment and cover with a sterile non-stick bandage or clean cloth.',
      'Consider a pain reliever like ibuprofen or paracetamol if needed.'
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
  imageUrl?: string; 
  dataAiHint?: string;
}

export const mockPrescriptions: Prescription[] = [
  { id: 'pres1', medicineName: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', doctorName: 'Dr. Alok Gupta', dateIssued: '2024-07-01', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'prescription document' },
  { id: 'pres2', medicineName: 'Atorvastatin 20mg', dosage: '1 tablet', frequency: 'Once daily at night', doctorName: 'Dr. Sunita Reddy', dateIssued: '2024-06-15' },
];

export interface TestResult {
  id: string;
  testName: string;
  dateTaken: string;
  resultSummary: string;
  reportUrl?: string; 
  imageUrl?: string; 
  dataAiHint?: string;
}

export const mockTestResults: TestResult[] = [
  { id: 'tr1', testName: 'Lipid Profile', dateTaken: '2024-07-10', resultSummary: 'Total Cholesterol: 180 mg/dL (Normal)', reportUrl: '#', imageUrl: 'https://placehold.co/300x400.png', dataAiHint: 'test results' },
  { id: 'tr2', testName: 'Blood Sugar Test', dateTaken: '2024-07-12', resultSummary: 'Fasting: 95 mg/dL (Normal)', reportUrl: '#'},
];

export interface TabletReminder {
  id: string;
  medicineName: string;
  time: string; 
  days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  isActive: boolean;
}

export const mockTabletReminders: TabletReminder[] = [
  { id: 'rem1', medicineName: 'Metformin 500mg', time: '08:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], isActive: true },
  { id: 'rem2', medicineName: 'Metformin 500mg', time: '08:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], isActive: true },
  { id: 'rem3', medicineName: 'Vitamin D', time: '10:00 AM', days: ['Mon', 'Wed', 'Fri'], isActive: false },
];
