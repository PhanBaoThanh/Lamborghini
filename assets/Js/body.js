const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
export function bodyStart(){
    const data = [
        ['./assets/image/Skew/first.jpg','urus','unlock any road'],
        ['./assets/image/Skew/second.jpg','aventador','real emotions shape the future'],
        ['./assets/image/Skew/third.jpg','huracán','based on a true story']
    ]
    const bodySliderImages = $('.body__slider__images')
    const leftBtn = $('.js-left')
    const rightBtn = $('.js-right')
    const text = $('.body__slider__content__zone__info__text')
    const h3 = text.querySelector('h3')
    const h4 = text.querySelector('h4')
    
    var count = 2;
    var time = null;
    var dataCount = 2;

    function up(){
        if(count+1===data.length) count = 0;
        else ++count;
    }

    function down(){
        if(count===0) count = data.length-1
        else --count;
    }

    function addAll(){
        data.forEach((item,index)=>{
            var element = document.createElement('div')
            element.setAttribute('dataCount',index)
            if(index === data.length-1) element.classList.add('body__slider__image','active')
            else element.classList.add('body__slider__image')
            element.innerHTML = `
                <div class="body__slider__image__skew">
                    <div class="body__slider__image__skew__img">
                        <img src="${data[index][0]}" alt="Ảnh minh họa">
                    </div>
                    <div class="body__slider__image__skew__linear"></div>
                </div>
            `
            bodySliderImages.appendChild(element)
        })
        h3.innerText = data[count][1]
        h4.innerText = data[count][2]
        h3.style.animation = 'fadeInn ease .5s'
        h4.style.animation = 'fadeInnn ease .6s'
    }
    addAll()

    rightBtn.onclick = function(){
        text.style.opacity = 0
        h3.style.animation = null;
        h4.style.animation = null;
        const bodySliderImage = [...$$('.body__slider__image')]
    
        bodySliderImage[bodySliderImage.length-1].style.width = 0;
        var element = document.createElement('div')
        element.setAttribute('dataCount',count)
        element.classList.add('body__slider__image')
        element.innerHTML = `
            <div class="body__slider__image__skew">
                <div class="body__slider__image__skew__img">
                    <img src="${data[count][0]}" alt="Ảnh minh họa">
                </div>
                <div class="body__slider__image__skew__linear"></div>
            </div>
        `
        bodySliderImages.insertBefore(element,bodySliderImage[0])
        setTimeout(()=>{   
            text.style.opacity = null
            text.style.transition = null
            h3.innerText = data[count][1]
            h4.innerText = data[count][2]
            h3.style.animation = 'fadeInn ease .6s forwards'
            h4.style.animation = 'fadeInnn ease .6s forwards'
            bodySliderImages.removeChild(bodySliderImage[bodySliderImage.length-1])
        },500)
        down()
        bodySliderImage[bodySliderImage.length-2].classList.add('active')
        dataCount = bodySliderImage[bodySliderImage.length-2].getAttribute('dataCount')
    }
    
    leftBtn.onclick = function(){
        text.style.opacity = 0
        h3.style.animation = null;
        h4.style.animation = null;
        let bodySliderImage = [...$$('.body__slider__image')]
        up()
        var element = document.createElement('div')
        element.setAttribute('dataCount',count)
        element.classList.add('body__slider__image')
        element.style.width = 0;
        element.innerHTML = `
            <div class="body__slider__image__skew">
                <div class="body__slider__image__skew__img">
                    <img src="${data[count][0]}" alt="Ảnh minh họa">
                </div>
                <div class="body__slider__image__skew__linear"></div>
            </div>
        `
        dataCount = count
        bodySliderImages.appendChild(element)
        bodySliderImage = [...$$('.body__slider__image')]
        setTimeout(() => {
            bodySliderImage[3].style.width = null
            bodySliderImage[3].classList.add('active')
            bodySliderImage[2].classList.remove('active')
        }, 50);
        setTimeout(()=>{   
            text.style.opacity = null
            text.style.transition = null
            h3.innerText = data[count][1]
            h4.innerText = data[count][2]
            h3.style.animation = 'fadeInn ease .6s forwards'
            h4.style.animation = 'fadeInnn ease .6s forwards'
            bodySliderImages.removeChild(bodySliderImage[0])
        },500)
    }

    const jsExplore = $('.js-explore')
    const bodySliderContent = $('.body__slider__content')
    const frameList = $('.body__slider__content__frame__list')
    const frame = [...$$('.body__slider__content__frame__list__items')]
    const img2D = $('.modal__frame__3d__image .d2')
    img2D.style.display = 'none'
    var check = null;
    var elementNow = null;
    jsExplore.onclick = function(){
        elementNow = frame.find(data=>data.getAttribute('dataCount')==dataCount)
        elementNow.style.display = 'flex'
        frameList.style.display = 'block'
        bodySliderImages.style.transform = 'skew(-20deg) translateX(-75vw)';
        bodySliderContent.style.transform = 'translateX(-75vw)';

        var bodyFrameListItemText = [...elementNow.querySelectorAll('.body__frame__list__item__text')]
        bodyFrameListItemText.forEach(data=>{
            data.onclick = function(){
                const bodyFrameListItemM = data.nextElementSibling
                var widthElement = bodyFrameListItemM.querySelector('.body__frame__list__item__modal').offsetHeight
                if(bodyFrameListItemM.style.height) bodyFrameListItemM.style.height = null
                else{
                    if(check) check.style.height = null
                    bodyFrameListItemM.style.height = widthElement+'px'
                }
                check = bodyFrameListItemM
                const btn3D = bodyFrameListItemM.querySelector('.body__frame__list__item__modal__section:last-child')
                var image = [];
                btn3D.onclick = function(){
                    var quantity = [btn3D.getAttribute('xy'),btn3D.getAttribute('folder')]
                    for(var i=1;i<=quantity[0];i++){
                        image[i] = new Image()
                        image[i].src = `./assets/image/2D/${quantity[1]}/${i}.jpg`
                    }
                    const frame3D = $('.modal__frame__3d')
                    frame3D.style.transform = 'scale(1)'
                    setTimeout(() => {
                        img2D.style.display = null
                        img2D.src = `./assets/image/2D/${quantity[1]}/1.jpg`
                        const btn3DClose = $('.modal__frame__3d__btn__close') 
                        btn3DClose.onclick = function(){
                            frame3D.style.transform = null
                            setTimeout(() => {
                                img2D.style.display = 'none'
                            }, 400);
                            countImg = 1;
                            quantity = []
                            image = []
                            x = null;
                        }
    
                        const modalFrame3D = $('.modal__frame__3d__image')
                        var x = null;
                        var countImg = 1;
                        modalFrame3D.onmousedown = function(e){
                            modalFrame3D.style.cursor = 'grabbing'
                            x = e.clientX;
                            quantity[0] = Number(quantity[0])
                            modalFrame3D.onmousemove = function(e){
                                if(x){
                                    if(e.clientX-x>20){
                                        x = e.clientX;
                                        if(countImg==1) countImg=quantity[0];
                                        else countImg--;
                                        img2D.src=`./assets/image/2D/${quantity[1]}/${countImg}.jpg`
                                    }
                                    else if(e.clientX-x<-20){
                                        x = e.clientX
                                        if(countImg==quantity[0]) countImg=1;
                                        else countImg++;
                                        img2D.src=`./assets/image/2D/${quantity[1]}/${countImg}.jpg`
                                    }
                                }
                            }
    
                            modalFrame3D.onmouseup = function(){
                                modalFrame3D.style.cursor = null
                                x= null;
                            }
                        }
                                
                        modalFrame3D.onclick = function(){
                            modalFrame3D.style.cursor = null
                            x= null;
                        }
                    }, 600);
                    
                }
            }
        })
    }

    const jsBodyFrameBtn = $('.js-body-frame-btn')
    jsBodyFrameBtn.onclick = function(){
        elementNow.style.display = null
        bodySliderImages.style.transform = null
        bodySliderContent.style.transform = null
        frameList.style.display = null
        var bodyFrameListItemText = [...elementNow.querySelectorAll('.body__frame__list__item__text')]
        bodyFrameListItemText.forEach(data=>{
            const bodyFrameListItemM = data.nextElementSibling
            bodyFrameListItemM.style.height = null
        })
        check = null
    }

    const bodyMobileImages = $('.body__slider__mobile__box__zone__list__images')
    var mouseDown = false
    var transform = 0;
    var now = 0;
    var dataBodyMobile = {
        0:["huracán","based on a true story"],
        1:["aventador","real emotions shape the future"],
        2:["urus","unlock any road"]
    }
    bodyMobileImages.ontouchstart = function(e){
        bodyMobileImages.style.transitionDuration = null;
        var time = performance.now()
        mouseDown = true;
        var x = e.touches[0].clientX;

        var xMove = null;
        bodyMobileImages.ontouchmove = function(evt){
            if(mouseDown) xMove = x - evt.touches[0].clientX
        }

        const bodyMobileText = $('.body__slider__mobile__box__zone__info__text')
        const bodyMobileH = $('.body__slider__mobile__box__zone__info__text > h4')
        const bodyMobileP = $('.body__slider__mobile__box__zone__info__text > p')
        bodyMobileImages.ontouchend = function(evt){
            if(xMove){
                if(xMove>20 && transform!==-160){
                    bodyMobileImages.style.transitionDuration = '300ms'
                    transform -= 80
                    ++now;
                    bodyMobileH.innerText = dataBodyMobile[now][0]
                    bodyMobileP.innerText = dataBodyMobile[now][1]
                    bodyMobileImages.style.transform = `translateX(${transform}%)`
                } 
                else if(xMove<-20 && transform!==0){
                    bodyMobileImages.style.transitionDuration = '300ms'
                    transform += 80 
                    --now;
                    bodyMobileH.innerText = dataBodyMobile[now][0]
                    bodyMobileP.innerText = dataBodyMobile[now][1]
                    bodyMobileImages.style.transform = `translateX(${transform}%)`
                } 
                
            }
        }
    }

    const bodyCreateBtn = [...$$('.body__create__content__box__list__item')]
    const bodyCreateName = $('.body__create__content__box__name > h2:last-child')
    const bodyCreateTitle = $('.body__create__content__box__title > p')
    const bodyCreateBtnsvg = $('.body__create__content__box__btn > a')
    const bodyCreateNameFirst = $('.body__create__content__box__name > h2')
    const bodyCreateImages = [...$$('.body__create__image')]
    var itemNow = bodyCreateBtn[0]
    var i = 0;
    var countNow = bodyCreateImages[0];
    var timeRender = null;
    var string = 'configurator'
    function letter(){
        if(i<string.length){
            bodyCreateTitle.innerText += string[i++]
            timeRender = setTimeout(letter,70);
        }
    }

    letter()
    bodyCreateNameFirst.style.animation = "fadeName ease .5s forwards"
    bodyCreateName.style.animation = "fadeName ease .5s forwards"
    bodyCreateName.style.animationDelay = '.5s'
    bodyCreateBtn.forEach(data=>{
        data.onclick = function(){
            if(data!==itemNow){
                i=0;
                bodyCreateName.style.animation = null
                bodyCreateNameFirst.style.animation = null
                itemNow.classList.remove('unlock')
                data.classList.add('unlock')
                bodyCreateName.innerText = data.querySelector('p').innerText
                bodyCreateBtnsvg.href = `#${bodyCreateName.innerText.toLowerCase()}`
                bodyCreateTitle.innerText = ""
                letter()
                bodyCreateNameFirst.style.animation = "fadeName ease .7s forwards"
                bodyCreateName.style.animation = "fadeName ease .5s forwards"
                bodyCreateName.style.animationDelay = '.5s'
                countNow.classList.remove('enable')
                bodyCreateImages.forEach(item=>{
                    if(item.getAttribute('type')==data.getAttribute('type')){
                        item.classList.add('enable')
                        countNow = item;
                    }
                })
                itemNow = data
            }
        }
    })

    var storageNews = {
        0:['./assets/image/News/blog/2.jpg','21 october 2021','More Record Sales for Lamborghini','#moreSale'],
        1:['./assets/image/News/blog/3.jpg','20 october 2021','Lamborghini and Movember: the CEOs’ perspective','#CEO'],
        2:['./assets/image/News/blog/4.jpg','19 october 2021','Huracán STO: Telemetry','#huracan-Sto'],
        3:['./assets/image/News/blog/5.jpg','15 october 2021','Rome: Lamborghini’s UnSTOppable Travel Guide','#travelGuide'],
        4:['./assets/image/News/blog/6.jpg','12 october 2021','Lamborghini Urus Unlocks Highest Motorable Road in the World','#urusUnlockHighest'],
        5:['./assets/image/News/blog/7.jpg','11 october 2021','Interview on the Move: Inherited Passion and Affinity Between Hobbies and Work','#passion'],
        6:['./assets/image/News/blog/8.jpg','5 october 2021','Huracán Sto: New Ccm-r Braking System ','#huracanSto'],
        7:['./assets/image/News/blog/9.jpg','1 october 2021','Paris: Lamborghini’s UnSTOppable Travel Guide','#paris'],
        8:['./assets/image/News/blog/10.jpg','1 october 2021','A Reconstruction of the Lamborghini Countach LP 500 at Villa d’Este','#countach'],
        9:['./assets/image/News/blog/11.jpg','29 september 2021','Cannonball Run’s Lamborghini Countach at the Library of Congress ','#congress'],
        10:['./assets/image/News/blog/12.jpg','27 september 2021','Get ready to live the past with Lamborghini','#ready'],
        11:['./assets/image/News/blog/13.jpg','24 september 2021','Lamborghini Countach LPI 800-4 in the Eyes of Digital Artist Yegor Zhuldybin','#artist'],
        12:['./assets/image/News/blog/14.jpg','21 september 2021','HURACÁN STO: THE “COFANGO”','#huracanSto'],
        13:['./assets/image/News/blog/15.jpg','17 september 2021','Monza and Milan: Lamborghini’s UnSTOppable Travel Guide','#monza'],
    }

    const seeAllBtn = $('.body__news__btn__box')
    const bodyBlog = $('.body__news__blog')
    seeAllBtn.onclick = function(){
        for(var data in storageNews){
            var html = `
            <div class="body__news__blog__box">
                <div class="body__news__blog__box__image">
                    <a href="${storageNews[data][3]}">
                        <img src="${storageNews[data][0]}" alt="Ảnh minh họa">
                    </a>
                </div>
                <div class="body__news__blog__box__zone">
                    <div class="body__news__blog__box__content">
                        <p>${storageNews[data][1]}</p>
                        <a href="${storageNews[data][3]}">${storageNews[data][2]}</a>
                        <div class="body__news__blog__btn">
                            <a href="${storageNews[data][3]}" class="body__news__blog__btn__box">
                                <p>read more</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `
            bodyBlog.innerHTML += html;
        }
        seeAllBtn.style.display = 'none'
    }

}