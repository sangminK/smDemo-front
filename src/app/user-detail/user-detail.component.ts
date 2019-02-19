import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  // server쪽 return값 User에서 Optional<User>로 수정
  // --> 바꾸고 나서 detail view 안보이는 것 해결
  user = new Object();
  // update
  userDto: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  // 뒤로가기
  goBack(): void {
    this.location.back();
  }

  // 삭제  
  deleteUser(id: number) {
    alert("delete ID : " + id)
     this.userService.deleteUser(id).subscribe();
     this.location.back();
  }

  // 수정
  updateUser(id: number, name: string, salary: number, status: number) {

    this.userDto.name = name
    this.userDto.salary = salary
    this.userDto.status = status

    this.userService.update(id, this.userDto).subscribe();

    // page reload
    alert("수정이 완료되었습니다.")
  }

}
