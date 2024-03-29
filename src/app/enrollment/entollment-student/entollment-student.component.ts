import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Edition } from 'src/app/DTOs/edition'
import { Enroll } from 'src/app/DTOs/enroll'
import { Student } from 'src/app/DTOs/student'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faHandshakeSlash } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'

import { EnrollmentsService } from 'src/app/services/enrollments.service'
import { StudentsService } from 'src/app/services/students.service'
import { EditionsService } from 'src/app/services/editions.service'

@Component({
	selector: 'app-entollment-student',
	templateUrl: './entollment-student.component.html',
	styleUrls: ['./entollment-student.component.css']
})
export class EntollmentStudentComponent implements OnInit {
	editionsSubsribed: Enroll[] = []
	editionsAllowed: Edition[] = []
	student: Student

	faiscrivi = faGraduationCap
	fadisiscrivi = faHandshakeSlash
	faundo = faReply

	constructor(
		private enrollmentsService: EnrollmentsService,
		private editionsService: EditionsService,
		private studentsService: StudentsService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.student = new Student()
	}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'))
		this.studentsService.getStudentById(id).subscribe({
			next: c => {
				this.student = c
			},
			error: error => console.log(error)
		})

		this.enrollmentsService.getSubscribedEnrollmentByStudentId(id).subscribe({
			next: c => {
				this.editionsSubsribed = c
			},
			error: error => console.log(error)
		})

		this.editionsService.getAvailableEnrollmentByStudentId(id).subscribe({
			next: c => {
				this.editionsAllowed = c
			},
			error: error => console.log(error)
		})
	}
	ClickOnEnroll(idEdition: number) {
		var ed = this.editionsAllowed.find(e => e.id == idEdition)
		if (ed != undefined) {
			var enroll = new Enroll(this.student, ed)
			this.enrollmentsService.enrollStudent(enroll).subscribe({
				next: c => {
					enroll = c
					console.log(enroll)
					this.ngOnInit()
				},
				error: error => console.log(error)
			})
		}
	}
	ClickOnUnsubscribe(idEdition: number) {
		if (window.confirm("Sei sicuro di voler disiscrivere da quest'edizione? ")) {
			console.log(this.remove(idEdition))
		}
	}
	remove(id: number) {
		this.enrollmentsService.UnsubscribeStudent(id).subscribe({
			next: c => {
				this.ngOnInit()
			},
			error: error => console.log(error)
		})
	}
	onBack(): void {
		this.router.navigate(['/students'])
	}
}
