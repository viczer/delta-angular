import { Component, OnInit } from "@angular/core";
import { PaymentsService } from "../../../services/payments.service";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../../../services/student.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  public payments = [];
  public student;

  constructor(
    private paymentsService: PaymentsService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.student = this.studentService.findById(params["id"]);
    });
    this.payments = paymentsService.findAll();
  }

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {}
}
