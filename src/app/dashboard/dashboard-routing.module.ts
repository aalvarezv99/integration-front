import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AuthGuard } from '../auth.guard';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ManageEmployeesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class DashboardRoutingModule { }
