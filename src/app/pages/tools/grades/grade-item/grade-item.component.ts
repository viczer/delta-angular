import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SubjectsService } from "../../../../services/subjects.service";
import { IResponse } from "../../../../interfaces/response.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { GradesService } from "src/app/services/grades.service";
import { IGrade } from "src/app/interfaces/grade.interface";

@Component({
  selector: "app-grade-item",
  templateUrl: "./grade-item.component.html",
  styleUrls: ["./grade-item.component.scss"]
})
export class GradeItemComponent implements OnInit {
  @Input("grade") gradeInput;
  @Input("studentId") studentId = "";
  @Input("mode") mode = "";

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(true);

  public subjects = [];
  public subject: FormGroup;
  public grade: FormGroup;

  constructor(
    private subjectsService: SubjectsService,
    private gradesService: GradesService,
    private toastrService: NbToastrService
  ) {
    this.subjectsService.findAll().subscribe((response: IResponse) => {
      this.subjects = response.data;
    });
  }

  public handleAddSubject() {
    if (this.subject.valid && this.studentId != "") {
      let grade: IGrade = {
        subject: this.subject.value.subject,
        student: this.studentId,
        grade: 0
      };

      this.gradesService.createOne(grade).subscribe((response: IResponse) => {
        this.reload.emit(true);
        this.toastrService.show(
          "Exito al guardar materia",
          "Materia Asignada",
          {
            status: "primary",
            hasIcon: true,
            destroyByClick: true,
            icon: "book-outline"
          }
        );
      });
    }
  }
  public handleDelete() {
    this.gradesService.deleteOne(this.gradeInput._id).subscribe(() => {
      this.reload.emit(true);
      this.toastrService.show(
        "Exito al eliminar calificacion",
        "Calificacion Deasignada",
        {
          status: "primary",
          hasIcon: true,
          destroyByClick: true,
          icon: "book-outline"
        }
      );
    });
  }
  public handleUpdate() {
    if (this.grade.valid && this.studentId != "") {
      let grade: IGrade = {
        grade: this.grade.value.grade
      };
      this.gradesService
        .updateOne(this.gradeInput._id, grade)
        .subscribe((response: IResponse) => {
          this.toastrService.show(
            "Exito al guardar calificacion",
            "Calificacion Asignada",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "book-outline"
            }
          );
        });
    }
  }

  ngOnInit() {
    this.subject = new FormGroup({
      subject: new FormControl("", Validators.required)
    });
    this.grade = new FormGroup({
      grade: new FormControl("", Validators.required)
    });
    if (this.gradeInput) {
      this.grade.patchValue(this.gradeInput);
    }
  }
}
