'use strict';

{
  const mainContainer = document.getElementById('main-container');
  const container = document.getElementById('container');
  const btn = document.getElementById('btn');

  const questions = [
    {
      "Q1": "赤ちゃんからもう一度人生をやり直したとしても、今の人生とそう変わらないだろう",
      "Q2": "自分の欠点を痛感するたびに、他人を羨ましく感じる",
      "Q3": "うまくいかないこともあるけれど、おおむね今の自分に満足している",
      "Q4": "優秀な人を見ると、劣等感を感じて不安になる",
      "Q5": "根拠はないけれど、このさき何が起こってもなんとかなるような気がする"
    }, "positive",
    {
      "Q6": "仕事もしくは勉強のやり方を自分なりに工夫してる",
      "Q7": "YouTubeに動画を上げるとして、どんなジャンルが向いてるかパッと思いつく",
      "Q8": "好きな理由や嫌いな理由を第三者が納得できるように説明できるタイプだ",
      "Q9": "物事をうまく進めるためにも、自分のクセや個性を知ることは大事だと思う",
      "Q10": "日記を書いて自分自身の行動や心理を振り返ることがよくある"
    }, "insite",
    {
      "Q11": "今の人生は自分に似合ってると思う",
      "Q12": "自分と他人は違うので、他人に相談してもあまり意味がないと思う",
      "Q13": "買い物の後に悪い口コミを見つけると不安になる",
      "Q14": "どれだけ稼げる仕事でも、自分に合ってないとやっても意味がないと思う",
      "Q15": "うまくいかなかったとき、努力ではなく、方法が悪かったと考えるタイプだ"
    }, "judge",
    {
      "Q16": "何であんなことをしてしまったんだと、同じ失敗を後悔することがよくある",
      "Q17": "老後のためにお金を貯めるぐらいなら、今を楽しむために使った方がいいと思う",
      "Q18": "あれこれ心配してしまって、目の前のことが手に付かないことがよくある",
      "Q19": "不安や悩みが尽きなくても、目の前のことに集中することが一番大事だ",
      "Q20": "夢中になりすぎて、気がついたら空が暗くなっていることがよくある"
    }, "focus"
  ];

  const params = {
    agree: "そう思う",
    agreeLight: "",
    normal: "",
    againstLight: "",
    against: "そう思わない"
  };

  var score = {
    positive: 0,
    insite: 0,
    judge: 0,
    focus: 0,
    sum: 0
  };

  var currentNum = 0;
  var currentType = "";

  function displayFirstPage() {
    const firstContainer = document.createElement('div');
    container.appendChild(firstContainer);

    firstContainer.textContent = '診断をはじめよう！';
  }

  function clearQuestions() {
    scrollTo(0, 0);
    container.innerHTML = null;
  }

  function setQuestions() {
    clearQuestions();

    Object.keys(questions[currentNum]).forEach(q => {
      const questionBox = document.createElement('div');
      const question = document.createElement('p');
      const choices = document.createElement('div');
      var answers = [];
      choices.setAttribute("id", "choices");

      container.appendChild(questionBox);
      questionBox.appendChild(question);
      question.textContent = q + '.' + questions[currentNum][q];

      questionBox.appendChild(choices);


      Object.keys(params).forEach(key => {
        const chooseBox = document.createElement('div');
        const choice = document.createElement('div');
        const chooseLabel = document.createElement('div');

        chooseLabel.classList.add("label");
        choice.classList.add(key);
        choice.classList.add(q);

        answers.push(choice);

        choices.appendChild(chooseBox);
        chooseBox.appendChild(choice);
        chooseBox.appendChild(chooseLabel);
        chooseLabel.textContent = params[key];

        choice.addEventListener('click', {arr: answers, handleEvent: checkAnswer});
      });


    });

    setType();

    currentNum += 2;


  };

  function checkAnswer(e) {
    checkClear(this.arr);
    e.currentTarget.classList.add('choosed');
  };

  function checkClear(arr) {
    const choosed = arr.find(element => element.classList.contains('choosed') == true);
    if (choosed) {
      choosed.classList.remove('choosed');
    };
  };

  function checkScore() {
    const checkedAnswers = container.querySelectorAll('.choosed');
    // if (checkedAnswers.length === 5) {　開発中はめんどくさいのでコメントアウト
      checkedAnswers.forEach(e => {
        if(e.classList.contains('agree')) {
          score[currentType] += 1;
          console.log('agree')
        } else if(e.classList.contains('agreeLight')) {
          score[currentType] += 0.5;
          console.log('agreeLight')
        } else if(e.classList.contains('normal')) {
          score[currentType] += 0;
          console.log('normal')
        } else if(e.classList.contains('againstLight')) {
          score[currentType] -= 0.5;
          console.log('againstLight')
        } else if(e.classList.contains('against')) {
          score[currentType] -= 1;
          console.log('against')
        }
      })
      if (currentNum === questions.length) {
        displayResult()
      } else{
        setQuestions()
      }
    // } else {
    //   alert('未回答の質問があるよ！');
    //   scrollTo(0, 0);
    // }　開発中はめんどくさいのでコメントアウト
  };

  function displayResult() {
    clearQuestions()

    const resultContainer = document.createElement('div');
    container.appendChild(resultContainer);
    resultContainer.textContent = 'お疲れ様でした！！';

  }

  function setType() {
    currentType = questions[currentNum + 1];
  }

  btn.addEventListener('click', () => checkScore());

  displayFirstPage();
}
