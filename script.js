const questionsData = {
    "Pop": [
        { song: "TQG", options: ["Jennifer Lopez", "Shakira", "Karol G", "Anitta"], correct: 2 },
        { song: "Despechá", options: ["Nathy Peluso", "Bad Gyal", "Rosalía", "Tokischa"], correct: 2 },
        { song: "Flowers", options: ["Selena Gomez", "Katy Perry", "Miley Cyrus", "Taylor Swift"], correct: 2 },
        { song: "Blinding Lights", options: ["Bruno Mars", "The Weeknd", "Drake", "Justin Bieber"], correct: 1 },
        { song: "As It Was", options: ["Shawn Mendes", "Harry Styles", "Ed Sheeran", "Niall Horan"], correct: 1 },
        { song: "Levitating", options: ["Dua Lipa", "Rita Ora", "Bebe Rexha", "Ava Max"], correct: 0 },
        { song: "Bad Guy", options: ["Billie Eilish", "Lorde", "Olivia Rodrigo", "Halsey"], correct: 0 },
        { song: "La Bachata", options: ["Prince Royce", "Romeo Santos", "Manuel Turizo", "Camilo"], correct: 2 },
        { song: "Todo de Ti", options: ["Sebastian Yatra", "Rauw Alejandro", "Ricky Martin", "Luis Fonsi"], correct: 1 },
        { song: "Shivers", options: ["Lewis Capaldi", "Ed Sheeran", "Tom Walker", "George Ezra"], correct: 1 }
    ],
    "Hip-Hop": [
        { song: "Dracukeo", options: ["Yung Beef", "Kidd Keo", "C. Tangana", "Kaydy Cain"], correct: 1 },
        { song: "Safaera", options: ["Anuel AA", "J Balvin", "Rauw Alejandro", "Bad Bunny"], correct: 3 },
        { song: "Columbia", options: ["Quevedo", "Myke Towers", "Feid", "Mora"], correct: 0 },
        { song: "Baby Hello", options: ["Mora", "Bizarrap", "Jhayco", "Trueno"], correct: 1 },
        { song: "Lala", options: ["Ozuna", "Myke Towers", "Maluma", "Arcángel"], correct: 1 },
        { song: "Bzrp Music Sessions, Vol. 52", options: ["Tiago PZK", "Villano Antillano", "Quevedo", "Eladio Carrión"], correct: 2 },
        { song: "Lollypop", options: ["Anuel AA", "Bad Bunny", "Bryant Myers", "Kidd Keo"], correct: 3 },
        { song: "Classy 101", options: ["Young Miko", "Villano Antillano", "Nicki Nicole", "Maria Becerra"], correct: 0 },
        { song: "Punto G", options: ["Quevedo", "Mora", "Bad Bunny", "Anuel AA"], correct: 0 },
        { song: "Vista al Mar", options: ["Feid", "Quevedo", "Rauw Alejandro", "Myke Towers"], correct: 1 }
    ],
    "Rock": [
        { song: "Bohemian Rhapsody", options: ["Queen", "The Beatles", "Led Zeppelin", "Deep Purple"], correct: 0 },
        { song: "Smells Like Teen Spirit", options: ["Nirvana", "Pearl Jam", "Foo Fighters", "Soundgarden"], correct: 0 },
        { song: "Back In Black", options: ["AC/DC", "Guns N' Roses", "Iron Maiden", "Metallica"], correct: 0 },
        { song: "Highway to Hell", options: ["AC/DC", "Led Zeppelin", "Black Sabbath", "The Rolling Stones"], correct: 0 },
        { song: "Sweet Child O' Mine", options: ["Guns N' Roses", "Bon Jovi", "Aerosmith", "Def Leppard"], correct: 0 },
        { song: "Under the Bridge", options: ["Red Hot Chili Peppers", "Green Day", "Radiohead", "U2"], correct: 0 },
        { song: "Wonderwall", options: ["Oasis", "Blur", "The Verve", "Coldplay"], correct: 0 },
        { song: "Seven Nation Army", options: ["The White Stripes", "The Strokes", "The Black Keys", "Arctic Monkeys"], correct: 0 },
        { song: "Enter Sandman", options: ["Metallica", "Megadeth", "Pantera", "Slayer"], correct: 0 },
        { song: "Livin' on a Prayer", options: ["Bon Jovi", "Journey", "Van Halen", "Whitesnake"], correct: 0 }
    ],
    "Electrónica": [
        { song: "Levels", options: ["Avicii", "Tiësto", "David Guetta", "Skrillex"], correct: 0 },
        { song: "Titanium", options: ["David Guetta", "Calvin Harris", "Alesso", "Zedd"], correct: 0 },
        { song: "Animals", options: ["Martin Garrix", "Hardwell", "Nicky Romero", "Dimitri Vegas"], correct: 0 },
        { song: "One More Time", options: ["Daft Punk", "Justice", "Chemical Brothers", "Fatboy Slim"], correct: 0 },
        { song: "Clarity", options: ["Zedd", "Kaskade", "Porter Robinson", "Madeon"], correct: 0 },
        { song: "Lean On", options: ["Major Lazer", "Diplo", "DJ Snake", "Skrillex"], correct: 0 },
        { song: "Don't You Worry Child", options: ["Swedish House Mafia", "Axwell", "Sebastian Ingrosso", "Steve Angello"], correct: 0 },
        { song: "Wake Me Up", options: ["Avicii", "Kygo", "Robin Schulz", "Lost Frequencies"], correct: 0 },
        { song: "Prayer in C", options: ["Lilly Wood & The Prick", "Bakermat", "Klingande", "Felix Jaehn"], correct: 0 },
        { song: "Summer", options: ["Calvin Harris", "Avicii", "Alesso", "Sigala"], correct: 0 }
    ]
};

