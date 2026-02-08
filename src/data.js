export const SUBJECTS = [
  { id: 'art_gc', name: 'Art & Design Graphic Communication', code: 'ART' },
  { id: 'bus', name: 'Business Studies', code: 'BUS' },
  { id: 'cons', name: 'Construction & Built Environment', code: 'CONST' },
  { id: 'fr', name: 'French', code: 'FR' },
  { id: 'hist', name: 'History', code: 'HUM' },
  { id: 'geo', name: 'Geography', code: 'HUM' },
  { id: 'hosp', name: 'Hospitality & Catering', code: 'HOSP' },
  { id: 'dt', name: 'Design & Technology (DT)', code: 'DT' },
  { id: 'sport', name: 'Sport Studies', code: 'SPORT' },
  { id: 'cs', name: 'GCSE Computer Science', code: 'CS' },
  { id: 're', name: 'Religious Education', code: 'RE' },
  { id: 'imedia', name: 'Level 1/2 Creative iMedia', code: 'IMEDIA' },
  { id: 'drama', name: 'Drama', code: 'DRAMA' },
  { id: 'triple', name: 'GCSE Triple Science', code: 'TRIPLE' }
];

export const BLOCKS = {
  A: ['art_gc', 'bus', 'cons', 'fr', 'hist', 'hosp'],
  B: ['bus', 'dt', 'geo', 'hist', 'hosp', 'sport'],
  C: ['hist', 'geo', 'cs', 'sport', 're', 'cons'],
  D: ['geo', 'triple', 'imedia', 'drama', 'cons', 'art_gc', 're']
};

export const MUTUAL_EXCLUSIONS = [
  ['CS', 'IMEDIA'],
  ['DT', 'CONST']
];

export const BLOCK_ORDER = ['A', 'B', 'C', 'D'];

export const EBACC_CODES = new Set(['HUM']);

export const SPECIAL_REVIEW = {
  C: { code: 'CS', label: 'GCSE Computer Science' },
  D: { code: 'TRIPLE', label: 'GCSE Triple Science' }
};

export const SUBJECT_BY_ID = SUBJECTS.reduce((acc, subject) => {
  acc[subject.id] = subject;
  return acc;
}, {});

export const BLOCK_SUBJECTS = Object.keys(BLOCKS).reduce((acc, blockId) => {
  acc[blockId] = BLOCKS[blockId].map(id => SUBJECT_BY_ID[id]);
  return acc;
}, {});

