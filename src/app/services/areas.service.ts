import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

import { Area } from 'src/app/DTOs/area'


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
			catchError(handleError)
		)
	}
}
