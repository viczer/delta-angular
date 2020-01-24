import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";
import { ISubject } from "../interfaces/subject.iterface";
import { IPayment } from "../interfaces/payment.interface";
import { IProgram } from "../interfaces/program.interface";

@Injectable({
  providedIn: "root"
})
export class PaymentsService {
  private headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: ""
  };

  private schoolId;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticated$.subscribe(status => {
      this.headers.Authorization = `bearer ${status.access_token}`;
      this.schoolId = status.schools[0];
    });
  }

  public findAll() {
    let configUrl = `${server.SERVER_URL}payments/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findAllInStudent(studentId: string) {
    let configUrl = `${server.SERVER_URL}payments/student/${studentId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(paymentId: string) {
    let configUrl = `${server.SERVER_URL}payments/${paymentId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(payment: IPayment) {
    payment.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}payments`;
    return this.http.post(configUrl, payment, { headers: this.headers });
  }

  public checkFolio(folio: string) {
    let configUrl = `${server.SERVER_URL}payments/folio/${folio}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public updateOne(id: string, payment: IPayment) {
    let configUrl = `${server.SERVER_URL}payments/${id}`;
    return this.http.put(configUrl, payment, {
      headers: this.headers
    });
  }

  public deleteOne(subjectId: string) {
    let configUrl = `${server.SERVER_URL}payments/${subjectId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}
