import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { Edition } from 'src/app/DTOs/edition'

import { Student } from 'src/app/DTOs/student'
import { Instructor } from 'src/app/DTOs/instructor'

@Injectable({
	providedIn: 'root'
})
export class EditionsService {
	private baseUrl = environment.apiURL
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

	getEditionsByCourseId(id: number): Observable<Edition[]> {
		return this.http.get<Edition[]>(`${this.courseEditionUrl}/course/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	getEditionById(id: number): Observable<Edition> {
		return this.http.get<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	createEdition(edition: Edition): Observable<Edition> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	updateEdition(edition: Edition): Observable<Edition> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	deleteEdition(id: number): Observable<Edition> {
		return this.http.delete<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	getAvailableEnrollmentByStudentId(id: number): Observable<Edition[]> {
		return this.http.get<Edition[]>(`${this.courseEditionUrl}/studentAvailable/${id}`).pipe(
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
