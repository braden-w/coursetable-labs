import supabase from '../supabaseClient.js';

async function upsertCourseBatch(coursesBatch) {
	const { error } = await supabase.from('Courses').upsert(coursesBatch);
	if (error) throw error;
}

export async function upsertCoursesInBatches(courses) {
	const count = courses.length;
	const parallelRequests = 30;
	const limit = Math.ceil(count / parallelRequests);

	try {
		const coursesBatches = Array.from({ length: parallelRequests }, (_, i) => {
			const start = i * limit;
			const end = start + limit;
			const coursesBatch = courses.slice(start, end);
			return coursesBatch;
		});
		for (const coursesBatch of coursesBatches) await upsertCourseBatch(coursesBatch);
	} catch (err) {
		console.error(err);
	}
}
