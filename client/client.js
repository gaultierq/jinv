import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main"
import Nav from "./components/Nav"
import { BrowserRouter } from 'react-router-dom'
import Footer from "./components/Footer";
import { Provider } from "react-redux"
import store from "./store"
import {AppBar, MuiThemeProvider} from "material-ui";
import injectTapEventPlugin from 'react-tap-event-plugin';

const app = document.getElementById('app');

//this is to let the browser now that a module need to be updated
if (module.hot) {
    module.hot.accept();
}

//https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

const layout = (<Provider store={store}>
    <BrowserRouter>
        <MuiThemeProvider>
            <div>
                <AppBar
                    title="Jinv"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Main/>
                <Footer/>
            </div>
        </MuiThemeProvider>

    </BrowserRouter>
</Provider>);


ReactDOM.render(layout, app);
