export type Language = 'en' | 'ka';

export interface ScheduleEvent {
  id: string;
  titleEn: string;
  titleKa: string;
  dayIndex: number; // 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun
  dateStr: string; // e.g. '28/09/2026'
  startTime: string; // e.g. '11:00'
  endTime: string; // e.g. '13:00'
  startHour: number; // e.g. 11
  durationHours: number; // e.g. 2
  room: string;
  lecturerEn: string;
  lecturerKa: string;
  typeEn: string;
  typeKa: string;
  ects: number;
}

export interface StudentProfileData {
  fullNameEn: string;
  fullNameUpperEn: string;
  fullNameKa: string;
  schoolEn: string;
  schoolKa: string;
  degreeEn: string;
  degreeKa: string;
  programEn: string;
  programKa: string;
  statusEn: string;
  statusKa: string;
  academicYear: string;
  personalNumber: string;
  cuEmail: string;
  personalEmail: string;
  mobile: string;
  address: string;
  linkedin: string;
}

export const INITIAL_STUDENT_PROFILE: StudentProfileData = {
  fullNameEn: 'Sajin Kurattiparambil Saji',
  fullNameUpperEn: 'SAJIN KURATTIPARAMBIL SAJI',
  fullNameKa: 'საჯინ კურატიპარამბილ საჯი',
  schoolEn: 'School of Medicine',
  schoolKa: 'მედიცინის სკოლა',
  degreeEn: "Bachelor's and Master's degrees",
  degreeKa: 'ბაკალავრიატი და მაგისტრატურა (ერთსაფეხურიანი)',
  programEn: 'English-language one-level medical education program for a qualified physician',
  programKa: 'დიპლომირებული მედიკოსის ინგლისურენოვანი ერთსაფეხურიანი საგანმანათლებლო პროგრამა',
  statusEn: 'Active',
  statusKa: 'აქტიური',
  academicYear: '2024-2025',
  personalNumber: 'V4829164',
  cuEmail: 's_saji@cu.edu.ge',
  personalEmail: 'sajinsaji.k@gmail.com',
  mobile: '',
  address: '',
  linkedin: '',
};

// Exact schedule from Video 1 (28.9.2026 - 4.10.2026)
export const WEEK_DAYS_28_SEP_TO_4_OCT = [
  { dayIndex: 0, shortEn: 'Mon', shortKa: 'ორშ', dateStr: '28/09/2026', dayNum: 28, monthNum: 9, isToday: false },
  { dayIndex: 1, shortEn: 'Tue', shortKa: 'სამ', dateStr: '29/09/2026', dayNum: 29, monthNum: 9, isToday: false },
  { dayIndex: 2, shortEn: 'Wed', shortKa: 'ოთხ', dateStr: '30/09/2026', dayNum: 30, monthNum: 9, isToday: false },
  { dayIndex: 3, shortEn: 'Thu', shortKa: 'ხუთ', dateStr: '01/10/2026', dayNum: 1, monthNum: 10, isToday: false },
  { dayIndex: 4, shortEn: 'Fri', shortKa: 'პარ', dateStr: '02/10/2026', dayNum: 2, monthNum: 10, isToday: false },
  { dayIndex: 5, shortEn: 'Sat', shortKa: 'შაბ', dateStr: '03/10/2026', dayNum: 3, monthNum: 10, isToday: false },
  { dayIndex: 6, shortEn: 'Sun', shortKa: 'კვი', dateStr: '04/10/2026', dayNum: 4, monthNum: 10, isToday: true },
];

