import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { faGraduationCap, faHandshakeSlash, faReply } from '@fortawesome/free-solid-svg-icons'
import { Edition } from 'src/app/DTOs/edition'
import { Enroll } from 'src/app/DTOs/enroll'
import { Student } from 'src/app/DTOs/student'

import { EditionsService } from 'src/app/services/editions.service'
import { EnrollmentsService } from 'src/app/services/enrollments.service'
import { StudentsService } from 'src/app/services/students.service'

@Component({
	selector: 'app-enrollment-edition',
	templateUrl: './enrollment-edition.component.html',
	styleUrls: ['./enrollment-edition.component.css']
})
export class EnrollmentEditionComponent implements OnInit {
	studentsSubsribed: Enroll[] = []
	studentsAllowed: Student[] = []
	edition: Edition

	faiscrivi = faGraduationCap
	fadisiscrivi = faHandshakeSlash
	faundo = faReply

	constructor(
		private editionsService: EditionsService,
		private enrollmentsService: EnrollmentsService,
		private studentsService: StudentsService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.edition = new Edition()
	}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'))
		this.editionsService.getEditionById(id).subscribe({
			next: c => {
				this.edition = c
			},
			error: error => console.log(error)
		})
		this.enrollmentsService.getSubscribedEnrollmentByEditionId(id).subscribe({
			next: c => {
				this.studentsSubsribed = c
			},
			error: error => console.log(error)
		})

		this.studentsService.getAvailableEnrollmentByEditionId(id).subscribe({
			next: c => {
				this.studentsAllowed = c
			},
			error: error => console.log(error)
		})
	}
	ClickOnEnroll(idStudent: number) {
		var ed = this.studentsAllowed.find(e => e.id == idStudent)
		if (ed != undefined) {
			var enroll = new Enroll(ed, this.edition)
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
		this.router.navigate(['/editions', this.edition.courseId])
	}
}
