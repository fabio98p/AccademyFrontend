import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

// import { Instructor } from '../DTOs/instructor'
import { Instructor } from 'src/app/DTOs/instructor'

@Injectable({
	providedIn: 'root'
})
export class InstructorsService {
	private baseUrl = 'https://localhost:44331/api/'

	private instructorUrl = this.baseUrl + 'instructor'

	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

	getInstructors(): Observable<Instructor[]> {
		return this.http.get<Instructor[]>(this.instructorUrl).pipe(
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
