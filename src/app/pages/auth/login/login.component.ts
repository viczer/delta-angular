import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NbToastrService } from "@nebular/theme";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IResponse } from "../../../interfaces/response.interface";
import { ISchool } from "../../../interfaces/school.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public avatarUrl: string;
  public schools: ISchool[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl("mromero", Validators.required),
      password: new FormControl("Kiloopen.2", Validators.required)
    });
  }

  public login() {
    if (this.user.valid) {
      this.authService
        .login(this.user.value.username, this.user.value.password)
        .subscribe(
          (response: IResponse) => {
            if (response.data && response.data.access_token) {
              this.toastrService.show(
                `Bienvenido a casa`,
                `Hola ${response.data.name}`,
                {
                  status: "success",
                  hasIcon: true,
                  destroyByClick: true,
                  icon: "unlock-outline"
                }
              );
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.access_token)
              );
              this.router.navigate(["inicio"]);
              this.authService.authenticated$.next(response.data);
            }
          },
          () => {
            this.toastrService.show(
              "El usuario o la contraseña ingresados no son correctos",
              "Algo anda mal",
              {
                status: "danger",
                hasIcon: true,
                destroyByClick: true,
                icon: "alert-triangle-outline"
              }
            );
          }
        );
    }
  }

  public handleUsernameBlur() {
    this.authService.checkUsername(this.user.value.username).subscribe(
      (response: IResponse) => {
        this.avatarUrl = response.data.avatarUrl;
      },
      () => {
        this.avatarUrl = null;
      }
    );
  }
}
