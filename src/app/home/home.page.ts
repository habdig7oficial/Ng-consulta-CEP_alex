import { Component, OnInit } from '@angular/core';
import { BackService } from "../services/back/back.service"
import { Observable } from 'rxjs';
import CEP from '../interfaces/cep';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  CEP_mode: boolean = true

  cpf: string = ""

  http_constructor?: Observable<CEP>

  api_return?: CEP
  api_str?: string

  constructor(public back: BackService) {
  }

  async ngOnInit() {

  }

  public async search() {
    if (this.CEP_mode == true) {
      console.log(this.cpf)
      this.http_constructor = await this.back.GetByCEP(this.cpf, "json")
      this.http_constructor?.subscribe((res: CEP)=>{
        console.log(res)
        this.api_return = res
        this.api_str = JSON.stringify(res)
        //console.log(new DOMParser().parseFromString(res, "text/xml"))
      })
    }
    else if (this.CEP_mode == false){
      console.log(this.cpf)
      this.http_constructor = await this.back.GetByCEP(this.cpf, "json")
      this.http_constructor?.subscribe((res: CEP)=>{
        console.log(res)
        this.api_return = res
        this.api_str = JSON.stringify(res)
        //console.log(new DOMParser().parseFromString(res, "text/xml"))
      })
    }
  }
}
//"01001000"