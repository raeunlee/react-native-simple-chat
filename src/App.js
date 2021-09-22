import React, { useState } from 'react';

import { StatusBar, Image } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import { theme } from './theme'

import { AppLoading } from 'expo';

import { Asset } from 'expo-asset';

import * as Font from 'expo-font'

import Navigation from './navigations';

//사용할 이미지와 폰트를 사용할 수 있도록 하는 cacheImages, cacheFonts. 이를 이용한 _loadAssets함수 구성

const cacheImages = images => {
    return images.map(image =>  {
        if(typeof image === 'string') { 
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
    };
const cacheFonts= fonts => {
    return fonts.map(font => Font.loadAsync(font));
};


const App = () => {
    const [isReady, setIsReady] = useState(false);

    const _loadAssets = async() => {
        const imageAssets = cacheImages([require('../assets/splash.png')]);
        const fontAssets = cacheFonts([]);

        await Promise.all([...imageAssets, ...fontAssets]);
    };

    return isReady ? (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle = "dark-content" />
            <Navigation />
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync = {_loadAssets}
            onFinish={() => setIsReady(true)}
            onError={console.warn}
        />
    );
};

export default App;
