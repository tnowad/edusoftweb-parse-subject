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
    subjectId: string;
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
export default function extractSubjectDataFromHTML(html: string): Subject[];
