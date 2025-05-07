import { Nav } from "../Other/Nav"
import { BrowserRouter } from "react-router-dom"
import { Routing } from "../Other/Routing"
import { Provider } from "react-redux"
import myStore from "../Other/store"

export const Main = () => {
    return (
        <Provider store={myStore}>
        <BrowserRouter>
            <Nav />
            <Routing />
        </BrowserRouter>
        </Provider>
    );
}
