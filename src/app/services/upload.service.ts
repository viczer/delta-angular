import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { server } from "./config";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private headers = {
    Accept: "*/*",
    Authorization: ""
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.authenticated$.subscribe(status => {
      this.headers.Authorization = `bearer ${status.access_token}`;
    });
  }

  public uploadImage(file: File, parent: string, parentId: string) {
    console.log("handling", file);

    const formData = new FormData();
    formData.append("file", file);
    let configUrl = `${server.SERVER_URL}uploads/avatar/${parent}/${parentId}`;
    return this.http.post(configUrl, formData, { headers: this.headers });
  }
}
