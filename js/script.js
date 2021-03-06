  gsap.registerPlugin(ScrollTrigger);

  function init() {
    gsap.from('.layout-hero', {
      backgroundColor: '#fff', 
      duration: 1.7,
      ease: 'none',
    });

    let headerContent = document.querySelector('.header-content');
    let nav = document.querySelector('.site-nav');
    let headerCue = document.querySelector('.header-cue');
    let playSection = document.querySelector('#play');
    let playContentTiles = document.querySelectorAll('#play-img-content .play-tile');
    let navHeight = nav.scrollHeight;
  
    // random population of play info content tiles:
    playContentTiles.forEach(
      (item) => (item.style.animationDelay = `${Math.random() * 1 + 0.25}s`)
    )
  
    function inViewPort(el) {
      let rect = el.getBoundingClientRect()
      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
        (rect.top >= 0 && rect.bottom <= window.innerHeight)
      )
    }

    /* 
    ACTIVE TYPING HEADER:
    [x] separate header content to insert typewriter cursor
    [x] create typeHeader function to manipulate DOM
    [x] recursively call function to animate title typing
    */

    // function typeHeader() {
    //   const text = "True and Unquestionable";
    //   let idx = 0;
    //   let letters = "";

    //   (function type() {
    //     if(idx < text.length)  {
    //       letters = text.slice(0, ++idx); // one char at a time
    //       // console.log('type block hit!', idx+1);
    //       document.querySelector('.typing').textContent = letters;
    //     }
    //     setTimeout(type, 280);
    //   }());
    // }
    // // recursive call to keep animating
    // window.requestAnimationFrame(typeHeader);

    // alternative fade-in for 'True and Unquestionable'
    gsap.from('#fade-in', {
      autoAlpha: 0,
      duration: 3,
      opacity: 0,
      ease: 'linear',
    }, 2.5);

    let crest = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: '#jsp',
        start: 'bottom 65%',
        end: '+=100%',
        // markers: true,
        scrub: true,
      }
    });
    crest
    .to('.layout-hero', {
      duration: '100%',
      delay: 0,
      visibility: 'hidden',
      ease: 'linear',
    });

    function moveHeader() {
      let top = window.pageYOffset
      let mainOnTop = playSection.getBoundingClientRect().top - navHeight
  
      mainOnTop < 0
        ? nav.classList.add('in-body')
        : nav.classList.remove('in-body')
  
      let currentCuePosition = headerContent.getBoundingClientRect().top
  
      currentCuePosition < 0
        ? headerCue.classList.add('d-none')
        : headerCue.classList.remove('d-none')
  
      headerContent.style.transform = `translateY(-${top / 0.8}px)`
      headerContent.style.opacity =
        1 - Math.max(top / (window.innerHeight * 0.2), 0)
  
      // make section title appear if in viewport
      let playTitle = document.querySelector('.play-header');
        inViewPort(playTitle)
        ? playTitle.classList.add('appear')
        : playTitle.classList.remove('appear')

      // makes quotes appear randomly, only if they are in viewport
      playContentTiles.forEach((item) =>
        inViewPort(item)
          ? item.classList.add('appear')
          : item.classList.remove('appear')
      )

      // make audience appear if in viewport
      let audience = document.querySelector('#audience-img');
      inViewPort(audience)
      ? audience.classList.add('appear')
      : audience.classList.remove('appear')

      // make why headers appear if in viewport
      let whyHeader = document.querySelector('#why-header');
      inViewPort(whyHeader)
      ? whyHeader.classList.add('appear')
      : whyHeader.classList.remove('appear')
  
      window.requestAnimationFrame(moveHeader)
    }
  
    // recursive call to constantly update header
    window.requestAnimationFrame(moveHeader)
  
  /* intro section:
  [x] grab each element with js DOM
  [x] pin the section/background image for animation on scroll
  [x] animate in #character1 quote
  [x] animate in #character2 quote
  [x] make those two disappear .to tweens
  [x] ^ AS #truthy animates/fades in
  [x] unpin section to move onto the next play section
  [x] attempt simultaneous zoom effect on image (in timeline?)
  */

    // pin-zoom effect within ScrollTrigger:
    const introTL = gsap.timeline({
      defaults: {ease: 'none'},
      scrollTrigger: {
        trigger: '.intro',
        start: 'top top', //when top is at top of vp
        end: '+=5000',  // adds time for scroll scrub pacing
        scrub: 0.05,
        // markers: true,
        anticipatePin: 1,
        pin: '#intro',
      }
    });

    introTL
      .from('.intro', {duration: '100%' }, 0.5 )
      .from('#character1', {
        autoAlpha: 0,
        duration: 1,
        opacity: 0,
        ease: 'linear',
      }, '+=1')
      .to('#character1', {
        duration: 3,
        opacity: 0,
        ease: 'linear'
      }, '+=3')
      .from('#character2', {
        duration: 1,
        opacity: 0,
        ease: 'linear',
      }, '+=1')
      .to('#character2', {
        duration: 3,
        opacity: 0,
        ease: 'linear'
      }, '+=3')
      .from('#truthy', {
        duration: 2,
        opacity: 0,
        ease: 'power2.in',
      }, '+=1')
      .to('#truthy', {
        duration: 3,
        opacity: 0, 
        ease: 'linear',
      }, '+=3')
      .to('#intro .background', {
        scale: 2.5,
        duration: introTL.duration(),
        ease: 'power1.inOut'
      }, 0);
  
      // audience tween ease in:
      // const audienceTL = gsap.timeline({
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: '#audience-img',
      //     start: 'top middle',
      //     end: '+=100%',

      //   }
      // });
      // audienceTL
      // .from('#audience-img', {
      //   autoAlpha: 0,
      //   opacity: 0,
      //   duration: 1.25,
      //   ease: 'power2.in', 
      //   // markers: true,
      // });

      // reasons why Tweens:
      const whyTL = gsap.timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: '#why',
          start: 'top 30%', //when top is at middle of vp
          end: '+=100%',  // 'bottom bottom'
          // markers: true,
          anticipatePin: 1,
        }
      });
      whyTL
      .from('#why1', {
        autoAlpha: 0,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.in'
      })
      .from('#why2', {
        autoAlpha: 0,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.in'

      })
      .from('#why3', {
        autoAlpha: 0,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.in'
      });

  } // call init when page loads

  window.addEventListener('load', () => {
    init();
  });
  