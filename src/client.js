import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header"
import Main from "./pages/Main"
import Nav from "./components/Nav"
import { Route, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

const app = document.getElementById('app');


const layout =
    <BrowserRouter>
        <div>
            <Nav/>
            <Main/>
        </div>

    </BrowserRouter>;


ReactDOM.render(layout, app);
