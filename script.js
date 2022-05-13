document.addEventListener('DOMContentLoaded', function(){ getWord(6); load(); });

const api = 'https://random-words-api.vercel.app/word'
const main = document.querySelector('.main');
const list = document.querySelector('.list');

let Dict;
if (localStorage.getItem("Dict") === null) {
  Dict = [];
} else {
  Dict = JSON.parse(localStorage.getItem("Dict"));
}

const more = document.querySelector('.more');
more.addEventListener('click', function() { getWord(3); });

const saved = document.querySelector('.saved');
saved.addEventListener('click', toggleSec);

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearList);

function getWord(num) {
  let i=0
  while (i < num) {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        content = data[0]
        main.innerHTML += `
            <div>
              <a href="https://google.com/search?&q=Define+${content.word}"><h3>${content.word}</h3></a>
              <p><b>Pronunciation:</b> ${content.pronunciation}</p>
              <p><b>Definition:</b> ${content.definition}</p>
              <p></p>
              <button class="save">Save</button>
            </div>
        `;
        document.querySelectorAll(".save").forEach(function(button) {
          button.addEventListener('click', toggle);  
        })
      })
    i++;
  }
}

function toggle(event) {
  a = event.target;
  if (a.innerHTML === "Save") {
    a.innerHTML = "Saved";
    save(a);
  } else {
    a.innerHTML = "Save";
    remove(a);
  }
}

function save(ele) {
  Dict.push(ele.parentElement.innerHTML);
  localStorage.setItem('Dict',JSON.stringify(Dict));
}

function remove(ele) {
  Dict.splice(ele.parentElement.innerHTML, 1);
  localStorage.setItem('Dict',JSON.stringify(Dict));
}

function clearList() {
  Dict = [];
  localStorage.setItem('Dict',JSON.stringify(Dict));
  load();
}

function load() {
  list.innerHTML = "";
  Dict.forEach(function(words) {
    list.innerHTML += `
      <div>
        ${words}
      </div>
    `;
    document.querySelectorAll(".save").forEach(function(button) {
      button.addEventListener('click', toggle);  
    })
  })
}

function toggleSec() {
  main.classList.toggle('hide');
  list.classList.toggle('hide');
  more.classList.toggle('hide');
  clear.classList.toggle('hide');
  if (saved.innerHTML === "Saves") {
    saved.innerHTML = "Home";
  } else {
    saved.innerHTML = "Saves";
  } 
  load();
} 
