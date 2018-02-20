import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { NewsComponent } from './pages/news/news.component';
import { PanelComponent } from './pages/panel/panel.component';
import { CreatepostComponent } from './pages/panel/createpost/createpost.component';
import { EditpostComponent } from './pages/panel/editpost/editpost.component';
import { ContactService } from 'app/services/contact.service';
import { PanelService } from 'app/services/panel.service';
import { TinymceModule } from 'angular2-tinymce';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { PagerService } from 'app/services/pager.service';
import { EditorComponent } from './pages/panel/editor/editor.component';
import { NoticiaComponent } from './pages/noticias/noticia/noticia.component';
import { DetallenoticiaComponent } from './pages/noticias/detallenoticia/detallenoticia.component';

export const firebaseConfig = {
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    InformacionComponent,
    NewsComponent,
    PanelComponent,
    CreatepostComponent,
    EditpostComponent,
    EditorComponent,
    NoticiaComponent,
    DetallenoticiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    TinymceModule.withConfig({
      selector: 'textarea',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
      ],
      toolbar: 'undo redo | insert | styleselect | bold italic | fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview | forecolor backcolor emoticons',
      fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
      language: "es_MX"
    })
  ],
  providers: [
    ContactService,
    UploadService,
    PanelService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
