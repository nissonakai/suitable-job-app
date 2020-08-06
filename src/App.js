import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from "./components/Start";
import { SectionTop } from "./components/SectionTop";
import { Board } from "./components/Board";
import { Result } from "./components/Result";
import { NotFound } from "./components/NotFound";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [valuesAnswers, setValuesAnswers] = useState(Array(4).fill(0));
  const [personalityAnswers, setPersonalityAnswers] = useState(Array(6).fill(0));

  useEffect(() => {
    const getvQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_VQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setvQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };
  
    const getpQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_PQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setpQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };

    getvQuestions();
    getpQuestions();

  }, []);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Start />
          </Route>
          <Route path="/values/top">
            <SectionTop
              type="values"
            />
          </Route>
          <Route path="/values/:index">
            <Board 
              questions={vQuestions}
              answers={valuesAnswers}
              setAnswers={setValuesAnswers}
              type="values"
            />
          </Route>
          <Route path="/personality/top">
            <SectionTop
              type="personality"
            />
          </Route>
          <Route path="/personality/:index">
            <Board 
              questions={pQuestions}
              answers={personalityAnswers}
              setAnswers={setPersonalityAnswers}
              type="personality"
            />
          </Route>
          <Route path="/result">
            <Result
              setPersonalityAnswers={setPersonalityAnswers}
              setValuesAnswers={setValuesAnswers}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
