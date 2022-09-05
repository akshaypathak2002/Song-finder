let term = ""; //We consider it empty string 
const songContainer = document.getElementById("songs");//This is the container in which all songs are present 

const updateTerm = () => { //It is es6 arrow function 
        term = document.getElementById("searchInput").value;//To get the value 
        if (!term || term === '') {
                alert("Please enter a search term ");
        }
        else {
                while (songContainer.firstChild) {//If the container has any child element then we need to remove it 
                        songContainer.removeChild(songContainer.firstChild);

                }
                const url = `https://itunes.apple.com/search?limit=10&media=music&term=${term}`; //With the $sign we add query string 
                fetch(url)//We are using limit to restrict the search limit to 10 
                        .then((response) => {
                                return response.json();
                        })
                        .then((data) => {
                                // console.log(data.results);
                                const artists = data.results;
                                return artists.map(result => {
                                        // const songContainer = document.getElementById("songs");

                                        //If we have to create multiple variables of const type then we can separate it by comma 
                                        const article = document.createElement('article');
                                        const artist = document.createElement('p');
                                        const song = document.createElement('p');
                                        const img = document.createElement('img');
                                        const audio = document.createElement('audio');
                                        const audioSource = document.createElement('source');
                                        //Artist name is the name in the data which we are fetching 
                                        artist.innerHTML = result.artistName;
                                        song.innerHTML = result.trackName; //trackName is the name in the dataBase 
                                        img.src = result.artworkUrl100;
                                        audioSource.src = result.previewUrl;
                                        audio.setAttribute('controls', '');
                                        // console.log(result);
                                        //All above element are child of article
                                        article.appendChild(img);
                                        article.appendChild(artist);
                                        article.appendChild(song);
                                        article.appendChild(audio);
                                        audio.appendChild(audioSource);
                                        songContainer.appendChild(article);


                                });


                        })
                        .catch(error => console.log('Request Failed:', error));
                //To search the api
                /*
                Syncrous code means that it is read from top to bottom */
                /*
                asyncrous code means that is is read from bottom to  top */


        }
}
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', updateTerm);
document.addEventListener('play', event => {
        const audio = document.getElementsByTagName('audio');
        //Now we will check if any thing is already playing 
        for (let i = 0; i < audio.length; i++) {
                if (audio[i] != event.target) {
                        audio[i].pause(); //We pause all other events that are present 
                        //And only 1 event is fired that is clicked by user 
                        console.log(event);
                }
        }
}, true);//It handles the even listner in bubling phase 