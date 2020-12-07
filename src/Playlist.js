import React from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';

const Playlist = ({ playlist, buttonOnClick }) => {
    return (
        <ListGroupItem key={playlist.id} className="border-bottome border-success">
            <div class="row align-items-center justify-content-start">
                <img class="col-3" src={playlist.images[0].url}></img>
                <div class="row justify-content-center col-9">
                    <h3 class="col-12 mb-4">{playlist.name}</h3>
                    <Button variant="success" onClick={() => buttonOnClick(playlist)}>Choisir</Button>
                </div>
            </div>
        </ListGroupItem>
    )
};


export default Playlist