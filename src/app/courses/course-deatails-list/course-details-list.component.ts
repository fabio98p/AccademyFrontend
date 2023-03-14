import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Course } from 'src/app/DTOs/course'
import { Edition } from 'src/app/DTOs/edition'
import { Level } from 'src/app/DTOs/level'
import { EditionsService } from 'src/app/services/editions.service'
import { CoursesService } from 'src/app/services/courses.service'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'app-course-details-list',
	templateUrl: './course-details-list.component.html',
	styleUrls: ['./course-details-list.component.css']
})
export class CourseDetailsListComponent implements OnInit {
	course: Course | undefined
	editions: Edition[] = []

	faundo = faReply
	faplus = faPlusCircle
	faview = faList

	constructor(
		private EditionsService: EditionsService,
		private coursesService: CoursesService,
		private router: Router,
		private route: ActivatedRoute
	) {}
	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'))
		if (id != null) {
			this.coursesService.getCourseById(id).subscribe({
				next: c => {
					this.course = c
				},
				error: error => console.log(error)
			})
			this.EditionsService.getEditionsByCourseId(id).subscribe({
				next: ces => (this.editions = ces),
				error: error => console.log(error)
			})
		}
		let view = document.getElementById('view')
		view?.addEventListener
	}
	onBack(): void {
		this.router.navigate(['/courses'])
	}
}
