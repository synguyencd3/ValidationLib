import { MustMatch } from './Validator/MustMatch';
import { NotNullOrEmpty } from './Validator/NotNullOrEmpty';
import { Validator} from './Validator/Validator';

export class ValidationFactory {
    static map = new Map<String, Validator>();

    public static create(validatorName: string, param? :any): Validator
    {
        let Validator = ValidationFactory.map.get(validatorName);
        if (Validator== null)
        {
            switch (validatorName)
            {
                case "Validation:NotNullOrEmpty":
                    Validator = new NotNullOrEmpty();
                    break;
                case "Validation:MustMatch":
                    Validator = new MustMatch(param);
                    break;
                default:
                        return Validator;
            }
        }
        this.map.set(validatorName, Validator);
        return Validator;
    }
}