import { fetchCourseTable } from '../fetchCourseTable.js';

const coursesCount = `query CoursesCount {
	computed_listing_info_aggregate (distinct_on: course_id) {
		aggregate {
			count
		}
	}
}`;

const coursesSchemaMatchingApiStaticCatalog = `query CoursesSchemaMatchingApiStaticCatalog ($limit: Int, $offset: Int) {
	computed_listing_info (limit: $limit, offset: $offset, distinct_on: course_id) {
		all_course_codes
		areas
		average_gut_rating
		average_professor
		average_rating
		average_workload
		average_rating_same_professors
		average_workload_same_professors
		classnotes
		course_code
		course_id
		credits
		description
		final_exam
		flag_info
		locations_summary
		number
		professor_names
		regnotes
		requirements
		same_course_id
		school
		season_code
		section
		skills
		times_summary
		title
	}
}`;

export async function getCoursesCount() {
	try {
		const {
			data: {
				computed_listing_info_aggregate: {
					aggregate: { count }
				}
			}
		} = await fetchCourseTable(coursesCount);
		return count;
	} catch (err) {
		console.error(err);
	}
}

export async function getCoursesSchemaMatchingApiStaticCatalog() {
	const count = await getCoursesCount();
	const parallelRequests = 4;
	const limit = Math.ceil(count / parallelRequests);

	try {
		const requests = Array.from({ length: parallelRequests }, (_, i) => i * limit).map((offset) =>
			fetchCourseTable(coursesSchemaMatchingApiStaticCatalog, { limit, offset })
		);
		const results = await Promise.all(requests);
		const courses = results.flatMap((result) => result.data.computed_listing_info);
		return courses;
	} catch (err) {
		console.error(err);
	}
}
