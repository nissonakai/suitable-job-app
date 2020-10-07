import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { TwitterShareButton, TwitterIcon } from "react-share";

import PageHeader from "./PageHeader";

import Constants from "../Constants";

interface Props {
  vAnswers: number[][];
  pAnswers: number[][];
  setpAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setvAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  checkAnswers: (answers: number[][]) => boolean;
  resultTop: string;
}

const Result: React.FC<Props> = ({
  vAnswers,
  pAnswers,
  setpAnswers,
  setvAnswers,
  checkAnswers,
  resultTop,
}) => {
  const { questionsLen, answersLen } = Constants;
  const validAnswers = checkAnswers(vAnswers);
  const history = useHistory();
  const backTop = () => {
    history.push("/");
    setvAnswers(
      Array(questionsLen["vQuestions"]).fill(
        Array(answersLen["vQuestions"]).fill(0)
      )
    );
    setpAnswers(
      Array(questionsLen["pQuestions"]).fill(
        Array(answersLen["pQuestions"]).fill(0)
      )
    );
  };

  const maxIndexs: (arr: number[][]) => number[] = (arr) => {
    const sumArr = arr.reduce((acc, current) =>
      acc.map((a, i) => a + current[i])
    );
    const max = sumArr.reduce((a, b) => Math.max(a, b));
    const targetArr: number[] = [];
    sumArr.forEach((a, index) => {
      if (a === max) {
        targetArr.push(index + 1);
      }
    });
    return targetArr;
  };

  const valuesMax = maxIndexs(vAnswers);
  const personalityMax = maxIndexs(pAnswers);

  const MaxTitle: (max: number[]) => number = (max) =>
    max.length === 1 ? max[0] : max[Math.floor(Math.random() * max.length)];

  return !validAnswers ? (
    <>
      <PageHeader title="診断結果" />
      <h1>
        <img src={resultTop} alt="診断結果" className="sectop-result" />
      </h1>
      <div className="result-box">
        <h2 className="result-top">価値観診断テスト結果</h2>
        <p className="result-you">あなたは…</p>
        <p className="result-type">{MaxTitle(valuesMax)}タイプ！</p>
        <p className="result-desc">
          ほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃ
        </p>
        <h2 className="result-top">性格診断テスト結果</h2>
        <p className="result-you">あなたは…</p>
        <p className="result-type">{MaxTitle(personalityMax)}タイプ！</p>
        <p className="result-desc">
          ほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃほにゃ
        </p>
      </div>
      <p onClick={() => backTop()} className="btn">
        トップへ
      </p>
      <div className="result-share">
        <TwitterShareButton
          url="https://nisso-jobcheck.netlify.app/"
          title={`あなたの価値観タイプは「${MaxTitle(
            valuesMax
          )}タイプ」、性格タイプは「${MaxTitle(
            personalityMax
          )}タイプ」！工場求人ナビのプチ自分発見診断でお気軽に価値観・性格診断しよう`}
          hashtags={["工場求人ナビ", "プチ自分発見診断"]}
          via="717450NISSO"
          related={["717450NISSO"]}
          className="result-sharebtn"
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <p>プチ自分発見診断をTwitterでシェア！</p>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Result;
