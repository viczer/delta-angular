import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { IResponse } from "../../interfaces/response.interface";
import { GroupService } from "../../services/group.service";

import * as _ from "lodash";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent implements OnInit, AfterViewInit {
  @ViewChild("tabset", { static: false }) tabset?: any;
  @ViewChild("tableTab", { static: false }) tableTab?: any;

  public order: string = "";
  public stcokGroups = [];
  public groups = [];

  constructor(private groupService: GroupService) {
    setTimeout(() => {
      this.groupService.findAll().subscribe((response: IResponse) => {
        this.stcokGroups = response.data;
        this.groups = this.stcokGroups;
      });
    }, 300);
  }

  handleFilter(e) {
    this.order = e;
    this.groups = _.orderBy(this.groups, this.order, "desc");
  }

  handleSearch(e) {
    let name: string = e.target.value;
    this.groups = _.filter(this.stcokGroups, obj => {
      let a = obj.name.toLowerCase();
      let b = new RegExp(name.toLowerCase());
      return a.search(b) >= 0;
    });
  }

  handleReload() {
    setTimeout(() => {
      this.groupService.findAll().subscribe((response: IResponse) => {
        this.stcokGroups = response.data;
        this.groups = this.stcokGroups;
      });
      this.tabset.selectTab(this.tableTab);
    }, 300);
  }
  ngOnInit() {}
  ngAfterViewInit(): void {}
}
