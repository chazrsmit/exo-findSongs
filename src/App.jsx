import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {

 
  const [donnees, setDonnees] = useState([])
  const [recherche, setRecherche] = useState("")
  // Variable qui va stocker l'image à afficher
  const [hoverImage, setHoverImage] = useState(null)

  useEffect(() => {
    console.log(recherche)

    // Si la recherche est vide (input vide, l'utilisateur a effacé sa recherche), on réinitialise les données, c'est-à-dire que la recherche de chansons ou artistses effectuée sur deezer est remise à zéro, on a plus de données qui vont s'afficher.
    // Le trim sert à effacer les espaces au début et à la fin, au cas où si l'utilisateur a voulu effacer mais a malencontreusement laissé un espace.
    if (recherche.trim() === "") {
      setDonnees([]);
      return;
    }

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${recherche}`)
      .then((response) => setDonnees(response.data.data))
      .catch((error) => console.log(error))
  }, [recherche])
  // attention à bien mettre la variable recherche comme dépendant pour que l'élément s'update à chaque recherche

  return (
    <>

    <input type="text" onChange={(e) => setRecherche(e.target.value)} />

    {/* Si l'utilisateur entre quelque chose, il y aura un affichage qui va s'effectuer */}
    {donnees.length > 0 ? 

    // normalement on utiliserait filter, mais comme deezer s'occupe déjà de filtrer de son côté, on map directement. Sinon, le code ressemblerait à ça :
    // donnees.filter(
    //   song =>
    //     song.title.toLowerCase().includes(recherche.toLowerCase()) ||
    //     song.artist.name.toLowerCase().includes(recherche.toLowerCase())
    // )

    donnees.map(element => 
      <div key={element.id}>
        <h1
          onMouseOver={() => {
          // en 2 étapes : on stocke l'image associée à l'élément sur lequel on hover ; s'il n'y a pas d'image, rien ne s'affichera
            const img = element.album?.cover_medium || element.artist?.picture_medium
            setHoverImage(img || null)
          }}
          // quand on arrête d'hover, l'img n'est plus stockée => reset à null
          onMouseOut={() => setHoverImage(null)}
          >{element.title}</h1>
          {hoverImage && <img className="hoverImg" src={hoverImage} alt="hovered" />}
      </div>
    )

    // si pas de données : rien n'apparait
    : ""}

    </>
  )
}

export default App
