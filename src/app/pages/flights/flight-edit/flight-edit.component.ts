import { Component, OnInit } from "@angular/core";
import { IFlight } from "src/app/interfaces/flight.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "src/app/services/student.service";
import { FlightsService } from "src/app/services/flights.service";
import { IResponse } from "src/app/interfaces/response.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-flight-edit",
  templateUrl: "./flight-edit.component.html",
  styleUrls: ["./flight-edit.component.scss"]
})
export class FlightEditComponent implements OnInit {
  public flight: FormGroup;
  public flightRecruits: IUser[] = [];
  public flightPilots: IUser[] = [];
  public students: IUser[] = [];
  public id: string;

  public flightInput: IFlight = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private flightsService: FlightsService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}
  public handleUpdate() {
    if (this.flight.valid) {
      let flight = this.flight.value;
      flight.startDate = new Date(flight.startDate).valueOf();
      this.flightsService
        .updateOne(this.id, this.flight.value)
        .subscribe((response: IResponse) => {});
      this.toastrService.show("Exito al guardar el Vuelo", "Vuelo Guardado", {
        status: "primary",
        hasIcon: true,
        destroyByClick: true,
        icon: "paper-plane-outline"
      });
      this.router.navigate(["vuelos"]);
    }
  }

  public handleDelete() {
    this.flightsService.deleteOne(this.id).subscribe();
    this.router.navigate(["vuelos"]);
  }

  public navigate(route) {
    this.router.navigate([route]);
  }

  public handleReload() {
    setTimeout(() => {
      this.studentService.findAll().subscribe((response: IResponse) => {
        this.students = response.data;
      });

      this.flightsService.findAll().subscribe((response: IResponse) => {
        this.flightRecruits = response.data[0].enlisted;
        this.flightPilots = response.data[0].approved;
      });

      this.flightsService.findById(this.id).subscribe((response: IResponse) => {
        this.flightInput = response.data;
      });
    }, 300);
  }
  ngOnInit(): void {
    this.flight = new FormGroup({
      name: new FormControl("", Validators.required),
      folio: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      cost: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
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
        response.data.startDate = new Date(response.data.startDate);
        this.flightInput = response.data;

        this.flight.patchValue(this.flightInput);
      });
    });
  }
}
