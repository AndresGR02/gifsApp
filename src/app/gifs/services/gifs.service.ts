import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '5VoFEROZyKRsuB4vvhpjTvzP10lb0bB6'
  private _historial: string[] = []

  public resultados: any[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {

    if(query.length === 0) {
      return 
    }
    if(this._historial.includes(query)) {
      return 
    }
    this._historial.unshift(query.trim().toLowerCase())
    this._historial = this._historial.splice(0,10)

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=5VoFEROZyKRsuB4vvhpjTvzP10lb0bB6&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        this.resultados = resp.data
      })
  }
}
