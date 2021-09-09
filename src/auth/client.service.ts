import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class ClientService {

    constructor(private httpService: HttpService) {}

    findByEmail(email: string, type: string): Observable<any> {
        const url = type === 'CLIENT' ? 'http://localhost:3001/api/v1/client' : 'http://localhost:3001/api/v1/user';
        return this.httpService.get(`${url}/${email}`).pipe(
            map(response => response.data)
        );
    }

    validatePassword(email: string, password: String, type: string): Observable<any> {
        const body = {
            email: email,
            pass: password
        };
        const url = type === 'CLIENT' ? 'http://localhost:3001/api/v1/client' : 'http://localhost:3001/api/v1/user';
        return this.httpService.post(`${url}/validate`, body).pipe(
            map(response => response.data)
        );
    }
}