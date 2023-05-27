import cheerio from "cheerio";
const daysOfWeek = {
    Hai: 2,
    Ba: 3,
    Tư: 4,
    Năm: 5,
    Sáu: 6,
    Bảy: 7,
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
    Sat: 7,
};
function parseDay(day) {
    return daysOfWeek[day];
}
export default function extractSubjectDataFromHTML(html) {
    const $ = cheerio.load(html);
    const divTDK = $("#divTDK");
    const bodyTables = divTDK.find(".body-table");
    const subjects = [];
    bodyTables.each((index, bodyTable) => {
        const rows = $(bodyTable).find("tbody tr");
        rows.each((index, row) => {
            var _a;
            const tds = $(row).find("td");
            // Extract the desired information from each td
            const subjectId = (_a = $(tds[0]).find("input").attr("id")) === null || _a === void 0 ? void 0 : _a.trim();
            const subjectCode = $(tds[1]).text().trim();
            const subjectName = $(tds[2]).text().trim();
            const subjectGroup = $(tds[3]).text().trim();
            const practiceGroup = $(tds[4]).text().trim();
            const numberOfCredits = $(tds[5]).text().trim();
            const creditsForTuitionFee = $(tds[6]).text().trim();
            const classCode = $(tds[7]).text().trim();
            const numberOfStudents = $(tds[8]).text().trim();
            const availableSlot = $(tds[9]).text().trim();
            // Extract the lessons of the subject
            const listPracticeSession = $(tds[10]).find(".top-fline");
            const listDayOfWeek = $(tds[11]).find(".top-fline");
            const listStartingPeriod = $(tds[12]).find(".top-fline");
            const listNumberOfPeriods = $(tds[13]).find(".top-fline");
            const listRoom = $(tds[14]).find(".top-fline");
            const listLecturer = $(tds[15]).find(".top-fline");
            const listWeeks = $(tds[16]).find(".top-fline");
            const lessons = [];
            for (let i = 0; i < listPracticeSession.length; i++) {
                const lessonDetails = {
                    practiceSession: $(listPracticeSession[i]).text().trim(),
                    dayOfWeek: $(listDayOfWeek[i]).text().trim(),
                    startingPeriod: $(listStartingPeriod[i]).text().trim(),
                    numberOfPeriods: $(listNumberOfPeriods[i]).text().trim(),
                    room: $(listRoom[i]).text().trim(),
                    lecturer: $(listLecturer[i]).text().trim(),
                    weeks: $(listWeeks[i]).text().trim(),
                };
                lessons.push(lessonDetails);
            }
            const subjectObject = {
                subjectId,
                subjectCode,
                subjectName,
                subjectGroup,
                practiceGroup,
                numberOfCredits,
                creditsForTuitionFee,
                classCode,
                numberOfStudents,
                availableSlot,
                lessons,
            };
            subjects.push(subjectObject);
        });
    });
    return subjects;
}
