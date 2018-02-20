import { Component, OnInit } from '@angular/core';
import { Post } from 'app/classes/post';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { PagerService } from 'app/services/pager.service';
import { PanelService } from 'app/services/panel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  //posts: Array<Post>;
  posts;
  keys: string[];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(private upSvc: UploadService, private pagerService: PagerService,private _myCommunicationService: PanelService,private router: Router) { }

  ngOnInit() {
    var arr = [];
    this.upSvc.getUploads()
    .subscribe(res => {
     // this.posts = res.reverse();
     this.posts = res;     
      this.keys = Object.keys(this.posts).reverse();
      // initialize to page 1
      this.setPage(1);
    });
    
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    //this.pager = this.pagerService.getPager(this.posts.length, page);
    this.pager = this.pagerService.getPager(this.keys.length, page);

    // get current page of items
    //this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
   this.pagedItems = this.keys.slice(this.pager.startIndex, this.pager.endIndex + 1);;
  }

  goBack(): void {
    // Emit your event with message
    this._myCommunicationService.emitChange(true);
    this.router.navigate(['/panel']);

  }

}
