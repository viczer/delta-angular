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

  public order: string = "size";
  public stockGroups = [];
  public groups = [];

  constructor(private groupService: GroupService) {
    setTimeout(() => {
      this.groupService.findAll().subscribe((response: IResponse) => {
        this.stockGroups = response.data;
        this.groups = this.stockGroups;
      });
    }, 300);
  }

  handleFilter(e) {
    this.order = e;

    switch (this.order) {
      case "size":
        this.groups = _.orderBy(
          this.groups,
          function(o) {
            return o.members.length;
          },
          ["desc"]
        );
        break;
      case "name":
        this.groups = _.orderBy(this.groups, "name", ["asc"]);
        break;
    }
  }

  handleSearch(e) {
    let name: string = e.target.value;
    this.groups = _.filter(this.stockGroups, obj => {
      let a = obj.name.toLowerCase();
      let b = new RegExp(name.toLowerCase());
      return a.search(b) >= 0;
    });
    this.handleFilter(this.order);
  }

  handleReload() {
    setTimeout(() => {
      this.groupService.findAll().subscribe((response: IResponse) => {
        this.stockGroups = response.data;
        this.groups = this.stockGroups;
      });
      this.tabset.selectTab(this.tableTab);
    }, 300);
  }
  ngOnInit() {}
  ngAfterViewInit(): void {}
}
