import { DeleteEmployeeComponent } from './../delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './../edit-employee/edit-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from './../models/employee';
import { Component, Input, OnInit } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSkype } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faSkype = faSkype;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  onOpenUpdateModal() {
    const modalref = this.modalService.open(EditEmployeeComponent);
    modalref.componentInstance.editEmployee = this.employee;
  }

  onOpenDeleteModal() {
    const modalref = this.modalService.open(DeleteEmployeeComponent);
    modalref.componentInstance.deleteEmployee = this.employee;
  }
}
