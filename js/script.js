//ディレクトリデータ
var ary ={
	'index.html':'index.html',
	'sitemap.html':'sitemap.html',
	'common':{
		'images':{
			'a.gif':'a.gif',
			'b.png':'b.png',
			'c.jpg':'c.jpg'
		},
		'css':{
			'aaa.css':'aaa.css',
			'bbb.css':'bbb.css',
			'ccc.css':'ccc.css'
		},
		'js':{
			'aaa.js':'aaa.js',
			'bbb.js':'bbb.js',
			'ccc.js':'ccc.js'
		}
	},
	'product':{
		'index.html':'index.html',
		'shop.html':'shop.html',
		'mobile':{
			'index.html':'index.html',
			'campaign.html':'campaign.html',
			'images':{
				'a.gif':'a.gif',
				'b.gif':'b.gif',
				'c.gif':'c.gif'
			},
			'css':{
				'aaa.css':'aaa.css',
				'bbb.css':'bbb.css',
				'ccc.css':'ccc.css'
			}
		},
		'internet':{
			'index.html':'index.html',
			'campaign.html':'campaign.html',
			'images':{
				'a.gif':'a.gif',
				'b.gif':'b.gif',
				'c.gif':'c.gif'
			},
			'css':{
				'aaa.css':'aaa.css',
				'bbb.css':'bbb.css',
				'ccc.css':'ccc.css'
			}
		},
		'images':{
			'a.jpg':'a.jpg',
			'b.png':'b.png',
			'c.gif':'c.gif'
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {

//読み込み時ページトップを表示

window.scrollTo({ top: 0, behavior: 'smooth' });
document.querySelector('.js-form__input').focus();

//[問題と解答の作成]
//ディレクトリ作成
function creatDir(){
	var html_tag;
	html_tag = '<ul class="js-dir-list--01">';
	for(var key in ary){
		if(key.indexOf('0') === 0){break;}
		html_tag += '<li class="js-dir-list__item"><a href="#">' + key + '</a>';
		html_tag += '<ul class="js-dir-list--02">';
		for(var key2 in ary[key]){
			if(key2.indexOf('0') === 0){break;}
			html_tag += '<li class="js-dir-list__item"><a href="#">' + key2 + '</a>';
			html_tag += '<ul class="js-dir-list--03">';
			for(var key3 in ary[key][key2]){
				if(key3.indexOf('0') === 0){break;}
				html_tag += '<li class="js-dir-list__item"><a href="#">' + key3 + '</a>';
				html_tag += '<ul class="js-dir-list--04">';
				for(var key4 in ary[key][key2][key3]){
					if(key4.indexOf('0') === 0){break;}
					html_tag += '<li class="js-dir-list__item"><a href="#">' + key4 + '</a>';
					if(key4.indexOf('.') != -1){html_tag += '<p class="list-path">' + key +'/'+ key2 +'/'+ key3 +'/'+ key4 + '</p>'}
				}
				html_tag += '</li></ul>';
				if(key3.indexOf('.') != -1){html_tag += '<p class="list-path">' + key +'/'+ key2 +'/'+ key3 + '</p>'}
			}
			html_tag += '</li></ul>';
			if(key2.indexOf('.') != -1){html_tag += '<p class="list-path">' + key +'/'+ key2 + '</p>'}
		}
		html_tag += '</li></ul>';
		if(key.indexOf('.') != -1){html_tag += '<p class="list-path">' + key + '</p>'}
	}
	html_tag += '</li></ul>';
	return html_tag;
}
var areaDirectory = document.querySelector('.js-makeDirectory');
areaDirectory.innerHTML = creatDir();

var areaPath = document.querySelector('.js-path');
areaPath.innerHTML = creatDir();

var emptyULs = areaPath.querySelectorAll('ul:empty');
emptyULs.forEach(function(ul) {
    ul.remove();
});

var aULs = areaPath.querySelectorAll('.js-dir-list__item > a');
aULs.forEach(function(a) {
    a.remove();
});

//よく使うオブジェクトを変数にしておく
var question_textIndex = document.querySelectorAll('.js-question');

	//|問題作成|//
	
	//全拡張子のパス一覧作成
	var basePath = document.querySelector('.js-path .js-dir-list--01').innerHTML.replace(/<\/p>/g,':</p>');
	document.querySelector('.js-path').innerHTML = basePath;
	var basePath = document.querySelector('.js-path').textContent.split(':');
	
	//上記ベースパスの配列を使って各々の拡張子のパス生成関数を作成
	function creatPath(a){
		var path = [];
		for(var i in basePath){
			if(basePath[i].indexOf(a) != -1){
				path.push(basePath[i]);
			}
		}
		return path;
	}
	
	//上記関数を使って拡張子別のパス変数を生成
	var htmlPath = creatPath('.html');
	var imagePath = [].concat(creatPath('.gif'),creatPath('.png'),creatPath('.jpg'));
	var cssPath = creatPath('.css');
	var jsPath = creatPath('.js');

	//絶対パスか相対パスかを作成
	var kindPath = ['相対','相対','相対','絶対']
	
	//上記拡張子別の配列数を上限としたランダム数をとる関数を作成
	function creatRand(a){
		return Math.floor(Math.random() * a.length);
	}
	
	//何パターンかある問題をランダムで選ぶ（問題はHTMLに記述している）
	var question_rand = Math.floor(Math.random() * question_textIndex.length + 1);
    question_textIndex.forEach(function(el) {
        el.style.display = 'none';
    });
    var question_text = question_textIndex[question_rand-1];
	question_text.style.display = 'block';
	
	//ランダムで選ばれた問題パターンにランダムでパスを挿入して問題を完成させる
	document.querySelectorAll('[class*="js-code--"]').forEach(function(el){
        el.style.display = 'none';
    });
	switch(question_rand){
		case 1:
            question_text.querySelector('.js-question--a').innerHTML = htmlPath[creatRand(htmlPath)];
            question_text.querySelector('.js-question--b').innerHTML = htmlPath[creatRand(htmlPath)];
            question_text.querySelector('.js-question--c').innerHTML = kindPath[creatRand(kindPath)];
            document.querySelectorAll('.js-code--01').forEach(function(el){
                el.style.display = 'inline';
            });
			if(question_text.querySelector('.js-question--b').innerHTML.indexOf('index.html') !== -1){
				document.querySelector('.js-code--01-caution').style.display = 'inline-block';
			}
		break;
		case 2:
            question_text.querySelector('.js-question--a').innerHTML = htmlPath[creatRand(htmlPath)];
            question_text.querySelector('.js-question--b').innerHTML = imagePath[creatRand(imagePath)];
            question_text.querySelector('.js-question--c').innerHTML = kindPath[creatRand(kindPath)];
            document.querySelectorAll('.js-code--02').forEach(function(el){
                el.style.display = 'inline';
            });
		break;
		case 3:
            question_text.querySelector('.js-question--a').innerHTML = htmlPath[creatRand(htmlPath)];
            question_text.querySelector('.js-question--b').innerHTML = cssPath[creatRand(cssPath)];
            question_text.querySelector('.js-question--c').innerHTML = kindPath[creatRand(kindPath)];
            document.querySelectorAll('.js-code--03').forEach(function(el){
                el.style.display = 'inline';
            });
		break;
		case 4:
            question_text.querySelector('.js-question--a').innerHTML = htmlPath[creatRand(htmlPath)];
            question_text.querySelector('.js-question--b').innerHTML = jsPath[creatRand(jsPath)];
            question_text.querySelector('.js-question--c').innerHTML = kindPath[creatRand(kindPath)];
            document.querySelectorAll('.js-code--04').forEach(function(el){
                el.style.display = 'inline';
            });
		break;
		case 5:
            question_text.querySelector('.js-question--a').innerHTML = cssPath[creatRand(cssPath)];
            question_text.querySelector('.js-question--b').innerHTML = imagePath[creatRand(imagePath)];
            question_text.querySelector('.js-question--c').innerHTML = kindPath[creatRand(kindPath)];
            document.querySelectorAll('.js-code--05').forEach(function(el){
                el.style.display = 'inline';
            });
		break;
	}
	
	//|解答生成|//
	function answer(){
		if(question_text.querySelector('.js-question--c').innerHTML === '絶対'){
			var ans = '/' + question_text.querySelector('.js-question--b').innerHTML;
		} else {
				var a_ary = question_text.querySelector('.js-question--a').innerHTML.split('/');
				var b_aryPath = question_text.querySelector('.js-question--b').innerHTML;
				var b_ary = b_aryPath.split('/');
				var a_folder_len = a_ary.length-1;
				
				//a_ary分の../を作っておく
				var dotdotslash = []
					for(var i=0;i < a_folder_len;i++){
						dotdotslash.push('../');
					}
					
					//解答生成
					for(var i=0;i < a_folder_len;i++){
						if(a_ary[i] === b_ary[i]){
							dotdotslash.pop();
							var b_aryPath = b_ary.slice(i+1).join('/');
						}
						var dotdtoslashPath = dotdotslash.join('');
					}
				if(dotdtoslashPath === undefined){
					var ans = b_aryPath;
				} else {
					var ans = dotdtoslashPath + b_aryPath;
				}
		}
		return ans;
	}
	
	//|回答と正解|//
	document.querySelectorAll('.js-correct-box, .js-correct, .js-correct__reload, .js-correct__text').forEach(function(el){
        el.style.display = 'none';
    });
	document.querySelector('.js-form__input').addEventListener('keydown', function(e){
		if(typeof e.keyCode === 'undefined' || e.keyCode === 13){

            e.preventDefault();

			//回答を取得
			var reply = document.fm.textarea.value;

			//正解判別
			var result_ans,result_hints,result_path;
			result_path = answer();
			if(result_path === reply){
				cookie_hash.ok++; //正解のカウンター
				document.querySelector('.js-form__input').disabled = true;
				result_ans = '正解';
				document.querySelector('.js-correct__reload').style.display = 'inline-block';
				document.querySelector('.js-correct__reload').animate({opacity: [0, 1]}, {fill: "forwards", easing: "ease-in", duration: 2000});
			} else if(result_path.slice(0,1) != '/' && './' + result_path === reply){
				cookie_hash.ok++; //正解のカウンター
				document.querySelector('.js-form__input').disabled = true;
				result_ans = '正解';
				result_hints = '正解だけど相対パスの「./」は基本的に省略するので覚えておこう！';
				document.querySelector('.js-correct__reload').style.display = 'inline-block';
				document.querySelector('.js-correct__reload').animate({opacity: [0, 1]}, {fill: "forwards", easing: "ease-in", duration: 2000});
			} else {
					cookie_hash.ng++; //間違いのカウンター
					result_ans = '不正解';
					if(result_path.slice(0,1) === '/' && reply.slice(0,1) != '/'){
						result_hints = '絶対パスはスラッシュ「/」から始まるよ！';
					} else if(result_path.slice(0,1) === '/' && reply.slice(0,1) === '/'){
						result_hints = '絶対パスはリンク先のパスを第１階層目から記述するよ！';
					} else if(result_path.slice(0,1) != '/' && reply.slice(0,1) === '/'){
						result_hints = '相対パスはスラッシュ「/」から始まらないよ！';
					} else if(result_path.slice(0,3) === '../'){
						result_hints = 'リンク先と階層を合わせよう！階層は「../」で1階層上のフォルダに上がれるよ！';
					} else if(result_path.slice(0,3) != '../' && reply.slice(0,3) === '../'){
						result_hints = '「../」で階層上がらなくても大丈夫だよ！';
					} else if(result_path.slice(0,3) === '../' && reply.slice(0,3) != '../'){
						result_hints = '下階層に下がればリンク先があるよ！';
					} else{
						result_hints = '綴りミスや全角が入っていないか、スラッシュやドットの数は合っているか確認しよう！';
					}
			}
			document.querySelector('.js-correct-box').insertAdjacentHTML('afterbegin', '<div><p class="js-correct-box__title">'+result_ans+'</p><p class="js-correct-box__text">'+result_hints+'</p></div>');
			if (document.querySelector('.js-correct-box__text').textContent === 'undefined') {document.querySelector('.js-correct-box__text').remove()};
			if (document.querySelector('.js-correct-box__title').textContent === '不正解') {document.querySelector('.js-correct-box__title').classList.add('is--red')};
            document.querySelector('.js-correct-box').style.display = 'block';
            document.querySelector('.js-correct-box').animate({opacity: [0, 1]}, {fill: "forwards", duration: 200});
            document.querySelector('.js-correct').style.display = 'inline-block';
            document.querySelector('.js-correct').animate({opacity: [0, 1]}, {fill: "forwards", duration: 700});
			document.querySelector('.js-correct').addEventListener('click', function(){
				document.querySelector('.js-form__input').disabled = true;
				document.querySelector('.js-correct__text').innerHTML = '<span>'+result_path+'</span>';
                document.querySelector('.js-correct__text').style.display = 'inline-block';
                document.querySelector('.js-correct__text').animate({opacity: [0, 1]}, {fill: "forwards", duration: 200});
                document.querySelector('.js-correct__reload').style.display = 'inline-block';
                document.querySelector('.js-correct__reload').animate({opacity: [0, 1]}, {fill: "forwards", easing: "ease-in", duration: 2000});
			});
		}
	});
	
//アコーディオン
	//開閉
	document.querySelectorAll('.js-makeDirectory a').forEach(function(el){
        el.nextElementSibling.style.display = 'none';
        el.addEventListener('click', function(el) {
            el.preventDefault();
            if (el.currentTarget.nextElementSibling.style.display === 'none') {
                el.currentTarget.nextElementSibling.style.display = 'block';
            } else {
                el.currentTarget.nextElementSibling.style.display = 'none';
            }
        });
    });
	//問題のパスを開いて色を付ける。導線の流れは青色から黄色へ
	var fromPath = question_text.querySelector('.js-question--a').innerHTML;
	var toPath = question_text.querySelector('.js-question--b').innerHTML;
	document.querySelectorAll('.js-makeDirectory .list-path').forEach(function(el){
		if(el.textContent === fromPath){
			el.parentNode.classList.add('js-dir-list__item--from');
            var parent = el.parentNode;
            while (parent && !parent.classList.contains('js-makeDirectory')) {
                parent.style.display = 'block';
                parent = parent.parentNode;
            }
		}
		if(el.textContent === toPath){
			el.parentNode.classList.add('js-dir-list__item--to');
            var parent = el.parentNode;
            while (parent && !parent.classList.contains('js-makeDirectory')) {
                parent.style.display = 'block';
                parent = parent.parentNode;
            }
		}
	});	

	//list-pathは使い終わったので削除
	document.querySelectorAll('.js-makeDirectory .list-path').forEach(function(el){
        el.remove();
    });
	
	//説明エリア
    if(cookie_hash.count !== 1){
        document.querySelector('.js-ac__detail--default').style.display = 'none';
    }
	document.querySelector('.js-ac__button--default').addEventListener('click', function(el){
        if(document.querySelector('.js-ac__detail--default').style.display === 'none'){
            document.querySelector('.js-ac__detail--default').animate({opacity: [0, 1]}, {fill: "forwards", duration: 500});
            document.querySelector('.js-ac__detail--default').style.display = 'block'
        } else {
            document.querySelector('.js-ac__detail--default').animate({opacity: [1, 0]}, {fill: "forwards", duration: 300});
            setTimeout(function(){document.querySelector('.js-ac__detail--default').style.display = 'none'}, 300);
        }
	});
	
	//スコアの生成
	if((cookie_hash.ok === 0 && cookie_hash.ng === 0)){
		var to_fixed = 0;
	} else{
		var to_fixed = cookie_hash.ok/(cookie_hash.ok+cookie_hash.ng)*100;
		to_fixed = to_fixed.toFixed(0);
	}

	document.querySelector('.js-score').innerHTML = '<span class="text--bold">' + cookie_hash.count + '</span>問目 現在の正解率は<span class="text--bold">' + to_fixed + '</span>％ <span class="text--bold">' + cookie_hash.ok + '</span>回正解して、<span class="text--bold">' + cookie_hash.ng + '</span>回不正解です';

});

//|cookie|

//初期設定
//cookieをハッシュにする
function GetCookies(){
	var result = {};
	if(document.cookie === '' || document.cookie.indexOf('NaN') !== -1){
		document.cookie = 'count=0';
		document.cookie = 'ok=0';
		document.cookie = 'ng=0';
	}
	var allcookies = document.cookie;
	if(allcookies != ''){
		var cookies = allcookies.split('; ');
		for( var i = 0; i < cookies.length; i++ ){
			var cookie = cookies[i].split('=');
			// クッキーの名前をキーとして 配列に追加する
			result[cookie[0]] = decodeURIComponent(cookie[1]);
		}
	}
    return result;
}
var cookie_hash = GetCookies();
//数値型にする
cookie_hash.count = parseInt(cookie_hash.count);
cookie_hash.ok = parseInt(cookie_hash.ok);
cookie_hash.ng = parseInt(cookie_hash.ng);

//ページが表示されたら1ずつカウントする
cookie_hash.count++;

//cookie削除
function removeCookie(){
    document.cookie = 'count=; max-age=0';
    document.cookie = 'ok=; max-age=0';
    document.cookie = 'ng=; max-age=0';
}

//cookie生成
function locationHref(){
	for(key in cookie_hash){
		document.cookie = key+'='+cookie_hash[key]+';';
	}
	location.reload();
}
document.addEventListener('keydown',function(e){
	if(e.keyCode === 116){
	for(key in cookie_hash){
		document.cookie = key+'='+cookie_hash[key]+';';
	}
	}
});