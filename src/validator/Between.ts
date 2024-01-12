import { Validator } from "./Validator";

export class Between extends Validator {
    // Upper and lower bounds are inclusive
    lower;
    upper;

    constructor([lower, upper]) {
        super();
        this.lower = lower;
        this.upper = upper;
        this.message = `Field must be between ${lower} and ${upper}`;
    }

    public invalid(field: string, value: any): boolean {
        if (typeof this.lower !== typeof this.upper) {
            this.message = "Lower and upper bounds must be of the same type";
            return true;
        };

        return !(value >= this.lower && value <= this.upper);
    }

    public getMessage(field: string): string {
        return this.message;
    }
}