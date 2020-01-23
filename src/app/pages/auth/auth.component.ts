import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild("auth", { static: false })
  auth?: ElementRef;
  private isBlurred = false;

  constructor() {}
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
