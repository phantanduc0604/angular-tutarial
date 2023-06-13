import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService  {
  // housingLocationList: HousingLocation[]
  url: string = 'https://6131b6187287b70017e641eb.mockapi.io/Products';

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this._http.get<HousingLocation[]>(this.url);
    // console.log('data:', data.json());
    // try{
    //   return await data.json()
    // }catch (err){
    //   console.log('err:', err)
    //   return []
    // }
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this._http.get<HousingLocation>(`${this.url}/${id}`);
    // const data = await fetch(`${this.url}/${id}`);
    // console.log('data:', data.json());
    // return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
    console.log({ firstName, lastName, email });
  }

  constructor(private _http: HttpClient) {}
}
