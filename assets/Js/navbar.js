const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export function start(carNavData){
    const header = $('.header')
    var headerHeight = header.offsetHeight;
    const navModalLists = [...$$('.nav__modal__list')];
    const navListItems = [...$$('.js__item')]
    const navListItemsLock = [...$$('.js__none__item')]
    let modalInfoProperties = $('.nav__modal__info__properties')
    const extend = $('.extend').querySelector('.nav__modal__info__properties')

    var lastElement=null;
    var lastItem = null;
    var listOpacity = null;
    var choiceLastItem = null;
    var theFirst = null;
    var propertiesLast = null;
    var textOutput = [];
    var timeImage;
    var refresh;
    var search = false;
    var bar = false;


    function changeHeader(lastElement){
        if(lastElement){
            navModalLists[lastElement[1]].style.opacity = null;
            navModalLists[lastElement[1]].style.zIndex = null;
            lastElement[2].style.width = null;
            lastElement[3].forEach(item=>{
                item.style.cursor = null;
            })
        }
        if(lastItem) lastItem.style.opacity = null;
        if(choiceLastItem)
            choiceLastItem.forEach(item=>{
                item.style.opacity = null;
                item.style.cursor = null;
                theFirst = true
            })
        if(listOpacity){
            Object.assign(listOpacity.style,{
                opacity: null,
                zIndex: null,
                visibility: null
            })
        }
        modalInfoProperties.style.opacity = null
        modalInfoProperties.offsetParent.style.zIndex = null;
        modalInfoProperties = $('.nav__modal__info__properties')
        modalInfoProperties.querySelector('.hidden').style.display = null
        if(textOutput!==[]){
            textOutput.forEach(data=>{
                data.style.animation = null
                data.style.visibility = 'hidden'
            })
            const btn = [...modalInfoProperties.querySelectorAll('.btn')]
            btn.forEach(datas=>{
                datas.style.animation = null
                datas.style.visibility = 'hidden'
            })
            textOutput = []
        }

        if(timeImage) clearTimeout(timeImage)
    }

    if(window.innerWidth>1024){
        navListItems.forEach((item,index) => {
            item.onmouseenter = function(e){
                if(search===false && bar===false){
                    navModalLists[index].style.left = item.offsetLeft+ 'px';
                    changeHeader(lastElement)
        
                    header.style.height = headerHeight + 'px';
                    Object.assign(header.style,{
                        height: `${headerHeight + navModalLists[index].offsetHeight}px`,
                        transition: '.4s',
                    })
        
                    Object.assign(navModalLists[index].style,{
                        opacity: '1',
                        zIndex: '2',
                        transition: '.3s'
                    })
        
        
                    const listItems = [...navModalLists[index].querySelectorAll('.js__pointer')]
                    listItems.forEach(item=>{
                        item.style.cursor = 'pointer'
                    })
        
                    const underline = item.querySelector('.underline');
                    underline.style.width = '100%';
                    lastElement = [item,index,underline,listItems];
                    let number = index;
        
                    modalInfoProperties.style.opacity = null
        
                    listItems.forEach((item,index)=>{
                        item.onmouseenter = function(){
                            if(search===false&& bar===false){
                                if(listOpacity){
                                    Object.assign(listOpacity.style,{
                                        opacity: null,
                                        zIndex:null,
                                        visibility: null
                                    })
                                }
                                if(lastItem) lastItem.style.opacity = null
                                if(choiceLastItem){
                                    choiceLastItem.forEach(item=>{
                                        item.style.opacity = null;
                                    })
                                }
                                clearTimeout(timeImage)
                                modalInfoProperties.style.opacity = null
                                modalInfoProperties.offsetParent.style.zIndex = null;
                                modalInfoProperties = $('.nav__modal__info__properties')
                                modalInfoProperties.querySelector('.hidden').style.display = null
                                
                                item.style.opacity = '1'
                                lastItem = item
                                header.style.height = headerHeight + navModalLists[number].offsetHeight +'px'
        
                                const choiceLists = item.nextElementSibling
                                if(choiceLists){
                                    Object.assign(choiceLists.style,{
                                        opacity: '1',
                                        zIndex: '2',
                                        visibility: 'visible'
                                    })
                                    listOpacity = choiceLists;
                                }
        
                                let jsHover = null;
                                if(item.nextElementSibling)
                                    jsHover = [...item.nextElementSibling.querySelectorAll('.js__hover')]
        
                                if(jsHover !==null && choiceLists){
                                    theFirst = true;
                                    jsHover.forEach(item=>{
                                        item.style.cursor = 'pointer'
                                    })
                                    var theLast = null;
                                    var timeOut = null;
                                    var timeIn = null
                                    var thePresent = null;
                                    var a = 0;
                                    jsHover.forEach(itemm=>{
                                        itemm.onmouseenter = function(){
                                            if(itemm.style.cursor ='pointer'){
                                                const navModalInfo = $('.nav__modal__info')
                                                if(!theFirst) itemm.style.opacity = null;
                                                if(theFirst) theFirst = false
                                                refresh = true;
                                                a = 0;
        
                                                const value = itemm.querySelector('a');
                                                var temp = null;
                                                if(carNavData[value.innerText.toLowerCase()])
                                                    temp = carNavData[value.innerText.toLowerCase()]
                                                jsHover.forEach(item=>{
                                                    if(item!==itemm) item.style.opacity = '0.3'
                                                })
                                                
                                                choiceLastItem = jsHover;
                                                if(temp!==null){
                                                    header.style.height = headerHeight+navModalInfo.offsetHeight+'px';
                                                    if(temp.image !== theLast || theLast === null){
                                                        if(textOutput!==[]){
                                                            textOutput.forEach(data=>{
                                                                data.style.animation = null
                                                                data.style.visibility = 'hidden'
                                                            })
                                                            const btn = [...modalInfoProperties.querySelectorAll('.btn')]
                                                            btn.forEach(datas=>{
                                                                datas.style.animation = null
                                                                datas.style.visibility = 'hidden'
                                                            })
                                                            textOutput = []
                                                        }
            
                                                        modalInfoProperties.style.opacity = null;
                                                        modalInfoProperties.offsetParent.style.zIndex = null
                                                        modalInfoProperties = $('.nav__modal__info__properties')
                                                        modalInfoProperties.querySelector('.hidden').style.display = null
            
                                                        
                                                        if(item.querySelector('a').innerText==='LIMITED SERIES')
                                                            modalInfoProperties.querySelector('.hidden').style.display = 'none'
                                                        else if(item.querySelector('a').innerText ==='CONCEPT'){
                                                            modalInfoProperties = $('.extend').querySelector('.nav__modal__info__properties')
                                                            a = 1;
                                                        }
            
                                                        const modelText = [...modalInfoProperties.querySelectorAll('.model__infomation__text')]
                                                        if(theLast===null){
                                                            timeIn = setTimeout(() => {
                                                                modalInfoProperties.querySelector('img').src = temp.image
                                                            },200);

                                                            timeOut = setTimeout(()=>{
                                                                modalInfoProperties.querySelector('img').src = temp.image
                                                                appear(modelText,temp,textOutput)
                                                                modalInfoProperties.offsetParent.style.zIndex = 1;
                                                                modalInfoProperties.style.opacity = 1;
                                                            },200)
                                                        }
                                                        else{
                                                            timeIn = setTimeout(() => {
                                                                modalInfoProperties.querySelector('img').src = temp.image
                                                            },200);
                                                            timeOut = setTimeout(()=>{
                                                                appear(modelText,temp,textOutput)
                                                                modalInfoProperties.offsetParent.style.zIndex = 1;
                                                                modalInfoProperties.style.opacity = 1;
                                                            },250)
                                                        }
                                                        theLast = temp.image
                                                        thePresent = [temp,theLast];
                                                    }
                                                }
                                            }
                                        }
        
                                        itemm.onmouseleave = function(){
                                            if(search === false && bar === false){
        
                                                if(timeOut && refresh){
                                                    clearTimeout(timeOut)
                                                    clearTimeout(timeIn)
                                                    const modelText = [...modalInfoProperties.querySelectorAll('.model__infomation__text')]
                                                    appear(modelText,thePresent[0],textOutput)
                                                    timeImage = setTimeout(()=>{
                                                        modalInfoProperties.querySelector('img').src = thePresent[0].image
                                                        modalInfoProperties.style.opacity = 1;
                                                    },150)
                                                    theLast = thePresent[0].image
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            }
        })
    
        navListItemsLock.forEach(item =>{
            item.onmouseenter = function(){
                if(search===false && bar===false){
                    if(lastElement){
                        header.style.height = headerHeight+'px';
                        changeHeader(lastElement)
                    }
        
                    lastElement=null;
                    const underline = item.querySelector('.underline');
                    underline.style.width = '100%';
                }
            }
            item.onmouseleave = function(){
                const underline = item.querySelector('.underline');
                underline.style.width = null
            }
        })
    
        header.onmouseleave = function(){
            if(lastElement && search === false && bar===false){
                header.style.height = null;
                changeHeader(lastElement)
            }
        }
    }

    function appear(modelText,temp,textOutput){
        var concept = false
        modelText.forEach(data=>{
            if(temp[data.getAttribute('dataType')]){
                data.querySelector('p').innerText = temp[data.getAttribute('dataType')][0]
                data.querySelector('h3').innerText = temp[data.getAttribute('dataType')][1]
                textOutput.push(data.querySelector('p'))
                textOutput.push(data.querySelector('h3'))
                if(data.getAttribute('dataType')==='createInfo'
                ||data.getAttribute('dataType')==='moreInfo'
                ||data.getAttribute('dataType')==='viewInfo'){
                    var btnLink;
                    if(data.getAttribute('dataType')==='createInfo'){
                        btnLink = modalInfoProperties.querySelector('.nav__modal__info__car__thirdth[dataType="createInfo"]')
                        btnLink.querySelector('a').href = temp.createInfo[2];
                    }
                    else if(data.getAttribute('dataType')==='viewInfo'){
                        btnLink = modalInfoProperties.querySelector('.nav__modal__info__car__first[dataType="viewInfo"]')
                        btnLink.querySelector('a').href = temp.viewInfo[2];
                        concept = true;
                    }
                    else{
                        btnLink = modalInfoProperties.querySelector('.nav__modal__info__car__first[dataType="moreInfo"]')
                        btnLink.querySelector('a').href = temp.choiceLink
                    }
                }
            }
        })

        var a = 0.3;
        textOutput.forEach(data=>{
            data.style.visibility = null
            data.style.animation = `fadeIn ease ${a}s forwards`
            if(a>=1) a+=0.15
            else a+= 0.2

            if(a>= 1.2 && !concept) refresh = false;
            if(concept && a>=0.7) refresh = false
        })
        const btn = [...modalInfoProperties.querySelectorAll('.btn')]
        btn.forEach(datas=>{
            if(concept) datas.style.animation = 'scale ease 1s forwards'
            else datas.style.animation = 'scale ease 1.3s forwards'
            datas.style.visibility = null
        })
    }

    const messageBtn =  $('.nav__option__message')
    const modalFrame = $('.modal__frame')
    const modalMessage = $('.modal__message')
    const messageBtnClose = $('.modal__message__block__box__close')
    messageBtn.onclick = function(){
        if(search===false && bar===false){
            if(header.offsetHeight===60) header.style.height = null
            else if(header.offsetHeight!==94) header.style.height = '94px'
            modalFrame.style.zIndex = 10;
            modalFrame.style.backgroundColor = 'rgba(0,0,0,0.4)';
            setTimeout(() => {
                modalMessage.style.transform = 'translateX(0)'
            }, 200);
        }
    }
    messageBtnClose.onclick = function(){
        modalMessage.style.transform = null;
        setTimeout(()=>{
            modalFrame.style.zIndex = null;
            modalFrame.style.backgroundColor = null;
        },200)
    }
    modalFrame.onclick = function(){
        modalMessage.style.transform = null;
        setTimeout(()=>{
            modalFrame.style.zIndex = null;
            modalFrame.style.backgroundColor = null;
        },200)
    }
    modalMessage.onclick = function(e){
        e.stopPropagation();
    }


    const searchBtn = $('.nav__option__search')
    const closeSearchBtn = $('.modal__search__btn__close')
    searchBtn.onclick = function(){
        if(search===false && bar===false){
            const navListItem = header.querySelectorAll('.nav__list__item')
            const navbarIcon = header.querySelectorAll('.navbar-icon')
            const modalSearch = $('.modal__search')
            navListItem.forEach(data=>{
                data.style.opacity = 0.4
                data.style.cursor = 'default'
                data.querySelector('a').style.pointerEvents = 'none';
            })
            navbarIcon.forEach(data=>{
                data.style.opacity = 0.4
                data.style.cursor = 'default'
            })
            search = true;
            if(header.offsetHeight === headerHeight || header.offsetHeight ===60){
                header.style.height = '100vh'
                Object.assign(modalSearch.style,{
                    opacity: 1,
                    zIndex: 3,
                    transform: 'translateY(0)'
                })
            }
            else{
                header.style.height = headerHeight+'px';
                changeHeader(lastElement)
                setTimeout(() => {
                    header.style.height = '100vh'
                    Object.assign(modalSearch.style,{
                        opacity: 1,
                        zIndex: 3,
                        transform: 'translateY(0)'
                    })
                }, 400);
            }
        }
    }

    closeSearchBtn.onclick = function(){
        if(search===true){
            const navListItem = header.querySelectorAll('.nav__list__item')
            const navbarIcon = header.querySelectorAll('.navbar-icon')
            const modalSearch = $('.modal__search')
            navListItem.forEach(data=>{
                data.style.opacity = null
                data.style.cursor = null
                data.querySelector('a').style.pointerEvents = null;
            })
            navbarIcon.forEach(data=>{
                data.style.opacity = null
                data.style.cursor = null
            })

            modalSearch.style.opacity = null
            setTimeout(() => {
                header.style.height = null
                modalSearch.style.zIndex = null
                modalSearch.style.transform = null
            }, 400);
            search = false;
        }
    }

    const barBtn = $('.nav__option__bar')
    const modalBar = $('.modal__bar')
    barBtn.onclick = function(){
        if(search===false){
            const firstLine = $('.first-line')
            const secondLine = $('.second-line')
            const thirdthLine = $('.thirdth-line')
            const navListItem = header.querySelectorAll('.nav__list__item')
            const navbarIcon = header.querySelectorAll('.navbar-icon')
            const modalBarBox = $$('.modal__bar__box')
            const footerModalBar = $('.footer__modal__bar')
            navListItem.forEach(data=>{
                data.style.opacity = 0.4
                data.style.cursor = 'default'
                data.querySelector('a').style.pointerEvents = 'none';
            })
            navbarIcon.forEach(data=>{
                if(![...data.classList].find(info=>{
                    return info==='nav__option__bar';
                })){
                    data.style.opacity = 0.4
                    data.style.cursor = 'default'
                }
            })
            if(bar===false){
                secondLine.style.opacity = 0
                firstLine.style.transform = 'translate(2px,7px) rotate(46deg)'
                firstLine.style.opacity = 1
                thirdthLine.style.transform = 'translate(2px,-9px) rotate(-46deg)'
                thirdthLine.style.opacity = 1
                if(header.offsetHeight === 94){
                    header.style.height = headerHeight + modalBar.offsetHeight +'px'
                    modalBarBox[1].style.zIndex = 3;
                    Object.assign(modalBar.style,{
                        opacity: 1,
                        zIndex: 3
                    })
                }
                else if(header.offsetHeight===60){
                    header.style.height = '100vh'
                    header.style.transition = '.5s'
                    modalBarBox[1].style.zIndex = 3;
                    Object.assign(modalBar.style,{
                        opacity: 1,
                        zIndex: 3
                    })

                    Object.assign(footerModalBar.style,{
                        zIndex: 3,
                        opacity:1
                    })
                }
                else{
                    header.style.height = headerHeight+'px';
                    changeHeader(lastElement)
                    setTimeout(() => {
                        modalBarBox[1].style.zIndex = 3;
                        header.style.height = headerHeight + modalBar.offsetHeight +'px'
                        Object.assign(modalBar.style,{
                            opacity: 1,
                            zIndex: 4
                        })
                    }, 400);
                }
                bar = true
            }
            else if(bar===true){
                navListItem.forEach(data=>{
                    data.style.opacity = null
                    data.querySelector('a').style.pointerEvents = null;
                    data.style.cursor = null
                })
                navbarIcon.forEach(data=>{
                    data.style.opacity = null
                    data.style.cursor = null
                })

                if(theOnly!==null){
                    reclick(theOnly)
                    theOnly = null
                }

                secondLine.style.opacity = null
                firstLine.style.transform = null
                firstLine.style.opacity = null
                thirdthLine.style.opacity = null
                thirdthLine.style.transform = null

                header.style.height = null
                modalBarBox[1].style.zIndex = null
                modalBar.style.opacity = null
                modalBar.style.zIndex = null;
                
                footerModalBar.style.zIndex = null
                footerModalBar.style.opacity = null
                setTimeout(() => {
                    header.style.transition = null
                }, 200);

                bar = false
            }
        }
    }

    const languages = [...$$('.modal__bar__box__choice__language')]
    var lastLanguage = languages[0]
    languages.forEach(data=>{
        data.onclick = function(){
            if(lastLanguage !== null)
                lastLanguage.classList.remove('choiced')
            data.classList.add('choiced')
            lastLanguage = data;
        }
    })

    const footerBox = [...$$('.footer__modal__bar__box')]
    const footerModalBar = $('.footer__modal__bar')
    var theOnly = null;
    footerBox.forEach(data=>{
        if(data.querySelector)
        data.onclick = function(){
            if(theOnly!==null && theOnly!==data){
                reclick(theOnly)
                theOnly = null
            }

            if(data.querySelector('.footer__modal__bar__box__list').style.maxHeight){
                reclick(data)
                theOnly = null
            }
            else{
                click(data) 
                theOnly = data
            }
        }
    })

    function reclick(item){
        item.querySelector('.footer__modal__bar__box__list').style.visibility = null
        item.querySelector('.footer__modal__bar__box__list').style.maxHeight = null
        item.querySelector('.footer__modal__bar__box__list').style.opacity = null
        item.querySelector('h4').style.color = null
        item.querySelector('svg').style.stroke = null
        item.style.backgroundColor = null
    }

    function click(item){
        item.querySelector('svg').style.stroke = '#000'
        item.style.backgroundColor = '#fff'
        item.querySelector('h4').style.color = '#000'
        Object.assign(item.querySelector('.footer__modal__bar__box__list').style,{
            visibility: 'visible',
            maxHeight: '65vh',
            opacity: 1
        }) 
    }

    const languagesMobile = [...$$('.footer__modal__bar__box__list__language')]
    const presentLanguage = $('.footer__modal__bar__box__zone__text > h4')
    languagesMobile.forEach(data=>{
        data.onclick = function(){{
            if(theOnly!== null){
                let nameLanguage = data.innerText
                data.innerText = presentLanguage.innerText
                presentLanguage.innerText = nameLanguage

            }
        }}
    })

    const newModal = [...$$('.newModal')]
    var frameMain = null;
    newModal.forEach(data=>{

        data.onclick = function(){
            modalBar.style.transform = 'translateX(-120%)'
            frameMain = $(`.modal__none[datatype="${data.innerText}"]`)
            frameMain.style.display = 'block'
        }
    })

    const navItemChild = [...$$('.navListChild')]
    var theLastChild = [];
    navItemChild.forEach(data=>{
        data.onclick = function(){
            const list = data.nextElementSibling
            if(list){
                const icon =  data.querySelector('svg')
                const childHeight = list.querySelector('ul').offsetHeight
                if(theLastChild.length>0 && theLastChild[1]!==list){
                    theLastChild[0].style.transform = null
                    theLastChild[1].style.height = null
                    theLastChild = []
                } 
                if(icon){
                    if(data.querySelector('svg').style.transform) data.querySelector('svg').style.transform = null
                    else data.querySelector('svg').style.transform = 'translateY(-50%) rotate(90deg)'
                    theLastChild[0] = data.querySelector('svg') 
                }
                
                if(list.style.height) list.style.height = null
                else list.style.height = childHeight+'px'
                theLastChild[1] = list
            }
        }
    })

    const backBtn = $('.modal__list__nav-item__btn')
    backBtn.onclick = function(){
        modalBar.style.transform = null
        setTimeout(()=>{
            if(theLastChild.length>0){
                theLastChild[0].style.transform = null
                theLastChild[1].style.height = null
                theLastChild = []
            } 
            frameMain.style.display = null
            frameMain = null;
        },400)
    }
}