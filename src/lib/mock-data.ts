
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
    imageUrl: med.photo_url, 
    dataAiHint: dataAiHint || 'medicine',
    useCase: med.description, 
    description: `${med.medicine_name} is typically used for ${med.tags.join(', ')}. For detailed information, including specific uses, contraindications, and potential interactions, please consult a healthcare professional or refer to the patient information leaflet that comes with the medicine.`,
    dosage: 'Dosage varies depending on the condition being treated and individual patient factors. Always follow the dosage instructions provided by your doctor or pharmacist. Do not exceed the recommended dose.',
    sideEffects: 'Like all medicines, this drug can cause side effects, although not everybody gets them. Common side effects may include nausea or headache. If you experience any severe side effects or allergic reactions, seek medical attention immediately.',
    precautions: 'Before taking this medicine, inform your doctor or pharmacist if you have any allergies, pre-existing medical conditions (such as liver or kidney problems), or if you are pregnant, planning to become pregnant, or breastfeeding. Avoid consuming alcohol if advised against it with this medication. Keep out of reach of children.',
    category: firstTag,
  };
});


export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string; 
  location: string;
  experience: string;
  rating: number;
  fees: number; 
  about: string; 
  availability: Record<string, string[]>; 
  imageUrl: string;
  dataAiHint?: string;
}

