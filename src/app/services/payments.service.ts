import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PaymentsService {
  constructor() {}

  private payment = {
    name: "Seguridad y Control TEST",
    student: "akjsbjkadaewe4e4",
    school: "akjsbjkadaewe4e4",
    description: "Lorem ipsum dolor sit amet",
    _id: "akjsbjkadaewe4e4",
    folio: "00121AEE",
    charge: 121212.45,
    deadLine: Date.now(),
    completed: false
  };

  public findAll() {
    let res = [];
    for (let index = 0; index < 30; index++) {
      res.push(this.payment);
    }
    return res;
  }

  public findById(id: string) {
    return this.payment;
  }
}
