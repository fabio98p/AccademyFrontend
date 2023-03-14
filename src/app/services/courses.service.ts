import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { Course } from 'src/app/DTOs/course'

@Injectable({
	providedIn: 'root'
})
export class CoursesService {
	private baseUrl = environment.apiURL
	private courseUrl = this.baseUrl + 'course'

	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}
	getCourses(): Observable<Course[]> {
		return this.http.get<Course[]>(this.courseUrl).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	getCourseById(id: Number): Observable<Course> {
		return this.http.get<Course>(`${this.courseUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	createCourse(course: Course): Observable<Course> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Course>(this.courseUrl, course, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	updateCourse(course: Course): Observable<Course> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put<Course>(this.courseUrl, course, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	deleteCourse(id: number): Observable<Course> {
		return this.http.delete<Course>(`${this.courseUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	getLastCourses(n: number): Observable<Course[]> {
		return this.http.get<Course[]>(`${this.courseUrl}/lastCourse/${n}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

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
}
