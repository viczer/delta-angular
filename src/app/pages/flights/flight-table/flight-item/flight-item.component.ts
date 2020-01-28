import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  Input,
  EventEmitter
} from "@angular/core";
import { IResponse } from "src/app/interfaces/response.interface";
import { Router } from "@angular/router";
import { AcademicsService } from "src/app/services/academics.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-flight-item",
  templateUrl: "./flight-item.component.html",
  styleUrls: ["./flight-item.component.scss"]
})
export class FlightItemComponent implements OnInit {
  @Input("flight") flight;
  @Input("mode") mode;

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  public editEnabled = false;
  public deleteEnabled = false;

  public isAdded = false;
  public isAdding = false;
  public isRemoving = false;

  constructor(
    private router: Router,
    private academicsService: AcademicsService,
    private authService: AuthService
  ) {}

  public enableModsHandler(isEdit) {
    this.editEnabled = false;
    this.deleteEnabled = false;

    isEdit ? (this.editEnabled = true) : (this.deleteEnabled = true);
  }

  deleteHandler(id) {
    this.reload.emit(true);
  }

  navigate(id, isEdit = false) {
    isEdit
      ? this.router.navigate(["vuelos/editar", id])
      : this.router.navigate(["vuelos", id]);
  }

  ngOnInit() {}
}
