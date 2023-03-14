import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
export function handleError(errorResponse: HttpErrorResponse): Observable<never> {
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
