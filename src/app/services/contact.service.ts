import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../classes/post';

@Injectable()
export class ContactService {

  result: any;

  constructor(private _http: Http) { }
  getPosts() {
    return this._http.get("/api/posts")
      .map(result => this.result = result.json());
  }

//  getPost(id) {
//    return this._http.get("/api/details/" + id)
//      .map(result => this.result = result.json());
//  }

/* en post se tiene que colocar la direccion de donde apunta el server de conexion */
  createPost(post: Post) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('http://localhost:80/api/posts', JSON.stringify(post), options)
      .map(result => this.result = result.json());
  }

  editPost(post: Post) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return this._http.put('/api/post/' + post._id, JSON.stringify(post), options)
   //   .map(result => this.result = result.json());
  }

  getExcel() {
    return this._http.get("/api/excel")
      .map(result => this.result = result);
  }

}