import { EducationalItem, GrammarLesson, VocabWord } from '../types';

export const ALL_CLASSES = [
  'All Classes',
  'Play Group & Nursery',
  'Primary (1st-5th)',
  'Middle (6th-8th)',
  'Matric (9th & 10th)',
  'FA / FSc / ICS (11th & 12th)',
  'BA / BSc / Associate Degree',
  'B.Ed & M.Ed',
  'BS / Masters',
  'AIOU (Allama Iqbal Open University)',
  'Punjab University (PU)',
];

export const EDUCATIONAL_ITEMS: EducationalItem[] = [
  // 1. Solved Assignments (300 PKR each)
  {
    id: 'assign-aiou-1423',
    title: 'AIOU Code 1423 Solved Assignment 1 & 2',
    urduTitle: 'علامہ اقبال اوپن یونیورسٹی کوڈ 1423 حل شدہ اسائنمنٹ',
    category: 'assignments',
    classLevel: 'AIOU (Allama Iqbal Open University)',
    subject: 'Compulsory English-I',
    code: '1423',
    price: 300,
    semester: 'Autumn & Spring Semester',
    description: 'Complete solved assignment for BA / B.Com / Associate Degree code 1423 with accurate grammar answers, essays, and reading comprehension.',
    previewContent: `Q1: Write a descriptive paragraph on "A Memorable Day at College".
Answer: A college life is full of sweet memories, but the first annual sports gala day was truly memorable. The campus was decorated with colorful banners...
Q2: Change the following sentences from active to passive voice.
1. The student wrote an assignment. -> An assignment was written by the student.
2. She has completed her project. -> Her project has been completed by her.`,
    rating: 4.9,
    downloadsCount: 1420,
    language: 'English',
    isPopular: true,
  },
  {
    id: 'assign-aiou-1424',
    title: 'AIOU Code 1424 Solved Assignment 1 & 2',
    urduTitle: 'اے آئی او یو کوڈ 1424 حل شدہ اسائنمنٹس',
    category: 'assignments',
    classLevel: 'AIOU (Allama Iqbal Open University)',
    subject: 'Compulsory English-II',
    code: '1424',
    price: 300,
    semester: 'Latest Semester',
    description: 'Detailed formal letters, job applications, job interview dialogues and essay answers strictly according to AIOU syllabus guidelines.',
    previewContent: `Q1: Draft an application to the Director of Education for the post of Junior English Teacher.
Answer: To: The Director of Education, Lahore Division. Respected Sir, With reference to your advertisement in the daily newspaper...
Q2: Write a dialogue between two friends discussing inflation in Pakistan.`,
    rating: 4.8,
    downloadsCount: 980,
    language: 'English',
    isPopular: true,
  },
  {
    id: 'assign-aiou-8601',
    title: 'AIOU Code 8601 General Methods of Teaching (B.Ed)',
    urduTitle: 'کوڈ 8601 تدریس کے عام طریقے - بی ایڈ حل شدہ اسائنمنٹ',
    category: 'assignments',
    classLevel: 'B.Ed & M.Ed',
    subject: 'General Methods of Teaching',
    code: '8601',
    price: 300,
    semester: 'B.Ed 1.5 / 2.5 Years',
    description: 'Authentic researched B.Ed assignment covering teacher-centered vs student-centered pedagogy, lesson planning, and Bloom taxonomy.',
    previewContent: `Q1: Critically examine the concept of student-centered learning. How does it promote critical thinking in secondary classrooms?
Ans: Student-centered learning shifts the role of the teacher from 'sage on the stage' to 'guide on the side'. Students actively collaborate in problem-solving...`,
    rating: 5.0,
    downloadsCount: 1840,
    language: 'English',
    isPopular: true,
  },
  {
    id: 'assign-aiou-8613',
    title: 'AIOU Code 8613 Research Project & Manual (B.Ed)',
    urduTitle: 'کوڈ 8613 ایکشن ریسرچ پراجیکٹ مکمل حل شدہ گائیڈ',
    category: 'assignments',
    classLevel: 'B.Ed & M.Ed',
    subject: 'Research Project',
    code: '8613',
    price: 300,
    semester: 'B.Ed 4th Semester',
    description: 'Complete Action Research Project sample with questionnaire, data analysis, classroom intervention, and final reflective summary.',
    previewContent: `Topic: Developing Reading Habits Among 8th Grade Students Through Interactive Storytelling.
Abstract: This action research examines the impact of 4-week structured storytelling sessions on reading fluency and comprehension among rural students...`,
    rating: 4.9,
    downloadsCount: 2200,
    language: 'English',
    isPopular: true,
  },
  {
    id: 'assign-matric-9-physics',
    title: '9th Class Physics Chapter-Wise Solved Assignment & Numericals',
    urduTitle: 'نویں کلاس فزکس مکمل حل شدہ اسائنمنٹ مع تمام عددی سوالات',
    category: 'assignments',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Physics',
    price: 300,
    description: 'All 9 units comprehensive numericals with step-by-step formulas, diagrams, and theoretical question bank tailored for all Punjab & Federal boards.',
    previewContent: `Chapter 2: Kinematics Numerical 2.1
A train starts from rest. It moves through 1 km in 100 s with uniform acceleration. Find its speed at the end of 100 s.
Given: vi = 0 m/s, S = 1000 m, t = 100 s.
Formula: S = vi*t + 0.5*a*t^2 => 1000 = 0 + 0.5*a*(10000) => a = 0.2 m/s^2.
vf = vi + a*t = 0 + (0.2)(100) = 20 m/s (72 km/h).`,
    rating: 4.9,
    downloadsCount: 1650,
    language: 'English',
  },
  {
    id: 'assign-matric-10-computer',
    title: '10th Class Computer Science C-Language Solved Assignment',
    urduTitle: 'دسویں کلاس کمپیوٹر سائنس سی لینگویج مکمل پریکٹیکل حل',
    category: 'assignments',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Computer Science',
    price: 300,
    description: 'Comprehensive solutions for C programming exercises, flowcharts, loops, if-else logic, and functions with complete dry runs.',
    previewContent: `Program: Write a C program to check whether an entered number is prime or composite.
#include <stdio.h>
int main() {
    int n, i, count = 0;
    printf("Enter a positive integer: ");
    scanf("%d", &n);
    for(i = 1; i <= n; i++) {
        if(n % i == 0) count++;
    }
    if(count == 2) printf("Prime number\\n");
    else printf("Not a prime number\\n");
    return 0;
}`,
    rating: 4.8,
    downloadsCount: 1320,
    language: 'English',
  },
  {
    id: 'assign-pu-ba-eng',
    title: 'Punjab University BA / ADA English Solved Paper Assignment',
    urduTitle: 'پنجاب یونیورسٹی بی اے انگلش حل شدہ اسائنمنٹس مع ریفرنس',
    category: 'assignments',
    classLevel: 'Punjab University (PU)',
    subject: 'English Compulsory',
    price: 300,
    description: 'Complete reference to context explanations for Modern Essays, Short Stories, and Novel The Old Man and The Sea with critical evaluation.',
    previewContent: `Reference to Context: "Man is not made for defeat. A man can be destroyed but not defeated."
Context: These inspiring words are spoken by Santiago in Ernest Hemingway's masterpiece 'The Old Man and the Sea'.
Explanation: Hemingway reflects the indomitable spirit of human perseverance...`,
    rating: 4.9,
    downloadsCount: 890,
    language: 'English',
  },

  // 2. Mazmoon / Essay Writing (50 PKR each)
  {
    id: 'maz-iqbal',
    title: 'علامہ محمد اقبال (شاعرِ مشرق) - Allama Iqbal Essay',
    urduTitle: 'مضمون: ہمارے قومی شاعر علامہ محمد اقبال',
    category: 'mazmoon',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Urdu & English',
    price: 50,
    language: 'Bilingual',
    description: 'Complete high-scoring essay with Urdu poetry couplets (اشعار), quotes, headings, and English translation.',
    previewContent: `عنوان: علامہ محمد اقبال (رحمتہ اللہ علیہ)
تمہید: علامہ محمد اقبال ہمارے قومی شاعر، مفکرِ اسلام اور مصورِ پاکستان ہیں۔ آپ نے برصغیر کے مسلمانوں کو غلامی کی نیند سے بیدار کیا۔
شعر:
نہیں تیرا نشیمن قصرِ سلطانی کے گنبد پر
تو شاہیں ہے بسیرا کر پہاڑوں کی چٹانوں میں
ولادت اور ابتدائی تعلیم: آپ 9 نومبر 1877ء کو سیالکوٹ میں پیدا ہوئے۔ ابتدائی تعلیم سیالکوٹ سے حاصل کی اور بعد ازاں گورنمنٹ کالج لاہور سے فلسفہ میں ایم اے کیا۔`,
    rating: 5.0,
    downloadsCount: 3100,
    isPopular: true,
  },
  {
    id: 'maz-quaid',
    title: 'قائداعظم محمد علی جناح - Quaid-e-Azam Muhammad Ali Jinnah',
    urduTitle: 'مضمون: بانیِ پاکستان قائداعظم محمد علی جناح',
    category: 'mazmoon',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Urdu & English',
    price: 50,
    language: 'Bilingual',
    description: 'A comprehensive essay highlighting Jinnah’s leadership, 14 points, struggle for independence, and motto: Unity, Faith, and Discipline.',
    previewContent: `تمہید: قائداعظم محمد علی جناح تاریخ کے ان عظیم رہنماؤں میں سے ہیں جنہوں نے دنیا کا جغرافیہ بدل ڈالا اور مسلمانوں کے لیے ایک آزاد ریاست وجود میں لائی۔
قول: "کام، کام اور بس کام" - قائد کا سنہری اصول
وفات: شب و روز کی انتھک محنت کے باعث ان کی صحت جواب دے گئی اور 11 ستمبر 1948ء کو اپنے خالق حقیقی سے جا ملے۔`,
    rating: 5.0,
    downloadsCount: 2950,
    isPopular: true,
  },
  {
    id: 'maz-azadi',
    title: 'یومِ آزادی پاکستان (14 اگست) - Independence Day',
    urduTitle: 'مضمون: یومِ آزادی (14 اگست) کی اہمیت',
    category: 'mazmoon',
    classLevel: 'Middle (6th-8th)',
    subject: 'Urdu & English',
    price: 50,
    language: 'Bilingual',
    description: 'Significance of August 14th, flag hoisting ceremonies, national spirit, and duties of Pakistani youth.',
    previewContent: `14 اگست 1947ء پاکستان کی تاریخ کا درخشاں ترین دن ہے۔ اس دن برصغیر کے مسلمانوں کی لازوال قربانیاں رنگ لائیں اور ایک آزاد وطن معرض وجود میں آیا۔
ہر سال پاکستان کے گلی کوچوں میں سبز ہلالی پرچم لہرائے جاتے ہیں اور قومی ترانے گائے جاتے ہیں۔`,
    rating: 4.8,
    downloadsCount: 1950,
  },
  {
    id: 'maz-science',
    title: 'سائنس کے کرشمے - Wonders of Modern Science',
    urduTitle: 'مضمون: سائنس کے کرشمے اور جدید ٹیکنالوجی',
    category: 'mazmoon',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Urdu & English',
    price: 50,
    language: 'Bilingual',
    description: 'Medical breakthroughs, communication, space exploration, electricity, artificial intelligence, and the perils of atomic warfare.',
    previewContent: `سائنس نے انسان کی زندگی کو حیرت انگیز طور پر بدل دیا ہے۔ فاصلے سمٹ گئے ہیں اور مہینوں کا سفر گھنٹوں میں طے ہونے لگا ہے۔ انٹرنیٹ اور کمپیوٹر نے دنیا کو ایک گلوبل ولیج بنا دیا ہے۔`,
    rating: 4.9,
    downloadsCount: 2400,
    isPopular: true,
  },
  {
    id: 'maz-cleanliness',
    title: 'Cleanliness is Next to Godliness (صفائی نصف ایمان ہے)',
    urduTitle: 'مضمون: صفائی کی اہمیت اور ہمارے معاشرتی فرائض',
    category: 'mazmoon',
    classLevel: 'Primary (1st-5th)',
    subject: 'Urdu & English',
    price: 50,
    language: 'Bilingual',
    description: 'Islamic perspective on Taharah (طہارت), environmental hygiene, disease prevention, and civic sense.',
    previewContent: `Hazrat Muhammad (PBUH) said: "Cleanliness is half of faith." Cleanliness keeps us physically healthy, mentally sharp, and spiritually pure. Clean schools and neighborhoods prevent epidemics like dengue and typhoid.`,
    rating: 4.7,
    downloadsCount: 1400,
  },
  {
    id: 'maz-my-friend',
    title: 'My Best Friend / میرا بہترین دوست',
    urduTitle: 'مضمون: میرا بہترین دوست (اردو و انگریزی)',
    category: 'mazmoon',
    classLevel: 'Primary (1st-5th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'Ideal essay for primary and middle school students with simple language, noble qualities, and friendship proverbs.',
    previewContent: `"A friend in need is a friend indeed." My best friend's name is Ali. We study in the same school and live in the same neighborhood. He is honest, polite, and very hardworking.`,
    rating: 4.9,
    downloadsCount: 1780,
  },

  // 3. Story Writing (50 PKR each)
  {
    id: 'story-thirsty-crow',
    title: 'The Thirsty Crow (پیاسا کوا) - With Moral',
    urduTitle: 'کہانی: پیاسا کوا (اردو ترجمہ و اخلاقی سبق مع خلاصہ)',
    category: 'stories',
    classLevel: 'Middle (6th-8th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'The classic fable of the clever crow with complete English narrative, Urdu word meanings, and dual morals.',
    previewContent: `Once a crow was very thirsty. He flew here and there in search of water but could find none. At last, he saw a pitcher in a garden. He flew down happily. But the water level was very low. His beak could not reach it.
He saw some pebbles lying nearby. He picked them one by one and dropped them into the pitcher. The water rose up. He drank it and flew away happily.
Moral: Necessity is the mother of invention / Where there is a will, there is a way.
اخلاقی سبق: جہاں چاہ، وہاں راہ۔ ضرورت ایجاد کی ماں ہے۔`,
    rating: 5.0,
    downloadsCount: 3500,
    isPopular: true,
  },
  {
    id: 'story-greedy-dog',
    title: 'The Greedy Dog (لالچی کتا) - With Moral',
    urduTitle: 'کہانی: لالچی کتا (لالچ بری بلا ہے)',
    category: 'stories',
    classLevel: 'Primary (1st-5th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'Story of the dog carrying a piece of meat across a bridge with moral and Urdu translation.',
    previewContent: `Once upon a time, a dog stole a piece of meat from a butcher's shop. He ran toward the jungle to enjoy his feast. On the way, he had to cross a stream over a small wooden bridge.
When he looked down into the clear water, he saw his own reflection and thought another dog had meat. He barked to snatch it. As he opened his mouth, his piece fell into the water.
Moral: Greed is a curse / لالچ بری بلا ہے۔`,
    rating: 4.9,
    downloadsCount: 2800,
    isPopular: true,
  },
  {
    id: 'story-hare-tortoise',
    title: 'The Hare and The Tortoise (خرگوش اور کچنوا)',
    urduTitle: 'کہانی: خرگوش اور کچھوا (غرور کا سر نیچا)',
    category: 'stories',
    classLevel: 'Primary (1st-5th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'Famous race fable illustrating the value of steady determination over arrogant overconfidence.',
    previewContent: `A hare used to laugh at the slow pace of a tortoise. Challenged to a race, the hare sprinted ahead and decided to take a nap under a shady tree. The tortoise walked on steadily without stopping...
Moral: Slow and steady wins the race / Pride hath a fall.
اخلاقی سبق: غرور کا سر نیچا ہوتا ہے۔ مستقل مزاجی کامیابی کی چابی ہے۔`,
    rating: 4.9,
    downloadsCount: 2450,
  },
  {
    id: 'story-union-strength',
    title: 'Union is Strength (اتفاق میں برکت ہے)',
    urduTitle: 'کہانی: بوڑھا کسان اور لکڑیوں کا گٹھا',
    category: 'stories',
    classLevel: 'Matric (9th & 10th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'An old dying farmer teaches his quarrelling sons a life lesson using single sticks and a bundle of sticks.',
    previewContent: `An old farmer had four sons who constantly quarreled among themselves. On his deathbed, he handed them a bundle of sticks and asked them to break it. None could break it. Then he united the bundle and gave them single sticks which broke easily.
Moral: United we stand, divided we fall / Union is strength.
اخلاقی سبق: اتفاق میں برکت ہے۔`,
    rating: 5.0,
    downloadsCount: 2150,
  },
  {
    id: 'story-honesty-best-policy',
    title: 'Honesty is the Best Policy (ایمانداری بہترین حکمت عملی)',
    urduTitle: 'کہانی: غریب لکڑہارا اور سونے کا کلہاڑا',
    category: 'stories',
    classLevel: 'Middle (6th-8th)',
    subject: 'English & Urdu',
    price: 50,
    language: 'Bilingual',
    description: 'The poor woodcutter who lost his iron axe in the river and was rewarded by the river fairy for his truthfulness.',
    previewContent: `A poor woodcutter accidentally dropped his axe into a deep river. He wept bitterly. An angel appeared with a gold axe, then a silver axe. The honest woodcutter refused both, accepting only his iron axe. The angel pleased with his integrity gave him all three.
Moral: Honesty is the best policy.
اخلاقی سبق: ایمانداری کا پھل ہمیشہ میٹھا ہوتا ہے۔`,
    rating: 4.8,
    downloadsCount: 1980,
  },

  // 4. English Grammar & Notes
  {
    id: 'grammar-12-tenses',
    title: 'All 12 English Tenses Master Chart with Urdu Rules',
    urduTitle: 'تمام 12 انگلش ٹینسیز کی پہچان اور فارمولے اردو میں',
    category: 'grammar',
    classLevel: 'All Classes',
    subject: 'English Grammar',
    price: 0,
    language: 'Bilingual',
    description: 'Present, Past, and Future Indefinite, Continuous, Perfect, and Perfect Continuous with helping verbs and Urdu keywords.',
    previewContent: `1. Present Indefinite: تا ہے، تی ہے، تے ہیں (Subject + V1 (+s/es) + Object)
2. Present Continuous: رہا ہے، رہی ہے، رہے ہیں (Subject + is/am/are + V1-ing + Object)
3. Present Perfect: چکا ہے، چکی ہے، یا ہے (Subject + has/have + V3 + Object)
4. Past Indefinite: الف، چھوٹی ی، بڑی ے، تا تھا (Subject + V2 + Object)`,
    rating: 5.0,
    downloadsCount: 4200,
    isPopular: true,
  },
  {
    id: 'grammar-active-passive',
    title: 'Active & Passive Voice Rules, Formulas & 50 Solved Sentences',
    urduTitle: 'ایکٹیو اور پیسو وائس کے سنہری اصول مع مثالیں',
    category: 'grammar',
    classLevel: 'Matric (9th & 10th)',
    subject: 'English Grammar',
    price: 0,
    language: 'Bilingual',
    description: 'Golden rules of voice change: Object becomes Subject, Always use 3rd form of verb, by addition, tense replacement table.',
    previewContent: `Rule 1: Object of active sentence becomes subject of passive sentence.
Rule 2: Passive voice always uses the 3rd form (past participle) of the main verb.
Rule 3: Use 'by' before the agent.
Example: Active: "Ali plays cricket." -> Passive: "Cricket is played by Ali."`,
    rating: 4.9,
    downloadsCount: 3100,
  },
  {
    id: 'grammar-applications',
    title: 'Board Exam Top Formal Applications (Sick Leave, Fee Concession)',
    urduTitle: 'درخواست نویسی: بیماری کی رخصت، فیس معافی، ضروری کام',
    category: 'grammar',
    classLevel: 'Middle (6th-8th)',
    subject: 'English & Urdu Composition',
    price: 0,
    language: 'Bilingual',
    description: 'Standard format for Principal and Headmaster applications with exact markings scheme for board exams.',
    previewContent: `To: The Principal, Government High School, Lahore.
Subject: Application for Grant of Fee Concession.
Respected Sir,
With due respect, I beg to state that my father is a low-income clerk and cannot afford my educational expenses. I have always secured top grades...`,
    rating: 4.9,
    downloadsCount: 2600,
  },

  // 5. Words Meaning / Vocabulary
  {
    id: 'vocab-essential-100',
    title: '500 Most Essential English Words with Urdu Meanings & Sentences',
    urduTitle: '500 اہم ترین انگریزی الفاظ کے اردو معنی، تلفظ اور جملے',
    category: 'vocabulary',
    classLevel: 'All Classes',
    subject: 'Vocabulary',
    price: 0,
    language: 'Bilingual',
    description: 'Daily speaking and board exam vocabulary with pronunciation guide in Urdu script and contextual sentences.',
    previewContent: `1. Diligent (ڈیلی جنٹ) = محنتی (He is a diligent student.)
2. Generous (جینرس) = سخی، فیاض (She has a generous heart.)
3. Hesitate (ہیزی ٹیٹ) = ہچکچانا (Do not hesitate to ask questions.)
4. Obstacle (آبسٹیکل) = رکاوٹ (Patience removes every obstacle.)`,
    rating: 4.9,
    downloadsCount: 3800,
    isPopular: true,
  },

  // 6. Complete Notes for Every Class
  {
    id: 'notes-9th-math',
    title: '9th Class Mathematics Complete Chapter-Wise Solved Notes',
    urduTitle: 'نویں جماعت ریاضی مکمل حل شدہ نوٹس (سائنس گروپ)',
    category: 'class_notes',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Mathematics',
    price: 0,
    language: 'Bilingual',
    description: 'Matrices, Real & Complex Numbers, Logarithms, Algebraic Formulas, Factorization, Linear Equations, Theorems.',
    previewContent: `Chapter 1: Matrices and Determinants
Definition: A rectangular array of numbers enclosed by brackets is called a matrix.
Order of Matrix: Number of rows m by columns n (m-by-n).
Cramer's Rule Formula: x = |Ax| / |A|, y = |Ay| / |A| where |A| != 0.`,
    rating: 4.9,
    downloadsCount: 4100,
  },
  {
    id: 'notes-10th-biology',
    title: '10th Class Biology Comprehensive Chapter Notes & Diagrams',
    urduTitle: 'دسویں کلاس بیالوجی مکمل تفصیلی نوٹس اور ڈایاگرامز',
    category: 'class_notes',
    classLevel: 'Matric (9th & 10th)',
    subject: 'Biology',
    price: 0,
    language: 'English',
    description: 'Gaseous Exchange, Homeostasis, Coordination & Control, Reproduction, Inheritance, Biotechnology with labeled diagrams.',
    previewContent: `Chapter 10: Gaseous Exchange
In humans, air enters through nostrils -> nasal cavity -> pharynx -> larynx -> trachea -> bronchi -> bronchioles -> alveoli.
Alveoli are tiny sac-like structures where oxygen diffuses into blood capillaries and CO2 is removed.`,
    rating: 4.8,
    downloadsCount: 2200,
  },
  {
    id: 'notes-fsc-chem',
    title: '11th Class (FSc Part 1) Chemistry Short Questions & Key Notes',
    urduTitle: 'گیارہویں کلاس کیمسٹری شارٹ کوئسچنز اور اہم فارمولے',
    category: 'class_notes',
    classLevel: 'FA / FSc / ICS (11th & 12th)',
    subject: 'Chemistry',
    price: 0,
    language: 'English',
    description: 'Basic Concepts, Experimental Techniques, Gases, Liquids & Solids, Atomic Structure, Chemical Bonding, Thermochemistry.',
    previewContent: `Short Question: Why actual yield is usually less than theoretical yield?
Answer: 1. A mechanical loss occurs during filtration, washing, crystallization. 2. Side reactions may occur. 3. Reversible reaction never goes to completion.`,
    rating: 4.9,
    downloadsCount: 1950,
  },
  {
    id: 'notes-playgroup',
    title: 'Play Group, Nursery & Prep Early Learning Activity Sheets',
    urduTitle: 'پلے گروپ اور نرسری بنیادی ورک شیٹس اور حروف تہجی',
    category: 'class_notes',
    classLevel: 'Play Group & Nursery',
    subject: 'Early Childhood',
    price: 0,
    language: 'Bilingual',
    description: 'Tracing letters A-Z, Alif-Bay-Pay, 1-20 counting, color identification, and basic phonics for Pakistani toddlers.',
    previewContent: `Alphabet Tracing: A for Apple (سیب), B for Ball (گیند), C for Cat (بلی).
Urdu Huruf: ا - انار، ب - بلی، پ - پنکھا۔
Numbers: Count the stars: 1, 2, 3, 4, 5.`,
    rating: 5.0,
    downloadsCount: 2700,
  },
];

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 't-1',
    title: 'Present Indefinite Tense (فعل حال مطلق)',
    urduTitle: 'پریزنٹس انڈیفینیٹ ٹینس - روزمرہ کے کام اور عادات',
    category: 'Tenses',
    urduIdentification: 'جملے کے آخر میں "تا ہے"، "تی ہے"، "تے ہیں"، "تا ہوں" آتا ہے۔',
    formula: 'Subject + 1st Form of Verb (+ s/es for He/She/It/Singular) + Object',
    rules: [
      'Positive: He/She/It or singular nouns take -s or -es with the 1st form of the verb.',
      'Negative: Use "does not" for singulars and "do not" for I/We/You/They/Plurals, followed by 1st form without s/es.',
      'Interrogative: Put "Do" or "Does" before the subject.',
    ],
    examples: [
      { english: 'He goes to school every day.', urdu: 'وہ روزانہ سکول جاتا ہے۔' },
      { english: 'They do not play cricket.', urdu: 'وہ کرکٹ نہیں کھیلتے ہیں۔' },
      { english: 'Does she speak English?', urdu: 'کیا وہ انگریزی بولتی ہے؟' },
    ],
  },
  {
    id: 't-2',
    title: 'Past Indefinite Tense (فعل ماضی مطلق)',
    urduTitle: 'پاسٹ انڈیفینیٹ ٹینس - ماضی میں واقع ہوا کوئی کام',
    category: 'Tenses',
    urduIdentification: 'جملے کے آخر میں "الف"، "چھوٹی ی"، "بڑی ے" یا "تھا، تھی، تھے" آتا ہے۔',
    formula: 'Subject + 2nd Form of Verb + Object',
    rules: [
      'Positive: Only tense in English that directly takes the 2nd form of verb.',
      'Negative: Subject + did not + 1st form of verb + Object.',
      'Interrogative: Did + Subject + 1st form of verb + Object?',
    ],
    examples: [
      { english: 'We won the cricket match yesterday.', urdu: 'ہم نے کل کرکٹ میچ جیتا۔' },
      { english: 'He did not write the letter.', urdu: 'اس نے خط نہیں لکھا۔' },
      { english: 'Did you complete your homework?', urdu: 'کیا آپ نے اپنا ہوم ورک مکمل کیا؟' },
    ],
  },
  {
    id: 't-3',
    title: 'Future Indefinite Tense (فعل مستقبل مطلق)',
    urduTitle: 'فیوچر انڈیفینیٹ ٹینس - آنے والے وقت کا منصوبہ',
    category: 'Tenses',
    urduIdentification: 'جملے کے آخر میں "گا"، "گی"، "گے" آتا ہے۔',
    formula: 'Subject + will/shall + 1st Form of Verb + Object',
    rules: [
      'Shall is traditionally used with I and We, will with other subjects.',
      'Modern English universally accepts "will" with all subjects.',
    ],
    examples: [
      { english: 'I will submit my assignment tomorrow.', urdu: 'میں کل اپنی اسائنمنٹ جمع کرواؤں گا۔' },
      { english: 'They will not attend the lecture.', urdu: 'وہ لیکچر میں شرکت نہیں کریں گے۔' },
    ],
  },
];

