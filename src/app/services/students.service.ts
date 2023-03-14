import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Student } from 'src/app/DTOs/student'
import { environment } from 'src/environments/environment';
import { handleError } from 'src/app/services/utilities.service'

@Injectable({
	providedIn: 'root'
})
export class StudentsService {
    private baseUrl = environment.apiURL

	private studentUrl = this.baseUrl + 'student'

	constructor(private http: HttpClient) {
		this.http = http
	}

	getStudents(): Observable<Student[]> {
		return this.http.get<Student[]>(this.studentUrl).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	getStudentById(id: Number): Observable<Student> {
		return this.http.get<Student>(`${this.studentUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	getAvailableEnrollmentByEditionId(id: number): Observable<Student[]> {
		return this.http.get<Student[]>(`${this.studentUrl}/courseeditionAvailable/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	createStudent(student: Student): Observable<Student> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post<Student>(this.studentUrl, student, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	updateStudent(student: Student): Observable<Student> {
		const hs = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put<Student>(this.studentUrl, student, { headers: hs }).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}

	deleteStudent(id: number): Observable<Student> {
		return this.http.delete<Student>(`${this.studentUrl}/${id}`).pipe(
			tap(data => console.log(data)),
			catchError(handleError)
		)
	}
}
