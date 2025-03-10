let radio;
let submitButton;
let resultP;
let questionP;
let answerInput;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

let questions = [
  { 
    type: "multiple", // 選擇題
    question: "戀與深空誰是Kula的老公？", 
    options: ["沈星回", "黎深", "秦徹", "祁煜"], 
    correct: "祁煜" 
  },
  { 
    type: "multiple", // 選擇題
    question: "祁煜的暱稱是甚麼？", 
    options: ["小蚯蚓", "小狗", "小貓", "小魚餌"], 
    correct: "小魚餌" 
  },
  { 
    type: "fill", // 填充題
    question: "祁煜生日是甚麼時候？", 
    correct: "3/6"
  }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#d4a373");

  textSize(50);
  textAlign(CENTER, CENTER);
  text('戀與深空測驗', width / 2, 50);
  text("413730085", width / 2, 100);

  // 顯示題目
  questionP = createP('');
  questionP.style('text-align', 'center'); 
  questionP.style('font-size', '30px');
  questionP.style('width', '100%'); 
  questionP.position(0, height / 2 - 120);

  // 建立選擇題按鈕
  radio = createRadio();
  radio.style('font-size', '30px');
  radio.style('display', 'block'); 
  radio.style('margin', '10px auto'); 
  radio.style("background-color", "#dfefae0");
  radio.position(width / 2 - 50, height / 2 - 60);

  // 建立填充題輸入框（隱藏）
  answerInput = createInput('');
  answerInput.style('font-size', '30px');
  answerInput.style('text-align', 'center');
  answerInput.style('display', 'none'); // 預設隱藏
  answerInput.position(width / 2 - 50, height / 2 - 60);

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.style('font-size', '30px');
  submitButton.position(width / 2 - 20, height / 2);
  submitButton.mousePressed(checkAnswer);

  // 建立結果顯示區域
  resultP = createP('');
  resultP.style('text-align', 'center');
  resultP.style('font-size', '30px');
  resultP.style('width', '100%'); 
  resultP.position(0, height / 2 + 50);

  // 顯示第一題
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    let question = questions[currentQuestionIndex].question;
    let type = questions[currentQuestionIndex].type;

    questionP.html(question);
    
    if (type === "multiple") {
      // 顯示選擇題
      radio.show();
      radio.elt.innerHTML = ''; // 清空舊選項
      questions[currentQuestionIndex].options.forEach(option => radio.option(option));

      // 隱藏填充題輸入框
      answerInput.hide();
    } 
    else if (type === "fill") {
      // 顯示填充題輸入框
      radio.hide();
      answerInput.show();
      answerInput.value(''); // 清空舊答案
    }
  } else {
    // 顯示測驗結果
    questionP.html('測驗結束');
    radio.hide();
    answerInput.hide();
    submitButton.hide();
    resultP.html(`答對題數: ${correctAnswers}, 答錯題數: ${incorrectAnswers}`);
  }
}

function checkAnswer() {
  let type = questions[currentQuestionIndex].type;
  let correctAnswer = questions[currentQuestionIndex].correct;
  let userAnswer;

  if (type === "multiple") {
    userAnswer = radio.value();
  } 
  else if (type === "fill") {
    userAnswer = answerInput.value().trim();
  }

  if (userAnswer === correctAnswer) {
    correctAnswers++;
    resultP.html('答對了！');
    resultP.style('color', "#4CAF50"); // 綠色
  } else {
    incorrectAnswers++;
    resultP.html('答錯了！');
    resultP.style('color', "#D9534F"); // 紅色
  }

  currentQuestionIndex++;
  setTimeout(showQuestion, 1000); // 1秒後顯示下一題
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 重新定位元素
  questionP.position(0, height / 2 - 120);
  radio.position(width / 2 - 50, height / 2 - 60);
  answerInput.position(width / 2 - 50, height / 2 - 60);
  submitButton.position(width / 2 - 20, height / 2);
  resultP.position(0, height / 2 + 50);
}
