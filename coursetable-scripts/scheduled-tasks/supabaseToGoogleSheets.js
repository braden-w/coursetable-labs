const SUPABASE_URL = 'https://mxfsblceatcvkcvakwvl.supabase.co';
const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14ZnNibGNlYXRjdmtjdmFrd3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzNTAwODEsImV4cCI6MTk5NjkyNjA4MX0.6_F4Ey_eMyUEwiL96cfOrKD3O1sKAYEzwPz0exERfpk';

const SELECTED_HEADERS = [
	'all_course_codes',
	'skills',
	'areas',
	'comment_compound'
	// 'comment',
	// 'title'
];
const HEADER_ROW = 1;
const DATA_START_ROW = HEADER_ROW + 1;

function mainFunction() {
	clearEntireSpreadsheet();
	writeHeadersOnRow(HEADER_ROW);
	fetchDataAndWriteToSheet();
}

function fetchDataAndWriteToSheet() {
	const url = `${SUPABASE_URL}/rest/v1/EvaluationNarrativesToCourses202303?select=${SELECTED_HEADERS.join(
		','
	)}`;
	const options = {
		headers: {
			Apikey: SUPABASE_ANON_KEY,
			Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
			'Content-Type': 'application/json'
		},
		method: 'get'
	};
	const response = UrlFetchApp.fetch(url, options);
	const jsonData = JSON.parse(response.getContentText());
	writeToSheet(jsonData);
}

function writeToSheet(data) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

	const rows = data.map((row) => {
		return SELECTED_HEADERS.map((column) => (row.hasOwnProperty(column) ? row[column] : ''));
	});

	const dataRange = sheet.getRange(DATA_START_ROW, 1, rows.length, rows[0].length);
	dataRange.setValues(rows);
}

function clearEntireSpreadsheet() {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	sheet.clear();
}

function writeHeadersOnRow(rowNumber) {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	sheet.getRange(rowNumber, 1, 1, SELECTED_HEADERS.length).setValues([SELECTED_HEADERS]);
}
