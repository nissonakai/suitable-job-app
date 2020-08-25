import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Start from "./components/Start";
import SectionTop from "./components/SectionTop";
import Board from "./components/Board";
import Result from "./components/Result";
import NotFound from "./components/NotFound";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [vAnswers, setvAnswers] = useState(Array(4).fill(0));
  const [pAnswers, setpAnswers] = useState(Array(6).fill(0));

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


  const maxIndexs = arr => {
    const max = arr.reduce((a, b) => Math.max(a, b));
    let targetArr = [];
    arr.forEach((a, index) => {
      if (a === max) {
        targetArr.push(index);
      };
    });
    return targetArr;
  };

  const valuesMax = maxIndexs(vAnswers);
  const personalityMax = maxIndexs(pAnswers);

  const ROUTES = [
    { path: "/", Component: Start },
    { path: "/values/top", Component: SectionTop, atrributes: { type: "values" } },
    {
      path: "/values/:index", Component: Board, atrributes: {
        questions: vQuestions,
        answers: vAnswers,
        setAnswers: setvAnswers,
        type: "values"
      }
    },
    { path: "/personality/top", Component: SectionTop, atrributes: { type: "personality" } },
    {
      path: "/personality/:index", Component: Board, atrributes: {
        questions: pQuestions,
        answers: pAnswers,
        setAnswers: setpAnswers,
        type: "personality"
      }
    },
    {
      path: "/result", Component: Result, atrributes: {
        valuesMax: valuesMax,
        personalityMax: personalityMax,
        setpAnswers: setpAnswers,
        setvAnswers: setvAnswers
      }
    },
    { path: "", Component: NotFound }
  ];

  return (
    <div className="page">
      <Router>
        <div className="page__container">
          <Switch>
            {ROUTES.map(({ path, Component, atrributes }) => (
              <Route key={path} path={path} exact>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page__item-"
                    unmountOnExit
                  >
                    <div className="page__item">
                      <Component {...atrributes} />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
