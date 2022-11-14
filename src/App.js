import './App.sass';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
