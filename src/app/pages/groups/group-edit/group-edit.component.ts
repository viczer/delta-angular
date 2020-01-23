import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupService } from "../../../services/group.service";
import { StudentService } from "../../../services/student.service";
import { IResponse } from "../../../interfaces/response.interface";
import { IGroup } from "../../../interfaces/group.interface";
import {
  FormGroup,
  FormControlName,
  FormControl,
  Validators
} from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { UploadService } from "../../../services/upload.service";
import { IUser } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-group-edit",
  templateUrl: "./group-edit.component.html",
  styleUrls: ["./group-edit.component.scss"]
})
export class GroupEditComponent implements OnInit {
  public group: FormGroup;
  public students: IUser[] = [];
  public members: IUser[] = [];
  public id: string;

  private upload: {
    file?: File;
    uploaded: boolean;
  } = {
    uploaded: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private studentService: StudentService,
    private uploadService: UploadService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  public handleFileUpload(eventFile) {
    this.upload = {
      file: eventFile,
      uploaded: true
    };
  }

  public handleUpdateMetadata() {
    if (this.group.valid) {
      this.groupService
        .updateOne(this.id, this.group.value)
        .subscribe((response: IResponse) => {
          if (this.upload.uploaded) {
            let groupId = response.data._id;
            this.uploadService
              .uploadImage(this.upload.file, "group", groupId)
              .subscribe();
          }
          this.toastrService.show(
            "Exito al guardar grupo",
            "Grupo Actualizado",
            {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "people-outline"
            }
          );
          this.router.navigate(["grupos"]);
        });
    }
  }

  ngOnInit() {
    this.group = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.studentService
        .findAllInGroup(this.id)
        .subscribe((response: IResponse) => {
          this.members = response.data;
        });

      this.studentService.findAll().subscribe((response: IResponse) => {
        this.students = response.data;
      });

      this.groupService.findById(this.id).subscribe((response: IResponse) => {
        this.group.patchValue(response.data);
      });
    });
  }
}