export const WEEKLY_SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    id: 'mon-1',
    titleEn: 'Pathology 1',
    titleKa: 'პათოლოგია 1',
    dayIndex: 0,
    dateStr: '28/09/2026',
    startTime: '11:00',
    endTime: '13:00',
    startHour: 11,
    durationHours: 2,
    room: 'A9',
    lecturerEn: 'Prof. Giorgi Burkadze',
    lecturerKa: 'პროფ. გიორგი ბურკაძე',
    typeEn: 'Lecture / Practical',
    typeKa: 'ლექცია / პრაქტიკული',
    ects: 6,
  },
  {
    id: 'mon-2',
    titleEn: 'Immunology',
    titleKa: 'იმუნოლოგია',
    dayIndex: 0,
    dateStr: '28/09/2026',
    startTime: '15:00',
    endTime: '18:00',
    startHour: 15,
    durationHours: 3,
    room: 'C9',
    lecturerEn: 'Assoc. Prof. Nino Chikhladze',
    lecturerKa: 'ასოც. პროფ. ნინო ჩიხლაძე',
    typeEn: 'Lecture / Seminar',
    typeKa: 'ლექცია / სემინარი',
    ects: 4,
  },
  {
    id: 'mon-3',
    titleEn: 'Introduction to Clinical Practice 1',
    titleKa: 'კლინიკურ პრაქტიკაში შესავალი 1',
    dayIndex: 0,
    dateStr: '28/09/2026',
    startTime: '18:00',
    endTime: '21:00',
    startHour: 18,
    durationHours: 3,
    room: 'D17',
    lecturerEn: 'Dr. Tamar Kvaratskhelia',
    lecturerKa: 'დოქტ. თამარ კვარაცხელია',
    typeEn: 'Clinical Rotation / Lab',
    typeKa: 'კლინიკური პრაქტიკა',
    ects: 5,
  },
  {
    id: 'tue-1',
    titleEn: 'Clinical Skills (part 1)',
    titleKa: 'კლინიკური უნარ-ჩვევები (ნაწილი 1)',
    dayIndex: 1,
    dateStr: '29/09/2026',
    startTime: '09:00',
    endTime: '12:00',
    startHour: 9,
    durationHours: 3,
    room: 'D35',
    lecturerEn: 'Dr. Levan Metreveli',
    lecturerKa: 'დოქტ. ლევან მეტრეველი',
    typeEn: 'Simulation Center Lab',
    typeKa: 'სიმულაციური ლაბორატორია',
    ects: 4,
  },
  {
    id: 'wed-1',
    titleEn: 'Basic Pharmacology I',
    titleKa: 'ბაზისური ფარმაკოლოგია I',
    dayIndex: 2,
    dateStr: '30/09/2026',
    startTime: '18:00',
    endTime: '21:00',
    startHour: 18,
    durationHours: 3,
    room: 'D16',
    lecturerEn: 'Prof. Marine Nikolaishvili',
    lecturerKa: 'პროფ. მარინე ნიკოლაიშვილი',
    typeEn: 'Lecture / Seminar',
    typeKa: 'ლექცია / სემინარი',
    ects: 5,
  },
  {
    id: 'thu-1',
    titleEn: 'Pathology 1',
    titleKa: 'პათოლოგია 1',
    dayIndex: 3,
    dateStr: '01/10/2026',
    startTime: '09:00',
    endTime: '11:00',
    startHour: 9,
    durationHours: 2,
    room: 'C205',
    lecturerEn: 'Prof. Giorgi Burkadze',
    lecturerKa: 'პროფ. გიორგი ბურკაძე',
    typeEn: 'Microscopy Lab',
    typeKa: 'მიკროსკოპიის ლაბორატორია',
    ects: 6,
  },
  {
    id: 'fri-1',
    titleEn: 'Microbiology, Virology 1',
    titleKa: 'მიკრობიოლოგია, ვირუსოლოგია 1',
    dayIndex: 4,
    dateStr: '02/10/2026',
    startTime: '18:00',
    endTime: '21:00',
    startHour: 18,
    durationHours: 3,
    room: 'D17',
    lecturerEn: 'Prof. Ketevan Machavariani',
    lecturerKa: 'პროფ. ქეთევან მაჭავარიანი',
    typeEn: 'Lecture / Lab',
    typeKa: 'ლექცია / ლაბორატორია',
    ects: 5,
  },
  {
    id: 'sat-1',
    titleEn: 'Medical Law',
    titleKa: 'სამედიცინო სამართალი',
    dayIndex: 5,
    dateStr: '03/10/2026',
    startTime: '11:00',
    endTime: '13:00',
    startHour: 11,
    durationHours: 2,
    room: 'A18',
    lecturerEn: 'Assoc. Prof. Davit Kiknadze',
    lecturerKa: 'ასოც. პროფ. დავით კიკნაძე',
    typeEn: 'Seminar',
    typeKa: 'სემინარი',
    ects: 3,
  },
];

