import { Component, AfterViewInit } from "@angular/core";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Marker from "@editorjs/marker";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import { Router, ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { StudentService } from "../../../services/student.service";
import { IResponse } from "src/app/interfaces/response.interface";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent implements AfterViewInit {
  private editor;
  public student;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private toastrService: NbToastrService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.studentService
        .findById(params["id"])
        .subscribe((response: IResponse) => {
          this.student = response.data;

          const note = JSON.parse(response.data.note);

          this.editor = new EditorJS({
            holder: "codex-editor",
            tools: {
              header: {
                class: Header,
                inlineToolbar: true
              },
              paragraph: {
                class: Paragraph,
                inlineToolbar: true
              },
              list: {
                class: List,
                inlineToolbar: true
              },
              marker: {
                class: Marker,
                inlineToolbar: true
              },
              table: {
                class: Table,
                inlineToolbar: true
              },
              checklist: {
                class: Checklist,
                inlineToolbar: true
              }
            },
            autofocus: true,
            placeholder: "Escribe Notas!",
            data: note
          });
        });
    });
  }
  ngAfterViewInit(): void {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  public saveNote() {
    this.editor
      .save()
      .then(outputData => {
        this.student.note = JSON.stringify(outputData);
        this.studentService
          .updateOne(this.student._id, this.student)
          .subscribe((response: IResponse) => {
            this.toastrService.show("Exito al guardar nota", "Nota Guardada", {
              status: "primary",
              hasIcon: true,
              destroyByClick: true,
              icon: "file-add-outline"
            });
            this.router.navigate(["alumnos", this.student._id]);
          });
      })
      .catch(error => {
        this.toastrService.show(
          "Algo anda mal, no se logro al guardar nota",
          "Intentar en otro momento",
          {
            status: "warning",
            hasIcon: true,
            destroyByClick: true,
            icon: "alert-triangle-outline"
          }
        );
      });
  }
}
