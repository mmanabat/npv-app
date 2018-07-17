import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NPVDataRequest, NPVRequest } from 'src/app/npv-calculator/cashFlow.model';

@Injectable()
export class NpvService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    getChartData(data: NPVDataRequest): Observable<any> {
        return this.http.post('https://localhost:5001/api/npv/getChartData', data, this.httpOptions);
    }

    getNpv(data: NPVRequest): Observable<any> {
        return this.http.post('https://localhost:5001/api/npv/getNpv', data, this.httpOptions);
    }
}
