import React from "react"
import Button from "@material-ui/core/Button"
import classes from "./ProceedDiv.module.css"

const proceedDiv = (props) => {
    return (
        <Button color="primary" variant="contained" onClick={props.clicked}>
            {props.children}
        </Button>
        // <div className={classes.ProceedDiv} >

        // </div>
    )
}

export default proceedDiv
