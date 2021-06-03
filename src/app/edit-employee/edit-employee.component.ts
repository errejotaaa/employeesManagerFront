import { EmployeeService } from './../services/employee.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './../models/employee';
import { Component, OnInit, Input } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  @Input() editEmployee: Employee;

  constructor(
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}

  onUpdateEmployee(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const newEmployee: Employee = form.value;
    this.employeeService
      .updateEmploye(newEmployee)
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
