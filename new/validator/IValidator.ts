import { ConstraintViolation } from "../ConstraintViolation";

export abstract class IValidator {
    abstract validate(): ConstraintViolation
}