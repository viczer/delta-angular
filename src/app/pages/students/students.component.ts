import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { IResponse } from "../../interfaces/response.interface";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"]
})
export class StudentsComponent implements OnInit {
  public students;
  public graduates;
  constructor(private studentService: StudentService) {
    studentService.findAll().subscribe((response: IResponse) => {
      this.students = response.data;
      console.log(this.students);
    });
    studentService.findAll(true).subscribe((response: IResponse) => {
      this.graduates = response.data;
    });
  }

  ngOnInit() {}
}
