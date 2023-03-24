import { Component, OnInit, TestabilityRegistry } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Student } from 'src/app/DTOs/student'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import { StudentsService } from 'src/app/services/students.service'

declare var bootbox: any

@Component({
	selector: 'app-root',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
	students: Student[] = []
	student: Student = new Student()
	originalStudents: Student[] = []
	name: string = ''
	lastname: string = ''

	fasearch = faSearch
	fainfo = faInfoCircle
	faedit = faEdit
	fatrash = faTrash
	fauser = faUser
	faplus = faGraduationCap

	constructor(private studentsService: StudentsService, private router: Router, private route: ActivatedRoute) {}
	ngOnInit(): void {
		this.studentsService.getStudents().subscribe({
			next: c => {
				this.students = c
				this.originalStudents = c
			},
			error: error => console.log(error)
		})
	}
	search(name: string, lastname: string) {
		this.students = this.originalStudents
		console.log(this.students[0].firstname + ' ' + this.students[0].firstname.includes(name))
		this.students = this.students.filter(c => c.lastname.toLocaleLowerCase().includes(lastname) && c.firstname.toLocaleLowerCase().includes(name))
	}

	delete(id: number) {
		/*if(window.confirm("Are you sure to delete "+id)) {
      console.log(this.remove(id));
    }*/
		bootbox.dialog({
			title: 'Elimina studente',
			message: 'Sei sicuro di voler eliminare questo studente?',
			closeButton: false,
			size: 'large',
			buttons: {
				cancel: {
					label: 'Elimina',
					className: 'btn-danger',
					callback: () => {
						this.remove(id)
					}
				},
				confirm: {
					label: 'Annulla',
					className: 'btn-warning'
				}
			}
		})
	}

	remove(id: number) {
		let obsCourse: Observable<Student> = this.studentsService.deleteStudent(id)
		obsCourse.subscribe({
			next: c => {
				this.student = c
				this.ngOnInit()
			},
			error: err => console.log(err)
		})
	}
}
