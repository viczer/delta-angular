import { Component, OnInit, Input } from "@angular/core";
import { SubjectsService } from "../../../../services/subjects.service";
import { IResponse } from "../../../../interfaces/response.interface";

@Component({
  selector: "app-grade-item",
  templateUrl: "./grade-item.component.html",
  styleUrls: ["./grade-item.component.scss"]
})
export class GradeItemComponent implements OnInit {
  @Input("grade") grade;
  @Input("mode") mode;

  public subjects = [];

  constructor(private subjectsService: SubjectsService) {
    this.subjectsService.findAll().subscribe((response: IResponse) => {
      this.subjects = response.data;
    });
  }

  public getSubject(id: string) {
    return this.subjectsService.findById(id);
  }

  ngOnInit() {
    console.log(this.grade);
  }
}
