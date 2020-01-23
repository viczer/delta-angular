import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { GroupService } from "../../../../services/group.service";
import { IResponse } from "../../../../interfaces/response.interface";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-group-item",
  templateUrl: "./group-item.component.html",
  styleUrls: ["./group-item.component.scss"]
})
export class GroupItemComponent implements OnInit {
  @Input("group") group;

  @Output("itemChange")
  itemChange: EventEmitter<boolean> = new EventEmitter(false);

  public editEnabled = false;
  public deleteEnabled = false;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private toastrService: NbToastrService
  ) {}

  public enableModsHandler(isEdit) {
    this.editEnabled = false;
    this.deleteEnabled = false;

    isEdit ? (this.editEnabled = true) : (this.deleteEnabled = true);
  }

  navigate(id, isEdit = false) {
    isEdit
      ? this.router.navigate(["grupos/editar", id])
      : this.router.navigate(["grupos", id]);
  }

  ngOnInit() {}

  deleteHandler(id) {
    this.groupService.deleteOne(id).subscribe((response: IResponse) => {
      this.toastrService.show("Exito al eliminar grupo", "Grupo Eliminado", {
        status: "primary",
        hasIcon: true,
        destroyByClick: true,
        icon: "trash-outline"
      });
    });
    this.itemChange.emit(true);
  }
}
