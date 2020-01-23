import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-group-table",
  templateUrl: "./group-table.component.html",
  styleUrls: ["./group-table.component.scss"]
})
export class GroupTableComponent implements OnInit {
  @Input("groups") groups = [];
  @Output("tableChange")
  tableChange: EventEmitter<boolean> = new EventEmitter(false);
  constructor() {}
  public handleItemChange() {
    this.tableChange.emit(true);
  }
  ngOnInit() {}
}
