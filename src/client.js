import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main"
import Nav from "./components/Nav"
import { BrowserRouter } from 'react-router-dom'
import Footer from "./components/Footer";

const app = document.getElementById('app');

const layout =
    <BrowserRouter>
        <div>
            <Nav/>
            <Main/>
            <Footer/>
        </div>

    </BrowserRouter>;


ReactDOM.render(layout, app);
