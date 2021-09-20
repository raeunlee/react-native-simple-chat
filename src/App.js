import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import {theme} from './theme'

const App = () => {
    return (
        <ThemeProvider theme = {theme}>
            <statusbar barStyle = "dark-contant" />
        </ThemeProvider>
    );
};

export default App;