const newDoctorsData = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733685290/s43jgptx0mxqlgji1c5n.png",
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. He is dedicated to patient well-being.',
        fees: 500,
        address: {
            line1: '17th Cross, Richmond Town',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733599098/hhsm6glqvrshllhuksnd.png",
        speciality: 'Gynecologist',
        degree: 'MD, DGO',
        experience: '3 Years',
        about: 'Dr. Larson provides expert care in gynecology and obstetrics, with a focus on women\'s health and wellness throughout all stages of life.',
        fees: 750,
        address: {
            line1: '27th Cross, Chelsea',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733599018/pus06puz0cfrtwyy1yfh.png",
        speciality: 'Dermatologist',
        degree: 'MBBS, DDVL',
        experience: '1 Year',
        about: 'Dr. Patel specializes in diagnosing and treating a wide range of skin conditions, offering both medical and cosmetic dermatology services.',
        fees: 600,
        address: {
            line1: '37th Cross, Kensington',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598938/yjuzqx1ksbydx2rrdg53.png",
        speciality: 'Pediatrician',
        degree: 'MBBS, DCH',
        experience: '2 Years',
        about: 'Dr. Lee is dedicated to the health and well-being of children, providing compassionate care from infancy through adolescence.',
        fees: 450,
        address: {
            line1: '47th Cross, Notting Hill',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598831/hhfm0x79zd6zshcymzdr.png",
        speciality: 'Neurologist',
        degree: 'MD, DM (Neurology)',
        experience: '4 Years',
        about: 'Dr. Garcia is an expert in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, and nerves.',
        fees: 800,
        address: {
            line1: '57th Cross, Mayfair',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598566/kzqfdbuqrvcdvme2u6l9.png",
        speciality: 'Cardiologist',
        degree: 'MD, DM (Cardiology)',
        experience: '5 Years',
        about: 'Dr. Williams specializes in heart conditions, offering advanced diagnostic and treatment options for cardiovascular diseases.',
        fees: 900,
        address: {
            line1: 'Prime Heart Clinic, Marylebone',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598397/wfpw0uoqyoibiyc5qisi.png",
        speciality: 'Orthopedic Surgeon',
        degree: 'MS (Orthopedics)',
        experience: '6 Years',
        about: 'Dr. Davis focuses on conditions affecting the musculoskeletal system. He is skilled in both surgical and non-surgical treatments for bones and joints.',
        fees: 850,
        address: {
            line1: 'Ortho Care Center, Westminster',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598312/nzvnzueqro2lieggyrqs.png",
        speciality: 'Psychiatrist',
        degree: 'MD (Psychiatry)',
        experience: '3 Years',
        about: 'Dr. White offers comprehensive mental health care, including diagnosis and treatment for various psychiatric disorders in adults and adolescents.',
        fees: 700,
        address: {
            line1: 'MindWell Clinic, Soho',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598189/ozxvmkhr14a44sxi8rf6.png",
        speciality: 'Ophthalmologist',
        degree: 'MS (Ophthalmology)',
        experience: '2 Years',
        about: 'Dr. Mitchell is an eye specialist providing comprehensive eye care, including vision testing, diagnosis and treatment of eye diseases.',
        fees: 650,
        address: {
            line1: 'Clear Vision Eye Care, Shoreditch',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733597968/im8awlaoqalj4fjgc8sr.png",
        speciality: 'ENT Specialist',
        degree: 'MS (ENT)',
        experience: '4 Years',
        about: 'Dr. King specializes in disorders of the ear, nose, and throat. He provides medical and surgical solutions for a variety of ENT conditions.',
        fees: 720,
        address: {
            line1: 'ENT Health Clinic, Covent Garden',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598090/cvgnv4fg08cxjkxxkezs.png",
        speciality: 'Endocrinologist',
        degree: 'MD, DM (Endocrinology)',
        experience: '5 Years',
        about: 'Dr. Kelly treats hormonal imbalances and diseases like diabetes, thyroid disorders, and metabolic conditions.',
        fees: 880,
        address: {
            line1: 'Endocrine Wellness Center, Fitzrovia',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733597884/ekakzfmdr5zm9dgv66vh.png",
        speciality: 'Pulmonologist',
        degree: 'MD (Respiratory Medicine)',
        experience: '3 Years',
        about: 'Dr. Harris specializes in lung conditions such as asthma, COPD, pneumonia, and other respiratory illnesses.',
        fees: 760,
        address: {
            line1: 'Lung Health Institute, Southwark',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733597649/a9he69oa6l3i4wmros6x.png",
        speciality: 'General physician',
        degree: 'MBBS, MRCGP',
        experience: '5 Years',
        about: 'Dr. Evans offers a wide range of primary care services, emphasizing patient education and preventive health measures.',
        fees: 550,
        address: {
            line1: 'City Central Clinic, The City',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733598736/sza0s6vuiecej7a7vvbm.png",
        speciality: 'Urologist',
        degree: 'MS, MCh (Urology)',
        experience: '6 Years',
        about: 'Dr. Martinez specializes in urinary tract and male reproductive system disorders, offering both medical and surgical treatments.',
        fees: 950,
        address: {
            line1: 'Urology & Andrology Center, Harley Street',
            line2: 'London, UK'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: "https://res.cloudinary.com/dgtfgihga/image/upload/v1733597763/vxvuttlzqay0q7wimw4r.png",
        speciality: 'Rheumatologist',
        degree: 'MD, DM (Rheumatology)',
        experience: '4 Years',
        about: 'Dr. Hill diagnoses and treats rheumatic diseases, including arthritis, autoimmune conditions, and musculoskeletal pain disorders.',
        fees: 820,
        address: {
            line1: 'Joint & Connective Tissue Clinic, Bloomsbury',
            line2: 'London, UK'
        }
    },
];

export const mockDoctors: Doctor[] = newDoctorsData.map((doc, index) => {
  const today = new Date();
  const availability: Record<string, string[]> = {};
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1); 
    const dateString = date.toISOString().split('T')[0];
    if (Math.random() > 0.2) { 
      availability[dateString] = timeSlots.filter(() => Math.random() > 0.5).slice(0, Math.floor(Math.random() * 4) + 1);
    }
  }

  return {
    id: doc._id,
    name: doc.name,
    specialty: doc.speciality,
    degree: doc.degree,
    location: `${doc.address.line1}, ${doc.address.line2}`,
    experience: doc.experience,
    rating: parseFloat((4.1 + (index % 9) * 0.1).toFixed(1)), 
    fees: doc.fees,
    about: doc.about,
    availability,
    imageUrl: doc.image,
    dataAiHint: `${doc.name.split(' ')[1]?.toLowerCase() || 'doctor'} ${doc.speciality.split(' ')[0].toLowerCase()}`.substring(0, 20),
  };
});


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


  
