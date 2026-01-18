const adviceNumberEl = document.getElementById("advice-number");
const adviceTextEl = document.getElementById("advice-text");
const diceBtn = document.getElementById("dice-btn");

async function getAdvice() {
  try {
    // Add cache-busting to force fresh advice each click
    const response = await fetch(
      "https://api.adviceslip.com/advice?" + new Date().getTime()
    );
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const { id, advice } = data.slip;

    adviceNumberEl.textContent = `Advice #${id}`;
    adviceTextEl.textContent = `"${advice}"`;
  } catch (error) {
    console.error("Error fetching advice:", error);
    adviceTextEl.textContent = '"Could not load advice. Click again!"';
  }
}

// Load advice on page load
getAdvice();

// Fetch new advice on button click
diceBtn.addEventListener("click", getAdvice);
