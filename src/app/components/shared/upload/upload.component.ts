import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements AfterViewInit {
  public uploaded: boolean = false;
  @Output("upload") file: EventEmitter<File> = new EventEmitter();

  @ViewChild("upload", { static: true })
  upload?: ElementRef;
  @ViewChild("image", { static: true })
  image?: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {}

  handleUpload() {
    this.upload.nativeElement.click();
  }

  public handleFiles(event: HTMLInputEvent) {
    let files = event.target.files;

    if (FileReader && files && files.length) {
      this.uploaded = true;
      var fr = new FileReader();

      fr.onload = () => {
        this.image.nativeElement.src = fr.result;
        this.file.emit(files[0]);
      };

      fr.readAsDataURL(files[0]);
    }
  }
}
