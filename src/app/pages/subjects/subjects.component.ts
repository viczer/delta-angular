import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { SubjectsService } from "../../services/subjects.service";
import { IResponse } from "../../interfaces/response.interface";

import * as _ from "lodash";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"]
})
export class SubjectsComponent implements OnInit, AfterViewInit {
  @ViewChild("tabset", { static: false }) tabset?: any;
  @ViewChild("tableTab", { static: false }) tableTab?: any;

  public order: string = "";
  public stockSubjects = [];
  public subjects = [];

  constructor(private subjectsService: SubjectsService) {
    setTimeout(() => {
      this.subjectsService.findAll().subscribe((response: IResponse) => {
        this.stockSubjects = response.data;
        this.subjects = this.stockSubjects;
      });
    }, 300);
  }

  handleFilter(e) {
    this.order = e;
    this.subjects = _.orderBy(this.subjects, this.order, "desc");
  }

  handleSearch(e) {
    let name: string = e.target.value;
    this.subjects = _.filter(this.stockSubjects, obj => {
      let a = obj.name.toLowerCase();
      let b = new RegExp(name.toLowerCase());
      return a.search(b) >= 0;
    });
  }

  handleReload() {
    setTimeout(() => {
      this.subjectsService.findAll().subscribe((response: IResponse) => {
        this.stockSubjects = response.data;
        this.subjects = this.stockSubjects;
      });
      this.tabset.selectTab(this.tableTab);
    }, 300);
  }

  ngOnInit() {}
  ngAfterViewInit(): void {}
}
