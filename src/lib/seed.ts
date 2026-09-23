import type { Notice, Faculty, Disclosure, Inquiry } from './types';

/**
 * Mock seed data — replaces D1 reads in development when no DB is configured.
 * Real production reads/writes go through lib/db.ts which routes to D1.
 */

export const SEED_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Admissions 2026–27 — Free for this month',
    category: 'admissions',
    body:
      'Applications for the 2026–27 academic year are open at the school office. Admission fee is waived for all classes during this month. Bring birth certificate, Aadhaar card of parent, and two photographs.',
    isActive: true,
    publishDate: '2026-09-12',
    createdAt: '2026-09-12T09:30:00Z',
  },
  {
    id: 2,
    title: 'Free Education for Orphan Children',
    category: 'admissions',
    body:
      'As per the school\'s standing scholarship, 100% free education is provided to orphan children — tuition, books, uniform, and bus fee all waived. Apply with certificate from Block Development Officer.',
    isActive: true,
    publishDate: '2026-09-08',
    createdAt: '2026-09-08T11:00:00Z',
  },
  {
    id: 3,
    title: 'Half-yearly Examination Timetable, Classes 9–10',
    category: 'exam',
    body:
      'Half-yearly examinations for Classes 9 and 10 will be held from 14 October 2026. Detailed date-sheet is displayed on the school notice board and circulated to parents via SMS.',
    fileUrl: '/files/half-yearly-date-sheet-2026.pdf',
    isActive: true,
    publishDate: '2026-09-15',
    createdAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 4,
    title: 'Parent–Teacher Meeting, Saturday 26 September',
    category: 'event',
    body:
      'PTM for all classes from Nursery to Class 10 will be held on Saturday, 26 September 2026 from 09:30 to 13:00. Attendance is expected of at least one parent per student.',
    isActive: true,
    publishDate: '2026-09-10',
    createdAt: '2026-09-10T14:00:00Z',
  },
  {
    id: 5,
    title: 'Holiday Notice — Mahatma Gandhi Jayanti',
    category: 'holiday',
    body:
      'The school will remain closed on Thursday, 2 October 2026 on account of Gandhi Jayanti. Hostel students will report one day earlier per hostel warden instruction.',
    isActive: true,
    publishDate: '2026-09-18',
    createdAt: '2026-09-18T09:00:00Z',
  },
  {
    id: 6,
    title: 'New Bus Route — Dumri–Bagodar via Aura',
    category: 'circular',
    body:
      'A new school bus will operate on the Dumri–Bagodar route via Aura from Monday, 28 September 2026. Pickup and drop timings are issued term-wise to parents of registered students.',
    isActive: true,
    publishDate: '2026-09-05',
    createdAt: '2026-09-05T12:00:00Z',
  },
  {
    id: 7,
    title: 'Annual Function — 15 November 2026',
    category: 'event',
    body:
      'The 6th Annual Function will be held on 15 November 2026 in the school assembly ground. Parents and guardians are invited. Detailed programme card will be circulated closer to the date.',
    isActive: true,
    publishDate: '2026-09-01',
    createdAt: '2026-09-01T08:00:00Z',
  },
];

export const SEED_FACULTY: Faculty[] = [
  {
    id: 1,
    name: 'Sri Rajesh Kumar Mahto',
    designation: 'Principal',
    qualification: 'M.A. (English), B.Ed.',
    subject: 'English',
    joinedYear: 2021,
    orderIndex: 1,
  },
  {
    id: 2,
    name: 'Smt. Prabha Devi',
    designation: 'Vice Principal',
    qualification: 'M.A. (Hindi), B.Ed.',
    subject: 'Hindi',
    joinedYear: 2021,
    orderIndex: 2,
  },
  {
    id: 3,
    name: 'Sri Sanjay Kumar',
    designation: 'Senior Teacher',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    subject: 'Mathematics',
    joinedYear: 2022,
    orderIndex: 3,
  },
  {
    id: 4,
    name: 'Smt. Asha Kumari',
    designation: 'TGT',
    qualification: 'M.Sc. (Physics), B.Ed.',
    subject: 'Science',
    joinedYear: 2022,
    orderIndex: 4,
  },
  {
    id: 5,
    name: 'Sri Mukesh Ram',
    designation: 'TGT',
    qualification: 'M.A. (History), B.Ed.',
    subject: 'Social Science',
    joinedYear: 2023,
    orderIndex: 5,
  },
  {
    id: 6,
    name: 'Smt. Neelam Devi',
    designation: 'PRT',
    qualification: 'B.A., D.El.Ed.',
    subject: 'Primary',
    joinedYear: 2021,
    orderIndex: 6,
  },
  {
    id: 7,
    name: 'Sri Vikash Kumar',
    designation: 'Computer Instructor',
    qualification: 'B.Tech (CSE), PGDCA',
    subject: 'Computer',
    joinedYear: 2023,
    orderIndex: 7,
  },
  {
    id: 8,
    name: 'Smt. Sunita Oraon',
    designation: 'Hostel Warden',
    qualification: 'B.A.',
    subject: '—',
    joinedYear: 2022,
    orderIndex: 8,
  },
  {
    id: 9,
    name: 'Sri Birsa Munda',
    designation: 'Administrative Officer',
    qualification: 'B.Com.',
    subject: '—',
    joinedYear: 2022,
    orderIndex: 9,
  },
];

