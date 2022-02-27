import SkipPreviousSharpIcon from '@mui/icons-material/SkipPreviousSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import PauseSharpIcon from '@mui/icons-material/PauseSharp';

export const PreviewMobile = ({
  currSong,
  isShuffle,
  setShuffle,
  changeSong,
  isPlay,
  onPlayVideo,
  onPauseVideo,
  timeToShow,
  songVal,
  timeChange,
  songPreview,
  setFavorite,
  favoriteSong,
}) => {
  return (
    <section className="song-preview-mobile">
      <div className="song-container">
        <div className="details-container">
          {currSong.title && (
            <>
              <div className="header">
                <p>{currSong.title}</p>
                <ArrowForwardIosIcon className="arrow-forward" onClick={songPreview} />
              </div>
              <div className="details">
                <img src={currSong.imgUrl} alt="" />
                <span>
                  <p>{currSong.title}</p>
                </span>
              </div>
            </>
          )}
        </div>
        <div className="opts-container">
          <div className="time-container">
            <span className="input-container">
              <input type="range" min={0} max={100} value={songVal()} onChange={timeChange} />
            </span>
            <div className="time">
              <span>{timeToShow()}</span>
              <span> {currSong.duration || '00:00'}</span>
            </div>
          </div>
          <div className="btn-container">
            {favoriteSong && favoriteSong.songs.some((f) => f === currSong.youtubeId) ? (
              <FavoriteSharpIcon className="heart side-icon favorite" onClick={(ev) => setFavorite(ev)} />
            ) : (
              <FavoriteBorderIcon className="heart side-icon favorite" onClick={(ev) => setFavorite(ev)} />
            )}
            <span>
              <SkipPreviousSharpIcon className="icon pointer" onClick={() => changeSong(1)} />
              {!isPlay && (
                <button className="main-btn" onClick={(ev) => onPlayVideo(ev)}>
                  <PlayArrowSharpIcon />
                </button>
              )}
              {isPlay && (
                <button className="main-btn" onClick={(ev) => onPauseVideo(ev)}>
                  <PauseSharpIcon />
                </button>
              )}
              <SkipNextSharpIcon className="icon pointer" onClick={() => changeSong(0)} />
            </span>
            <ShuffleSharpIcon
              className={`side-icon pointer shuffle ${isShuffle ? 'shuffle' : 'simple-button'}  `}
              onClick={setShuffle}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
