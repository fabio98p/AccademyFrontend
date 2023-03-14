import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class LessonsService {
	private baseUrl = 'https://localhost:44331/api/'
	//private http:HttpClient;
	constructor(private http: HttpClient) {
		this.http = http
	}
}
