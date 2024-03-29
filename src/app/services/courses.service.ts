import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

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
			catchError(handleError)
		)
	}

	getCourseById(id: Number): Observable<Course> {
		return this.http.get<Course>(`${this.courseUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	createCourse(course: Course): Observable<Course> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Course>(this.courseUrl, course, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	updateCourse(course: Course): Observable<Course> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put<Course>(this.courseUrl, course, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	deleteCourse(id: number): Observable<Course> {
		return this.http.delete<Course>(`${this.courseUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	getLastCourses(n: number): Observable<Course[]> {
		return this.http.get<Course[]>(`${this.courseUrl}/lastCourse/${n}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
}
