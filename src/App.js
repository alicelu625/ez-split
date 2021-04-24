import React, {Component} from "react"
import {connect} from "react-redux"

import Start from "./Pages/Start/Start"
import AddItems from "./Pages/AddItems/AddItems"
import Layout from "./hoc/Layout/Layout"
import ClaimItems from "./Pages/ClaimItems/ClaimItems"
import Tax from "./Pages/Tax/Tax"
import AdditionalFees from "./Pages/AdditionalFees/AdditionalFees"
import Results from "./Pages/Results/Results"
import Receipt from "./Pages/Receipt/Receipt"
import Button from "@material-ui/core/Button"

import {
    createMuiTheme,
    makeStyles,
    ThemeProvider
} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        background: "red"
    },
    proceedButton: {
        backgroundColor: "blue",
        // "When the theme's breakpoint is small"
        [theme.breakpoints.up("sm")]: {
            width: "90vw"
        }
    }
}))

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

const App = (props) => {
    const materialStyles = useStyles()
    let currentComponent = <Start />
    if (props.currentPage === 1) {
        currentComponent = <AddItems />
    } else if (props.currentPage === 2) {
        currentComponent = <ClaimItems />
    } else if (props.currentPage === 3) {
        currentComponent = <Tax />
    } else if (props.currentPage === 4) {
        currentComponent = <AdditionalFees />
    } else if (props.currentPage === 5) {
        currentComponent = <Results />
    } else if (props.currentPage === 6) {
        currentComponent = <Receipt />
    }
    return (
        <ThemeProvider theme={theme}>
            <Button className={materialStyles.proceedButton}> hi </Button>
            <Layout materialStyles={materialStyles}>{currentComponent}</Layout>
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(App)
