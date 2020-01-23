import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "app-subject-table",
  templateUrl: "./subject-table.component.html",
  styleUrls: ["./subject-table.component.scss"]
})
export class SubjectTableComponent implements OnInit {
  @Input("subjects") subjects = [];
  @Input("mode") mode;
  @Input("academicId") academicId = "";

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  ngOnInit(): void {}
}
