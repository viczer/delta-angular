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

  public filter: string = "name";
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
    this.filter = e;
  }

  handleSearch(e) {
    let name: string = e.target.value;
    let a: string;
    let b = new RegExp(name.toLowerCase());
    this.academics = _.filter(this.stockAcademics, obj => {
      switch (this.filter) {
        case "name":
          a = obj.name.toLowerCase();
          a = a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          break;
        case "folio":
          a = obj.folio ? obj.folio.toLowerCase() : null;
          break;
        case "subjects":
          a = obj.subjects ? obj.subjects.length.toString() : null;
          break;
      }
      return a ? a.search(b) >= 0 : null;
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
