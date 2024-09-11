document.addEventListener("DOMContentLoaded", function () {
    const easyQuestions = [
      "Describe your favorite hobby.",
      "What is the most memorable event in your life?",
      "Explain a recent project you enjoyed working on.",
      "Discuss a book that made a big impression on you.",
      "What are your goals for the next five years?"
    ];
  
    const moderateQuestions = [
      "Discuss the impact of social media on society.",
      "Explain the importance of environmental conservation.",
      "How can technology influence education?",
      "What are the benefits and drawbacks of remote work?",
      "Describe the challenges faced by modern-day entrepreneurs."
    ];
  
    const hardQuestions = [
      "Analyze the effects of globalization on local cultures.",
      "Discuss the ethical implications of artificial intelligence.",
      "Evaluate the role of government in managing economic crises.",
      "How can we address income inequality in a globalized world?",
      "Examine the impact of climate change on global food security."
    ];
  
    const essayQuestion = document.getElementById("essayQuestion");
    const essayAnswer = document.getElementById("essayAnswer");
    const timerDisplay = document.getElementById("timeLeft");
    const wordCount = document.getElementById("currentCount");
    const maxCount = document.getElementById("maxCount");
    const warningPopup = document.getElementById("warningPopup");
    const warningTime = document.getElementById("warningTime");
    const submitBtn = document.getElementById("submitBtn");
  
    let timer;
    let totalTime;
    let timeLeft;
  
    function startTimer(seconds) {
      clearInterval(timer);
      totalTime = seconds;
      timeLeft = seconds;
      updateTimerDisplay();
  
      timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
  
        if (timeLeft <= 0) {
          clearInterval(timer);
          submitForm();
        } else if (timeLeft <= 120) {
          showWarning();
        }
      }, 1000);
    }
  
    function updateTimerDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    function showWarning() {
      warningTime.textContent = timerDisplay.textContent;
      warningPopup.style.display = 'block';
    }
  
    function hideWarning() {
      warningPopup.style.display = 'none';
    }
  
    function getWordCount(text) {
      return text.split(/\s+/).filter(word => word.match(/^\w+$/)).length;
    }
  
    function updateWordCount() {
      const text = essayAnswer.value;
      const wordCountValue = getWordCount(text);
      let maxWords;
  
      if (document.getElementById("easy").checked) {
        maxWords = 150;
      } else if (document.getElementById("moderate").checked) {
        maxWords = 200;
      } else if (document.getElementById("hard").checked) {
        maxWords = 250;
      }
  
      wordCount.textContent = wordCountValue;
      maxCount.textContent = maxWords;
  
      if (wordCountValue > maxWords) {
        const excessText = text.split(/\s+/).slice(maxWords).join(' ');
        essayAnswer.innerHTML = text.split(/\s+/).slice(0, maxWords).join(' ') +
          `<span class="red-text">${excessText}</span>`;
      } else {
        essayAnswer.innerHTML = text;
      }
    }
  
    function populateQuestion(difficulty) {
      let questions;
      switch (difficulty) {
        case 'easy':
          questions = easyQuestions;
          startTimer(300);
          break;
        case 'moderate':
          questions = moderateQuestions;
          startTimer(600);
          break;
        case 'hard':
          questions = hardQuestions;
          startTimer(900);
          break;
        default:
          return;
      }
  
      const question = questions[Math.floor(Math.random() * questions.length)];
      essayQuestion.textContent = question;
    }
  
    function submitForm() {
      essayAnswer.disabled = true;
      submitBtn.disabled = true;
      alert("Time's up! Your essay has been submitted.");
    }
  
    document.getElementById("examForm").addEventListener("submit", function (event) {
      event.preventDefault();
      submitForm();
    });
  
    document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
      radio.addEventListener("change", function () {
        populateQuestion(this.value);
        submitBtn.disabled = false;
        hideWarning();
      });
    });
  
    essayAnswer.addEventListener("input", updateWordCount);
  });
  