import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Area } from 'src/app/DTOs/area'
import { Course } from 'src/app/DTOs/course'
import { Level } from 'src/app/DTOs/level'

import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { CoursesService } from 'src/app/services/courses.service'
import { AreasService } from 'src/app/services/areas.service'

@Component({
	selector: 'app-course-add',
	templateUrl: './course-add.component.html',
	styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
	course: Course
	areas: Area[] = []
	levels: { value: number; label: string }[]
	id: number = 0

	faundo = faReply
	fasend = faSave

	constructor(private areasService: AreasService, private coursesService: CoursesService, private router: Router, private route: ActivatedRoute) {
		this.levels = this.getLevels()
		this.course = new Course()
		this.course.level = Level.INTERMEDIATE
	}

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'))
		this.areasService.getAreas().subscribe({
			next: as => (this.areas = as),
			error: err => console.log(err)
		})

		if (this.id != 0) {
			this.coursesService.getCourseById(this.id).subscribe({
				next: c => {
					this.course = c
					//console.log(this.course);
				},
				error: err => console.log(err)
			})
		}
	}

	getLevels(): { value: number; label: string }[] {
		let enumArray = Object.keys(Level)
			.filter(x => !Number.isNaN(Number(x)))
			.map(x => {
				return { value: Number(x), label: Level[Number(x)] }
			})
		return enumArray
	}
	save(form: NgForm) {
		//this.course.level = form.value
		this.course.level = Number(this.course.level)
		this.course.areaId = Number(this.course.areaId)
		console.log(this.course)
		if (this.id == 0) {
			this.coursesService.createCourse(this.course).subscribe({
				next: cs => {
					this.course = cs
					alert('corso creato con id: ' + this.course.id)
					this.router.navigate(['/courses'])
				},
				error: err => console.log(err)
			})
		} else {
			this.coursesService.updateCourse(this.course).subscribe({
				next: cs => {
					this.course = cs
					alert('corso aggiornato con id: ' + this.course.id)
					this.router.navigate(['/courses'])
				},
				error: err => console.log(err)
			})
		}
	}
	onBack(): void {
		this.router.navigate(['/courses'])
	}
}
