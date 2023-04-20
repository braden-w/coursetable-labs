import { getCoursesSchemaMatchingApiStaticCatalog } from './courses/getCourses.js';
import { upsertCoursesInBatches } from './courses/upsertCourses.js';
import { fetchCourseTable } from './fetchCourseTable.js';
import { getEvaluationNarratives } from './evaluationNarratives/getEvaluationNarratives.js';
import { upsertEvaluationNarrativesInBatches } from './evaluationNarratives/upsertEvaluationNarratives.js';

function roundFloatsInCourse(course, floatKeys) {
	floatKeys.forEach((floatKey) => {
		if (typeof course[floatKey] === 'number') {
			course[floatKey] = parseFloat(course[floatKey].toFixed(3));
		}
	});
	return course;
}

async function main() {
	try {
		const courses = await getCoursesSchemaMatchingApiStaticCatalog();
		const floats = [
			'average_gut_rating',
			'average_professor',
			'average_rating',
			'average_workload',
			'average_rating_same_professors',
			'average_workload_same_professors',
			'credits'
		];
		const roundedCourses = courses.map((course) => roundFloatsInCourse(course, floats));
		upsertCoursesInBatches(roundedCourses);
		const evaluation_narratives = await getEvaluationNarratives();
		const evaluation_narratives_matching_course_id = filterEvaluationsByCourse({
			evaluation_narratives,
			courses
		});
		upsertEvaluationNarrativesInBatches(evaluation_narratives_matching_course_id);
		// const data = await getEvaluationNarrativesToCourses();
		// console.log('🚀 ~ file: index.js:42 ~ main ~ data:', data);
	} catch (err) {
		console.error(err);
	}
}

main();

function filterEvaluationsByCourse({ evaluation_narratives, courses }) {
	const courseIds = new Set(courses.map((course) => course.course_id));
	return evaluation_narratives.filter((evaluation) => courseIds.has(evaluation.course_id));
}

async function getEvaluationNarrativesToCourses() {
	const query = `
query evaluation_narratives_with_courses_all {
	evaluation_narratives {
		id
		course_id
		comment
		comment_compound
		course {
			computed_listing_infos {
				all_course_codes
				areas
#				average_gut_rating
#				average_professor
#				average_rating
#				average_workload
#				average_rating_same_professors
#				average_workload_same_professors
# 				classnotes
# 				course_code
# 				credits
# 				crn
				description
# 				enrolled
# 				extra_info
# 				final_exam
# 				flag_info
# 				fysem
# 				last_enrollment
# 				last_enrollment_same_professors
# 				listing_id
# 				locations_summary
# 				number
#				professor_ids
				professor_names
# 				regnotes
# 				requirements
# 				rp_attr
# 				same_course_id
# 				same_course_and_profs_id
# 				last_offered_course_id
 				school
				season_code
# 				section
				skills
				subject
 				syllabus_url
 				times_by_day
 				times_summary
				title
			}
		}
	}
}
	`;
	const variables = {};

	try {
		const {
			data: { evaluation_narratives }
		} = await fetchCourseTable(query, variables);
		const flattenedResults = evaluation_narratives.map(
			({
				course: {
					computed_listing_infos: [course]
				},
				...rest
			}) => ({ ...rest, ...course })
		);
		return flattenedResults;
	} catch (err) {
		console.error(err);
	}
}
