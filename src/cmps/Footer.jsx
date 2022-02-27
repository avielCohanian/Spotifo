import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import YouTube from 'react-youtube';

import { userFavoriteSong } from '../store/actions/userAction';
import { setCurrSong } from '../store/actions/itemAction';
import { getRandomInt } from '../services/utilService';

import { PreviewMobile } from '../pages/mobile/PreviewMobile';

import SkipPreviousSharpIcon from '@mui/icons-material/SkipPreviousSharp';
import VolumeMuteSharpIcon from '@mui/icons-material/VolumeMuteSharp';
import VolumeDownSharpIcon from '@mui/icons-material/VolumeDownSharp';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import VolumeOffSharpIcon from '@mui/icons-material/VolumeOffSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolumeUpSharpIcon from '@mui/icons-material/VolumeUpSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp';
import ShuffleSharpIcon from '@mui/icons-material/ShuffleSharp';
import PauseSharpIcon from '@mui/icons-material/PauseSharp';
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import { songService } from '../services/songService';

export const Footer = () => {
  const { currPlaylist } = useSelector((state) => state.itemModule);
  const { currSong } = useSelector((state) => state.itemModule);
  const { currUser } = useSelector((state) => state.userModule);

  const [isPreviewMobile, setIsPreviewMobile] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const [currPlaySong, setCurrPlaySong] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const [songTime, setSongTime] = useState(0);
  const [songSec, setSongSec] = useState(0);
  const [vol, setVol] = useState(100);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currPlaySong) {
      if (intervalId) clearInterval(intervalId);
      const interval = setInterval(() => {
        setSongSec(Math.round(currPlaySong.getCurrentTime()));
      }, 500);

      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [currPlaySong]);

  useEffect(() => {
    if (currPlaySong) {
      setSongTime(currPlaySong.getDuration());
    }
  }, [currPlaySong]);

  useEffect(() => {
    if (currPlaySong) {
      currPlaySong.setVolume(vol);
      currPlaySong.unMute();
    }
  }, [vol, currPlaySong]);

  const timeChange = (ev) => {
    const sec = ev.target.value / 100;
    currPlaySong.seekTo(Math.round(sec * songTime));
  };

  const songVal = () => {
    return songSec ? Math.round((songSec / songTime) * 100) : 0;
  };

  const onReady = ({ target }) => {
    setCurrPlaySong(target);
    target.playVideo();
    if (currPlaySong) setIsPlay(true);
  };

  const onPlayVideo = (ev) => {
    ev.stopPropagation();
    currPlaySong.playVideo();
    setIsPlay(true);
  };

  const onPauseVideo = (ev) => {
    ev.stopPropagation();
    currPlaySong.pauseVideo();
    setIsPlay(false);
  };

  const volChange = (ev) => {
    const songVol = ev.target.value;
    setVol(songVol);
  };

  const getVolIcon = () => {
    if (!currPlaySong) return;
    const vol = currPlaySong.getVolume();
    if (currPlaySong.isMuted()) return <VolumeOffSharpIcon />;
    return vol > 70 ? (
      <VolumeUpSharpIcon />
    ) : vol > 30 ? (
      <VolumeDownSharpIcon />
    ) : vol > 1 ? (
      <VolumeMuteSharpIcon />
    ) : (
      <VolumeOffSharpIcon />
    );
  };

  const mute = () => {
    if (currPlaySong.isMuted()) {
      currPlaySong.unMute();
      setVol(currPlaySong.getVolume());
    } else {
      currPlaySong.mute();
      setVol(0);
    }
  };

  const setShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const timeToShow = () => {
    let min = Math.floor(songSec / 60);
    if (min.toString().length < 2) min = `0${min}`;
    let sec = songSec - Math.floor(songSec / 60) * 60;
    if (sec.toString().length < 2) sec = `0${sec}`;
    return isNaN(min) || isNaN(sec) ? '00:00' : `${min}:${sec}`;
  };

  const songPreview = () => {
    setIsPreviewMobile(!isPreviewMobile);
  };

  const changeSong = (num) => {
    const songIdx = currPlaylist.songs.findIndex((song) => song._id === currSong._id);
    if (!isShuffle) {
      if (num) {
        let prevSongIdx = songIdx - 1;
        if (prevSongIdx < 0) prevSongIdx = currPlaylist.songs.length - 1;
        const prevSong = currPlaylist.songs[prevSongIdx];
        dispatch(setCurrSong(prevSong));
      } else {
        let nextSongIdx = songIdx + 1;
        if (nextSongIdx > currPlaylist.songs.length - 1) nextSongIdx = 0;
        const nextSong = currPlaylist.songs[nextSongIdx];
        dispatch(setCurrSong(nextSong));
      }
    } else {
      const nextIdx = getRandomInt(0, currPlaylist.songs.length - 1);
      const nextSong = currPlaylist.songs[nextIdx];
      dispatch(setCurrSong(nextSong));
    }
  };

  const getSongById = async (songsId) => {
    return await songService.getById(songsId);
  };

  const toggleFavorite = (song) => {
    dispatch(userFavoriteSong(song));
  };

  const setFavorite = (ev) => {
    console.log(currSong);
    ev.stopPropagation();
    toggleFavorite(currSong);
  };

  return (
    <>
      <YouTube
        className="tube"
        videoId={currSong.youtubeId}
        onReady={(ev) => onReady(ev)}
        onEnd={() => changeSong(0)}
      />
      {!isPreviewMobile ? (
        <section className={`footer ${currSong.title ? 'song' : ''} `}>
          <div className="footer-container-mob" onClick={songPreview}>
            <div className="time-container">
              <span className="input-container">
                <input type="range" min={0} max={100} value={songVal()} readOnly />
              </span>
            </div>
            <section className="song-details">
              <div className="play-btn">
                {!isPlay && (
                  <PlayArrowSharpIcon className="main-btn" onClick={(ev) => onPlayVideo(ev)} disabled={!currPlaySong} />
                )}
                {isPlay && (
                  <PauseSharpIcon className="main-btn" onClick={(ev) => onPauseVideo(ev)} disabled={!currPlaySong} />
                )}
              </div>
              <div className="song-title">
                <p>{currSong.title}</p>
              </div>
              <div className="favorite">
                {currUser && currUser.favorite && currUser.favorite.songs.some((s) => s === currSong.youtubeId) ? (
                  <FavoriteSharpIcon onClick={(ev) => setFavorite(ev)} />
                ) : (
                  <FavoriteBorderIcon onClick={(ev) => setFavorite(ev)} />
                )}
              </div>
            </section>
          </div>
          <div className="footer-container-web">
            <div className="details-container">
              {currSong.title && (
                <>
                  <img src={currSong.imgUrl} alt="" />
                  <span>
                    <p>{currSong.title}</p>
                  </span>
                </>
              )}
            </div>
            <div className="opts-container">
              <div className="btn-container">
                <ShuffleSharpIcon
                  className={`icon pointer ${isShuffle ? 'shuffle' : 'simple-button'} `}
                  onClick={setShuffle}
                />
                <SkipPreviousSharpIcon className="icon pointer" onClick={() => changeSong(1)} />
                {!isPlay && (
                  <button className="main-btn" onClick={onPlayVideo} disabled={!currPlaySong}>
                    <PlayArrowSharpIcon />
                  </button>
                )}
                {isPlay && (
                  <button className="main-btn" onClick={onPauseVideo} disabled={!currPlaySong}>
                    <PauseSharpIcon />
                  </button>
                )}
                <SkipNextSharpIcon className="icon pointer" onClick={() => changeSong(0)} />
                <LoopSharpIcon className="icon" />
              </div>
              <div className="time-container">
                <span>{timeToShow()}</span>
                <span className="input-container">
                  <input type="range" min={0} max={100} value={songVal()} onChange={timeChange} />
                </span>
                <span> {currSong.duration || '00:00'}</span>
              </div>
            </div>
            <div className="vol-container">
              <span className="icon" onClick={mute}>
                {getVolIcon()}
              </span>
              <span className="input-container">
                <span className="green" style={{ width: `${currPlaySong ? currPlaySong.getVolume() : 0}%` }}></span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={currPlaySong ? currPlaySong.getVolume() : 0}
                  onChange={volChange}
                />
              </span>
            </div>
          </div>
        </section>
      ) : (
        <PreviewMobile
          currSong={currSong}
          isShuffle={isShuffle}
          setShuffle={setShuffle}
          changeSong={changeSong}
          isPlay={isPlay}
          onPlayVideo={onPlayVideo}
          onPauseVideo={onPauseVideo}
          timeToShow={timeToShow}
          songVal={songVal}
          timeChange={timeChange}
          songPreview={songPreview}
          setFavorite={setFavorite}
          favoriteSong={currUser.favorite}
        />
      )}
    </>
  );
};
