import Map from 'ol/map';
import View from 'ol/view';
import Proj from 'ol/proj';
import LayerTile from 'ol/layer/tile';
import SourceOSM from 'ol/source/osm';
import coordinate from 'ol/coordinate';

import Popup from 'ol-popup';

var map = new Map({
    target: 'map',
    layers: [
        new LayerTile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new SourceOSM()
        })
    ],
    view: new View({
        center: Proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

var popup = new Popup();
map.addOverlay(popup);

map.on('singleclick', function(evt) {
    var prettyCoord = coordinate.toStringHDMS(Proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
});
