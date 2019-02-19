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

  connectTest(password: string, userId: string) {
    // {
    //   "password": "string",
    //   "userId": "string"
    // }

    // this.http.post<any>(environment.testUrl+'/auth/login',{
    //   "password": password,
    //    "userId": userId
    // }).subscribe()
    alert('connectTest() call')


    // 헤더 설정
    const headers = new HttpHeaders({
      "Accept-Version": "1.0"
    });

    this.http.post<any>(
      "http://192.168.151.36:8080/rest/auth/login", 
      {
        password: "12234",
        userId: "momomo808"
      }
      ,
      {headers : headers}
      ).subscribe(
      res => {
         console.log(res);
        //alert(res)
        //alert(res.json().access_token)
      }
    )
  
    // const params = new FormData();
    // params.append('username', username);
    // params.append('password', password);
    // params.append('grant_type', 'password');
    // // params.append('client_id', environment.clientId);

    // // btoa() --> 인코딩
    // const headers = new Headers({'Authorization': 'Basic '
    //   + btoa(environment.clientId + ':' + environment.clientSecret)});
    // // console.log('Basic ' + btoa(environment.clientId + ':' + environment.clientSecret));
    
    // //alert("headers = "+headers.toJSON)

    // // 가이아 로그인 페이지 : environment.securityUrl 
    // this.http.post(environment.securityUrl + '/oauth/token', params, { headers : headers} )
    // .subscribe(
    //   response => {
    //     //////////////
    //     sessionStorage.setItem('access_token', response.json().access_token);

    /////////////////////////////////////////////////////
  }
  

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
