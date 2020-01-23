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
  public school: ISchool = {};
  constructor(private schoolService: SchoolService) {
    this.schoolService.findOne().subscribe((response: IResponse) => {
      console.log(response);

      this.school = response.data;
    });
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    new Chart(this.originChart.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Aguascalientes", "Otros"],
        datasets: [
          {
            label: "# of Votes",
            data: [33, 19],
            backgroundColor: ["#23344580", "#8F9BB380"],
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: 2
          }
        ]
      },
      options: {}
    });
    new Chart(this.genderChart.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Masculino", "Femenino", "Otros"],
        datasets: [
          {
            label: "# of Votes",
            data: [33, 19, 2],
            backgroundColor: ["#23344580", "#8F9BB380", "#3366FF80"],
            borderColor: ["#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 2
          }
        ]
      },
      options: {}
    });
  }
}
