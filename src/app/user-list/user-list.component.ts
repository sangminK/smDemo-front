import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  users: User[];
  user = new Object();   // server쪽 return값 User에서 Optional<User>로 수정
  // --> 바꾸고 나서 detail view 안보이는 것 해결

  constructor(private userService: UserService, private router: Router) { }

  password: string;
  userId: string;

  ngOnInit() {

    // this.password = "12234";
    // this.userId = "momomo808";
    

    this.login("12234",  "momomo808");
    this.getUserInfo(1);
    this.getUserInfoParam(1);

    this.deleteUserApi(0);
    this.registUser("sm","sm","sm","sm",11);
    this.searchUser("sm","sm","sm","sm",11);
    this.updateUser("sm","sm","sm","sm",11);
  }

  // auth-controller
  login(password: string, userId: string) {
    this.userService.login(password, userId)
  }

  getUserInfo(userNo: number) {
    this.userService.getUserInfo(userNo)
  }

  getUserInfoParam(userNo: number) {
    this.userService.getUserInfoParam(userNo)
  }


  // sample-controller
  deleteUserApi(userNo: number) {
    this.userService.deleteUserApi(userNo)
  }

  registUser(email: string, password: string, userId: string, userName: string, userNo: number) {
    this.userService.registUser(email, password, userId, userName, userNo)
  }
  searchUser(email: string, password: string, userId: string, userName: string, userNo: number) {
    this.userService.searchUser(email, password, userId, userName, userNo)
  }

  updateUser(email: string, password: string, userId: string, userName: string, userNo: number) {
    this.userService.updateUser(email, password, userId, userName, userNo)
  }



  ///////////////////////////////////////////////////////

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  getUsers() {
    return this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users
        }
      );
  }


  // 삭제
  deleteUser(id: number) {
    //alert(id)
    this.userService.deleteUser(id).subscribe();
    this.refresh()
  }



  // 검색1
  findBySalaryOrderByName(salary: number, order: number) {
    //alert(salary + "."+order)
    this.userService.findBySalaryOrderByName(salary, order).subscribe(
      res => { this.users = res }
    );
  }

  // 검색2
  findByStatusOrderByName(status: number, order: number) {
    this.userService.findByStatusOrderByName(status, order).subscribe(
      res => { this.users = res }
    );
  }

  // 검색3 (salary N 이상/이하)
  salaryGreaterLess(salary: number, greater: number) {
    this.userService.salaryGreaterLess(salary, greater).subscribe(
      res => { this.users = res }
    )
  }

  // 검색4
  salaryBetween(left: number, right: number) {
    this.userService.salaryBetween(left, right).subscribe(
      res => { this.users = res }
    )
  }

  // 키워드 검색
  searchKeyword(keyword: string) {

    this.userService.getUsers().subscribe(
      res => {
        let tmp = null;
        tmp = res.filter(function (item) {
          if (item.name.includes(keyword)) {
            return true;
          }
          else {
            return false;
          }
        })
        this.users = tmp;
      }
    )
  }

  // like
  findByNameLike(name: string) {
    this.userService.findByNameLike(name).subscribe(
      res => { this.users = res }
    )
  }


  // containing
  getByNameContaining(name: string) {
    alert(name)
    this.userService.getByNameContaining(name).subscribe(
      res => { this.users = res }
    )
  }

  // startingWith
  readByNameStartingWith(name: string ){
    this.userService.readByNameStartingWith(name).subscribe(
      res => { this.users = res }
    )
  }

  // like Query
  findByNameLikeQuery(name: string) {
    this.userService.findByNameLikeQuery(name).subscribe(
      res => { this.users = res }
    )
  }


  refresh() {
    window.location.reload();
  }
}
