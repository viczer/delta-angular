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
      this.student = this.studentService.findById(params["id"]);
    });
  }
  ngAfterViewInit(): void {
    this.editor = new EditorJS({
      holderId: "codex-editor",
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
      placeholder: "Escribe Notas!"
    });
  }

  public navigate(route: string) {
    this.router.navigate([route]);
  }

  public saveNote() {
    this.toastrService.show("Exito al guardar nota", "Nota Guardada", {
      status: "primary",
      hasIcon: true,
      destroyByClick: true,
      icon: "file-add-outline"
    });
    this.router.navigate(["alumnos", this.student._id]);
  }
}
