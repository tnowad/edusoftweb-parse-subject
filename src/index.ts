import fs from "fs";
import { Subject, extractSubjectDataFromHTML } from "./subjectParser";

const htmlFilePath = "data.html";

fs.readFile(htmlFilePath, "utf8", (err, htmlContent) => {
  if (err) {
    console.error("Error reading HTML file:", err);
    return;
  }

  const subjects: Subject[] = extractSubjectDataFromHTML(htmlContent);
  console.log(subjects[0]);
});
