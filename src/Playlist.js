const Playlist = ({playlist}) => {
    return (
        <div key={playlist.id}>
            <div class="card">
                <img src={playlist.images[0].url}/>
                <h3>{playlist.name}</h3>
            </div>
        </div>
    )
};


export default Playlist