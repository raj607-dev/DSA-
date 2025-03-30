document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("send-btn");

    chatbotBtn.addEventListener("click", function () {
        chatbotContainer.style.display = "block";
    });

    closeChatbot.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    sendBtn.addEventListener("click", async function () {
        let userInput = chatbotInput.value.trim();
        if (userInput === "") return;

        appendMessage("You", userInput);
        chatbotInput.value = "";

        appendMessage("Bot", "Thinking... 🤔");

        const botResponse = await getBotResponse(userInput);
        updateLastMessage(botResponse);
    });

    function appendMessage(sender, message) {
        let messageElement = document.createElement("p");
        messageElement.textContent = `${sender}: ${message}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function updateLastMessage(newMessage) {
        let lastMessage = chatbotMessages.lastChild;
        if (lastMessage) lastMessage.textContent = `Bot: ${newMessage}`;
    }

    async function getBotResponse(userMessage) {
        const apiKey = "AIzaSyCerD05fe4tpb64B7q3jkQ1t9jcJMkCdgo";  // Replace with your actual Gemini API Key
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

        const requestBody = {
            prompt: {
                text: userMessage
            },
            temperature: 0.9,
            maxOutputTokens: 200
        };

        try {
            const response = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            return data.candidates?.[0]?.output || "I'm not sure, can you ask again?";
        } catch (error) {
            console.error("Error:", error);
            return "Oops! Something went wrong.";
        }
    }
});
