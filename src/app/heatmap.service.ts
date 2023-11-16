import { Injectable } from '@angular/core';
import * as L from "leaflet";
import { MarkerService } from "./marker.service";

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  private heatLayer: any;
  constructor(private markerService: MarkerService) { }

  createHeatmapLayer(map: L.Map) {
    this.heatLayer = L.heatLayer(this.markerService.getMarkers(), {
      radius: 30,
      gradient: {0.4: 'green', 0.65: 'yellow', 1: 'red'},
      minOpacity: 0.6
    })

    map.addLayer(this.heatLayer);
  }

  showHeatmap(map: L.Map) {
    map.addLayer(this.heatLayer);
  }
  hideHeatmap(map: L.Map) {
    map.removeLayer(this.heatLayer);
  }
}
