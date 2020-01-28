import { Component, OnInit } from "@angular/core";
import { IFlight } from "src/app/interfaces/flight.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "src/app/services/student.service";
import { FlightsService } from "src/app/services/flights.service";
import { IResponse } from "src/app/interfaces/response.interface";

@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.scss"]
})
export class FlightComponent {
  public flight: IFlight = {};
  public flightRecruits: IUser[] = [];
  public flightPilots: IUser[] = [];
  public students: IUser[] = [];
  public id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private flightsService: FlightsService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];

      this.studentService.findAll().subscribe((response: IResponse) => {
        this.students = response.data;
      });

      this.flightsService.findAll().subscribe((response: IResponse) => {
        this.flightRecruits = response.data[0].enlisted;
        this.flightPilots = response.data[0].approved;
      });

      this.flightsService.findById(this.id).subscribe((response: IResponse) => {
        this.flight = response.data;
      });
    });
  }
  handleReload() {
    setTimeout(() => {
      this.studentService.findAll().subscribe((response: IResponse) => {
        this.students = response.data;
      });

      this.flightsService.findAll().subscribe((response: IResponse) => {
        this.flightRecruits = response.data[0].enlisted;
        this.flightPilots = response.data[0].approved;
      });

      this.flightsService.findById(this.id).subscribe((response: IResponse) => {
        this.flight = response.data;
      });
    }, 300);
  }
}
