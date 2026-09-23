export type NoticeCategory =
  | 'admissions'
  | 'academic'
  | 'holiday'
  | 'event'
  | 'circular'
  | 'exam'
  | 'general';

export interface Notice {
  id: number;
  title: string;
  category: NoticeCategory;
  body: string;
  fileUrl?: string;
  isActive: boolean;
  publishDate: string;
  createdAt: string;
}

export type FacultyDesignation =
  | 'Principal'
  | 'Vice Principal'
  | 'Senior Teacher'
  | 'PRT'
  | 'TGT'
  | 'PGT'
  | 'Computer Instructor'
  | 'Hostel Warden'
  | 'Administrative Officer';

export interface Faculty {
  id: number;
  name: string;
  designation: FacultyDesignation;
  qualification: string;
  subject: string;
  joinedYear: number;
  imageUrl?: string;
  orderIndex: number;
}

export type DisclosureCategory =
  | 'society-registration'
  | 'noc'
  | 'fire-safety'
  | 'building-safety'
  | 'water-sanitation'
  | 'fee-structure'
  | 'academic-calendar'
  | 'student-teacher-ratio'
  | 'affiliation-letter'
  | 'annual-report';

export interface Disclosure {
  id: number;
  documentTitle: string;
  category: DisclosureCategory;
  description?: string;
  fileUrl: string;
  updatedAt: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'enrolled' | 'closed';

export interface Inquiry {
  id: number;
  studentName: string;
  guardianName: string;
  phone: string;
  email?: string;
  classApplied: string;
  message?: string;
  status: InquiryStatus;
  createdAt: string;
}