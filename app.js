'use strict';
(()=>{
 const screen=document.getElementById('screen'),dialog=document.getElementById('method-dialog');
 const answers={};let step=0,result=null,advancing=false,timer=null,selectedCoat='orange',returnFocus=null;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const links=ids=>ids.map(id=>{const s=CAT_DATA.sources[id];return `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>`;}).join('');
 const sprite=(index,label,atlas='cat-atlas.png')=>{
  const rows=atlas==='cat-atlas-extra.png'?3:4;
  const image=atlas==='cat-atlas-extra.png'?window.CAT_EXTRA_ATLAS||atlas:window.CAT_BASE_ATLAS||atlas;
  return `<span class="cat-portrait" role="img" aria-label="${esc(label)}" style="background-image:url('${image}');background-size:300% ${rows*100}%;background-position:${index%3*50}% ${Math.floor(index/3)*100/(rows-1)}%"></span>`;
 };
 function focusTitle(){screen.querySelector('h1,h2')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
 function cancelAdvance(){clearTimeout(timer);advancing=false;}
 function welcome(focus=false){
  cancelAdvance();result=null;
  screen.innerHTML=`<section class="paper welcome enter"><h1 tabindex="-1">Which cat<br>fits <em>your life?</em></h1><figure class="cat-hero"><img src="cat-hero.png" width="1536" height="1024" alt="Different cats relax and play in a sunny room beside a safe outdoor catio."><span class="time-sticker">MEOW<br>MEETS<br>YOU</span></figure><button class="primary" id="start-button" type="button">Find my cat <span aria-hidden="true">→</span></button></section>`;
  document.getElementById('start-button').addEventListener('click',()=>{step=0;question();});if(focus)focusTitle();
 }
 function question(){
  cancelAdvance();result=null;
  const q=CAT_DATA.questions[step],total=CAT_DATA.questions.length;
  screen.innerHTML=`<section class="paper question-card enter" aria-labelledby="question-title"><div class="quiz-top"><button class="back-button" id="back-button" type="button" aria-label="${step?'Previous question':'Back to introduction'}">←</button><span class="step-label">${String(step+1).padStart(2,'0')} / ${total}</span></div><div class="progress" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${step}">${CAT_DATA.questions.map((_,i)=>`<span aria-hidden="true" class="${i<step?'done':''}"></span>`).join('')}</div><p class="chapter">${esc(q.stage)}</p><h2 class="question-heading" id="question-title" tabindex="-1">${esc(q.title)}</h2>${q.checklist?`<ul class="ready-list">${q.checklist.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}<div class="options" role="group" aria-labelledby="question-title">${q.options.map((o,i)=>`<button class="option" type="button" data-value="${o.value}" aria-pressed="${answers[q.id]===o.value}"><span class="option-key" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${esc(o.label)}</span></button>`).join('')}</div><div class="question-bottom">${answers[q.id]?'<button class="text-button" id="keep-button" type="button">Keep this answer →</button>':''}</div></section>`;
  document.getElementById('back-button').addEventListener('click',()=>{if(step){step--;question();}else welcome(true);});
  screen.querySelectorAll('.option').forEach(button=>button.addEventListener('click',()=>select(q,button.dataset.value)));
  document.getElementById('keep-button')?.addEventListener('click',()=>select(q,answers[q.id]));focusTitle();
 }
 function select(q,value){
  if(advancing)return;advancing=true;answers[q.id]=value;
  screen.querySelectorAll('.option').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===value)));
  timer=setTimeout(()=>{advancing=false;if(step===CAT_DATA.questions.length-1){complete();return;}step++;question();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:150);
 }
 function coatPicker(){
  return `<div class="coat-picker"><p>Same vibe. Different coat.</p><div class="coat-options" role="group" aria-label="Illustration coat">${CAT_DATA.coats.map(c=>`<button type="button" class="coat-chip" data-coat="${c.id}" aria-pressed="${c.id===selectedCoat}">${esc(c.label)}</button>`).join('')}</div></div>`;
 }
 function resultCard(){
  const cat=result.cat,future=result.status==='future',canChangeCoat=cat.type==='domestic'&&cat.coat==='simple';
  const coat=CAT_DATA.coats.find(c=>c.id===selectedCoat)||CAT_DATA.coats[0];
  const portrait=canChangeCoat?coat.sprite:cat.sprite,atlas=canChangeCoat?'cat-atlas.png':cat.atlas||'cat-atlas.png';
  const label=canChangeCoat?`Illustrated ${coat.label} domestic cat; coat does not predict personality.`:`Illustration of ${cat.name}.`;
  const outdoorLabel={indoor:'INDOOR',controlled:'CATIO / LEASH',roaming:'OUTDOOR PLAN'}[result.outdoors];
  screen.innerHTML=`<section class="paper result-card result-enter" style="--card-accent:${cat.color}" aria-labelledby="result-title"><div class="result-topline"><span>${future?'FOR ANOTHER CHAPTER':'A CAT TO GET TO KNOW'}</span><span class="outdoor-tag">${outdoorLabel}</span></div><button class="cat-stage" id="cat-stage" type="button" aria-label="Make the illustrated cat jump" data-pace="${cat.traits.play===2?'zippy':'gentle'}"><span class="stage-halo" aria-hidden="true"></span><span class="stage-star stage-star-a" aria-hidden="true">✦</span><span class="stage-star stage-star-b" aria-hidden="true">✦</span><span class="stage-star stage-star-c" aria-hidden="true">✳</span>${sprite(portrait,label,atlas)}<span class="stage-shadow" aria-hidden="true"></span><span class="stage-play" aria-hidden="true">✦</span></button><h2 class="result-title" id="result-title" tabindex="-1">${esc(cat.title)}</h2><p class="cat-name">${esc(cat.name)}</p><p class="scene-label">PICTURE THIS</p><p class="result-scene">${esc(cat.scene)}</p>${canChangeCoat?coatPicker():''}</section><div class="result-below"><button class="text-button" id="review-button" type="button">Edit answers</button><button class="text-button" id="restart-button" type="button">Play again</button></div>`;
  document.getElementById('cat-stage').addEventListener('click',e=>{const stage=e.currentTarget;stage.classList.remove('is-pouncing');void stage.offsetWidth;stage.classList.add('is-pouncing');window.setTimeout(()=>stage.classList.remove('is-pouncing'),850);});
  document.getElementById('review-button').addEventListener('click',()=>{step=0;question();});
  document.getElementById('restart-button').addEventListener('click',()=>{for(const k of Object.keys(answers))delete answers[k];selectedCoat='orange';step=0;welcome(true);});
  screen.querySelectorAll('[data-coat]').forEach(b=>b.addEventListener('click',()=>{selectedCoat=b.dataset.coat;const next=CAT_DATA.coats.find(c=>c.id===selectedCoat);screen.querySelector('.cat-portrait').outerHTML=sprite(next.sprite,`Illustrated ${next.label} domestic cat; coat does not predict personality.`);screen.querySelectorAll('[data-coat]').forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.coat===selectedCoat)));}));
  focusTitle();
 }
 function complete(){cancelAdvance();result=CAT_ENGINE.match(answers);resultCard();return{status:result.status,cat:result.cat.name,archetype:result.cat.title,outdoor:answers.outdoors};}
 function openDialog(title,content){
  returnFocus=document.activeElement;document.getElementById('method-title').textContent=title;
  document.getElementById('method-content').innerHTML=content;dialog.showModal();dialog.scrollTop=0;
 }
 document.getElementById('method-button').addEventListener('click',()=>{
  const cat=result?.cat;
  const personal=cat?`<h3>${esc(cat.name)}: the real-life part</h3><p>${esc(cat.care)} ${esc(cat.detail)}</p><div class="source-links">${links(cat.sources)}</div>`:'';
  openDialog('Research',`${personal}<h3>Meet the individual</h3><p>Studies find behavior differences between cats and some breed tendencies. The label cannot predict one cat’s personality. Adult cats may have a more observable routine.</p><div class="source-links">${links(['traits','breeds','adult','household'])}</div><h3>Inside, outside, and in between</h3><p>Indoor cats need places to hide, climb, scratch and play. Controlled outdoor time can add stimulation. Free roaming adds risks to cats and wildlife; some formerly outdoor-only cats need a different welfare plan.</p><div class="source-links">${links(['outdoor','indoor','pillars','intercat'])}</div><h3>Color and sex</h3><p>Orange, tuxedo, tabby and calico are looks, not personality types. Studies of color and behavior have mixed or small effects; a later study found no significant personality effect from coat color or cat sex. Calicos are usually female because of coat genetics, with rare male exceptions.</p><div class="source-links">${links(['colour','colourStudy','demographic','genetics','pattern'])}</div><h3>One health note</h3><p>No cat breed is truly hypoallergenic. Check allergies and discuss individual health needs before bringing a cat home.</p><div class="source-links">${links(['allergy'])}</div>`);
 });
 document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
 welcome();
 if(document.modelContext?.registerTool){
  const properties=Object.fromEntries(CAT_DATA.questions.map(q=>[q.id,{type:'string',enum:q.options.map(o=>o.value),description:q.title+' '+q.options.map(o=>o.value+': '+o.label).join('; ')}]));
  const lifetime=new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'complete_cat_lifestyle_quiz',title:'Find a cat to get to know',description:'Show a cat profile from nine playful classroom choices. Coat color and sex do not determine personality. Answers are kept on this page.',inputSchema:{type:'object',properties,required:CAT_DATA.questions.map(q=>q.id),additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){CAT_ENGINE.validate(input);for(const k of Object.keys(answers))delete answers[k];Object.assign(answers,input);return complete();}},{signal:lifetime.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifetime.abort(),{once:true});
 }
})();
