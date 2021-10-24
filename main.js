$(document).ready(function(){
    $('#menu-bar').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function(){
        $('#menu-bar').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        
        // scroll spy
        $('section').each(function(){
            let top = $(window).scrollTop();
            let offset = $(this).offset().top -200;
            let height = $(this).height();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            };
        });
    });

    $('.menu .list .btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        let src = $(this).attr('data-src');
        $('#menu-img').attr('src', src);
    });

    $(".list .btn").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(".info").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

});





//////////////////////////////// Scrool Up Button JS
var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;

function handleScroll() {
// Do something on scroll
var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
if (rootElement.scrollTop / scrollTotal > 0.1) {
    // Show button
    scrollToTopBtn.classList.add("showBtn");
} else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
}
}

function scrollToTop() {
// Scroll to top logic
rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
});
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

////////////////////////////// Scrool Up Button JS End



// Carousel JS /////////////////////////

const carousel = document.querySelector('.carousel')
const slider = carousel.querySelector('.carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (carousel, initSlides) => {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel_nav')

  initSlides.forEach((slide, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.classList.add('carousel_dot')
    dot.setAttribute('aria-label', `Slide number ${index + 1}`)
    slide.dataset.position = index
    slide.classList.contains('is-selected') && dot.classList.add('is-selected')
    dotsContainer.appendChild(dot)
  })

  carousel.appendChild(dotsContainer)

  return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
  const currDot = dotNav.querySelector('.is-selected')
  const targetDot = slide.dataset.position

  currDot.classList.remove('is-selected')
  dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
  arrow.addEventListener('click', () => {
    slides = [...slider.children]
    const currSlide = slider.querySelector('.is-selected')
    currSlide.classList.remove('is-selected')
    let targetSlide

    if (arrow.classList.contains('jsPrev')) {
      targetSlide = currSlide.previousElementSibling
      slider.prepend(slides[slides.length - 1])
    }

    if (arrow.classList.contains('jsNext')) {
      targetSlide = currSlide.nextElementSibling
      slider.append(slides[0])
    }

    targetSlide.classList.add('is-selected')
    updateDot(targetSlide)
  })
}

const buttons = carousel.querySelectorAll('.carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
  const dotIndex = dots.indexOf(dot)
  const currSlidePos = slider.querySelector('.is-selected').dataset.position
  const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

  if (currSlidePos < targetSlidePos) {
    const count = targetSlidePos - currSlidePos
    for (let i = count; i > 0; i--) nextBtn.click()
  }

  if (currSlidePos > targetSlidePos) {
    const count = currSlidePos - targetSlidePos
    for (let i = count; i > 0; i--) prevBtn.click()
  }
}

const dotNav = createDots(carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
  const dot = e.target.closest('button')
  if (!dot) return
  handleDotClick(dot)
})

// Auto sliding
const slideTiming = 5000
let interval
const slideInterval = () => interval = setInterval(() => nextBtn.click(), slideTiming)

carousel.addEventListener('mouseover', () => clearInterval(interval))
carousel.addEventListener('mouseleave', slideInterval)
slideInterval()


// Carousel JS End