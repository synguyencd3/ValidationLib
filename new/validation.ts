import { ConstraintViolation } from "./ConstraintViolation";
import { ValidationFactory } from "./ValidationFactory";

export class validation 
{

    public validate(target: object): Set<ConstraintViolation>
    {
        const set = new Set<ConstraintViolation>();
        const fields: any[] = Object.getOwnPropertyNames(target);
        for (let field of fields)
        {
            const result = this.validateField(target, field);
            if (result != null)
                set.add(this.validateField(target, field));
        }
        return set;   
    }

    public validateField(target: object, field: string): ConstraintViolation
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
            const constraint = validator.validate(target, field);
            if (constraint.invalid())
            {
               return constraint;
            }
        }
        return null;
    }   
}