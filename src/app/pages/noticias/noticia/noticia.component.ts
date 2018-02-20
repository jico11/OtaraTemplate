import { Component, OnInit } from '@angular/core';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { Post } from 'app/classes/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {
  uploadsObservable: Array<Post>;
  posts;
  keys: string[];
  constructor(private upSvc: UploadService,private router: Router) { }

  ngOnInit() {
    //this.upSvc.getUploadsLimit().subscribe(res => {
    //  this.uploadsObservable = res.reverse();
    //});
    this.upSvc.getUploads()
    .subscribe(res => {
     this.posts = res;    
      this.keys = Object.keys(this.posts).reverse();
    });
  }

  irNoticia(id){
    this.router.navigate(['/detalle-noticia/'+id]);
  }

}
