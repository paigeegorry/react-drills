import { useEffect, useState } from "react";

export default function Quote() {
  const [quoteObj, setQuoteObj] = useState(null);
  const [font, setFont] = useState('sans-serif');

  const fetchQuote = () => {
    return fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(setQuoteObj);
  }

  useEffect(() => {
    const fonts = ['sans-serif', 'serif', 'cursive', 'monospace', 'fantasy'];
    setTimeout(() => {
      setFont(fonts[Math.floor(Math.random() * fonts.length)]);
    }, 5000)
  }, [font])

  useEffect(() => {
    if(quoteObj) {
      const { content: quote, author } = quoteObj;
      const quoteSpeak = new SpeechSynthesisUtterance(`${quote} by ${author}`);
      speechSynthesis.speak(quoteSpeak);
    }
  }, [quoteObj])

  return (
    <>
      <h1>Quote</h1>
      <button onClick={fetchQuote}>Fetch Quote</button>
      {quoteObj && (
        <div style={{ fontFamily: font }}>
          <p>"{quoteObj?.content}"</p>
          <p>by {quoteObj?.author}</p>
        </div>
      )}
    </>
  )
}
