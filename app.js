'use strict';
(()=>{
 const screen=document.getElementById('screen'),dialog=document.getElementById('method-dialog');
 const answers={};let step=0,result=null,advancing=false,timer=null,returnFocus=null;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const links=keys=>keys.map(k=>{const s=PET_DATA.sources[k];return `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>`;}).join('');
 const art=(sprite,label)=>`<div class="result-art" role="img" aria-label="${esc(label)}" style="background-position:${sprite%3*50}% ${Math.floor(sprite/3)*50}%;${sprite===5?'clip-path:inset(0 0 3% 0);':''}"></div>`;
 function focusTitle(){screen.querySelector('h1,h2')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
 function cancelAdvance(){clearTimeout(timer);advancing=false;}
 function renderWelcome(focus=false){
  cancelAdvance();result=null;
  screen.innerHTML=`<section class="paper welcome enter"><p class="eyebrow">CHOOSING YOUR LIFE PET</p><h1 tabindex="-1">Who's your<br>everyday<br><em>sidekick?</em></h1><figure class="pet-art"><img src="pets.png" width="1536" height="1024" alt="A playful gathering of pets: a cat, dog, guinea pigs and a betta in an aquarium."><span class="time-sticker"><span>HELLO,<br>ROOMIE!</span></span></figure><button class="primary" id="start-button" type="button">Meet my sidekick <span aria-hidden="true">→</span></button></section>`;
  document.getElementById('start-button').addEventListener('click',()=>{step=0;renderQuestion();});if(focus)focusTitle();
 }
 function questionTitle(q){
  if(q.id!=='readiness')return q.title;
  const p=PET_ENGINE.provisional(answers);
  if(!p)return q.title;
  const subject={dog:'a dog',cat:'a cat',small:p.id==='guinea'?'guinea pigs':'a hamster',fish:'a fish'}[p.species];
  return `Could ${subject} move in?`;
 }
 function renderQuestion(){
  cancelAdvance();result=null;
  const qs=PET_ENGINE.questions(answers),q=qs[step];
  screen.innerHTML=`<section class="paper question-card enter" aria-labelledby="question-title"><div class="quiz-top"><button class="back-button" id="back-button" type="button" aria-label="${step?'Previous question':'Back to introduction'}">←</button><span class="step-label">${String(step+1).padStart(2,'0')} / ${qs.length}</span></div><div class="progress" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${step}">${qs.map((_,i)=>`<span aria-hidden="true" class="${i<step?'done':''}"></span>`).join('')}</div><p class="chapter">${esc(q.stage)}</p><h2 class="question-heading" id="question-title" tabindex="-1">${esc(questionTitle(q))}</h2>${q.note?`<p class="check-intro">${esc(q.note)}</p>`:''}${q.checklist?`<p class="check-intro">All four covered?</p><ul class="ready-list">${q.checklist.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}<div class="options" role="group" aria-labelledby="question-title">${q.options.map((o,i)=>`<button class="option" type="button" data-value="${o.value}" aria-pressed="${answers[q.id]===o.value}"><span class="option-key" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${esc(o.label)}</span></button>`).join('')}</div><div class="question-bottom">${answers[q.id]?'<button class="text-button" id="keep-button" type="button">Keep this answer →</button>':'<p></p>'}</div></section>`;
  document.getElementById('back-button').addEventListener('click',()=>{if(step){step--;renderQuestion();}else renderWelcome(true);});
  screen.querySelectorAll('.option').forEach(button=>button.addEventListener('click',()=>select(q,button.dataset.value)));
  document.getElementById('keep-button')?.addEventListener('click',()=>select(q,answers[q.id]));focusTitle();
 }
 function select(q,value){
  if(advancing)return;advancing=true;
  const changed=answers[q.id]!==value;answers[q.id]=value;
  if(changed&&q.id!=='readiness')delete answers.readiness;
  const branch=PET_ENGINE.branchFor(answers);
  for(const extra of PET_DATA.branchQuestions)if(extra.id!==branch?.id)delete answers[extra.id];
  screen.querySelectorAll('.option').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.value===value));});
  // A short selection acknowledgement, not a fake analysis/loading screen.
  timer=setTimeout(()=>{
   advancing=false;
   if(q.id==='readiness'){complete();return;}
   const qs=PET_ENGINE.questions(answers);step=qs.findIndex(x=>x.id===q.id)+1;renderQuestion();
  },window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:170);
 }
 function renderResult(){
  const match=result.status==='match',waiting=result.status==='not-yet',p=match?result.pet:null;
  const title=p?p.archetype:waiting?'The Guest Star':'The Plot Twist';
  const name=p?p.name:waiting?'Pet ownership: not this chapter.':'No clear sidekick in this set.';
  const summary=p?result.summary:waiting?`${result.summary} You can like animals without adding a pet to your calendar.`:result.reasons[0];
  const catchText=p?p.catch:waiting?'Ask an owner what an ordinary week really looks like.':'Compare your favorite kind of company with the routine it needs.';
  screen.innerHTML=`<section class="paper result-card enter" style="--card-accent:${p?p.color:'#ffce4a'}" aria-labelledby="result-title"><div class="result-topline"><span>${match?'YOUR SIDEKICK TO EXPLORE':'YOUR CURRENT CHAPTER'}</span><span class="result-number">${p?p.number:waiting?'08':'09'} / 09</span></div>${art(p?p.sprite:waiting?7:8,p?`Illustration of ${p.name}`:waiting?'An empty reading chair and a book':'A playful question mark')}<h2 id="result-title" class="result-title" tabindex="-1">${esc(title)}</h2><p class="pet-name">${esc(name)}</p><p class="result-summary">${esc(summary)}</p><div class="catch"><p><strong>${match?'The catch:':'Next move:'}</strong> ${esc(catchText)}</p></div>${waiting&&result.wishlist?`<p class="wishlist"><strong>Wishlist pick: ${esc(result.wishlist.name)}.</strong><br>For a future chapter.</p>`:''}<p class="result-footnote">${match?'A starting point. Meet the individual.':'No rush.'}</p><div class="result-actions"><button class="secondary" id="details-button" type="button">The real-life details <span aria-hidden="true">↗</span></button></div></section><div class="result-below"><div class="inline-actions"><button class="text-button" id="review-button" type="button">Edit my answers</button><button class="text-button" id="restart-button" type="button">Play again</button></div></div>`;
  document.getElementById('details-button').addEventListener('click',showDetails);
  document.getElementById('review-button').addEventListener('click',()=>{step=0;renderQuestion();});
  document.getElementById('restart-button').addEventListener('click',()=>{for(const k of Object.keys(answers))delete answers[k];step=0;renderWelcome(true);});focusTitle();
 }
 function complete(){cancelAdvance();result=PET_ENGINE.match(answers);renderResult();return{status:result.status,pet:result.pet?.name??null,wishlist:result.wishlist?.name??null,reasons:result.reasons};}
 function openDialog(title,content){returnFocus=document.activeElement;document.getElementById('method-title').textContent=title;document.getElementById('method-content').innerHTML=content;dialog.showModal();dialog.scrollTop=0;}
 function showDetails(){
  if(result.status==='match'){
   const p=result.pet;
   openDialog(p.name,`<p class="dialog-note">${esc(p.kind)}</p><h3>An ordinary Tuesday</h3><p>${esc(p.routine)}</p><h3>Try a tiny experiment</h3><p>${esc(p.prototype)}</p><h3>Meet the individual</h3><p>${esc(p.meetPrompt)}</p><div class="source-links">${links(p.sources)}</div>`);
  }else{
   const p=result.wishlist;
   openDialog(result.status==='not-yet'?'Your next chapter':'Keep exploring',`<h3>What shaped your result</h3><ul>${result.reasons.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>${p?`<h3>Wishlist only: ${esc(p.name)}</h3><p>This reflects your preferences for a possible future home. It is not a recommendation to get this pet now.</p><p>${esc(p.routine)}</p><div class="source-links">${links(p.sources)}</div>`:''}<h3>One small experiment</h3><p>Ask an owner to walk you through a normal week: the fun parts, the chores, and what happens when plans change.</p><p class="dialog-note">This quiz covers seven pet profiles. A missing match does not rule out every animal, and waiting is not a personality judgment.</p>`);
  }
 }
 document.getElementById('method-button').addEventListener('click',()=>openDialog('Research',`<h3>Company & connection</h3><p>Dog–owner relationship research distinguishes shared activities, affection and the effort of care.</p><div class="source-links">${links(['mdors','dors'])}</div><h3>Everyday fit</h3><p>ASPCA’s adopter survey asks about time alone, closeness and expectations for life together.</p><div class="source-links">${links(['adopter'])}</div><h3>The less-cute bits</h3><p>Dogs Trust’s survey explores how costs, patience and daily life compare with owners’ expectations.</p><div class="source-links">${links(['expectations'])}</div><h3>Meet the animal</h3><p>Individual behavior matters. A breed name is only part of the picture.</p><div class="source-links">${links(['cbarq','science'])}</div><h3>Care guides</h3><div class="source-links">${links(['pdsa','welfare'])}</div>`));
 document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
 renderWelcome();
 if(document.modelContext?.registerTool){
  const allQuestions=[...PET_DATA.questions,...PET_DATA.branchQuestions];
  const properties=Object.fromEntries(allQuestions.map(q=>[q.id,{type:'string',enum:q.options.map(o=>o.value),description:q.title+' '+q.options.map(o=>o.value+': '+o.label).join('; ')}]));
  const lifetime=new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'complete_pet_lifestyle_quiz',title:'Complete the sidekick quiz',description:'Display a result from these answers using the same local rules as the quiz. Include only the relevant follow-up: grooming for a poodle candidate, or night for a hamster candidate. Answers are not saved or uploaded.',inputSchema:{type:'object',properties,required:PET_DATA.questions.map(q=>q.id),additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){PET_ENGINE.validate(input);for(const k of Object.keys(answers))delete answers[k];Object.assign(answers,input);return complete();}},{signal:lifetime.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifetime.abort(),{once:true});
 }
})();
