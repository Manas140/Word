const api = 'https://random-words-api.vercel.app/word'
const list = document.querySelector('.main')
// const more = document.querySelector('.more');
// more.addEventListener('click', loadMore);

function getWord(num) {
  let i=0
  while (i < num) {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        content = data[0]
        list.innerHTML += `
          <a href="https://www.google.com/search?q=define+${content.word}">
            <div>
              <h3>${content.word}</h3>
              <p><b>Pronunciation:</b> ${content.pronunciation}</p>
              <p><b>Definition:</b> ${content.definition}</p>
              <p></p>
            </div>
          </a>
        `;
      })
    i++;
  }
}

function loadMore() {
  getWord(3)
}

getWord(6)
