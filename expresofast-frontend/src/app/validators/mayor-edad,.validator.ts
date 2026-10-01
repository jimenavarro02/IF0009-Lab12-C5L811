import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mayorDeEdadValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const edad = control.value;
    if (edad !== null && edad !== undefined && edad < 18) {
      return { menorDeEdad: true };
    }
    return null;
  };
}