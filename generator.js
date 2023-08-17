const fs = require('fs');

const pointsToGenerate = 100000;

let results = [];
results.push('export const data = [');

for (i = 0; i < pointsToGenerate; i++) {
    let multiplier = 10000;
    let latitude = (Math.random() * (90 * multiplier)) / multiplier;
    let longitude = (Math.random() * (180 * multiplier)) / multiplier;
    latitude *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    longitude *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    results.push(`    {
        Entity: {
            MessageData: {
                Kinematics: {
                    Position: {
                        FixedPositionType: {
                            FixedPoint: {
                                Latitude: ${latitude},
                                Longitude: ${longitude},
                                Altitude: 35218.8023,
                                Timestamp: '2022-09-13T22:34:24.5932Z',
                                AltitudeSource: null,
                            },
                        },
                    },
                    Velocity: { NorthSpeed: -69.902, EastSpeed: -377.936 },
                },
                Strength: { StrengthValue: { Minimum: 11, Maximum: 11 } },
                ActivityBy: [{ Activity: 0, ActivityCategory: 'AIR' }],
            },
        },
    },`);
}

results.push('];');

fs.writeFileSync('data-generated.js', results.join('\n'));
