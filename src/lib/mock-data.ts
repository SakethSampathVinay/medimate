
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

const medicinesData = [
  {
    "medicine_name": "Paracetamol",
    "tags": ["Pain Relief", "Fever"],
    "description": "Used to reduce fever and relieve mild to moderate pain.",
    "photo_url": "https://example.com/paracetamol.jpg"
  },
  {
    "medicine_name": "Ibuprofen",
    "tags": ["Anti-inflammatory", "Pain Relief"],
    "description": "Non-steroidal anti-inflammatory drug for pain and inflammation.",
    "photo_url": "https://example.com/ibuprofen.jpg"
  },
  {
    "medicine_name": "Amoxicillin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Penicillin-based antibiotic used for bacterial infections.",
    "photo_url": "https://example.com/amoxicillin.jpg"
  },
  {
    "medicine_name": "Cetirizine",
    "tags": ["Antihistamine", "Allergies"],
    "description": "Used to relieve allergy symptoms such as runny nose and itching.",
    "photo_url": "https://example.com/cetirizine.jpg"
  },
  {
    "medicine_name": "Aspirin",
    "tags": ["Blood Thinner", "Pain Relief"],
    "description": "Used for pain relief and reducing the risk of heart attacks.",
    "photo_url": "https://example.com/aspirin.jpg"
  },
  {
    "medicine_name": "Metformin",
    "tags": ["Diabetes", "Blood Sugar Control"],
    "description": "Helps control blood sugar levels in people with type 2 diabetes.",
    "photo_url": "https://example.com/metformin.jpg"
  },
  {
    "medicine_name": "Omeprazole",
    "tags": ["Acid Reflux", "Stomach Ulcers"],
    "description": "Reduces stomach acid for treating GERD and ulcers.",
    "photo_url": "https://example.com/omeprazole.jpg"
  },
  {
    "medicine_name": "Ciprofloxacin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Broad-spectrum antibiotic used for bacterial infections.",
    "photo_url": "https://example.com/ciprofloxacin.jpg"
  },
  {
    "medicine_name": "Atorvastatin",
    "tags": ["Cholesterol", "Heart Health"],
    "description": "Used to lower cholesterol and reduce risk of heart disease.",
    "photo_url": "https://example.com/atorvastatin.jpg"
  },
  {
    "medicine_name": "Salbutamol",
    "tags": ["Asthma", "Bronchodilator"],
    "description": "Relieves breathing difficulties in asthma and COPD.",
    "photo_url": "https://example.com/salbutamol.jpg"
  },
  {
    "medicine_name": "Ranitidine",
    "tags": ["Heartburn", "Acid Reduction"],
    "description": "Reduces stomach acid to relieve heartburn and indigestion.",
    "photo_url": "https://example.com/ranitidine.jpg"
  },
  {
    "medicine_name": "Doxycycline",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Used to treat bacterial infections and acne.",
    "photo_url": "https://example.com/doxycycline.jpg"
  },
  {
    "medicine_name": "Loratadine",
    "tags": ["Antihistamine", "Allergies"],
    "description": "Non-drowsy antihistamine for allergy relief.",
    "photo_url": "https://example.com/loratadine.jpg"
  },
  {
    "medicine_name": "Clopidogrel",
    "tags": ["Blood Thinner", "Heart Health"],
    "description": "Prevents blood clots and reduces risk of heart attacks.",
    "photo_url": "https://example.com/clopidogrel.jpg"
  },
  {
    "medicine_name": "Hydrochlorothiazide",
    "tags": ["Diuretic", "Blood Pressure"],
    "description": "Helps control high blood pressure by reducing fluid retention.",
    "photo_url": "https://example.com/hydrochlorothiazide.jpg"
  },
  {
    "medicine_name": "Levothyroxine",
    "tags": ["Thyroid Hormone", "Hypothyroidism"],
    "description": "Used to treat underactive thyroid conditions.",
    "photo_url": "https://example.com/levothyroxine.jpg"
  },
  {
    "medicine_name": "Simvastatin",
    "tags": ["Cholesterol", "Heart Health"],
    "description": "Lowers cholesterol and reduces risk of heart disease.",
    "photo_url": "https://example.com/simvastatin.jpg"
  },
  {
    "medicine_name": "Prednisolone",
    "tags": ["Steroid", "Anti-inflammatory"],
    "description": "Used to reduce inflammation and suppress the immune system.",
    "photo_url": "https://example.com/prednisolone.jpg"
  },
  {
    "medicine_name": "Acetaminophen",
    "tags": ["Pain Relief", "Fever"],
    "description": "Alternative to Paracetamol for pain and fever relief.",
    "photo_url": "https://example.com/acetaminophen.jpg"
  },
  {
    "medicine_name": "Losartan",
    "tags": ["Blood Pressure", "Heart Health"],
    "description": "Used to treat high blood pressure and protect kidney function.",
    "photo_url": "https://example.com/losartan.jpg"
  },
  {
    "medicine_name": "Gabapentin",
    "tags": ["Nerve Pain", "Seizures"],
    "description": "Helps manage nerve pain and epilepsy.",
    "photo_url": "https://example.com/gabapentin.jpg"
  },
  {
    "medicine_name": "Fluoxetine",
    "tags": ["Antidepressant", "Mental Health"],
    "description": "Used to treat depression and anxiety disorders.",
    "photo_url": "https://example.com/fluoxetine.jpg"
  },
  {
    "medicine_name": "Warfarin",
    "tags": ["Blood Thinner", "Clot Prevention"],
    "description": "Reduces the risk of blood clots and strokes.",
    "photo_url": "https://example.com/warfarin.jpg"
  },
  {
    "medicine_name": "Azithromycin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Common antibiotic for treating bacterial infections.",
    "photo_url": "https://example.com/azithromycin.jpg"
  },
  {
    "medicine_name": "Diphenhydramine",
    "tags": ["Antihistamine", "Sleep Aid"],
    "description": "Used for allergies and as a sleep aid.",
    "photo_url": "https://example.com/diphenhydramine.jpg"
  },
  {
    "medicine_name": "Montelukast",
    "tags": ["Asthma", "Allergy Control"],
    "description": "Helps control asthma and allergic rhinitis.",
    "photo_url": "https://example.com/montelukast.jpg"
  },
  {
    "medicine_name": "Naproxen",
    "tags": ["Pain Relief", "Anti-inflammatory"],
    "description": "Long-lasting pain relief for arthritis and muscle pain.",
    "photo_url": "https://example.com/naproxen.jpg"
  },
  {
    "medicine_name": "Furosemide",
    "tags": ["Diuretic", "Heart Failure"],
    "description": "Used to reduce fluid buildup in conditions like heart failure.",
    "photo_url": "https://example.com/furosemide.jpg"
  }
];

