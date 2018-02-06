import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';
import { NationModel } from './models/nation.model';
import { EmbassyModel } from './models/embassy.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  // GET list of public, future nations
  getNations$(): Observable<NationModel[]> {
    return this.http
      .get(`${ENV.BASE_API}nations`)
      .catch(this._handleError);
  }

  // GET all nations - private and public (admin only)
  getAdminNations$(): Observable<NationModel[]> {
    return this.http
      .get(`${ENV.BASE_API}nations/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET an nation by ID (login required)
  getNationById$(id: string): Observable<NationModel> {
    return this.http
      .get(`${ENV.BASE_API}nation/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET embassys by nation ID (login required)
  getEmbassysByNationId$(nationId: string): Observable<EmbassyModel[]> {
    return this.http
      .get(`${ENV.BASE_API}nation/${nationId}/embassys`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

}