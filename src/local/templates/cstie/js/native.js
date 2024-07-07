function slideToggle(elem){
    if(elem.offsetHeight == 0){
        elem.classList.add('show');
        let heightList = elem.offsetHeight; 
        elem.style.height = 0;  
        setTimeout(function(){
            elem.style.height = heightList + 'px';
        }, 10);
        setTimeout(function(){ 
            elem.style.height = 'auto';
        }, 600);
    }else{
        let heightList = elem.offsetHeight;
        elem.style.height = heightList +'px';
        setTimeout(function(){
            elem.style.height = 0; 
        }, 10);
        
        setTimeout(function(){
            elem.classList.remove('show');
            elem.removeAttribute('style');
        }, 300);
    } 
}

document.addEventListener('DOMContentLoaded', (e)=>{

    let subMenuHowBtn = document.querySelectorAll('.show-submenu-btn'); 
    if(subMenuHowBtn.length > 0){ 
        subMenuHowBtn.forEach(item=>{
            if(window.innerWidth < 941){
                item.addEventListener('click', function(){  
                    let list = this.nextElementSibling; 
                    slideToggle(list);
                });
            }
            
        });
    }

    // Работа меню в мобильной версии
    let burgerBtn  = document.querySelector('.burger-btn');
    let header = document.getElementById('header');
    let body = document.querySelector('body');
    if(burgerBtn){
        burgerBtn.addEventListener('click', function(){ 
            header.classList.toggle('header-open-menu');
            body.classList.toggle('fixed');
        });
    }

    let arSimplembar = document.querySelectorAll('.simplebar-box'); 
    if(arSimplembar.length > 0){
        arSimplembar.forEach(simplebarItem => { 
            new SimpleBar(simplebarItem, {
                autoHide: false
            });
        });
    }
    
    let nlExampleSl = document.querySelectorAll('.example-sl');
    if(nlExampleSl.length > 0){
        nlExampleSl.forEach(sl=>{
            let swPagination = sl.parentElement.querySelector('.swiper-pagination'); 
            let sw = new Swiper(sl, {
                pagination: {
                    clickable: true,
                    el: swPagination,
                },
              }); 
        });
    }
    let partnersSl = document.querySelector('.partners-sl');
    if(partnersSl){
        let sw = new Swiper(partnersSl, {
            slidesPerView: 4,
            spaceBetween: 20,
            // slidesPerGroup: 4,
            infinity: true,
            loop: true,
            pagination: {
                clickable: true,
                el: '.partners-sl-pagination',
            },
            navigation: {
                nextEl: ".partners-sl-box .swiper-button-next",
                prevEl: ".partners-sl-box .swiper-button-prev",
              },
            autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            },
            breakpoints: { 
                200: { 
                    slidesPerView: 1,
                    spaceBetween: 0, 
                },
                350: { 
                    slidesPerView: 2,
                    spaceBetween: 10, 
                },
                580: { 
                    slidesPerView: 3,             
                    spaceBetween: 10, 
                }, 
                850: { 
                    slidesPerView: 4,
                    spaceBetween: 20,  
                }
              }
          });  
    }

    // Подключаю маски для инпутов
    let nlPhoneMask = document.querySelectorAll('.phone-mask');
    if(nlPhoneMask.length > 0){
        nlPhoneMask.forEach(item=>{
            const mask = IMask(item, {mask: '+{7}(000)000-00-00'});
        });
    } 

    // контролер высоты блока с текстом в шапке сайта
    let headerTextBox = document.querySelector('.header-text-box');
    let btnReadMore = document.querySelector('.btn-read-more'); 

    // фукнция работает в мобильной версии, и следит за высотой блока с текстом. Если высота больше указанной в фунции, то высота обрезается, а в конце появляется ссылка Чиать полностью
    function setHeighHeaderTextBox(){
        if(headerTextBox){  
            if(window.innerWidth < 510){ 
                if(headerTextBox.offsetHeight > 220){ 
                    headerTextBox.style.height = 219 + 'px';  
                    btnReadMore.classList.remove('hide');
                } 
            }else{
                btnReadMore.classList.add('hide');
                headerTextBox.style.height = 'auto'; 
            }
        }
    }  
    if(btnReadMore){
        btnReadMore.addEventListener('click', function(){ 
            headerTextBox.style.height = 'auto';
            let height = headerTextBox.offsetHeight;
            headerTextBox.style.height = 220 + 'px'; 
            setTimeout(()=>{
                btnReadMore.classList.add('hide');
                headerTextBox.style.height = height + 'px'; 
            }, 5);
            
            setTimeout(()=>{
                headerTextBox.style = 'auto';
            }, 300);
        });
    }
    
    //функция ниже добавлена на выполнение при собитии resize в конце данного файла
    setHeighHeaderTextBox();

    // подключаю lightGallery - плагин для просмотра изображений
    let LightGalleryList = document.querySelectorAll('.lg-gallery'); 
    if(LightGalleryList.length > 0){ 
        LightGalleryList.forEach(gallery => {
            lightGallery(gallery);
        });
    } 
   
   
    // Работа спойлера
    let nlBtnSpoilerController = document.querySelectorAll('.spoiler__controller');
    if(nlBtnSpoilerController.length > 0){
        nlBtnSpoilerController.forEach(btn=>{
            btn.addEventListener('click', function(){
                if(this.classList.contains('active')){
                    this.classList.remove('active');
                    let spoilerContent = this.nextElementSibling;
                    let spoilerContentHeight = spoilerContent.offsetHeight;
                    spoilerContent.style.height = spoilerContentHeight + 'px';
                    setTimeout(()=>{
                        spoilerContent.style.height = 0;
                    }, 10);
                    setTimeout(()=>{
                        spoilerContent.removeAttribute('style');
                    }, 300);
                }else{
                    this.classList.add('active');
                    let spoilerContent = this.nextElementSibling; 
                    spoilerContent.style.display = 'block';
                    let spoilerContentHeight = spoilerContent.offsetHeight;
                    spoilerContent.style.height = 0;
                    setTimeout(()=>{
                        spoilerContent.style.height = spoilerContentHeight + 'px';
                    }, 10);
                    setTimeout(()=>{
                        spoilerContent.style.height = 'auto';
                    }, 300);
                }
            });
        });
    }

    // Открывает первый спойлер, если был переход просто на страницу, а не на какую то определенную страницу. Работает только на десктопной версии
    
    function showDestopSpolerTab(){ 
        let spoilerTab = document.querySelectorAll('.spoiler-box-for-tap .spoiler'); 
        if(spoilerTab.length > 0){ 
            let spoilerActive = document.querySelectorAll('.spoiler__controller.active');
            if(spoilerActive.length > 0){
                var tabControllerHref = '';
                spoilerActive.forEach((item, index)=>{
                    if(index !== 0){ 
                        item.classList.remove('active');
                        item.nextElementSibling.removeAttribute('style');
                    }else{
                        tabControllerHref = item.parentElement.getAttribute('id');
                    }
                });
                let stcLinks = document.querySelectorAll(`.spoiler-tab-controller li a`);
                stcLinks.forEach(link=>{
                    if(link.getAttribute('href') == `#${tabControllerHref}`){
                        link.classList.add('active');
                    }else{
                        link.classList.remove('active');
                    }
                });
            }else{
                let spContent = spoilerTab[0].querySelector('.spoiler__content');
                if(window.innerWidth > 990){
                    spContent.style.display = 'block';
                    let stcLinks = document.querySelectorAll('.spoiler-tab-controller li a');
                    stcLinks[0].classList.add('active');
                }else{
                    spContent.removeAttribute('style');
                }
            } 
            
        } 
    }
   
    /**
     * Код ниже отвечает за открытие конкретного спойлера на странице со спойлерами табами.
     * 1. Если переход на страницу был совершен по клику на ссылку, то по умолчанию откроется первый спойлер. 
     * 2. Если переход на страницу был совершен по клику на ссылку с якорем, то откроется спойлер, у которого id совпадает с якорем.
     * 3. Если не нужный спойлер не был найден, то сработает первый вариант. 
     */
    let anchorKey = localStorage.getItem('anchorKey');
    if(anchorKey){
        let sharpPosition = anchorKey.indexOf('#');
        let spolerId =  anchorKey.slice(sharpPosition, anchorKey.length);
        let spoler = document.querySelector(spolerId);
        // stc - spoiler-tab-controller 
        if(spoler){
            let spContent = spoler.querySelector('.spoiler__content');
            if(window.innerWidth > 990){
                spContent.style.display = 'block';
                let stcLink = document.querySelector(`.spoiler-tab-controller a[href="${spolerId}"]`); 
                stcLink.classList.add('active');
            } 
            localStorage.removeItem('anchorKey');
        }else{
            showDestopSpolerTab();
        }
        
    }else{
        showDestopSpolerTab();
    } 

    let spoilerTabControllerItems = document.querySelectorAll('.spoiler-tab-controller li a'); 
    if(spoilerTabControllerItems.length > 0){
        spoilerTabControllerItems.forEach(item=>{
            
            item.addEventListener('click', function(e){
                e.preventDefault(); 

                spoilerTabControllerItems.forEach(item=>{
                    item.classList.remove('active');
                });
                item.classList.add('active');  
                let spoilerControllers = document.querySelectorAll('.spoiler__controller');
                if(spoilerControllers.length > 0){
                    spoilerControllers.forEach(item=>{
                        item.classList.remove('active');
                    });
                }
                let spoler = document.querySelector(this.getAttribute('href'));
                if(spoler){
                    let spoilerController = spoler.querySelector('.spoiler__controller');
                    spoilerController.classList.add('active');
                    let spolerContent = spoler.querySelector('.spoiler__content');
                    let allSpolerContents = document.querySelectorAll('.spoiler__content');
                    allSpolerContents.forEach(item=>{
                        item.removeAttribute('style'); 
                    });
                    spolerContent.style.display = 'block';
                }
                
            });
        });
        // let idSpoler = spoilerTabControllerItem. 
    }
 

    let mainMenuAnchor = document.querySelectorAll('.main-menu li ul a, .blurred-link');
    if(mainMenuAnchor.length > 0){
        mainMenuAnchor.forEach(item=>{
            item.addEventListener('click', function(){
                localStorage.setItem('anchorKey', this.getAttribute('href'))
            });
        });
    }

    function initMap() {
        var myMap = new ymaps.Map("map", {
            center: [55.875965, 37.588108],
            zoom: 16
        });
    
        myMap.controls.add('zoomControl', {
            size: "large"
        });
    
        myPlacemark1 = new ymaps.Placemark([55.875965, 37.588108], {
            // Свойства. 
            hintContent: '<div class="map-hint caption-color h4">Общество с ограниченной ответственностью «Центр Строительных Технологий и Экспертиз»</div>',
            balloonContent: '<div class="map-hint"><span class="caption-color">Московский офис:</span> <br>Алтуфьевское шоссе д 48 корп. 1 офис 910</div>',
        }, {
            iconImageHref: '/local/templates/cstie/img/map-icon.svg',
            // Размеры метки.
            iconImageSize: [44, 44],
            iconImageOffset: [-22, -22]
        });
    
        myMap.geoObjects
            .add(myPlacemark1);
    }
    if(document.querySelector('#map')){
        ymaps.ready(initMap); 
    }
    
    
    window.addEventListener('resize', ()=>{ 
        setHeighHeaderTextBox();
        showDestopSpolerTab()
    });

//     double-slider--display
// double-slider--controller
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 8,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });

});
