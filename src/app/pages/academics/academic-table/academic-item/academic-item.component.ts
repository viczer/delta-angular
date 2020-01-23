import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AcademicsService } from "src/app/services/academics.service";

@Component({
  selector: "app-academic-item",
  templateUrl: "./academic-item.component.html",
  styleUrls: ["./academic-item.component.scss"]
})
export class AcademicItemComponent implements OnInit {
  @Input("academic") academic;
  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  public editEnabled = false;
  public deleteEnabled = false;
  constructor(
    private router: Router,
    private academicsService: AcademicsService
  ) {}

  public enableModsHandler(isEdit) {
    this.editEnabled = false;
    this.deleteEnabled = false;

    isEdit ? (this.editEnabled = true) : (this.deleteEnabled = true);
  }

  navigate(id, isEdit = false) {
    isEdit
      ? this.router.navigate(["programas/editar", id])
      : this.router.navigate(["programas", id]);
  }

  ngOnInit() {}

  deleteHandler(id) {
    this.academicsService.deleteOne(id).subscribe();
    this.reload.emit(true);
  }
}
