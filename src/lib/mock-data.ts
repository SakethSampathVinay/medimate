
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
  price: number; 
  tags: string[]; 
}

const medicinesData = [
  {
    "medicine_name": "Paracetamol",
    "tags": ["Pain Relief", "Fever"],
    "description": "Used to reduce fever and relieve mild to moderate pain.",
    "photo_url": "https://www.internationaldrugmart.com/wp-content/uploads/2023/01/Acetaminophen-Paracetamol-650mg-1.webp"
  },
  {
    "medicine_name": "Ibuprofen",
    "tags": ["Anti-inflammatory", "Pain Relief"],
    "description": "Non-steroidal anti-inflammatory drug for pain and inflammation.",
    "photo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQegB7poiqWeq0gRJd1FHANAEOo2qVv5-fafw&s"
  },
  {
    "medicine_name": "Amoxicillin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Penicillin-based antibiotic used for bacterial infections.",
    "photo_url": "https://surli.cc/pbnlwz"
  },
  {
    "medicine_name": "Cetirizine",
    "tags": ["Antihistamine", "Allergies"],
    "description": "Used to relieve allergy symptoms such as runny nose and itching.",
    "photo_url": "https://surli.cc/hkfhpu"
  },
  {
    "medicine_name": "Aspirin",
    "tags": ["Blood Thinner", "Pain Relief"],
    "description": "Used for pain relief and reducing the risk of heart attacks.",
    "photo_url": "https://www.aspirin.ca/sites/g/files/vrxlpx30151/files/2021-06/Aspirin-81mg-tablets-30ct-carton_3.png"
  },
  {
    "medicine_name": "Metformin",
    "tags": ["Diabetes", "Blood Sugar Control"],
    "description": "Helps control blood sugar levels in people with type 2 diabetes.",
    "photo_url": "https://www.poison.org/-/media/images/shared/articles/metformin.jpg"
  },
  {
    "medicine_name": "Omeprazole",
    "tags": ["Acid Reflux", "Stomach Ulcers"],
    "description": "Reduces stomach acid for treating GERD and ulcers.",
    "photo_url": "https://surl.li/najtgr"
  },
  {
    "medicine_name": "Ciprofloxacin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Broad-spectrum antibiotic used for bacterial infections.",
    "photo_url": "https://surli.cc/qgnsom"
  },
  {
    "medicine_name": "Atorvastatin",
    "tags": ["Cholesterol", "Heart Health"],
    "description": "Used to lower cholesterol and reduce risk of heart disease.",
    "photo_url": "https://surl.li/blrfzo"
  },
  {
    "medicine_name": "Salbutamol",
    "tags": ["Asthma", "Bronchodilator"],
    "description": "Relieves breathing difficulties in asthma and COPD.",
    "photo_url": "https://surl.li/yvuqqe"
  },
  {
    "medicine_name": "Ranitidine",
    "tags": ["Heartburn", "Acid Reduction"],
    "description": "Reduces stomach acid to relieve heartburn and indigestion.",
    "photo_url": "https://surl.li/ofgody"
  },
  {
    "medicine_name": "Doxycycline",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Used to treat bacterial infections and acne.",
    "photo_url": "https://surl.li/gfdiqk"
  },
  {
    "medicine_name": "Loratadine",
    "tags": ["Antihistamine", "Allergies"],
    "description": "Non-drowsy antihistamine for allergy relief.",
    "photo_url": "https://res.cloudinary.com/zava-www-uk/image/upload/a_exif,f_auto,e_sharpen:100,c_fit,w_800,h_600,fl_lossy/v1708423725/sd/uk/services-setup/hayfever/loratadine/xwmvq3ykdn0l2kjetui4.png"
  },
  {
    "medicine_name": "Clopidogrel",
    "tags": ["Blood Thinner", "Heart Health"],
    "description": "Prevents blood clots and reduces risk of heart attacks.",
    "photo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWNWTqC1Ho6eXwogNdLssvA5AyKH1rA1OmA&s"
  },
  {
    "medicine_name": "Hydrochlorothiazide",
    "tags": ["Diuretic", "Blood Pressure"],
    "description": "Helps control high blood pressure by reducing fluid retention.",
    "photo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpdWhXMu8bFj09DxmfHXdHgvJPKpRpxyPpCA&s"
  },
  {
    "medicine_name": "Levothyroxine",
    "tags": ["Thyroid Hormone", "Hypothyroidism"],
    "description": "Used to treat underactive thyroid conditions.",
    "photo_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT64GHQK97Ni_VqnJwwI-Ip5tQj6GxBFMrCJg&s"
  },
  {
    "medicine_name": "Simvastatin",
    "tags": ["Cholesterol", "Heart Health"],
    "description": "Lowers cholesterol and reduces risk of heart disease.",
    "photo_url": "https://surli.cc/nkehgo"
  },
  {
    "medicine_name": "Prednisolone",
    "tags": ["Steroid", "Anti-inflammatory"],
    "description": "Used to reduce inflammation and suppress the immune system.",
    "photo_url": "https://surl.li/qqnxcs"
  },
  {
    "medicine_name": "Acetaminophen",
    "tags": ["Pain Relief", "Fever"],
    "description": "Alternative to Paracetamol for pain and fever relief.",
    "photo_url": "https://surl.li/qqvbwc"
  },
  {
    "medicine_name": "Losartan",
    "tags": ["Blood Pressure", "Heart Health"],
    "description": "Used to treat high blood pressure and protect kidney function.",
    "photo_url": "https://surli.cc/scgbsa"
  },
  {
    "medicine_name": "Gabapentin",
    "tags": ["Nerve Pain", "Seizures"],
    "description": "Helps manage nerve pain and epilepsy.",
    "photo_url": "https://surl.li/jfmtxi"
  },
  {
    "medicine_name": "Fluoxetine",
    "tags": ["Antidepressant", "Mental Health"],
    "description": "Used to treat depression and anxiety disorders.",
    "photo_url": "https://surli.cc/joujvf"
  },
  {
    "medicine_name": "Warfarin",
    "tags": ["Blood Thinner", "Clot Prevention"],
    "description": "Reduces the risk of blood clots and strokes.",
    "photo_url": "https://surl.li/cniwtk"
  },
  {
    "medicine_name": "Azithromycin",
    "tags": ["Antibiotic", "Bacterial Infections"],
    "description": "Common antibiotic for treating bacterial infections.",
    "photo_url": "https://surl.li/fcsgla"
  },
  {
    "medicine_name": "Diphenhydramine",
    "tags": ["Antihistamine", "Sleep Aid"],
    "description": "Used for allergies and as a sleep aid.",
    "photo_url": "https://surli.cc/ojatvp"
  },
  {
    "medicine_name": "Montelukast",
    "tags": ["Asthma", "Allergy Control"],
    "description": "Helps control asthma and allergic rhinitis.",
    "photo_url": "https://surli.cc/dewznl"
  },
  {
    "medicine_name": "Naproxen",
    "tags": ["Pain Relief", "Anti-inflammatory"],
    "description": "Long-lasting pain relief for arthritis and muscle pain.",
    "photo_url": "https://5.imimg.com/data5/SELLER/Default/2022/7/RT/TQ/DN/144505622/naproxen-tablets-ip-500mg.jpeg"
  },
  {
    "medicine_name": "Furosemide",
    "tags": ["Diuretic", "Heart Failure"],
    "description": "Used to reduce fluid buildup in conditions like heart failure.",
    "photo_url": "https://surli.cc/ckhsoh"
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
    description: `${med.medicine_name} is typically used for ${med.tags.join(', ')}. ${med.description} For detailed information, including specific uses, contraindications, and potential interactions, please consult a healthcare professional or refer to the patient information leaflet that comes with the medicine.`,
    dosage: 'Dosage varies depending on the condition being treated and individual patient factors. Always follow the dosage instructions provided by your doctor or pharmacist. Do not exceed the recommended dose.',
    sideEffects: 'Like all medicines, this drug can cause side effects, although not everybody gets them. Common side effects may include nausea or headache. If you experience any severe side effects or allergic reactions, seek medical attention immediately.',
    precautions: 'Before taking this medicine, inform your doctor or pharmacist if you have any allergies, pre-existing medical conditions (such as liver or kidney problems), or if you are pregnant, planning to become pregnant, or breastfeeding. Avoid consuming alcohol if advised against it with this medication. Keep out of reach of children.',
    category: firstTag,
    price: 50, 
    tags: med.tags,
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
  topic: string; 
  title: string;
  description?: string; 
  videoUrl: string; // This will be the YouTube embed URL
  thumbnailUrl: string; 
  dataAiHint?: string;
  uploader: string; 
  uploaderAvatar: string; 
  likes: number; 
}

// Helper to extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === 'youtu.be') { // For short URLs like youtu.be/VIDEO_ID
          return parsedUrl.pathname.substring(1);
      }
      if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
          if (parsedUrl.pathname === '/watch') { // For watch?v=VIDEO_ID
            return parsedUrl.searchParams.get('v');
          }
          if (parsedUrl.pathname.startsWith('/embed/')) { // For /embed/VIDEO_ID
            return parsedUrl.pathname.substring('/embed/'.length).split('?')[0];
          }
          if (parsedUrl.pathname.startsWith('/shorts/')) { // For /shorts/VIDEO_ID
            return parsedUrl.pathname.substring('/shorts/'.length);
          }
      }
  } catch (e) {
      console.error("Error parsing YouTube URL for ID:", url, e);
  }
  return null;
};


