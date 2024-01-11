import { Validator } from "./Validator";



export class MustMatch extends Validator
{
    regex: RegExp;
    constructor(regex: RegExp)
    {
        super();
        this.regex=regex;
        this.message="Field doesn't match regex";
    }

    protected invalid(field: string, value: any): boolean {
        return !this.regex.test(value);
    }
    protected getMessage(field: string): string {
        return this.message
    }
    
}