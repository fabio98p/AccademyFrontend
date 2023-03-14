import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Enroll } from 'src/app/DTOs/enroll'


@Injectable({
	providedIn: 'root'
})
export class EnrollmentsService {
	private baseUrl = 'https://localhost:44331/api/'
	private enrollUrl = this.baseUrl + 'enrollment'
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

    getSubscribedEnrollmentByStudentId(id: number): Observable<Enroll[]> {
		return this.http.get<Enroll[]>(`${this.enrollUrl}/studentSubscribed/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}
	getSubscribedEnrollmentByEditionId(id: number): Observable<Enroll[]> {
		return this.http.get<Enroll[]>(`${this.enrollUrl}/courseeditionSubscribed/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}

	enrollStudent(enroll: Enroll): Observable<Enroll> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Enroll>(this.enrollUrl, enroll, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(this.handleError)
		)
	}
	UnsubscribeStudent(id: number): Observable<Enroll> {
		return this.http.delete<Enroll>(`${this.enrollUrl}/${id}`).pipe(
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