export const mockMedicines: Medicine[] = medicinesData.map((med, index) => {
  const firstTag = med.tags[0] || 'General';
  const secondTag = med.tags[1] || '';
  let dataAiHint = firstTag.toLowerCase();
  if (secondTag) {
    dataAiHint += ` ${secondTag.toLowerCase()}`;
  }
  dataAiHint = dataAiHint.split(' ').slice(0, 2).join(' ');

  return {
    id: `med${index + 1}`,
    name: med.medicine_name,
    imageUrl: med.photo_url, // Using the photo_url directly as requested
    dataAiHint: dataAiHint || 'medicine',
    useCase: med.description, 
    description: `${med.medicine_name} is typically used for ${med.tags.join(', ')}. For detailed information, including specific uses, contraindications, and potential interactions, please consult a healthcare professional or refer to the patient information leaflet that comes with the medicine.`,
    dosage: 'Dosage varies depending on the condition being treated and individual patient factors. Always follow the dosage instructions provided by your doctor or pharmacist. Do not exceed the recommended dose.',
    sideEffects: 'Like all medicines, this drug can cause side effects, although not everybody gets them. Common side effects may include [mention 1-2 very generic, mild side effects if appropriate, otherwise state "nausea or headache"]. If you experience any severe side effects or allergic reactions, seek medical attention immediately.',
    precautions: 'Before taking this medicine, inform your doctor or pharmacist if you have any allergies, pre-existing medical conditions (such as liver or kidney problems), or if you are pregnant, planning to become pregnant, or breastfeeding. Avoid consuming alcohol if advised against it with this medication. Keep out of reach of children.',
    category: firstTag,
  };
});


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
  title: string; 
  videoUrl: string; 
  thumbnailUrl: string;
  dataAiHint?: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Wellness' | 'Yoga'; 
  likes: number; 
  uploader: string; 
  uploaderAvatar: string; 
}

export const mockHealthReels: HealthReel[] = [
  {
    id: 'r1',
    title: '5 Minute Morning Yoga Flow for Beginners',
    videoUrl: 'https://placehold.co/1080x1920.mp4/1E1E1E/FFFFFF?text=Yoga+Reel',
    thumbnailUrl: 'https://placehold.co/360x640.png', 
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


    