export interface SemesterCourseRecord {
  code: string;
  nameEn: string;
  nameKa: string;
  ects: number;
  lecturerEn: string;
  lecturerKa: string;
  scheduleSummary: string;
  room: string;
  midtermScore: number | null;
  activityScore: number | null;
  attendancePercent: number;
  status: 'Registered' | 'Completed';
}

export const CURRENT_SEMESTER_COURSES: SemesterCourseRecord[] = [
  {
    code: 'MED3011',
    nameEn: 'Pathology 1',
    nameKa: 'პათოლოგია 1',
    ects: 6,
    lecturerEn: 'Prof. Giorgi Burkadze',
    lecturerKa: 'პროფ. გიორგი ბურკაძე',
    scheduleSummary: 'Mon 11:00-13:00 (A9), Thu 09:00-11:00 (C205)',
    room: 'A9 / C205',
    midtermScore: 28.5,
    activityScore: 19.0,
    attendancePercent: 100,
    status: 'Registered',
  },
  {
    code: 'MED3024',
    nameEn: 'Immunology',
    nameKa: 'იმუნოლოგია',
    ects: 4,
    lecturerEn: 'Assoc. Prof. Nino Chikhladze',
    lecturerKa: 'ასოც. პროფ. ნინო ჩიხლაძე',
    scheduleSummary: 'Mon 15:00-18:00 (C9)',
    room: 'C9',
    midtermScore: 27.0,
    activityScore: 18.5,
    attendancePercent: 95,
    status: 'Registered',
  },
  {
    code: 'MED3042',
    nameEn: 'Introduction to Clinical Practice 1',
    nameKa: 'კლინიკურ პრაქტიკაში შესავალი 1',
    ects: 5,
    lecturerEn: 'Dr. Tamar Kvaratskhelia',
    lecturerKa: 'დოქტ. თამარ კვარაცხელია',
    scheduleSummary: 'Mon 18:00-21:00 (D17)',
    room: 'D17',
    midtermScore: 29.0,
    activityScore: 20.0,
    attendancePercent: 100,
    status: 'Registered',
  },
  {
    code: 'MED3018',
    nameEn: 'Clinical Skills (part 1)',
    nameKa: 'კლინიკური უნარ-ჩვევები (ნაწილი 1)',
    ects: 4,
    lecturerEn: 'Dr. Levan Metreveli',
    lecturerKa: 'დოქტ. ლევან მეტრეველი',
    scheduleSummary: 'Tue 09:00-12:00 (D35)',
    room: 'D35',
    midtermScore: 28.0,
    activityScore: 19.5,
    attendancePercent: 100,
    status: 'Registered',
  },
  {
    code: 'MED3035',
    nameEn: 'Basic Pharmacology I',
    nameKa: 'ბაზისური ფარმაკოლოგია I',
    ects: 5,
    lecturerEn: 'Prof. Marine Nikolaishvili',
    lecturerKa: 'პროფ. მარინე ნიკოლაიშვილი',
    scheduleSummary: 'Wed 18:00-21:00 (D16)',
    room: 'D16',
    midtermScore: 26.5,
    activityScore: 18.0,
    attendancePercent: 92,
    status: 'Registered',
  },
  {
    code: 'MED3050',
    nameEn: 'Microbiology, Virology 1',
    nameKa: 'მიკრობიოლოგია, ვირუსოლოგია 1',
    ects: 5,
    lecturerEn: 'Prof. Ketevan Machavariani',
    lecturerKa: 'პროფ. ქეთევან მაჭავარიანი',
    scheduleSummary: 'Fri 18:00-21:00 (D17)',
    room: 'D17',
    midtermScore: 27.5,
    activityScore: 19.0,
    attendancePercent: 96,
    status: 'Registered',
  },
  {
    code: 'LAW2019',
    nameEn: 'Medical Law',
    nameKa: 'სამედიცინო სამართალი',
    ects: 3,
    lecturerEn: 'Assoc. Prof. Davit Kiknadze',
    lecturerKa: 'ასოც. პროფ. დავით კიკნაძე',
    scheduleSummary: 'Sat 11:00-13:00 (A18)',
    room: 'A18',
    midtermScore: 29.5,
    activityScore: 20.0,
    attendancePercent: 100,
    status: 'Registered',
  },
];

