function App() {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [timerLabel, setTimerLabel] = React.useState('Session');
  const [timeLeft, setTimeLeft] = React.useState(1500); // 25 minutes in seconds
  const [timerRunning, setTimerRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  function reset() {
      if (intervalId) clearInterval(intervalId);
      setSessionLength(25);
      setBreakLength(5);
      setTimeLeft(1500);
      setTimerLabel('Session');
      setTimerRunning(false);
      document.getElementById('beep').pause();
      document.getElementById('beep').currentTime = 0;
  }

  function decrementBreak() {
      if (breakLength > 1) setBreakLength(prev => prev - 1);
  }

  function incrementBreak() {
      if (breakLength < 60) setBreakLength(prev => prev + 1);
  }

  function decrementSession() {
      if (sessionLength > 1) {
          setSessionLength(prev => prev - 1);
          setTimeLeft(prev => prev - 60);
      }
  }

  function incrementSession() {
      if (sessionLength < 60) {
          setSessionLength(prev => prev + 1);
          setTimeLeft(prev => prev + 60);
      }
  }

  function formatTime(seconds) {
      let mins = Math.floor(seconds / 60);
      let secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleTimer() {
      setTimerRunning(prev => !prev);
  }

  React.useEffect(() => {
      if (timerRunning) {
          const interval = setInterval(() => {
              setTimeLeft(prev => {
                  if (prev === 0) {
                      if (timerLabel === 'Session') {
                          setTimerLabel('Break');
                          return breakLength * 60;
                      } else {
                          setTimerLabel('Session');
                          return sessionLength * 60;
                      }
                  } else {
                      return prev - 1;
                  }
              });
          }, 1000);

          setIntervalId(interval);

          return () => {
              clearInterval(interval);
          }
      }
  }, [timerRunning, timerLabel, sessionLength, breakLength]);

  React.useEffect(() => {
      if (timeLeft === 0) document.getElementById('beep').play();
  }, [timeLeft]);


  return (
    <div className="main">
      <h2>25 + 5 Clock</h2>

      <div className="lenght-control">
        <div className="control">
          <div id="break-label" className="title">Break Length</div>
          <div className="contenedor-flechas">
            <button id="break-decrement" className="boton" onClick={decrementBreak}>
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment" className="boton" onClick={incrementBreak}>
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
        </div>

        <div className="control">
          <div id="session-label" className="title">Session Length</div>
          <div className="contenedor-flechas">
            <button id="session-decrement" className="boton" onClick={decrementSession}>
              <i className="fa fa-arrow-down fa-2x"></i>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment" className="boton" onClick={incrementSession}>
              <i className="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="timer-contenedor">
        <div className="timer">
          <div id="timer-label">{timerLabel}</div>
          <div id="timer-left">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="timer-control">
        <button id="start_stop" className="boton" onClick={toggleTimer}>
            {timerRunning ? (
                <i className="fa fa-pause fa-2x"></i>
            ) : (
                <i className="fa fa-play fa-2x"></i>
            )}
        </button>
        <button id="reset" className="boton" onClick={reset}>
            <i className="fa fa-refresh fa-2x"></i>
        </button>
    </div>

      <div className="derechos">
        <p>Diseñado y Desarrollado por:</p>
        <a href="https://jpdev.site" target="_blank" rel="noopener noreferrer">
          <img
            className="logo"
            src="https://i.ibb.co/khRv85Y/logo2.png"
            alt="logo"
            border="0"
          />
        </a>
      </div>
      
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>

    </div>
  );
}

const rootElement = document.getElementById("app");
const appRoot = ReactDOM.createRoot(rootElement);
appRoot.render(<App />);
