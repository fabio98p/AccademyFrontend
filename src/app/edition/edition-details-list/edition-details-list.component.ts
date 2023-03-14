import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs'

import { EditionsService } from 'src/app/services/editions.service'

import { Edition } from 'src/app/DTOs/edition'

@Component({
	selector: 'app-edition-details-list',
	templateUrl: './edition-details-list.component.html',
	styleUrls: ['./edition-details-list.component.css']
})
export class EditionDetailsListComponent implements OnInit {
	edition: Edition | undefined
	idCourse: number = 0

	faundo = faReply
	faplus = faPlusCircle
	faview = faList

	constructor(private editionService: EditionsService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'))
		this.idCourse = Number(this.route.snapshot.paramMap.get('idcorso'))
		if (id != null) {
			// this.editionService.getCourseById(id)
			// .subscribe({
			//     next: c => {this.edition = c},
			//     error: error => console.log(error)
			// });
			this.editionService.getEditionById(id).subscribe({
				next: e => (this.edition = e),
				error: error => console.log(error)
			})
		}
		let view = document.getElementById('view')
		view?.addEventListener
	}
	onBack(): void {
		this.router.navigate(['/editions/' + this.idCourse])
	}
}
