import { switchMap, map } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './../models/employee';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() deleteEmployee: Employee;
  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  onDeleteEmployee(employeeId: number) {
    this.employeeService
      .deleteEmploye(employeeId)
      .pipe(
        switchMap((response) => {
          return this.employeeService.getEmployees();
        }),
        map((employees) => {
          this.employeeService.employeesChanged.next(employees);
        })
      )
      .subscribe((response) => {
        this.activeModal.close();
      });
  }
}
