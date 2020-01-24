import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbActionsModule,
  NbIconModule,
  NbMenuModule,
  NbToastrModule,
  NbDatepickerModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { ComponentsModule } from "./components/components.module";
import { PagesModule } from "./pages/pages.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbActionsModule,
    NbSidebarModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbIconModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot({ name: "default" })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
