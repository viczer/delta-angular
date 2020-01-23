import { Component, OnInit } from "@angular/core";
import { SubjectsService } from "../../../services/subjects.service";
import { AcademicsService } from "../../../services/academics.service";
import { ActivatedRoute } from "@angular/router";
import { IResponse } from "src/app/interfaces/response.interface";
import { IProgram } from "src/app/interfaces/program.interface";
import { ISubject } from "src/app/interfaces/subject.iterface";

@Component({
  selector: "app-academic",
  templateUrl: "./academic.component.html",
  styleUrls: ["./academic.component.scss"]
})
export class AcademicComponent implements OnInit {
  public academic: IProgram = {};
  public programSubjects: ISubject[] = [];
  public subjects: ISubject[] = [];
  public id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private academicsService: AcademicsService,
    private subjectService: SubjectsService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.subjectService
        .findAllInProgram(this.id)
        .subscribe((response: IResponse) => {
          this.programSubjects = response.data;
        });
      this.subjectService.findAll().subscribe((response: IResponse) => {
        this.subjects = response.data;
      });
      this.academicsService
        .findById(this.id)
        .subscribe((response: IResponse) => {
          this.academic = response.data;
        });
    });
  }
}
