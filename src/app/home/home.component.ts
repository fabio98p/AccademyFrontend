import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CoursesService } from 'src/app/services/courses.service'

import { Course } from '../DTOs/course'

@Component({
	selector: 'app-root',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	courses: Course[] = []
	constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute) {}
	ngOnInit(): void {
		this.coursesService.getLastCourses(6).subscribe({
			next: c => {
				this.courses = c
			},
			error: error => console.log(error)
		})
	}
	title = 'Home'
}
