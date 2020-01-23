import { FormControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { SubjectsService } from "../services/subjects.service";
import { IResponse } from "../interfaces/response.interface";

export class CustomSubjectValidators {
  static async folioUniqueValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let subjectsService = controlBind.subjectsService as SubjectsService;

    return new Promise(resolve => {
      if (control.value == "") {
        resolve(null);
      } else {
        subjectsService.checkFolio(control.value).subscribe(
          (response: IResponse) => {
            resolve({
              folioExists: {
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
