import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./components/Header";
import {Content} from "./components/Content";

function App(props) {
    return (
        <div>
            <Header/>
            <Content cards={props.store.cards}/>
        </div>
    );
}

export default App;
