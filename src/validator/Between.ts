import { Validator } from "./Validator";

export class Between extends Validator {
    // Upper and lower bounds are inclusive
    lower: number;
    upper: number;

    constructor([lower, upper]: [number, number]) {
        console.log(lower, upper);
        super();
        this.lower = lower;
        this.upper = upper;
        this.message = `Field must be between ${lower} and ${upper}`;
    }

    public invalid(field: string, value: any): boolean {
        return value < this.lower || value > this.upper;
    }

    public getMessage(field: string): string {
        return this.message;
    }
}