let kotae = Math.floor(Math.random()*10) + 1;
console.log('答え(デバッグ用) : ' + kotae);

let kaisu = 0;
let fin_flg = false;

hantei();
hantei();
hantei();
hantei();

function hantei(){
    let yoso = 4;
    kaisu++;
    console.log(kaisu + '回目の予想 : ' + yoso);

    if(fin_flg){
        console.log('答えは' + kotae + 'でした.ゲームは終了しています');
    }else{
        if(yoso === kotae){
            console.log('正解です!おめでとう!');
            fin_flg = true;
        }else if(kaisu === 3){
            console.log('まちがい.残念でした答えは' + kotae + 'です');
            fin_flg = true;
        }else if(yoso < kotae){
            console.log('まちがい. 答えはもっと大きいですよ');
        }else{
            console.log('まちがい.答えはもっと小さいですよ');
        }
    }
}