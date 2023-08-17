export const data = [
    {
        Entity: {
            '@xmlns:uci': 'https://www.vdl.afrl.af.mil/programs/oam',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            SecurityInformation: {
                Classification: 'FOUO',
                OwnerProducer: [{ GovernmentIdentifier: 'USA' }],
            },
            MessageHeader: {
                SystemID: {
                    UUID: '759E0575-877F-4586-8608-7171D8955FD6',
                    DescriptiveLabel: 'CTC',
                },
                Timestamp: '2022-09-13T22:34:24.5932Z',
                SchemaVersion: '002.1',
                Mode: 'LIVE',
                ServiceID: {
                    UUID: 'EF48222C-61AA-418E-83D1-B869E5E909B4',
                    DescriptiveLabel: 'CTC',
                },
            },
            ObjectState: 'NEW',
            MessageData: {
                EntityID: {
                    UUID: '9E2284E5-245E-45FC-8627-66D1B107C430',
                    DescriptiveLabel: '15845',
                },
                SignalSummary: null,
                CreationTimestamp: { DateTime: '2022-09-13T22:34:24.5932Z' },
                Source: {
                    SystemID: {
                        UUID: '759E0575-877F-4586-8608-7171D8955FD6',
                        DescriptiveLabel: 'CTC',
                    },
                    SourceSpecificData: { TrackQuality: 10 },
                    SourceType: 'FUSION_SYSTEM',
                },
                EntityStatus: 'POTENTIAL',
                Identity: {
                    Standard: [
                        {
                            StandardIdentity: 'ASSUMED_FRIEND',
                            Confidence: 100,
                            ExerciseIdentityData: {
                                ExerciseIdentity: 'ASSUMED_FRIEND',
                            },
                        },
                    ],
                    Environment: [{ Environment: 'AIR', Confidence: 100 }],
                    Platform: [
                        {
                            PlatformType: 0,
                            PlatformTypeCategory: 'AIR',
                            Confidence: 100,
                        },
                    ],
                    Specific: [
                        {
                            SpecificType: 0,
                            SpecificTypeCategory: 'AIR',
                            Confidence: 100,
                        },
                    ],
                    SpecificVehicle: [
                        {
                            CallSign: [{ Key: null, SystemName: 'TBD' }],
                            DataLinkIdentifier: [
                                {
                                    VoiceCallSign: null,
                                    TrackIdentifier: {
                                        TrackNumber: '00000',
                                        ExternalInterfaceID: {
                                            UUID: 'B7B1CC6D-FB6F-4644-B481-E1493FB3C8D2',
                                            DescriptiveLabel:
                                                'Reference Track Number',
                                        },
                                    },
                                },
                            ],
                            Confidence: 100,
                            IFF: {
                                Mode1: { Code: 'No Statement', Enabled: false },
                                Mode2: { Code: 'No Statement', Enabled: false },
                                Mode3A: [{ Code: '3365', Enabled: true }],
                                Mode4: { Mode4Indicator: 'NOT_INTERROGATED' },
                                Mode5: {
                                    NationalOrigin: 0,
                                    Mode5Indicator: 'NOT_INTERROGATED',
                                    Mode1Code: 'No Statement',
                                    PIN: 0,
                                },
                                ModeS: {
                                    AircraftIdentifier: 'RPA4592',
                                    Enabled: true,
                                    ICAO: 0,
                                },
                                ModeC: { Code: '340', Enabled: true },
                            },
                        },
                    ],
                    SelfReportedIdentity: false,
                    DifferenceIndicator: false,
                    IdentityTimestamp: '2022-09-13T22:34:24.5932Z',
                },
                Kinematics: {
                    Position: {
                        FixedPositionType: {
                            FixedPoint: {
                                Latitude: 7.4641178,
                                Longitude: -8.1890853,
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
    },
    {
        Entity: {
            '@xmlns:uci': 'https://www.vdl.afrl.af.mil/programs/oam',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            SecurityInformation: {
                Classification: 'FOUO',
                OwnerProducer: [{ GovernmentIdentifier: 'USA' }],
            },
            MessageHeader: {
                SystemID: {
                    UUID: '759E0575-877F-4586-8608-7171D8955FD6',
                    DescriptiveLabel: 'CTC',
                },
                Timestamp: '2022-09-13T22:34:24.5932Z',
                SchemaVersion: '002.1',
                Mode: 'LIVE',
                ServiceID: {
                    UUID: 'EF48222C-61AA-418E-83D1-B869E5E909B4',
                    DescriptiveLabel: 'CTC',
                },
            },
            ObjectState: 'NEW',
            MessageData: {
                EntityID: {
                    UUID: '9E2284E5-245E-45FC-8627-66D1B107C430',
                    DescriptiveLabel: '15845',
                },
                SignalSummary: null,
                CreationTimestamp: { DateTime: '2022-09-13T22:34:24.5932Z' },
                Source: {
                    SystemID: {
                        UUID: '759E0575-877F-4586-8608-7171D8955FD6',
                        DescriptiveLabel: 'CTC',
                    },
                    SourceSpecificData: { TrackQuality: 10 },
                    SourceType: 'FUSION_SYSTEM',
                },
                EntityStatus: 'POTENTIAL',
                Identity: {
                    Standard: [
                        {
                            StandardIdentity: 'ASSUMED_FRIEND',
                            Confidence: 100,
                            ExerciseIdentityData: {
                                ExerciseIdentity: 'ASSUMED_FRIEND',
                            },
                        },
                    ],
                    Environment: [{ Environment: 'AIR', Confidence: 100 }],
                    Platform: [
                        {
                            PlatformType: 0,
                            PlatformTypeCategory: 'AIR',
                            Confidence: 100,
                        },
                    ],
                    Specific: [
                        {
                            SpecificType: 0,
                            SpecificTypeCategory: 'AIR',
                            Confidence: 100,
                        },
                    ],
                    SpecificVehicle: [
                        {
                            CallSign: [{ Key: null, SystemName: 'TBD' }],
                            DataLinkIdentifier: [
                                {
                                    VoiceCallSign: null,
                                    TrackIdentifier: {
                                        TrackNumber: '00000',
                                        ExternalInterfaceID: {
                                            UUID: 'B7B1CC6D-FB6F-4644-B481-E1493FB3C8D2',
                                            DescriptiveLabel:
                                                'Reference Track Number',
                                        },
                                    },
                                },
                            ],
                            Confidence: 100,
                            IFF: {
                                Mode1: { Code: 'No Statement', Enabled: false },
                                Mode2: { Code: 'No Statement', Enabled: false },
                                Mode3A: [{ Code: '3365', Enabled: true }],
                                Mode4: { Mode4Indicator: 'NOT_INTERROGATED' },
                                Mode5: {
                                    NationalOrigin: 0,
                                    Mode5Indicator: 'NOT_INTERROGATED',
                                    Mode1Code: 'No Statement',
                                    PIN: 0,
                                },
                                ModeS: {
                                    AircraftIdentifier: 'RPA4592',
                                    Enabled: true,
                                    ICAO: 0,
                                },
                                ModeC: { Code: '340', Enabled: true },
                            },
                        },
                    ],
                    SelfReportedIdentity: false,
                    DifferenceIndicator: false,
                    IdentityTimestamp: '2022-09-13T22:34:24.5932Z',
                },
                Kinematics: {
                    Position: {
                        FixedPositionType: {
                            FixedPoint: {
                                Latitude: 47.65,
                                Longitude: 7,
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
    },
];
