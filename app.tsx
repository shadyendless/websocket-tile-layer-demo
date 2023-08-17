import React from 'react';
import { createRoot } from 'react-dom/client';

import { MapView } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import tileMath from 'quadkey-tilemath';
import { data } from './data-generated';

// const MAX_CONNECTIONS = 12;
const MAX_ZOOM = 19;

// const sockets = Array.from({ length: MAX_CONNECTIONS }).map((_, i) => {
//     const socket = io(`http://localhost:4000`);
//     socket.on('reconnect', () => {
//         socket.emit('setid', i);
//     });

//     socket.on('connect', () => {
//         socket.emit('setid', i);
//     });

//     socket.on('message', (data) => {
//         console.log('response', data);
//     });

//     socket.on('newdata', (data) => {
//         console.log(`new data ${i}`, data);
//     });

//     return socket;
// });

var tileXYToQuadKey = function (tileX, tileY, levelOfDetail) {
    let quadKey = '';
    for (var i = levelOfDetail; i > 0; i--) {
        var digit = 0;
        var mask = 1 << (i - 1);

        if ((tileX & mask) != 0) {
            digit++;
        }
        if ((tileY & mask) != 0) {
            digit++;
            digit++;
        }
        quadKey += digit;
    }
    return quadKey;
};

const INITIAL_VIEW_STATE = {
    latitude: 0,
    longitude: 0,
    zoom: 5,
    maxZoom: 20,
    maxPitch: 89,
    bearing: 0,
};

const splitByQuadkey = {};

data.forEach((d) => {
    const { Latitude, Longitude } =
        d.Entity.MessageData.Kinematics.Position.FixedPositionType.FixedPoint;
    Array.from({ length: MAX_ZOOM }).forEach((_, i) => {
        const quadKey = tileMath.pointToQuadkey(Longitude, Latitude, i);
        if (!splitByQuadkey[quadKey]) {
            splitByQuadkey[quadKey] = [];
        }
        splitByQuadkey[quadKey].push(d);
    });
});

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
            const { x, y, z } = props.tile.index;
            const quadkey = tileXYToQuadKey(x, y, z);

            return [
                new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north],
                }),
                splitByQuadkey[quadkey]?.length &&
                    new ScatterplotLayer(props, {
                        id: `${quadkey}-scatterplot`,
                        data: splitByQuadkey[quadkey] || [],
                        radiusScale: 1,
                        radiusMinPixels: 5,
                        radiusMaxPixels: 5,
                        getRadius: 1,
                        getPosition: (d) => {
                            const { Latitude, Longitude } =
                                d.Entity.MessageData.Kinematics.Position
                                    .FixedPositionType.FixedPoint;
                            return [Longitude, Latitude];
                        },
                        getFillColor: [255, 0, 128],
                        pickable: true,
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

    // const websocketLayer = new TileLayer({
    //     // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    //     data: [
    //         'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //         'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //         'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     ],
    //     id: 'websocket-layer',
    //     // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    //     // and we aren't limited by the browser to a certain number per domain.
    //     maxRequests: 20,

    //     pickable: true,
    //     onViewportLoad: onTilesLoad,
    //     // https://wiki.openstreetmap.org/wiki/Zoom_levels
    //     minZoom: 0,
    //     maxZoom: 12,
    //     maxCacheSize: 1,
    //     tileSize: 1024,
    //     zoomOffset: devicePixelRatio === 1 ? -1 : 0,
    //     getTileData: () => {
    //         return false;
    //     },
    //     refinementStrategy: (tiles) => {
    //         const activeTiles = tiles.filter((t) => t.isVisible);
    //         const mergedTiles = [
    //             ...activeTiles,
    //             ...Array.from({
    //                 length: MAX_CONNECTIONS - activeTiles.length,
    //             }).map(() => ({
    //                 _bbox: null,
    //             })),
    //         ];

    //         mergedTiles.forEach((tile, idx) => {
    //             console.log(`emitting on ${idx}`, tile._bbox);
    //             if (!tile._bbox) {
    //                 sockets[idx].emit('RESET', 'BOUNDING_BOX');
    //             } else {
    //                 sockets[idx].emit('SET_BBOX', [
    //                     tile._bbox.west,
    //                     tile._bbox.north,
    //                     tile._bbox.east,
    //                     tile._bbox.south,
    //                 ]);
    //             }
    //         });
    //     },
    // });

    return (
        <DeckGL
            layers={[
                tileLayer,
                // websocketLayer
            ]}
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
