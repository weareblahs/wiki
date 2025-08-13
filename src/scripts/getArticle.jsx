import ky from "ky";

// https://en.wikipedia.org/api/rest_v1/page/random/summary

function getRandomSentence(text) {
  const sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim() !== "");

  // Check if there are any sentences
  if (sentences.length === 0) {
    throw "No sentence";
  }

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex].trim();
}

export const getArticle = async () => {
  const res = await ky
    .get("https://en.wikipedia.org/api/rest_v1/page/random/summary")
    .json();
  console.log(res);
  return {
    thumbnail: res.thumbnail ? res.thumbnail.source : null,
    ans: res.title.split("(")[0].trim(),
    ans_full: res.title,
    image: res.originalimage ? res.originalimage.source : null,
    sentence: getRandomSentence(res.extract)
      .replace(res.title, "...")
      .replace(res.title.split("(")[0], "..."),
    desc: res.desc,
    page: res.page,
    fs: res.extract_html,
  };
};

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export function similarity(s1, s2) {
  // src: https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}
