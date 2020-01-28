import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { GroupsComponent } from "./pages/groups/groups.component";
import { SubjectsComponent } from "./pages/subjects/subjects.component";
import { StudentsComponent } from "./pages/students/students.component";
import { StudentEditComponent } from "./pages/students/student-edit/student-edit.component";
import { NotesComponent } from "./pages/tools/notes/notes.component";
import { PaymentsComponent } from "./pages/tools/payments/payments.component";
import { GradesComponent } from "./pages/tools/grades/grades.component";
import { StudentComponent } from "./pages/students/student/student.component";
import { AcademicsComponent } from "./pages/academics/academics.component";
import { GroupComponent } from "./pages/groups/group/group.component";
import { GroupEditComponent } from "./pages/groups/group-edit/group-edit.component";
import { SubjectEditComponent } from "./pages/subjects/subject-edit/subject-edit.component";
import { SubjectComponent } from "./pages/subjects/subject/subject.component";
import { AcademicComponent } from "./pages/academics/academic/academic.component";
import { AcademicEditComponent } from "./pages/academics/academic-edit/academic-edit.component";
import { StudentCreateComponent } from "./pages/students/student-create/student-create.component";
import { FacebookComponent } from "./pages/facebook/facebook.component";
import { FlightsComponent } from "./pages/flights/flights.component";
import { FlightEditComponent } from "./pages/flights/flight-edit/flight-edit.component";
import { FlightComponent } from "./pages/flights/flight/flight.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AuthComponent
  },
  {
    path: "facebook",
    component: FacebookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "inicio",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "grupos/editar/:id",
    component: GroupEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "grupos/:id",
    component: GroupComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "grupos",
    component: GroupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "materias/editar/:id",
    component: SubjectEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "materias/:id",
    component: SubjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "materias",
    component: SubjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "programas/editar/:id",
    component: AcademicEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "programas/:id",
    component: AcademicComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "programas",
    component: AcademicsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vuelos",
    component: FlightsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vuelos/editar/:id",
    component: FlightEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vuelos/:id",
    component: FlightComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alumnos",
    component: StudentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alumnos/nuevo",
    component: StudentCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alumnos/editar/:id",
    component: StudentEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alumnos/:id",
    component: StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "calificaciones/:id",
    component: GradesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "notas/:id",
    component: NotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "pagos/:id",
    component: PaymentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "calificaciones/:id",
    component: GradesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
