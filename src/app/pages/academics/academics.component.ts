import { Component, OnInit, ViewChild } from "@angular/core";
import { AcademicsService } from "../../services/academics.service";
import { IResponse } from "../../interfaces/response.interface";

import * as _ from "lodash";

@Component({
  selector: "app-academics",
  templateUrl: "./academics.component.html",
  styleUrls: ["./academics.component.scss"]
})
export class AcademicsComponent implements OnInit {
  @ViewChild("tabset", { static: false }) tabset?: any;
  @ViewChild("tableTab", { static: false }) tableTab?: any;

  public order: string = "";
  public stockAcademics = [];
  public academics = [];

  constructor(private academicsService: AcademicsService) {
    setTimeout(() => {
      this.academicsService.findAll().subscribe((response: IResponse) => {
        this.stockAcademics = response.data;
        this.academics = this.stockAcademics;
      });
    }, 300);
  }

  handleFilter(e) {
    this.order = e;
    this.academics = _.orderBy(this.academics, this.order, "desc");
  }

  handleSearch(e) {
    let name: string = e.target.value;
    this.academics = _.filter(this.stockAcademics, obj => {
      let a = obj.name.toLowerCase();
      let b = new RegExp(name.toLowerCase());
      return a.search(b) >= 0;
    });
  }

  handleReload() {
    setTimeout(() => {
      this.academicsService.findAll().subscribe((response: IResponse) => {
        this.stockAcademics = response.data;
        this.academics = this.stockAcademics;
      });
      this.tabset.selectTab(this.tableTab);
    }, 300);
  }
  ngOnInit() {}
  ngAfterViewInit(): void {}
}
