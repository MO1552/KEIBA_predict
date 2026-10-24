競馬 レース一括予想アプリ — Webアプリ版

内容
- index.html: アプリ本体（既存の予想ロジックを維持し、iPhone向け表示を含む）
- manifest.webmanifest / icon*: ホーム画面追加用の設定とアイコン
- sw.js: 初回アクセス後のオフライン起動用キャッシュ

重要
このフォルダはWeb公開用に準備済みですが、まだインターネット上には公開されていません。
ホーム画面追加・Service Worker・オフライン起動を使うには、HTTPSで配信してください。

GitHub Pagesで公開する手順（無料）
1. GitHubにサインインし、新しいリポジトリを作成（例: keiba-race-app）。公開設定はPublicにします。
2. このZIPを展開し、中のファイル一式（index.html、manifest.webmanifest、sw.js、icon.svg、PNGアイコン、README.txt）をリポジトリの直下へアップロードします。
3. リポジトリの Settings → Pages を開き、Build and deployment の Source を「Deploy from a branch」にします。
4. Branch を「main」、フォルダを「/(root)」にして Save。
5. 数分後に表示される https://ユーザー名.github.io/リポジトリ名/ をiPhoneのSafariで開きます。
6. Safariの共有ボタン →「ホーム画面に追加」。表示されない場合は「Webアプリとして開く」相当の項目を有効にして追加します。

注意
- 公開リポジトリに置くと、URLを知る人がアプリ本体を閲覧できます。個人情報や非公開データは入れないでください。
- このアプリは約8MBあります。初回ロードに少し時間がかかることがあります。
- ブラウザの保存領域を消去すると、オフライン用キャッシュも消える場合があります。
