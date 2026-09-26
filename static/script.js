async function askAI() {
    const questionBox = document.getElementById("question");
    const chat = document.getElementById("chat");

    const question = questionBox.value.trim();

    if (!question) {
        return;
    }

    // User message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerText = question;
    chat.appendChild(userMessage);

    questionBox.value = "";

    // Loading message
    const aiMessage = document.createElement("div");
    aiMessage.className = "message ai";
    aiMessage.innerText = "🤔 Kanzyra is thinking...";
    chat.appendChild(aiMessage);

    chat.scrollTop = chat.scrollHeight;

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        aiMessage.innerText = data.answer;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        aiMessage.innerText = "❌ Something went wrong.";
    }
}

function clearChat() {
    document.getElementById("chat").innerHTML = "";
    document.getElementById("question").value = "";
}

document.getElementById("question").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askAI();
    }
});
