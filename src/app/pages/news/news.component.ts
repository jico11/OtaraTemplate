import { Component, OnInit } from '@angular/core';
import { Upload } from 'app/services/uploads/shared/upload';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { Observable } from 'rxjs/Observable';
import { Post } from 'app/classes/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  //uploadsObservable: Observable<any[]>;
  uploadsObservable: Array<Post>;
  showSpinner = true;
  posts;
  keys: string[];
  constructor(private upSvc: UploadService,private router: Router) { }

  ngOnInit() {
    //this.uploadsObservable = this.upSvc.getUploadsLimit();
    
    //this.upSvc.getUploadsLimit().subscribe(res => {
    //  this.uploadsObservable = res.reverse();
    //  console.log(this.uploadsObservable);
    //});
    this.upSvc.getUploadsLimit()
    .subscribe(res => {
      this.posts = res.reverse();
       console.log(this.posts);
     });
   // console.log(this.upSvc.getUploadsLimit());
  }

  irNoticia(id){
    this.router.navigate(['/detalle-noticia/'+id]);
  }

  irNoticias(){
    this.router.navigate(['/noticia']);
  }
}
