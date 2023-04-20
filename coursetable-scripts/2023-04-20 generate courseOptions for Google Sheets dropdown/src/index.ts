import { getCoursesForDisplayText } from './courses/getCourses.js';

async function main() {
  try {
    const courses = await getCoursesForDisplayText();
    const courseOptions = courses.map((course) => ({
      course_id: course.course_id,
      displayText: `${course.all_course_codes.join(' | ')} - ${course.title}`,
    }));
    console.log(
      '🚀 ~ file: index.ts:10 ~ courseOptions ~ courseOptions:',
      courseOptions
    );
  } catch (err) {
    console.error(err);
  }
}

main();
