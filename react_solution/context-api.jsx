import { createContext, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';

const languages = ['Javascript', 'Python', 'Cpp'];

const LanguageContext = createContext({
  languages,
  language: languages[0],
  setLanguage: () => {},
});

const MainSection = () => {
  const { languages, language, setLanguage } = useContext(LanguageContext);
  const currentIndex = languages.indexOf(language);

  const toggleLanguage = () => {
    currentIndex === languages.length - 1
      ? setLanguage(language[0])
      : setLanguage(language[currentIndex + 1]);
  };

  return (
    <div>
      <p id="favoriteLanguage">{`Favorite programming language: ${language}`}</p>
      <button id="changeFavorite" onClick={toggleLanguage}>
        Toggle language
      </button>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = useState(languages[0]);

  return (
    <LanguageContext.Provider value={{ languages, language, setLanguage }}>
      <MainSection />
    </LanguageContext.Provider>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<App />);
