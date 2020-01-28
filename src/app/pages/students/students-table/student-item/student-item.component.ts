import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";
import { GroupService } from "../../../../services/group.service";
import { IResponse } from "../../../../interfaces/response.interface";
import { IGroup } from "../../../../interfaces/group.interface";
import { FlightsService } from "src/app/services/flights.service";

@Component({
  selector: "app-student-item",
  templateUrl: "./student-item.component.html",
  styleUrls: ["./student-item.component.scss"]
})
export class StudentItemComponent implements OnInit {
  @Input("student") student;
  @Input("size") size;
  @Input("mode") mode;
  @Input("groupId") groupId = "";
  @Input("flightId") flightId = "";

  @Output("reload") reload: EventEmitter<boolean> = new EventEmitter(false);

  public settingsActive = false;
  constructor(
    private router: Router,
    private groupService: GroupService,
    private flightsService: FlightsService
  ) {}
  public loadSettings() {
    this.settingsActive = true;
  }

  navigate(id) {
    this.router.navigate(["alumnos", id]);
  }
  public handleAdd(studentId) {
    if (this.groupId != "") {
      this.groupService.addMember(this.groupId, studentId).subscribe();
    } else if (this.flightId != "") {
      this.flightsService.addRecruit(this.flightId, studentId).subscribe();
      this.reload.emit(true);
    }
  }
  public handleRemoval(studentId) {
    if (this.groupId != "") {
      this.groupService.removeMember(this.groupId, studentId).subscribe();
    } else if (this.flightId != "") {
      this.flightsService.removeStudent(this.flightId, studentId).subscribe();
      this.reload.emit(true);
    }
  }

  public handlePromotion(studentId) {
    if (this.flightId != "") {
      this.flightsService.addPilot(this.flightId, studentId).subscribe();
      this.reload.emit(true);
    }
  }
  ngOnInit() {}
}
