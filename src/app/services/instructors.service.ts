import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

// import { Instructor } from '../DTOs/instructor'
import { Instructor } from 'src/app/DTOs/instructor'

@Injectable({
	providedIn: 'root'
})
export class InstructorsService {
	private baseUrl = environment.apiURL

	private instructorUrl = this.baseUrl + 'instructor'

	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

	getInstructors(): Observable<Instructor[]> {
		return this.http.get<Instructor[]>(this.instructorUrl).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
}
