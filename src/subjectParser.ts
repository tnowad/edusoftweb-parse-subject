import cheerio from "cheerio";
import fs from "fs";

export interface Lesson {
  practiceSession: string;
  dayOfWeek: string;
  startingPeriod: string;
  numberOfPeriods: string;
  room: string;
  lecturer: string;
  weeks: string;
}

export interface Subject {
  subjectId: string | undefined;
  subjectCode: string;
  subjectName: string;
  subjectGroup: string;
  practiceGroup: string;
  numberOfCredits: string;
  creditsForTuitionFee: string;
  classCode: string;
  numberOfStudents: string;
  availableSlot: string;
  lessons: Lesson[];
}

const daysOfWeek: Record<string, number> = {
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

export function parseDay(day: string): number {
  return daysOfWeek[day];
}

export function extractSubjectDataFromHTML(html: string): Subject[] {
  const $ = cheerio.load(html);
  const divTDK = $("#divTDK");
  const bodyTables = divTDK.find(".body-table");

  const subjects: Subject[] = [];

  bodyTables.each((index, bodyTable) => {
    const rows = $(bodyTable).find("tbody tr");
    rows.each((index, row) => {
      const tds = $(row).find("td");

      // Extract the desired information from each td
      const subjectId = $(tds[0]).find("input").attr("id")?.trim();
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
      const lessons: Lesson[] = [];

      for (let i = 0; i < listPracticeSession.length; i++) {
        const lessonDetails: Lesson = {
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

      const subjectObject: Subject = {
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
