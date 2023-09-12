import { Component, OnInit } from '@angular/core';
import { BackService } from "../services/back/back.service"
import { Observable } from 'rxjs';
import CEP from '../interfaces/cep';


interface region { id: number, sigla: string, nome: string }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  CEP_mode: boolean = true

  cep: string = ""

  http_constructor?: Observable<CEP>
  http_cep2?: Observable<Array<CEP>>

  getRegion?: Observable<any>
  regions?: Array<region>

  api_return?: CEP[]
  api_str?: string

  state?: string
  city?: string
  street?: string


  constructor(public back: BackService) {
  }

  async ngOnInit() {
    this.getRegion = await this.back.GetByRegion()

    this.getRegion.subscribe((res: Array<region>) => {
      this.regions = res
      console.log(res)
    })
  }

  public async search() {

    this.cep = this.cep.replace(/\-/g, "")

    if (this.CEP_mode == true) {
      console.log(this.cep)
      this.http_constructor = await this.back.GetByCEP(this.cep, "json")
      this.http_constructor?.subscribe((res: CEP) => {
        console.log(res)
        this.api_return = [res]
        this.api_str = JSON.stringify(res)
        //console.log(new DOMParser().parseFromString(res, "text/xml"))
      })
    }
    else if (this.CEP_mode == false) {
      console.log(`${this.state}/${this.city}/${this.street}`)
      this.http_cep2 = await this.back.GetByCEP(`${this.state}/${this.city}/${this.street}`, "json")
      this.http_cep2?.subscribe((res: Array<CEP>) => {
        console.log(res)
        console.log("sub")
        this.api_return = res
        //this.api_str = JSON.stringify(res)
        //console.log(new DOMParser().parseFromString(res, "text/xml"))
      })
    }
  }
}
//"01001000"