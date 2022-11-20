import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

// interface
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// const ELEMENT_DATA: User[] = [];


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  // dataSource = ELEMENT_DATA;

  listUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.listUsers = data;
        console.log("listUser value---" , this.listUsers);
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
