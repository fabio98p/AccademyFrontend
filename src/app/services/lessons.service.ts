import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

@Injectable({
	providedIn: 'root'
})
export class LessonsService {
	private baseUrl = environment.apiURL
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}
}
