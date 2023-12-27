import { Validatable } from '../validatable';
import { CannotBeUpperCase } from '../validator/string/cannot/cannot.uppercase.decorator';

export class Model extends Validatable {
  @CannotBeUpperCase('Input cannot be upper case.')
  public input: string | null = null;
}

const model = new Model();
const value = 'ABC';
model.input = value;

if (model.isValid()) {
  console.info(`"${value}" is valid`);
} else {
  console.error(`"${value}" is not valid (${model.validate().get(0).message})`);
}
