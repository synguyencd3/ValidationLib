
import { Validation } from "./Validation";
import { NotNullOrEmpty } from "./Validator/NotNullOrEmptyDecorator";
import { MustMatch } from "./Validator/MustMatchDecorator";


// function CannotBeUpperCase(message?: string){
//   return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:CannotBeUpperCase", "", target, propertyKey); 
//   //return (target: Object, propertyKey: string) => Reflect.defineMetadata("CannotBeUpperCaseValidator", new  CannotBeUpperCaseValidator(message,null), target, propertyKey); 
//   //Reflect.defineMetadata("Validation", "Validate", target, propertyKey);
// }

export class Model {
    @NotNullOrEmpty()
    @MustMatch(/^[A-Za-z0-9+_.-]+@(.+)$/)
    input: string | null = null;

    @NotNullOrEmpty()
    output: any | null = null;
  }

const model = new Model();
const value = 'cd.synguyengmail.com';
model.input = value;
//model.output = 14;


 var valid = Validation.getInstance();
 const violations = valid.validate(model);
  if (violations.size==0)
  {
    console.log("valid");
  } 
  else
  {
    violations.forEach(function(violation)
    {
      console.log(violation.getMessage());
    })
  }