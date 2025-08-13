import { useEffect, useState } from "react";
import "./App.css";
import { getArticle, similarity } from "./scripts/getArticle";
import { Result } from "./pages/Result";
function App() {
  const [count, setCount] = useState(0);
  const [article, setArticle] = useState({});
  const [cn, setcn] = useState(
    "object-contain h-75 w-75 lg:max-h-[500px] lg:max-w-[500px] blur-sm"
  );
  const [ans, setAns] = useState("");
  const [res, setResult] = useState({});
  const [ansDisp, setAnsDisp] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("wikiguess_correct")) {
      setCorrect(localStorage.getItem("wikiguess_correct"));
    } else {
      localStorage.setItem("wikiguess_correct", 0);
    }

    if (localStorage.getItem("wikiguess_incorrect")) {
      setIncorrect(localStorage.getItem("wikiguess_incorrect"));
    } else {
      localStorage.setItem("wikiguess_incorrect", 0);
    }
  }, []);
  const checkAnswer = (ans) => {
    const sim = similarity(ans.toLowerCase(), article.ans.toLowerCase());
    const sim_case_2 = similarity(
      ans.toLowerCase(),
      article.ans_full.toLowerCase()
    );
    if (sim > 0.5001 || sim_case_2 > 0.5001) {
      localStorage.setItem("wikiguess_correct", parseInt(correct) + 1);
      setCorrect(localStorage.getItem("wikiguess_correct"));
      setResult({
        result: "correct",
        score: sim_case_2 > sim ? sim_case_2 : sim,
      });
    } else {
      localStorage.setItem("wikiguess_incorrect", parseInt(incorrect) + 1);
      setIncorrect(localStorage.getItem("wikiguess_incorrect"));
      setResult({
        result: "incorrect",
        score: sim_case_2 > sim ? sim_case_2 : sim,
      });
    }
    setAnsDisp(true);
  };

  const refresh = () => {
    setArticle({});
    async function get() {
      const res = await getArticle();
      setArticle(res);
    }
    setAns("");
    get();

    setcn("object-contain h-75 w-75 lg:max-h-[500px] lg:max-w-[500px] blur-sm");
  };
  useEffect(() => {
    if (!ansDisp) {
      refresh();
    }
  }, [ansDisp]);

  return (
    <div className="overflow-x-hidden lg:overflow-hidden">
      {article.length != 0 ? (
        <>
          <i className="top">
            <div className="block">
              <center>
                {" "}
                <img src={article.image} alt="" srcset="" className={cn} />
              </center>
              <div className="w-[95%] ms-auto me-auto mt-5 text-xl lg:text-3xl article-font line-clamp-5 overflow-scroll lg:overflow-hidden">
                <center>"...{article.sentence}...."</center>
              </div>
            </div>
          </i>
          <center>
            <div className="bottom">
              <div className="cols col-span-12">
                <div className="block text-2xl">
                  ✔️: {correct} ❌: {incorrect}
                </div>
                <div className="block">
                  <input
                    type="text"
                    className="text-2xl border-2 px-4 py-2 rounded-lg max-w-[85%]"
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                    placeholder="Answer?"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div>
                    <button
                      onClick={() =>
                        setcn(
                          "object-contain h-75 w-75 lg:max-h-[500px] lg:max-w-[500px] transition"
                        )
                      }
                      className="bg-blue-500 px-4 py-2 text-white mt-2 rounded-lg"
                    >
                      Reveal image
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 px-4 py-2 text-white mt-2 rounded-lg"
                      onClick={() => checkAnswer(ans)}
                    >
                      Submit answer
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => refresh()}
                      className="bg-blue-500 px-4 py-2 text-white mt-2 rounded-lg"
                    >
                      Change article
                    </button>
                  </div>
                </div>
                <center className="lg:max-w-[100%] max-w-[80%]">
                  Wikipedia content used under CC BY-SA license. See{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content"
                    className="underline text-blue-500"
                  >
                    here
                  </a>{" "}
                  for details. <br />
                </center>
                {ansDisp ? (
                  <Result
                    res={res.result}
                    perc={res.score}
                    article={article}
                    setAnsDisp={setAnsDisp}
                  />
                ) : null}
              </div>
            </div>
          </center>
        </>
      ) : (
        "..."
      )}
    </div>
  );
}

export default App;
