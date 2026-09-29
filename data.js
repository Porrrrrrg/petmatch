'use strict';
// Breed descriptions suggest tendencies; coat and sex never drive matching.
const CAT_DATA={
 reviewed:'2026-09-29',
 sources:{
  traits:{name:'Mikkola et al. · Cat behavior traits (2021)',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8300181/'},
  breeds:{name:'Salonen et al. · Breed differences (2019)',url:'https://doi.org/10.1038/s41598-019-44324-x'},
  demographic:{name:'Leech et al. · Cat demographics and personality (2022)',url:'https://doi.org/10.1016/j.applanim.2022.105570'},
  outdoor:{name:'FelineVMA · Indoor/outdoor lifestyle (2024)',url:'https://catvets.com/resource/2024-indoor-outdoor-lifestyle-position-statement/'},
  indoor:{name:'FelineVMA · Indoor cat needs (2025)',url:'https://catvets.com/resource/2025-meeting-the-physical-and-emotional-needs-of-indoor-cats/'},
  pillars:{name:'AAFP/ISFM · Feline environmental needs',url:'https://journals.sagepub.com/doi/full/10.1177/1098612X13477537'},
  colour:{name:'Delgado et al. · Perceptions of coat color',url:'https://doi.org/10.2752/175303712X13479798785779'},
  colourStudy:{name:'Stelow et al. · Coat color and behavior',url:'https://doi.org/10.1080/10888705.2015.1081820'},
  genetics:{name:'CFA · Basic feline genetics',url:'https://cfa.org/basic-feline-genetics/'},
  household:{name:'TICA · Household cats',url:'https://tica.org/breed/household-pet/'},
  pattern:{name:'CFA · Pattern is not a breed',url:'https://cfa.org/cat-talk/a-pattern-does-not-a-breed-make/'},
  adult:{name:'ASPCA · Adopting an adult cat',url:'https://www.aspca.org/blog/four-reasons-give-senior-cats-lifesaving-chance'},
  allergy:{name:'AAAAI · Pet allergies',url:'https://www.aaaai.org/conditions-treatments/allergies/pet-allergy'},
  intercat:{name:'AAFP · Introducing cats',url:'https://catvets.com/resource/2024-intercat-tension-guidelines/'},
  british:{name:'TICA · British Shorthair',url:'https://tica.org/breed/british-shorthair/'},
  ragdoll:{name:'TICA · Ragdoll',url:'https://tica.org/breed/ragdoll/'},
  russian:{name:'TICA · Russian Blue',url:'https://tica.org/breed/russian-blue/'},
  maine:{name:'TICA · Maine Coon',url:'https://tica.org/breed/maine-coon/'},
  siamese:{name:'TICA · Siamese',url:'https://tica.org/breed/siamese/'},
  bengal:{name:'TICA · Bengal',url:'https://tica.org/breed/bengal/'},
  burmese:{name:'TICA · Burmese',url:'https://tica.org/breed/burmese/'},
  abyssinian:{name:'TICA · Abyssinian',url:'https://tica.org/breed/abyssinian/'},
  birman:{name:'TICA · Birman',url:'https://tica.org/breed/birman/'},
  devon:{name:'TICA · Devon Rex',url:'https://tica.org/breed/devon-rex/'},
  siberian:{name:'TICA · Siberian',url:'https://tica.org/breed/siberian/'},
  bombay:{name:'TICA · Bombay',url:'https://tica.org/breed/bombay/'},
  curl:{name:'TICA · American Curl',url:'https://tica.org/breed/american-curl/'},
  norwegian:{name:'TICA · Norwegian Forest',url:'https://tica.org/breed/norwegian-forest/'}
 },
 questions:[
  {id:'greeting',stage:'THE HELLO',title:'You get home. Your ideal hello?',options:[
   {value:'close',label:'A full-on greeting committee.'},{value:'near',label:'Company in the same room.'},{value:'space',label:'A nod from across the couch.'}]},
  {id:'play',stage:'PLAY MODE',title:'The feather wand is out. You’re up for…',options:[
   {value:'gentle',label:'A quick daily round.'},{value:'regular',label:'A proper play session.'},{value:'big',label:'Encore! Bring on the obstacle course.'}]},
  {id:'voice',stage:'THE SOUNDTRACK',title:'Your cat has opinions. Volume?',options:[
   {value:'chatty',label:'Let’s talk all day.'},{value:'some',label:'A few well-timed meows.'},{value:'quiet',label:'Mostly quiet, please.'}]},
  {id:'guests',stage:'WHEN FRIENDS VISIT',title:'Your ideal cat at a party?',options:[
   {value:'bold',label:'Inspects every guest.'},{value:'warm',label:'Warms up in their own time.'},{value:'reserved',label:'Prefers a secret hideout.'}]},
  {id:'grooming',stage:'THE FUR SITUATION',title:'A regular brushing date?',options:[
   {value:'yes',label:'Sounds lovely.'},{value:'simple',label:'Keep coat care simple, please.'}]},
  {id:'outdoors',stage:'THE GREAT OUTDOORS',title:'How would your cat explore?',options:[
   {value:'indoor',label:'Indoors, with play and perches.'},{value:'controlled',label:'A catio or supervised outings.'},{value:'roaming',label:'Free to wander outside.'}]},
  {id:'coverage',stage:'YOUR ACTUAL WEEK',title:'When your day gets busy…',options:[
   {value:'company',label:'Someone’s usually home.'},{value:'planned',label:'I’m out, but care and play are planned.'},{value:'uncertain',label:'My schedule is unpredictable. No backup yet.'}]},
  {id:'origin',stage:'YOUR CAT STORY',title:'What sounds more like you?',options:[
   {value:'individual',label:'Meet an adult cat whose personality is known.'},{value:'breed',label:'Explore a particular breed’s tendencies.'},{value:'open',label:'Surprise me. I’m open to either.'}]},
  {id:'readiness',stage:'THE MOVE-IN CHECK',title:'Could a cat move in?',checklist:['Home, housemates and allergies checked','Daily care and veterinary budget covered','Hiding spots, scratching and play space planned'],options:[
   {value:'ready',label:'Yes. The plans are in place.'},{value:'planning',label:'A few things to sort out.'},{value:'dreaming',label:'Just here to daydream.'}]}
 ],
 coats:[
  {id:'orange',label:'Orange tabby',sprite:0},
  {id:'tuxedo',label:'Tuxedo',sprite:1},
  {id:'calico',label:'Calico',sprite:2},
  {id:'tabby',label:'Brown tabby',sprite:3}
 ],
 cats:[
  {id:'dsh_cuddle',type:'domestic',name:'Adult domestic shorthair',title:'The Couch Companion',sprite:0,traits:{social:2,play:0,voice:0,guests:1},coat:'simple',minPlay:0,company:'ordinary',color:'#ffd56a',scene:'You settle in after class. A cat chooses the cushion beside you, then stays for the whole chapter.',care:'Ask about this individual’s favorite kind of contact; “lap cat” cannot be read from fur.',detail:'Look for an adult whose foster notes mention seeking human company and enjoying calm play.',sources:['household','adult','traits']},
  {id:'dsh_sideby',type:'domestic',name:'Adult domestic shorthair',title:'The Side-by-Side Scholar',sprite:1,traits:{social:1,play:1,voice:1,guests:1},coat:'simple',minPlay:0,company:'ordinary',color:'#b8e2ee',scene:'Your desk has two seats now: one for you, one for the cat who watches the cursor and joins the evening game.',care:'Meet the individual; a shelter may know whether they prefer play, petting or quiet company.',detail:'Ask a foster or shelter worker what this cat does on an ordinary afternoon, not just during one stressful visit.',sources:['household','adult','traits']},
  {id:'dsh_quiet',type:'domestic',name:'Adult domestic shorthair',title:'The Secret Garden Cat',sprite:2,traits:{social:0,play:1,voice:0,guests:0},coat:'simple',minPlay:0,company:'ordinary',color:'#e8cbec',scene:'Guests come over and your cat takes the high perch. Later, when the room is quiet, they emerge for your familiar game.',care:'A safe hiding place and patient introductions matter more than a “shy” label.',detail:'Ask what helps this particular cat feel secure and how their behavior changes after they settle in.',sources:['household','adult','pillars']},
  {id:'dsh_spark',type:'domestic',name:'Adult domestic shorthair',title:'The Tiny Tornado',sprite:3,traits:{social:1,play:2,voice:1,guests:2},coat:'simple',minPlay:1,company:'ordinary',color:'#ffba8d',scene:'A cardboard box becomes a fortress. Your curious cat turns the hallway into a racetrack, then comes back for round two.',care:'Plan climbing, scratching and regular interactive play for the actual cat you meet.',detail:'Ask a shelter to introduce you to an active adult cat and describe their play and recovery rhythm.',sources:['household','adult','indoor']},
  {id:'british',type:'breed',name:'British Shorthair',title:'The Sofa Diplomat',sprite:4,traits:{social:0,play:0,voice:0,guests:1},coat:'simple',minPlay:0,company:'ordinary',color:'#d6dff4',scene:'You unpack after class. Your cat takes the next cushion and watches you work like a very round supervisor.',care:'Many prefer being beside you to being carried; every cat still needs play.',detail:'The breed is often described as calm and independent. Meet the individual before expecting a particular cuddle style.',sources:['british','traits']},
  {id:'ragdoll',type:'breed',name:'Ragdoll',title:'The Gentle Shadow',sprite:5,traits:{social:2,play:0,voice:0,guests:1},coat:'regular',minPlay:0,company:'ordinary',color:'#c9e5f8',scene:'You open a book. A fluffy shadow settles nearby and follows you when you go to make tea.',care:'Plan regular combing and interactive play; never assume a cat likes being picked up.',detail:'Ask about the individual’s comfort with handling, and discuss breed health screening with a veterinarian or breeder.',sources:['ragdoll','traits']},
  {id:'russian',type:'breed',name:'Russian Blue',title:'The Quiet Co-Conspirator',sprite:6,traits:{social:1,play:1,voice:0,guests:0},coat:'simple',minPlay:0,company:'ordinary',color:'#c3dfdb',scene:'After your guests leave, you pull out the toy hidden under the couch. Your silver sidekick is suddenly ready to play.',care:'Keep a quiet retreat and mentally interesting games available.',detail:'TICA describes reserve with strangers and affection with familiar people, but an individual may differ.',sources:['russian','traits']},
  {id:'maine',type:'breed',name:'Maine Coon',title:'The Big Helpful Roommate',sprite:7,traits:{social:1,play:1,voice:1,guests:2},coat:'regular',minPlay:1,company:'ordinary',color:'#eacdab',scene:'You try to fold laundry. Your enormous assistant supervises every shirt, then asks for a game.',care:'Allow room for a large cat, a sturdy perch and regular coat care.',detail:'Many are social, playful companions. Check the individual’s handling style and health history.',sources:['maine','traits']},
  {id:'siamese',type:'breed',name:'Siamese',title:'The Homework Commentator',sprite:8,traits:{social:2,play:2,voice:2,guests:2},coat:'simple',minPlay:1,company:'high',color:'#f7cf94',scene:'You tell one story about your day. Your cat replies with three, then joins your study session from the keyboard.',care:'Conversation and active company are part of the routine, not just the charm.',detail:'TICA describes Siamese as active, vocal and highly people-oriented. Ask how a real cat handles time alone.',sources:['siamese','traits']},
  {id:'bengal',type:'breed',name:'Bengal',title:'The Parkour Professor',sprite:9,traits:{social:1,play:2,voice:1,guests:2},coat:'simple',minPlay:2,company:'ordinary',color:'#ffc384',scene:'Your evening starts with a puzzle feeder. Moments later, your athlete invents a new route across the shelves.',care:'A spotted coat is no substitute for extensive play and enrichment.',detail:'TICA describes high energy and curiosity. Meet the individual and plan climbing, puzzles and frequent interaction.',sources:['bengal','traits']},
  {id:'burmese',type:'breed',name:'Burmese',title:'The Social Butterfly',sprite:10,traits:{social:2,play:1,voice:1,guests:2},coat:'simple',minPlay:1,company:'high',color:'#dcb8a3',scene:'Your video call ends. Your little co-host leaves the desk and claims the chair beside you for the debrief.',care:'Reliable company and play matter for this people-oriented profile.',detail:'TICA describes Burmese as affectionate and social. Ask the individual’s response to separation and other pets.',sources:['burmese','traits']},
  {id:'dlh_moon',type:'domestic',name:'Adult domestic longhair',title:'The Midnight Librarian',atlas:'cat-atlas-extra.png',sprite:7,traits:{social:0,play:0,voice:1,guests:0},coat:'regular',minPlay:0,company:'ordinary',color:'#cbd0ed',scene:'The apartment quiets down; your fluffy roommate joins you for one last page.',care:'Ask about the individual’s preferred distance, and plan regular coat care.',detail:'Look for foster notes about a calm, reserved adult who enjoys predictable company.',sources:['household','adult','pillars']},
  {id:'dlh_cloud',type:'domestic',name:'Adult domestic longhair',title:'The Cloud Nine Companion',atlas:'cat-atlas-extra.png',sprite:8,traits:{social:2,play:1,voice:0,guests:2},coat:'regular',minPlay:0,company:'ordinary',color:'#d2e6ef',scene:'A soft white-and-gray shadow follows you from the desk to the sunny window.',care:'A long coat needs grooming; affection still depends on the cat you meet.',detail:'Ask a foster about this individual’s contact style, brushing tolerance and play routine.',sources:['household','adult','traits']},
  {id:'abyssinian',type:'breed',name:'Abyssinian',title:'The Shelf Inspector',atlas:'cat-atlas-extra.png',sprite:0,traits:{social:1,play:2,voice:0,guests:2},coat:'simple',minPlay:2,company:'high',color:'#f6cba3',scene:'You look up from your notes; your curious athlete has found the highest shelf.',care:'Plan daily active play and safe climbing routes.',detail:'TICA describes Abyssinians as athletic, curious and people-oriented. Meet the individual and check their play needs.',sources:['abyssinian','traits']},
  {id:'birman',type:'breed',name:'Birman',title:'The Gentle Greeter',atlas:'cat-atlas-extra.png',sprite:1,traits:{social:2,play:1,voice:0,guests:1},coat:'regular',minPlay:0,company:'ordinary',color:'#f2d8bf',scene:'Your visitor rings the bell; your blue-eyed friend arrives to supervise tea.',care:'A silky coat still needs weekly combing and regular play.',detail:'TICA describes Birmans as affectionate and playful. Ask whether the individual welcomes guests and handling.',sources:['birman','traits']},
  {id:'devon',type:'breed',name:'Devon Rex',title:'The Pocket-Sized Plotter',atlas:'cat-atlas-extra.png',sprite:2,traits:{social:2,play:2,voice:1,guests:1},coat:'simple',minPlay:1,company:'high',color:'#e4d4e9',scene:'The blanket moves; your little co-conspirator has already claimed the warmest spot.',care:'Offer company and interactive play; the wavy coat is not allergy-proof.',detail:'TICA describes Devon Rex as highly social and active. Discuss health screening and the individual’s needs.',sources:['devon','allergy']},
  {id:'siberian',type:'breed',name:'Siberian',title:'The Fluffy Problem Solver',atlas:'cat-atlas-extra.png',sprite:3,traits:{social:1,play:2,voice:0,guests:1},coat:'regular',minPlay:1,company:'ordinary',color:'#d5c5a5',scene:'A puzzle feeder clicks open; your fluffy strategist acts as if it was easy.',care:'Brush the dense coat regularly and keep climbing games in rotation.',detail:'TICA describes playful intelligence and a thick seasonal coat. No breed is truly hypoallergenic.',sources:['siberian','allergy']},
  {id:'bombay',type:'breed',name:'Bombay',title:'The Velvet Welcome',atlas:'cat-atlas-extra.png',sprite:4,traits:{social:2,play:1,voice:0,guests:2},coat:'simple',minPlay:0,company:'high',color:'#dec7dc',scene:'You open the door; a tiny black panther is first to greet you.',care:'Attention and games matter more than the glossy coat.',detail:'TICA describes Bombays as affectionate, people-focused and playful. Meet the individual.',sources:['bombay','traits']},
  {id:'curl',type:'breed',name:'American Curl',title:'The Quiet Adventurer',atlas:'cat-atlas-extra.png',sprite:5,traits:{social:1,play:2,voice:1,guests:1},coat:'simple',minPlay:1,company:'ordinary',color:'#f4d5af',scene:'A paper bag rustles; your curious friend peeks out, ready for round two.',care:'Set up daily games and climbing spots; handle the curled ears gently.',detail:'TICA describes American Curls as curious, playful and usually soft-voiced. Ask about this individual.',sources:['curl','traits']},
  {id:'norwegian',type:'breed',name:'Norwegian Forest',title:'The Window Ranger',atlas:'cat-atlas-extra.png',sprite:6,traits:{social:1,play:1,voice:0,guests:2},coat:'regular',minPlay:0,company:'ordinary',color:'#d4dce6',scene:'Your big fluffy observer claims the window perch before you finish breakfast.',care:'Make room for climbing and maintain the long coat.',detail:'TICA describes Norwegian Forest cats as mild-mannered, playful and adaptable. Meet the individual.',sources:['norwegian','traits']}
 ]
};
if(typeof module!=='undefined')module.exports=CAT_DATA;
