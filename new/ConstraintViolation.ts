export interface ConstraintViolation 
{
    getMessage(): string;
    setMessage(message: string);
    getValue(): any;
    setValue(value: any);
    getProperty(): string;
    setProperty(property: string);
    invalid(): boolean;
    setValid(valid: boolean);
}