import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Person } from './DTOs/person'
import { routeTransitionAnimations } from './route-transition-animations'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [routeTransitionAnimations]
})
export class AppComponent {
	title = 'hello-angular'

    constructor() {
        let key = 'personLogged'
		if (localStorage.getItem(key) === null) {
			localStorage.setItem(key, JSON.stringify(new Person({ firstname: "admin" })))
		}
    }

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState']
	}
    
}

// var course = document.getElementById('course')?.addEventListener('click', e => {
// 	let main = document.getElementById('main')
// 	main?.classList.add('moved')
// })
