import React from 'react'
import './News.css'
export default function News() {
  let page =3 ;
let k = 0;
let t = 0;
let parentElement = document.getElementById('cardContainer');
let query ="weather";
var sea = document.getElementById('cardContainer');

function search() {
  let parentElement = document.getElementById('cardContainer');
    parentElement.innerHTML = '';
    query = document.getElementById('search-input').value;
    console.log(query);
    checknews(query);
  }
  
  sea = '';
  var cardData = [
    { title: 'Card ' + t, content: 'This is the content of Card 1.' },
  ];
  
  async function checknews(query) {
    document.addEventListener('DOMContentLoaded', function() {
      var sea = document.getElementById('cardContainer');
      console.log(query);
      if (sea && sea.innerHTML !== null) {
        console.log(sea.innerHTML);
      }
    });
      const apiKey = 'd80ba0c8034e4dd79ad334819a0d88f4';
    const api = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${page}`;

    try {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        console.log(data.articles.length);

        const newCardData = [];
       
        for (let i = k; i <k+8; i++) {
            if (data.articles[i].description == null) {
                continue;
            }
            newCardData.push({
                title: data.articles[i].title.slice(0,60)+ ". . . ",
                content: data.articles[i].description.slice(0,120) + ". . .",
                image: data.articles[i].urlToImage,
            });
            t++;
        }

        addCardsToContainer(newCardData);
    } catch (error) {
        console.error('Error fetching news data:', error);
    }
}


console.log(k);

function createCard(title, content, image) {
    const card = document.createElement('div');
    card.classNameName = 'card';
    card.innerHTML = `
      <div id="cards">
        <img src="${image}" id="img">
        <h3>${title}</h3>
        <p>${content}</p>
        <div/>
    `;
    return card;
}

function addCardsToContainer(data) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = " ";
    data.forEach(item => {
        console.log(item.image);
        if(item.image!==null){
        const card = createCard(item.title, item.content, item.image);
        cardContainer.appendChild(card);
        }
    });
    
}

// Add cards to the container
checknews(query);
// showbtn=()=>{
//     var element = document.getElementById("navigationButtons");
//     element.classNameList.toggle("btn");
// }


function increpage(){
    if(k>=50){
        alert("end of page");
    }else{
        k=k+8;
    }

    checknews(query);
}
function decrepage(){
    if(k<=0){
        alert("home page");
    }else{
        k=k-8;
    }

    checknews(query);
}

  return (
   <>
              <input className="form-control me-2" type="text" id="search-input" placeholder="Search" aria-label="Search"/>
      <button className="google-search-button" onClick={search}>Search</button>

                   
    <div className="">
        
        <input type="text"  placeholder="Search..."/>
        <button className="" >Search</button>
    </div> 

<div id="cardContainer">
  
</div>
<div id="navigationButtons" >
    <button onClick={decrepage} id="prevButton"> Previous</button>
    <button onClick={increpage} id="nextButton">Next </button>
</div>   
</>
  )
}
