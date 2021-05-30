import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ExpenseValidators {
    static currencyValue(control: AbstractControl): ValidationErrors | null {
        return /^[0-9]\d{0,7}(((,\d{3}){1})?(\.\d{0,2})?)$/.test(control.value) ? null : { notCurrencyValue: true };
    }
}