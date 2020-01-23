import { FormControl, ValidationErrors } from "@angular/forms";
import { IResponse } from "../interfaces/response.interface";
import { AcademicsService } from "../services/academics.service";

export class CustomProgramValidators {
  static async folioUniqueValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let academicsService = controlBind.academicsService as AcademicsService;

    return new Promise(resolve => {
      if (control.value == "") {
        resolve(null);
      } else {
        academicsService.checkFolio(control.value).subscribe(
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
