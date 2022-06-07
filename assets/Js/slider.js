export function slider(){
    let data = {
        0: ["sián fkp 37","ahead of its </br> time","#sian","/assets/image/slider/sian.jpg"],
        1: ["aventador lp 780-4 ultimae roadster","it takes time </br> to become</br> timeless","#aventador-lp-780-4-ultimae-roadster","/assets/image/slider/aventador.jpg"],
        2: ["huracán evo rwd","based on a </br> true story","#huracán-evo-rwd","/assets/image/slider/huracan.jpg"]
    }

    let storage = {
        0: ["sián fkp 37","ahead of its time","#sian","/assets/image/slider/sian.jpg"],
        1: ["aventador lp 780-4 ultimae roadster","it takes time to become timeless","#aventador-lp-780-4-ultimae-roadster","/assets/image/slider/aventador.jpg"],
        2: ["huracán evo rwd","based on a true story","#huracán-evo-rwd","/assets/image/slider/huracan.jpg"]
    }

    let memory = {
        0: ["sián fkp 37","ahead of its </br> time","#sian","/assets/image/slider/sian.jpg"],
        1: ["aventador lp 780-4 ultimae roadster","it takes time </br> to become</br> timeless","#aventador-lp-780-4-ultimae-roadster","/assets/image/slider/aventador.jpg"],
        2: ["huracán evo rwd","based on a </br> true story","#huracán-evo-rwd","/assets/image/slider/huracan.jpg"]
    }

    let text = ["./assets/image/slider/sianMb.jpg","./assets/image/slider/aventadorMb.jpg","./assets/image/slider/huracanMb.jpg"]
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const slider = $('.slider')
    const img = [...$$('.slider__image > img')]
    const h4 = $('.slider__content__zone__name > h4')
    const h2 = $('.slider__content__zone__title > h2')
    const link = $('.slider__content__zone__btn__link')
    const line = [...$$('.slider__content__zone__line__btn')]
    const svg = link.querySelector('svg')
    const contentBox = $('.slider__content__box')
    const bodyNewImage = $('.body__news__team__image__element')

    var count = 0;
    var itemLast = null
    var notTheFirst = null;
    var i=0;
    var render = null;
    var cycle = null;
    var wait1 = null;
    var wait2 = null;
    var checkBodyNew = false;

    window.onresize = function(){
        if(window.innerWidth<=1365) data = storage
        else data = memory
        if(window.innerWidth<=1024) img.forEach((datas,index)=>datas.src = text[index])
        else 
            img.forEach((datas,index)=>{
                if(datas.src.includes('mb'))
                    datas.src = `.${data[index][3]}`
            })
        
        if(window.innerWidth<=1024){
            bodyNewImage.src = './assets/image/News/poster/mobile.jpg'
            checkBodyNew = true
        }
        else
            if(checkBodyNew){
                bodyNewImage.src = './assets/image/News/poster/pc.jpg'
                checkBodyNew = false;
            }
    }

    function check (){
        if(window.innerWidth<=1024)
            img.forEach((datas,index)=> datas.src = text[index])
    }

    function print(){
        if(i < data[count][0].length){
            h4.innerHTML += data[count][0][i++]
            render = setTimeout(print,70)
        }
    }

    function run(check = false){
        if(window.innerWidth<=1024){
            contentBox.style.opacity = 0;
            itemLast.style.transition = '.8s'
            itemLast.classList.remove('turn')
            wait1 = setTimeout(() => {
                if(check === false){
                    line[count].querySelector('div').classList.remove('here')
                    if(count+1===img.length) count = 0;
                    else count++
                    line[count].querySelector('div').classList.add('here')
                }
                var item = img.find(data=> data.getAttribute('order')==count)
                i=0;
                h4.innerHTML = data[count][0]
                h2.innerHTML = data[count][1]
                link.href = data[count][2]
                contentBox.style.opacity = 1;
                item.classList.add('turn')
                itemLast.style.transition = null
                itemLast = item
                notTheFirst = true;
                theFirst = line[count]
            },200);
        }
        else{
            contentBox.style.opacity = null
            h2.style.opacity = 0
            h4.style.opacity = 0
            svg.style.opacity = null
            h2.style.animation = null
            svg.style.animation = 'zoomIn ease .2s forwards'
            itemLast.style.transition = '.8s'
            itemLast.classList.remove('turn')
            wait1 = setTimeout(() => {
                if(check === false){
                    line[count].querySelector('div').classList.remove('here')
                    if(count+1===img.length) count = 0;
                    else count++
                    line[count].querySelector('div').classList.add('here')
                }
                    
                var item = img.find(data=> data.getAttribute('order')==count)
                i=0;
                h4.innerHTML = ""
                h4.style.opacity = 1
                wait2 = setTimeout(() =>{
                    print()
                    h2.innerHTML = data[count][1]
                    h2.style.animation = 'in ease 1.3s forwards'
                } , 500);
                link.href = data[count][2]
                svg.style.animation = 'zoomOut ease 1.8s forwards'
                item.classList.add('turn')
                itemLast.style.transition = null
                itemLast = item
                notTheFirst = true;
                theFirst = line[count]
            },200);
        }
        
    }

    function loop(){
        check()
        if(!notTheFirst){
            line[count].querySelector('div').classList.add('here')
            h4.innerHTML = ""
            wait2 = setTimeout(() =>{
                print();
                h2.innerHTML = data[count][1]
                h2.style.animation = 'in ease 1.3s forwards'
            },500);
            link.href = data[count][2]
            svg.style.animation = 'zoomOut ease 1.8s forwards'
            img[0].classList.add('turn')
            if(itemLast) itemLast.style.transition = null
            itemLast = img[0]
            theFirst = line[count]
        }        
        h2.style.transition = '.4s'
        cycle = setInterval(run, 10000);    
    }



    var theFirst = null;
    line.forEach(datas=>{
        datas.onclick = function(){
            if(datas !== theFirst){
                if(cycle){
                    clearInterval(cycle)
                    if(wait1) clearTimeout(wait1)
                    if(wait2) clearTimeout(wait2)
                    if(render) clearTimeout(render)
                }         
                line.forEach(datam=>{
                    datam.querySelector('div').classList.remove('here')
                })
                datas.querySelector('div').classList.add('here')
                theFirst = datas
                count = Number(datas.getAttribute('count'))

                if(window.innerWidth<=1024){
                    contentBox.style.opacity = 0
                    itemLast.style.transition = '.8s'
                    itemLast.classList.remove('turn')
                    setTimeout(() => {          
                        var item = img.find(data=> data.getAttribute('order')==count)
                        i=0;
                        h4.innerHTML = data[count][0]
                        h2.innerHTML = data[count][1]
                        link.href = data[count][2]
                        contentBox.style.opacity = 1
                        item.classList.add('turn')
                        itemLast.style.transition = null
                        itemLast = item
                        notTheFirst = true;
                        loop()
                    },200);
                }
                else{
                    contentBox.style.opacity = null
                    h2.style.opacity = 0
                    h4.style.opacity = 0
                    svg.style.opacity = null
                    svg.style.animation = 'zoomIn ease .2s forwards'
                    itemLast.style.transition = '.8s'
                    itemLast.classList.remove('turn')
                    h2.style.animation = null
                    setTimeout(() => {
                        var item = img.find(data=> data.getAttribute('order')==count)
                        i=0;
                        h4.innerHTML = ""
                        h4.style.opacity = 1
                        setTimeout(()=>{
                            print()
                            h2.innerHTML = data[count][1]
                            h2.style.animation = 'in ease .8s forwards'
                        }, 500);
                        link.href = data[count][2]
                        svg.style.animation = 'zoomOut ease 1.8s forwards'
    
                        item.classList.add('turn')
                        itemLast.style.transition = null
                        itemLast = item
                        notTheFirst = true;
                        loop()
                    },200);
                }
            }
        }
    })
    loop()


    slider.addEventListener('touchstart', handleTouchStart, false);        
    slider.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                                                                            
    var yDown = null;                                                                                                            
    var xMove = null;
    var yMove = null;

    function handleTouchStart(evt) {                                            
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };  

    
    function handleTouchMove(evt) {
        var yDiff = yDown - evt.touches[0].clientY;
        if (xDown && (yDiff < 50 && yDiff > -50)) {
            xMove = evt.touches[0].clientX;
            yMove = evt.touches[0].clientY
            var xDiff = xDown - xMove;
            if(xDiff>25){
                if(cycle){
                    clearInterval(cycle)
                    if(wait1) clearTimeout(wait1)
                    if(wait2) clearTimeout(wait2)
                    if(render) clearTimeout(render)
                }         

                line[count].querySelector('div').classList.remove('here')
                if(count+1===img.length) count = 0
                else count++;
                line[count].querySelector('div').classList.add('here')
                theFirst = line[count]

                contentBox.style.opacity = 0;
                itemLast.style.transition = '.8s'
                itemLast.classList.remove('turn')
                setTimeout(() => {          
                    var item = img.find(data=> data.getAttribute('order')==count)
                    i=0;
                    h4.innerHTML = data[count][0]
                    h2.innerHTML = data[count][1]
                    link.href = data[count][2]
                    contentBox.style.opacity = 1;

                    item.classList.add('turn')
                    itemLast.style.transition = null
                    itemLast = item
                    notTheFirst = true;
                    loop()
                },200);
                xDown = null                                        
            }

            else if(xDiff<-25){
                if(cycle){
                    clearInterval(cycle)
                    if(wait1) clearTimeout(wait1)
                    if(wait2) clearTimeout(wait2)
                    if(render) clearTimeout(render)
                }         

                line[count].querySelector('div').classList.remove('here')
                if(count-1<0) count = (img.length-1)
                else count--;
                line[count].querySelector('div').classList.add('here')
                theFirst = line[count]
                
                contentBox.style.opacity = 0
                itemLast.style.transition = '.8s'
                itemLast.classList.remove('turn')
                setTimeout(() => {          
                    var item = img.find(data=> data.getAttribute('order')==count)
                    i=0;
                    h4.innerHTML = data[count][0]
                    h2.innerHTML = data[count][1]
                    link.href = data[count][2]
                    contentBox.style.opacity = 1
                    item.classList.add('turn')
                    itemLast.style.transition = null
                    itemLast = item
                    notTheFirst = true;
                    loop()
                },200);
                xDown = null                                        
            }
        }
    };

}