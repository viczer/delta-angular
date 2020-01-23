import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomUserValidators } from "../../../validators/user.validators";
import { AuthService } from "../../../services/auth.service";
import { NbToastrService } from "@nebular/theme";
import { IResponse } from "../../../interfaces/response.interface";
import { IUser } from "../../../interfaces/user.interface";
import { ISchool } from "../../../interfaces/school.interface";
import { SchoolService } from "../../../services/schools.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  public meta: FormGroup;
  public user: FormGroup;
  public auth: FormGroup;

  public schools: ISchool[];

  @ViewChild("stepper", { static: false })
  stepper?: any;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private toastrService: NbToastrService
  ) {
    this.schoolService.findAll().subscribe(
      (response: IResponse) => {
        this.schools = response.data;
      },
      error => {}
    );
  }

  public handleRegister() {
    if (this.auth.valid) {
      let requestUser: IUser = {
        role: "PRINCIPAL_ROLE",
        email: this.user.value.email,
        username: this.user.value.username,
        password: this.user.value.password,
        name: this.meta.value.name,
        phone: this.meta.value.phone,
        gender: this.meta.value.gender,
        schools: [this.meta.value.school]
      };

      console.log(requestUser);

      this.authService
        .login(this.auth.value.username, this.auth.value.password)
        .subscribe(
          (response: IResponse) => {
            this.authService.signup(requestUser).subscribe(
              (response: IResponse) => {
                this.stepper.reset();
                this.toastrService.show(
                  "Director Registado",
                  "Director Registardo",
                  {
                    status: "primary",
                    hasIcon: true,
                    destroyByClick: true,
                    icon: "person-outline"
                  }
                );
              },
              () => {
                this.toastrService.show(
                  "Registro Fallido",
                  "El usuario ya existe",
                  {
                    status: "warning",
                    hasIcon: true,
                    destroyByClick: true,
                    icon: "alert-triangle-outline"
                  }
                );
              }
            );
          },
          () => {
            this.toastrService.show(
              "Autorización Fallida",
              "No hay autorización",
              {
                status: "danger",
                hasIcon: true,
                destroyByClick: true,
                icon: "alert-triangle-outline"
              }
            );
          }
        );
    } else {
      this.toastrService.show("Autorización Fallida", "Forma Incompleta", {
        status: "warning",
        hasIcon: true,
        destroyByClick: true,
        icon: "alert-triangle-outline"
      });
    }
  }

  ngOnInit() {
    this.meta = new FormGroup({
      school: new FormControl("", Validators.required),
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(14)
      ]),
      gender: new FormControl("", Validators.required)
    });

    this.user = new FormGroup(
      {
        email: new FormControl("", Validators.required),
        username: new FormControl(
          "",
          Validators.required,
          CustomUserValidators.usernameUniqueValidator.bind(this)
        ),
        password: new FormControl("", Validators.required),
        conPassword: new FormControl(
          "",
          Validators.required,
          CustomUserValidators.passwordMatchValidator.bind(this)
        )
      },
      { updateOn: "blur" }
    );

    this.auth = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngAfterViewInit() {}
}
