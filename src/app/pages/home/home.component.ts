import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ISchool } from "../../interfaces/school.interface";
import { SchoolService } from "../../services/schools.service";
import { IResponse } from "../../interfaces/response.interface";
import { StudentService } from "src/app/services/student.service";
import { GroupService } from "src/app/services/group.service";
import * as Chart from "chart.js";
import * as _ from "lodash";
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

  constructor(
    private schoolService: SchoolService,
    private studentService: StudentService,
    private groupService: GroupService
  ) {
    this.schoolService.findOne().subscribe((response: IResponse) => {
      this.school = response.data;
    });
  }

  public getData(data: { labels?: string[]; data?: number[] }) {
    return {
      labels: data.labels,
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
          data: data.data
        }
      ]
    };
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.studentService.findAll().subscribe((response: IResponse) => {
      const gendersGroup = _.groupBy(response.data, "gender");
      const originGroup = _.groupBy(response.data, "address.state");

      let genderData = [];

      for (const key in gendersGroup) {
        genderData.push(gendersGroup[key].length);
      }
      new Chart(this.genderChart.nativeElement, {
        type: "doughnut",
        data: this.getData({
          labels: Object.keys(gendersGroup),
          data: genderData
        }),
        options: {
          cutoutPercentage: 60,
          legend: {
            align: "start",
            position: "left"
          }
        }
      });

      let origenData = [];

      for (const key in originGroup) {
        origenData.push(originGroup[key].length);
      }

      new Chart(this.originChart.nativeElement, {
        type: "doughnut",
        data: this.getData({
          labels: Object.keys(originGroup),
          data: origenData
        }),
        options: {
          cutoutPercentage: 50,
          legend: {
            align: "start",
            position: "left"
          }
        }
      });
    });

    this.groupService.findAll().subscribe((response: IResponse) => {
      const nameGroup = _.groupBy(response.data, "name");
      let data = [];

      for (const group of response.data) {
        data.push(group.members.length);
      }

      new Chart(this.groupChart.nativeElement, {
        type: "bar",
        data: this.getData({
          labels: Object.keys(nameGroup),
          data
        }),
        options: {
          legend: { display: false },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  }
}
