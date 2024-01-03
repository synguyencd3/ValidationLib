import { ConstraintViolation } from "./ConstraintViolation";
import { ValidationFactory } from "./ValidationFactory";

export class validation 
{


    public validate(target: object): string[]
    {
        const set = new Set<ConstraintViolation>();
        const fields: any[] = Object.getOwnPropertyNames(target);
        for (let field of fields)
        {
            this.validateField(target, field);
        }
        return null;   
    }

    public validateField(target: object, field: string): string[]
    {
        const annotations: any[] = Reflect.getMetadataKeys(target, field).filter(key => key.toString().startsWith("Validation"));
        const params: any[] = annotations.filter(key => key.toString())
                                         .reduce((values, key) => {
            const currValues = Reflect.getMetadata(key, target, field);
            return values.concat(currValues);
        }, []);

        for (let i=0;i<annotations.length;i++)
        {
            const validator = ValidationFactory.create(annotations[i],params[i]);
            const contrains = validator.validate();
        }
        return null;
    }   
}