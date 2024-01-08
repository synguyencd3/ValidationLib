import { Validator } from "./Validator";



export class NotNullOrEmpty extends Validator
{
    constructor()
    {
        super();
        this.message="Field must not be null or empty";
    }
    public invalid(field: string, value: any): boolean {
        return (value=="" || value==null);
    }
    public getMessage(field: string): string {
        return this.message;
    }

}