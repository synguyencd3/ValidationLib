import { ConstraintViolation } from "./ConstraintViolation";

export class ConstraintViolationImpl implements ConstraintViolation
{
    private message: string;
    private value: any;
    private property: string;
    private valid = true;

    constructor()
    {

    }
   
    getMessage(): string {
        return this.message;
    }
    setMessage(message: string) {
        this.message=message;
    }
    getValue(): any {
        return this.value;
    }
    setValue(value: any) {
        this.value=value;
    }
    getProperty(): string {
        return this.property;
    }
    setProperty(property: string) {
        this.property=property;
    }
    invalid(): boolean {
       return !this.valid;
    }
    setValid(valid: boolean) {
        this.valid=valid;
    }
    
}