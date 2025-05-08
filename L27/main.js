
const imagesSrc = ['https://picsum.photos/id/123/200/300',
  'https://picsum.photos/id/236/200/300',
  'https://picsum.photos/id/228/200/300',
  'https://picsum.photos/id/268/200/300',
  'https://picsum.photos/id/258/200/300',    
  'https://picsum.photos/id/233/200/300',
  'https://picsum.photos/id/238/200/300'
];
//const body  = document.getElementsByTagName('body')[0]; 
const oneimgSize  = 200;
let autoplayState = true;
const imgsElementsArray = new Array;
const indicatorsElementsArray = new Array;
let prevSlide = 0;
const SlidesCount = imagesSrc.length;

// GlobalCaruselContainer Creator 
function createGlobalCaruselContainer(targetElement){
  const element = document.createElement('div');
  element.classList.toggle('global-Carusel-container');
  if (targetElement === undefined){
    document.body.appendChild(element);
  }
  else{
    targetElement.appendChild(element); 
  }
  return element;
}

// main slide container
function createMainContainer(parentElement){
  const main = document.createElement('div');
  main.classList.toggle('main-container');
  parentElement.appendChild(main);
  return main;
}
// button container
function createButtonContainer(parrentElement){
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.toggle('buttons-container');
  parrentElement.appendChild(buttonContainer);
  return buttonContainer;
}
// default img element creator
function createImgElement (src){
  const imgElement= document.createElement('img');
  imgElement.src  = src;
  return imgElement;
}
// img render
function createAndRenderImages(imgsSrc, container) {
  const listOfImagesElements  = imgsSrc.map(createImgElement);
  listOfImagesElements.forEach((imgElement) => {container.appendChild(imgElement)
    imgsElementsArray.push(imgElement);
  });
}
// Next index of slider image 
function getNextPositionCreator(numberOfSlides) {
  let currentSlide  = 0;
  return function (directionForward = true){
    prevSlide = currentSlide;
    if (directionForward){
      ++currentSlide;
      if (currentSlide === numberOfSlides){
        currentSlide = 0;
      }
    }else{
      --currentSlide;
      if (currentSlide<0){
        currentSlide = numberOfSlides-1;
      }
    }
    return currentSlide;
  }
}
// slide changer
function handleSlideChange(nextSlidePosition){
  imgsElementsArray[0].style['margin-left'] = ` ${nextSlidePosition * -oneimgSize}px`;
  indicatorsElementsArray[prevSlide].classList.toggle('slide-indicator-active');  
  indicatorsElementsArray[nextSlidePosition].classList.toggle('slide-indicator-active');  
}

// Play/pause Button
function createPlayPauseButton (parrentElement){
  const playButton = document.createElement('button'); 
  playButton.innerText  = 'Pause';
  parrentElement.appendChild(playButton);
  
  playButton.addEventListener('click',()=>{
    playButton.innerText  =  autoplayState ? 'Play': 'Pause'
    autoplayState = !autoplayState;
  })
  return playButton;
}
// Buttons 
function createCarouselButtons(getNexSlide,parrentElement){
  const leftButton  = document.createElement('button');
  const rightButton  = document.createElement('button');
  leftButton.innerText  = 'Prev'
  rightButton.innerText  = 'Next'
  rightButton.addEventListener('click',()=>handleSlideChange(getNexSlide()))
  leftButton.addEventListener('click',()=> handleSlideChange(getNexSlide(false)))  

  parrentElement.appendChild(leftButton);
  createPlayPauseButton(parrentElement);
  parrentElement.appendChild(rightButton);
}
// indicators creator
function createSlideIndicators(length,targetContainer){
  const conteiner = document.createElement('div');
  conteiner.classList.toggle('slide-indicator-container');  
  for(let i = 0;i<length;i++){
    let indicator = document.createElement('div');
    indicator.classList.toggle('slide-indicator');
    if (i===0) {
      indicator.classList.toggle('slide-indicator-active')
      }
    conteiner.appendChild(indicator);
    indicatorsElementsArray.push(indicator);
  }
  targetContainer.appendChild(conteiner); 
}
// auto changer
function addAutoSlideChanger(milSec){
  setInterval(()=>{
    if (autoplayState) {
        handleSlideChange(getNexSlide())
    } 
    }, milSec)
}

// Keys
function addKeyEvents(element){
  element.addEventListener('keydown',(event)=>{
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleSlideChange(getNexSlide(false))
    };
    if (event.key === 'ArrowRight') {
      event.preventDefault();      
      handleSlideChange(getNexSlide())
    };
  })
}
// Swipes
function addSwipes(element){
  let touchStartX = 0;
  let touchEndX = 0;
  function checkDiraction(){
    if (touchStartX > touchEndX) handleSlideChange(getNexSlide(false));
    if (touchStartX < touchEndX) handleSlideChange(getNexSlide());
  }

  element.addEventListener('touchstart',event=>{
    event.preventDefault();
    touchStartX = event.changedTouches[0].screenX;
  })
  element.addEventListener('touchend',event=>{
    touchEndX = event.changedTouches[0].screenX;
    checkDiraction()
  })  

  element.addEventListener('mousedown',event=>{
    event.preventDefault();
    touchStartX = event.clientX;
  })
  element.addEventListener('mouseup',event=>{
    touchEndX = event.clientX;
    checkDiraction()
  })    
}

const globalContainer = createGlobalCaruselContainer();
const main = createMainContainer(globalContainer);

createAndRenderImages(imagesSrc,main);
createSlideIndicators(SlidesCount,globalContainer);

const buttonConteinerElement  = createButtonContainer(globalContainer);
const getNexSlide = getNextPositionCreator(SlidesCount);
createCarouselButtons(getNexSlide,buttonConteinerElement);

addAutoSlideChanger(2500);
addKeyEvents(document);
addSwipes(document);
