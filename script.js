document.addEventListener("DOMContentLoaded", function(){

    const songs = [
        {
            title: "Mundhinam Parthene",
            duration: "5:43",
            thumbnail: "data/img/varanam aayiram.jpeg",  
            src: "data/Mundhinam-Parthene-MassTamilan.com.mp3",
            artist: "Naresh Iyer & Prasath",
            year: 2008,
           
        },
        {
            title: "Alwarpetai Aaluda",
            duration: "5:22" ,
            thumbnail: "data/img/vasool raja.jpeg", 
            src: "data/Alwarpetai-Aaluda.mp3" ,
            artist: "Kamal Hasan, VNP " ,
            year: 2004,
           
        },
        {
            title :"Annul Maelae",
            duration : "5:22",
            thumbnail : "data/img/varanam aayiram.jpeg",
            src : "data/Annul-Maelae-MassTamilan.com.mp3",
            artist :"Sudha Ragunathan",
            year : 2004,
        },
        {
            title : "Ava Enna Enna",
            duration : "5:20",
            thumbnail : "data/img/varanam aayiram.jpeg",
            src : "data/Ava-Enna-Enna-MassTamilan.com.mp3",
            artist: "Karthik & V.V Prasath",
            year : 2004,
        },
        {
            title : "Ela Machi Machi",
            duration : "4:34",
            thumbnail : "data/img/anbae shivam.jpeg",
            src : "data/Ela-Machi-Machi.mp3",
            artist : "Udit Narayana, Tippu",
            year : 2003,
        },
        {
            title: "Evano Oruvan Vasikiran",
            duration : "5:56",
            thumbnail: "data/img/alaipayuthey.jpeg",
            src: "data/Evano-Oruvan-Vasikiran.mp3",
            artist : "Swarnalatha",
            year : 2000,
        },
        {
            title : "Kadhal Sadugudu",
            duration : "4:35",
            thumbnail : "data/img/alaipayuthey.jpeg",
            src: "data/Kadhal-Sadugudu.mp3",
            artist : "S.P.B Charan & Naveen",
            year: 2000,
        },
        {
            title : "Manasilaayo",
            duration : "3:55",
            thumbnail : "data/img/vettain.jpeg",
            src: "data/Manasilaayo-MassTamilan.dev.mp3",
            artist : "Anirudh Ravichander, Vasudevan",
            year: 2024,
        },
        {
            title : "Mundhinam Parthene",
            duration : "5:43",
            thumbnail : "data/img/varanam aayiram.jpeg",
            src : "data/Mundhinam-Parthene-MassTamilan.com.mp3",
            artist : "Naresh Iyer & Prashanthini",
            year : 2004,
        },
        {
            title: "Pachchai Nirame",
            duration : "5:58",
            thumbnail : "data/img/alaipayuthey.jpeg",
            src : "data/Pachchai-Nirame.mp3",
            artist : "Hariharan & Clinton",
            year : 2000,
        },
        {
            title : "Un Paer Solla",
            duration : "5:09",
            thumbnail : "data/img/minsara kanna.jpeg",
            src : "data/Un-Paer-Solla.mp3",
            artist : "Hariharan,Sujatha",
            year : 1999,
        },
    ];
   
    let audio = new Audio();
   
    const songList = document.getElementById("song-list");
    const thumbnail = document.getElementById("thumbnail");
    const trackTitle = document.getElementById("player-title");
    const trackDescription = document.getElementById("player-description");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const leftTime = document.getElementById("time-left");
    const playPauseBtn = document.getElementById("play-pause");
    const volumeControl = document.getElementById("volume"); 
    //level 2 new buttons
    const shuffleBtn = document.getElementById("shuffle");
    const shuffleImg = document.getElementById("shuffle-img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const loopImg = document.getElementById("loop-img");
    const repeatBtn = document.getElementById("repeat");
    const customDropdown = document.getElementById("custom-dropdown");
    const dropDownItems = document.querySelectorAll(".custom-dropdown-item");



    playPauseBtn.addEventListener("click", playPause);
    progress.addEventListener("input", function(){
        audio.currentTime = progress.value;
    });
    volumeControl.addEventListener("input", updateVolume);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", () => updatePlayPauseButton(true));
    audio.addEventListener("pause", () => updatePlayPauseButton(false));
    // ///////////////////////Level 2 adding the event listener
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", ()=>nextSong(true));
    audio.addEventListener("ended", ()=> nextSong(false));
    shuffleBtn.addEventListener("click", toggleShuffleMode);
    repeatBtn.addEventListener("click", toggleRepeatMode);
    customDropdown.addEventListener("click", toggleDropDown);




    let currentSongIndex = 0;
    loadSong(currentSongIndex);

    ///////////level 2
    let isShufflemode = true;
    let isRepeatMode = false;

    const updatePlayPauseButton = (paused) => {
        playPauseBtn.innerHTML = paused
            ? `<img src="icons/pause.svg">`
            : `<img src="icons/play.svg">`;
    };

    function playPause(){
        if(audio.paused){
            audio.play();
            updatePlayPauseButton(audio.paused);
        } else {
            audio.pause();
            updatePlayPauseButton(audio.paused);
        }
    }

    function loadSong(index){
        const currentSong = songs[index];
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.innerText = currentSong.title;
        trackDescription.innerText = currentSong.artist;
        leftTime.textContent = "00:00";
        audio.addEventListener("loadedmetadata", function(){
            progress.max = audio.duration;
        });
        updateCurrentSongHighlight(index);
    }
    

    //level 2////////////////////////////////
    function prevSong(){
        currentSongIndex = currentSongIndex -1;
        loadSong(currentSongIndex);
        audio.play();
    }

    function nextSong(isBtnClicked){
        if(isShufflemode  || isBtnClicked ){
            currentSongIndex = currentSongIndex + 1;
            loadSong(currentSongIndex);
            audio.play();
        }
        else{
            audio.currentTime =0;
            progress.value =0;
            audio.play();
        }
    }

    function toggleShuffleMode(){
        isShufflemode = true;
        isRepeatMode =false;
        shuffleImg.src="icons/shuffle-highlight.svg";
        loopImg.src = "icons/loop.svg";
        updateButtonState(shuffleBtn, isShufflemode);
    }
    function toggleRepeatMode(){
        isShufflemode =false;
        isRepeatMode = true;
        shuffleImg.src ="icons/shuffle.svg";
        loopImg.src = "icons/loop-highlight.svg";
        updateButtonState(repeatBtn, isRepeatMode);
    }
    function updateButtonState(button, isActive){
        if(isActive){
            button.classList.add("selected");
        }
        else{
            button.classList.remove("selected");
        }
    }

    function toggleDropDown(){
        if( document.getElementById("dropdown-list-items").style.display === "block"){
            document.getElementById("dropdown-list-items").style ="display: none";
        }
        else{
            document.getElementById("dropdown-list-items").style= "display : block";
        }
    }

    dropDownItems.forEach(function (item) {
        item.addEventListener("click", function() {
            const selectedVal = this.getAttribute("data-value");
            audio.playbackRate = parseFloat(selectedVal);
    
            dropDownItems.forEach(function(item) {
                item.classList.remove("selected-speed");
            });
            this.classList.add("selected-speed")
        });
    });
    

   

    function updateVolume(){
        audio.volume = volumeControl.value;
    }

    function updateProgress(){
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const remainingTime = duration - currentTime;

        progress.value = currentTime;
        currTime.textContent = formatTime(currentTime);
        leftTime.textContent = `-${remainingTime >= 0 ? formatTime(remainingTime) : "00:00"}`;
    }

    function formatTime(time){
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    function updateCurrentSongHighlight(index){
        const songItems = document.querySelectorAll(".item-container");
        songItems.forEach((element) => {
            element.classList.remove("current-song");
        });

        const currentSongElement = document.querySelector(`.item-container[data-index="${index}"]`);
        if (currentSongElement) {
            currentSongElement.classList.add("current-song");
        }
    }

    function renderSongList(){
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const itemContainer = document.createElement("div");
         
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackDescription = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
            trackDescription.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            itemContainer.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audio.play();
                updatePlayPauseButton(true); 
            });

            imgElement.src = "icons/outline.svg";

            trackTitle.textContent = song.title;
            trackDescription.textContent = song.artist || "Unknown artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            itemImg.appendChild(imgElement);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackDescription);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
        });

        updateCurrentSongHighlight(currentSongIndex);
    }

    renderSongList();

        
    
});