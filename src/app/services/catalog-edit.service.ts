import { Injectable } from '@angular/core';
import { CatalogService } from './catalog.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogEditService {

  constructor(private catalogService: CatalogService) { }

  public imageSelected(image: File, objectId: string): void {
    const uploadImage = new FormData();
    uploadImage.append("file", image, image.name);
    this.catalogService.createImage(uploadImage, objectId).subscribe();
  }
}
