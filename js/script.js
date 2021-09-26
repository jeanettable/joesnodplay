$(function () {
  gsap.registerPlugin(ScrollTrigger);

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
      (item) => (item.style.animationDelay = `${Math.random() * 1 + 0.4}s`)
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

    function typeHeader() {
      const text = "True & Unquestionable";
      let idx = 0;
      let letters = "";

      (function type() {
        if(idx < text.length)  {
          letters = text.slice(0, ++idx); // one char at a time
          // console.log('type block hit!', idx+1);
          document.querySelector('.typing').textContent = letters;
        }
        setTimeout(type, 280);
      }());
    }
    // recursive call to keep animating
    window.requestAnimationFrame(typeHeader);


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
  [ ] pin the section/background image for animation on scroll
  [ ] animate in #character1 quote
  [ ] animate in #character2 quote
  [ ] make those two disappear .to tweens
  [ ] ^ AS #truthy animates/fades in
  [ ] unpin section to move onto the next play section
  */

  // GOING TO BE REPLACED BY SCROLLTRIGGER?
    // let controller = new ScrollMagic.Controller()
    // let char1TextTween = gsap.from('#character1', {
    //   // y: 400,
    //   opacity: 0,
    // })
    // let char2TextTween = gsap.from('#character2', {
    //   // y: 400,
    //   opacity: 0,
    // })
    // let truthTextTween = gsap.from('#truthy', {
    //   opacity: 5,
    // })

    // parallax effect within ScrollTrigger:

    let introTimeline = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: '#intro',
        start: 'top bottom',
        pin: true,
        scrub: true,
        markers: true,
      },
    });
    
    introTimeline
    .from('#character1', {
      autoAlpha: 0,
      duration: 1,
      opacity: 0,
      ease: 'linear',
    })
    .from('#character2', {
      duration: 1.5,
      opacity: 0,
      ease: 'linear',
    })
    .to('#character1', {
      duration: 1,
      opacity: 0,
      ease: 'linear'
    })
    .to('#character2', {
      duration: 1,
      opacity: 0,
      ease: 'linear'
    })
    .from('#truthy', {
      duration: 3,
      opacity: 0,
      ease: 'linear',
    });

    console.log('*** ', introTimeline.scrollTrigger);


    // ALL USING SCROLLMAGIC:
    // new ScrollMagic.Scene({
    //   triggerElement: '#intro',
    //   duration: '100%',
    //   triggerHook: 0,
    // })
    //   .setPin('#intro')
    //   .setTween(introTimeline)
    //   .addTo(controller)
  
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

  }) // when page loads
  