class TileSystem {
    private readonly EarthRadius: number = 6378137;
    private readonly MinLatitude: number = -85.05112878;
    private readonly MaxLatitude: number = 85.05112878;
    private readonly MinLongitude: number = -180;
    private readonly MaxLongitude: number = 180;

    private clip(n: number, minValue: number, maxValue: number): number {
        return Math.min(Math.max(n, minValue), maxValue);
    }

    public MapSize(levelOfDetail: number): number {
        return 256 << levelOfDetail;
    }

    public GroundResolution(latitude: number, levelOfDetail: number): number {
        latitude = this.clip(latitude, this.MinLatitude, this.MaxLatitude);
        return (
            (Math.cos((latitude * Math.PI) / 180) *
                2 *
                Math.PI *
                this.EarthRadius) /
            this.MapSize(levelOfDetail)
        );
    }

    public MapScale(
        latitude: number,
        levelOfDetail: number,
        screenDpi: number
    ): number {
        return (
            this.GroundResolution(latitude, levelOfDetail) *
            (screenDpi / 0.0254)
        );
    }

    public LatLongToPixelXY(
        latitude: number,
        longitude: number,
        levelOfDetail: number
    ): { pixelX: number; pixelY: number } {
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

    public PixelXYToLatLong(
        pixelX: number,
        pixelY: number,
        levelOfDetail: number
    ): { latitude: number; longitude: number } {
        const mapSize = this.MapSize(levelOfDetail);
        const x = this.clip(pixelX, 0, mapSize - 1) / mapSize - 0.5;
        const y = 0.5 - this.clip(pixelY, 0, mapSize - 1) / mapSize;

        const latitude =
            90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI;
        const longitude = 360 * x;

        return { latitude: latitude, longitude: longitude };
    }

    public PixelXYToTileXY(
        pixelX: number,
        pixelY: number
    ): { tileX: number; tileY: number } {
        return {
            tileX: Math.floor(pixelX / 256),
            tileY: Math.floor(pixelY / 256),
        };
    }

    public TileXYToPixelXY(
        tileX: number,
        tileY: number
    ): { pixelX: number; pixelY: number } {
        return { pixelX: tileX * 256, pixelY: tileY * 256 };
    }

    public TileXYToQuadKey(
        tileX: number,
        tileY: number,
        levelOfDetail: number
    ): string {
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

    public QuadKeyToTileXY(quadKey: string): {
        tileX: number;
        tileY: number;
        levelOfDetail: number;
    } {
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
