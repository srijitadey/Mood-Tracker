const moodButtons = document.querySelectorAll(".btn");
const moodList = document.getElementById("mood-list");

moodButtons.forEach((button) => {
    button.addEventListener("click" , () => {
        const mood = button.getAttribute("mood-emoji");
        addMoodToHistory(mood);
        });
});
function addMoodToHistory(mood){
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {
        hour : "2-digit" ,
        minute : "2-digit" ,

    });

    const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() -7);

    const filteredHistory = moodHistory.filter(entry => new Date(entry.date) >=oneWeekAgo);

    filteredHistory.push({mood , date , time});

    localStorage.setItem("moodHistory" , JSON.stringify(filteredHistory));

    displayMood({mood , date , time});


    function displayMood(entry) {
        const moodItem = document.createElement("li");
        moodItem.innerHTML = `<span>${entry.mood}</span> <span>${entry.date} ${entry.time}</span>`;
        moodList.appendChild(moodItem);
    }
    
    
    // Load mood history on page load
    window.addEventListener("DOMContentLoaded", () => {
        const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
        
        // Remove moods older than 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
        const filteredHistory = moodHistory.filter(entry => new Date(entry.date) >= oneWeekAgo);
    
        // Display filtered moods
        filteredHistory.forEach(displayMood);
    
        // Update localStorage with the cleaned history
        localStorage.setItem("moodHistory", JSON.stringify(filteredHistory));
    });
}


