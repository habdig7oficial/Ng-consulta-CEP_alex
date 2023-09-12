import { Component, OnInit } from '@angular/core';
import { BackService } from "../services/back/back.service"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public back: BackService) {
  }

  async ngOnInit() {
    let a = await this.back.GetByCEP("01001000", "xml")

    a?.subscribe((res)=>{
      console.log(res)
    })
  }
}
