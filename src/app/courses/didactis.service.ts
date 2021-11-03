import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CourseEdition } from 'src/app/DTOs/edition';
import { Area } from "../DTOs/area";
import { Course } from "../DTOs/course";
import { Enroll } from "../DTOs/enroll";
import { Student } from "../DTOs/student";
import { Teacher } from "../DTOs/teacher";


@Injectable({
  providedIn: 'root'
})
export class DidactisService {
  private baseUrl = 'https://localhost:44331/api/';
  private courseUrl = this.baseUrl + 'course';
  private courseEditionUrl = this.baseUrl + 'courseedition';
  private teacherUrl = this.baseUrl + 'instructor';
  private studentUrl = this.baseUrl + 'student';
  private enrollUrl = this.baseUrl + 'enrollment';
  //private http:HttpClient;
  constructor(private http: HttpClient) {
    this.http = http;
  }
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }
  getCourseById(id: Number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }
  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.courseUrl}/areas`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }
  createCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }
  updateCourse(course: Course): Observable<Course> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Course>(this.courseUrl, course, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }
  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }

  getEditionsByCourseId(id: number): Observable<CourseEdition[]> {
    return this.http.get<CourseEdition[]>(`${this.courseEditionUrl}/course/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getEditionById(id: number): Observable<CourseEdition> {
    return this.http.get<CourseEdition>(`${this.courseEditionUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getLastCourses(n: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/lastCourse/${n}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getStudentById(id: Number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  createEdition(edition: CourseEdition): Observable<CourseEdition> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<CourseEdition>(this.courseEditionUrl, edition, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  updateEdition(edition: CourseEdition): Observable<CourseEdition> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<CourseEdition>(this.courseEditionUrl, edition, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  deleteCourseEdition(id: number): Observable<CourseEdition> {
    return this.http.delete<CourseEdition>(`${this.courseEditionUrl}/${id}`)
    .pipe(tap(data => console.log(data)),
      catchError(this.handleError));
  }

  getSubscribedEnrollmentByStudentId(id: number): Observable<Enroll[]> {
    return this.http.get<Enroll[]>(`${this.enrollUrl}/studentSubscribed/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }
  getSubscribedEnrollmentByCourseEditionId(id: number): Observable<Enroll[]> {
    return this.http.get<Enroll[]>(`${this.enrollUrl}/courseeditionSubscribed/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAvailableEnrollmentByStudentId(id: number): Observable<CourseEdition[]> {
    return this.http.get<CourseEdition[]>(`${this.enrollUrl}/studentAvailable/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }
  getAvailableEnrollmentByCourseEditionId(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.enrollUrl}/courseeditionAvailable/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  createStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }

  updateStudent(student: Student): Observable<Student> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Student>(this.studentUrl, student, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.studentUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> { //lancia un'eccezione
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = 'errore di rete: ' + errorResponse.error.message;
    } else {
      errorMessage = 'errore lato server: ' + errorResponse.status + '' + errorResponse.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  enrollStudent(enroll: Enroll): Observable<Enroll> {
    const hs = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Enroll>(this.enrollUrl, enroll, { headers: hs })
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );


  }
  UnsubscribeStudent(id: number): Observable<Enroll> {
    return this.http.delete<Enroll>(`${this.enrollUrl}/${id}`)
      .pipe(tap(data => console.log(data)),
        catchError(this.handleError)
      );

  }
}

