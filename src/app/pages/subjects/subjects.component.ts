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

  public filter: string = "name";
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
    this.filter = e;
  }

  handleSearch(e) {
    let name: string = e.target.value;
    let a: string;
    let b = new RegExp(name.toLowerCase());
    this.subjects = _.filter(this.stockSubjects, obj => {
      switch (this.filter) {
        case "name":
          a = obj.name.toLowerCase();
          a = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          break;
        case "folio":
          a = obj.folio ? obj.folio.toLowerCase() : null;
          break;
        case "grades":
          a = obj.grades ? obj.grades.length.toString() : null;
          break;
      }
      return a ? a.search(b) >= 0 : null;
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
