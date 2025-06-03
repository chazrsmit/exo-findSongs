import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import AudioPlayer from './assets/components/AudioPlayer'
import ScrambledText from './assets/components/ScrambledText'

function App() {

 
  const [donnees, setDonnees] = useState([])
  const [recherche, setRecherche] = useState("")
  // Variable qui va stocker l'image à afficher
  // const [hoverImage, setHoverImage] = useState(null)
  // on fait la même chose pour le preview
  // const [hoverPreview, setHoverPreview] = useState(null)
  // on stocke l'élément entier, celui qu'on survole :
  const [hoveredElement, setHoveredElement] = useState(null)

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

   
      <input type="text" placeholder="cherche une chanson" onChange={(e) => setRecherche(e.target.value)} />

      {/* Si l'utilisateur entre quelque chose, il y aura un affichage qui va s'effectuer */}

      { donnees.length > 0 &&
      // normalement on utiliserait filter, mais comme deezer s'occupe déjà de filtrer de son côté, on map directement. Sinon, le code ressemblerait à ça :
      // donnees.filter(
      //   song =>
      //     song.title.toLowerCase().includes(recherche.toLowerCase()) ||
      //     song.artist.name.toLowerCase().includes(recherche.toLowerCase())
      // )

        donnees.map(element => 
          <div key={element.id} className="div-song"
              onMouseOver={() => {
              // en 2 étapes : on stocke l'image associée à l'élément sur lequel on hover ; s'il n'y a pas d'image, rien ne s'affichera
                // const img = element.album?.cover_medium || element.artist?.picture_medium
                // setHoverImage(img || null)
                // const prev = element.preview 
                // setHoverPreview(prev || null)
                // setHoverId(element.id)
                setHoveredElement(element)
              }}
              // quand on arrête d'hover, l'img n'est plus stockée => reset à null
              onMouseOut={() => {
                // setHoverImage(null)
                // setHoverPreview(null)
              }}>
            {/* <ScrambledText
              className="scrambled-text-demo"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            > */}
            <h1 data-text={element.title}>{element.title}</h1>
            {/* </ScrambledText> */}
            <p>{element.artist.name}</p>
              {/* {hoverImage && <img className="hoverImg" src={hoverImage} alt="hovered" />}
              {hoverPreview && <a className="prev-link" href={hoverPreview}>click</a>} */}
          </div>
        )
      }


        {hoveredElement && (
          <>

          <AudioPlayer hoveredElement={hoveredElement} audioSrc={hoveredElement.preview} />
            {/* {hoveredElement.album?.cover_medium && (
              <img className="hoverImg" src={hoveredElement.album.cover_medium} alt="hovered" />
            )}
            {hoveredElement.preview && (
              <a className="prev-link" href={hoveredElement.preview} target="_blank" rel="noopener noreferrer">
                click
              </a>
            )} */}
          </>
        )}


    </>
  )
}

export default App
