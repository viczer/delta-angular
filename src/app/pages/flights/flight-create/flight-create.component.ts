import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IFlight } from "src/app/interfaces/flight.interface";
import { NbToastrService } from "@nebular/theme";
import { FlightsService } from "src/app/services/flights.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IResponse } from "src/app/interfaces/response.interface";
import { CustomFlightValidators } from "src/app/validators/flight.validators";

@Component({
  selector: "app-flight-create",
  templateUrl: "./flight-create.component.html",
  styleUrls: ["./flight-create.component.scss"]
})
export class FlightCreateComponent implements OnInit {
  @Output("back") back = new EventEmitter();

  public linear = true;
  public informationForm: FormGroup;
  public descriptionForm: FormGroup;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private flightsService: FlightsService,
    private toastrService: NbToastrService
  ) {}

  public cancelFlight() {
    this.back.emit();
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public saveFlight() {
    console.log(this.informationForm.valid);
    console.log(this.descriptionForm.valid);

    if (this.informationForm.valid && this.descriptionForm.valid) {
      let flight: IFlight = {
        folio: this.informationForm.value.folio,
        name: this.informationForm.value.name,
        startDate: new Date(this.informationForm.value.startDate).valueOf(),
        duration: this.informationForm.value.duration,
        cost: this.informationForm.value.cost,
        description: this.descriptionForm.value.description
      };

      this.flightsService.createOne(flight).subscribe(
        (response: IResponse) => {
          this.toastrService.show(
            "Exito al guardar el vuelo",
            "Vuelo Guardado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "paper-plane-outline"
            }
          );
          this.back.emit();
        },
        e => {
          console.log(e);
        }
      );
    }
  }

  ngOnInit() {
    this.informationForm = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        folio: new FormControl(
          "",
          Validators.required,
          CustomFlightValidators.folioUniqueValidator.bind(this)
        ),
        startDate: new FormControl("", Validators.required),
        duration: new FormControl("", Validators.required),
        cost: new FormControl("", Validators.required)
      },
      { updateOn: "blur" }
    );

    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required)
    });
  }
}
