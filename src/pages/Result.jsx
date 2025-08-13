import parse from "html-react-parser";

export const Result = ({ res, perc, article, setAnsDisp }) => {
  return (
    <>
      <div className="fc absolute top-0 left-0 bg-black/30">
        <div className="bg-white w-[90vw] h-[90vh] rounded-2xl block">
          <h1 className="text-6xl mt-8 mb-4">
            {res == "correct" ? (
              <span className="text-green-600">Correct</span>
            ) : (
              <span className="text-red-500">Incorrect</span>
            )}
          </h1>
          <h3 className="text-xl">Answer accuracy: {perc.toFixed(2) * 100}%</h3>
          <div className="text-start px-6 mt-6 mb-6">
            <img
              src={article.image}
              alt=""
              className="h-60 w-[100%] object-cover rounded-t-2xl"
            />
            <h1 className="text-3xl article-font mt-3">{article.ans_full}</h1>
            <span className="text-base py-3 line-clamp-5">
              {parse(article.fs)}
            </span>
            <center className="mt-5">
              <a
                href={`https://en.wikipedia.org/wiki/${article.ans_full.replaceAll(
                  " ",
                  "_"
                )}`}
                className="bg-blue-500 px-4 py-2 text-white mt-5 rounded-lg"
              >
                View article
              </a>
            </center>
            <center className="mt-5">
              <button
                className="bg-blue-500 px-4 py-2 text-white rounded-lg"
                onClick={() => setAnsDisp(false)}
              >
                Continue
              </button>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};
