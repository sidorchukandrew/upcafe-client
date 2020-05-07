import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  public getCatalogBySection(category: string): Observable<any> {
    return this.http.get(environment.backendUrl + "/catalog", {
      params: {
        category: category,
      },
    });
  }

  public getVariation(id: string) {
    return this.http.get(environment.backendUrl + "/catalog/variations/" + id);
  }
}
