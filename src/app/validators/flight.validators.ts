import { FormControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { SubjectsService } from "../services/subjects.service";
import { IResponse } from "../interfaces/response.interface";
import { FlightsService } from "../services/flights.service";

export class CustomFlightValidators {
  static async folioUniqueValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let flightsService = controlBind.flightsService as FlightsService;

    return new Promise(resolve => {
      if (control.value == "") {
        resolve(null);
      } else {
        flightsService.checkFolio(control.value).subscribe(
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
