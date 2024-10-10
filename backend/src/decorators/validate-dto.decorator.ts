import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function ValidateDTO<T extends object>(dtoClass: new () => T) {
  return function <U>(target: U, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const dtoInstance = plainToInstance(dtoClass, req.body);
      const errors: ValidationError[] = await validate(dtoInstance);

      if (errors.length > 0) {
        const errorMessages = errors.map((err) => Object.values(err.constraints || {})).flat();
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages });
      }

      // If validation succeeds, call the original method
      return originalMethod!.apply(this, [req, res, next]);
    };
  };
}
