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
      "1062315607258260/posts?fields=full_picture,message,story",
      null,
      {
        access_token:
          "EAAFpMrNPtesBABMlXLkZByC589NN6mbZBnD26J37FQMfEVZALGC3aDFvKsVA48wdp9ZC5m8R4R6W6c4z9zEc5lZCCVJZCmgjGb9zXaarZAH1TQLxB9qwIv423SvOsqtYqoFEihdKQf8nb3k3Qsv9mLhZCJgnRWjdr29Yq6DLQrGU6dx4EpLn8vVW"
      }
    );
  }
}
