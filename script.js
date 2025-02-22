document.getElementById("sendBtn").addEventListener("click", sendMessage);

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    // Display user message in chat
    addMessage("user", userMessage);

    // Clear input field
    inputField.value = "";

    try {
        // Send user message to the server and get the response
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        addMessage("ai", data.reply);
    } catch (error) {
        console.error("Error:", error);
        addMessage("ai", "Sorry, something went wrong.");
    }
}

function addMessage(sender, text) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
}
