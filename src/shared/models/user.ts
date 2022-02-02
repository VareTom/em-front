export class User {
    firstName: string;
    lastName: string;
    email: string;
    
    constructor(json: any) {
        this.firstName = json.first_name;
        this.lastName = json.last_name;
        this.email = json.email;
    }
}