let selectedGenre = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let timer;
let timeLeft = 15;
let audio = new Audio(); // Instancia global de audio

const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const optionsContainer = document.getElementById('options-container');
const songNameText = document.getElementById('song-name');
const genreTag = document.getElementById('current-genre-text');
const timerDisplay = document.getElementById('timer-bar');

document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuario = localStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("username-display").innerText = `👤 ${nombreUsuario}`;
    }
});

// funció de audio
function playSong(songName) {
    audio.pause();
    audio.src = `audio/${songName}.mp3`;
    audio.play().catch(e => console.log("Esperando interacción del usuario"));
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedGenre = card.getAttribute('data-genre');
    });
});

document.getElementById('btn-play-hero').addEventListener('click', () => {
    if (!selectedGenre) { alert("¡Selecciona un estilo!"); return; }
    startQuiz(selectedGenre);
});

function startQuiz(genre) {
    currentQuestions = (questionsData[genre] || []).sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    genreTag.innerText = genre.toUpperCase();
    mainMenu.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.innerText = `Tiempo: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Tiempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

function loadQuestion() {
    startTimer();
    const q = currentQuestions[currentQuestionIndex];
    

    //  sonido de las canciones
    playSong(q.song);
    
    songNameText.innerText = `🎵 Fragmento de: "${q.song}"`;
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.classList.add('option-card');
        div.innerText = option;
        div.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(div);
    });
}

function checkAnswer(idx) {
    clearInterval(timer);
    audio.pause(); // Detener audio al responder
    const q = currentQuestions[currentQuestionIndex];
    
    if (idx === q.correct) { alert("¡Correcto! ✅"); } 
    else { alert(idx === -1 ? "¡Tiempo agotado!" : `Incorrecto. Era ${q.options[q.correct]}`); }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        alert("¡Has terminado el nivel!");
        location.reload();
    }
}

document.getElementById('btn-exit').onclick = () => { audio.pause(); location.reload(); };