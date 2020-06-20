import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private http: HttpClient, private catalogService: CatalogService) { }

  ngOnInit() {
  }

  protected imageSelected(image: File): void {
    const uploadImage = new FormData();

    uploadImage.append("file", image, image.name);

    const id: string = "NAIYGCK64UZ2CKCUTC77U6RG";

    this.catalogService.createImage(uploadImage, id).subscribe();
  }
}
