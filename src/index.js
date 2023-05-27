"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSubjectDataFromHTML = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var daysOfWeek = {
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
function extractSubjectDataFromHTML(html) {
    var $ = cheerio_1.default.load(html);
    var divTDK = $("#divTDK");
    var bodyTables = divTDK.find(".body-table");
    var subjects = [];
    bodyTables.each(function (index, bodyTable) {
        var rows = $(bodyTable).find("tbody tr");
        rows.each(function (index, row) {
            var _a;
            var tds = $(row).find("td");
            // Extract the desired information from each td
            var subjectId = (_a = $(tds[0]).find("input").attr("id")) === null || _a === void 0 ? void 0 : _a.trim();
            var subjectCode = $(tds[1]).text().trim();
            var subjectName = $(tds[2]).text().trim();
            var subjectGroup = $(tds[3]).text().trim();
            var practiceGroup = $(tds[4]).text().trim();
            var numberOfCredits = $(tds[5]).text().trim();
            var creditsForTuitionFee = $(tds[6]).text().trim();
            var classCode = $(tds[7]).text().trim();
            var numberOfStudents = $(tds[8]).text().trim();
            var availableSlot = $(tds[9]).text().trim();
            // Extract the lessons of the subject
            var listPracticeSession = $(tds[10]).find(".top-fline");
            var listDayOfWeek = $(tds[11]).find(".top-fline");
            var listStartingPeriod = $(tds[12]).find(".top-fline");
            var listNumberOfPeriods = $(tds[13]).find(".top-fline");
            var listRoom = $(tds[14]).find(".top-fline");
            var listLecturer = $(tds[15]).find(".top-fline");
            var listWeeks = $(tds[16]).find(".top-fline");
            var lessons = [];
            for (var i = 0; i < listPracticeSession.length; i++) {
                var lessonDetails = {
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
            var subjectObject = {
                subjectId: subjectId,
                subjectCode: subjectCode,
                subjectName: subjectName,
                subjectGroup: subjectGroup,
                practiceGroup: practiceGroup,
                numberOfCredits: numberOfCredits,
                creditsForTuitionFee: creditsForTuitionFee,
                classCode: classCode,
                numberOfStudents: numberOfStudents,
                availableSlot: availableSlot,
                lessons: lessons,
            };
            subjects.push(subjectObject);
        });
    });
    return subjects;
}
exports.extractSubjectDataFromHTML = extractSubjectDataFromHTML;
