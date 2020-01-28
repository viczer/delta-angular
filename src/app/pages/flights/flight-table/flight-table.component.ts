import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-flight-table",
  templateUrl: "./flight-table.component.html",
  styleUrls: ["./flight-table.component.scss"]
})
export class FlightTableComponent implements OnInit {
  @Input("flights") flights = [];
  @Input("mode") mode;

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  constructor() {}

  public handleReload() {
    this.reload.emit(true);
  }

  ngOnInit() {}
}
