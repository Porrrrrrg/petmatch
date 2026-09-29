'use strict';
(()=>{
 const screen=document.getElementById('screen'),dialog=document.getElementById('method-dialog');
 const answers={};let step=0,result=null,advancing=false,timer=null,selectedCoat='orange',returnFocus=null;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const links=ids=>ids.map(id=>{const s=CAT_DATA.sources[id];return `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>`;}).join('');
 const sprite=(index,label)=>`<div class="cat-portrait" role="img" aria-label="${esc(label)}" style="background-position:${index%3*50}% ${Math.floor(index/3)*100/3}%"></div>`;
 function focusTitle(){screen.querySelector('h1,h2')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
 function cancelAdvance(){clearTimeout(timer);advancing=false;}
 function welcome(focus=false){
  cancelAdvance();result=null;
  screen.innerHTML=`<section class="paper welcome enter"><p class="eyebrow">A CAT-SIZED LIFE QUESTION</p><h1 tabindex="-1">Which cat<br>fits <em>your life?</em></h1><figure class="cat-hero"><img src="cat-hero.png" width="1536" height="1024" alt="Different cats relax and play in a sunny room beside a safe outdoor catio."><span class="time-sticker">MEOW<br>MEETS<br>YOU</span></figure><button class="primary" id="start-button" type="button">Find my cat <span aria-hidden="true">→</span></button></section>`;
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
  return `<div class="coat-picker"><p>Same personality. Pick a coat.</p><div class="coat-options" role="group" aria-label="Illustration coat">${CAT_DATA.coats.map(c=>`<button type="button" class="coat-chip" data-coat="${c.id}" aria-pressed="${c.id===selectedCoat}">${esc(c.label)}</button>`).join('')}</div></div>`;
 }
 function resultCard(){
  const cat=result.cat,future=result.status==='future',coat=CAT_DATA.coats.find(c=>c.id===selectedCoat)||CAT_DATA.coats[0];
  const portrait=cat.type==='domestic'?coat.sprite:cat.sprite;
  const label=cat.type==='domestic'?`Illustrated ${coat.label} domestic cat; coat does not predict personality.`:`Illustration of a ${cat.name}.`;
  screen.innerHTML=`<section class="paper result-card enter" style="--card-accent:${cat.color}" aria-labelledby="result-title"><div class="result-topline"><span>${future?'FOR ANOTHER CHAPTER':'A CAT TO GET TO KNOW'}</span><span class="result-number">CAT / ${CAT_DATA.cats.length}</span></div>${sprite(portrait,label)}<h2 class="result-title" id="result-title" tabindex="-1">${esc(cat.title)}</h2><p class="cat-name">${esc(cat.name)}</p><p class="scene-label">PICTURE THIS</p><p class="result-scene">${esc(cat.scene)}</p><div class="care-note"><strong>The real-life part:</strong> ${esc(cat.care)}</div>${future?`<p class="future-note">${esc(result.reasons.join(' '))}</p>`:''}<p class="outdoor-note">${esc(result.lifestyle)}</p>${cat.type==='domestic'?coatPicker():''}<button class="secondary" id="details-button" type="button">Meet this kind of cat <span aria-hidden="true">↗</span></button></section><div class="result-below"><button class="text-button" id="review-button" type="button">Edit answers</button><button class="text-button" id="restart-button" type="button">Play again</button></div>`;
  document.getElementById('details-button').addEventListener('click',details);
  document.getElementById('review-button').addEventListener('click',()=>{step=0;question();});
  document.getElementById('restart-button').addEventListener('click',()=>{for(const k of Object.keys(answers))delete answers[k];selectedCoat='orange';step=0;welcome(true);});
  screen.querySelectorAll('[data-coat]').forEach(b=>b.addEventListener('click',()=>{selectedCoat=b.dataset.coat;resultCard();screen.querySelector(`[data-coat="${selectedCoat}"]`)?.focus();}));
  focusTitle();
 }
 function complete(){cancelAdvance();result=CAT_ENGINE.match(answers);resultCard();return{status:result.status,cat:result.cat.name,archetype:result.cat.title,outdoor:answers.outdoors};}
 function openDialog(title,content){
  returnFocus=document.activeElement;document.getElementById('method-title').textContent=title;
  document.getElementById('method-content').innerHTML=content;dialog.showModal();dialog.scrollTop=0;
 }
 function details(){
  const cat=result.cat;
  openDialog(cat.title,`<p class="dialog-note">${esc(cat.name)} · ${cat.type==='domestic'?'A non-pedigree household cat profile':'A breed tendency, not a promise about one cat'}</p><h3>What to ask when you meet</h3><p>${esc(cat.detail)}</p><h3>Indoor or outdoor?</h3><p>${esc(result.lifestyle)}</p><h3>Coat & sex ≠ personality</h3><p>Tabby, tuxedo and calico describe looks, not breeds or temperaments. Most calicos are female because of coat genetics, with rare exceptions. Sex alone cannot tell you whether a cat will be cuddly or bold.</p><div class="source-links">${links([...cat.sources,'outdoor','demographic','genetics'])}</div>`);
 }
 document.getElementById('method-button').addEventListener('click',()=>openDialog('Research',`<h3>Meet the individual</h3><p>Studies find behavior differences between cats and some breed tendencies. The label cannot predict one cat’s personality. Adult cats may have a more observable routine.</p><div class="source-links">${links(['traits','breeds','adult','household'])}</div><h3>Inside, outside, and in between</h3><p>Indoor cats need places to hide, climb, scratch and play. Controlled outdoor time can add stimulation. Free roaming adds risks to cats and wildlife; some formerly outdoor-only cats need a different welfare plan.</p><div class="source-links">${links(['outdoor','indoor','pillars','intercat'])}</div><h3>Color and sex</h3><p>Orange, tuxedo, tabby and calico are looks, not personality types. Studies of color and behavior have mixed or small effects; a later study found no significant personality effect from coat color or cat sex. Calicos are usually female because of coat genetics, with rare male exceptions.</p><div class="source-links">${links(['colour','colourStudy','demographic','genetics','pattern'])}</div><h3>One health note</h3><p>No cat breed is truly hypoallergenic. Check allergies and discuss individual health needs before bringing a cat home.</p><div class="source-links">${links(['allergy'])}</div>`));
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
