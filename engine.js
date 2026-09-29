'use strict';
const CAT_ENGINE=(()=>{
 const data=typeof module!=='undefined'?require('./data.js'):CAT_DATA;
 const levels={
  greeting:{space:0,near:1,close:2},
  play:{gentle:0,regular:1,big:2},
  voice:{quiet:0,some:1,chatty:2},
  guests:{reserved:0,warm:1,bold:2}
 };
 const weights={social:3,play:3,voice:2,guests:1};
 const dimensions={greeting:'social',play:'play',voice:'voice',guests:'guests'};
 function validate(a){
  if(!a||typeof a!=='object'||Array.isArray(a))throw Error('Answers must be an object.');
  for(const key of Object.keys(a))if(!data.questions.some(q=>q.id===key&&q.options.some(o=>o.value===a[key])))throw Error('Invalid answer: '+key);
  for(const q of data.questions)if(!q.options.some(o=>o.value===a[q.id]))throw Error('Choose '+q.id+'.');
 }
 function eligible(cat,a){
  if(a.origin==='individual'&&cat.type!=='domestic')return false;
  if(a.origin==='breed'&&cat.type!=='breed')return false;
  if(a.grooming==='simple'&&cat.coat==='regular')return false;
  if(levels.play[a.play]<cat.minPlay)return false;
  return true;
 }
 function distance(cat,a){
  return Object.entries(dimensions).reduce((n,[answer,trait])=>n+Math.abs(levels[answer][a[answer]]-cat.traits[trait])*weights[trait],0);
 }
 function ranked(a){
  return data.cats.filter(cat=>eligible(cat,a)).map(cat=>({cat,score:distance(cat,a)}))
   .sort((x,y)=>x.score-y.score||(a.origin==='open'&&x.cat.type!==y.cat.type?(x.cat.type==='domestic'?-1:1):0)||data.cats.indexOf(x.cat)-data.cats.indexOf(y.cat));
 }
 function lifestyle(a){
  switch(a.outdoors){
   case 'indoor':return 'Indoor life still needs play, perches, scratching and places to hide.';
   case 'controlled':return 'A catio or supervised outing can add adventure while reducing outdoor risks.';
   default:return 'Free roaming brings injury, infection and wildlife risks. Ask about safer outdoor access and the individual cat’s history.';
  }
 }
 function match(a){
  validate(a);
  const list=ranked(a),cat=list[0]?.cat;
  if(!cat)throw Error('No eligible cat profile.');
  const reasons=[];
  if(a.readiness==='planning')reasons.push('A few move-in plans still need to come together.');
  if(a.readiness==='dreaming')reasons.push('This is a cat to picture for another chapter.');
  if(a.coverage==='uncertain')reasons.push('Your busy-day care plan needs a backup.');
  const status=reasons.length?'future':'match';
  return {status,cat,reasons,lifestyle:lifestyle(a),score:list[0].score};
 }
 return {match,validate,eligible,distance,ranked,levels};
})();
if(typeof module!=='undefined')module.exports=CAT_ENGINE;
