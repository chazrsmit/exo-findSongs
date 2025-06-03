import './audioplayer.css'

export default function AudioPlayer({ hoveredElement }) {


    return(

        <>
        <div className="audio-player">
         {hoveredElement.album?.cover_medium && (
            <img className="hoverImg" src={hoveredElement.album.cover_medium} alt="hovered" />
          )}
          {hoveredElement.preview && (
            <a className="prev-link" href={hoveredElement.preview} target="_blank" rel="noopener noreferrer">
              click
            </a>
          )}
        </div>
        </>

    )
}