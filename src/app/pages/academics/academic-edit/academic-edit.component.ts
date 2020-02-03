import { Component, OnInit } from "@angular/core";
import { AcademicsService } from "../../../services/academics.service";
import { SubjectsService } from "../../../services/subjects.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IResponse } from "src/app/interfaces/response.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ISubject } from "src/app/interfaces/subject.iterface";
import { UploadService } from "src/app/services/upload.service";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-academic-edit",
  templateUrl: "./academic-edit.component.html",
  styleUrls: ["./academic-edit.component.scss"]
})
export class AcademicEditComponent implements OnInit {
  public program: FormGroup;
  public subjects: ISubject[] = [];
  public id: string;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private academicsService: AcademicsService,
    private subjectsService: SubjectsService,
    private uploadService: UploadService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public handleUpdateMetadata() {
    if (this.program.valid) {
      this.academicsService
        .updateOne(this.id, this.program.value)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let programId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "program", programId)
              .subscribe();
          }
          this.toastrService.show(
            "Exito al guardar programa",
            "Programa Actualizado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "award-outline"
            }
          );
          this.router.navigate(["programas"]);
        });
    }
  }

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
          this.program.controls.startDate.patchValue(
            new Date(response.data.startDate)
          );
          this.program.controls.endDate.patchValue(
            new Date(response.data.endDate)
          );
        });
    });
  }
}
