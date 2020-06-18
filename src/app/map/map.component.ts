import { Component, AfterViewInit, OnInit, Input } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import TileJSON from 'ol/source/TileJSON';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() profile: any = {};
  map: Map;

  constructor() { }

  ngAfterViewInit() {
    let mapCoordinates = [0, 0]
    if (this.profile.address) {
      mapCoordinates = this.profile.address.coordinates.split(', ');
      mapCoordinates = mapCoordinates.map(d => Number(d));
      mapCoordinates = fromLonLat(mapCoordinates)
    }
    console.log(mapCoordinates)

    const icon = this.getIcon(mapCoordinates);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        icon
      ],
      view: new View({
        center: mapCoordinates,
        zoom: 5
      })
    });
    this.map.updateSize();
  }

  getIcon(mapCoordinates){

    var iconFeature = new Feature({
      geometry: new Point(mapCoordinates),
    });

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        imgSize: [222, 227],
        scale: 0.1,
        src: '/assets/pointer.png'
      })
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new VectorSource({
      features: [iconFeature]
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource
    });

    return vectorLayer;
  }
}
