export interface User {
	name: string;
	email: string;
	age: number;
	phone: `${string}-${string}-${string}`;
}

export class LookupData {
	static users = () => {
		return [
			
		]
	}
}