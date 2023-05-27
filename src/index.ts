import cheerio from "cheerio";
import fs from "fs";

const htmlFilePath = "data.html";
const html = fs.readFileSync(htmlFilePath, "utf8");
const $ = cheerio.load(html);
const divTDK = $("#divTDK");
const bodyTables = divTDK.find(".body-table");

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

    // add lessons from td 10 -> 16
    // 10 -> 16 is same size of dive

    const lessons: {} = [];
    const lessonsLength = $(tds[10]).length;

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
      lessons: lessons,
    };
    console.log(subjectObject);
  });
});
