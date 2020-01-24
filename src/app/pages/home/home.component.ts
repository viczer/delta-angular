import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ISchool } from "../../interfaces/school.interface";
import * as Chart from "chart.js";
import { SchoolService } from "../../services/schools.service";
import { IResponse } from "../../interfaces/response.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { StudentService } from "src/app/services/student.service";
import { GroupService } from "src/app/services/group.service";
import { IGroup } from "src/app/interfaces/group.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("originChart", { static: false })
  originChart: ElementRef;
  @ViewChild("genderChart", { static: false })
  genderChart: ElementRef;
  @ViewChild("groupChart", { static: false })
  groupChart: ElementRef;

  public school: ISchool = {};
  public students: [{ labels?: string[]; data?: number[] }?] = [];
  public groups: [{ labels?: string[]; data?: number[] }?] = [];

  constructor(
    private schoolService: SchoolService,
    private studentService: StudentService,
    private groupService: GroupService
  ) {
    this.schoolService.findOne().subscribe((response: IResponse) => {
      this.school = response.data;
    });
    this.studentService.findAll().subscribe((response: IResponse) => {
      this.students = response.data;
    });
    this.groupService.findAll().subscribe((response: IResponse) => {
      this.groups = response.data;
    });
  }
  public getOriginStudentStats() {}
  public getGenderStudentStats() {}

  public getGroupStats() {
    return {
      labels: [
        "Africa",
        "Asia",
        "Europe",
        "Latin America",
        "North America",
        "Others"
      ],
      datasets: [
        {
          backgroundColor: [
            "#0F4C81",
            "#C0D1DA",
            "#3E6383",
            "#A13525",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          borderWidth: 5,
          data: [2478, 5267, 734, 784, 433, 442]
        }
      ]
    };
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    new Chart(this.originChart.nativeElement, {
      type: "doughnut",
      data: this.getGroupStats(),
      options: {
        cutoutPercentage: 70
      }
    });
    new Chart(this.genderChart.nativeElement, {
      type: "doughnut",
      data: this.getGroupStats(),
      options: {
        cutoutPercentage: 70
      }
    });
    new Chart(this.groupChart.nativeElement, {
      type: "bar",
      data: this.getGroupStats(),
      options: {
        legend: { display: false }
      }
    });
  }
}
