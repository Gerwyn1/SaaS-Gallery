import "./feedback.css";
import { useEffect, useRef, useState } from "react";
// import ScriptTag from 'react-script-tag';

const FeedbackEmoji = () => {
  return (
    <>
      <div className="feedback-container">
        <div className="emoji-container">
          <i className="far fa-angry fa-3x"></i>
          <i className="far fa-frown fa-3x"></i>
          <i className="far fa-meh fa-3x"></i>
          <i className="far fa-smile fa-3x"></i>
          <i className="far fa-laugh fa-3x"></i>
        </div>
        <div className="rating-container">
          <i className="fas fa-star fa-2x active"></i>
          <i className="fas fa-star fa-2x"></i>
          <i className="fas fa-star fa-2x"></i>
          <i className="fas fa-star fa-2x"></i>
          <i className="fas fa-star fa-2x"></i>
        </div>
      </div>
    </>
  );
};

export default function Form() {
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [scriptContent, setScriptContent] = useState('');
  const handleSubmit = async (e) => {
    setResult("");
    e.preventDefault();
    // validating data
    if (!name || !email || !subject || text?.length < 10) {
      setResult("Please verify your inputs ...");
      return null;
    }
    const data = { name, email, subject, text };
    fetch("http://localhost:3001/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json?.message);
        setResult(`Result: ${json?.message}`);
        setName("");
        setEmail("");
        setSubject("");
        setText("");
      })
      .catch((error) => {
        console.log(error?.message);
        setResult(`Error: ${error?.message}`);
      });
  };

  // useEffect(() => {
  //   const fetchScript = async () => {
  //     try {
  //       const response = await fetch('/index.js'); // Adjust the path accordingly
  //       const scriptCode = await response.text();
  //       setScriptContent(scriptCode);
  //     } catch (error) {
  //       console.error('Error fetching script:', error);
  //     }
  //   };

  //   fetchScript();
  // }, []);

  return (
    <>
    <FeedbackEmoji />
    <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    {/* <ScriptTag defer type="text/javascript" src="./index.js"/> */}
    </>
    // <div className="App">
    //   <h1>Share Your Thoughts with Us</h1>
    //   <form onSubmit={handleSubmit} className="form__container">
    //     <div className="form__controls">
    //       <label htmlFor="name">Name</label>
    //       <input
    //         ref={nameRef}
    //         type="text"
    //         id="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>
    //     <div className="form__controls">
    //       <label htmlFor="email">Email</label>
    //       <input
    //         id="email"
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="form__controls">
    //       <label htmlFor="subject">Subject</label>
    //       <input
    //         id="subject"
    //         className="input__subject"
    //         type="text"
    //         value={subject}
    //         onChange={(e) => setSubject(e.target.value)}
    //       />
    //     </div>
    //     <div className="form__controls">
    //       <label htmlFor="text">Text</label>
    //       <textarea
    //         rows="5"
    //         id="text"
    //         type="text"
    //         value={text}
    //         onChange={(e) => setText(e.target.value)}
    //       />
    //     </div>
    //     <div className="form__controls">
    //       <button className="button">Send Feedback</button>
    //     </div>
    //   </form>
    //   <p style={{ color: result.startsWith("Result") ? "green" : "red" }}>
    //     {result}
    //   </p>
    // </div>
  );
}
