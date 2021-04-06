import { FormControl } from "@angular/forms";
export class Utils {
    static getError(fc: FormControl) {
        if (fc.hasError('required')) {
          return 'This field is required';
        }

        else if (fc.hasError('minlength')) {
          return 'Too short passord';
        }

        return fc.hasError('email') ? 'Not a valid email' : '';
    }
}
