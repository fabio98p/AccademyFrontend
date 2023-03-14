import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Edition } from 'src/app/DTOs/edition'
import { Area } from 'src/app/DTOs/area'
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AreasService {
	private baseUrl = environment.apiURL
	private areaUrl = this.baseUrl + 'area'

	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}

	getAreas(): Observable<Area[]> {
		return this.http.get<Area[]>(`${this.areaUrl}/areas`).pipe(
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
