'use strict';

{
  const mainContainer = document.getElementById('main-container');
  const container = document.getElementById('container');

  const nextButton = document.createElement('div');
  mainContainer.appendChild(nextButton);
  nextButton.classList.add('btn');
  nextButton.addEventListener('click', () => checkScore());
  nextButton.textContent = '変態度診断を始める';

  const definition = '<h2>変態とは・・・</h2><p>スケベや変わってる人という意味ではなく、個性を活かして、人生をおもちゃにして楽しんでる人のことを言います。<br><br>将来という不確かな未来ではなく、今この瞬間が楽しいかどうかにしか興味がないため、他人から見ると、あとさきを考えておらず危なっかしく感じることも。<br><br>しかし、今に集中する現点的な生き方は、情報が氾濫するこの時代を幸せに生きるひとつの方法なのかもしれません。</p>'

  const discription = '<h2>人生、似合ってますか？</h2><p>この診断では、いい意味で、どれだけ自分本位に生きているかを診断します。<br><br>自己中な人は嫌われてしまいますが、だからと言って、周りに合わせすぎるのもしんどいものです。<br><br>周りに遠慮しすぎず、自分らしく生きたと胸を張れる人生は、困難は多いかもしれませんが、<br><br>きっと、幸福に満ちていることでしょう。</p>'

  const bullet = '<h2>こんな人におすすめ</h2><ul><li>何者かになりたいけど、何をやっていいかわからない</li><li>人生に飽きてしまった</li><li>何をやっていても、いまいち夢中になれず不完全燃焼がすごい</li><li>自分本来の力を発揮できていないように感じる</li><li>たった一度の人生、自分にしかできないことをやりたい</li><li>今の会社で一生働くつもりはないけど、抜け出すきっかけを見つけられずにいる</li><li>安定よりも、毎日ワクワクしていたい</li></ul>'

  const questions = [
    {
      'Q1': '赤ちゃんからもう一度人生をやり直したとしても、今の人生とそう変わらないだろう',
      'Q2': '欠点を痛感しても、自分はダメなやつだと落ち込むことはほとんどない',
      'Q3': 'うまくいかないこともあるけれど、おおむね今の自分に満足している',
      'Q4': '優秀な人を見ても、尊敬の念を抱くことはあれど、劣等感を感じることはない',
      'Q5': '根拠はないけれど、このさき何が起こってもなんとかなるような気がする'
    }, 'positive',
    {
      'Q6': '仕事もしくは勉強のやり方を自分なりに工夫してる',
      'Q7': 'これからクリエイターとしてYouTubeに動画を上げるなら、どんなジャンルが向いてるかパッと思いつく',
      'Q8': '好きな理由や嫌いな理由を第三者が納得できるように説明できるタイプだ',
      'Q9': '物事をうまく進めるためにも、自分のクセや個性を知ることは大事だと思う',
      'Q10': '日記を書いて自分自身の行動や心理を振り返ることがよくある'
    }, 'insight',
    {
      'Q11': '今の人生は自分に似合ってると思う',
      'Q12': '自分と他人は違うので、他人に相談してもあまり意味がないと思う',
      'Q13': 'お店や商品の口コミはあくまでも参考程度で、最終的な判断にはあまり影響を受けない方だ',
      'Q14': 'どれだけ稼げる仕事でも、自分に合ってないとやっても意味がないと思う',
      'Q15': 'うまくいかなかったとき、努力不足ではなく、方法が悪かったと考えるタイプだ'
    }, 'judge',
    {
      'Q16': '将来のことを悩んでも仕方ないので、考えるのは無駄だと思う',
      'Q17': '老後のためにお金を貯めるぐらいなら、今を楽しむために使った方がいいと思う',
      'Q18': '思い立ったら行動せずにはいられないので、他人からは一貫性がないように見られる',
      'Q19': '不安や悩みが尽きなくても、目の前のことに集中することが一番大事だ',
      'Q20': '夢中になりすぎて、気がついたら空が暗くなっていることがよくある'
    }, 'focus'
  ];

  const params = {
    agree: 'そう思う',
    agreeLight: '',
    normal: '',
    againstLight: '',
    against: 'そう思わない'
  };

  var score = {
    sum: 56,
    positive: 5,
    insight: 5,
    judge: 5,
    focus: 5
  };

  const types = {
    sum: '総合評価',
    positive: '自己肯定力',
    insight: '個性への興味',
    judge: '独断力',
    focus: '夢中力'
  }

  const titles = new Map ([
    [96, '世界の異分子【スピリタス級変態】'],
    [92, '毎日が非日常【テキーラ級変態】'],
    [88, '唯我独尊人間【ジン級変態】'],
    [84, '落ち着いたいい大人【ウイスキー級変態】'],
    [80, '調子に乗って死ぬ【日本酒級変態】'],
    [72, '理性の放棄【ストロングチューハイ級変態】'],
    [64, '隠しきれない個性【ハイボール級変態】'],
    [56, '人を選ぶぜ【生ビール級変態】'],
    [48, '人畜無害【梅酒級変態】'],
    [40, '誰もが通る道【カシスオレンジ級変態】'],
    [32, '主張控えめ【缶チューハイ級変態】'],
    [28, 'これからが本番【子供のビール級変態】'],
    [24, 'まるで透明人間【お冷級変態】'],
    [0, 'ご自愛ください【しじみ汁級変態】']
  ]);

  const totalComents = new Map ([
    [90, '非常に高い変態度を示しています。<br><br>変態度の高さゆえに、周囲からは浮いた存在として認識されているかもしれません。<br><br>しかし、それこそがあなたの強みです。<br><br>周囲になじもうとするのではなく、気にせずに突き抜けていきましょう。<br><br>浮くことを恐れず、突き進んでいけば、きっと想像もしない世界にたどり着くでしょう。'],
    [75, '高い変態度を示しています。<br><br>あなたの中にはしっかりとした芯がありますが、常識や周囲の視線が枷となって、十分に個性を発揮できていないようです。<br><br>強烈な個性を持ちつつも、組織に馴染める器用さも持ち合わせています。<br><br>周囲には奥の深い魅力的な人間に写っていることでしょう。<br><br>もし現状に満足していないのであれば、思い切って生き方を変えてみるといいかもしれません。'],
    [50, 'あなたの変態度は人並みです。<br><br>決して低いわけではありませんが、高くもありません。<br><br>いい意味で普通のため、生きづらさを感じることはほとんどないでしょう。<br><br>もし現状に退屈さを感じているのであれば、周りに遠慮して自分を抑えているからかもしれません。<br><br>周囲に配慮できるのがあなたの良いところですが、あえて自己主張をしてみると何かが変わるかも。'],
    [40, 'あなたの変態度は少し低めです。<br><br>世界に押されて、存在が小さく感じます。<br><br>もっと胸を張っても誰にも怒られないので安心してください。<br><br>もし、今いる環境がそのようにさせているのであれば、違う環境に飛び込んでみると良いかもしれません。あなたがあなたらしく生きれることを祈っています。'],
    [0, 'あなたの変態度は非常に低いです。<br><br>普通を通り越して透明人間。今にも存在が消えてしまいそうです。<br><br>常に周囲に順応してきたので、自分が本当はどうしたいのかもわからないのでしょう。<br><br>そのことに関して不満がなければ問題ないのですが、少しでも不満があれば、心の声に耳を傾けてみましょう。<br><br>お昼ご飯を値段で決めるのではなく、食べたいものをチョイスするなど、小さなことでいいので感情を意識してみてください。<br><br>あなたがあなたらしく生きれることを祈っています。'],
  ]);

  const paramComents = {
    positive: {
      '★★★★★': 'ありのままの自分を受け入れる力。<br><br>あなたは突発的な不安に襲われることもなく、自分自身と非常に健康的に向き合えています。<br><br>この力は行動力の高さにも現れており、これから多くを成し遂げることでしょう。',
      '★★★★☆': 'ありのままの自分を受け入れる力。<br><br>あなたは自分が自分であることを、おおむね受け入れられています。<br><br>たまに自己否定に陥ることもありますが、前向きに向き合う習慣が根付いているので、心配は必要ないでしょう。',
      '★★★☆☆': 'ありのままの自分を受け入れる力。<br><br>あなたは人並みには、自分を受け入れられています。<br><br>行動に支障が出るほどではありませんが、意識的に自分を肯定すると、気持ちはもっと楽になるでしょう。',
      '★★☆☆☆': 'ありのままの自分を受け入れる力。<br><br>あなたは自分を受け入れることができず、常に自分を傷つけてしまっています。<br><br>寝る前に、私は大丈夫と優しく唱えてみましょう。<br><br>気持ちがきっと楽になるはずです。',
      '★☆☆☆☆': 'ありのままの自分を受け入れる力。<br><br>あなたは自分を受け入れることができず、常に自分を傷つけてしまっています。<br><br>寝る前に、私は大丈夫と優しく唱えてみましょう。<br><br>気持ちがきっと楽になるはずです。'
    },
    insight: {
      '★★★★★': '他人と違うことを認めた上で、自分の得意、不得意という能力面から、大事にしている価値観まで、内面を幅広く観察する姿勢。<br><br>あなたは他人と違うことを十分に理解していて、さらにその違いを楽しめています。<br><br>自分自身をより深く理解し、さらに個性に磨きをかけていきましょう。',
      '★★★★☆': '他人と違うことを認めた上で、自分の得意、不得意という能力面から、大事にしている価値観まで、内面を幅広く観察する姿勢。<br><br>あなたは他人と違うことを十分に理解していて、その現実を受け止めることができています。<br><br>劣等感に苦しむこともあるでしょうが、いい意味であなたの人間臭さにつながっています。',
      '★★★☆☆': '他人と違うことを認めた上で、自分の得意、不得意という能力面から、大事にしている価値観まで、内面を幅広く観察する姿勢。<br><br>あなたは他人との違いは理解していますが、それを活かそうとまでは考えていないようです。<br><br>苦手なことを頑張るのは素晴らしいことですが、個性をうまく活用すると同じ努力でより大きな結果を出せるでしょう。',
      '★★☆☆☆': '他人と違うことを認めた上で、自分の得意、不得意という能力面から、大事にしている価値観まで、内面を幅広く観察する姿勢。<br><br>あなたは自分の内面を省みる習慣をあまり持っていないようです。<br><br>物事がうまくいかないのは、あなた本来の強みを活かせていないことが原因かもしれません。<br><br>個性を意識してみると、より高いパフォーマンスを発揮できるでしょう。',
      '★☆☆☆☆': '他人と違うことを認めた上で、自分の得意、不得意という能力面から、大事にしている価値観まで、内面を幅広く観察する姿勢。<br><br>あなたは自分の内面を省みる習慣をあまり持っていないようです。<br><br>何でもこなせてしまう器用さ故かもしれませんが、個性を活かすという視点を持つとパフォーマンスは飛躍的に上昇するでしょう。'
    },
    judge: {
      '★★★★★': '良い結果も悪い結果も全て受け入れる覚悟を持ち、自分で決断する力。<br><br>この力が高いほど、人生をコントロールしている感覚が強く、精神的にも安定しています。<br><br>あなたは非常に高い独断力を持っています。<br><br>ここぞという場面で決断できるため、周囲からとても頼りにされる存在である一方、<br><br>周りの意見に耳を貸さないため、独善的と思われてしまう危険も。',
      '★★★★☆': '良い結果も悪い結果も全て受け入れる覚悟を持ち、自分で決断する力。<br><br>この力が高いほど、人生をコントロールしている感覚が強く、精神的にも安定しています。<br><br>あなたは自分で決断する力を持ちつつも、周囲の意見にも耳を傾けます。<br><br>いろんな立場の意見を踏まえた上で決断できるため、非常に優れたリーダーになるでしょう。',
      '★★★☆☆': '良い結果も悪い結果も全て受け入れる覚悟を持ち、自分で決断する力。<br><br>この力が高いほど、人生をコントロールしている感覚が強く、精神的にも安定しています。<br><br>あなたは周りの意見も聞きつつ、自分の意見も持っており、非常にバランス感覚に優れています。<br><br>組織の中では抜群の安定感を誇りますが、個人としての活躍を目指しているのであれば、もう少しエゴを出してみてもいいかもしれません。',
      '★★☆☆☆': '良い結果も悪い結果も全て受け止めなければならないと知った上で、自分で決断する力。<br><br>この力が高い人ほど、人生をコントロールしている感覚が強く、精神的にも安定しています。<br><br>あなたはちょっぴり他人任せなところがあり、大事な決断ほど自分で決めることができません。<br><br>何をやってもうまくいかない無力感は、これが原因かも知れません。',
      '★☆☆☆☆': '良い結果も悪い結果も全て受け入れる覚悟を持ち、自分で決断する力。<br><br>この力が高いほど、人生をコントロールしている感覚が強く、精神的にも安定しています。<br><br>あなたは決断を他人任せにしがちなようです。<br><br>いきなり大きな決断をするのは難しいですが、友達との夕食でお店を提案したり、自分から企画するなどして、自己主張してみると何かが変わるかもしれません。'
    },
    focus: {
      '★★★★★': '今が楽しければそれでいい。暗闇に向かってアクセルをベタ踏みする、一歩間違えば人生を壊しかねない力。<br><br>あなたの人生に「将来」は存在せず、常に「今」を楽しんでいます。<br><br>なるようになると本気で考えているため、節約や貯金をする人が理解できません。<br><br>他人から見ると危なっかしく見えますが、本人は全く気にしておらず、次のワクワクを探しています。<br><br>破滅か成功か、普通とは無縁の、ある意味刺激に満ちた人生になるでしょう。',
      '★★★★☆': '今が楽しければそれでいい。暗闇に向かってアクセルをベタ踏みする、一歩間違えば人生を壊しかねない力。<br><br>あなたは「今」を楽しむ意識が非常に強いです。<br><br>計画を立てるのが苦手で、退屈とすら感じています。<br><br>困ったらその時という、柔軟な対処に自信を持っているため、行動力が高く、多くを成し遂げるでしょう。',
      '★★★☆☆': '今が楽しければそれでいい。暗闇に向かってアクセルをベタ踏みする、一歩間違えば人生を壊しかねない力。<br><br>あなたは「今」と「将来」、どちらも同じぐらい大切にします。<br><br>非常に賢く、場面に合わせて適切な判断を行えるため、最も人生を楽しめるタイプでしょう。<br><br>一方で無我夢中に生きることへの憧れも抱いており、退屈な日常に不満を感じることも。',
      '★★☆☆☆': '今が楽しければそれでいい。暗闇に向かってアクセルをベタ踏みする、一歩間違えば人生を壊しかねない力。<br><br>あなたはどちらかというと、今を楽しむよりも、将来に備えて行動する傾向が強いようです。<br><br>先を見通す力に長けているため、安定感は抜群。<br><br>しかし、想定外のイベントが発生しづらいため、退屈な日常に不満を感じることもあるでしょう。',
      '★☆☆☆☆': '今が楽しければそれでいい。暗闇に向かってアクセルをベタ踏みする、一歩間違えば人生を壊しかねない力。<br><br>あなたはどちらかというと、今を楽しむよりも、将来に備えて行動する傾向が強いようです。<br><br>先を見通す力に長けているため、安定感は抜群。<br><br>静かに暮らしたいという安定を好む気質も合わさり、退屈に不満を感じることは少ないでしょう。'
    }
  }

  // ポテンシャル項目は常に8ポイントなので別変数に格納する
  const potentialComents = '非常に高いポテンシャルを秘めていますが、十分に発揮しきれていないようです。<br><br>心の底から自信を持ててないことが原因かもしれません。<br><br>何をしたらいいかわからないなど、将来のビジョンが描けていないと、能力を発揮するのは難しい傾向にあります。<br><br>あなたの奥底に眠る個性を理解すれば、一気に才能が開花するでしょう。'

  var currentNum = 0;
  var currentType = "";

  function displayFirstPage() {
    const eyecatch = document.createElement('img');
    eyecatch.src = 'images/shindan-eyecatch.png';
    container.appendChild(eyecatch);

    const definitionBox = document.createElement('div');
    container.appendChild(definitionBox);
    definitionBox.innerHTML = definition;
    definitionBox.classList.add('box', 'box_inner');

    const discriptionBox = document.createElement('div');
    container.appendChild(discriptionBox);
    discriptionBox.innerHTML = discription;
    discriptionBox.classList.add('box', 'box_inner');

    const bulletBox = document.createElement('div');
    container.appendChild(bulletBox);
    bulletBox.innerHTML = bullet;
    bulletBox.classList.add('box', 'box_inner');

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

    changeButton();

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
          score['sum'] += 2;
        } else if(e.classList.contains('agreeLight')) {
          score[currentType] += 0.5;
          score['sum'] += 1;
        } else if(e.classList.contains('normal')) {
          score[currentType] += 0;
          score['sum'] += 0;
        } else if(e.classList.contains('againstLight')) {
          score[currentType] -= 0.5;
          score['sum'] -= 1;
        } else if(e.classList.contains('against')) {
          score[currentType] -= 1;
          score['sum'] -= 2;
        }
      })

      if (currentNum === questions.length) {
        displayResult();
      } else {
        setQuestions();
      }

    // } else {
    //   alert('未回答の質問があるよ！');
    //   scrollTo(0, 0);
    // }　開発中はめんどくさいのでコメントアウト
  };

  function displayResult() {
    clearQuestions();

    // 結果ページアイキャッチ
    const resultImage = document.createElement('img');
    resultImage.src = 'images/result-top.png';
    container.appendChild(resultImage);

    // 変態度レベル表示
    const titleBox = document.createElement('div');
    container.appendChild(titleBox);
    titleBox.classList.add('box', 'box_inner');
    const titleHeading = document.createElement('h2');
    titleBox.appendChild(titleHeading);
    titleHeading.textContent = 'あなたの変態度レベル';

    titles.forEach((value, key) => {
      const title = document.createElement('div');
      titleBox.appendChild(title);
      title.textContent = value;
      title.classList.add('titleName');

      if (score['sum'] >= key){
        title.classList.add('check');
      }
    })

    document.querySelector('.check').classList.add('firstCheck');


    // チャート作成
    const chartBox = document.createElement('div');
    container.appendChild(chartBox);
    chartBox.classList.add('box', 'box_inner');
    const chartHeading = document.createElement('h2');
    chartBox.appendChild(chartHeading);
    chartHeading.textContent = '変態度パラメーター';
    const ctx = document.createElement('canvas');
    chartBox.appendChild(ctx);
    const chart = new Chart(ctx.getContext('2d'), {
    // 作成したいチャートのタイプ
    type: 'radar',

    // データセットのデータ
    data: {
        labels: ['自己肯定力', '個性への興味', '独断力', '夢中力', 'ポテンシャル'],
        datasets: [{
            label: '変態度パラメーター',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [score['positive'], score['insight'], score['judge'], score['focus'], 8],
        }]
    },

    // ここに設定オプションを書きます
    options: {
      scale: {
        ticks: {
          max: 10,
          min: 0,
          stepSize: 2,
          display: false
        }
      },
      legend: {
            display: false
         }
    }
    });

    // コメント表示
    Object.keys(score).forEach(t => {
      const comentBox = document.createElement('div');
      container.appendChild(comentBox);
      comentBox.classList.add('box', 'box_inner');

      const comentType = document.createElement('h2');
      comentBox.appendChild(comentType)
      if (t === 'sum') {
        comentType.textContent = types[t] + score[t] + '点';
        const comentText = document.createElement('p');
        comentBox.appendChild(comentText);
        comentText.innerHTML = chooseTotalComents(score[t]);
      } else {
        comentType.textContent = types[t] + ' ' + scoreToStar(score[t]);
        const comentText = document.createElement('p');
        comentBox.appendChild(comentText);
        comentText.innerHTML = paramComents[t][scoreToStar(score[t])];
      }
    })
    const comentBox = document.createElement('div');
    container.appendChild(comentBox);
    comentBox.classList.add('box', 'box_inner');
    const comentType = document.createElement('h2');
    comentBox.appendChild(comentType);
    comentType.textContent = 'ポテンシャル ★★★★☆';
    const comentText = document.createElement('p');
    comentBox.appendChild(comentText);
    comentText.innerHTML = potentialComents;


    nextButton.remove();

  }

  function setType() {
    currentType = questions[currentNum + 1];
  }

  function scoreToStar(num) {
    if (num > 8) {
      return '★★★★★'
    } else if (num > 6) {
      return '★★★★☆'
    } else if (num > 4) {
      return '★★★☆☆'
    } else if (num > 2) {
      return '★★☆☆☆'
    } else {
      return '★☆☆☆☆'
    }
  }

  function chooseTotalComents(score) {
    var keyScore;
    for (var key of totalComents.keys()) {
      if (score >= key) {
        keyScore = key;
        break;
      }
    }
    return totalComents.get(keyScore)
  }

  function changeButton() {
    if (currentNum === (questions.length - 2)) {
      nextButton.textContent = '結果を表示する';
    } else {
      nextButton.textContent = '次の質問に進む';
    }
  }

  displayFirstPage();
}
