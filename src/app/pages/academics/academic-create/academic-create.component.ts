import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { GroupService } from "../../../services/group.service";
import { UploadService } from "../../../services/upload.service";
import { IProgram } from "../../../interfaces/program.interface";
import { CustomProgramValidators } from "../../../validators/program.validators";
import { AcademicsService } from "../../../services/academics.service";
import { IResponse } from "../../../interfaces/response.interface";
@Component({
  selector: "app-academic-create",
  templateUrl: "./academic-create.component.html",
  styleUrls: ["./academic-create.component.scss"]
})
export class AcademicCreateComponent implements OnInit {
  @Output("back") back = new EventEmitter();
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
    private toastrService: NbToastrService,
    private groupService: GroupService,
    private uploadService: UploadService,
    private academicsService: AcademicsService
  ) {}

  public cancelAcademic() {
    this.back.emit();
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public saveAcademic() {
    if (
      this.informationForm.valid &&
      this.descriptionForm.valid &&
      this.contactForm.valid
    ) {
      let startDate = new Date(
        this.informationForm.value.academicEnd
      ).valueOf();
      let endDate = new Date(
        this.informationForm.value.academicStart
      ).valueOf();

      let program: IProgram = {
        name: this.informationForm.value.name,
        folio: this.informationForm.value.folio,
        inscription: this.informationForm.value.inscriptionFee,
        monthlyRate: this.informationForm.value.monthlyFee,
        startDate,
        endDate,
        description: this.descriptionForm.value.description,
        email: this.contactForm.value.email
      };

      this.academicsService
        .createOne(program)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let programId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "program", programId)
              .subscribe();
          }

          this.toastrService.show(
            "Exito al guardar programa",
            "Programa Guardado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "award-outline"
            }
          );
          this.back.emit();
        });
    }
  }

  ngOnInit() {
    this.informationForm = new FormGroup({
      name: new FormControl("", Validators.required),
      folio: new FormControl(
        "",
        Validators.required,
        CustomProgramValidators.folioUniqueValidator.bind(this)
      ),
      inscriptionFee: new FormControl("", Validators.required),
      monthlyFee: new FormControl("", Validators.required),
      academicStart: new FormControl("", Validators.required),
      academicEnd: new FormControl("", Validators.required)
    });

    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required)
    });

    this.contactForm = new FormGroup({
      email: new FormControl("", Validators.required)
    });
  }
}
