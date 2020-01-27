import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { MexicoService } from "../../../services/mexico.service";
import * as _ from "lodash";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { GroupService } from "../../../services/group.service";
import { AcademicsService } from "../../../services/academics.service";
import { IResponse } from "../../../interfaces/response.interface";
import { StudentService } from "../../../services/student.service";
import { UploadService } from "../../../services/upload.service";
import { CustomUserValidators } from "../../../validators/user.validators";
import { AuthService } from "../../../services/auth.service";
import { IUser } from "../../../interfaces/user.interface";
import { SchoolService } from "src/app/services/schools.service";

@Component({
  selector: "app-student-edit",
  templateUrl: "./student-edit.component.html",
  styleUrls: ["./student-edit.component.scss"]
})
export class StudentEditComponent implements OnInit {
  public user: FormGroup;
  public id: string;

  public municipalities: string[] = [];
  public states: string[] = [];
  public cities: string[] = [];

  public groups = [];
  public academics = [];
  public schools = [];

  public bloodGroups = [
    "A RhD positivo (A+)",
    "A RhD negativo (A-)",
    "B RhD positivo (B+)",
    "B RhD negativo (B-)",
    "O RhD positivo (O+)",
    "O RhD negativo (O-)",
    "AB RhD positivo (AB+)",
    "AB RhD negativo (AB-)"
  ];

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private authService: AuthService,
    private studentService: StudentService,
    private uploadService: UploadService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private mexicoService: MexicoService,
    private groupService: GroupService,
    private academicsService: AcademicsService
  ) {
    mexicoService.getStates().subscribe(({ response }) => {
      this.states = response.estado.sort();
    });

    this.groupService.findAll().subscribe((response: IResponse) => {
      this.groups = response.data;
    });

    this.academicsService.findAll().subscribe((response: IResponse) => {
      this.academics = response.data;
    });

    this.schoolService.findAll().subscribe((response: IResponse) => {
      this.schools = response.data;
    });
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public navigate(route) {
    this.router.navigate([route]);
  }

  public saveStudent() {
    if (this.user.valid) {
      let user: IUser = this.user.value;

      user.enrolled = new Date(this.user.value.enrolled).valueOf();
      user.dob = new Date(this.user.value.dob).valueOf();
      user.schools = [this.user.value.schools];
      this.studentService
        .updateOne(this.id, this.user.value)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let groupId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "student", groupId)
              .subscribe();
          }

          this.toastrService.show(
            "Exito al guardar alumno",
            "Alumno Guardado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "person-outline"
            }
          );
          this.router.navigate(["alumnos"]);
        });
    }
  }

  public handleDelete() {
    this.studentService.deleteOne(this.id).subscribe((response: IResponse) => {
      this.router.navigate(["alumnos"]);
    });
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl({ value: "", disabled: true }),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(14)
      ]),
      dob: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      lastSchool: new FormControl("", [Validators.required]),
      emergency: new FormGroup({
        phone: new FormControl("", [
          Validators.required,
          Validators.minLength(14)
        ]),
        name: new FormControl("", [Validators.required]),
        relation: new FormControl("", [Validators.required]),
        bloodType: new FormControl("", [Validators.required])
      }),
      address: new FormGroup({
        state: new FormControl("", [Validators.required]),
        municipality: new FormControl("", [Validators.required]),
        colony: new FormControl("", [Validators.required]),
        street: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required])
      }),
      schools: new FormControl({ value: "", disabled: true }),
      program: new FormControl({ value: "", disabled: true }),
      group: new FormControl({ value: "", disabled: true }),
      enrolled: new FormControl("", [Validators.required]),
      enrollmentId: new FormControl("", [Validators.required])
    });

    (this.user.controls
      .address as FormGroup).controls.state.valueChanges.subscribe(value => {
      if (value != "") {
        (this.user.controls
          .address as FormGroup).controls.municipality.setValue("");
        this.mexicoService
          .getMunicipalities(value)
          .subscribe(({ response }) => {
            this.municipalities = response.municipios.sort();
          });
      }
    });

    (this.user.controls
      .address as FormGroup).controls.municipality.valueChanges.subscribe(
      value => {
        if (value != "") {
          (this.user.controls.address as FormGroup).controls.colony.setValue(
            ""
          );
          this.mexicoService.getColonies(value).subscribe(({ response }) => {
            this.cities = response.colonia.sort();
          });
        }
      }
    );

    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.studentService.findById(this.id).subscribe((response: IResponse) => {
        const schools = { schools: response.data.schools[0] };
        const data = { ...response.data, ...schools };

        this.user.patchValue(data);
      });
    });
  }
}
