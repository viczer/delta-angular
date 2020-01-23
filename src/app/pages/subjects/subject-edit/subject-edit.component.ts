import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../../services/student.service";
import { SubjectsService } from "../../../services/subjects.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IResponse } from "src/app/interfaces/response.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { NbToastrService } from "@nebular/theme";
import { UploadService } from "src/app/services/upload.service";

@Component({
  selector: "app-subject-edit",
  templateUrl: "./subject-edit.component.html",
  styleUrls: ["./subject-edit.component.scss"]
})
export class SubjectEditComponent implements OnInit {
  public subject: FormGroup;
  public students: IUser[] = [];
  public id: string;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectsService,
    private studentService: StudentService,
    private toastrService: NbToastrService,
    private uploadService: UploadService,
    private router: Router
  ) {}

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public handleUpdate() {
    if (this.subject.valid) {
      this.subjectService
        .updateOne(this.id, this.subject.value)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let subjectId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "subject", subjectId)
              .subscribe();
          }
        });
      this.toastrService.show(
        "Exito al guardar la materia",
        "Materia Guardada",
        {
          status: "primary",
          hasIcon: true,
          destroyByClick: true,
          icon: "book-open-outline"
        }
      );
      this.router.navigate(["materias"]);
    }
  }

  public handleDelete() {
    this.subjectService.deleteOne(this.id).subscribe();
    this.router.navigate(["materias"]);
  }

  public navigate(route) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.subject = new FormGroup({
      folio: new FormControl(
        { value: "", disabled: true },
        Validators.required
      ),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      avatarUrl: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];

      this.subjectService.findById(this.id).subscribe((response: IResponse) => {
        this.subject.patchValue(response.data);
      });
    });
  }
}
