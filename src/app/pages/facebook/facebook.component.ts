import { Component, OnInit } from "@angular/core";
import { FacebookEnabledService } from "src/app/services/facebook.service";

@Component({
  selector: "app-facebook",
  templateUrl: "./facebook.component.html",
  styleUrls: ["./facebook.component.scss"]
})
export class FacebookComponent implements OnInit {
  public posts = [];
  constructor(private facebookEnabledService: FacebookEnabledService) {
    this.facebookEnabledService.getAllPosts().then(e => {
      this.posts = e.data;
    });
  }

  ngOnInit() {}
}
