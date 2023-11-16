import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster.layersupport';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkerClusterService {

  constructor() { }

  createCluster(map: L.Map, markerGroup: any) {
    const markerClusterGroup = L.markerClusterGroup({
      animate: true,
      animateAddingMarkers: true,
      disableClusteringAtZoom: 6,
      singleMarkerMode: true
      // iconCreateFunction: function(cluster) { implement showing sum of transactions (population here) instead of number of childs
      //   return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
      // }
    });
    markerClusterGroup.addLayer(markerGroup);
    map.addLayer(markerClusterGroup);
  }
}
