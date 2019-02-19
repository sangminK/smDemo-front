import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // 전체 조회
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/user/listall')
  }

  // id로 한 개 조회
  getUser(id: number) {
    const url = environment.apiUrl + '/user/one/' + id
    //alert(url)
    return this.http.get(url);
  }


  // id로 삭제
  deleteUser(id: number): Observable<User[]> {

    const url = environment.apiUrl + '/user/deleteng/' + id
    alert(url)
    return this.http.delete<User[]>(url)

  }



  // 추가
  save(userDto: User) {

    const url = environment.apiUrl + '/user/adduser'
    return this.http.post(url, userDto)

  }

  // 수정
  update(id: number, userDto: User) {

    const url = environment.apiUrl + "/user/updateng/" + id
    return this.http.put(url, userDto)

  }

  // ** 조회 **

  // 키워드 검색

  // 검색1
  findBySalaryOrderByName(salary: number, order: number): Observable<User[]> {
    const url = environment.apiUrl + '/user/salary/' + salary + '/order/' + order
    return this.http.get<User[]>(url)
  }

  // 검색2
  findByStatusOrderByName(status: number, order: number): Observable<User[]> {
    const url = environment.apiUrl + '/user/status/' + status + '/order/' + order
    return this.http.get<User[]>(url)
  }

  // 검색3
  salaryGreaterLess(salary: number, greater: number) : Observable<User[]> {
    const url = environment.apiUrl + '/user/salary/' + salary + '/greater/' + greater
    return this.http.get<User[]>(url)
  }

  // 검색4
  salaryBetween(left: number, right: number) : Observable<User[]> {
    const url = environment.apiUrl + '/user/salary/' + left + '/between/' + right;
    return this.http.get<User[]>(url)
  }


  

  // like
  findByNameLike(name: string) : Observable<User[]> {
    const url = environment.apiUrl + '/user/like/' + name
    return this.http.get<User[]>(url)
  }

  // containing
  getByNameContaining(name: string) : Observable<User[]> {
    const url = environment.apiUrl + '/user/containing/' + name
    return this.http.get<User[]>(url)
  }

  // startingWith
  readByNameStartingWith(name: string) : Observable<User[]> {
    const url = environment.apiUrl + '/user/starting/' + name
    return this.http.get<User[]>(url)
  }


  // like Query
  findByNameLikeQuery(name: string) : Observable<User[]> {
    const url = environment.apiUrl + '/user/likeq/' + name
    return this.http.get<User[]>(url)
  }

}
