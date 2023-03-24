import { Component, OnInit } from '@angular/core'
import { Person } from 'src/app/DTOs/person'
import { StudentsService } from 'src/app/services/students.service'
import { Observable } from 'rxjs'
import { Student } from 'src/app/DTOs/student'
@Component({
	selector: 'app-dropdown-search',
	templateUrl: './dropdown-search.component.html',
	styleUrls: ['./dropdown-search.component.css']
})
export class DropdownSearchComponent implements OnInit {
    public personLogged: Person
    public allPeople: Student[] | undefined
	constructor(private studentsService: StudentsService) {
        this.personLogged = this.getPersonLogged()
        this.studentsService.getStudents().subscribe((students: Student[]) => {
            this.allPeople = students;
        });
        // this.allPeople = studentsService.getStudents()
    }

	ngOnInit(): void {

        console.log(this.personLogged);
        
	}
    getPersonLogged(){
        const key = "personLogged"
        const json = localStorage.getItem(key);
        if (json) {
            const obj = JSON.parse(json);
            return new Person({ id:obj.id, firstname: obj.firstname, lastname:obj.lastname, dateOfBirth:obj.dateOfBirth, address:obj.address, city:obj.city, email:obj.email, phoneNumber:obj.phoneNumber});
        }
        return new Person({ firstname: "errore"});
    }
}