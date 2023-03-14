import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

import { Edition } from 'src/app/DTOs/edition'


@Injectable({
	providedIn: 'root'
})
export class EditionsService {
	private baseUrl = environment.apiURL
	private courseEditionUrl = this.baseUrl + 'edition'
    
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

	getEditionsByCourseId(id: number): Observable<Edition[]> {
		return this.http.get<Edition[]>(`${this.courseEditionUrl}/course/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	getEditionById(id: number): Observable<Edition> {
		return this.http.get<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	createEdition(edition: Edition): Observable<Edition> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	updateEdition(edition: Edition): Observable<Edition> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put<Edition>(this.courseEditionUrl, edition, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	deleteEdition(id: number): Observable<Edition> {
		return this.http.delete<Edition>(`${this.courseEditionUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	getAvailableEnrollmentByStudentId(id: number): Observable<Edition[]> {
		return this.http.get<Edition[]>(`${this.courseEditionUrl}/studentAvailable/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
}
