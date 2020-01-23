import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { GroupService } from "../../../services/group.service";
import { IGroup } from "../../../interfaces/group.interface";
import { AuthService } from "../../../services/auth.service";
import { IUser } from "../../../interfaces/user.interface";
import { IResponse } from "../../../interfaces/response.interface";
import { UploadService } from "../../../services/upload.service";

@Component({
  selector: "app-group-create",
  templateUrl: "./group-create.component.html",
  styleUrls: ["./group-create.component.scss"]
})
export class GroupCreateComponent implements OnInit {
  @Output("back") back = new EventEmitter();
  public linear = true;
  public nameForm: FormGroup;
  public descriptionForm: FormGroup;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private toastrService: NbToastrService,
    private groupService: GroupService,
    private uploadService: UploadService
  ) {}

  public cancelGroup() {
    this.back.emit();
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public saveGroup() {
    if (this.nameForm.valid && this.descriptionForm.valid) {
      let group: IGroup = {
        name: this.nameForm.value.name,
        description: this.descriptionForm.value.description
      };

      this.groupService.createOne(group).subscribe((response: IResponse) => {
        if (this.upload.uploaded) {
          let groupId = response.data._id;
          this.uploadService
            .uploadImage(this.upload.file, "group", groupId)
            .subscribe();
        }
        this.toastrService.show("Exito al guardar grupo", "Grupo Guardado", {
          status: "primary",
          hasIcon: true,
          destroyByClick: true,
          icon: "people-outline"
        });
        this.back.emit();
      });
    }
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl("", Validators.required)
    });

    this.descriptionForm = new FormGroup({
      description: new FormControl("", Validators.required)
    });
  }
}
