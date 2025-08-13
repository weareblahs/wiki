# What's this?

This is a simple guessing game where the user guesses the random Wikipedia article by an extract or the primary image.

# How to play?

The user will be prompted with a random sentence of a random Wikipedia article's introduction, which the user has to type the article name into the field. The user can then select whether to reveal the primary image or not by using the "Reveal image" button on the bottom. When the user clicks "Submit answer", it will compare the user's answer with the answer (article name) and checks for its similarity, if it reaches over 50%, then it is judged as a correct answer, and score will be added. No scores are deducted for this game as this game only has a "correct" and "incorrect" counter.

# How does it work?

- This retrieves a summary of an random article via Wikipedia's API (via the `https://en.wikipedia.org/api/rest_v1/page/random/summary` endpoint), then fetches the extract and selects a random sentence
- Then, it replaces the correct answer with "..." in the selected sentence, which will avoid users from guessing it straight from the selected extract
- After user types in the answer, it compares it with both full and partial answer (since the "answer" string strips off the "()" symbols, full_ans is required if the user types in the full answer (including the "()")) checks the accuracy percentage (see "How to play?" for details)
- The user will then see the result and whether to view the related Wikipedia article or not

# Where can I see this project?

The project is available live on https://wikiguess.ntyx.dev.

If you prefer to run locally, ensure you have Node.js installed, then:

```bash
git clone https://github.com/weareblahs/wiki
cd wiki
npm i
npm run dev
```

After this, open `http://localhost:5173` in your browser.

Or if you prefer to deploy it to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fweareblahs%2Fwiki)

# License?

This project is license under the MIT license. Wikipedia content used under CC BY-SA license, which further detail can be seen at the [Wikipedia:Reusing_Wikipedia_content](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content) meta page of Wikipedia.

# Current bugs

- Splitting will not be accurate. Since it will split after every period mark, parsing some values (example temperature, radio frequencies, formatted ellipsis, etc) will resulting it to return a random unrelated sentence.
