import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {createStore} from "redux"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import "./index.css"
import App from "./App"
import reducer from "./store/reducer"

const theme = createMuiTheme({
    palette: {
        // Dark Green color, primarly used for buttons
        primary: {
            main: "#167A68"
        },
        // Dark Orange color, main color used for text and others
        secondary: {
            main: "#DB6400"
        }
    }
})

const store = createStore(reducer)

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
