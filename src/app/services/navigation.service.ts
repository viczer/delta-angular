import { Injectable } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  private items: NbMenuItem[] = [
    {
      title: "Inicio",
      icon: "home-outline",
      link: "/inicio"
    },
    {
      title: "Grupos",
      icon: "people-outline",
      link: "/grupos"
    },
    {
      title: "Materias",
      icon: "book-outline",
      link: "/materias"
    },
    {
      title: "Programas",
      icon: "award-outline",
      link: "/programas"
    },
    {
      title: "Alumnos",
      icon: "person-outline",
      link: "/alumnos",
      pathMatch: "full"
    },
    {
      title: "Nuevo Ingreso",
      icon: "person-add-outline",
      link: "/alumnos/nuevo"
    },
    {
      title: "Vuelos",
      icon: "paper-plane-outline",
      link: "/vuelos"
    },
    {
      title: "Cerrar Session",
      icon: "unlock-outline",
      link: "/"
    }
  ];

  public getMainMenu() {
    return this.items;
  }

  constructor() {}
}
