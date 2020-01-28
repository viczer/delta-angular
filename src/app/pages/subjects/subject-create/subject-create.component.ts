import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { CustomSubjectValidators } from "../../../validators/subject.validators";
import { SubjectsService } from "../../../services/subjects.service";
import { ISubject } from "../../../interfaces/subject.iterface";
import { IResponse } from "../../../interfaces/response.interface";
import { UploadService } from "../../../services/upload.service";

@Component({
  selector: "app-subject-create",
  templateUrl: "./subject-create.component.html",
  styleUrls: ["./subject-create.component.scss"]
})
export class SubjectCreateComponent implements OnInit {
  @Output("back") back = new EventEmitter();

  public linear = true;
  public informationForm: FormGroup;
  public descriptionForm: FormGroup;
  public contactForm: FormGroup;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private subjectsService: SubjectsService,
    private uploadService: UploadService,
    private toastrService: NbToastrService
  ) {}

  public cancelSubject() {
    this.back.emit();
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public saveSubject() {
    if (
      this.informationForm.valid &&
      this.descriptionForm.valid &&
      this.contactForm.valid
    ) {
      let subject: ISubject = {
        folio: this.informationForm.value.folio,
        name: this.informationForm.value.name,
        description: this.descriptionForm.value.description,
        email: this.contactForm.value.email
      };

      this.subjectsService
        .createOne(subject)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let subjectId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "subject", subjectId)
              .subscribe();
          }
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
          this.back.emit();
        });
    }
  }

  ngOnInit() {
    this.informationForm = new FormGroup(
      {
        name: new FormControl("", Validators.required),
        folio: new FormControl(
          "",
          Validators.required,
          CustomSubjectValidators.folioUniqueValidator.bind(this)
        )
      },
      { updateOn: "blur" }
    );

    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required)
    });

    this.contactForm = new FormGroup({
      email: new FormControl("", Validators.required)
    });
  }
}
