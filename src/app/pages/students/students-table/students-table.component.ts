import { Component, OnInit, Input } from "@angular/core";
import { StudentService } from "../../../services/student.service";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.scss"]
})
export class StudentsTableComponent implements OnInit {
  @Input("students") students;
  @Input("mode") mode;
  ngOnInit() {}
}
