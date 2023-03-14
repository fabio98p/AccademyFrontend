import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Student } from 'src/app/DTOs/student'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { StudentsService } from 'src/app/services/students.service'

@Component({
	selector: 'app-student-add',
	templateUrl: './student-add.component.html',
	styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
	student: Student
	id: number = 0

	faundo = faReply
	fasend = faSave

	constructor(private studentsService: StudentsService, private router: Router, private route: ActivatedRoute) {
		this.student = new Student()
	}

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'))

		if (this.id != 0) {
			this.studentsService.getStudentById(this.id).subscribe({
				next: s => (this.student = s),
				error: err => console.log(err)
			})
		}
	}
	save(form: NgForm) {
		if (this.id == 0) {
			this.studentsService.createStudent(this.student).subscribe({
				next: s => {
					this.student = s
					alert('studente creato con id: ' + this.student?.id)
					this.onBack()
				},
				error: err => console.log(err)
			})
		} else {
			this.studentsService.updateStudent(this.student).subscribe({
				next: s => {
					this.student = this.student
					alert('studente aggiornato con id: ' + this.student?.id)
					this.onBack()
				},
				error: err => console.log(err)
			})
		}
	}
	onBack(): void {
		this.router.navigate(['/students'])
	}
}
