const genre = [
  { value: "0000", text: "ニュース・報道" },
  { value: "0100", text: "スポーツ" },
  { value: "0205", text: "情報・ワイドショー" },
  { value: "0300", text: "ドラマ" },
  { value: "0409", text: "音楽" },
  { value: "0502", text: "バラエティ" },
  { value: "0600", text: "映画" },
  { value: "0700", text: "アニメ" },
  { value: "0800", text: "ドキュメンタリー・教養" },
  { value: "0903", text: "劇場・公演" },
  { value: "1000", text: "趣味・教育" },
  { value: "1100", text: "福祉" }
];
const select_junre = document.querySelector('select#genre');

genre.forEach(item =>{
  const option = document.createElement('option');
  option.value = item.value;
  option.text = item.text;
  select_junre.appendChild(option);
});

// 課題3-2 のプログラムはこの関数の中に記述すること
function print(data) {
 const list =  data.list.g1;
 for(const table of list){
  console.log('開始時刻 : ' + table.start_time);
  console.log('終了時刻 : ' + table.end_time);
  console.log('チャンネル : ' + table.service.name);
  console.log('タイトル : ' + table.title);
  console.log('サブタイトル : ' + table.subtitle);
  console.log('番組説明 : ' + table.content);
  console.log('出演者 : ' + table.act);
 }
}

// 課題5-1 の関数 printDom() はここに記述すること
const button = document.querySelector("button#submit");
const select_service = document.querySelector("select#service");
button.addEventListener('click',printDom);
const tableHeader = ["開始時刻","放映時間","チャンネル","タイトル","サブタイトル","番組説明","出演者"];

function printDom(data) {
  const list =  data.list.g1;
  const service = select_service.value;
  const junre = select_junre.value;

  console.log("チャンネル:" + service);
  console.log("ジャンル:" + junre);

  //テーブルの枠組みを作成
  const table = document.createElement("table");
  table.setAttribute("border",1);
  
  //テーブルのヘッダーを設定
  const thead = document.createElement('thead');
  let tr = document.createElement('tr');
  for(let head of tableHeader){
    let th = document.createElement('th');
    th.setAttribute('scope','col');
    th.textContent = head;
    tr.insertAdjacentElement('beforeend',th);
  }
  thead.insertAdjacentElement('beforeend',tr);
  table.insertAdjacentElement('beforeend',thead);

  //テーブルの中身を設定(div以下は1行ごとに設定)
  const tbody = document.createElement('tbody');
  for(let row of list){
    tr = document.createElement('tr');
    
    //開始時間と放映時間のみ個別で記載
    let start = formateISO(row.start_time);
    td = document.createElement('td');
    td.textContent = start;
    tr.insertAdjacentElement('beforeend',td);
    //放映時間算出・追加
    let time = timeCalc(row.start_time,row.end_time);
    td = document.createElement('td');
    td.textContent = time + "分";
    tr.insertAdjacentElement('beforeend',td);


    //以下はforで回す
    let wantData = [row.service.name,row.title,row.subtitle,row.content,row.act];
    for(let d of wantData){
      td = document.createElement('td');
      if(d === ""){
        td.textContent = "記載なし";
      }else{
        td.textContent = d;
      }

      tr.insertAdjacentElement('beforeend',td);
    }
    tbody.insertAdjacentElement('beforeend',tr);
  }

  table.insertAdjacentElement('beforeend',tbody);

  const body = document.querySelector('body');
  body.insertAdjacentElement('beforeend',table);
}

//ISO標準時形式を成形する
function formateISO(isoString){
  const date = new Date(isoString);

  // 各要素を取得し、2桁表示に整形
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');//0始まりにつき+1
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  // 整形して結合
  const ret = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;

  return ret;
}

//放映時間算出
function timeCalc(start_time,end_time){
  let start = new Date(start_time);
  let end = new Date(end_time);
  let timeMS = end-start;
  let time = timeMS/(1000 * 60);
  return time;
}

// 課題6-1 のイベントハンドラ登録処理は以下に記述




// 課題6-1 のイベントハンドラ sendRequest() の定義
function sendRequest() {

}

// 課題6-1: 通信が成功した時の処理は以下に記述
function showResult(resp) {

}

// 課題6-1: 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 課題6-1: 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終わりました');
}

////////////////////////////////////////
// 以下はテレビ番組表のデータサンプル
// 注意: 第5回までは以下を変更しないこと！
// 注意2: 課題6-1 で以下をすべて削除すること
let data = {
  "list": {
    "g1": [
      {
        "id": "2022030428673",
        "event_id": "28673",
        "start_time": "2022-03-04T04:35:00+09:00",
        "end_time": "2022-03-04T04:40:00+09:00",
        "area": {
          "id": "130",
          "name": "東京"
        },
        "service": {
          "id": "g1",
          "name": "ＮＨＫ総合１",
          "logo_s": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-100x50.png",
            "width": "100",
            "height": "50"
          },
          "logo_m": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-200x100.png",
            "width": "200",
            "height": "100"
          },
          "logo_l": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-200x200.png",
            "width": "200",
            "height": "200"
          }
        },
        "title": "みんなのうた「ごっつぉさま」／「超変身！ミネラルフォーマーズ」",
        "subtitle": "「ごっつぉさま」うた：須貝智郎／「超変身！ミネラルフォーマーズ」うた：鬼龍院翔ｆｒｏｍゴールデンボンバー",
        "content": "「ごっつぉさま」うた：須貝智郎／「超変身！ミネラルフォーマーズ」うた：鬼龍院翔ｆｒｏｍゴールデンボンバー",
        "act": "",
        "genres": [
          "0409",
          "0700",
          "0504"
        ]
      },
      {
        "id": "2022030427069",
        "event_id": "27069",
        "start_time": "2022-03-04T23:05:00+09:00",
        "end_time": "2022-03-04T23:10:00+09:00",
        "area": {
          "id": "130",
          "name": "東京"
        },
        "service": {
          "id": "g1",
          "name": "ＮＨＫ総合１",
          "logo_s": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-100x50.png",
            "width": "100",
            "height": "50"
          },
          "logo_m": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-200x100.png",
            "width": "200",
            "height": "100"
          },
          "logo_l": {
            "url": "//www.nhk.or.jp/common/img/media/gtv-200x200.png",
            "width": "200",
            "height": "200"
          }
        },
        "title": "パラスポーツ×アニメ「アニ×パラ」▽パラアルペンスキーテーマ曲江口寿史×ＡＣＣ",
        "subtitle": "パラスポーツの魅力をアニメで伝える番組。高速滑走に挑む精神力が試されるパラアルペンスキーを描く。キャラ原案：江口寿史／曲：Ａｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂ",
        "content": "パラスポーツの魅力をアニメで伝えるプロジェクトの第１３弾。圧倒的なスピードに挑む「パラアルペンスキー」の世界を江口寿史原案の魅力的なキャラクターで描く。平昌パラリンピック金メダリストの村岡桃佳選手への取材から生まれた主人公・桃は、スピードへの恐怖を克服していく。その壁を越えた先にあるものとは…　テーマ曲　♪「Ｏｎ　Ｙｏｕｒ　Ｍａｒｋ」はＡｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂが手掛けた。",
        "act": "【声】松本まりか，【出演】Ａｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂ，【監督】西村一彦，【脚本】加納新太，【原案】江口寿史",
        "genres": [
          "0700"
        ]
      }
    ]
  }
};

