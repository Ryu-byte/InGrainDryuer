import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./components/Header";
import {Content} from "./components/Content";
import React, { useState } from "react";

function App() {
    return (
        <div>
            <Header/>
            <Content/>
        </div>
    );
}

export default App;
