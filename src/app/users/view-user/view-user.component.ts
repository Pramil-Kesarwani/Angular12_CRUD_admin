import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  userId='';
  userDetails: any;

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.userId = params['id'];
    })
    
    this.userService.viewUser(this.userId).subscribe({
      next: data => {
        console.log(data);
        this.userDetails = data;
      }
    })
    
  }

}
