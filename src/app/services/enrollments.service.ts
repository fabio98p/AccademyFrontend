import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Enroll } from 'src/app/DTOs/enroll'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'


@Injectable({
	providedIn: 'root'
})
export class EnrollmentsService {
	private baseUrl = environment.apiURL
	private enrollUrl = this.baseUrl + 'enrollment'
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

    getSubscribedEnrollmentByStudentId(id: number): Observable<Enroll[]> {
		return this.http.get<Enroll[]>(`${this.enrollUrl}/studentSubscribed/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
	getSubscribedEnrollmentByEditionId(id: number): Observable<Enroll[]> {
		return this.http.get<Enroll[]>(`${this.enrollUrl}/courseeditionSubscribed/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	enrollStudent(enroll: Enroll): Observable<Enroll> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Enroll>(this.enrollUrl, enroll, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
	UnsubscribeStudent(id: number): Observable<Enroll> {
		return this.http.delete<Enroll>(`${this.enrollUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
}
