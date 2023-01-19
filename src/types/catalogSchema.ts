// Created with https://transform.tools/typescript-to-zod
import { z } from 'zod';
import { Area, ExtraInfo, FinalExam, School, Skill } from './catalog';

export const areaSchema = z.nativeEnum(Area);

export const extraInfoSchema = z.nativeEnum(ExtraInfo);

export const finalExamSchema = z.nativeEnum(FinalExam);

export const schoolSchema = z.nativeEnum(School);

export const skillSchema = z.nativeEnum(Skill);

export const timesByDaySchema = z.object({
  Tuesday: z.array(z.array(z.string())).optional(),
  Thursday: z.array(z.array(z.string())).optional(),
  Monday: z.array(z.array(z.string())).optional(),
  Wednesday: z.array(z.array(z.string())).optional(),
  Friday: z.array(z.array(z.string())).optional(),
  Saturday: z.array(z.array(z.string())).optional(),
});

export const catalogSchema = z.object({
  all_course_codes: z.array(z.string()),
  areas: z.array(areaSchema),
  average_gut_rating: z.number().nullable(),
  average_professor: z.number().nullable(),
  average_rating: z.number().nullable(),
  average_workload: z.number().nullable(),
  average_rating_same_professors: z.number().nullable(),
  average_workload_same_professors: z.number().nullable(),
  classnotes: z.string().nullable(),
  course_code: z.string(),
  credits: z.number(),
  crn: z.number(),
  description: z.string().nullable(),
  enrolled: z.null(),
  extra_info: extraInfoSchema,
  final_exam: finalExamSchema.nullable(),
  flag_info: z.array(z.string()),
  fysem: z.boolean(),
  last_enrollment: z.number().nullable(),
  last_enrollment_same_professors: z.boolean().nullable(),
  listing_id: z.number(),
  locations_summary: z.string(),
  number: z.string(),
  professor_ids: z.array(z.string()),
  professor_names: z.array(z.string()),
  regnotes: z.string().nullable(),
  requirements: z.string().nullable(),
  rp_attr: z.string().nullable(),
  same_course_id: z.number(),
  same_course_and_profs_id: z.number(),
  last_offered_course_id: z.number().nullable(),
  school: schoolSchema,
  season_code: z.string(),
  section: z.string(),
  skills: z.array(skillSchema),
  subject: z.string(),
  syllabus_url: z.string().nullable(),
  times_by_day: timesByDaySchema,
  times_summary: z.string(),
  title: z.string(),
});
