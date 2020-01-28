import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StudentService } from "../../../services/student.service";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.scss"]
})
export class StudentsTableComponent implements OnInit {
  @Input("students") students;
  @Input("mode") mode;
  @Input("groupId") groupId = "";
  @Input("flightId") flightId = "";

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);
  handleReload() {
    this.reload.emit(true);
  }
  ngOnInit() {}
}
