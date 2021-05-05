import React from 'react'

import Spinner from "react-bootstrap/Spinner";

const Loading = (props) => {
    const { fullscreen } = props

    return <div className={"loading " + (fullscreen ? "fullscreen" : "")}>
        <Spinner animation="border" role="status" variant="success">
        </Spinner>
    </div>
}

export default Loading
