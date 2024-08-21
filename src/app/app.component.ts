import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  /*
   * Função dedicada a somar dois numeros
   */
  add(a: number, b: number) {
    return a + b;
  }
}
