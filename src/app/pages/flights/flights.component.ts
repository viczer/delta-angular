import { Component, OnInit, ViewChild } from "@angular/core";
import { IResponse } from "src/app/interfaces/response.interface";
import { FlightsService } from "src/app/services/flights.service";

import * as _ from "lodash";

@Component({
  selector: "app-flights",
  templateUrl: "./flights.component.html",
  styleUrls: ["./flights.component.scss"]
})
export class FlightsComponent implements OnInit {
  @ViewChild("tabset", { static: false }) tabset?: any;
  @ViewChild("tableTab", { static: false }) tableTab?: any;

  public order: string = "";
  public stockFlights = [];
  public flights = [];

  constructor(private FlightsService: FlightsService) {
    setTimeout(() => {
      this.FlightsService.findAll().subscribe((response: IResponse) => {
        this.stockFlights = response.data;
        this.flights = this.stockFlights;
        console.log(this.flights);
      });
    }, 300);
  }

  handleFilter(e) {
    this.order = e;
    this.flights = _.orderBy(this.flights, this.order, "desc");
  }

  handleSearch(e) {
    let name: string = e.target.value;
    this.flights = _.filter(this.stockFlights, obj => {
      let a = obj.name.toLowerCase();
      let b = new RegExp(name.toLowerCase());
      return a.search(b) >= 0;
    });
  }

  handleReload() {
    setTimeout(() => {
      this.FlightsService.findAll().subscribe((response: IResponse) => {
        this.stockFlights = response.data;
        this.flights = this.stockFlights;
      });
      this.tabset.selectTab(this.tableTab);
    }, 300);
  }
  ngOnInit(): void {}
}
