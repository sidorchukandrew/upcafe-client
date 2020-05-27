import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BugReport } from '../models/BugReport';
import { environment } from 'src/environments/environment';
import { FeatureRequest } from '../models/FeatureRequest';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  public submitBug(bug: BugReport): Observable<BugReport> {
    return this.http.post<BugReport>(environment.backendUrl + "/api/v1/bugs", bug);
  }

  public submitFeatureRequest(featureRequest: FeatureRequest): Observable<any> {
    return this.http.post(environment.backendUrl + "/api/v1/features", featureRequest);
  }
}
