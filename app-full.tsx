import React from 'react';
import { createRoot } from 'react-dom/client';

import { MapView } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { data } from './data-generated';

const MAX_ZOOM = 19;

const INITIAL_VIEW_STATE = {
    latitude: 0,
    longitude: 0,
    zoom: 5,
    maxZoom: 20,
    maxPitch: 89,
    bearing: 0,
};

/* global window */
const devicePixelRatio =
    (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

function getTooltip({ object }) {
    if (object) {
        const data =
            object?.Entity.MessageData.Kinematics.Position.FixedPositionType
                .FixedPoint;
        return `${data.Latitude}, ${data.Longitude}`;
    }
    return null;
}

// console.log(splitByQuadkey);

export default function App({ showBorder = false, onTilesLoad = null }) {
    const tileLayer = new TileLayer({
        // TilesetClass: QuadkeyTileset2D,
        // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
        data: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ],
        id: 'tile-layer',
        // Since these OSM tiles support HTTP/2, we can make many concurrent requests
        // and we aren't limited by the browser to a certain number per domain.
        maxRequests: 20,

        pickable: true,
        onViewportLoad: onTilesLoad,
        autoHighlight: showBorder,
        highlightColor: [60, 60, 60, 40],
        // https://wiki.openstreetmap.org/wiki/Zoom_levels
        minZoom: 0,
        maxZoom: MAX_ZOOM,
        tileSize: 512,
        zoomOffset: devicePixelRatio === 1 ? -1 : 0,
        renderSubLayers: (props) => {
            const {
                bbox: { west, south, east, north },
            } = props.tile;

            return [
                new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north],
                }),
                showBorder &&
                    new PathLayer({
                        id: `${props.id}-border`,
                        data: [
                            [
                                [west, north],
                                [west, south],
                                [east, south],
                                [east, north],
                                [west, north],
                            ],
                        ],
                        getPath: (d) => d,
                        getColor: [255, 0, 0],
                        widthMinPixels: 4,
                    }),
            ];
        },
    });

    const scatterplotLayer = new ScatterplotLayer({
        id: `scatterplot`,
        data: data,
        radiusScale: 1,
        radiusMinPixels: 5,
        radiusMaxPixels: 5,
        getRadius: 1,
        getPosition: (d) => {
            const { Latitude, Longitude } =
                d.Entity.MessageData.Kinematics.Position.FixedPositionType
                    .FixedPoint;
            return [Longitude, Latitude];
        },
        getFillColor: [255, 0, 128],
        pickable: true,
    });

    return (
        <DeckGL
            layers={[tileLayer, scatterplotLayer]}
            views={new MapView({ repeat: true })}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            getTooltip={getTooltip}
        ></DeckGL>
    );
}

export function renderToDOM(container) {
    createRoot(container).render(<App showBorder={true} />);
}
