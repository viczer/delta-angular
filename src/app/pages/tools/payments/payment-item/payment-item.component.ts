import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { PaymentsService } from "src/app/services/payments.service";
import { CustomPaymentValidators } from "src/app/validators/payment.validators";
import { IPayment } from "src/app/interfaces/payment.interface";

@Component({
  selector: "app-payment-item",
  templateUrl: "./payment-item.component.html",
  styleUrls: ["./payment-item.component.scss"]
})
export class PaymentItemComponent implements OnInit {
  @Input("payment") paymentInput: any = {};
  @Input("mode") mode = "";
  @Input("studentId") studentId = "";

  public isPayed = false;
  public isPaying = false;
  public deleteEnabled = false;

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(true);
  public payment: FormGroup;
  constructor(
    private toastrService: NbToastrService,
    private paymentsService: PaymentsService
  ) {}

  public handleCreate() {
    if (this.payment.valid && this.studentId != "") {
      let payment: IPayment = {
        ...this.payment.value,
        ...{ student: this.studentId }
      };

      payment.deadLine = new Date(payment.deadLine).valueOf();

      this.paymentsService.createOne(payment).subscribe(() => {
        this.payment.reset();
        this.reload.emit(true);
        this.toastrService.show("Exito al generar pago", "Pago Asignado", {
          status: "primary",
          hasIcon: true,
          destroyByClick: true,
          icon: "credit-card-outline"
        });
      });
    }
  }

  public enableModsHandler() {
    this.deleteEnabled = true;
  }

  public handleDelete() {
    if (this.paymentInput) {
      this.paymentsService.deleteOne(this.paymentInput._id).subscribe(() => {
        this.reload.emit(true);
        this.toastrService.show("Exito al eliminar pago", "Pago Eliminado", {
          status: "primary",
          hasIcon: true,
          destroyByClick: true,
          icon: "credit-card-outline"
        });
      });
    }
  }

  public handlePay() {
    if (this.paymentInput && !this.isPayed) {
      this.isPaying = true;

      this.paymentInput.completed = true;

      this.paymentsService
        .updateOne(this.paymentInput._id, this.paymentInput)
        .subscribe(() => {
          this.toastrService.show(
            "Exito al completar pago",
            "Pago Registrado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "credit-card-outline"
            }
          );
          this.isPayed = true;
        });
    }
  }

  ngOnInit() {
    this.payment = new FormGroup({
      folio: new FormControl("", {
        updateOn: "blur",
        validators: Validators.required,
        asyncValidators: CustomPaymentValidators.folioUniqueValidator.bind(this)
      }),
      name: new FormControl("", Validators.required),
      charge: new FormControl("", Validators.required),
      deadLine: new FormControl("", Validators.required)
    });
  }
}
