'use strict';
const PET_ENGINE=(()=>{
 const data=typeof module!=='undefined'?require('./data.js'):PET_DATA;
 const timeLevel={little:0,some:1,more:2,lots:3},activityLevel={low:0,medium:1,high:2};
 const baseQuestions=data.questions.filter(q=>q.id!=='readiness');
 function exclusions(p,a,{wishlist=false,ignoreChecks=false}={}){
  const r=[];
  if(!p.connection.includes(a.connection))r.push('The companionship you chose is different from this profile.');
  if(a.setup!==p.setup&&a.setup!=='flexible'&&!(wishlist&&a.setup==='none'))r.push('This pet needs a different home setup.');
  if(!wishlist&&timeLevel[a.time]<p.minTime)r.push('Your care-time answer is below this profile’s planning range.');
  if(p.species==='dog'&&activityLevel[a.activity]<p.exercise)r.push('Your outdoor routine does not fit this dog profile.');
  if(p.species==='dog'&&a.coverage==='long')r.push('A dog would need care breaks and companionship during your long days away.');
  if(!ignoreChecks&&p.id==='hamster'&&!['enjoy','separate'].includes(a.night))r.push('Nighttime activity is not a confirmed fit.');
  if(!ignoreChecks&&p.id==='poodle'&&a.grooming!=='yes')r.push('Regular grooming is not a confirmed fit.');
  return r;
 }
 function score(p,a){
  let n=p.connection[0]===a.connection?5:2;
  if(p.species==='dog'&&activityLevel[a.activity]===p.exercise)n+=4;
  if(p.id==='domestic'&&a.activity==='low')n+=3;
  if(p.id==='poodle'&&a.chores==='enjoy')n+=1;
  if(p.id==='guinea'&&a.connection==='quiet')n+=1;
  if(a.setup===p.setup)n+=2;
  return n;
 }
 function candidates(a,opts={}){
  if(!baseQuestions.every(q=>q.options.some(o=>o.value===a[q.id])))return [];
  return data.pets.filter(p=>exclusions(p,a,opts).length===0).map(p=>({pet:p,score:score(p,a)})).sort((x,y)=>y.score-x.score||x.pet.number.localeCompare(y.pet.number));
 }
 // Freeze which extra question is shown from the six common answers. Editing the
 // extra answer cannot remove that question from the flow and skip readiness.
 function branchFor(a){
  const best=(candidates(a,{ignoreChecks:true})[0]||candidates(a,{wishlist:true,ignoreChecks:true})[0])?.pet;
  const id=best?.id==='poodle'?'grooming':best?.id==='hamster'?'night':null;
  return data.branchQuestions.find(q=>q.id===id)||null;
 }
 function provisional(a){
  const branch=branchFor(a),opts={ignoreChecks:!!branch&&!a[branch.id]};
  return (candidates(a,opts)[0]||candidates(a,{...opts,wishlist:true})[0])?.pet||null;
 }
 function questions(a){const branch=branchFor(a);return [...baseQuestions,...(branch?[branch]:[]),data.questions.find(q=>q.id==='readiness')];}
 function validate(a){
  if(!a||typeof a!=='object'||Array.isArray(a))throw new Error('Answers must be an object.');
  const followup=branchFor(a),allowed=[...data.questions,...(followup?[followup]:[])];
  for(const key of Object.keys(a))if(!allowed.some(q=>q.id===key&&q.options.some(o=>o.value===a[key])))throw new Error('Invalid answer: '+key);
  for(const q of questions(a))if(!q.options.some(o=>o.value===a[q.id]))throw new Error('Choose a valid answer for '+q.id+'.');
 }
 function blocks(a){
  const r=[];
  if(a.readiness==='no')r.push('For now, you’re enjoying the idea of a pet.');
  else if(a.readiness==='planning')r.push('A few move-in plans still need to come together.');
  if(a.chores==='none')r.push('Daily pet care isn’t something you want to take on right now.');
  if(a.time==='little')r.push('There isn’t much room for daily pet care in your schedule yet.');
  if(a.setup==='none')r.push('You’re still making space for a pet’s home.');
  return r;
 }
 function reason(p,a){
  switch(p.id){
   case 'domestic':return a.connection==='quiet'?'You like having company without turning every evening into an event. Meet an adult cat who enjoys hanging out nearby.':'You’ve made room for play and a daily care routine. An adult cat could be your little stay-at-home teammate.';
   case 'whippet':return a.connection==='quiet'?'A proper walk, then some quality sofa time. Your pace makes a Whippet worth getting to know.':'You make time for walks and have daytime care covered. A Whippet could join your out-and-back routine.';
   case 'poodle':return 'You want a teammate, have time to spend together, and don’t mind the grooming calendar. A Miniature Poodle is worth a hello.';
   case 'labrador':return 'Outside time is already part of your day. With room for care and company, a Labrador could be your adventure partner.';
   case 'guinea':return 'You’ve made space for a little household within your household. A compatible guinea-pig duo could bring it to life.';
   case 'hamster':return a.night==='enjoy'?'You’re happy to catch the late show and give a tiny explorer a roomy home. A Syrian hamster keeps those hours.':'You can give a night owl its own space and keep up with daily care. Meet the Syrian hamster: tiny roomie, different schedule.';
   case 'betta':return 'You’d enjoy watching a little world unfold, and you’re ready for its daily care. A well-kept aquarium could be your kind of company.';
  }
 }
 function match(a){
  validate(a);const reasons=blocks(a),ranked=candidates(a);
  if(reasons.length)return{status:'not-yet',reasons,summary:reasons[0],wishlist:(ranked[0]||candidates(a,{wishlist:true})[0])?.pet||null};
  if(!ranked.length){
   const reasons=[];
   if(a.coverage==='long'&&a.setup==='rooms'&&a.connection==='team')reasons.push('An active companion sounds lovely. The missing piece is care during those long days away.');
   else if(a.night==='sleep'&&a.setup==='habitat'&&a.connection==='watch')reasons.push('You’d like a little world to watch during the day. Our hamster profile keeps a different schedule.');
   else reasons.push('The company you want and the setup you can offer don’t quite meet in these seven profiles.');
   return{status:'no-match',reasons};
  }
  const pet=ranked[0].pet;return{status:'match',pet,summary:reason(pet,a),reasons:[reason(pet,a)]};
 }
 return{match,validate,questions,branchFor,provisional,exclusions,candidates};
})();
if(typeof module!=='undefined')module.exports=PET_ENGINE;
