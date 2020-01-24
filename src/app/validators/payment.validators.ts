import { FormControl, ValidationErrors } from "@angular/forms";
import { IResponse } from "../interfaces/response.interface";
import { PaymentsService } from "../services/payments.service";

export class CustomPaymentValidators {
  static async folioUniqueValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> {
    let controlBind = this as any;
    let paymentsService = controlBind.paymentsService as PaymentsService;

    return new Promise(resolve => {
      if (control.value == "") {
        resolve(null);
      } else {
        paymentsService.checkFolio(control.value).subscribe(
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
