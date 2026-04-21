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
        { song: "Safaera", options: ["Bad Bunny", "J Balvin", "Rauw Alejandro", "Anuel AA"], correct: 0 },
        { song: "Columbia", options: ["Quevedo", "Myke Towers", "Feid", "Mora"], correct: 0 },
        { song: "Baby Hello", options: ["Bizarrap", "Mora", "Jhayco", "Trueno"], correct: 2 },
        { song: "Lala", options: ["Ozuna", "Myke Towers", "Maluma", "Arcángel"], correct: 1 },
        { song: "Bzrp Music Sessions, Vol. 52", options: ["Tiago PZK", "Villano Antillano", "Quevedo", "Eladio Carrión"], correct: 2 },
        { song: "Lollypop", options: ["Kidd Keo", "Bad Bunny", "Bryant Myers", "Anuel AA"], correct: 0 },
        { song: "Classy 101", options: ["Young Miko", "Villano Antillano", "Nicki Nicole", "Maria Becerra"], correct: 0 }
    ],
    "Rock": [
        { song: "Bohemian Rhapsody", options: ["Queen", "The Beatles", "Led Zeppelin", "Deep Purple"], correct: 0 }
    ],
    "Electrónica": [
        { song: "Levels", options: ["Avicii", "Tiësto", "David Guetta", "Skrillex"], correct: 0 }
    ]
};

let selectedGenre = null;
let currentQuestions = [];
let currentQuestionIndex = 0;

const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const optionsContainer = document.getElementById('options-container');
const songNameText = document.getElementById('song-name');
const genreTag = document.getElementById('current-genre-text');
const btnPlayHero = document.getElementById('btn-play-hero');

// 1. Selección visual del estilo
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedGenre = card.getAttribute('data-genre');
    });
});

// 2. Inicio del juego tras pulsar "A jugar"
btnPlayHero.addEventListener('click', () => {
    if (!selectedGenre) {
        alert("¡Selecciona primero un estilo musical!");
        return;
    }
    startQuiz(selectedGenre);
});

function startQuiz(genre) {
    // Mezclar preguntas aleatoriamente según instrucciones del README
    currentQuestions = (questionsData[genre] || []).sort(() => Math.random() - 0.5);
    
    if (currentQuestions.length === 0) {
        alert("Próximamente más temas de este estilo.");
        return;
    }

    currentQuestionIndex = 0;
    genreTag.innerText = genre.toUpperCase();
    mainMenu.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];
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
    const q = currentQuestions[currentQuestionIndex];
    if (idx === q.correct) {
        alert("¡Correcto! 🔥");
    } else {
        alert(`Incorrecto. Era ${q.options[q.correct]}`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        alert("¡Has completado el nivel!");
        location.reload();
    }
}

document.getElementById('btn-exit').onclick = () => location.reload();