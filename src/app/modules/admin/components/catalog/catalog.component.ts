import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  protected imageSelected(image: File): void {
    const uploadImage = new FormData();

    uploadImage.append("file", image, image.name);

    this.http.post("http://192.168.0.3:8080/catalog/create-image", uploadImage, {
      reportProgress: true,
      observe: "events",
      params: { objectId: "NAIYGCK64UZ2CKCUTC77U6RG"}
    }).subscribe(events => console.log(events));
  }
}
