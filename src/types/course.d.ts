export interface Course {
  all_course_codes: string[];
  areas: Area[];
  average_gut_rating: number | null;
  average_professor: number | null;
  average_rating: number | null;
  average_workload: number | null;
  average_rating_same_professors: number | null;
  average_workload_same_professors: number | null;
  classnotes: null | string;
  course_code: string;
  course_id: number;
  credits: number;
  crn: number;
  description: null | string;
  enrolled: null;
  extra_info: ExtraInfo;
  final_exam: FinalExam | null;
  flag_info: string[];
  fysem: boolean;
  last_enrollment: number | null;
  last_enrollment_same_professors: boolean | null;
  listing_id: number;
  locations_summary: string;
  number: string;
  professor_ids: string[];
  professor_names: string[];
  regnotes: null | string;
  requirements: null | string;
  rp_attr: null | string;
  same_course_id: number;
  same_course_and_profs_id: number;
  last_offered_course_id: number | null;
  school: School;
  season_code: string;
  section: string;
  skills: Skill[];
  subject: string;
  syllabus_url: null | string;
  times_by_day: TimesByDay;
  times_summary: string;
  title: string;
}

export enum Area {
  Hu = 'Hu',
  Sc = 'Sc',
  So = 'So',
}

export enum ExtraInfo {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
}

export enum FinalExam {
  FridayMay52023At2Pm = 'Friday, May 5, 2023 at 2pm',
  FridayMay52023At9Am = 'Friday, May 5, 2023 at 9am',
  Htba = 'HTBA',
  MondayMay82023At2Pm = 'Monday, May 8, 2023 at 2pm',
  MondayMay82023At7Pm = 'Monday, May 8, 2023 at 7pm',
  MondayMay82023At9Am = 'Monday, May 8, 2023 at 9am',
  NoRegularFinalExamination = 'No regular final examination',
  SaturdayMay62023At2Pm = 'Saturday, May 6, 2023 at 2pm',
  SaturdayMay62023At7Pm = 'Saturday, May 6, 2023 at 7pm',
  SaturdayMay62023At9Am = 'Saturday, May 6, 2023 at 9am',
  SundayMay72023At2Pm = 'Sunday, May 7, 2023 at 2pm',
  SundayMay72023At7Pm = 'Sunday, May 7, 2023 at 7pm',
  ThursdayMay42023At7Pm = 'Thursday, May 4, 2023 at 7pm',
  TuesdayMay92023At2Pm = 'Tuesday, May 9, 2023 at 2pm',
  TuesdayMay92023At7Pm = 'Tuesday, May 9, 2023 at 7pm',
  TuesdayMay92023At9Am = 'Tuesday, May 9, 2023 at 9am',
  WednesdayMay102023At2Pm = 'Wednesday, May 10, 2023 at 2pm',
  WednesdayMay102023At9Am = 'Wednesday, May 10, 2023 at 9am',
}

export enum School {
  AC = 'AC',
  At = 'AT',
  DR = 'DR',
  Di = 'DI',
  FS = 'FS',
  GB = 'GB',
  Gs = 'GS',
  Lw = 'LW',
  Mg = 'MG',
  Mu = 'MU',
  Nr = 'NR',
  Pa = 'PA',
  Ph = 'PH',
  Su = 'SU',
  Yc = 'YC',
}

export enum Skill {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  Qr = 'QR',
  Wr = 'WR',
}

export interface TimesByDay {
  Monday?: Array<string[]>;
  Tuesday?: Array<string[]>;
  Wednesday?: Array<string[]>;
  Thursday?: Array<string[]>;
  Friday?: Array<string[]>;
  Saturday?: Array<string[]>;
}
