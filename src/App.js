import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from "./components/Start";
import { PQuestions } from "./components/PQuestions";
import { VQuestions } from "./components/VQuestions";
import { NotFound } from "./components/NotFound";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


function App() {

  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios.get(process.env.REACT_APP_SJC_QUESTIONS + "/1")
      .then(r => {
        const datas = r.data.data;
        setQuestions(datas);
      }).catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions();
  }, [setQuestions]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Start
             questions={questions}
              />
          </Route>
          <Route path="/personality/:index">
            <PQuestions />
          </Route>
          <Route path="/values/:index">
            <VQuestions />
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
