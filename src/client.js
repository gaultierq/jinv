import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header"
import Layout from "./pages/Layout"

const app = document.getElementById('app');

const layout =
    <Layout>
        <div>This is body</div>
    </Layout>;

ReactDOM.render(layout, app);
