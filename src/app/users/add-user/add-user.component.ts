import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  
  addUserForm: FormGroup = new FormGroup({}); // declaring a reactive form of FormGroup.

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    });
  }

  createUser() {
    console.log(this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this._snackbar.open('User Added Successfully');
        this.router.navigate(['/users/list']);
      },
      error: (error) => {
        console.log(error);
        this._snackbar.open('Unable to add User');
      },
    });
  }
}
