import { FormControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../services/auth.service";

export class CustomUserValidators {
  static passwordMatchValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let user = controlBind.user;

    return new Promise(resolve => {
      control.value === user.controls.password.value
        ? resolve(null)
        : resolve({
            mismatch: {
              valid: false
            }
          });
    });
  }

  static async usernameUniqueValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let authService = controlBind.authService as AuthService;

    return new Promise(resolve => {
      if (control.value == "") {
        resolve(null);
      } else {
        authService.checkUsername(control.value).subscribe(
          () => {
            resolve({
              usernameExists: {
                valid: false
              }
            });
          },
          () => {
            resolve(null);
          }
        );
      }
    });
  }
}
