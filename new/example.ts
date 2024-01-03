import "reflect-metadata";
//import { CannotBeUpperCaseValidator } from "./cannot.uppercase.validator";
import { validation } from "./validation";

function NotNullOrEmpty(){
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:NotNullOrEmpty", "", target, propertyKey); 
  //Reflect.defineMetadata("Validation", "Validate", target, propertyKey);
}

// function MustMatch(regex: RegExp)
// {
//   return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:MustMatch", regex, target, propertyKey); 
//    //return Reflect.metadata("Format", regex);
// }
// function format(formatString: string) {
//   return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:Format", formatString, target, propertyKey); 
//   //return Reflect.metadata("Format", formatString);
// }

function CannotBeUpperCase(message?: string){
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("Validation:CannotBeUpperCase", "", target, propertyKey); 
  //return (target: Object, propertyKey: string) => Reflect.defineMetadata("CannotBeUpperCaseValidator", new  CannotBeUpperCaseValidator(message,null), target, propertyKey); 
  //Reflect.defineMetadata("Validation", "Validate", target, propertyKey);
}

export class Model {
    @NotNullOrEmpty()
    input: string | null = null;

    @NotNullOrEmpty()
    output: any;
  }

const model = new Model();
const value = 'ABC';
model.input = value;
model.output = 1;

function getDecorators(target: any, propertyName: string | symbol): string[] {
    // get info about keys that used in current property
    const keys: any[] = Reflect.getMetadataKeys(target, propertyName).filter(key => key.toString().startsWith("Validation"));
    const decorators = keys
      // filter your custom decorators
      .filter(key => key.toString())
      .reduce((values, key) => {
        // get metadata value.
        const currValues = Reflect.getMetadata(key, target, propertyName);
        return values.concat(currValues);
      }, []);
  
    return [decorators, keys];
  }

  function ValidFactory(target: object)
  {
    let [decorators, key] = getDecorators(model,"input");
    for (let i: number = 0;i<decorators.length;i++)
    {
      if (key[i]=="Validation:CannotBeUpperCase")
      {
      //var validate = new CannotBeUpperCaseValidator(null,null);
      //validate.isValid(target);
      }
    }
  }

 
  //ValidFactory(model);
 // var decorators = getDecorators(model, "input");
 // console.log(decorators);
 var valid = new validation;
 valid.validate(model);