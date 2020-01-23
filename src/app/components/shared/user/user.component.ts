import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { IUser } from "../../../interfaces/user.interface";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input("user") user;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
