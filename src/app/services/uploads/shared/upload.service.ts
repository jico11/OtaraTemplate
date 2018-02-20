import { Injectable } from '@angular/core';
import{ AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from 'app/services/uploads/shared/upload';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  basePath = 'uploads';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<any[]>;
  //uploads: AngularFireList<any>;
  post: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }
  
  getUploadsLimit() {
    /*this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });*/
    this.uploads = this.db.list(this.basePath,ref => ref.limitToLast(3)).valueChanges();
    /*this.uploads.subscribe(res => {
      console.log(res);
     });*/
    /*firebase.database().ref(this.basePath).limitToLast(3).on('value', function(snapshot) {      
      //console.log(snapshot.val());
      var datos = snapshot.val();
      //console.log(datos.val);
      return snapshot.val();
    });*/
    //console.log(this.uploads);
    return this.uploads;
  }

  getUploads1() {
    this.uploads = this.db.list(this.basePath).valueChanges();   
    //console.log(this.uploads);
    return this.uploads;
  }

  getUploads() {
    /*this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });*/
    //this.uploads = this.db.list(this.basePath).valueChanges();
    //quitado 20-02-2018 this.uploads = this.db.list(this.basePath).snapshotChanges().map(uploads => {return uploads.map(uploads => ({key:uploads.key}))});
    //console.log(this.uploads);
    return this.db.object(this.basePath).valueChanges();
    //console.log(this.uploads.map);
    //return this.uploads;
  }

  getPost(id){
    //this.uploads = this.db.list(this.basePath+'/'+id).valueChanges();
    return this.db.object(this.basePath+'/'+id).valueChanges();
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch((error) => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    var key = this.db.list(`${this.basePath}/`).push(upload).key;
    this.db.object(`${this.basePath}/`+key).update({key:key});
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  // Actualiza al editar algun post
  updatePost(upload: Upload){
    this.db.object(`${this.basePath}/`+upload.$key).update({titulo:upload.titulo,contenido:upload.contenido});
  }
}