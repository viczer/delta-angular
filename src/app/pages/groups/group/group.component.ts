import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GroupService } from "../../../services/group.service";
import { StudentService } from "../../../services/student.service";
import { IResponse } from "../../../interfaces/response.interface";
import { IUser } from "../../../interfaces/user.interface";
import { IGroup } from "../../../interfaces/group.interface";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent implements OnInit {
  public group: IGroup;
  public students: IUser[];
  public members: IUser[];
  public id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private studentService: StudentService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.groupService.findById(this.id).subscribe((response: IResponse) => {
        this.group = response.data;
      });
      this.studentService.findAll().subscribe((response: IResponse) => {
        this.students = response.data;
      });
      this.studentService
        .findAllInGroup(this.id)
        .subscribe((response: IResponse) => {
          this.members = response.data;
        });
    });
  }
  ngOnInit() {}
}
