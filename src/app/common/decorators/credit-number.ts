import {
    registerDecorator, 
    ValidationArguments, 
    ValidationOptions, 
    ValidatorConstraint, 
    ValidatorConstraintInterface
} from 'class-validator';

export const PersianLatinNumber = (validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: ValidNumber,
        });
    };
}

@ValidatorConstraint({name: 'Number'})
export class ValidNumber implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return /^[\u06F0-\u06F90-9]+$/.test(value);
    }
}