import { Injectable } from '@angular/core';
import { CatalogService } from './catalog.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogEditService {

  constructor(private catalogService: CatalogService) { }

  protected imageSelected(image: File): void {
    const uploadImage = new FormData();

    uploadImage.append("file", image, image.name);

    const id: string = "NAIYGCK64UZ2CKCUTC77U6RG";

    this.catalogService.createImage(uploadImage, id).subscribe();
  }
}
