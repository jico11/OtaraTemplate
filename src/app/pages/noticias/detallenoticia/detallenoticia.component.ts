import { Component, OnInit } from '@angular/core';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detallenoticia',
  templateUrl: './detallenoticia.component.html',
  styleUrls: ['./detallenoticia.component.scss']
})
export class DetallenoticiaComponent implements OnInit {
  htmlText: string;
  showText: Boolean = true;
  post;
  saveId: string;
  saveTitle: string;
  constructor(private upSvc: UploadService, private links: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this.upSvc.getPost(id)
        .subscribe(res => {
          this.post = res;
          console.log(this.post);
          this.htmlText = this.post.contenido;
          this.saveId = id;
          this.saveTitle = this.post.titulo;          
        });
    });
  }

}
