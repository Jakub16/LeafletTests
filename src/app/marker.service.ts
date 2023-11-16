import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as L from 'leaflet';
import { PopupService } from "./popup.service";
import 'leaflet.markercluster';
import 'leaflet.heat';
import {LatLng} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private capitals: string = '/assets/data/usa-capitals.geojson';
  private markers: LatLng[] = [];
  constructor(private http: HttpClient,
              private popupService: PopupService) { }

  static scaledRadius(val: number, maxVal: number) {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.Map) {

    this.http.get(this.capitals).subscribe((data: any) => {
      for (const city of data.features) {
        const lon = city.geometry.coordinates[0];
        const lat = city.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
    })
  }

  makeCapitalCircleMarkers(map: L.Map) {
    let layerGroup = L.layerGroup();

    this.http.get(this.capitals).subscribe((data: any) => {
      const maxPopulation = Math.max(...data.features.map((item: { properties: { population: any; }; }) => item.properties.population, 0))
      for (const city of data.features) {
        const lon = city.geometry.coordinates[0];
        const lat = city.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(city.properties.population, maxPopulation)
        });
        this.markers.push(new L.LatLng(lat, lon));

        circle.bindPopup(this.popupService.createCapitalPopup(city.properties));
        circle.addTo(layerGroup);
      }

      map.addLayer(layerGroup);
    })
  }

  getMarkers(): LatLng[] {
    return this.markers;
  }
}
