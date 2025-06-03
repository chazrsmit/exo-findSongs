import './audioplayer.css'

export default function AudioPlayer({
  hoveredElement,
  audioSrc,
  audioRef,
  isPlaying,
  setIsPlaying
}) {
  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="audio-player">
      {hoveredElement.album?.cover_big && (
        <div className="img-wrapper">
          <img
            className="hoverImg"
            src={hoveredElement.album.cover_big}
            alt="hovered"
          />
          <div
            className={`play-button ${isPlaying ? 'pause' : 'play'}`}
            onClick={togglePlayPause}
          >
            {isPlaying ?
            <div className="push">❚❚</div>
            :
            <div className="push">▶</div>}
          </div>
        </div>
      )}
      <audio ref={audioRef} className="prev-link" src={audioSrc} />
    </div>
  )
}
