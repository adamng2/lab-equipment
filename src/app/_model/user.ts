export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    expiresAt?: string;
    token?: string;

    constructor( result: any ){
        this.token = result.data.token;
        this.email = result.data.user.email || '';
        this.firstName = result.data.user.first_name || '';
        this.lastName = result.data.user.last_name || '';
    }

}