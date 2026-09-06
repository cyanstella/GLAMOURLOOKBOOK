# GLAMOUR LOOKBOOK

FINAL FANTASY XIV のミラプリを、複数のスクリーンショット・装備情報・染色情報と組み合わせて、雑誌風の1枚画像にまとめる非公式Webツールです。

**Current version: Ver1.01**

> バージョン番号は、明示的に変更するときだけ更新します。

## 公開予定URL

https://cyanstella.github.io/GLAMOURLOOKBOOK/

## GitHub Pages への公開方法

リポジトリ名:

`GLAMOURLOOKBOOK`

リポジトリ直下に、以下の4ファイルを配置します。

- `index.html`
- `style.css`
- `script.js`
- `README.md`

GitHub で:

1. `Settings`
2. `Pages`
3. `Build and deployment`
4. `Deploy from a branch`
5. Branch: `main`
6. Folder: `/ (root)`

を選択して保存してください。

`GLAMOURLOOKBOOK_public_Ver1.01` フォルダ自体をアップロードするのではなく、**フォルダ内の4ファイルをリポジトリ直下へ配置**してください。

## 主な機能

- 日本語 / English 切替
- STYLE TAG
  - CUTE
  - COOL
  - ELEGANT
  - CASUAL
  - FANTASY
- ひとこと 最大150文字
- 画像1〜3
  - X位置
  - Y位置
  - 拡大率
- 使用装備11枠
- XIVAPIを利用した装備検索
- カラーチップ付き染色選択
- FFXIV風の染色カテゴリ
  - 白系
  - 赤系
  - 茶系
  - 黄系
  - 緑系
  - 青系
  - 紫系
  - スペシャルカラー系
- 完成プレビュー
- クリック / タップ位置を中心に150%拡大
- 1200 × 1800 PNG書き出し
- X投稿用テキスト生成
- `#魅せるミラプリ` のX検索
- ABOUT / 免責事項

## X投稿時の自動入力

選択したSTYLE TAGが `CUTE` の場合:

```text
#魅せるミラプリ
#CUTE

GLAMOUR LOOKBOOK
https://cyanstella.github.io/GLAMOURLOOKBOOK/
```

## 完成画像内の表記

- `GLAMOUR LOOKBOOK Ver1.01`
- `#魅せるミラプリ`
- `(C) SQUARE ENIX`

## 外部通信

本サイト自体は静的サイトです。

装備検索・装備アイコン・染色情報の取得に XIVAPI v2 を利用します。

## 権利表記 / 免責

本サイトは個人が制作・運営する非公式Webツールであり、株式会社スクウェア・エニックスとは関係ありません。

FINAL FANTASY XIV に関する権利は各権利者に帰属します。

(C) SQUARE ENIX
