import React, {Component} from 'react';
import Formulario from './componentes/Formulario.js';
import Chat from './componentes/Chat.js';
import './css/app.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Formulario />
                <div className="chat">
                    <Chat />
                </div>
            </div>
        );
    }
}

export default App;
