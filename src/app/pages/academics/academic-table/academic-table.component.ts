import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  EventEmitter,
  Output
} from "@angular/core";
import { AcademicsService } from "../../../services/academics.service";

@Component({
  selector: "app-academic-table",
  templateUrl: "./academic-table.component.html",
  styleUrls: ["./academic-table.component.scss"]
})
export class AcademicTableComponent implements OnInit {
  @Input("academics") academics;
  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  constructor() {}
  public handleReload() {
    this.reload.emit(true);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
