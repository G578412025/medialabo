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
const select_service = document.querySelector("select#service");

//チャンネルとジャンルのプルダウンメニューを作成
genre.forEach(item =>{
  const option = document.createElement('option');
  option.value = item.value;
  option.text = item.text;
  select_junre.appendChild(option);
});

// 課題3-2 のプログラムはこの関数の中に記述する(想定していたJsonの形が違ったため使用不能)
function print(data) {
  for(const table of data){
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
function printDom(data) {
  //dataから必要情報をlistに格納し、確認のためconsoleに出力(dataがnullなら空にする)
  let list = "";
  let service = select_service.value;
  if(service === "g1"){
    list = data.list.g1;
  }else if(service === "e1"){
    list = data.list.e1;
  }
  console.log(data);
  console.log(list);

  //createTableでtableエレメントを作成
  const table = createTableElement(list);  

  //tableをbodyに入れる
  const body = document.querySelector('body');
  body.insertAdjacentElement('beforeend',table);
}

//受け取ったdata.list.{genre}のJsonからtableエレメントを作成し返す関数
const tableHeader = ["開始時刻","放映時間","チャンネル","タイトル","サブタイトル","番組説明","出演者"];
function createTableElement(list){
  //テーブルの枠組みを作成
  const table = document.createElement("table");
  table.setAttribute("border",1);
  
  //テーブルのヘッダーを作成して設定
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

  //テーブルの中身を設定
  const tbody = document.createElement('tbody');
  for(let row of list){
    tr = document.createElement('tr');
    
    //開始時間と放映時間のみ個別で記載
    let start = formatISO(row.start_time);
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

  return table;
}

//tableまたはエラーメッセージが作成済みならそれを破棄する関数
function deleteDynamicElement(){
  let ck = document.querySelector("table");
  if(ck !== null){
    ck.remove();
  }

  ck = document.querySelector("p#err");
  if(ck !== null){
    ck.remove();
  }
}

//ISO標準時形式を成形する
function formatISO(isoString){
  const date = new Date(isoString);

  // 各要素を取得し、2桁表示に整形
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');//0始まりにつき+1
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  // 整形して結合
  const time = hh+":"+min+":"+ sec;
  const ymd = yyyy+"/"+mm+"/"+dd;
  const ret = ymd+" "+time;

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
const button = document.querySelector("button#submit");
button.addEventListener('click',sendRequest);



// 課題6-1 のイベントハンドラ sendRequest() の定義
function sendRequest() {
  //前に作成した動的要素が存在するなら削除
  deleteDynamicElement();

  //serviceとgenreを取得し、目標URLを作成
  let service = select_service.value;
  let genre = select_junre.value;

  let url = "https://www.nishita-lab.org/web-contents/jsons/nhk/" + service + "-" + genre + "-j.json";

  //通信
  axios.get(url)
		.then(showResult)
		.catch(showError)
		.then(finish);


}

// 課題6-1: 通信が成功した時の処理は以下に記述
//成功時応答文章を丸々printDomに送付しテーブルを作成させる
//Jsonそのままで帰ってくるためJson化は不要
function showResult(resp) {
  console.log("通信成功");
	let data = resp.data;

  //data.listが存在するならtableを作成,そうでないならエラーメッセージをDomに表示
  if(data.list !== null){
    printDom(data);
  }else{
    errPrintDom();
  }
}

//エラーが起きたことを利用者に通知
function errPrintDom(){
  let m = document.createElement("p");
  m.setAttribute("id","err");
  m.textContent = "エラーが発生しました。もう一度やり直すか検索条件を変更してください。";
  let b = document.querySelector("body");
  b.insertAdjacentElement("beforeend",m);
}

// 課題6-1: 通信エラーが発生した時の処理
function showError(err) {
    console.log(err);
}

// 課題6-1: 通信の最後にいつも実行する処理
function finish() {
    console.log('Ajax 通信が終わりました');
}