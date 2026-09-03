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
});
