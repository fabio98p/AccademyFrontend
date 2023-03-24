import { Person } from 'src/app/DTOs/person'
export class Instructor extends Person {
	isContractor: boolean;
	payRate: number;
    constructor(id?: number,
		firstname?: string,
		lastname?: string,
		dateOfBirth?: string,
		address?: string,
		city?: string,
		email?: string,
		phoneNumber?: string,
        isContractor?:boolean,
        payRate?:number){
        super();
        this.isContractor = isContractor ?? false
        this.payRate = payRate ?? 0
    }
}