export interface TranscriptGradeRecord {
  semesterEn: string;
  semesterKa: string;
  code: string;
  courseEn: string;
  courseKa: string;
  ects: number;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  gpaPoints: number;
}

export const TRANSCRIPT_GRADES: TranscriptGradeRecord[] = [
  {
    semesterEn: '2024-2025 Fall Semester',
    semesterKa: '2024-2025 შემოდგომის სემესტრი',
    code: 'MED1001',
    courseEn: 'Human Anatomy I',
    courseKa: 'ადამიანის ანატომია I',
    ects: 7,
    score: 94,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Fall Semester',
    semesterKa: '2024-2025 შემოდგომის სემესტრი',
    code: 'MED1002',
    courseEn: 'Medical Biology and Genetics',
    courseKa: 'სამედიცინო ბიოლოგია და გენეტიკა',
    ects: 5,
    score: 91,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Fall Semester',
    semesterKa: '2024-2025 შემოდგომის სემესტრი',
    code: 'MED1003',
    courseEn: 'Medical Chemistry and Biochemistry I',
    courseKa: 'სამედიცინო ქიმია და ბიოქიმია I',
    ects: 6,
    score: 88,
    grade: 'B',
    gpaPoints: 3.38,
  },
  {
    semesterEn: '2024-2025 Fall Semester',
    semesterKa: '2024-2025 შემოდგომის სემესტრი',
    code: 'MED1004',
    courseEn: 'Histology, Cytology, Embryology I',
    courseKa: 'ჰისტოლოგია, ციტოლოგია, ემბრიოლოგია I',
    ects: 5,
    score: 92,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Fall Semester',
    semesterKa: '2024-2025 შემოდგომის სემესტრი',
    code: 'LAN1011',
    courseEn: 'Georgian Language for Medical Students I',
    courseKa: 'ქართული ენა მედიკოსებისთვის I',
    ects: 4,
    score: 96,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Spring Semester',
    semesterKa: '2024-2025 გაზაფხულის სემესტრი',
    code: 'MED1011',
    courseEn: 'Human Anatomy II',
    courseKa: 'ადამიანის ანატომია II',
    ects: 7,
    score: 93,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Spring Semester',
    semesterKa: '2024-2025 გაზაფხულის სემესტრი',
    code: 'MED1015',
    courseEn: 'Normal Physiology I',
    courseKa: 'ნორმალური ფიზიოლოგია I',
    ects: 6,
    score: 89,
    grade: 'B',
    gpaPoints: 3.45,
  },
  {
    semesterEn: '2024-2025 Spring Semester',
    semesterKa: '2024-2025 გაზაფხულის სემესტრი',
    code: 'MED1018',
    courseEn: 'Biochemistry II & Molecular Biology',
    courseKa: 'ბიოქიმია II და მოლეკულური ბიოლოგია',
    ects: 6,
    score: 91,
    grade: 'A',
    gpaPoints: 4.0,
  },
  {
    semesterEn: '2024-2025 Spring Semester',
    semesterKa: '2024-2025 გაზაფხულის სემესტრი',
    code: 'MED1020',
    courseEn: 'Histology, Cytology, Embryology II',
    courseKa: 'ჰისტოლოგია, ციტოლოგია, ემბრიოლოგია II',
    ects: 5,
    score: 95,
    grade: 'A',
    gpaPoints: 4.0,
  },
];
