import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from 'src/app/directives/sortable.directive';
import { Employee } from 'src/app/model/employees';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-manage-employees',
  standalone: true,
  imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, CommonModule],
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css'],
  providers: [EmployeeService, DecimalPipe],
})
export class ManageEmployeesComponent {
  employees$: Observable<Employee[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public employeeService: EmployeeService
  ) {
    this.employees$ = employeeService.employees$;
    this.total$ = employeeService.total$;
  }

}