export const VOCAB_WORDS: VocabWord[] = [
  {
    id: 'v-1',
    english: 'Perseverance',
    urduMeaning: 'مستقل مزاجی، لگن، استقامت',
    pronunciationUrdu: 'پرسی ویرینس',
    partOfSpeech: 'Noun',
    exampleSentence: 'Perseverance is the key to passing tough board exams.',
    urduSentence: 'مشکل بورڈ امتحانات میں کامیابی کے لیے مستقل مزاجی کلید ہے۔',
  },
  {
    id: 'v-2',
    english: 'Comprehend',
    urduMeaning: 'سمجھنا، ادراک کرنا',
    pronunciationUrdu: 'کامپری ہینڈ',
    partOfSpeech: 'Verb',
    exampleSentence: 'Students must comprehend the core concepts before memorizing.',
    urduSentence: 'طلبہ کو رٹہ لگانے سے پہلے بنیادی تصورات کو سمجھنا چاہیے۔',
  },
  {
    id: 'v-3',
    english: 'Sublime',
    urduMeaning: 'شاندار، اعلیٰ ترین، بلند و بالا',
    pronunciationUrdu: 'سبلائم',
    partOfSpeech: 'Adjective',
    exampleSentence: 'Allama Iqbal gave a sublime message of self-reliance.',
    urduSentence: 'علامہ اقبال نے خودی کا شاندار اور بلند پایہ پیغام دیا۔',
  },
  {
    id: 'v-4',
    english: 'Punctuality',
    urduMeaning: 'وقت کی پابندی',
    pronunciationUrdu: 'پنکچوئیلٹی',
    partOfSpeech: 'Noun',
    exampleSentence: 'Punctuality reflects personal discipline and respect for others.',
    urduSentence: 'وقت کی پابندی ذاتی نظم و ضبط اور دوسروں کے احترام کی عکاسی کرتی ہے۔',
  },
  {
    id: 'v-5',
    english: 'Benevolent',
    urduMeaning: 'مہربان، ہمدرد، خیر خواہ',
    pronunciationUrdu: 'بینیوولینٹ',
    partOfSpeech: 'Adjective',
    exampleSentence: 'Our teacher has a very benevolent attitude toward weak students.',
    urduSentence: 'ہمارے استاد کا کمزور طلبہ کے ساتھ بہت ہی مہربان رویہ ہے۔',
  },
  {
    id: 'v-6',
    english: 'Aspirations',
    urduMeaning: 'خواہشات، بلند مقاصد، امنگیں',
    pronunciationUrdu: 'ایسپی ریشنز',
    partOfSpeech: 'Noun',
    exampleSentence: 'Every student has aspirations to serve Pakistan faithfully.',
    urduSentence: 'ہر طالب علم کی یہ امنگ ہے کہ وہ دیانت داری سے پاکستان کی خدمت کرے۔',
  },
];
