import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../models/Block';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient) { }

  public postBlock(block: Block, weekOf: string): any {
    return this.http.post(environment.backendUrl + "/cafe/hours", {
      block: block,
      weekOf: weekOf
    });
  }

  public getBlock(): any {
    return this.http.get(environment.backendUrl + "/cafe");
  }

  public getBlocks(week: string): any {
    return this.http.get(environment.backendUrl + "/cafe/hours", {
      params: {
        weekOf: week
      }
    });
  }

  public updateBlock(block: Block, weekOf: string): any {
    return this.http.put(environment.backendUrl + "/cafe/hours", {
      block: block,
      weekOf: weekOf
    });
  }

  public deleteBlock(blockId: string, weekOf: string): any {
    return this.http.delete(environment.backendUrl + "/cafe/hours", {
      params: {
        weekOf: weekOf,
        blockId: blockId
      }
    });
  }
}
