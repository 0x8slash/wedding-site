// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("https://localhost:3000/api/random-response");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the headers with fetched data
async function updateHeaders() {
  const data = await fetchData();

  if (data) {
    document.getElementById("Q1").textContent = data.question1;
    document.getElementById("Q2").textContent = data.question2;
    document.getElementById("Q3").textContent = data.question3;
    document.getElementById("Q4").textContent = data.question4;
    document.getElementById("Q5").textContent = data.question5;
    document.getElementById("Q6").textContent = data.question6;
  }
}

// Call the updateHeaders function when the page finishes loading
window.addEventListener("load", updateHeaders);

// Function to reveal the Q6 header
function revealQ6() {
  const q6Header = document.getElementById("Q6");
  q6Header.classList.remove("hidden");
}

// Add event listener to the button
const revealBtn = document.getElementById("revealBtn");
revealBtn.addEventListener("click", revealQ6);
