import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';

const URL = 'http://localhost:3000/upload';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    title = 'file upload for charlie!';

    message = "no message";

    inputEl :HTMLInputElement = this.el.nativeElement.querySelector('#photo');

    ngOnInit() {
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.message = response;
            this.uploader.clearQueue();
            console.log(item, response, status);
        };
    }
    
    constructor(private http: Http, private el: ElementRef) {

    }
    
    upload() {
        let inputEl: HTMLInputElement = this.inputEl;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { 
            formData.append('photo', inputEl.files.item(0));
            this.http.post(URL, formData).subscribe()
          }
          this.uploader.clearQueue();
       }
}