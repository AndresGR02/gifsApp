import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  buscar() {
    const valor = this.txtBuscar.nativeElement.value
    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = ''
  }

  constructor(
    private gifsService: GifsService
  ) {}
}
