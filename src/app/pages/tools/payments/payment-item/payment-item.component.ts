import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-payment-item",
  templateUrl: "./payment-item.component.html",
  styleUrls: ["./payment-item.component.scss"]
})
export class PaymentItemComponent implements OnInit {
  @Input("payment") payment;
  @Input("mode") mode;

  constructor() {}

  ngOnInit() {}
}
