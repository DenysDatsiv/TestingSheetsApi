import { Injectable } from '@angular/core';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private readonly SHEET_ID = '1o5Z9VLbnoujK9T5XxaN6ZRQQGrq5_Ous6Z8xR40n7XI';
  private doc: GoogleSpreadsheet;
  private secret: any;

  constructor(private http: HttpClient) {
    this.doc = new GoogleSpreadsheet(this.SHEET_ID);
  }

  public getData(): Observable<any[]> {
    return from(this.init()).pipe(
      switchMap(() => this.doc.sheetsByIndex[0].getRows()),
      map((rows: any[]) => rows.map((row) => row._rawData))
    );
  }

  private init(): Observable<void> {
    return this.http.get<any>('./secret.json').pipe(
      switchMap((secret: any) => {
        this.secret = secret;
        return from(
          this.doc.useServiceAccountAuth({
            client_email: this.secret.client_email,
            private_key: this.secret.private_key,
          })
        );
      }),
      switchMap(() => from(this.doc.loadInfo()))
    );
  }
}
