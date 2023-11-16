import {ChangeDetectionStrategy, Component, OnChanges, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../services/marker.service";
import {HeatmapService} from "../services/heatmap.service";
import {MarkerClusterService} from "../services/marker-cluster.service";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnChanges{
  private map: any;
  constructor(private markerService: MarkerService,
              private heatmapService: HeatmapService,
              private markerClusterService: MarkerClusterService) {
  }
  private initMap() {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  ngAfterViewInit() {
    this.initMap();
    //const markers = this.markerService.makeCapitalCircleMarkers(this.map);
    this.markerService.makeCapitalCircleMarkers(this.map);
    this.heatmapService.createHeatmapLayer(this.map);

    this.map.on('zoomend', () => {
      console.log(this.map.getZoom());
      if (this.map.getZoom() >= 5) {
        this.heatmapService.showHeatmap(this.map);
      }
      if (this.map.getZoom() < 5) {
        this.heatmapService.hideHeatmap(this.map);
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