export const SUBJECT_PAGES = [
  {
    id: 'art_gc',
    title: 'GCSE Art & Design: Graphic Communication',
    leader: 'Mrs Bentley',
    board: 'EDUQAS',
    overview:
      'Explore visual communication through mixed media, from digital design to traditional mark-making. Students choose themes that build on their strengths and creativity.',
    highlights: [
      'Photoshop and mixed-media techniques',
      'Independent project development and research',
      'Portfolio building with analysis and evaluation'
    ],
    assessment: [
      'Component 1: Coursework portfolio (60%)',
      'Component 2: Externally set assignment (40%)'
    ],
    careers:
      'A Level Graphic Design, 3D Design, Art & Design, Interior/Product Design, Graphic design apprenticeships, architecture, animation, publishing, teaching.'
  },
  {
    id: 'bus',
    title: 'GCSE Business Studies',
    leader: 'Mrs Williams',
    board: 'Edexcel',
    overview:
      'Understand how businesses start, grow, and make decisions. Learn about marketing, finance, operations, and people management through real-world case studies.',
    highlights: [
      'Entrepreneurship and spotting opportunities',
      'Marketing and operations decisions',
      'Finance and human resources fundamentals'
    ],
    assessment: [
      'Paper 1: Investigating small business (50%)',
      'Paper 2: Building a business (50%)'
    ],
    careers:
      'A Level Business, T Level Management, apprenticeships in business/admin, careers in retail, hospitality, finance, and management.'
  },
  {
    id: 'cs',
    title: 'GCSE Computer Science',
    leader: 'Mrs Williams',
    board: 'OCR',
    overview:
      'Learn the principles behind computing systems, algorithms, and programming. This course is theory-heavy with strong problem-solving expectations.',
    highlights: [
      'Algorithms, logic, and programming fundamentals',
      'Computer systems and networks',
      'Digital technology impacts and ethics'
    ],
    assessment: [
      'Paper 1: Computer systems (50%)',
      'Paper 2: Computational thinking, algorithms, programming (50%)'
    ],
    careers:
      'A Levels in Computing/CS, Engineering or Science. Pathways into software, cybersecurity, data, and apprenticeships.',
    notes:
      'Teacher review required: subject leader approval based on Attitude to Learning and assessment performance.'
  },
  {
    id: 'cons',
    title: 'Level 1/2 Award in Construction & Built Environment',
    leader: 'Mrs Bentley',
    board: 'Eduqas',
    overview:
      'A hands-on course introducing construction trades, materials, safety, and sustainability. Learners build practical skills in workshop settings.',
    highlights: [
      'Industry roles, safety, and environmental impact',
      'Practical trade areas such as joinery, plumbing, electrical',
      'Project planning, execution, and evaluation'
    ],
    assessment: [
      'Unit 1: Externally assessed theory (40%)',
      'Unit 3: Internally assessed practical portfolio (60%)'
    ],
    careers:
      'Apprenticeships and Level 3 study in construction, engineering, trades, project management, quantity surveying.'
  },
  {
    id: 'imedia',
    title: 'Level 1/2 Award in Creative iMedia',
    leader: 'Mrs Williams',
    board: 'OCR',
    overview:
      'Develop digital media skills across visual identity, interactive media, and industry knowledge. Focus on coursework and creative briefs.',
    highlights: [
      'Graphic design and visual identity projects',
      'Interactive digital products',
      'Understanding media industry and audiences'
    ],
    assessment: [
      'Coursework units across Years 10-11',
      '1.5 hour written examination',
      'Assessment weighting: 25%, 35%, 40%'
    ],
    careers:
      'A Levels or vocational routes in Computing/IT/Creative Media, apprenticeships, web and media development.'
  },
  {
    id: 'dt',
    title: 'GCSE Design & Technology',
    leader: 'Mrs Bentley',
    board: 'AQA',
    overview:
      'Design, make, and evaluate products that solve real problems. Students apply creativity with practical making and iterative design.',
    highlights: [
      'Modern technologies, materials, and processes',
      'Iterative design and prototyping',
      'STEM links and problem solving'
    ],
    assessment: [
      'Component 1: Written exam (50%)',
      'Component 2: Design and make task (50%)'
    ],
    careers:
      'Product design, engineering, architecture, user experience design, and creative technology pathways.'
  },
  {
    id: 'drama',
    title: 'GCSE Drama',
    leader: 'Mrs Tickle',
    board: 'AQA',
    overview:
      'Develop performance skills, script interpretation, and creative collaboration. Ideal for students who enjoy theatre and teamwork.',
    highlights: [
      'Devising and performance development',
      'Scripted work and interpretation',
      'Understanding theatre roles and styles'
    ],
    assessment: [
      'Component 1: Written exam (40%)',
      'Component 2: Devised performance + log (40%)',
      'Component 3: Texts in practice (20%)'
    ],
    careers:
      'A Level Theatre Studies/Performing Arts, production roles, performance pathways, and creative industries.'
  },
  {
    id: 'fr',
    title: 'GCSE French',
    leader: 'Miss Bailey',
    board: 'AQA',
    overview:
      'Build confidence in speaking, listening, reading, and writing French across real-life themes and cultural contexts.',
    highlights: [
      'People and lifestyle, popular culture, communication',
      'Speaking tasks and role-play',
      'Listening, reading, and translation skills'
    ],
    assessment: [
      'Paper 1 Listening (25%)',
      'Paper 2 Speaking (25%)',
      'Paper 3 Reading (25%)',
      'Paper 4 Writing (25%)'
    ],
    careers:
      'A Level languages, translation, tourism, diplomacy, journalism, international business.'
  },
  {
    id: 'geo',
    title: 'GCSE Geography',
    leader: 'Mr Baker',
    board: 'AQA',
    overview:
      'Study the physical and human world: hazards, landscapes, development, and resource management, with real-world case studies.',
    highlights: [
      'Natural hazards and physical landscapes',
      'Urban issues and economic change',
      'Fieldwork and geographical skills'
    ],
    assessment: [
      'Paper 1: Living with the Physical Environment (35%)',
      'Paper 2: Challenges in the Human Environment (35%)',
      'Paper 3: Geographical Applications (30%)'
    ],
    careers:
      'Highly valued by employers. Careers in planning, environmental management, engineering, research, and more.'
  },
  {
    id: 'hist',
    title: 'GCSE History',
    leader: 'Mr Harris',
    board: 'OCR',
    overview:
      'Build strong chronological understanding and analytical writing through British and world history topics and site studies.',
    highlights: [
      'Crime and Punishment, Norman Conquest',
      'History Around Us site study',
      'Nazi Germany and Making of America'
    ],
    assessment: [
      'Component 1: British History (40%)',
      'Component 2: History Around Us (20%)',
      'Component 3: World History (40%)'
    ],
    careers:
      'A Levels and degrees in humanities, law, politics, journalism, civil service, education.'
  },
  {
    id: 'hosp',
    title: 'Level 1/2 Award in Hospitality & Catering',
    leader: 'Mrs Bentley',
    board: 'Eduqas',
    overview:
      'Learn about the hospitality industry, food safety, and nutrition while developing practical cooking skills.',
    highlights: [
      'Industry knowledge and health & safety',
      'Menu planning and nutrition',
      'Practical cooking techniques'
    ],
    assessment: [
      'Unit 1: Written exam (40%)',
      'Unit 2: Coursework & practical exam (60%)'
    ],
    careers:
      'Professional cookery, hospitality, food manufacturing, nutrition, and apprenticeships in the sector.'
  },
  {
    id: 're',
    title: 'GCSE Religious Studies',
    leader: 'Mr Harris',
    board: 'AQA',
    overview:
      'Explore religion, ethics, and philosophy through contemporary issues and faith traditions with strong debate skills.',
    highlights: [
      'Beliefs and practices in Christianity and Islam',
      'Ethics, justice, and human rights themes',
      'Critical thinking and argument structure'
    ],
    assessment: [
      'Paper 1: Study of religions (50%)',
      'Paper 2: Thematic studies (50%)'
    ],
    careers:
      'Skills for law, education, public service, and roles requiring empathy and ethical reasoning.'
  },
  {
    id: 'sport',
    title: 'Cambridge National Level 1/2 Award in Sport Studies',
    leader: 'Mr Linton',
    board: 'OCR',
    overview:
      'Combine practical performance and leadership with understanding contemporary issues in sport.',
    highlights: [
      'Leadership in sport and decision making',
      'Performance in two sports',
      'Outdoor and adventurous activities'
    ],
    assessment: [
      'R184: Contemporary issues in sport (40% exam)',
      'R185: Performance and leadership (40% coursework)',
      'R187: Outdoor activities (20% coursework)'
    ],
    careers:
      'Progression to Level 3 sport qualifications, coaching, fitness, leisure, and sport science pathways.'
  },
  {
    id: 'triple',
    title: 'GCSE Triple Science',
    leader: 'Mrs Scott',
    board: 'AQA',
    overview:
      'Study Biology, Chemistry, and Physics in depth and earn three GCSEs. Ideal for students aiming for science A Levels.',
    highlights: [
      'Advanced content across three sciences',
      'Strong foundation for A Level study',
      'High commitment required'
    ],
    assessment: [
      'Biology Paper 1 (50%) and Paper 2 (50%)',
      'Chemistry Paper 1 (50%) and Paper 2 (50%)',
      'Physics Paper 1 (50%) and Paper 2 (50%)'
    ],
    careers:
      'Medical, engineering, chemistry, physics, and science-based university pathways.',
    notes:
      'Teacher review required: subject leader approval based on Attitude to Learning and assessment performance.'
  }
];