const rawInstagramReelsData = [
  {
    "topic": "Fitness",
    "reels": [
      {
        "title": "Beginner Calisthenics Workout",
        "description": "Quick calisthenics routine for beginners—perfect for home workouts.",
        "url": "https://www.youtube.com/shorts/gC_L9qAHVJ8", // Example YouTube Short
        "account": "@learn_calisthenics",
        "details": "Demonstrates basic movements and progressions for newbies."
      },
      {
        "title": "5-Minute Full Body Workout",
        "description": "Fast and effective full body workout for all fitness levels.",
        "url": "https://www.youtube.com/shorts/41n9K3TRTY4", // Example YouTube Short
        "account": "@docjenfit",
        "details": "Short, dynamic routine with clear instructions."
      },
      {
        "title": "Fun Workout Challenge",
        "description": "Try this challenge to spice up your fitness routine!",
        "url": "https://www.youtube.com/shorts/VfVdJAUh2Yw", // Example YouTube Short
        "account": "@michalynnrivas",
        "details": "Encourages participation and community engagement."
      }
    ]
  },
  {
    "topic": "Nutrition",
    "reels": [
      {
        "title": "Healthy Meal Prep Ideas",
        "description": "Simple, nutritious meal prep for busy weekdays.",
        "url": "https://www.youtube.com/shorts/rG3xXQdyuPM", // Example YouTube Short
        "account": "@nutritionstripped",
        "details": "Step-by-step guide to healthy eating."
      },
      {
        "title": "Balanced Breakfast Recipes",
        "description": "Easy breakfast ideas to start your day right.",
        "url": "https://www.youtube.com/shorts/t0Y2GIR-L2I", // Example YouTube Short
        "account": "@healthyfoodguide",
        "details": "Quick recipes with nutritional breakdowns."
      },
      {
        "title": "Snack Hacks for Energy",
        "description": "Healthy snack ideas to keep you energized.",
        "url": "https://www.youtube.com/shorts/2VvK5t7Q9qU", // Example YouTube Short
        "account": "@mindfulnutritionist",
        "details": "Smart snack choices for sustained energy."
      }
    ]
  },
  {
    "topic": "Mental Wellness",
    "reels": [
      {
        "title": "Simple Mental Health Reminder",
        "description": "Gentle reminders to prioritize self-care and mental health.",
        "url": "https://www.youtube.com/shorts/inpok4MKVLM",
        "account": "@howmental",
        "details": "Soothing visuals and powerful quotes for mindfulness[2][5]."
      },
      {
        "title": "Daily Gratitude Practice",
        "description": "Quick gratitude journaling tips for positivity.",
        "url": "https://www.youtube.com/shorts/XQ3o_4V0YJw", // Example YouTube Short
        "account": "@fiveminutejournal",
        "details": "Encourages daily reflection and happiness[5]."
      },
      {
        "title": "Mindfulness Meditation",
        "description": "Short guided meditation for stress relief.",
        "url": "https://www.youtube.com/shorts/zSkFFW--Ma0", // Example YouTube Short
        "account": "@selfcareisapriority",
        "details": "Helps center and calm the mind[5]."
      }
    ]
  },
  {
    "topic": "Yoga",
    "reels": [
      {
        "title": "Morning Yoga Flow",
        "description": "Gentle yoga routine to start your day.",
        "url": "https://www.youtube.com/shorts/s2NQhpFGIOg",
        "account": "@yoga_girl",
        "details": "Easy-to-follow poses for all levels."
      },
      {
        "title": "Yoga for Stress Relief",
        "description": "Yoga sequence to reduce anxiety and stress.",
        "url": "https://www.youtube.com/shorts/NjjK2n27J0s", // Example YouTube Short
        "account": "@yogawithadriene",
        "details": "Focuses on relaxation and breathing."
      },
      {
        "title": "5-Minute Yoga Break",
        "description": "Quick yoga break for work or study.",
        "url": "https://www.youtube.com/shorts/0pBu_n0_vIA", // Example YouTube Short
        "account": "@yogawithkassandra",
        "details": "Short, effective routine for busy schedules."
      }
    ]
  },
  {
    "topic": "Health Info",
    "reels": [
      {
        "title": "Doctor’s Health Tips",
        "description": "Quick health advice from a medical professional.",
        "url": "https://www.youtube.com/shorts/TkomAY9aRjM", // Example YouTube Short
        "account": "@doctor.mike",
        "details": "Explains medical concepts in simple terms[3]."
      },
      {
        "title": "Healthy Lifestyle Hacks",
        "description": "Tips for maintaining a healthy lifestyle.",
        "url": "https://www.youtube.com/shorts/h_3xY_z3T8M", // Example YouTube Short
        "account": "@healthline",
        "details": "Evidence-based health information."
      },
      {
        "title": "Debunking Health Myths",
        "description": "Separating fact from fiction in health trends.",
        "url": "https://www.youtube.com/shorts/70nISrI24gM", // Example YouTube Short
        "account": "@clevelandclinic",
        "details": "Reliable info from trusted medical sources."
      },
       {
        "title": "CPR in Action | A 3D Look Inside the Body",
        "description": "A dynamic 3D animation showing internal mechanics and importance of effective CPR.",
        "url": "https://www.youtube.com/watch?v=DUaxt8OlT3o", 
        "account": "@HealthOrgCPR",
        "details": "CPR guide"
      },
      {
        "title": "Act FAST animation – Every minute counts",
        "description": "Animated public health video illustrating stroke signs using the FAST acronym.",
        "url": "https://www.youtube.com/watch?v=vc9OF64H4sE",
        "account": "@NHSStrokeAware",
        "details": "Stroke signs"
      }
    ]
  }
];

