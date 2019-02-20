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

  login(password: string, userId: string) {

    // alert('login() call')

    // 헤더 설정
    const headers = new HttpHeaders({
      "Accept-Version": "1.0"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/auth/login",
      {
        password: password,
        userId: userId
      }
      ,
      { headers: headers }
    ).subscribe(
      res => {

        console.log(res);
        console.log("token1 : " + res.accessToken)
        sessionStorage.setItem('accessToken', res.accessToken)

      }
    )
    /////////////////////////////////////////////////////
  }

  getUserInfo(userNo: number) {

    // alert('getUserInfo() call')

    // 헤더 설정
    const headers = new HttpHeaders({
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/auth/userInfo",
      {
        userNo: userNo
      }
      ,
      { headers: headers }
    ).subscribe(
      res => {
        console.log(res);
        console.log("this"+res.message);
        console.log("token2 : " + sessionStorage.getItem('accessToken'))
      }
    )
  }

  getUserInfoParam(userNo: number) {
    // 헤더 설정
    const headers = new HttpHeaders({
      //  "userId" : "1",
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/auth/userInfo/"+userNo,
      {
        accessToken: "11111111-22222222-3333-444444444444"
      },
      { headers: headers }
    ).subscribe(
      res => {
        console.log(res);      
        // console.log(res.message);
        //  console.log("token2 : "+sessionStorage.getItem('accessToken'))
      }
    )
  }





  deleteUserApi(userNo: number) {
    //  alert("deleteUser()")
    const headers = new HttpHeaders({
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>("http://192.168.151.36:8080/rest/sample/deleteUser",
      {
        accessToken: "11111111-22222222-3333-444444444444",
        email: "smTest",
        password: "smTest",
        userId: "smTest",
        userName: "smTest",
        userNo: userNo
      },
      { headers: headers }).subscribe(
        res => {
          console.log(res)
         
        }
      );
  }

  registUser(email: string, password: string, userId: string, userName: string, userNo: number) {

    const headers = new HttpHeaders({
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/sample/registUser",
      {
        "accessToken": "11111111-22222222-3333-444444444444",
        "email": email,
        "password": password,
        "userId": userId,
        "userName": userName,
        "userNo": userNo
      }, { headers: headers }
    ).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  searchUser(email: string, password: string, userId: string, userName: string, userNo: number) {
    //  alert("searchUser")

    const headers = new HttpHeaders({
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/sample/searchUser",

      {
        accessToken: "11111111-22222222-3333-444444444444",
        "email": email,
        "password": password,
        "userId": userId,
        "userName": userName,
        "userNo": userNo

      }, { headers: headers }
    ).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  updateUser(email: string, password: string, userId: string, userName: string, userNo: number) {
    //  alert("updateUser()")

    const headers = new HttpHeaders({
      "Accept-Version": "1.0",
      "Access-Token": "11111111-22222222-3333-444444444444"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/sample/updateUser",

      {
        accessToken: "11111111-22222222-3333-444444444444",
        "email": email,
        "password": password,
        "userId": userId,
        "userName": userName,
        "userNo": userNo

      }, { headers: headers }
    ).subscribe(
      res => {

        console.log(res)
        console.log("this2 "+res.msg);
      }
    )

  }



  //////////////////////////////////////////////////////////////////////////////



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
  salaryGreaterLess(salary: number, greater: number): Observable<User[]> {
    const url = environment.apiUrl + '/user/salary/' + salary + '/greater/' + greater
    return this.http.get<User[]>(url)
  }

  // 검색4
  salaryBetween(left: number, right: number): Observable<User[]> {
    const url = environment.apiUrl + '/user/salary/' + left + '/between/' + right;
    return this.http.get<User[]>(url)
  }




  // like
  findByNameLike(name: string): Observable<User[]> {
    const url = environment.apiUrl + '/user/like/' + name
    return this.http.get<User[]>(url)
  }

  // containing
  getByNameContaining(name: string): Observable<User[]> {
    const url = environment.apiUrl + '/user/containing/' + name
    return this.http.get<User[]>(url)
  }

  // startingWith
  readByNameStartingWith(name: string): Observable<User[]> {
    const url = environment.apiUrl + '/user/starting/' + name
    return this.http.get<User[]>(url)
  }


  // like Query
  findByNameLikeQuery(name: string): Observable<User[]> {
    const url = environment.apiUrl + '/user/likeq/' + name
    return this.http.get<User[]>(url)
  }

}
