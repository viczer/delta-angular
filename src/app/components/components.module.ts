import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrandComponent } from "./shared/brand/brand.component";
import { UserComponent } from "./shared/user/user.component";
import {
  NbIconModule,
  NbUserModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NavbarComponent } from "./navbar/navbar.component";
import { VerticalBrandComponent } from "./shared/vertical-brand/vertical-brand.component";
import { UploadComponent } from "./shared/upload/upload.component";

@NgModule({
  declarations: [
    BrandComponent,
    UserComponent,
    NavbarComponent,
    VerticalBrandComponent,
    UploadComponent
  ],
  exports: [
    BrandComponent,
    UserComponent,
    NavbarComponent,
    VerticalBrandComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule
  ]
})
export class ComponentsModule {}
