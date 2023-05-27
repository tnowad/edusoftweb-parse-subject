# edusoftweb-parse-subject

A Node module for extracting subject data from HTML files.

## Installation

```bash
npm install edusoftweb-parse-subject
```

## Usage

Using TypeScript

```typescript
import { extractSubjectDataFromHTML } from "edusoftweb-parse-subject";
import fs from "fs";

const filePath = "data.html";

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  const subjects = extractSubjectDataFromHTML(data);
  console.log(subjects[0]);
});
```

Using JavaScript

```javascript
const { extractSubjectDataFromHTML } = require("edusoftweb-parse-subject");
const fs = require("fs");

const filePath = "data.html";

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  const subjects = extractSubjectDataFromHTML(data);
  console.log(subjects[0]);
});
```

## API
**extractSubjectDataFromHTML(html: string): Subject[]**

Extracts subject data from the provided HTML string and returns an array of subjects. Each subject object has the following properties:

- subjectId (string): The ID of the subject.
- subjectCode (string): The code of the subject.
- subjectName (string): The name of the subject.
- subjectGroup (string): The group of the subject.
- practiceGroup (string): The practice group of the subject.
- numberOfCredits (string): The number of credits for the subject.
- creditsForTuitionFee (string): The credits for tuition fee for the subject.
- classCode (string): The class code of the subject.
- numberOfStudents (string): The number of students in the subject.
- availableSlot (string): The number of available slots in the subject.
- lessons (array): An array of lesson objects. Each lesson object has the following properties:
  - practiceSession (string): The practice session of the lesson.
  - dayOfWeek (string): The day of the week of the lesson.
  - startingPeriod (string): The starting period of the lesson.
  - numberOfPeriods (string): The number of periods for the lesson.
  - room (string): The room for the lesson.
  - lecturer (string): The lecturer for the lesson.
  - weeks (string): The weeks for the lesson.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to modify and customize it according to your needs.
