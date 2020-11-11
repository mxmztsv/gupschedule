import admob, {BannerAd, BannerAdSize, MaxAdContentRating, TestIds} from '@react-native-firebase/admob';
import React from 'react';
import styled from 'styled-components/native/dist/styled-components.native.esm';

export default function AdsBanner() {
    admob()
        .setRequestConfiguration({
            // Update all future requests suitable for parental guidance
            maxAdContentRating: MaxAdContentRating.PG,

            // Indicates that you want your content treated as child-directed for purposes of COPPA.
            tagForChildDirectedTreatment: true,

            // Indicates that you want the ad request to be handled in a
            // manner suitable for users under the age of consent.
            tagForUnderAgeOfConsent: true,
        })
        .then(() => {
            // Request config successfully set!
        });

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8976849445350370/7194804059';
    // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8976849445350370/7194804059';
    // const adUnitId = 'ca-app-pub-8976849445350370/7194804059';

    return (
        <BannerWrapper>
                <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER}/>
        </BannerWrapper>
    );
}

const BannerWrapper = styled.View`
    bottom: 0;
    position: relative;
    align-items: center;
    width: 320px;
    align-self: center;
`;

const BannerBox = styled.View`
    align-items: center;
    width: 320px;
`;
