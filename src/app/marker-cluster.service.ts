import { Injectable } from '@angular/core';
import * as L from "leaflet";
import { MarkerService } from "./marker.service";


@Injectable({
  providedIn: 'root'
})
export class MarkerClusterService {

  constructor(private markerService: MarkerService) { }

  createCluster(map: L.Map) {
    let markerClusterGroup = L.markerClusterGroup({
      animate: true,
      animateAddingMarkers: true,
      disableClusteringAtZoom: 5
      // iconCreateFunction: function(cluster) {
      //   return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
      // }
    });

    map.addLayer(markerClusterGroup)
  }
}
