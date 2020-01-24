import { Component, OnInit } from "@angular/core";
import { PaymentsService } from "../../../services/payments.service";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";
import { IResponse } from "src/app/interfaces/response.interface";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  public payments = [];
  public id: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private paymentsService: PaymentsService,
    private toastrService: NbToastrService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      setTimeout(() => {
        this.paymentsService
          .findAllInStudent(this.id)
          .subscribe((response: IResponse) => {
            this.payments = response.data;
          });
      }, 300);
    });
  }

  public handleReload() {
    setTimeout(() => {
      this.paymentsService
        .findAllInStudent(this.id)
        .subscribe((response: IResponse) => {
          this.payments = response.data;
        });
    }, 300);
  }

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {}
}
