import { Person } from 'src/app/DTOs/person'
export class Student extends Person {
	isEmployee: boolean;
    constructor(id?: number,
		firstname?: string,
		lastname?: string,
		dateOfBirth?: string,
		address?: string,
		city?: string,
		email?: string,
		phoneNumber?: string,
        isEmployee?:boolean){
        super();
        this.isEmployee = isEmployee ?? false
    }
}
