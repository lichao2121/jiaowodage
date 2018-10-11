

var banners=(function () {

        function banner () {

            let mainContent=document.getElementById('mainContent');
            let macroplate=document.getElementById('macroplate');
            let leftBanner=document.getElementById('leftBanner');
            let banner=document.getElementById('banners');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner');
            let xintian=document.getElementById('xintian');
            let Swiper=document.getElementById('Swiper');
            let lis=middleBanner.getElementsByTagName('li');
            let rightBanner=document.getElementById('rightBanner');
            let random=document.getElementById('random');
            let spans=document.getElementById('spans');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let times=null;
            let timer=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[0][0];
                let data2=data[0][2];
                console.log(data2);
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));


                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;

                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,4000);
                timer =setInterval(autoMove,5000);

            }

            function autoMove() {
                var data1=data[0][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[0][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,4000);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[0][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,4000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }
        function banner2 () {
            let mainContent=document.getElementById('mainContent2');
            let macroplate=document.getElementById('macroplate2');
            let leftBanner=document.getElementById('leftBanner2');
            let banner=document.getElementById('banners2');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner2');
            let xintian=document.getElementById('xintian2');
            let Swiper=document.getElementById('Swiper2');
            let lis=middleBanner.getElementsByTagName('li');
            let rightBanner=document.getElementById('rightBanner2');
            let random=document.getElementById('random2');
            let spans=document.getElementById('spans2');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let times=null;
            let timer=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        console.log(data);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[1][0];
                console.log(data1);
                let data2=data[1][2];
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));

                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;
                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,3500);
                timer =setInterval(autoMove,4500);

            }

            function autoMove() {
                var data1=data[1][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[1][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,3500);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[1][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,4000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }
        function banner3 () {
            let mainContent=document.getElementById('mainContent3');
            let macroplate=document.getElementById('macroplate3');
            let leftBanner=document.getElementById('leftBanner3');
            let banner=document.getElementById('banners3');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner3');
            let xintian=document.getElementById('xintian3');
            let Swiper=document.getElementById('Swiper3');
            let lis=middleBanner.getElementsByTagName('li');
            let rightBanner=document.getElementById('rightBanner3');
            let random=document.getElementById('random3');
            let spans=document.getElementById('spans3');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let times=null;
            let timer=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        console.log(data);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[2][0];
                let data2=data[2][2];
                console.log(data2);
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));

                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;

                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,3800);
                timer =setInterval(autoMove,4800);

            }

            function autoMove() {
                var data1=data[2][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[2][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,3800);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[2][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,4000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }
        function banner4 () {

            let mainContent=document.getElementById('mainContent4');
            let macroplate=document.getElementById('macroplate4');
            let leftBanner=document.getElementById('leftBanner4');
            let banner=document.getElementById('banners4');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner4');
            let xintian=document.getElementById('xintian4');
            let Swiper=document.getElementById('Swiper4');
            let lis=middleBanner.getElementsByTagName('li');

            let rightBanner=document.getElementById('rightBanner4');
            let random=document.getElementById('random4');
            let spans=document.getElementById('spans4');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let times=null;
            let timer=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        console.log(data);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[3][0];
                let data2=data[3][2];
                console.log(data2);
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));


                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;
                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,4000);
                timer =setInterval(autoMove,5000);

            }

            function autoMove() {
                var data1=data[3][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[3][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,4000);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[3][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,5000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }
        function banner5 () {

            let mainContent=document.getElementById('mainContent5');
            let macroplate=document.getElementById('macroplate5');
            let leftBanner=document.getElementById('leftBanner5');
            let banner=document.getElementById('banners5');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner5');
            let xintian=document.getElementById('xintian5');
            let Swiper=document.getElementById('Swiper5');
            let lis=middleBanner.getElementsByTagName('li');
            let rightBanner=document.getElementById('rightBanner5');
            let random=document.getElementById('random5');
            let spans=document.getElementById('spans5');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let times=null;
            let timer=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        console.log(data);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[4][0];
                let data2=data[4][2];
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));



                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;

                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,3800);
                timer =setInterval(autoMove,4800);

            }

            function autoMove() {
                var data1=data[4][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[4][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,3800);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[4][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,4000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }
        function banner6 () {
            let mainContent=document.getElementById('mainContent6');
            let macroplate=document.getElementById('macroplate6');
            let leftBanner=document.getElementById('leftBanner6');
            let banner=document.getElementById('banners6');
            let imgs=document.getElementsByTagName('img');

            let middleBanner=document.getElementById('middleBanner6');
            let xintian=document.getElementById('xintian6');
            let Swiper=document.getElementById('Swiper6');
            let lis=middleBanner.getElementsByTagName('li');
            let rightBanner=document.getElementById('rightBanner6');
            let random=document.getElementById('random6');
            let spans=document.getElementById('spans6');
            let liss=random.getElementsByTagName('li');

            let data=null;
            let timer=null;
            let times=null;
            let step=0;
            let stop=0;
            let dd=1;

            function ajax() {
                let xhr=new XMLHttpRequest();
                xhr.open('get','data/data.json',false);
                xhr.onreadystatechange=function () {
                    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                        data=JSON.parse(xhr.responseText);
                        console.log(data);
                        bindHtml()
                    }
                };
                xhr.send()
            }
            function bindHtml() {
                let imgStr=``;
                let imgItr=``;
                let data1=data[5][0];
                let data2=data[5][2];
                console.log(data2);
                for(var i=0;i<data1.length;i++){
                    imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
                }
                imgStr+=` <a href="javascrip:;" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
                banner.innerHTML=imgStr;
                utils.css(banner,'width',230*(data1.length+1));


                for(var j=0;j<data2.length;j+=6){
                    imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+1].src}" alt="">
                     <p>${data2[j+1].title}</p>
                     <span>￥${data2[j+1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+2].src}" alt="">
                     <p>${data2[j+2].title}</p>
                     <span>￥${data2[j+2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+3].src}" alt="">
                     <p>${data2[j+3].title}</p>
                     <span>￥${data2[j+3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+4].src}" alt="">
                     <p>${data2[j+4].title}</p>
                     <span>￥${data2[j+4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[j+5].src}" alt="">
                     <p>${data2[j+5].title}</p>
                     <span>￥${data2[j+5].price}</span>
                 </a>
               </div>`;
                    dd++;
                }
                imgItr+=`<div class="Swiper" id="Swiper">
                 <a href="javascrip:;">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="javascrip:;">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;
                xintian.innerHTML=imgItr;
                utils.css(xintian,'width',630*dd);
            }

            /* function lazyImg() {
             for(let i=0;i<imgs.length;i++){
             let cur=imgs[i];
             let newImg = new  Image;
             let url =cur.getAttribute('data-src');
             newImg.src=url;
             newImg.onload=function(){
             cur.src=this.src;
             newImg=null;
             animate(cur,{opacity:1},300)
             }
             }
             }
             lazyImg();*/

            function auto() {
                times=setInterval(autoMoves,4000);
                timer =setInterval(autoMove,5000);

            }

            function autoMove() {
                var data1=data[5][0];
                if(step>=data1.length){
                    step=0;
                    banner.style.left=0;
                }
                step++;
                banner.style.left=step*-230+'px';
            }
            function autoMoves() {
                var data2=data[5][1];
                if(stop>=dd-1){
                    stop=0;
                    xintian.style.left=0;
                }
                stop++;
                animate(xintian,{left:stop*-630},300)
                focusTip()
            }
            //小圆点滚动
            function focusTip() {
                for(var i=0;i<lis.length;i++){
                    if(stop===i){
                        lis[i].classList.add('selected')
                    }else {
                        lis[i].classList.remove('selected')
                    }
                    if(stop===dd-1){
                        lis[0].classList.add('selected')
                    }
                }
            }

//滑入停止滑入继续
            function mousemove() {
                middleBanner.onmousemove=function(){
                    clearInterval(times);
                };
                middleBanner.onmouseout=function(){
                    times=setInterval(autoMoves,4000);
                };
            }

            for(let i=0;i<lis.length;i++){
                lis[i].onclick=function () {
                    stop=i-1;
                    autoMoves()
                }

            }
            spans.onclick=function () {
                random.innerHTML=null;
                mock()
            }
            function mock() {
                let ary=[];
                for (var l=0;l<4;l++){
                    let data3=data[5][2];
                    let num = Math.round(Math.random()*19);
                    if(ary.includes(num)){
                        l--;
                    }else {
                        ary.push(num);
                        random.innerHTML+=`<li>
            <a href="">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
                    }
                }
            }
            document.onvisibilitychange=function () {
                if(document.visibilityState=="hidden"){
                    clearInterval(times);
                    clearInterval(timer)
                }else {
                    times=setInterval(autoMoves,4000);
                    timer=setInterval(autoMove,4000);
                }
            };
            return {
                init:function () {
                    ajax();
                    auto();
                    mousemove();
                    mock()
                }
            }
        }

        return {
            init:function () {
                banner().init();
                banner2().init();
                banner3().init();
                banner4().init();
                banner5().init();
                banner6().init()
            }
        }

    }
)();
