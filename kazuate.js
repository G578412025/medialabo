let kotae = Math.floor(Math.random()*10) + 1;
console.log('答え(デバッグ用) : ' + kotae);

let kaisu = 0;
let clear = false;

hantei();
hantei();
hantei();
hantei();

function hantei(){
    let yoso = 4;
    kaisu++;
    console.log(kaisu + '回目の予想 : ' + yoso);

    if(clear){
        console.log('答えは' + kotae + 'でした.ゲームは終了しています');
    }else{
        if(yoso === kotae){
            console.log('正解です!おめでとう!');
            clear = true;
        }else if(kaisu === 3){
            console.log('まちがい.残念でした答えは' + kotae + 'です');
            clear = true;
        }else if(yoso < kotae){
            console.log('まちがい. 答えはもっと大きいですよ');
        }else{
            console.log('まちがい.答えはもっと小さいですよ');
        }
    }
}