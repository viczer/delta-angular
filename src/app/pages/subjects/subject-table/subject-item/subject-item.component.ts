import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";

import { Router } from "@angular/router";
import { AcademicsService } from "src/app/services/academics.service";
import { IResponse } from "src/app/interfaces/response.interface";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-subject-item",
  templateUrl: "./subject-item.component.html",
  styleUrls: ["./subject-item.component.scss"]
})
export class SubjectItemComponent implements OnInit, AfterViewInit {
  @Input("subject") subject;
  @Input("mode") mode;
  @Input("academicId") academicId = "";

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  @ViewChild("addButton", { static: true })
  addButton: ElementRef;
  public editEnabled = false;
  public deleteEnabled = false;

  public isAdded = false;
  public isAdding = false;
  public isRemoving = false;

  constructor(
    private router: Router,
    private academicsService: AcademicsService,
    private authService: AuthService
  ) {}

  public enableModsHandler(isEdit) {
    this.editEnabled = false;
    this.deleteEnabled = false;

    isEdit ? (this.editEnabled = true) : (this.deleteEnabled = true);
  }

  public addSubject(subjectId: string) {
    if (!this.isAdded && this.academicId != "") {
      this.isAdding = true;
      this.academicsService
        .addSubject(this.academicId, subjectId)
        .subscribe((response: IResponse) => {
          this.isAdded = true;
          this.reload.emit(true);
        });
    }
  }

  public removeSubject(subjectId: string) {
    if (!this.isRemoving) {
      this.isRemoving = true;
      this.academicsService
        .removeSubject(this.academicId, subjectId)
        .subscribe((response: IResponse) => {
          this.reload.emit(true);
        });
    }
  }

  navigate(id, isEdit = false) {
    isEdit
      ? this.router.navigate(["materias/editar", id])
      : this.router.navigate(["materias", id]);
  }

  deleteHandler(id) {}

  ngOnInit() {
    if (this.subject.programs.includes(this.academicId)) {
      this.isAdded = true;
    }
  }

  ngAfterViewInit(): void {}
}
