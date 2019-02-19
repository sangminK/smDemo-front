import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User = new User()

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  userAdd(name: string, salary: number, status: number) {

    //alert("user add = " + name + salary + status)
    this.user.name = name
    this.user.salary = salary
    this.user.status = status
    this.userService.save(this.user).subscribe();

    this.router.navigate(['']);

  }

}
