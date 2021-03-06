import React, {Component} from 'react';
import './MusicControl.css';

class MusicControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress:0,
      dragProgressBar:false,
      volume: 1,
      isMuted: false,
      isOnRepeat: false
    }
    this.progressInChange =  false;
    this.interval = setInterval(this.update,500);
  }

  update = () => {
    let player = this.refs.player;
    if(this.refs.player) {
      if(!this.progressInChange) {
        this.setState({
          progress: player.currentTime / player.duration
        });
      }
    }
    if( player && player.ended) {
      this.props.playNext();
    }
  }

  toggleMute = () => {
    this.state.isMuted ? this.setState({isMuted:false}) : this.setState({isMuted:true});
  }

  progressBarActivate = e => {
    this.setState({dragProgressBar:true});
    this.setTime(e);
  }

  stopDrag = e => {
    this.setState({dragProgressBar:false});
  }

  setTime = (e) => {
    if(this.props.song !== null) {
      if(this.state.dragProgressBar) {
        let progress = ((e.clientX - offsetLeftConvert(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth);
        this.setState({progress});
        this.progressInChange = true
      }
    }

  }

  toggleRepeatState = () => {
    this.state.isOnRepeat ? this.setState({isOnRepeat:false}) : this.setState({isOnRepeat:true});
  }
  // this.props.toggleLoop

  render() {
    let currentTime = 0;
    let totalTime = 0;
    if(this.refs.player) {
      let player = this.refs.player;
      player.loop = this.props.loop;
      if(this.props.song) {
        if(player.currentSrc !== this.props.song.url) {
          player.src = this.props.song.url;
        }
      }

      if(player.paused && !player.ended) {
        if(this.props.isPlaying) {
          player.play();
        }
      } else if (!this.props.isPlaying) {
        player.pause();
      }

      if(this.state.isMuted) {
        player.volume = 0;
      } else {
        player.volume = this.state.volume;
      }

      if(this.progressInChange) {
        this.progressInChange = false;
        player.currentTime = player.duration * this.state.progress;
      }

      currentTime = player.currentTime;
      totalTime = player.duration;

    }

    let playerClassName = {
      "fa fa-play": !this.props.isPlaying,
      "fa fa-pause": this.props.isPlaying
    };

    let muteClassName = {
      "fa fa-volume-up": !this.state.isMuted,
      "fa fa-volume-off": this.state.isMuted
    }

    let repeatClassName = {
      "fa fa-repeat": this.state.isOnRepeat,
      "fa fa-circle-o-notch": !this.state.isOnRepeat
    }

    return (
            <div className="player">
              <div className="audio-controls">
                <div className="buttons">
                  <a alt="backward-button" onClick={this.props.playPrev}><i className="fa fa-step-backward" alt="forward-button" aria-hidden="true" ></i></a>
                  <a alt="play-button" id="playButton" onClick={this.props.togglePlay}><i className={toggleClassName(playerClassName)} aria-hidden="true"></i></a>
                  <a alt="forward-button" onClick={this.props.playNext}><i className="fa fa-step-forward" aria-hidden="true"></i></a>
                  <a alt="repeat-button" onClick={this.toggleRepeatState}> <i className={toggleClassName(repeatClassName)} aria-hidden="true"></i></a>
                  <a alt="mute-button" onClick={this.toggleMute}><i className={toggleClassName(muteClassName)} aria-hidden="true"></i></a>

                </div>
              <div>
            </div>

            <div className="bottom">
              <div className="timeStamp" > {timeString(currentTime)}</div>
              <div>
                <div className="progress" onMouseDown={this.progressBarActivate} onMouseMove={this.setTime} onMouseLeave={() => this.setState({dragProgressBar:false})} onMouseUp={this.stopDrag}>
                  <div ref="progress_bar" className="bar">
                    <div style={{width: (this.state.progress * 100) + "%" }}></div>
                  </div>
                </div>
              </div>
              <div className="timeStamp" > {timeString(totalTime)}</div>
            </div>
          </div>
            <audio ref="player">
              {this.props.song && <source src={this.props.song.url}/>}
            </audio>
            </div>
    );
  }
};

function toggleClassName(obj) {
  let css = [];
  for( let i in obj ) {
    obj[i] && css.push(i);
  };
  return css.join('');
}

function convertTime(time) {
  if(!time) {
    return ''
  }
  let minutes = Math.floor(time % 3600 / 60);
  let seconds = Math.floor(time % 3600 % 60);
  if(seconds < 10) {
    seconds = "0" + seconds
  }

  return minutes + ":" + seconds;
}

function timeString(time) {
  if(convertTime(time) == "") {
    return ""
  }
  return convertTime(time) ;
}

// Patrick Lorio youtube tutorial
function offsetLeftConvert(ele) {
  let left = 0;
  while(ele && ele !== document) {
    left += ele.offsetLeft;
    ele = ele.offsetParent;
  }
  return left;
}

export default MusicControl;
