import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: []
})
export class DashboardModule { }
