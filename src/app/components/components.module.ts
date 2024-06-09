import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavHeaderComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavHeaderComponent
  ]
})
export class ComponentsModule { }
