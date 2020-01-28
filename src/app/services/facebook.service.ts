import { Injectable } from "@angular/core";
import { FacebookService, InitParams } from "ngx-facebook";

@Injectable({
  providedIn: "root"
})
export class FacebookEnabledService {
  constructor(private facebookService: FacebookService) {
    let initParams: InitParams = {
      appId: "397141454337515",
      xfbml: true,
      version: "v2.8"
    };

    facebookService.init(initParams);
  }

  public getAllPosts() {
    return this.facebookService.api(
      "deltamexicoaviacion/posts?fields=full_picture,message,story",
      null,
      {
        access_token:
          "EAAFpMrNPtesBAK5QGihZBmZBUe4cG5HPxJDLGiKU8OICQ6pY8vSDBdKylwov49I8A2sTchvwrFKZAX4kl6y79uIClKzZC0ME2dogKhNfTJcxNLJZBcqO096Stdk0Qktjkg4aCvNfE1DAPUxknZAsbdJ8FuVzwzw31H6HGVnRjWVgZDZD"
      }
    );
  }
}
