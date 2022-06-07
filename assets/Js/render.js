import {myJSON} from './database.js'
var databases = {}
function getJSON(){
        const navList = [...document.querySelectorAll('.js__item')]
        myJSON.forEach((datas,index)=>{
            const link = navList[index].querySelector('a')
            link.href = datas.aLink
            link.querySelector('span').innerText = datas.name;
            const modalList = [...[...document.querySelectorAll('.nav__modal__list')][index].querySelectorAll('.js__pointer')]
            datas.List.forEach((data,index)=>{
                const listItem = modalList[index]
                listItem.querySelector('a').href = data.link
                listItem.querySelector('a').innerText = data.choice
                if(data.choiceList !== null){
                    const modalChoiceItems = [...listItem.nextElementSibling.querySelectorAll('.js__hover')]
                    data.choiceList.forEach((value,index)=>{
                        databases[value.choiceName] = value.info
                        modalChoiceItems[index].querySelector('a').href = value.choiceLink;
                        modalChoiceItems[index].querySelector('a').innerText = value.choiceName;
                    })
                }
            })
        })
        
}

export {databases as carNavData,getJSON};