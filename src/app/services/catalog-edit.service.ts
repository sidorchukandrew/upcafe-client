import { Injectable } from '@angular/core';
import { CatalogService } from './catalog.service';
import { CatalogObject } from '../models/CatalogObject';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/MenuItem';
import { ModifierList } from '../models/ModifierList';
import { Modifier } from '../models/Modifier';

@Injectable({
  providedIn: 'root'
})
export class CatalogEditService {

  constructor(private catalogService: CatalogService) { }

  public imageSelected(image: File): void {
    const uploadImage = new FormData();

    uploadImage.append("file", image, image.name);

    const id: string = "NAIYGCK64UZ2CKCUTC77U6RG";

    this.catalogService.createImage(uploadImage, id).subscribe();
  }
}
