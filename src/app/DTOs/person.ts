export class Person {
	id: number
	firstname: string
	lastname: string
	dateOfBirth: string
	address: string
	city: string
	email: string
	phoneNumber: string
	constructor({
		id,
		firstname,
		lastname,
		dateOfBirth,
		address,
		city,
		email,
		phoneNumber
	}: Partial<Person> = {}) {
		this.id = id ?? 0;
		this.firstname = firstname ?? '';
		this.lastname = lastname ?? '';
		this.dateOfBirth = dateOfBirth ?? '';
		this.address = address ?? '';
		this.city = city ?? '';
		this.email = email ?? '';
		this.phoneNumber = phoneNumber ?? '';
	}
}
