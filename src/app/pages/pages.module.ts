import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./auth/login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { RegisterComponent } from "./auth/register/register.component";
import {
  NbTabsetModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbListModule,
  NbTreeGridModule,
  NbDatepickerModule,
  NbUserModule,
  NbIconModule,
  NbActionsModule,
  NbStepperModule
} from "@nebular/theme";
import { ComponentsModule } from "../components/components.module";
import { HomeComponent } from "./home/home.component";
import { GroupsComponent } from "./groups/groups.component";
import { SubjectsComponent } from "./subjects/subjects.component";
import { StudentsComponent } from "./students/students.component";
import { StudentComponent } from "./students/student/student.component";
import { StudentEditComponent } from "./students/student-edit/student-edit.component";
import { NotesComponent } from "./tools/notes/notes.component";
import { PaymentsComponent } from "./tools/payments/payments.component";
import { GradesComponent } from "./tools/grades/grades.component";
import { FlightsComponent } from "./tools/flights/flights.component";
import { StudentsTableComponent } from "./students/students-table/students-table.component";
import { StudentItemComponent } from "./students/students-table/student-item/student-item.component";
import { AcademicsComponent } from "./academics/academics.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GroupComponent } from "./groups/group/group.component";
import { GroupEditComponent } from "./groups/group-edit/group-edit.component";
import { GroupTableComponent } from "./groups/group-table/group-table.component";
import { GroupItemComponent } from "./groups/group-table/group-item/group-item.component";
import { GroupCreateComponent } from "./groups/group-create/group-create.component";
import { SubjectComponent } from "./subjects/subject/subject.component";
import { SubjectCreateComponent } from "./subjects/subject-create/subject-create.component";
import { SubjectEditComponent } from "./subjects/subject-edit/subject-edit.component";
import { SubjectTableComponent } from "./subjects/subject-table/subject-table.component";
import { SubjectItemComponent } from "./subjects/subject-table/subject-item/subject-item.component";
import { AcademicComponent } from "./academics/academic/academic.component";
import { AcademicTableComponent } from "./academics/academic-table/academic-table.component";
import { AcademicItemComponent } from "./academics/academic-table/academic-item/academic-item.component";
import { AcademicEditComponent } from "./academics/academic-edit/academic-edit.component";
import { AcademicCreateComponent } from "./academics/academic-create/academic-create.component";
import { PaymentItemComponent } from "./tools/payments/payment-item/payment-item.component";
import { GradeItemComponent } from "./tools/grades/grade-item/grade-item.component";
import { DirectivesModule } from "../directives/directives.module";
import { StudentCreateComponent } from './students/student-create/student-create.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    HomeComponent,
    GroupsComponent,
    SubjectsComponent,
    StudentsComponent,
    StudentComponent,
    StudentEditComponent,
    NotesComponent,
    PaymentsComponent,
    GradesComponent,
    FlightsComponent,
    StudentsTableComponent,
    StudentItemComponent,
    AcademicsComponent,
    GroupComponent,
    GroupEditComponent,
    GroupTableComponent,
    GroupItemComponent,
    GroupCreateComponent,
    SubjectComponent,
    SubjectCreateComponent,
    SubjectEditComponent,
    SubjectTableComponent,
    SubjectItemComponent,
    AcademicComponent,
    AcademicTableComponent,
    AcademicItemComponent,
    AcademicEditComponent,
    AcademicCreateComponent,
    PaymentItemComponent,
    GradeItemComponent,
    StudentCreateComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NbTabsetModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbListModule,
    NbTreeGridModule,
    NbDatepickerModule,
    NbUserModule,
    NbIconModule,
    NbActionsModule,
    ReactiveFormsModule,
    NbStepperModule,
    DirectivesModule
  ]
})
export class PagesModule {}
