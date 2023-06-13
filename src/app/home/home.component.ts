import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';

@Component({
  selector: 'home-app',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  filterResultsOnchange(text: any) {
    console.log('text:', text);
    // if (!text) {
    //   this.filteredLocationList = this.housingLocationList;
    // }

    // this.filteredLocationList = this.housingLocationList.filter(
    //   (housingLocation) =>
    //     housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    // );
  }

  // constructor() {
  // this.housingLocationList = this.housingService.getAllHousingLocations();
  // this.filteredLocationList = this.housingLocationList;

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .subscribe((housingLocationList: HousingLocation[]) => {
        console.log('housingLocationList:', housingLocationList);
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
}
