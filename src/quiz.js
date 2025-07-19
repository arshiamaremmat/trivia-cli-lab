import readline from 'readline';
import { questions } from './data/questions.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let score = 0;
let current = 0;
const timePerQuestion = 10000;

function askQuestion(index) {
  const q = questions[index];
  console.log(`\nQ${index + 1}: ${q.question}`);
  q.options.forEach((opt, i) => console.log(`${i + 1}) ${opt}`));

  const timer = setTimeout(() => {
    console.log("\n⏰ Time's up!");
    next();
  }, timePerQuestion);

  rl.question("Your answer (1-4): ", (input) => {
    clearTimeout(timer);
    const selected = q.options[Number(input) - 1];
    if (selected === q.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! The correct answer was: ${q.answer}`);
    }
    next();
  });
}

function next() {
  current++;
  if (current < questions.length) {
    askQuestion(current);
  } else {
    console.log(`\n🎉 Game Over! Your final score: ${score}/${questions.length}`);
    rl.close();
  }
}

export function startQuiz() {
  console.log("🧠 Welcome to the Trivia Quiz!");
  askQuestion(current);
}
