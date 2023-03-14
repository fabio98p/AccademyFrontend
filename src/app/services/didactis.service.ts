import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Edition } from 'src/app/DTOs/edition'
import { Area } from 'src/app/DTOs/area'

import { Course } from 'src/app/DTOs/course'
import { Enroll } from 'src/app/DTOs/enroll'
import { Student } from 'src/app/DTOs/student'
import { Instructor } from 'src/app/DTOs/instructor'

@Injectable({
	providedIn: 'root'
})
export class DidactisService {
	private baseUrl = 'https://localhost:44331/api/'
	private courseUrl = this.baseUrl + 'course'
	private areaUrl = this.baseUrl + 'area'
	private courseEditionUrl = this.baseUrl + 'edition'
	private instructorUrl = this.baseUrl + 'instructor'
	private studentUrl = this.baseUrl + 'student'
	private enrollUrl = this.baseUrl + 'enrollment'
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

	// getEditionsByCourseId(id: number): Observable<Edition[]> {
	// 	return this.http.get<Edition[]>(`${this.courseEditionUrl}/course/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getEditionById(id: number): Observable<Edition> {
	// 	return this.http.get<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getInstructors(): Observable<Instructor[]> {
	// 	return this.http.get<Instructor[]>(this.instructorUrl).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getStudents(): Observable<Student[]> {
	// 	return this.http.get<Student[]>(this.studentUrl).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getStudentById(id: Number): Observable<Student> {
	// 	return this.http.get<Student>(`${this.studentUrl}/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// createEdition(edition: Edition): Observable<Edition> {
	// 	const hs = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	})
	// 	return this.http.post<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// updateEdition(edition: Edition): Observable<Edition> {
	// 	const hs = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	})
	// 	return this.http.put<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// deleteEdition(id: number): Observable<Edition> {
	// 	return this.http.delete<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getSubscribedEnrollmentByStudentId(id: number): Observable<Enroll[]> {
	// 	return this.http.get<Enroll[]>(`${this.enrollUrl}/studentSubscribed/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }
	// getSubscribedEnrollmentByEditionId(id: number): Observable<Enroll[]> {
	// 	return this.http.get<Enroll[]>(`${this.enrollUrl}/courseeditionSubscribed/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// getAvailableEnrollmentByStudentId(id: number): Observable<Edition[]> {
	// 	return this.http.get<Edition[]>(`${this.courseEditionUrl}/studentAvailable/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }
	// getAvailableEnrollmentByEditionId(id: number): Observable<Student[]> {
	// 	return this.http.get<Student[]>(`${this.enrollUrl}/courseeditionAvailable/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// createStudent(student: Student): Observable<Student> {
	// 	const hs = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	})
	// 	return this.http.post<Student>(this.studentUrl, student, { headers: hs }).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// updateStudent(student: Student): Observable<Student> {
	// 	const hs = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	})
	// 	return this.http.put<Student>(this.studentUrl, student, { headers: hs }).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	// deleteStudent(id: number): Observable<Student> {
	// 	return this.http.delete<Student>(`${this.studentUrl}/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }

	private handleError(errorResponse: HttpErrorResponse): Observable<never> {
		//lancia un'eccezione
		let errorMessage = ''
		if (errorResponse.error instanceof ErrorEvent) {
			errorMessage = 'errore di rete: ' + errorResponse.error.message
		} else {
			errorMessage = 'errore lato server: ' + errorResponse.status + '' + errorResponse.message
		}
		console.log(errorMessage)
		return throwError(errorMessage)
	}
	// enrollStudent(enroll: Enroll): Observable<Enroll> {
	// 	const hs = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	})
	// 	return this.http.post<Enroll>(this.enrollUrl, enroll, { headers: hs }).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }
	// UnsubscribeStudent(id: number): Observable<Enroll> {
	// 	return this.http.delete<Enroll>(`${this.enrollUrl}/${id}`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }
	// getAreas(): Observable<Area[]> {
	// 	return this.http.get<Area[]>(`${this.areaUrl}/areas`).pipe(
	// 		tap(data => console.log(data)),
	// 		catchError(this.handleError)
	// 	)
	// }
}
