document.addEventListener("DOMContentLoaded", function () {
    const chatOutput = document.getElementById("chat-output");
    const userInput = document.getElementById("user-input");
    const submitButton = document.getElementById("submit-button");
    const apiKey = "AIzaSyDccdbcr_Q3c3rGods8sdl7J42cj0HXQ_c";

    // Initial greeting message
    displayBotMessage("Hello! I'm your song recommender. How are you feeling today?");

    submitButton.addEventListener("click", function () {
        const userMood = userInput.value;
        displayUserMessage(userMood);
        recommendSong(userMood);
        userInput.value = "";
    });

    function recommendSong(userMood) {
        const keywords = {
            "happy": ["happy songs", "upbeat music", "cheerful tunes"],
            "sad": ["sad songs", "emotional music", "heartbreaking melodies"],
            "angry": ["angry songs", "aggressive music", "furious tunes"]
        }[userMood.toLowerCase()];

        if (!keywords) {
            displayBotMessage("I'm sorry, I couldn't understand your mood.");
            return;
        }

        const keyword = keywords[Math.floor(Math.random() * keywords.length)];
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${keyword}&type=video&part=snippet&maxResults=5`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayBotMessage("Here are some song recommendations:");
                displayYouTubeResults(data.items);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function displayUserMessage(message) {
        const userMessage = createMessageElement(message, "user-message");
        chatOutput.appendChild(userMessage);
    }

    function displayBotMessage(message) {
        const botMessage = createMessageElement(message, "bot-message");
        chatOutput.appendChild(botMessage);
    }

    function displayYouTubeResults(items) {
        items.forEach(item => {
            const title = item.snippet.title;
            const videoId = item.id.videoId;
            const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
            const resultMessage = `<a href="${videoLink}" target="_blank">${title}</a>`;
            displayBotMessage(resultMessage);
        });
    }

    function createMessageElement(message, className) {
        const messageElement = document.createElement("div");
        messageElement.className = `chat-message ${className}`;
        messageElement.innerHTML = `<p>${message}</p>`;
        return messageElement;
    }
});
