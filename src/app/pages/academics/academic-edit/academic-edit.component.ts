import { Component, OnInit } from "@angular/core";
import { AcademicsService } from "../../../services/academics.service";
import { SubjectsService } from "../../../services/subjects.service";
import { ActivatedRoute } from "@angular/router";
import { IResponse } from "src/app/interfaces/response.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ISubject } from "src/app/interfaces/subject.iterface";

@Component({
  selector: "app-academic-edit",
  templateUrl: "./academic-edit.component.html",
  styleUrls: ["./academic-edit.component.scss"]
})
export class AcademicEditComponent implements OnInit {
  public program: FormGroup;
  public subjects: ISubject[] = [];
  public id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private academicsService: AcademicsService,
    private subjectsService: SubjectsService
  ) {}
  ngOnInit() {
    this.program = new FormGroup({
      folio: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      avatarUrl: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      inscription: new FormControl("", Validators.required),
      monthlyRate: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.academicsService
        .findById(this.id)
        .subscribe((response: IResponse) => {
          this.program.patchValue(response.data);
        });
    });
  }
}
