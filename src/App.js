import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from "./components/Start";
import { PQuestions } from "./components/PQuestions";
import { VQuestions } from "./components/VQuestions";
import { NotFound } from "./components/NotFound";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [valuesAnswers, setValuesAnswers] = useState([]);
  const [personalityAnswers, setPersonalityAnswers] = useState(Array(6).fill(0));

  useEffect(() => {
    const getvQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_VQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setvQuestions(datas);
          console.log(vQuestions);
        }).catch(err => {
          console.log(err);
        });
    };
  
    const getpQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_PQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setpQuestions(datas);
          console.log(pQuestions);
        }).catch(err => {
          console.log(err);
        });
    };

    getvQuestions();
    getpQuestions();

  }, [vQuestions, pQuestions]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Start />
          </Route>
          <Route path="/values/:index">
            <VQuestions 
              questions={vQuestions}
              answers={valuesAnswers}
              setAnswers={setValuesAnswers}
            />
          </Route>
          <Route path="/personality/:index">
            <PQuestions 
              questions={pQuestions}
              answers={personalityAnswers}
              setAnswers={setPersonalityAnswers}
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
