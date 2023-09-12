import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  constructor(public http: HttpClient) { }

  public async GetByCEP(cep: string, protocol: "xml" | "json") {

    let ctype: "text" | "json"
    if (protocol == "xml") {
      ctype = "text"
    }
    else if (protocol == "json"){
      ctype = "json"
    }
    else {
      console.error("Sem Protocolop Fornecido")
      return
    }

    return this.http.request("GET", `https://viacep.com.br/ws/${cep}/${protocol}/`, { responseType: ctype }).pipe()
  }

}
