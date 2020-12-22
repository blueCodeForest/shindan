// express モジュールのインスタンス作成
const express = require("express");
const app = express();

// パス指定用モジュール
const path = require('path');

// 環境変数(process.env.PORT)でイケるところか、PORT3000で設定
const port = process.env.PORT || 3000;

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});

// ポート指定で接続
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
