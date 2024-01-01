import "reflect-metadata";

function NotNullOrEmpty(){
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("NotNullOrEmpty", "", target, propertyKey); 
  //Reflect.defineMetadata("Validation", "Validate", target, propertyKey);
}

function MustMatch(regex: RegExp)
{
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("MustMatch", regex, target, propertyKey); 
   //return Reflect.metadata("Format", regex);
}
function format(formatString: string) {
  return (target: Object, propertyKey: string) => Reflect.defineMetadata("Format", formatString, target, propertyKey); 
  //return Reflect.metadata("Format", formatString);
}
export class Model {
    @NotNullOrEmpty()
    @MustMatch(/^[\w ]+$"/)
    @format("Hello, %s")
    input: string | null = null;
  }

const model = new Model();
const value = 'ABC';
model.input = value;

function getDecorators(target: any, propertyName: string | symbol): string[] {
    // get info about keys that used in current property
    const keys: any[] = Reflect.getMetadataKeys(target, propertyName);
    const decorators = keys
      // filter your custom decorators
      .filter(key => key.toString())
      .reduce((values, key) => {
        // get metadata value.
        const currValues = Reflect.getMetadata(key, target, propertyName);
        return values.concat(currValues);
      }, []);
  
    return decorators;
  }

  var decorators = getDecorators(model, "input");
  console.log(decorators);