// Example YouTube Video IDs to be used for substitution
const exampleYouTubeVideoIdsByTopic: Record<string, string[]> = {
  "Fitness": ["gC_L9qAHVJ8", "41n9K3TRTY4", "VfVdJAUh2Yw"],
  "Nutrition": ["rG3xXQdyuPM", "t0Y2GIR-L2I", "2VvK5t7Q9qU"],
  "Mental Wellness": ["inpok4MKVLM", "XQ3o_4V0YJw", "zSkFFW--Ma0"],
  "Yoga": ["s2NQhpFGIOg", "NjjK2n27J0s", "0pBu_n0_vIA"],
  "Health Info": ["TkomAY9aRjM", "h_3xY_z3T8M", "70nISrI24gM", "DUaxt8OlT3o", "vc9OF64H4sE"],
};

export const mockHealthReels: HealthReel[] = rawInstagramReelsData.flatMap((topicData, topicIndex) => 
  topicData.reels.map((reel, reelIndex): HealthReel => {
    const exampleVideoIds = exampleYouTubeVideoIdsByTopic[topicData.topic] || [];
    const videoId = exampleVideoIds[reelIndex % exampleVideoIds.length] || 'dQw4w9WgXcQ'; // Fallback to a known video if not enough examples

    const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Base embed URL
    
    return {
      id: `reel_${topicData.topic.toLowerCase().replace(/\s+/g, '-')}_${reelIndex + 1}`,
      topic: topicData.topic,
      title: reel.title,
      description: reel.description,
      videoUrl: embedUrl, // Use the constructed embed URL
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      dataAiHint: reel.description ? reel.description.toLowerCase().split(' ').slice(0,2).join(' ') : topicData.topic.toLowerCase(),
      uploader: reel.account,
      uploaderAvatar: 'https://placehold.co/50x50.png', 
      likes: Math.floor(Math.random() * 2000) + 500,
    };
  })
);


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
    videoUrl: 'https://www.youtube.com/embed/DUaxt8OlT3o', // Using an example video
    imageUrl: 'https://img.youtube.com/vi/DUaxt8OlT3o/0.jpg',
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
    imageUrl: 'https://placehold.co/400x225.png', // Placeholder, could be a YouTube thumbnail
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
  
