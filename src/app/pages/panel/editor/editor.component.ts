import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from 'app/classes/post';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PanelService } from 'app/services/panel.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  htmlText: string;
  showText: Boolean = true;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  form: FormGroup;
  post;//: Array<Post>;
  editPost: Post;
  saveId: string;
  saveTitle: string;
  alertaTitulo: Boolean = false;
  alertaNoticia: Boolean = false;
  alertaImagen: Boolean = false;
  constructor(private upSvc: UploadService, private links: Router, private router: ActivatedRoute, private _sanitizer: DomSanitizer, private _myCommunicationService: PanelService, fb: FormBuilder) { 
    // Subscribe to the service event
    _myCommunicationService.changeEmitted$.subscribe(myMessage => {
      this.showText = myMessage;
    });

    this.form = fb.group({
      editor: ['test'],
      titulo: ['test']
    });
  }
  
  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this.upSvc.getPost(id)
        .subscribe(res => {
          this.post = res;
          this.htmlText = this.post.contenido;
          this.saveId = id;
          this.saveTitle = this.post.titulo;
          this.form.controls['titulo'].patchValue(this.saveTitle);
          this.form.controls['editor'].patchValue(this.htmlText);
          
        });
    });
  }

  goBack(): void {
    // Emit your event with message
    this._myCommunicationService.emitChange(true);
    this.links.navigate(['/panel']);
  }

  patchValue() {
    if(this.form.controls['titulo'].value != ''){
      this.alertaTitulo = false;
    }else{
      this.alertaTitulo = true;
    }
    if(this.form.controls['editor'].value != ''){
      this.alertaNoticia = false;
    }else{
      this.alertaNoticia = true;
    }
    //if(this.selectedFiles == null){
    //  this.alertaImagen = true;
    //}else{
    //  this.alertaImagen = false;
    //}
    if(this.form.controls['titulo'].value != '' && this.form.controls['editor'].value != ''){
      this.post = {titulo: this.form.controls['titulo'].value, contenido: this.form.controls['editor'].value, $key:this.saveId};  
      //console.log(this.post);    
      //this.upSvc.updatePost(this.post)
      this._myCommunicationService.emitChange(true);
      this.links.navigate(['/panel']);
    }
  }

}