export const SEED_DISCLOSURES: Disclosure[] = [
  {
    id: 1,
    documentTitle: 'Society Registration Certificate',
    category: 'society-registration',
    description: 'Registration under the Societies Registration Act, 1860.',
    fileUrl: '/files/society-registration.pdf',
    updatedAt: '2026-04-01',
  },
  {
    id: 2,
    documentTitle: 'No Objection Certificate (NOC)',
    category: 'noc',
    description: 'NOC issued by the Department of Education, Government of Jharkhand.',
    fileUrl: '/files/noc.pdf',
    updatedAt: '2026-04-01',
  },
  {
    id: 3,
    documentTitle: 'Fire Safety Certificate',
    category: 'fire-safety',
    description: 'Issued by the Office of the Chief Fire Officer, Giridih.',
    fileUrl: '/files/fire-safety.pdf',
    updatedAt: '2026-03-15',
  },
  {
    id: 4,
    documentTitle: 'Building Safety Certificate',
    category: 'building-safety',
    description: 'Structural stability certificate from registered engineer.',
    fileUrl: '/files/building-safety.pdf',
    updatedAt: '2026-03-15',
  },
  {
    id: 5,
    documentTitle: 'Water & Sanitation Certificate',
    category: 'water-sanitation',
    description: 'Issued by Public Health Engineering Department.',
    fileUrl: '/files/water-sanitation.pdf',
    updatedAt: '2026-03-15',
  },
  {
    id: 6,
    documentTitle: 'Fee Structure 2026–27',
    category: 'fee-structure',
    description: 'Approved tuition, admission, and development fee schedule.',
    fileUrl: '/files/fee-structure.pdf',
    updatedAt: '2026-04-01',
  },
  {
    id: 7,
    documentTitle: 'Academic Calendar 2026–27',
    category: 'academic-calendar',
    description: 'Term dates, examinations, and holidays for the current academic session.',
    fileUrl: '/files/academic-calendar.pdf',
    updatedAt: '2026-04-01',
  },
  {
    id: 8,
    documentTitle: 'Student–Teacher Ratio',
    category: 'student-teacher-ratio',
    description: 'Current ratio across all classes, audited annually.',
    fileUrl: '/files/str.pdf',
    updatedAt: '2026-04-01',
  },
  {
    id: 9,
    documentTitle: 'Annual Report 2025–26',
    category: 'annual-report',
    description: 'Annual report covering academic year 2025–26.',
    fileUrl: '/files/annual-report.pdf',
    updatedAt: '2026-05-30',
  },
];

export const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    studentName: 'Riya Kumari',
    guardianName: 'Suresh Kumar',
    phone: '+91 9876543210',
    classApplied: 'Class 3',
    message: 'Looking for admission. Have a 7-year-old daughter.',
    status: 'new',
    createdAt: '2026-09-18T08:30:00Z',
  },
  {
    id: 2,
    studentName: 'Aman Raj',
    guardianName: 'Vinod Raj',
    phone: '+91 9123456789',
    classApplied: 'Class 6',
    message: 'Interested in hostel facility. Both parents working.',
    status: 'contacted',
    createdAt: '2026-09-15T14:20:00Z',
  },
];