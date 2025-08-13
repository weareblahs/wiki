import { useEffect, useState } from "react";
import "./App.css";
import { getArticle, similarity } from "./scripts/getArticle";
import { Result } from "./pages/Result";

function App() {
  const [count, setCount] = useState(0);
  const [article, setArticle] = useState({});
  const [cn, setcn] = useState("max-h-[500px] max-w-[500px] blur-sm");
  const [ans, setAns] = useState("");
  const [res, setResult] = useState({});
  const [ansDisp, setAnsDisp] = useState(false);
  useEffect(() => {
    async function get() {
      const res = await getArticle();
      setArticle(res);
    }
    get();
  }, []);

  const checkAnswer = (ans) => {
    const sim = similarity(ans.toLowerCase(), article.ans.toLowerCase());
    if (sim > 0.5001) {
      setResult({ result: "correct", score: sim });
    } else {
      setResult({ result: "incorrect", score: sim });
    }
    console.log(res);
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

    setcn("max-h-[500px] max-w-[500px] blur-sm");
  };
  useEffect(() => {
    if (!ansDisp) {
      refresh();
    }
  }, [ansDisp]);

  useEffect(() => {
    console.log(JSON.stringify(article));
  }, [article]);
  return (
    <div className="">
      {article.length != 0 ? (
        <>
          <i className="top">
            <div className="block">
              <center>
                {" "}
                <img src={article.image} alt="" srcset="" className={cn} />
              </center>
              <div className="w-[75%] ms-auto me-auto mt-5 text-3xl article-font">
                <center>"...{article.sentence}...."</center>
              </div>
            </div>
          </i>
          <center>
            <div className="bottom">
              <div className="cols col-span-12">
                <div className="block">(Counter coming soon)</div>
                <div className="block">
                  <input
                    type="text"
                    className="text-2xl border-2 px-4 py-2 rounded-lg"
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                    placeholder="Answer?"
                  />
                </div>
                <div className="flex">
                  <button
                    onClick={() =>
                      setcn("max-h-[500px] max-w-[500px] transition")
                    }
                    className="bg-blue-500 px-4 py-2 text-white mt-5 rounded-lg"
                  >
                    Reveal image
                  </button>

                  <button
                    className="bg-blue-500 px-4 py-2 text-white mt-5 ms-12 rounded-lg"
                    onClick={() => checkAnswer(ans)}
                  >
                    Submit answer
                  </button>

                  <button
                    onClick={() => refresh()}
                    className="bg-blue-500 px-4 py-2 text-white mt-5 ms-12 rounded-lg"
                  >
                    Change article
                  </button>
                </div>
                <center>
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
