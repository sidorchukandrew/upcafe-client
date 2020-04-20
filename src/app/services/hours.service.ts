import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Block } from "../models/Block";
import { environment } from "src/environments/environment";
import { PickupSettings } from "../models/PickupSettings";
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class HoursService {
  constructor(private http: HttpClient) {}

  public postBlock(block: Block, weekOf: string): any {
    return this.http.post(environment.backendUrl + "/cafe/hours", {
      block: block,
      weekOf: weekOf,
    });
  }

  public getBlocks(week: string): any {
    return this.http.get(environment.backendUrl + "/cafe/hours", {
      params: {
        weekOf: week,
      },
    });
  }

  public updateBlock(block: Block, weekOf: string): any {
    return this.http.put(environment.backendUrl + "/cafe/hours", {
      block: block,
      weekOf: weekOf,
    });
  }

  public deleteBlock(blockId: string, weekOf: string): any {
    return this.http.delete(environment.backendUrl + "/cafe/hours", {
      params: {
        weekOf: weekOf,
        blockId: blockId,
      },
    });
  }

  public getBlocksForDay(day: string): Observable<any> {
    return this.http.get<Block[]>(environment.backendUrl + "/cafe/hours", {
      params: {
        day: day,
      },
    });
  }

  public getAvailablePickupTimes(): Observable<any> {
    return this.http.get<Block[]>(environment.backendUrl + "/cafe/pickup")
    .pipe(
      shareReplay()
    );
  }

  public getPickupSettings(): any {
    return this.http.get<PickupSettings>(
      environment.backendUrl + "/cafe/settings/pickup"
    );
  }

  public updatePickupSettings(settings: PickupSettings): any {
    return this.http.put(environment.backendUrl + "/cafe/settings/pickup", settings);
  }
}
