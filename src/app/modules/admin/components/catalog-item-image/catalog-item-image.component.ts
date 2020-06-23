import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from "src/app/models/Image";
@Component({
  selector: 'app-catalog-item-image',
  templateUrl: './catalog-item-image.component.html',
  styleUrls: ['./catalog-item-image.component.css']
})
export class CatalogItemImageComponent implements OnInit {

  @Input("image") image: Image = null;
  @Output("imageSelected") imageEmitter: EventEmitter<File> = new EventEmitter<File>();

  public url: string | ArrayBuffer = null;

  public showEditImageButton: boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.image) this.url = this.image.url;
  }

  public previewImage(file: File): void {

    if(file == null) return;

    let mimeType: string = file.type;

    if(!mimeType.match("image\/*")) {
      console.log("Must be an image");
      return;
    }

    let reader: FileReader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.url = reader.result;
      this.showEditImageButton = false;
      this.imageEmitter.emit(file);
    }

  }

  public toggleShowEditImageButton(): void {
    this.showEditImageButton = !this.showEditImageButton;
  }

}
