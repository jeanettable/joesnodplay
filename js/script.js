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

    // alternative fade-in
    gsap.from('#fade-in', {
      autoAlpha: 0,
      duration: 3,
      opacity: 0,
      ease: 'linear',
    }, 2.5);

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
  
      headerContent.style.transform = `translateY(-${top / 1.5}px)`
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
  [ ] attempt simultaneous zoom effect on image (in timeline?)
  */

    // const imgZoomOut = 
    // TweenMax.fromTo('.intro', '100%', 
    // { scale: 5 }, 
    // { scale: 1,
    //   ease: ExpoScaleEase.config(5, 1, Power2.easeInOut),
    // });

    // parallax effect within ScrollTrigger:
    const introTL = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: '.intro',
        start: 'top top', //when top is at middle of vp
        end: '+=100%',  // 'bottom bottom'
        scrub: 0.05,
        markers: true,
        anticipatePin: 1,
        pin: '#intro',
        // pinSpacing: false,
      }
    });

    introTL
      .from('.intro', {duration: '100%' }, 0.5 )
      .from('#character1', {
        autoAlpha: 0,
        duration: 3,
        opacity: 0,
        ease: 'linear',
      }, 2)
      .from('#character2', {
        duration: 3,
        delay: 3,
        opacity: 0,
        ease: 'linear',
      }, 4)
      .to('#character1', {
        duration: 2,
        delay: 6,
        opacity: 0,
        ease: 'linear'
      })
      .to('#character2', {
        duration: 2,
        delay: 7,
        opacity: 0,
        ease: 'linear'
      })
      .from('#truthy', {
        duration: 3,
        delay: 8,
        opacity: 0,
        ease: 'linear',
      })
      .to('#truthy', {
        duration: 4,
        delay: 10,
        opacity: 0, 
        ease: 'linear',
      });

    /*
    [x] animate in the play section title
    [x] speed up tile appearances?
    */

    // ALL USING SCROLLMAGIC:  
    // Parachute
    // let parachuteTween = new TimelineMax()
  
    // parachuteTween
    //   .from('#parachute', {
    //     scale: 0.5,
    //     opacity: 0.25,
    //     rotation: -40,
    //     x: '100%',
    //     y: '-200%',
    //   })
    //   .to('#parachute', {
    //     x: '30%',
    //     y: '20%',
    //     rotation: -30,
    //   })
    //   .to('#parachute', {
    //     x: '-80%',
    //     y: '250%',
    //     rotation: 30,
    //   })
  
    // new ScrollMagic.Scene({
    //   triggerElement: '#friend',
    //   duration: '170%',
    //   triggerHook: 0,
    // })
    //   .setTween(parachuteTween)
    //   .addTo(controller)
  
      // reasons why Tweens:
      // const whyTL = gsap.timeline({
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: '#why',
      //     start: 'top top', //when top is at middle of vp
      //     end: '+=100%',  // 'bottom bottom'
      //     scrub: 0.05,
      //     markers: true,
      //     anticipatePin: 1,
      //     pin: '#intro',
      //     // pinSpacing: false,
      //   }
      // });
      // whyTL
      // .from('#types .col', {
      //   autoAlpha: 0,
      //   opacity: 0,
      //   duration: 1,
      //   stagger: 0.25,
      // });

    // let typesTween = new TimelineMax()
  
    // typesTween.from('#types .col', {
    //   scale: 0.5,
    //   opacity: 0,
    //   stagger: 0.25,
    // })
  
    // new ScrollMagic.Scene({
    //   triggerElement: '#types',
    //   triggerHook: 0,
    //   duration: 300,
    // })
    //   .setPin('#types')
    //   .setTween(typesTween)
    //   .addTo(controller)

  } // call init when page loads

  window.addEventListener('load', () => {
    init();
  });
  