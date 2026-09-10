document.addEventListener('DOMContentLoaded',()=>{
  const button=document.querySelector('.menu-button'),menu=document.querySelector('#menu');
  const close=()=>{menu.classList.remove('open');button.setAttribute('aria-expanded','false');document.body.style.overflow=''};
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';if(open)close();else{menu.classList.add('open');button.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'}});
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
  const links=[...menu.querySelectorAll('a')];
  const active=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}),{rootMargin:'-35% 0px -58% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>active.observe(section));
  document.querySelector('#year').textContent=new Date().getFullYear();
  const bodyQuote=document.querySelector('.chapter-quote-corps');
  const lakeDiptych=document.querySelector('.diptych');
  if(bodyQuote&&lakeDiptych)lakeDiptych.before(bodyQuote);
  const sharingTrack=document.querySelector('.sharing-track');
  if(sharingTrack){
    const cards=[...sharingTrack.querySelectorAll('.sharing-card')];
    const dotsBox=document.querySelector('.sharing-dots');
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current=0,autoTimer=null,scrollTimer=null,paused=false;
    const dots=cards.map((card,index)=>{
      const dot=document.createElement('button');
      dot.type='button';
      dot.className='sharing-dot';
      dot.setAttribute('aria-label',`Afficher la carte ${index+1}`);
      dotsBox.appendChild(dot);
      return dot;
    });
    const setCurrent=index=>{current=index;dots.forEach((dot,i)=>dot.classList.toggle('active',i===current))};
    const goTo=index=>{
      const target=(index+cards.length)%cards.length;
      sharingTrack.scrollTo({left:cards[target].offsetLeft-sharingTrack.offsetLeft,behavior:reducedMotion?'auto':'smooth'});
      setCurrent(target);
    };
    dots.forEach((dot,index)=>dot.addEventListener('click',()=>goTo(index)));
    document.querySelector('.sharing-prev').addEventListener('click',()=>goTo(current-1));
    document.querySelector('.sharing-next').addEventListener('click',()=>goTo(current+1));
    const startAuto=()=>{if(reducedMotion||paused)return;clearInterval(autoTimer);autoTimer=setInterval(()=>goTo(current+1),5500)};
    const stopAuto=()=>clearInterval(autoTimer);
    const pause=()=>{paused=true;stopAuto()};
    const resume=()=>{paused=false;startAuto()};
    sharingTrack.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{const nearest=cards.reduce((best,card,index)=>Math.abs(card.offsetLeft-sharingTrack.scrollLeft)<best.distance?{index,distance:Math.abs(card.offsetLeft-sharingTrack.scrollLeft)}:best,{index:0,distance:Infinity});setCurrent(nearest.index)},100)},{passive:true});
    const carousel=document.querySelector('.sharing-carousel');
    carousel.addEventListener('mouseenter',pause);
    carousel.addEventListener('mouseleave',resume);
    carousel.addEventListener('focusin',pause);
    carousel.addEventListener('focusout',event=>{if(!carousel.contains(event.relatedTarget))resume()});
    sharingTrack.addEventListener('pointerdown',pause,{passive:true});
    sharingTrack.addEventListener('pointerup',()=>{paused=false;startAuto()},{passive:true});
    setCurrent(0);
    startAuto();
  }
  const overlay=document.querySelector('.narrative-overlay');
  const overlayTitle=overlay.querySelector('#narrative-title');
  const overlayStory=overlay.querySelector('.narrative-story');
  const overlayBackground=overlay.querySelector('.narrative-background');
  const overlayClose=overlay.querySelector('.narrative-close');
  let lastTrigger=null;
  const closeNarrative=()=>{
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(lastTrigger)lastTrigger.focus();
  };
  document.querySelectorAll('.enter-button').forEach(trigger=>trigger.addEventListener('click',()=>{
    lastTrigger=trigger;
    overlayTitle.textContent=trigger.dataset.title;
    overlayStory.textContent=trigger.dataset.story;
    overlayBackground.style.backgroundImage=`url("${trigger.dataset.image}")`;
    const detailPositions={
      'images/portfolio/la-decheance.webp':'center 38%',
      'images/portfolio/totem-panthere.webp':'58% 34%',
      'images/portfolio/totem-chat.webp':'center 32%',
      'images/portfolio/pla-kat.webp':'center 22%'
    };
    overlayBackground.style.backgroundPosition=detailPositions[trigger.dataset.image]||'center';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    overlayClose.focus();
  }));
  overlayClose.addEventListener('click',closeNarrative);
  overlay.addEventListener('click',event=>{if(event.target===overlay||event.target.classList.contains('narrative-veil'))closeNarrative()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('open'))closeNarrative()});
});
