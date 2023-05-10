window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

/* loading */
$(window).on("load", function() {
  setTimeout(function() {
    $(".loader-wrapper").fadeOut("slow").fadeOut("swing");
    $("body").removeClass("preload");
  }, 100);
});

/* side bar */
$(window).load(function(){
  var height = window.innerHeight,
  x= 0, y= height,
  curveX = 10,
  curveY = 0,
  targetX = 0,
  xitteration = 0,
  yitteration = 0,
  menuExpanded = false;
  
  blob = $('#blob'),
  blobPath = $('#blob-path'),

  hamburger = $('.hamburger');

  $(this).on('mousemove', function(e){
    x = e.screenX;
    
    y = e.screenY - 100;
  });

  $('.hamburger, .menu-inner').on('mouseenter', function(){
    $(this).parent().addClass('expanded');
    menuExpanded = true;
  });

  $('.menu-inner').on('mouseleave', function(){
    menuExpanded = false;
    $(this).parent().removeClass('expanded');
  });

  function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
    return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
  }

  var hoverZone = 150;
  var expandAmount = 20;
  
  function svgCurve() {
    if ((curveX > x-1) && (curveX < x+1)) {
      xitteration = 0;
    } else {
      if (menuExpanded) {
        targetX = 0;
      } else {
        xitteration = 0;
        if (x > hoverZone) {
          targetX = 0;
        } else {
          targetX = -(((60+expandAmount)/100)*(x-hoverZone));
        }     
      }
      xitteration++;
    }

    if ((curveY > y-1) && (curveY < y+1)) {
      yitteration = 0;
    } else {
      yitteration = 0;
      yitteration++;  
    }

    curveX = easeOutExpo(xitteration, curveX, targetX-curveX, 100);
    curveY = easeOutExpo(yitteration, curveY, y-curveY, 100);

    var anchorDistance = 200;
    var curviness = anchorDistance - 40;

    var newCurve2 = "M60,"+height+"H0V0h60v"+(curveY-anchorDistance)+"c0,"+curviness+","+curveX+","+curviness+","+curveX+","+anchorDistance+"S60,"+(curveY)+",60,"+(curveY+(anchorDistance*2))+"V"+height+"z";

    blobPath.attr('d', newCurve2);

    blob.width(curveX+60);

    hamburger.css('transform', 'translate('+curveX+'px, '+curveY+'px)');
    
    $('h2').css('transform', 'translateY('+curveY+'px)');
    window.requestAnimationFrame(svgCurve);
  }

  window.requestAnimationFrame(svgCurve);
  
});

/* header */
const txts=document.querySelector(".animate-text").children,
     txtsLen=txts.length;
let index=0;
const textInTimer=3000,
      textOutTimer=2800;

function animateText() {
  for(let i=0; i<txtsLen; i++){
    txts[i].classList.remove("text-in","text-out");  
  }
  txts[index].classList.add("text-in");

  setTimeout(function(){
      txts[index].classList.add("text-out");              
  },textOutTimer)

  setTimeout(function(){

    if(index == txtsLen-1){
        index=0;
      }
     else{
         index++;
       }
      animateText();
  },textInTimer); 
}

window.onload=animateText;

/* animate on scroll */
const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry) =>{
    console.log(entry)
    if (entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else {
      entry.target.classList.remove('show');
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* parallax */
let text = document.getElementById('text')

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  
  if (value < 1000) {
    text.style.marginTop = value * 1.1 + 'px';
  } else {
    text.style.marginTop = '1100px'; // set to a fixed value after 1000 pixels
  }
});


/* science concepts */
let filter_btn = document.querySelectorAll('.filter-btn');
let tab_items = document.querySelectorAll('.tab-item');

for (let i = 0; i < filter_btn.length; i++) {
  filter_btn[i].addEventListener('click', function () {
    for (let j = 0; j < filter_btn.length; j++) {
      filter_btn[j].classList.remove('active');
    }
    let select_tab = filter_btn[i].getAttribute('data-tab');
    filter_btn[i].classList.add('active');
    for (let t = 0; t < tab_items.length; t++) {
      document.querySelector('.tab-filter-item-container').style.height =
        tab_items[t].scrollHeight + 'px';
      if (tab_items[t].classList.contains(select_tab)) {
        tab_items[t].classList.add('select_tab');
      } else {
        tab_items[t].classList.remove('select_tab');
      }
    }
  });
}

for (let th = 0; th < tab_items.length; th++) {
  document.querySelector('.tab-filter-item-container').style.height =
    tab_items[th].scrollHeight + 'px';
}



/* swiper */
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
