export type CategoryType = 
  | 'assignments'
  | 'mazmoon'
  | 'stories'
  | 'grammar'
  | 'vocabulary'
  | 'class_notes';

export interface EducationalItem {
  id: string;
  title: string;
  urduTitle?: string;
  category: CategoryType;
  classLevel: string; // e.g., 'Matric (9th)', 'AIOU', 'B.Ed', 'Play Group', 'FSc (11th)'
  subject: string;
  code?: string; // e.g. '1423', '8601'
  price: number; // PKR: 300 for assignment, 50 for mazmoon/story, 0 for free notes, 200 for upload
  description: string;
  previewContent: string;
  fullContent?: string;
  rating: number;
  downloadsCount: number;
  language: 'Urdu' | 'English' | 'Bilingual';
  isPopular?: boolean;
  semester?: string;
}

export interface StudentOrder {
  id: string;
  studentName: string;
  whatsappNumber: string;
  itemTitle: string;
  classLevel: string;
  price: number;
  paymentMethod: 'JazzCash' | 'Easypaisa';
  trxId?: string;
  status: 'Pending' | 'Verified' | 'Completed';
  createdAt: string;
  driveFileUrl?: string;
  fileNotes?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  urduTitle: string;
  category: 'Tenses' | 'Active Passive' | 'Direct Indirect' | 'Parts of Speech' | 'Applications' | 'Letters';
  formula?: string;
  urduIdentification?: string;
  examples: { english: string; urdu: string }[];
  rules: string[];
}

export interface VocabWord {
  id: string;
  english: string;
  urduMeaning: string;
  pronunciationUrdu: string;
  partOfSpeech: string;
  exampleSentence: string;
  urduSentence: string;
}
