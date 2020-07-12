import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Block } from "../models/Block";
import { environment } from "src/environments/environment";
import { PickupSettings } from "../models/PickupSettings";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { shareReplay, retry, catchError, tap } from "rxjs/operators";
import { PickupTime } from '../models/PickupTime';

@Injectable({
  providedIn: "root",
})
export class HoursService {

  private availablePickupTimes: BehaviorSubject<Array<PickupTime>> = new BehaviorSubject(null);
  private availablePickupTimes$: Observable<Array<PickupTime>> = this.availablePickupTimes.asObservable();

  constructor(private http: HttpClient) {}

  public postBlock(block: Block, weekOf: string): any {
    return this.http.post(environment.backendUrl + "/cafe/hours", block, {
      params: {weekOf: weekOf}
    });
  }

  public getBlocks(week: string): any {
    return this.http
      .get(environment.backendUrl + "/cafe/hours", {
        params: {
          weekOf: week,
        },
      })
      .pipe(
        catchError((error) => {
          console.log("IN hours service : ", error);
          return throwError(error + "");
        })
      );
  }

  public updateBlock(block: Block): any {
    return this.http.put(environment.backendUrl + "/cafe/hours", block);
  }

  public deleteBlock(blockId: string): any {
    return this.http.delete(environment.backendUrl + "/cafe/hours", {
      params: {
        blockId: blockId,
      },
    });
  }

  public getBlocksForDay(day: string): Observable<Block[]> {
    return this.http.get<Block[]>(environment.backendUrl + "/cafe/hours", {
      params: {
        day: day,
      },
    });
  }

  public getAvailablePickupTimes(): Observable<Array<PickupTime>> {
    if(this.availablePickupTimes.value == null) {
      this.loadAvailablePickupTimesFromApi();
    }

    return this.availablePickupTimes$;
  }

  public loadAvailablePickupTimesFromApi(): Observable<Array<PickupTime>> {
     return this.http.get<Array<PickupTime>>(environment.backendUrl + "/cafe/hours", {
        params: { search: "available"}
      })
      .pipe(
        tap(times => this.availablePickupTimes.next(times))
      );
  }

  public getPickupSettings(): Observable<PickupSettings> {
    return this.http.get<PickupSettings>(
      environment.backendUrl + "/cafe/settings/pickup"
    );
  }

  public updatePickupSettings(settings: PickupSettings): Observable<PickupSettings> {
    return this.http.put<PickupSettings>(
      environment.backendUrl + "/cafe/settings/pickup",
      settings
    );
  }
}
