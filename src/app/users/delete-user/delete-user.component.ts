import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  userId = ''

  constructor(private userService: UserService,private activatedRoute: ActivatedRoute,private _snackbar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id']
      console.log(this.userId);
    })
    this.userService.deleteUser(this.userId).subscribe({
      next: data => {
        console.log(data);
        this._snackbar.open("user deleted successfully")
        this.router.navigate(['users/list']) // we can use "navigateByUrl" also.
        // this.router.navigateByUrl('http://localhost:4200/users/list');  // (WRONG) so if we put url with "Http://" all this then it will not work because url should be a part of route.
        // this.router.navigateByUrl('users/list') // (correct) it will work.
      },
      error: error=> {
        console.log(error);
        this._snackbar.open("unable to delete User")
      }
    })
  }

}
