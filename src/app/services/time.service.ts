import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../models/Block';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient) { }

  public postBlock(block: Block, weekOf: string): any {
    return this.http.post("http://localhost:8080/cafe/hours", {
      block: block,
      weekOf: weekOf
    });
  }

  public getBlock(): any {
    return this.http.get("http://localhost:8080/cafe");
  }

  public getBlocks(week: string): any {
    return this.http.get("http://localhost:8080/cafe/hours", {
      params: {
        weekOf: week
      }
    });
  }
}
