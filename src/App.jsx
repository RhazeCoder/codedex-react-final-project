import { useState, useEffect } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import UserForm from './components/UserForm';
import Results from './components/Results';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';

export default function App() {
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"]
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air"
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleUserFormSubmit = (name) => {
    setUserName(name);
  };

  const determineElement = (answers) => {
    const counts = {};
    answers.forEach(answer => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  const fetchArtwork = async (keyword) => {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
    const data = await response.json();
    setArtwork(data.message);
    console.log(data.message)
  };

  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results
                  element={element}
                  artwork={artwork}
                />
              )
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
}