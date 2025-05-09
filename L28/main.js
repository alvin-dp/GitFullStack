
const config = {
  // Array of images
  imagesSrc : ['https://picsum.photos/id/123/200/300',
  'https://picsum.photos/id/236/200/300',
  'https://picsum.photos/id/228/200/300',
  'https://picsum.photos/id/268/200/300',
  'https://picsum.photos/id/258/200/300',    
  'https://picsum.photos/id/233/200/300',
  'https://picsum.photos/id/238/200/300'],
  // images width
  imgSize : 200,
  // timeout of slide changes in mSec
  milSecTimeout : 2500
}

class Slider{
  constructor(configObj,targetContainer){
    this.imagesSrc  = configObj.imagesSrc;
    this.targetContainer  = targetContainer;
    this.oneimgSize  = configObj.imgSize;
    this.autoplayState = true;
    this.milSecPause  = configObj.milSecTimeout;
    this.imgsElementsArray = new Array;
    this.indicatorsElementsArray = new Array;
    this.prevSlide = 0;
    this.currentSlide = 0;
    this.SlidesCount = this.imagesSrc.length;    
    this.touchStartX = 0;
    this.touchEndX = 0;        
  }
  createGlobalCaruselContainer(){
      const element = document.createElement('div');
      element.classList.toggle('global-Carusel-container');
      if (this.targetContainer === undefined){
        document.body.appendChild(element);
      }
      else{
        this.targetContainer.appendChild(element); 
      }
        this.globalSliderContainer  = element;
  }
  createMainContainer(){
      const main = document.createElement('div');
      main.classList.toggle('main-container');
      this.globalSliderContainer.appendChild(main);
      this.MainContainer = main;
  } 
  createImgElement (src){
      const imgElement= document.createElement('img');
      imgElement.src  = src;
      return imgElement;
  }   
  createButtonContainer(){
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.toggle('buttons-container');
      this.globalSliderContainer.appendChild(buttonContainer);
      this.buttonContainer  = buttonContainer;
  } 

  createAndRenderImages() {
      const listOfImagesElements  = this.imagesSrc.map(this.createImgElement);
      listOfImagesElements.forEach((imgElement) => {this.MainContainer.appendChild(imgElement)
      this.imgsElementsArray.push(imgElement);
    });
  }  

  getNexSlide (directionForward = true){
      this.prevSlide = this.currentSlide;
      if (directionForward){
        ++this.currentSlide;
        if (this.currentSlide === this.SlidesCount){
          this.currentSlide = 0;
        }
      }else{
        --this.currentSlide;
        if (this.currentSlide<0){
          this.currentSlide = this.SlidesCount-1;
        }
      }
  }
  handleSlideChange(){
      this.imgsElementsArray[0].style['margin-left'] = ` ${this.currentSlide * -this.oneimgSize}px`;
      this.indicatorsElementsArray[this.prevSlide].classList.toggle('slide-indicator-active');  
      this.indicatorsElementsArray[this.currentSlide].classList.toggle('slide-indicator-active');  
  } 

  slideEventChanger(directionForward = true){
    this.getNexSlide(directionForward);
    this.handleSlideChange();
  }

  createPlayPauseButton (){
      const playButton = document.createElement('button'); 
      playButton.innerText  = 'Pause';
      this.buttonContainer.appendChild(playButton);
      this.currentPlayState = playButton.innerText;
      playButton.addEventListener('click',()=>{
        playButton.innerText  =  this.autoplayState ? 'Play': 'Pause'
        this.autoplayState = !this.autoplayState;
        this.currentPlayState = playButton.innerText;
      })
      return playButton;
  }  
  createCarouselButtons(){
      const leftButton  = document.createElement('button');
      const rightButton  = document.createElement('button');
      leftButton.innerText  = 'Prev'
      rightButton.innerText  = 'Next'
      rightButton.addEventListener('click',()=>this.slideEventChanger())
      leftButton.addEventListener('click',()=> this.slideEventChanger(false))  

      this.buttonContainer.appendChild(leftButton);
      this.createPlayPauseButton();
      this.buttonContainer.appendChild(rightButton);
  } 
  
  createSlideIndicators(){
      const conteiner = document.createElement('div');
      conteiner.classList.toggle('slide-indicator-container');  
      for(let i = 0;i<this.SlidesCount;i++){
        let indicator = document.createElement('div');
        indicator.classList.toggle('slide-indicator');
        if (i===0) {
          indicator.classList.toggle('slide-indicator-active')
          }
        conteiner.appendChild(indicator);
        this.indicatorsElementsArray.push(indicator);
      }
      this.globalSliderContainer.appendChild(conteiner); 
  }
  
  addAutoSlideChanger(){
      setInterval(()=>{
        if (this.autoplayState) {
            this.slideEventChanger();
        } 
        }, this.milSecPause)
  }
  addKeyEvents(element){
      element.addEventListener('keydown',(event)=>{
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this.slideEventChanger(false)
        };
        if (event.key === 'ArrowRight') {
          event.preventDefault();      
          this.slideEventChanger()
        };
      })
  }  
  checkDiraction(){
        if (this.touchStartX > this.touchEndX) this.slideEventChanger(false);
        if (this.touchStartX < this.touchEndX) this.slideEventChanger();
  } 

  addSwipes(element){
      element.addEventListener('touchstart',event=>{
        event.preventDefault();
        this.touchStartX = event.changedTouches[0].screenX;
      })
      element.addEventListener('touchend',event=>{
        this.touchEndX = event.changedTouches[0].screenX;
        this.checkDiraction();
      })  

      element.addEventListener('mousedown',event=>{
        event.preventDefault();
        this.touchStartX = event.clientX;
      })
      element.addEventListener('mouseup',event=>{
        this.touchEndX = event.clientX;
        this.checkDiraction();
      })      
  }  

  mouseOnImgStop(){
    this.MainContainer.addEventListener("mouseenter", (e) => {
      if (this.currentPlayState === 'Pause'&& this.autoplayState) this.autoplayState = false;
    });

    this.MainContainer.addEventListener("mouseleave", (e) => {
      if (this.currentPlayState === 'Pause'&& this.autoplayState === false) this.autoplayState = true;
    });    
  }

  init(){
      this.createGlobalCaruselContainer();
      this.createMainContainer();
      this.createAndRenderImages();
      this.createSlideIndicators();
      this.createButtonContainer();
      this.createCarouselButtons();
      this.addAutoSlideChanger();
      this.mouseOnImgStop();
      this.addKeyEvents(document);
      this.addSwipes(document); 
  }  
}

new Slider(config).init();

//const body  = document.getElementsByTagName('body')[0]; 


// main slide container

// button container

// default img element creator

// img render

// Next index of slider image 

// slide changer

// Play/pause Button

// Buttons 

// indicators creator

// auto changer


// Keys

// Swipes

