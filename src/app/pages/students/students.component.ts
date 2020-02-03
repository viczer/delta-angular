import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { IResponse } from "../../interfaces/response.interface";
import { IUser } from "src/app/interfaces/user.interface";

import * as _ from "lodash";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"]
})
export class StudentsComponent implements OnInit {
  public students;
  public graduates;
  public filter: string = "name";

  public stockStudents: IUser[] = [];
  public stockGraduates: IUser[] = [];

  constructor(private studentService: StudentService) {
    setTimeout(() => {
      studentService.findAll(false).subscribe((response: IResponse) => {
        this.stockStudents = response.data;
        this.students = this.stockStudents;
      });
      studentService.findAll(true).subscribe((response: IResponse) => {
        this.stockGraduates = response.data;
        this.graduates = this.stockGraduates;
      });
    }, 100);
  }

  handleFilter(e) {
    this.filter = e;
  }

  handleSearch(e) {
    let name: string = e.target.value;
    let a: string;
    let b = new RegExp(name.toLowerCase());
    this.students = _.filter(this.stockStudents, obj => {
      switch (this.filter) {
        case "name":
          a = obj.name.toLowerCase();
          a = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          break;
        case "group":
          a = obj.group ? (obj.group as any).name.toLowerCase() : null;
          break;
        case "enrollmentId":
          a = obj.enrollmentId ? obj.enrollmentId.toLowerCase() : null;
          break;
        case "phone":
          a = obj.phone ? obj.phone.replace(/[() -]/g, "") : null;
          break;
        case "payments":
          a = obj.payments ? obj.payments.length.toString() : null;
          break;
      }
      return a ? a.search(b) >= 0 : null;
    });
  }

  ngOnInit() {}
}
