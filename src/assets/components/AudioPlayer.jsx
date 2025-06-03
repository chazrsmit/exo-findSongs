import { useRef, useState } from 'react'
import './audioplayer.css'

export default function AudioPlayer({ hoveredElement, audioSrc }) {

    // Variables d'état pour gérer le temps actuel du preview et le statut "is Played" :
    // const [isPlaying, setIsPlaying] = useState(false)
    // const [currentTime, setCurrentTime] = useState(0)
    // const [duration, setDuration] = useState(0)

    // const audioRef = useRef(null)

    // fonction pour aller chercher dans un endroit spécifique de l'audio :
    // const handleSeek = (e) => {}


    return(

        <>
        <div className="audio-player">
            {hoveredElement.album?.cover_medium && (
                <img className="hoverImg" src={hoveredElement.album.cover_medium} alt="hovered" />
            )}

            {/* Input pour rechercher les infos de l'audio  */}
            {/* <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
            /> */}

            {/* Pour jouer l'audio */}
            <audio className="prev-link" controls src={audioSrc} />

            {/* Faire apparaître les données temps */}
            {/* <div className="track-duration">
                <p>{currentTime}</p>
                <p>{duration}</p>
            </div> */}

            {/* Boutons play/pause */}


        </div>
        </>

    )
}