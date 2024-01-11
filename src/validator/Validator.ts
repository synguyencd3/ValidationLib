import { ConstraintViolation } from "../ConstraintViolation";
import { ConstraintViolationImpl } from "../ConstraintViolationImpl";

export abstract class Validator {

    protected message: string = "Default message";

    public validate(target: object, field: string): ConstraintViolation
    {
        const value = target[field];

        const constraint = this.createConstraintViolation(field, value)

        if (this.invalid(field, value))
        {
            constraint.setMessage(this.getMessage(field));
            constraint.setValid(false);
        }
        return constraint;
    }

    private createConstraintViolation(property: string, value: any): ConstraintViolation {
        const constraint = new ConstraintViolationImpl();

        constraint.setProperty(property);
        constraint.setValue(value);

        return constraint;
    }


    protected abstract invalid(field: string, value: any): boolean
    protected abstract getMessage(field: string): string;
}   