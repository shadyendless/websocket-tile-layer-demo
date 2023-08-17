export class TileSystem {
    constructor() {
        this.EarthRadius = 6378137;
        this.MinLatitude = -85.05112878;
        this.MaxLatitude = 85.05112878;
        this.MinLongitude = -180;
        this.MaxLongitude = 180;
    }

    clip(n, minValue, maxValue) {
        return Math.min(Math.max(n, minValue), maxValue);
    }

    MapSize(levelOfDetail) {
        return 256 << levelOfDetail;
    }

    GroundResolution(latitude, levelOfDetail) {
        latitude = this.clip(latitude, this.MinLatitude, this.MaxLatitude);
        return (
            (Math.cos((latitude * Math.PI) / 180) *
                2 *
                Math.PI *
                this.EarthRadius) /
            this.MapSize(levelOfDetail)
        );
    }

    MapScale(latitude, levelOfDetail, screenDpi) {
        return (
            this.GroundResolution(latitude, levelOfDetail) *
            (screenDpi / 0.0254)
        );
    }

    LatLongToPixelXY(latitude, longitude, levelOfDetail) {
        latitude = this.clip(latitude, this.MinLatitude, this.MaxLatitude);
        longitude = this.clip(longitude, this.MinLongitude, this.MaxLongitude);

        const x = (longitude + 180) / 360;
        const sinLatitude = Math.sin((latitude * Math.PI) / 180);
        const y =
            0.5 -
            Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

        const mapSize = this.MapSize(levelOfDetail);
        const pixelX = this.clip(x * mapSize + 0.5, 0, mapSize - 1);
        const pixelY = this.clip(y * mapSize + 0.5, 0, mapSize - 1);

        return { pixelX: pixelX, pixelY: pixelY };
    }

    PixelXYToLatLong(pixelX, pixelY, levelOfDetail) {
        const mapSize = this.MapSize(levelOfDetail);
        const x = this.clip(pixelX, 0, mapSize - 1) / mapSize - 0.5;
        const y = 0.5 - this.clip(pixelY, 0, mapSize - 1) / mapSize;

        const latitude =
            90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI;
        const longitude = 360 * x;

        return { latitude: latitude, longitude: longitude };
    }

    PixelXYToTileXY(pixelX, pixelY) {
        return {
            tileX: Math.floor(pixelX / 256),
            tileY: Math.floor(pixelY / 256),
        };
    }

    TileXYToPixelXY(tileX, tileY) {
        return { pixelX: tileX * 256, pixelY: tileY * 256 };
    }

    TileXYToQuadKey(tileX, tileY, levelOfDetail) {
        let quadKey = '';
        for (let i = levelOfDetail; i > 0; i--) {
            let digit = '0';
            const mask = 1 << (i - 1);
            if ((tileX & mask) !== 0) {
                digit = String.fromCharCode(digit.charCodeAt(0) + 1);
            }
            if ((tileY & mask) !== 0) {
                digit = String.fromCharCode(digit.charCodeAt(0) + 2);
            }
            quadKey += digit;
        }
        return quadKey;
    }

    QuadKeyToTileXY(quadKey) {
        let tileX = 0;
        let tileY = 0;
        const levelOfDetail = quadKey.length;
        for (let i = levelOfDetail; i > 0; i--) {
            const mask = 1 << (i - 1);
            switch (quadKey[levelOfDetail - i]) {
                case '0':
                    break;

                case '1':
                    tileX |= mask;
                    break;

                case '2':
                    tileY |= mask;
                    break;

                case '3':
                    tileX |= mask;
                    tileY |= mask;
                    break;

                default:
                    throw new Error('Invalid QuadKey digit sequence.');
            }
        }
        return { tileX: tileX, tileY: tileY, levelOfDetail: levelOfDetail };
    }
}
