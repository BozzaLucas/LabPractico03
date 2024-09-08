import React, { useState } from 'react';
import './App.css';

function App() {
  const [numeroAdivinado, setNumeroAdivinado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [score, setScore] = useState(20);
  const [numeroSecreto, setNumeroSecreto] = useState(Math.floor(Math.random() * 20) + 1);
  const [adivinanzaCorrecta, setAdivinanzaCorrecta] = useState(false);
  const [puntajeMaximo, setPuntajeMaximo] = useState(null);
  const [numeroAdivinadoFinal, setNumeroAdivinadoFinal] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [fondoColor, setFondoColor] = useState('#fff');
  const [gifFallaVisible, setGifFallaVisible] = useState(false);

  const manejarCambio = (e) => {
    setNumeroAdivinado(e.target.value);
  };

  const manejarAdivinanza = () => {
    if (juegoTerminado) return;

    const numero = parseInt(numeroAdivinado, 10);

    if (isNaN(numero) || numero < 1 || numero > 20) {
      setMensaje('El número debe estar entre 1 y 20.');
      return;
    }

    const diferencia = Math.abs(numero - numeroSecreto);

    if (numero === numeroSecreto) {
      setMensaje('¡Felicidades! Has adivinado el número.');
      setAdivinanzaCorrecta(true);
      setNumeroAdivinadoFinal(numero);
      setFondoColor('green');
      if (puntajeMaximo === null || score > puntajeMaximo) {
        setPuntajeMaximo(score);
      }
    } else {
      if (diferencia === 1) {
        setMensaje('¡Muy cerca! Estás a solo 1 número del secreto.');
      } else if (diferencia <= 3) {
        setMensaje('Cerca, pero sigue intentando.');
      } else if (diferencia <= 6) {
        setMensaje('Lejos, intenta un número más cercano.');
      } else {
        setMensaje('¡Muy lejos! Intenta un número mucho más cercano.');
      }
      const nuevoScore = score - 1;
      if (nuevoScore <= 0) {
        setScore(0);
        setMensaje('¡Has fallado! Tu puntaje ha llegado a 0.');
        setJuegoTerminado(true);
        setFondoColor('red');
        setGifFallaVisible(true);
      } else {
        setScore(nuevoScore);
      }
    }
    setNumeroAdivinado('');
  };

  const manejarReinicio = () => {
    setNumeroSecreto(Math.floor(Math.random() * 20) + 1);
    setScore(20);
    setMensaje('');
    setNumeroAdivinado('');
    setAdivinanzaCorrecta(false);
    setNumeroAdivinadoFinal(null);
    setJuegoTerminado(false);
    setFondoColor('#fff');
    setGifFallaVisible(false);
  };

  const claseFondo = adivinanzaCorrecta ? 'ganado' : juegoTerminado && score <= 0 ? 'fallido' : '';

  return (
    <div className={`App ${claseFondo}`} style={{ backgroundColor: fondoColor }}>
      <h1>Juego de Adivina el Número</h1>
      <p>Tu puntaje actual: {score} {puntajeMaximo !== null && `| Puntaje más alto: ${puntajeMaximo}`}</p>
      <input
        type="number"
        value={numeroAdivinado}
        onChange={manejarCambio}
        min="1"
        max="20"
        disabled={adivinanzaCorrecta || juegoTerminado}
        className="input"
        placeholder="Ingresa un número entre 1 y 20"
      />
      <div className="botones">
        <button
          onClick={manejarAdivinanza}
          style={{ backgroundColor: adivinanzaCorrecta ? '#007bff' : '#007bff' }}
          disabled={adivinanzaCorrecta || juegoTerminado}
        >
          Adivinar
        </button>
        <button
          onClick={manejarReinicio}
          className="btn-reinicio"
        >
          Reiniciar Juego
        </button>
      </div>
      <p>{mensaje}</p>
      {adivinanzaCorrecta && (
        <div>
          <p>Número adivinado: {numeroAdivinadoFinal}</p>
          <img src="/stickman-dancing.gif" alt="Stickman bailando" className="gif-dancing"/>
        </div>
      )}
      {gifFallaVisible && !adivinanzaCorrecta && (
        <div>
          <p>¡Inténtalo de nuevo!</p>
          <img src="/stickman-fail.gif" alt="Stickman fallando" className="gif-fail"/>
        </div>
      )}
    </div>
  );
}

export default App;
