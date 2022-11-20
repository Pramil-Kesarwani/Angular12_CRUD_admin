import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId = '';
  userDetails: any;
  editUserForm: FormGroup = new FormGroup({});
  dataLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.userId = params['id'];
    });
    this.userService.viewUser(this.userId).subscribe({
      next: (data) => {
        console.log(data);
        this.userDetails = data;

        this.editUserForm = this.formBuilder.group({
          userName: new FormControl(this.userDetails.name),
          email: new FormControl(this.userDetails.email),
          phoneNo: new FormControl(this.userDetails.phone),
        });
        this.dataLoaded = true; // we made a check for checking that formControl value is loaded or not. if we don't make this check then before data loaded, html form will load with empty values.
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  updateUser() {
    console.log(this.editUserForm.value);
    this.userService.editUser(this.userId, this.editUserForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this._snackbar.open('Data updated successfully');
        this.router.navigate(['users/list'])
      },
      error: (error) => {
        console.log(error);
      },
    });
   }
  
}
