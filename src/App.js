import { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlay, faPause, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

function Timer(props) {
  return (
    <div className='timer'>
      <h3 id='timer-label'>
        {props.SessionMode}
      </h3>
      <div id='time-left'>
        {props.time.m / 10 < 1 ? "0" + props.time.m : props.time.m }:{props.time.s / 10 < 1 ? "0" + props.time.s : props.time.s}
      </div>
    </div>
  );
}

export default class App extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timer: 0,
      time: {
        m: 25,
        s: 0,
      },
      isRunning: false,
      SessionMode: "Session",
    }
    
    this.countDown = this.countDown.bind(this);
    this.handleBreakDecreaseButton = this.handleBreakDecreaseButton.bind(this);
    this.handleBreakIncreaseButton = this.handleBreakIncreaseButton.bind(this);
    this.handleSessionDecreaseButton = this.handleSessionDecreaseButton.bind(this);
    this.handleSessionIncreaseButton = this.handleSessionIncreaseButton.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleStart_pauseButton = this.handleStart_pauseButton.bind(this);
  }
  
  countDown()
  {
    console.log(this.state.time)
    // Check time out
    if (this.state.time.s === 0 && this.state.time.m === 0)
    {
      let audio = document.querySelector("#beep");

      //Play audio
      audio.play();

      if (this.state.SessionMode === "Session")
      {
        console.log("to break")

        this.setState({
          time: {
            m: this.state.breakTime,
            s: 0,
          },
          SessionMode: "Break",
        });
      }
      else 
      {
        console.log("to session")

        this.setState({
          time: {
            m: this.state.sessionTime,
            s: 0,
          },
          SessionMode: "Session",
        });
      }
      
      return;
    }


    if (this.state.time.s === 0 && this.state.time.m !== 0)
    {
      this.setState({
        time: {
          m: this.state.time.m - 1,
          s: this.state.time.s + 59,
        }
      })
    }
    else 
    {
      this.setState({
        time: {
          m: this.state.time.m,
          s: this.state.time.s - 1,
        }
      })
    }
  }

  handleStart_pauseButton()
  {
    if (this.state.isRunning)
    {
      clearInterval(this.state.timer)
      this.setState({
        timer: 0,
        isRunning: false,
      })

    }
    else 
    {
      let timer = setInterval(this.countDown, 1000);
      this.setState({
        timer: timer,
        isRunning: true,
      })
    }
  }

  handleResetButton()
  {
    console.log("reset")
    clearInterval(this.state.timer);

    this.setState({
      time: {
        m: 25,
        s: 0,
      },
      breakTime: 5,
      sessionTime: 25,
      SessionMode: "Session",
      isRunning: false,
    })

    let audio = document.querySelector("#beep");
    audio.pause();
    audio.currentTime = 0;
  }

  handleBreakIncreaseButton()
  {
    if (this.state.breakTime < 60)
    {
      this.setState({
        breakTime: this.state.breakTime + 1,
      })
    }
  }
  handleBreakDecreaseButton()
  {
    if (this.state.breakTime > 1) 
    {
      this.setState({
        breakTime: this.state.breakTime - 1,
      })
    }
  }

  handleSessionIncreaseButton()
  {
    if (this.state.sessionTime < 60) 
    {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        time: {
          m: this.state.time.m + 1,
          s: this.state.time.s
        }
      })
    }
  }
  handleSessionDecreaseButton()
  {
    if (this.state.sessionTime > 1)
    {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        time: {
          m: this.state.time.m - 1,
          s: this.state.time.s
        }
      })
    }
  }

  render()
  {
    return (
      <div id='app'>
        <h1 className='main-title'>25 + 5 Clock</h1>
        <div className='length-control'>
          <h3 id='break-label'>Break Length</h3>
          <button id='break-increment' onClick={this.handleBreakIncreaseButton} disabled={this.state.isRunning}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <h3 id='break-length'>{this.state.breakTime}</h3>
          <button id='break-decrement' onClick={this.handleBreakDecreaseButton} disabled={this.state.isRunning}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <div className='length-control'>
          <h3 id='session-label'>Session Length</h3>
          <button id='session-increment' onClick={this.handleSessionIncreaseButton} disabled={this.state.isRunning}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <h3 id='session-length'>{this.state.sessionTime}</h3>
          <button id='session-decrement' onClick={this.handleSessionDecreaseButton} disabled={this.state.isRunning}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <Timer time={this.state.time} SessionMode={this.state.SessionMode} />
        <div className='timer-control'>
          <button id='start_stop' onClick={this.handleStart_pauseButton}>
            <FontAwesomeIcon icon={faPlay} />
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button id='reset' onClick={this.handleResetButton}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
        <audio id='beep' src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' preload="auto"></audio>
      </div>
    );
  }
}
