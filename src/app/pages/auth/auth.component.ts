import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild("auth", { static: false })
  auth?: ElementRef;
  private isBlurred = false;

  constructor(private authService: AuthService) {
    let loadedStatus = localStorage.getItem("auth_user") != "";
    if (loadedStatus) {
      this.authService.authenticated$.next(
        JSON.parse(localStorage.getItem("auth_user"))
      );
    }

    this.authService.authenticated$.subscribe(status => {
      localStorage.setItem("auth", JSON.stringify(status));
    });
  }
  public toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }

  ngOnInit() {}
  ngAfterViewInit() {
    let random = Math.floor(Math.random() * (4 + 1));

    switch (random) {
      case 0:
        this.auth.nativeElement.classList.add("airport");
        break;
      case 1:
        this.auth.nativeElement.classList.add("plane");
        break;
      case 2:
        this.auth.nativeElement.classList.add("city");
        break;
      case 3:
        this.auth.nativeElement.classList.add("forest");
        break;
      case 4:
        this.auth.nativeElement.classList.add("snow");
        break;
      default:
        this.auth.nativeElement.classList.add("airport");
        break;
    }
  }
}
