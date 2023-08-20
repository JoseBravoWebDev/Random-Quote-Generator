import './App.scss';
import React, { useState, useEffect } from 'react';

const colors = {
  Clr1: "#00008B",
  Clr2: "#9C007A",
  Clr3: "#4A4453",
  Clr4: "#FF6945",
  Clr5: "#FFB442",
  Clr6: "#0072E0",
  Clr7: "#66BAA8",
  Clr8: "#5A4978",
  Clr9: "#4D8075",
  Clr10: "#9A89B4"
};

function App() {
  const [quote, setQuote] = useState(''); // Estado inicial para la cita
  const [author, setAuthor] = useState(''); // Estado inicial para el autor
  const [fade, setFade] = useState(false); // Nuevo estado para controlar la animación
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const getQuote = () => {
    setFade(false); // Quita la animación antes de obtener los nuevos datos

    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {
        const item = data[Math.floor(Math.random() * data.length)]; // Seleccionar un elemento aleatorio
        setQuote(item.text); // Actualizar el estado de la cita
        setAuthor(item.author.split(',')[0]); // Actualizar el estado del autor
        setFade(true); // Muestra la animación después de obtener los nuevos datos
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const changeColor = () => {
    const colorKeys = Object.keys(colors);
    const colorIndex = currentColorIndex % colorKeys.length;
    const color = colors[colorKeys[colorIndex]];
    document.documentElement.style.setProperty('--neutral-2', color);
    setCurrentColorIndex(colorIndex + 1);
  };

  useEffect(() => {
    if (quote && author) {
      setFade(true);
    } else {
      setFade(false);
    }
  }, [quote, author]);

  useEffect(() => {
    getQuote();
    changeColor();
  }, []); // Llamar a getQuote cuando el componente se monta

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)} - ${encodeURIComponent(author)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnTumblr = () => {
    const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&content=${encodeURIComponent(quote)}&caption=${encodeURIComponent(author)}`;
    window.open(tumblrUrl, '_blank');
  };

  return (
    <>
      <section className="wrapper">
        <div id="quote-box">
          <h1 id="text" className={fade ? 'fade-in' : ''}>"{quote}"</h1>
          <p id="author" className={fade ? 'fade-in' : ''}>-- {author}</p>
          <div className="buttons">
            <div className="socials">
              <a
                id="tweet-quote"
                className="socials__a" 
                title="Post this quote on Twitter"
                href="twitter.com/intent/tweet"
                onClick={shareOnTwitter}
                >
                <i className="fa-brands fa-twitter"></i>
              </a>

              <a
                id="tumblr-quote"
                className="socials__a"
                title="Post this quote on tumblr"
                onClick={shareOnTumblr}
                >
                <i className="fa-brands fa-tumblr"></i>
              </a>
            </div>
            <button id="new-quote" onClick={() => {getQuote(); changeColor();}}>New Quote</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;