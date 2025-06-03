import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import AudioPlayer from './assets/components/AudioPlayer'

function App() {
 
  const [donnees, setDonnees] = useState([])
  const [recherche, setRecherche] = useState("")
  // on stocke l'élément entier, celui qu'on survole :
  const [hoveredElement, setHoveredElement] = useState(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)

  const[hoverColor, setHoverColor] = useState(null)




  useEffect(() => {
    console.log(recherche)

    // Si la recherche est vide (input vide, l'utilisateur a effacé sa recherche), on réinitialise les données, c'est-à-dire que la recherche de chansons ou artistses effectuée sur deezer est remise à zéro, on a plus de données qui vont s'afficher.
    // Le trim sert à effacer les espaces au début et à la fin, au cas où si l'utilisateur a voulu effacer mais a malencontreusement laissé un espace.
    if (recherche.trim() === "") {
      setDonnees([])
      setRecherche("")
      setHoveredElement(null)
      return;
    }

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${recherche}`)
      .then((response) => setDonnees(response.data.data))
      .catch((error) => console.log(error))
  }, [recherche])
  // attention à bien mettre la variable recherche comme dépendant pour que l'élément s'update à chaque recherche


  return (
    <>

      {/* <input type="text" placeholder='cherche une chanson' onChange={(e) => setRecherche(e.target.value)}/> */}
      <div className="input-wrapper">
        <input type="text" id="search" onChange={(e) => setRecherche(e.target.value)} onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} />
        {recherche === "" && !isFocused && (
        <label htmlFor="search" className="typewriter-placeholder">
          cherche une chanson
        </label>
      )}
      </div>

      {/* Si l'utilisateur entre quelque chose, il y aura un affichage qui va s'effectuer */}
      { donnees.length > 0 &&
      // normalement on utiliserait filter, mais comme deezer s'occupe déjà de filtrer de son côté, on map directement. Sinon, le code ressemblerait à ça :
      // donnees.filter(
      //   song =>
      //     song.title.toLowerCase().includes(recherche.toLowerCase()) ||
      //     song.artist.name.toLowerCase().includes(recherche.toLowerCase())
      // )
        donnees.map(element => 
          <div
            key={element.id}
            className="div-song"
            onMouseOver={() => {
              setHoveredElement(element)
            }}
            onMouseOut={() => {
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
              }
              setIsPlaying(false)
            }}
          >
            <h1 className={`h1-1 ${hoveredElement === element ? "selected" : ""}`} data-text={element.title}>{element.title}</h1>
            <p className={`p-artist ${hoveredElement === element ? "selected" : ""}`}>{element.artist.name}</p>
          </div>
        )
      }


        {hoveredElement && (
        <>
        <AudioPlayer hoveredElement={hoveredElement} audioSrc={hoveredElement.preview} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <div className="bg-title"><p>{hoveredElement.title}</p></div>
        </>
        )}


    </>
  )
}

export default App
