// express モジュールのインスタンス作成
const express = require("express");
const app = express();

// パス指定用モジュール
const path = require('path');


// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});

// ポート指定で接続
app.listen(3000, () => {
  console.log('Running at Port 3000...');
});
