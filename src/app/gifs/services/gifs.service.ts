import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '5VoFEROZyKRsuB4vvhpjTvzP10lb0bB6'
  private _historial: string[] = []
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs'

  public resultados: Gifs[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    if(localStorage.getItem('historial'))
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string) {

    if(query.length === 0) {
      return 
    }
    if(!this._historial.includes(query)) {
      this._historial.unshift(query.trim().toLowerCase())
      this._historial = this._historial.splice(0,10)
  
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
    .set('api_key', this._apiKey)  
    .set('limit', '10')
    .set('q', query)

    this.http.get<SearchGifsResponse>(`${this._servicioURL}/search`, {params})
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }

  borrarHistorial() {
    this._historial = []
    this.resultados = []
    localStorage.removeItem('historial')
    localStorage.removeItem('resultados')
  }
}
