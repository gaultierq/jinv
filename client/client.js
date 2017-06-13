import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main"
import Nav from "./components/Nav"
import { BrowserRouter } from 'react-router-dom'
import Footer from "./components/Footer";
import { Provider } from "react-redux"
import store from "./store"

const app = document.getElementById('app');

//this is to let the browser now that a module need to be updated
if (module.hot) {
    module.hot.accept();
}

const layout = (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Nav/>
                <Main/>
                <Footer/>
            </div>

        </BrowserRouter>
    </Provider>);


ReactDOM.render(layout, app);
