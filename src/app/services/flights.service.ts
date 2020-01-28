import { Injectable } from "@angular/core";
import { server } from "./config";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { IFlight } from "../interfaces/flight.interface";

@Injectable({
  providedIn: "root"
})
export class FlightsService {
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
    let configUrl = `${server.SERVER_URL}flights/school/${this.schoolId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findAllInStudent(studentId: string) {
    let configUrl = `${server.SERVER_URL}flights/student/${studentId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public findById(flightId: string) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public createOne(flight: IFlight) {
    flight.school = this.schoolId;
    let configUrl = `${server.SERVER_URL}flights`;
    return this.http.post(configUrl, flight, { headers: this.headers });
  }

  public checkFolio(folio: string) {
    let configUrl = `${server.SERVER_URL}flights/folio/${folio}`;
    return this.http.get(configUrl, { headers: this.headers });
  }

  public updateOne(flightId: string, flight: IFlight) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}`;
    return this.http.put(configUrl, flight, {
      headers: this.headers
    });
  }

  public addRecruit(flightId: string, studentId: string) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}/recruit/${studentId}`;
    return this.http.put(configUrl, null, {
      headers: this.headers
    });
  }

  public addPilot(flightId: string, studentId: string) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}/pilot/${studentId}`;
    return this.http.put(configUrl, null, {
      headers: this.headers
    });
  }

  public removeStudent(flightId: string, studentId: string) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}/student/${studentId}`;
    return this.http.delete(configUrl, {
      headers: this.headers
    });
  }

  public deleteOne(flightId: string) {
    let configUrl = `${server.SERVER_URL}flights/${flightId}`;
    return this.http.delete(configUrl, { headers: this.headers });
  }
}
