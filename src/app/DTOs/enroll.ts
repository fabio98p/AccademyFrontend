import { CourseEdition } from "./edition";
import { Student } from "./student";

export class Enroll{
    id:number =0;
    studentId: number =0;
    studentFirstname:string = "";
    studentLastname:string = "";
    courseEditionId:number =0;
    courseEditionCode: string = "";
    courseEditionCourseTitle:string = "";
    studentEvaluation:string = "";
    studentFeedBack:string = "";
    courseEditionStartDate:string = "";
    
    constructor(student: Student, edition: CourseEdition){
        this.studentId = student.id;
        this.studentFirstname = student.firstname;
        this.studentLastname = student.surname;
        this.courseEditionId = edition.id;
        this.courseEditionCode = edition.code;
        this.courseEditionStartDate = edition.startDate;
        this.courseEditionCourseTitle = edition.courseTitle;
    }
}
