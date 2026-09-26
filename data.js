'use strict';
// Source-backed care facts; original question wording and illustrative ranking.
const PET_DATA = {
  "reviewed": "2026-09-26",
  "sources": {
    "avma": {
      "name": "AVMA · Choosing a dog",
      "url": "https://avma.org/resources/pet-owners/petcare/selecting-pet-dog"
    },
    "cat": {
      "name": "AVMA · Choosing a cat",
      "url": "https://ebusiness.avma.org/files/productdownloads/LR_COM_ClientBroch_SelectingACat_031416.pdf"
    },
    "pdsa": {
      "name": "PDSA · Choosing a pet",
      "url": "https://www.pdsa.org.uk/pet-help-and-advice/choosing-a-pet"
    },
    "whippet": {
      "name": "PDSA · Whippet care",
      "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/medium-dogs/whippet"
    },
    "poodle": {
      "name": "PDSA · Poodle care",
      "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/large-dogs/poodle"
    },
    "mini": {
      "name": "AKC · Miniature Poodle",
      "url": "https://www.akc.org/dog-breeds/poodle-miniature/"
    },
    "lab": {
      "name": "PDSA · Labrador care",
      "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/large-dogs/labrador-retriever"
    },
    "british": {
      "name": "TICA · British Shorthair",
      "url": "https://tica.org/breed/british-shorthair/"
    },
    "guinea": {
      "name": "Blue Cross · Guinea pig care",
      "url": "https://www.bluecross.org.uk/advice/guinea-pig/guinea-pig-care"
    },
    "hamster": {
      "name": "Blue Cross · Hamster care",
      "url": "https://www.bluecross.org.uk/advice/hamster/hamster-care"
    },
    "betta": {
      "name": "RSPCA · Betta care",
      "url": "https://kb.rspca.org.au/categories/companion-animals/fish/how-should-i-care-for-my-siamese-fighting-fish"
    },
    "allergy": {
      "name": "AAAAI · Pet allergies",
      "url": "https://www.aaaai.org/conditions-treatments/allergies/pet-allergy"
    },
    "science": {
      "name": "Morrill et al. · Science (2022)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9675396/"
    },
    "welfare": {
      "name": "Mellor et al. · Five Domains (2020)",
      "url": "https://doi.org/10.3390/ani10101870"
    },
    "adopter": {
      "name": "ASPCA · Dog Adopter Survey",
      "url": "https://www.aspca.org/sites/default/files/upload/images/dogadoptersurvey.pdf"
    },
    "mdors": {
      "name": "Dwyer et al. · MDORS (2006)",
      "url": "https://doi.org/10.2752/089279306785415592"
    },
    "dors": {
      "name": "Bennett et al. · DORS (2025)",
      "url": "https://doi.org/10.3390/ani15050632"
    },
    "expectations": {
      "name": "Dogs Trust · Owner expectations (2024)",
      "url": "https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1331793/full"
    },
    "cbarq": {
      "name": "Penn Vet · C-BARQ",
      "url": "https://vetapps.vet.upenn.edu/cbarq/about.cfm"
    },
    "satisfaction": {
      "name": "van Herwijnen et al. · Ownership satisfaction (2018)",
      "url": "https://doi.org/10.1371/journal.pone.0204592"
    }
  },
  "questions": [
    {
      "id": "activity",
      "stage": "YOUR EVERYDAY PACE",
      "title": "Rainy Tuesday. Still going out?",
      "basis": [
        "adopter",
        "pdsa"
      ],
      "options": [
        {
          "value": "low",
          "label": "Let's stay in."
        },
        {
          "value": "medium",
          "label": "An hour's walk? Sure."
        },
        {
          "value": "high",
          "label": "Two hours outside? Happily."
        }
      ]
    },
    {
      "id": "connection",
      "stage": "YOUR KIND OF COMPANY",
      "title": "Best part of having a pet?",
      "basis": [
        "adopter",
        "mdors",
        "dors"
      ],
      "options": [
        {
          "value": "team",
          "label": "Doing things together."
        },
        {
          "value": "quiet",
          "label": "A familiar face nearby."
        },
        {
          "value": "watch",
          "label": "A tiny world to watch."
        }
      ]
    },
    {
      "id": "chores",
      "stage": "BEHIND THE CUTE",
      "title": "Feeding. Cleaning. Repeat. You’re…",
      "basis": [
        "mdors",
        "dors",
        "satisfaction"
      ],
      "options": [
        {
          "value": "enjoy",
          "label": "Into it. Routines are my thing."
        },
        {
          "value": "routine",
          "label": "Fine with a daily care routine."
        },
        {
          "value": "none",
          "label": "Not up for daily care right now."
        }
      ]
    },
    {
      "id": "coverage",
      "stage": "WHILE YOU’RE OUT",
      "title": "On a normal day, who’s home?",
      "basis": [
        "adopter"
      ],
      "options": [
        {
          "value": "home",
          "label": "Me, or someone I trust."
        },
        {
          "value": "help",
          "label": "Away a lot. Care breaks covered."
        },
        {
          "value": "long",
          "label": "Away all day. No help yet."
        }
      ]
    },
    {
      "id": "time",
      "stage": "TIME TOGETHER",
      "title": "Daily care time you can count on?",
      "basis": [
        "adopter",
        "expectations"
      ],
      "options": [
        {
          "value": "little",
          "label": "Under 30 minutes."
        },
        {
          "value": "some",
          "label": "30–60 minutes."
        },
        {
          "value": "more",
          "label": "1–2 hours."
        },
        {
          "value": "lots",
          "label": "2+ hours."
        }
      ]
    },
    {
      "id": "setup",
      "stage": "ROOM FOR A ROOMIE",
      "title": "Where would your sidekick live?",
      "basis": [
        "welfare",
        "pdsa"
      ],
      "options": [
        {
          "value": "rooms",
          "label": "In pet-safe rooms with me."
        },
        {
          "value": "habitat",
          "label": "In a roomy animal habitat."
        },
        {
          "value": "tank",
          "label": "In a proper aquarium."
        },
        {
          "value": "flexible",
          "label": "Open to any of these."
        },
        {
          "value": "none",
          "label": "No space just yet."
        }
      ]
    },
    {
      "id": "readiness",
      "stage": "THE MOVE-IN CHECK",
      "title": "Could a pet move in?",
      "basis": [
        "adopter",
        "expectations",
        "pdsa"
      ],
      "checklist": [
        "Home permission + allergies checked",
        "Daily care + travel cover",
        "Setup, food + vet budget",
        "Care through moves + life changes"
      ],
      "options": [
        {
          "value": "ready",
          "label": "Yes. Those plans are in place."
        },
        {
          "value": "planning",
          "label": "A few things to figure out."
        },
        {
          "value": "no",
          "label": "Just here to daydream."
        }
      ]
    }
  ],
  "pets": [
    {
      "id": "domestic",
      "name": "Adult domestic shorthair",
      "kind": "Cat · mixed-breed type, not a pedigree breed",
      "archetype": "The Parallel-Play Pal",
      "species": "cat",
      "minTime": 1,
      "exercise": 0,
      "connection": [
        "quiet",
        "team"
      ],
      "grooming": 1,
      "setup": "rooms",
      "summary": "Explore an adult cat whose observed personality fits your home. A shelter or foster carer can help you meet the individual behind the label.",
      "tradeoff": "Daily play and litter care still happen on deadline days. An adult cat is not a pet you can leave unattended for a weekend.",
      "routine": "Plan feeding, litter cleaning, interactive play, scratching areas and places to hide. Ask about health, sociability and time-alone needs.",
      "prototype": "Talk to a foster carer about one adult cat’s actual routine before making plans to adopt.",
      "sources": [
        "cat"
      ],
      "sprite": 0,
      "number": "01",
      "care": "litter",
      "catch": "Litter duty. Every day. Yes, exam week too.",
      "color": "#ffce4a",
      "meetPrompt": "Ask its carer whether this cat seeks play and attention or prefers hanging out nearby."
    },
    {
      "id": "whippet",
      "name": "Whippet",
      "kind": "Dog · pedigree breed · adult profile",
      "archetype": "The Walk-Then-Flop Club",
      "species": "dog",
      "minTime": 2,
      "exercise": 1,
      "connection": [
        "quiet",
        "team"
      ],
      "grooming": 1,
      "setup": "rooms",
      "summary": "A Whippet is worth exploring when you can make space for both exercise and downtime, with someone reliably available for daily care.",
      "tradeoff": "The relaxed reputation comes after exercise. Chase instincts mean safe, enclosed running space matters.",
      "routine": "PDSA recommends at least an hour of daily exercise, plus play and training. Arrange secure off-lead space, companionship and gentle weekly brushing.",
      "prototype": "Try the walking routine for a week and identify a genuinely secure exercise area.",
      "sources": [
        "whippet",
        "avma",
        "cbarq"
      ],
      "sprite": 1,
      "number": "02",
      "care": "walks",
      "catch": "Couch time comes after exercise. Safe running space matters.",
      "color": "#ffce4a",
      "meetPrompt": "Ask about this dog’s chase behavior, activity needs and comfort spending time alone."
    },
    {
      "id": "poodle",
      "name": "Miniature Poodle",
      "kind": "Dog · pedigree breed · adult profile",
      "archetype": "The Side-Quest Squad",
      "species": "dog",
      "minTime": 2,
      "exercise": 1,
      "connection": [
        "team"
      ],
      "grooming": 2,
      "setup": "rooms",
      "summary": "Explore a Miniature Poodle if shared activity and learning appeal to you and coat care can be part of the schedule.",
      "tradeoff": "That coat needs regular upkeep, including professional clipping. Low shedding is not an allergy guarantee.",
      "routine": "Combine walks, enrichment and reward-based training with frequent brushing and scheduled grooming. Confirm the individual dog’s needs with its carer.",
      "prototype": "Price a local groomer, then test a daily walk-and-training block in your calendar.",
      "sources": [
        "mini",
        "poodle",
        "allergy",
        "cbarq"
      ],
      "sprite": 2,
      "number": "03",
      "care": "walks",
      "catch": "Grooming gets a recurring calendar invite.",
      "color": "#ffd2bf",
      "meetPrompt": "Ask about this dog’s comfort with grooming, interest in training and time-alone needs."
    },
    {
      "id": "labrador",
      "name": "Labrador Retriever",
      "kind": "Dog · pedigree breed · adult profile",
      "archetype": "The Outside Committee",
      "species": "dog",
      "minTime": 3,
      "exercise": 2,
      "connection": [
        "team"
      ],
      "grooming": 1,
      "setup": "rooms",
      "summary": "A Labrador is a breed to investigate when substantial daily activity, training and a larger dog all fit your life.",
      "tradeoff": "Exercise, training, shedding and a large-dog budget come with the companionship. Working lines can be especially demanding.",
      "routine": "Plan substantial exercise and enrichment, regular brushing and weight management. Ask about joint and eye screening and the individual’s activity needs.",
      "prototype": "Block out your proposed exercise time for seven days, then ask an owner about the parts you haven’t budgeted for.",
      "sources": [
        "lab",
        "avma",
        "cbarq"
      ],
      "sprite": 3,
      "number": "04",
      "care": "walks",
      "catch": "Big activity needs. Big muddy-paw potential. Meet the individual dog.",
      "color": "#ffce4a",
      "meetPrompt": "Ask how this dog greets people, settles after play and handles time alone."
    },
    {
      "id": "guinea",
      "name": "A pair of guinea pigs",
      "kind": "Guinea pigs · coat type · compatible pair",
      "archetype": "The Tiny Dinner Party",
      "species": "small",
      "minTime": 1,
      "exercise": 0,
      "connection": [
        "team",
        "quiet"
      ],
      "grooming": 1,
      "setup": "habitat",
      "summary": "Explore a compatible pair if you enjoy gentle daily interaction and can give two small animals a generous home.",
      "tradeoff": "Two means space, cleaning and care for two. Guinea pigs need companionship from their own kind.",
      "routine": "Provide a spacious enclosure, hiding places, hay, appropriate vitamin C intake and daily checks. Confirm a safe pairing and access to an experienced vet.",
      "prototype": "Mark out an enclosure on your floor and price a week of food and bedding for a pair.",
      "sources": [
        "guinea"
      ],
      "sprite": 4,
      "number": "05",
      "care": "bedding",
      "catch": "It's a table for two. Space and care for both.",
      "color": "#ffd2bf",
      "meetPrompt": "Ask whether the pair is compatible and how each animal responds to gentle handling."
    },
    {
      "id": "hamster",
      "name": "Syrian hamster",
      "kind": "Hamster · species · housed singly",
      "archetype": "The After-Hours Club",
      "species": "small",
      "minTime": 1,
      "exercise": 0,
      "connection": [
        "watch",
        "quiet"
      ],
      "grooming": 1,
      "setup": "habitat",
      "summary": "A Syrian hamster may be worth exploring if you enjoy observing nighttime activity without expecting daytime cuddles.",
      "tradeoff": "Nighttime activity can be noisy. A small body still needs a large habitat; don’t wake a sleeping hamster to play.",
      "routine": "Keep one Syrian hamster alone in a roomy habitat with deep bedding, hiding places and an appropriate wheel. Provide daily care and enrichment.",
      "prototype": "Measure a habitat location outside your sleeping area and research suitable bedding and wheel sizes.",
      "sources": [
        "hamster"
      ],
      "sprite": 5,
      "number": "06",
      "care": "bedding",
      "catch": "One hamster, a roomy home, and daytime sleep to respect.",
      "color": "#ffce4a",
      "meetPrompt": "Ask when this hamster is usually awake and how it responds to gentle handling."
    },
    {
      "id": "betta",
      "name": "Betta splendens",
      "kind": "Fish · species · one fish in a prepared tank",
      "archetype": "The Tiny-World Curator",
      "species": "fish",
      "minTime": 1,
      "exercise": 0,
      "connection": [
        "watch"
      ],
      "grooming": 1,
      "setup": "tank",
      "summary": "Explore a betta if observation appeals to you and you want to learn how to care for a small aquatic environment.",
      "tradeoff": "The aquarium is a living system. Water testing, heating, filtration and maintenance are part of the deal.",
      "routine": "Prepare a cycled, gently filtered, heated 20L+ aquarium with a lid and cover. Monitor water quality; never put two males together.",
      "prototype": "Learn the nitrogen cycle and price the entire tank setup before considering a fish.",
      "sources": [
        "betta"
      ],
      "sprite": 6,
      "number": "07",
      "care": "water",
      "catch": "A heated, filtered, cycled tank. The water needs care too.",
      "color": "#c8e9ea",
      "meetPrompt": "Ask about the fish’s health and how to prepare and maintain its aquarium."
    }
  ],
  "branchQuestions": [
    {
      "id": "grooming",
      "stage": "ONE CURLY DETAIL",
      "title": "A coat with a calendar. Deal?",
      "note": "Poodles need regular grooming.",
      "basis": [
        "mini",
        "poodle"
      ],
      "options": [
        {
          "value": "yes",
          "label": "Brush, book, repeat. Deal."
        },
        {
          "value": "no",
          "label": "I'd rather skip the salon."
        }
      ]
    },
    {
      "id": "night",
      "stage": "A DIFFERENT SCHEDULE",
      "title": "Your tiny roomie works nights. Okay?",
      "note": "Hamsters sleep through much of the day.",
      "basis": [
        "hamster"
      ],
      "options": [
        {
          "value": "enjoy",
          "label": "Perfect. I love a night show."
        },
        {
          "value": "separate",
          "label": "Sure, away from my bedroom."
        },
        {
          "value": "sleep",
          "label": "I'd prefer a daytime companion."
        }
      ]
    }
  ]
};
if(typeof module!=='undefined')module.exports=PET_DATA;
