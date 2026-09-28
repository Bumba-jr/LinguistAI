// B1 lectures part 1 — Passé Composé vs Imparfait, Conditional & Politeness,
// Relative Pronouns. Same gold-standard format as the approved A1:greetings
// template: full lesson + traps + homework (A–D) + checklistRemedial + glossary
// (spread over BASE_GLOSSARY). Extras (warm-up, verb tables, use cases,
// shadowing) live in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── B1 · Passé Composé vs Imparfait ─────────────────────────────────────────
const b1PasseVsImparfait: StaticFrenchLesson = {
    title: 'Passé Composé vs Imparfait',
    objective: 'Choose correctly between the two past tenses — the single most tested grammar point of the TCF — by reading the time markers in the sentence, and tell a full story that mixes background (imparfait) and events (passé composé).',

    vocabulary: [
        { fr: 'tout à coup', en: 'all of a sudden (triggers passé composé)', pron: 'too tah KOO', register: 'neutral', example: { fr: 'Tout à coup, le téléphone a sonné.', en: 'All of a sudden, the phone rang.' }, related: [{ fr: 'soudain', en: 'suddenly' }] },
        { fr: 'chaque jour', en: 'every day (triggers imparfait for habits)', pron: 'shahk ZHOOR', register: 'neutral', example: { fr: 'Chaque jour, je jouais dehors.', en: 'Every day I used to play outside.' }, related: [{ fr: 'chaque été', en: 'every summer' }] },
        { fr: 'd\u2019habitude', en: 'usually (imparfait)', pron: 'dah-bee-TÜD', register: 'neutral', example: { fr: 'D\u2019habitude, il neigeait en janvier.', en: 'Usually it snowed in January.' }, related: [{ fr: 'généralement', en: 'generally' }] },
        { fr: 'pendant que', en: 'while (both clauses often imparfait)', pron: 'pahn-DAHN kuh', register: 'neutral', example: { fr: 'Pendant que je lisais, il dormait.', en: 'While I was reading, he was sleeping.' }, related: [{ fr: 'au moment où', en: 'at the moment when' }] },
        { fr: 'un jour', en: 'one day (triggers passé composé)', pron: 'uhn ZHOOR', register: 'neutral', example: { fr: 'Un jour, j\u2019ai rencontré mon idole.', en: 'One day, I met my idol.' }, related: [{ fr: 'une fois', en: 'once' }] },
        { fr: 'il y avait', en: 'there was / there were (imparfait of il y a)', pron: 'eel yah-VEH', register: 'neutral', example: { fr: 'Il y avait beaucoup de monde.', en: 'There were a lot of people.' }, related: [{ fr: 'il y a eu', en: 'there was (PC — an event)' }] },
        { fr: 'c\u2019était', en: 'it was (imparfait of c\u2019est)', pron: 'say-TEH', register: 'neutral', example: { fr: 'C\u2019était magnifique !', en: 'It was magnificent!' }, related: [{ fr: 'c\u2019a été', en: 'it has been (PC, spoken)' }] },
        { fr: 'raconter', en: 'to tell (a story)', pron: 'rah-kohn-TAY', register: 'neutral', example: { fr: 'Il m\u2019a raconté toute l\u2019histoire.', en: 'He told me the whole story.' }, related: [{ fr: 'l\u2019histoire', en: 'the story / history' }] },
        { fr: 'soudain', en: 'suddenly (triggers passé composé)', pron: 'soo-DAN', register: 'neutral', example: { fr: 'Soudain, elle s\u2019est mise à pleurer.', en: 'Suddenly, she started crying.' }, related: [{ fr: 'tout à coup', en: 'all of a sudden' }] },
        { fr: 'la scène', en: 'the scene / setting', pron: 'lah SEN', gender: 'feminine', register: 'neutral', example: { fr: 'Décris la scène à l\u2019imparfait.', en: 'Describe the scene in the imparfait.' }, related: [{ fr: 'le décor', en: 'the setting' }] },
        { fr: 'l\u2019interruption', en: 'the interruption', pron: 'lan-teh-rüp-SYOHN', gender: 'feminine', register: 'neutral', example: { fr: 'Quand le PC interrompt l\u2019imparfait…', en: 'When the PC interrupts the imparfait…' }, related: [{ fr: 'interrompre', en: 'to interrupt' }] },
        { fr: 'la habitude → l\u2019habitude', en: 'the habit', pron: 'lah-bee-TÜD', gender: 'feminine', register: 'neutral', example: { fr: 'Les habitudes prennent l\u2019imparfait.', en: 'Habits take the imparfait.' }, related: [{ fr: 'avoir l\u2019habitude de', en: 'to be used to' }] },
    ],

    pronunciation: [
        { fr: 'c\u2019était', approx: 'say-TEH', en: 'the liaison glues c\u2019 + était: two syllables "say-TEH"' },
        { fr: 'il y avait', approx: 'eel yah-VEH', en: 'three words, two syllables — y glides into avait' },
        { fr: 'je jouais', approx: 'zhuh zhoo-WEH', en: 'imparfait ending -ais sounds "eh", never "ez"' },
        { fr: 'il a sonné', approx: 'eel ah soh-NAY', en: 'PC: helper a (one beat) + participle stressed' },
        { fr: 'pendant que', approx: 'pahn-DAHN kuh', en: 'the second -ant is nasal but shorter' },
        { fr: 'tout à coup', approx: 'too tah KOO', en: 'coup = "koo" — final p is silent' },
    ],

    grammar: {
        rule: 'Imparfait paints the background (description, habit, feeling, ongoing state); passé composé snaps the photo (one finished event). Time markers in the sentence tell you which to choose.',
        explanation: 'Think of a film: the imparfait is the scenery and the mood — the weather, the hour, what people were doing, what life was usually like. The passé composé is the action the camera cuts to — something that started and finished: a phone rang, she arrived, we decided. They almost always work together: "Il pleuvait (background) quand tu as appelé (event)." Clues for the imparfait: chaque, toujours, d\u2019habitude, souvent, tous les jours, pendant que, il y avait, aimer/penser/savoir in the past, age and weather in the past. Clues for the passé composé: hier, soudain, tout à coup, un jour, une fois, deux fois, s\u2019asseoir/décider/arriver/partir, any count of "how many times". Verbs of state (être, avoir, savoir, penser, vouloir, pouvoir) naturally prefer the imparfait in the past; punctual verbs (se lever, partir, crier) prefer the PC — but only context decides.',
        examples: [
            { fr: 'Quand j\u2019étais petit, nous habitions à Québec.', en: 'When I was little, we lived in Quebec City.', breakdown: ['j\u2019étais = I was (state → imparfait)', 'nous habitions = we lived (ongoing → imparfait)', 'à Québec = in Quebec City'] },
            { fr: 'Chaque été, nous allions au lac.', en: 'Every summer we used to go to the lake.', breakdown: ['chaque été = every summer (habit marker)', 'nous allions = we went / used to go (imparfait)'] },
            { fr: 'Il pleuvait. Soudain, le téléphone a sonné.', en: 'It was raining. Suddenly, the phone rang.', breakdown: ['il pleuvait = it was raining (background)', 'soudain = suddenly (event marker)', 'a sonné = rang (finished event → PC)'] },
            { fr: 'Je lisais quand tu as téléphoné.', en: 'I was reading when you phoned.', breakdown: ['je lisais = I was reading (ongoing)', 'quand = when', 'as téléphoné = phoned (event interrupts)'] },
            { fr: 'Hier, j\u2019ai joué au tennis une fois.', en: 'Yesterday I played tennis once.', breakdown: ['hier = yesterday (event marker)', 'une fois = once (countable → PC)'] },
            { fr: 'Il était tard et nous étions fatigués.', en: 'It was late and we were tired.', breakdown: ['il était = it was (state)', 'nous étions = we were (state)'] },
        ],
        commonMistakes: [
            'Using the imparfait for a counted event: "Hier, je jouais au tennis" means you were playing it when something happened — for the one-off match say "j\u2019ai joué".',
            'Using the PC for habit: "Chaque jour, j\u2019ai joué dehors" is wrong for a childhood habit — chaque + repeated period → imparfait (je jouais).',
            'Mixing the endings: j\u2019avais / j\u2019ai eu, il était / il a été — the PC of être is eu/été, do not blend the two systems.',
            'Forgetting that pendant que, quand and comme can join one imparfait (background) to one PC (event): "Pendant que je dormais, il est entré."',
        ],
    },

    transformations: [
        { type: 'Habit (imparfait)', fr: 'Le samedi, je jouais au hockey.', en: 'On Saturdays I used to play hockey.' },
        { type: 'One event (PC)', fr: 'Samedi dernier, j\u2019ai joué un match.', en: 'Last Saturday I played one match.' },
        { type: 'Background', fr: 'Il neigeait et il faisait froid.', en: 'It was snowing and it was cold.' },
        { type: 'Event inside it', fr: 'Soudain, il s\u2019est mis à neiger très fort.', en: 'Suddenly it started snowing hard.' },
        { type: 'Interruption', fr: 'Je dormais quand l\u2019alarme a sonné.', en: 'I was sleeping when the alarm rang.' },
        { type: 'Two backgrounds', fr: 'Pendant que je lisais, il écoutait de la musique.', en: 'While I read, he listened to music.' },
        { type: 'Two events', fr: 'D\u2019abord il a sonné, puis il a attendu.', en: 'First he rang, then he waited.' },
        { type: 'State vs change', fr: 'Elle était contente ; elle a souri.', en: 'She was happy; she smiled.' },
    ],

    sentenceBuilding: [
        { fr: 'Quand j\u2019étais petit, j\u2019avais un chien.', en: 'When I was little, I had a dog.' },
        { fr: 'Quand j\u2019étais petit, j\u2019avais un chien qui s\u2019appelait Rex.', en: 'When I was little, I had a dog called Rex.' },
        { fr: 'Quand j\u2019étais petit, j\u2019avais un chien qui s\u2019appelait Rex et chaque soir, il dormait dans ma chambre.', en: 'When I was little, I had a dog called Rex, and every evening he slept in my room.' },
        { fr: 'Un soir, il a disparu. J\u2019ai cherché partout et je me suis mis à pleurer.', en: 'One evening he disappeared. I searched everywhere and started crying.' },
        { fr: 'Le lendemain matin, un voisin a frappé à la porte avec Rex dans les bras — c\u2019était le plus beau jour de mon enfance.', en: 'The next morning, a neighbour knocked on the door with Rex in his arms — it was the best day of my childhood.' },
    ],

    practice: [
        { instruction: 'Choose the tense:', question: 'Quand j\u2019______ (être) petit…', answer: 'étais — state in the past → imparfait' },
        { instruction: 'Choose the tense:', question: 'Hier, elle ______ (aller) au marché.', answer: 'est allée — one finished trip → PC (être verb + agreement)' },
        { instruction: 'Choose the tense:', question: 'Chaque hiver, il ______ (neiger) beaucoup.', answer: 'neigeait — habitual weather → imparfait' },
        { instruction: 'Interruption combo:', question: 'Je ______ (dormir) quand il ______ (entrer).', answer: 'dormais… est entré — background imparfait + event PC' },
        { instruction: 'Choose the tense:', question: 'Soudain, il ______ (commencer) à pleuvoir.', answer: 'a commencé — soudain → PC' },
        { instruction: 'Choose the tense:', question: 'Nous ______ (savoir) déjà la réponse.', answer: 'savions — state verb → imparfait' },
    ],

    translationPractice: [
        { en: 'When I was young, we lived in a small town.', fr: 'Quand j\u2019étais jeune, nous habitions dans une petite ville.' },
        { en: 'It was raining when I left the house.', fr: 'Il pleuvait quand j\u2019ai quitté la maison.' },
        { en: 'Every summer, we went to the lake.', fr: 'Chaque été, nous allions au lac.' },
        { en: 'Yesterday, I played tennis for two hours.', fr: 'Hier, j\u2019ai joué au tennis pendant deux heures.' },
        { en: 'She was tired, so she went to bed early.', fr: 'Elle était fatiguée, alors elle s\u2019est couchée tôt.' },
        { en: 'Suddenly, the lights went out.', fr: 'Soudain, les lumières se sont éteintes.' },
    ],

    reverseTranslation: [
        { fr: 'Il y avait beaucoup de monde au parc.', en: 'There were a lot of people in the park.' },
        { fr: 'Quand tu as appelé, je faisais la cuisine.', en: 'When you called, I was cooking.' },
        { fr: 'Chaque matin, elle prenait le même bus.', en: 'Every morning she took the same bus.' },
        { fr: 'Un jour, j\u2019ai compris la leçon.', en: 'One day, I understood the lesson.' },
    ],

    register: {
        informal: 'C\u2019était génial, on jouait dehors toute la journée ! (spoken: on + imparfait for "we used to")',
        neutral: 'Quand j\u2019étais étudiant, je travaillais le soir et j\u2019étudiais le matin.',
        formal: 'À cette époque-là, le gouvernement apportait son soutien aux familles nombreuses. (à cette époque-là = formal "back then")',
    },

    culture: 'Storytelling is a TCF speaking task: the examiner asks about a past experience (racontez un souvenir). The scoring grid rewards the background/event mix: weather, time, and feelings in the imparfait; the decisive moments in the passé composé. In spoken Quebec French the imparfait covers some events ("j\u2019étais allé" style constructions differ), but for the exam keep the standard division — it is what the grid measures.',

    freeProduction: 'Tell the story of a memorable day from your childhood or last year (8–10 sentences). Open with the scene (il était…, il faisait…, je …ais), then give at least three events (soudain…, un moment…, enfin…). Guiding questions: Where were you? Who was there? What was happening around you? What happened first, then what? How did it end and how did you feel?',

    miniTest: [
        { question: 'Chaque jour, il ______ du café.', options: ['a bu', 'buvait', 'est bu', 'boit'], answer: 'buvait — habit → imparfait' },
        { question: 'Soudain, le téléphone ______.', options: ['sonnait', 'a sonné', 'sonne', 'sonnera'], answer: 'a sonné — sudden event → PC' },
        { question: 'Je ______ quand tu as frappé.', options: ['lisais', 'ai lu', 'lirai', 'lis'], answer: 'lisais — ongoing action interrupted' },
        { question: 'Il y ______ beaucoup de neige cet hiver-là.', options: ['a', 'avait', 'a eu', 'aura'], answer: 'avait — description of the scene' },
        { question: 'Hier, nous ______ un film génial.', options: ['voyions', 'voyons', 'avons vu', 'verrons'], answer: 'avons vu — one finished event' },
    ],

    review: [
        'The imparfait engine (nous-stem + -ais) and the PC machines (avoir/être + participle) come from A2 — this lecture is about CHOOSING, not forming.',
        'State verbs (être, avoir, savoir, penser, vouloir, pouvoir) lean imparfait; punctual verbs (partir, crier, se lever) lean PC.',
    ],

    traps: [
        'chaque / tous les + period → imparfait for habits; hier / un jour / deux fois → PC. Read the marker BEFORE choosing the tense.',
        'Quand + PC can interrupt an imparfait: je lisais quand tu as téléphoné — do not put both verbs in the same tense by default.',
        'Pendant + duration with a FINISHED event is PC (j\u2019ai attendu pendant deux heures); with a still-running state it is present + depuis.',
        'Il y avait (there was — scene) vs il y a eu (there was — event): "Il y a eu un accident" (PC) but "Il y avait du brouillard" (imparfait).',
    ],

    homework: {
        intro: 'Every item forces the background/event choice. Read the time marker first, then pick imparfait or PC — and make the agreement when être is involved.',
        translation: [
            { prompt: 'When I was little, we lived in Montreal.', answer: 'Quand j\u2019étais petit(e), nous habitions à Montréal.', alt: ['Quand j\u2019étais petit, nous habitions à Montréal'], explanation: 'étais and habitions are states/background → imparfait. Both clauses describe, neither is an event.' },
            { prompt: 'Yesterday I played hockey.', answer: 'Hier, j\u2019ai joué au hockey.', alt: ['Hier j\u2019ai joué au hockey'], explanation: 'hier marks one finished occasion → PC. jouer takes avoir; no agreement with avoir.' },
            { prompt: 'It was snowing when she arrived.', answer: 'Il neigeait quand elle est arrivée.', explanation: 'Weather = background imparfait (neigeait); arriving = event (est arrivée, être verb, +e agreement).' },
            { prompt: 'Every evening, she read a book.', answer: 'Chaque soir, elle lisait un livre.', alt: ['Chaque soir elle lisait un livre'], explanation: 'chaque + repeated period = habit → imparfait. Compare: "Cette nuit-là, elle a lu deux chapitres." (event).' },
            { prompt: 'While I was cooking, he was setting the table.', answer: 'Pendant que je faisais la cuisine, il mettait le couvert.', explanation: 'Two simultaneous backgrounds → both imparfait. mettre → mettait; faire → faisais.' },
            { prompt: 'Suddenly, everyone started to laugh.', answer: 'Soudain, tout le monde s\u2019est mis à rire.', explanation: 'soudain → PC. se mettre à = to start; reflexive → être: s\u2019est mis (masc singular).' },
            { prompt: 'I was tired, so I went home.', answer: 'J\u2019étais fatigué(e), alors je suis rentré(e) chez moi.', alt: ['J\u2019étais fatiguée, alors je suis rentrée chez moi'], explanation: 'Feeling = imparfait (étais); leaving = event with être (suis rentré(e) — agreement with the subject).' },
            { prompt: 'There was a lot of traffic, so we took the metro.', answer: 'Il y avait beaucoup de circulation, alors nous avons pris le métro.', alt: ['Il y avait beaucoup de monde, alors nous avons pris le métro'], explanation: 'il y avait = scene (imparfait); prendre → pris, one decision → PC (avons pris).' },
        ],
        blanks: [
            { prompt: 'Quand j\u2019______ (être) étudiant, je ______ (travailler) le soir.', answer: 'étais… travaillais', alt: ['etais, travaillais'], explanation: 'Two habits/states of a past period → imparfait on both sides.' },
            { prompt: 'Il ______ (pleuvoir) quand nous ______ (sortir).', answer: 'pleuvait… sommes sortis', alt: ['pleuvait, sommes sorti'], explanation: 'Weather background → pleuvait; one event → PC with être: sommes sorti(e)s.' },
            { prompt: 'Chaque matin, elle ______ (prendre) le bus 42.', answer: 'prenait', explanation: 'Habit → imparfait. prendre loses its -d in the nous-form (prenons) → stem pren-: prenait.' },
            { prompt: 'Soudain, il ______ (y avoir) un bruit terrible.', answer: 'y a eu', alt: ["a eu"], explanation: 'A sudden occurrence is an EVENT: il y a eu (PC). "il y avait" would describe the scene instead.' },
            { prompt: 'Pendant que tu ______ (dormir), j\u2019______ (finir) le rapport.', answer: 'dormais… ai fini', alt: ['dormais, j’ai fini'], explanation: 'Your sleeping = ongoing background; my finishing = a completed event. The classic 1-imparfait-1-PC pair.' },
            { prompt: 'Nous ______ (être) content(e)s quand vous ______ (arriver).', answer: 'étions… êtes arrivés', alt: ['étions, êtes arrivées'], explanation: 'Feeling → imparfait; the arrival event → PC with être and agreement: arrivés / arrivées.' },
        ],
        corrections: [
            { prompt: 'Chaque jour, j\u2019ai joué au parc quand j\u2019étais enfant.', answer: 'Chaque jour, je jouais au parc quand j\u2019étais enfant.', explanation: 'How the mistake happens: treating a repeated action as an event. Why it does not work: chaque jour marks a HABIT — the imparfait is required. How to fix it: je jouais. Save the PC for counted occasions (deux fois, hier).' },
            { prompt: 'Hier, je regardais un film avec des amis.', answer: 'Hier, j\u2019ai regardé un film avec des amis.', explanation: 'How the mistake happens: using imparfait as a default past. Why it does not work: hier + a one-off viewing is an EVENT. How to fix it: j\u2019ai regardé. The imparfait would mean "I was watching it when something happened".' },
            { prompt: 'Il pleuvait quand elle arrivait à la gare.', answer: 'Il pleuvait quand elle est arrivée à la gare.', explanation: 'How the mistake happens: putting both verbs in imparfait. Why it does not work: arriving is the EVENT that interrupts the scene. How to fix it: elle est arrivée (PC + être + agreement).' },
            { prompt: 'J\u2019ai eu fatigué, alors j\u2019ai dormi.', answer: 'J\u2019étais fatigué, alors je me suis endormi / je suis allé me coucher.', explanation: 'How the mistake happens: using avoir PC where a state is needed. Why it does not work: fatigue is a STATE → être imparfait (j\u2019étais fatigué). How to fix it: keep the event (s\u2019endormir) in PC, the state in imparfait.' },
            { prompt: 'Il y a eu beaucoup de neige pendant mon enfance.', answer: 'Il y avait beaucoup de neige pendant mon enfance.', explanation: 'How the mistake happens: assuming a past period needs PC. Why it does not work: pendant mon enfance describes a long scene, not an event. How to fix it: il y avait. Compare: "Il y a eu une tempête la semaine dernière." (one event).' },
        ],
        writing: {
            task: 'Tell the story of one memorable day (8–12 sentences): open with the scene in the imparfait (weather, place, who was there, what was happening), then give three or four events in the passé composé, and close with a feeling in the imparfait (c\u2019était…).',
            requirements: [
                'Opening scene: at least three imparfait verbs (était, faisait, …ait)',
                'At least four passé composé events, one with être auxiliary',
                'One interruption structure (imparfait quand PC)',
                'One time marker from each family (chaque/toujours… vs soudain/hier…)',
                'Closing feeling: c\u2019était + adjective',
            ],
            minWords: 80,
        },
        checklist: [
            'I can say what the imparfait does (background, habit, description) and what the PC does (event)',
            'I spot the markers: chaque/tous les/d\u2019habitude → imparfait; hier/un jour/soudain/deux fois → PC',
            'I build the interruption: imparfait quand + PC',
            'I know il y avait (scene) vs il y a eu (event)',
            'I keep agreement with être verbs in the PC (est arrivée, sont partis)',
            'I can tell a two-minute story aloud mixing both tenses',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Imparfait = the camera that films the scenery: descriptions, weather, time, age, feelings, states of mind, habits, and anything ongoing. PC = the camera that cuts to action: something started and finished.',
            examples: [
                { fr: 'Il faisait froid. Les gens attendaient. Soudain, le train est arrivé.', en: 'scene, scene, event — the film pattern' },
            ],
        },
        {
            explanation: 'Marker families: IMPARFAIT — chaque jour, tous les matins, d\u2019habitude, souvent, toujours, pendant que, autrefois. PC — hier, la semaine dernière, un jour, une fois, deux fois, soudain, tout à coup, enfin.',
            examples: [
                { fr: 'Chaque soir, je lisais. / Hier soir, j\u2019ai lu.', en: 'same verb, different marker, different tense' },
            ],
        },
        {
            explanation: 'The interruption pattern: the ongoing action is imparfait, the interrupting event is PC: je dormais (was sleeping) quand l\u2019alarme a sonné (rang). quand, pendant que, comme are the joins.',
            examples: [
                { fr: 'Je sortais de la maison quand il a commencé à pleuvoir.', en: 'I was leaving the house when it started to rain.' },
            ],
        },
        {
            explanation: 'il y avait vs il y a eu: the imparfait form describes what existed in the scene (il y avait du brouillard); the PC form reports that something happened (il y a eu un accident).',
            examples: [
                { fr: 'Il y avait une longue file. → Il y a eu une alerte.', en: 'there was a long queue → there was an alert' },
            ],
        },
        {
            explanation: 'Agreement survives inside stories: PC + être agrees (elle est arrivée à huit heures), PC + avoir does not (elle a fini son thé), unless a preceding direct object (le thé qu\u2019elle a bu).',
            examples: [
                { fr: 'Elles étaient arrivées tôt et avaient déjà mangé.', en: 'pluperfect preview — same agreement logic' },
            ],
        },
        {
            explanation: 'Story skeleton for the speaking exam: scene (il était une fois-style: il faisait, j\u2019avais, nous habitions) → markers (chaque jour…) → event (soudain, j\u2019ai…) → reaction (j\u2019étais content) → closing (enfin, nous avons décidé…).',
            examples: [
                { fr: 'Enfin, nous avons décidé de rentrer et c\u2019était le bon choix.', en: 'closing event + closing feeling' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'neigeait': { en: 'was snowing (imparfait of neiger)', pron: 'neh-ZHEH', type: 'verb', note: 'background weather → imparfait' },
        'pleuvait': { en: 'was raining (imparfait of pleuvoir)', pron: 'pluh-VEH', type: 'verb', note: 'pleuvoir is irregular: il pleut → imparfait pleuvait' },
        'lisais': { en: 'was reading (imparfait of lire)', pron: 'lee-ZEH', type: 'verb', note: 'lire → lis- + imparfait endings' },
        'dormais': { en: 'was sleeping (imparfait of dormir)', pron: 'dor-MEH', type: 'verb', note: 'dormir → dorm- + imparfait' },
        'prenait': { en: 'was taking / used to take (imparfait of prendre)', pron: 'pruh-NEH', type: 'verb', note: 'nous prenons gives the stem pren-' },
        'mettait': { en: 'was putting (imparfait of mettre)', pron: 'muh-TEH', type: 'verb', note: 'nous mettons gives the stem mett-' },
        'arrivée': { en: 'arrived (fem — PC of arriver)', pron: 'ah-ree-VAY', type: 'verb', note: 'être verb → agreement: arrivé, arrivée, arrivés, arrivées' },
        's\u2019est mis à': { en: 'started to (PC reflexive of se mettre à)', pron: 'seh mee ah', type: 'verb', note: 'se mettre à + infinitive = to start doing' },
        's\u2019est éteintes': { en: 'went out (fem pl — PC of s\u2019éteindre)', pron: 'seh zay-TENT', type: 'verb', note: 'lights go out → reflexive être verb, plural agreement' },
        'rencontré': { en: 'met (PC of rencontrer)', pron: 'rahn-kohn-TRAY', type: 'verb', note: 'rencontrer takes avoir' },
        'disparu': { en: 'disappeared (PC of disparaître)', pron: 'dees-pah-RÜ', type: 'verb', note: 'disparaître takes être: il a disparu is wrong — il est disparu' },
        'bruit': { en: 'noise', pron: 'BRÜEE', gender: 'masculine', plural: 'bruits', type: 'noun', note: 'faire du bruit = to make noise' },
        'circulation': { en: 'traffic', pron: 'seer-kü-lah-SYOHN', gender: 'feminine', type: 'noun' },
        'lumières': { en: 'lights', pron: 'lü-MYEHR', gender: 'feminine', plural: '— (plural form)', type: 'noun', note: 'singular: la lumière' },
        'enfance': { en: 'childhood', pron: 'ahn-FAHNSS', gender: 'feminine', type: 'noun', note: 'durant mon enfance = during my childhood' },
        'raconter': { en: 'to tell (a story)', pron: 'rah-kohn-TAY', type: 'verb', example: { fr: 'Raconte-moi l\u2019histoire.', en: 'Tell me the story.' } },
    },
};

// ── B1 · Conditional & Politeness ───────────────────────────────────────────
const b1Conditionnel: StaticFrenchLesson = {
    title: 'Conditional & Politeness',
    objective: 'Use the conditional to be polite (je voudrais, pourriez-vous), give advice (tu devrais), express wishes (j\u2019aimerais), and build the si + imparfait → conditional hypothetical — the register upgrade from A2 that B1 graders listen for.',

    vocabulary: [
        { fr: 'je voudrais', en: 'I would like (polite want)', pron: 'zhuh voo-DREH', type: 'verb', register: 'formal', example: { fr: 'Je voudrais un thé, s\u2019il vous plaît.', en: 'I would like a tea, please.' }, related: [{ fr: 'je veux', en: 'I want (blunt)' }] },
        { fr: 'pourriez-vous', en: 'could you (formal request)', pron: 'poo-ree voo', type: 'verb', register: 'formal', example: { fr: 'Pourriez-vous m\u2019aider ?', en: 'Could you help me?' }, related: [{ fr: 'pourrais-tu', en: 'could you (informal)' }] },
        { fr: 'j\u2019aimerais', en: 'I would love / like', pron: 'zhem-REH', type: 'verb', register: 'neutral', example: { fr: 'J\u2019aimerais visiter le Japon.', en: 'I would love to visit Japan.' }, related: [{ fr: 'j\u2019aimerais bien', en: 'I\u2019d quite like to' }] },
        { fr: 'il faudrait', en: 'it would be necessary (softened)', pron: 'eel foh-DREH', type: 'verb', register: 'neutral', example: { fr: 'Il faudrait partir tôt.', en: 'We would need to leave early.' }, related: [{ fr: 'il faut', en: 'it is necessary (hard)' }] },
        { fr: 'tu devrais', en: 'you should (advice)', pron: 'tü duh-VREH', type: 'verb', register: 'neutral', example: { fr: 'Tu devrais dormir plus.', en: 'You should sleep more.' }, related: [{ fr: 'vous devriez', en: 'you should (formal/plural)' }] },
        { fr: 'on pourrait', en: 'we could (suggestion)', pron: 'ohn poo-REH', type: 'verb', register: 'neutral', example: { fr: 'On pourrait manger dehors ?', en: 'Could we eat outside?' }, related: [{ fr: 'ça te dirait de…?', en: 'how about…? (casual)' }] },
        { fr: 'si j\u2019avais', en: 'if I had (hypothetical)', pron: 'see zhah-VEH', type: 'phrase', register: 'neutral', example: { fr: 'Si j\u2019avais le temps, je t\u2019aiderais.', en: 'If I had time, I would help you.' }, related: [{ fr: 'si j\u2019étais', en: 'if I were' }] },
        { fr: 'ça m\u2019arrangerait', en: 'that would suit me / work for me', pron: 'sah mah-rahnzh-REH', type: 'expression', register: 'neutral', example: { fr: 'Ça m\u2019arrangerait de venir à 18 h.', en: 'Coming at 6 pm would work for me.' }, related: [{ fr: 'ça me conviendrait', en: 'that would suit me (formal)' }] },
        { fr: 'hélas / malheureusement', en: 'alas / unfortunately', pron: 'ay-LAHS / mah-luh-ruh-ZUH-MAHN', register: 'neutral', example: { fr: 'Malheureusement, je serai absent.', en: 'Unfortunately, I will be away.' }, related: [{ fr: 'dommage', en: 'too bad' }] },
        { fr: 'le souhait', en: 'the wish', pron: 'luh soo-EH', gender: 'masculine', register: 'neutral', example: { fr: 'C\u2019est mon plus grand souhait.', en: 'It\u2019s my greatest wish.' }, related: [{ fr: 'souhaiter', en: 'to wish' }] },
        { fr: 'la politesse', en: 'politeness', pron: 'poh-lee-TESS', gender: 'feminine', register: 'neutral', example: { fr: 'Le conditionnel est la clé de la politesse.', en: 'The conditional is the key to politeness.' }, related: [{ fr: 'poliment', en: 'politely' }] },
        { fr: 'au cas où', en: 'in case', pron: 'oh kah OO', register: 'neutral', example: { fr: 'Prends un parapluie, au cas où.', en: 'Take an umbrella, just in case.' }, related: [{ fr: 'par précaution', en: 'as a precaution' }] },
    ],

    pronunciation: [
        { fr: 'je voudrais', approx: 'zhuh voo-DREH', en: 'final -ais = "eh"; do not pronounce the s' },
        { fr: 'pourriez-vous', approx: 'poo-ree-AY voo', en: 'the -riez ending rhymes with "day"' },
        { fr: 'j\u2019aimerais', approx: 'zhem-REH', en: 'two syllables: zhuh-MREH in fast speech' },
        { fr: 'il faudrait', approx: 'eel foh-DREH', en: 'faudr- + ait; the d is soft' },
        { fr: 'si j\u2019avais', approx: 'see zhah-VEH', en: 'si never elides; the pair rhymes' },
        { fr: 'je voyagerais', approx: 'zhuh vwah-yahzh-REH', en: 'stem keeps the e: voyag-ER-ais' },
    ],

    grammar: {
        rule: 'Conditional = futur stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient). Use it for politeness, wishes, advice, and hypotheticals with si + imparfait.',
        explanation: 'The conditional looks like the future crossed with the imparfait: take the futur simple stem (parlerai → parler-; irregular stems ser-, aur-, ir-, fer-, viendr-, voudr-, pourr-, devr-, faudr-) and add the imparfait endings. Je voudrais (I would like) is the politeness workhorse — it softens je veux. Pourriez-vous…? is the formal request opener. Tu devrais… = advice. J\u2019aimerais… = wishes. For hypotheticals, French splits the si-sentence: SI + imparfait, THEN conditional — si j\u2019avais de l\u2019argent, je voyagerais (if I had money, I would travel). Never put the conditional directly after si: "si j\u2019aurais" is the classic B1 killer. The other two si-patterns: si + présent → futur (si j\u2019ai le temps, je viendrai) and si + PC → futur du passé in narrative.',
        examples: [
            { fr: 'Je voudrais réserver une table pour deux.', en: 'I would like to book a table for two.', breakdown: ['je voudrais = I would like (vouloir → voudr-)', 'réserver = to book (infinitive after conditional)', 'pour deux = for two'] },
            { fr: 'Pourriez-vous répéter, s\u2019il vous plaît ?', en: 'Could you repeat, please?', breakdown: ['pourriez = could (pouvoir, formal vous)', '-vous = you', 'répéter = to repeat'] },
            { fr: 'Si j\u2019avais plus de temps, j\u2019apprendrais l\u2019italien.', en: 'If I had more time, I would learn Italian.', breakdown: ['si j\u2019avais = if I had (imparfait AFTER si!)', 'plus de temps = more time', 'j\u2019apprendrais = I would learn (conditional)'] },
            { fr: 'Tu devrais essayer ce restaurant.', en: 'You should try this restaurant.', breakdown: ['tu devrais = you should (devoir conditional)', 'essayer = to try', 'ce restaurant = this restaurant'] },
            { fr: 'On pourrait partir plus tôt demain.', en: 'We could leave earlier tomorrow.', breakdown: ['on pourrait = we could', 'partir = to leave', 'plus tôt = earlier'] },
            { fr: 'À votre place, j\u2019accepterais l\u2019offre.', en: 'In your place, I would accept the offer.', breakdown: ['à votre place = in your position (implicit si)', 'j\u2019accepterais = I would accept'] },
        ],
        commonMistakes: [
            '"Si j\u2019aurais le temps…" — NEVER conditional after si. Si takes imparfait (si j\u2019avais), the conditional lives in the other half (je viendrais).',
            'Forgetting the futur-irregular stems: je voudrais (not je vouloirais), je serais (not je êtreais), j\u2019irais (not je allerais).',
            'Using je veux for requests: "Je veux un café" sounds blunt — je voudrais is the polite default and examiners notice.',
            'Mixing the si-patterns: si + présent → futur (si je peux, je viendrai); si + imparfait → conditional (si je pouvais, je viendrais). Do not cross them.',
        ],
    },

    transformations: [
        { type: 'Blunt', fr: 'Je veux partir tôt.', en: 'I want to leave early.' },
        { type: 'Polite', fr: 'Je voudrais partir tôt.', en: 'I would like to leave early.' },
        { type: 'Request (formal)', fr: 'Pourriez-vous m\u2019attendre ?', en: 'Could you wait for me?' },
        { type: 'Advice', fr: 'Tu devrais prendre ton vélo.', en: 'You should take your bike.' },
        { type: 'Wish', fr: 'J\u2019aimerais voir le Japon.', en: 'I would love to see Japan.' },
        { type: 'Si + présent → futur', fr: 'Si j\u2019ai le temps, je viendrai.', en: 'If I have time, I\u2019ll come.' },
        { type: 'Si + imparfait → cond.', fr: 'Si j\u2019avais le temps, je viendrais.', en: 'If I had time, I would come.' },
        { type: 'Softened necessity', fr: 'Il faudrait réserver à l\u2019avance.', en: 'We would need to book in advance.' },
    ],

    sentenceBuilding: [
        { fr: 'Si j\u2019avais un mois de vacances…', en: 'If I had a month of holidays…' },
        { fr: 'Si j\u2019avais un mois de vacances, je visiterais le Québec.', en: 'If I had a month of holidays, I would visit Quebec.' },
        { fr: 'Si j\u2019avais un mois de vacances, je visiterais le Québec et je louerais une maison au bord du fleuve.', en: 'If I had a month of holidays, I would visit Quebec and rent a house by the river.' },
        { fr: 'Si j\u2019avais un mois de vacances et une voiture, nous visiterions tout le pays ensemble.', en: 'If I had a month of holidays and a car, we would tour the whole country together.' },
        { fr: 'Bien sûr, si tout cela était possible, tu serais la bienvenue — il ne me manquerait que toi.', en: 'Of course, if all that were possible, you would be welcome — the only thing missing would be you.' },
    ],

    practice: [
        { instruction: 'Make it polite:', question: 'Je veux un café. →', answer: 'Je voudrais un café, s\u2019il vous plaît.' },
        { instruction: 'Give advice:', question: 'tu / devoir / dormir plus', answer: 'Tu devrais dormir plus.' },
        { instruction: 'Complete:', question: 'Si j\u2019______ (être) riche, j\u2019______ (acheter) une maison.', answer: 'étais… achèterais (acheter keeps the è: achèter-)' },
        { instruction: 'Choose the si-pattern:', question: 'Si tu ______ (pouvoir), tu m\u2019aiderais ?', answer: 'pouvais — hypothetical → imparfait after si' },
        { instruction: 'Formal request:', question: 'pouvoir-vous / répéter ?', answer: 'Pourriez-vous répéter, s\u2019il vous plaît ?' },
        { instruction: 'Wish:', question: 'je / aimer / visiter le Japon', answer: 'J\u2019aimerais visiter le Japon.' },
    ],

    translationPractice: [
        { en: 'I would like a coffee, please.', fr: 'Je voudrais un café, s\u2019il vous plaît.' },
        { en: 'Could you help me tomorrow?', fr: 'Pourriez-vous m\u2019aider demain ?' },
        { en: 'If I had a car, I would drive to work.', fr: 'Si j\u2019avais une voiture, j\u2019irais au travail en voiture.' },
        { en: 'You should take an umbrella.', fr: 'Tu devrais prendre un parapluie.' },
        { en: 'I would love to live by the sea.', fr: 'J\u2019aimerais vivre au bord de la mer.' },
        { en: 'That would suit me.', fr: 'Ça m\u2019arrangerait. / Ça me conviendrait.' },
    ],

    reverseTranslation: [
        { fr: 'On pourrait se voir jeudi ?', en: 'Could we meet on Thursday?' },
        { fr: 'Si j\u2019étais toi, je refuserais.', en: 'If I were you, I would refuse.' },
        { fr: 'Il faudrait confirmer avant vendredi.', en: 'We would need to confirm before Friday.' },
        { fr: 'Est-ce que ça vous dérangerait de fermer la porte ?', en: 'Would you mind closing the door?' },
    ],

    register: {
        informal: 'Ça te dirait d\u2019aller au ciné ? Je viendrais bien ! (je + conditional + bien = friendly yes)',
        neutral: 'Je voudrais savoir si vous serez disponible la semaine prochaine.',
        formal: 'Nous vous serions reconnaissants de bien vouloir nous répondre rapidement. (formal-letter conditional)',
    },

    culture: 'French service culture runs on the conditional: a shop assistant, a doctor, a bureaucrat all expect je voudrais and pourriez-vous — the imperative je veux can read as rude. In formal emails the conditional is everywhere: il me serait utile de…, nous vous saurions gré de… (we would be grateful). Master these and you sound B1 in writing as well as speech.',

    freeProduction: 'Write or record a "dream scenario" (8–10 sentences): Si j\u2019avais…, je…. Cover where you would live, what you would do, who you would see, what you would change. Then answer one real request politely: a colleague asks you to swap shifts — respond with je voudrais / ça m\u2019arrangerait / je ne pourrais pas.',

    miniTest: [
        { question: 'Complete: Si j\u2019______ le temps, je viendrais.', options: ['ai', 'aurai', 'avais', 'aurais'], answer: 'avais — si + imparfait' },
        { question: 'Polite way to order a coffee:', options: ['Je veux un café.', 'Je voudrais un café.', 'Je veux avoir un café.', 'J\u2019ai un café.'], answer: 'Je voudrais un café.' },
        { question: 'Conditional stem of être:', options: ['êt-', 'soy-', 'ser-', 'fut-'], answer: 'ser- — same stem as futur' },
        { question: 'Tu ______ partir plus tôt (advice).', options: ['dois', 'devrais', 'devras', 'as dû'], answer: 'devrais — advice = conditional of devoir' },
        { question: 'Si + présent takes…', options: ['conditional', 'futur', 'imparfait', 'subjonctif'], answer: 'futur — si j\u2019ai le temps, je viendrai' },
    ],

    review: [
        'The futur stems from A2 (ser-, aur-, ir-, fer-, voudr-, pourr-, devr-, viendr-) are reused unchanged by the conditional.',
        'Il faut from A2 softens to il faudrait; pouvoir/je peux softens to je pourrais — same verb, softer register.',
    ],

    traps: [
        'si + conditional NEVER exists: si j\u2019aurais / si j\u2019irais / si je voudrais are all wrong. Si takes imparfait for hypotheticals.',
        'acheter keeps its grave accent in the conditional: j\u2019achèterais (like j\u2019achèterai). Same for je préférerais, j\u2019appellerais (double l).',
        'je voudrais (I would like) vs je viendrai (I will come) — the -ais / -ai final syllable carries the whole meaning; do not rush it.',
        'On pourrait… ? is a real suggestion needing an answer — not a rhetorical question; respond with either oui (d\u2019accord) or a conditional refusal (je ne pourrais pas).',
    ],

    homework: {
        intro: 'The conditional in every section: politeness, advice, wishes, and the si + imparfait hypothetical. Watch the si-rule and the irregular stems.',
        translation: [
            { prompt: 'I would like to book a table for two.', answer: 'Je voudrais réserver une table pour deux.', explanation: 'vouloir → voudr- + -ais. The infinitive réserver follows, as with all modals.' },
            { prompt: 'Could you open the window?', answer: 'Pourriez-vous ouvrir la fenêtre ?', alt: ['Pourrais-tu ouvrir la fenêtre ?'], explanation: 'pouvoir → pourr- + -iez (vous formal). For one friend: pourrais-tu.' },
            { prompt: 'If I had more money, I would travel.', answer: 'Si j\u2019avais plus d\u2019argent, je voyagerais.', explanation: 'si + IMPARFAIT (avais), then conditional (voyagerais). Never si j\u2019aurais.' },
            { prompt: 'You should see a doctor.', answer: 'Tu devrais voir un médecin.', alt: ['Vous devriez voir un médecin'], explanation: 'devoir conditional = advice. voir is the infinitive after the modal.' },
            { prompt: 'We could meet on Friday.', answer: 'On pourrait se voir vendredi.', alt: ['Nous pourrions nous voir vendredi'], explanation: 'on pourrait = casual "we"; nous pourrions = formal. Reflexive se voir = to meet.' },
            { prompt: 'It would be necessary to leave at six.', answer: 'Il faudrait partir à six heures.', explanation: 'falloir has only il forms: il faut → il faudrait. The infinitive partit carries the meaning.' },
            { prompt: 'I would love to learn Spanish.', answer: 'J\u2019aimerais apprendre l\u2019espagnol.', alt: ['J’aimerais bien apprendre l’espagnol'], explanation: 'aimer conditional = wish. j\u2019aimerais bien softens it further ("I\u2019d quite like to").' },
            { prompt: 'That would suit me better.', answer: 'Ça m\u2019arrangerait mieux. / Ça me conviendrait mieux.', explanation: 'arranger (ça m\u2019arrange) is the everyday choice; convenir (ça me convient) is the formal one. Both conditionals.' },
        ],
        blanks: [
            { prompt: 'Si j\u2019______ (être) toi, je refuserais.', answer: 'étais', explanation: 'The si-half is imparfait: si j\u2019étais toi — "if I were you" uses être imparfait in both languages.' },
            { prompt: 'Je ______ (vouloir) un verre d\u2019eau, s\u2019il vous plaît.', answer: 'voudrais', explanation: 'vouloir → voudr- + -ais. THE polite ordering phrase.' },
            { prompt: 'Vous ______ (pouvoir) m\u2019attendre dix minutes ?', answer: 'pourriez', explanation: 'pouvoir → pourr- + -iez. A request softer than pouvez-vous.' },
            { prompt: 'Si nous avions une voiture, nous ______ (aller) à la plage.', answer: 'irions', explanation: 'aller → ir- + -ions. Irregular stem from the futur, imparfait ending.' },
            { prompt: 'Il ______ (falloir) réserver à l\u2019avance.', answer: 'faudrait', explanation: 'falloir is impersonal: il faudrait. Softer than il faut.' },
            { prompt: 'Si tu ______ (finir) plus tôt, on pourrait dîner ensemble.', answer: 'finissais', explanation: 'The si-half takes imparfait even in a mixed offer: finissais (fin-iss- stem from nous finissons).' },
        ],
        corrections: [
            { prompt: 'Si j\u2019aurais le temps, je viendrais.', answer: 'Si j\u2019avais le temps, je viendrais.', explanation: 'How the mistake happens: copying the conditional from the second half into the si-clause. Why it does not work: si NEVER carries the conditional — it takes imparfait for hypotheticals. How to fix it: si j\u2019avais… je viendrais.' },
            { prompt: 'Je veux un verre d\u2019eau, s\u2019il vous plaît.', answer: 'Je voudrais un verre d\u2019eau, s\u2019il vous plaît.', explanation: 'How the mistake happens: translating English "I want" word for word. Why it does not work: je veux + s\u2019il vous plaît clashes — the request stays blunt. How to fix it: je voudrais — the conditional IS the politeness.' },
            { prompt: 'Vous devrez m\u2019aider, s\u2019il vous plaît ?', answer: 'Pourriez-vous m\u2019aider, s\u2019il vous plaît ?', explanation: 'How the mistake happens: using future devoir (devrez = obligation) for a request. Why it does not work: devrez means "you will have to" — an order. How to fix it: pourriez-vous = could you.' },
            { prompt: 'Si tu pourrais venir, ça m\u2019arrangerait.', answer: 'Si tu pouvais venir, ça m\u2019arrangerait.', explanation: 'How the mistake happens: the same si-rule trap in disguise. Why it does not work: after si, hypothetical = imparfait. How to fix it: si tu pouvais. Alternative pattern without si: "Tu pourrais venir ? Ça m\u2019arrangerait."' },
            { prompt: 'Il faudra que tu devrais partir.', answer: 'Il faudrait partir tôt. / Tu devrais partir tôt.', explanation: 'How the mistake happens: stacking two obligation verbs. Why it does not work: falloir and devoir both express necessity — one is enough. How to fix it: il faudrait + infinitive, OR tu devrais + infinitive.' },
        ],
        writing: {
            task: 'Write a "dream life" paragraph (8–10 sentences) with at least four si + imparfait → conditional pairs (Si j\u2019avais…, je…), one piece of advice (tu devrais…), and one polite request (pourriez-vous…). Then write a two-sentence polite email asking to change an appointment.',
            requirements: [
                'Four si + imparfait → conditional pairs',
                'One advice sentence (tu devrais / vous devriez)',
                'One polite request (pourriez-vous / pourrais-je)',
                'One wish (j\u2019aimerais)',
                'No conditional anywhere after si',
            ],
            minWords: 70,
        },
        checklist: [
            'I form the conditional: futur stem + imparfait endings',
            'I know the irregular stems: ser-, aur-, ir-, fer-, voudr-, pourr-, devr-, faudr-, viendr-',
            'I use je voudrais / pourriez-vous for politeness instead of je veux / pouvez-vous',
            'I can build advice (tu devrais) and wishes (j\u2019aimerais)',
            'I never put the conditional after si — si + imparfait, conditional in the other half',
            'I distinguish si + présent → futur from si + imparfait → conditional',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Formation: take the FUTUR SIMPLE stem and add the IMPARFAIT endings -ais, -ais, -ait, -ions, -iez, -aient. parler → je parlerais; finir → je finirais; vendre → je vendrais.',
            examples: [
                { fr: 'je parlerais · tu parlerais · il parlerait · nous parlerions · vous parleriez · elles parleraient', en: 'one ending set, every verb' },
            ],
        },
        {
            explanation: 'Irregular stems are the futur\u2019s: ser-, aur-, ir-, fer-, viendr-, verr-, pourr-, voudr-, devr-, saur-, faudr-. The conditional never borrows the infinitive when the futur does not (je voudrais, NOT je vouloirais).',
            examples: [
                { fr: 'je serais · j\u2019aurais · j\u2019irais · je ferais · je viendrais · je voudrais', en: 'the big six' },
            ],
        },
        {
            explanation: 'The four jobs: politeness (je voudrais, pourriez-vous), wish (j\u2019aimerais), advice (tu devrais, il faudrait), hypothetical (si + imparfait → conditional).',
            examples: [
                { fr: 'Je voudrais réserver. · J\u2019aimerais visiter. · Tu devrais dormir. · Si j\u2019avais le temps, je viendrais.', en: 'one tense, four registers' },
            ],
        },
        {
            explanation: 'The si-system: si + présent → futur (real future: si je peux, je viendrai); si + imparfait → conditional (unreal now: si je pouvais, je viendrais). The conditional is BANNED right after si.',
            examples: [
                { fr: 'Si tu as le temps, appelle-moi. / Si tu avais le temps, tu m\u2019appellerais.', en: 'real vs unreal' },
            ],
        },
        {
            explanation: 'Spelling traps: acheter/achèter- keeps the è (j\u2019achèterais), appeler/appeller- doubles the l (j\u2019appellerais), préférer/préfér- (je préférerais). These follow their futur exactly.',
            examples: [
                { fr: 'j\u2019achèterais · j\u2019appellerais · je préférerais · j\u2019essaierais', en: 'the four accented/doubled stems' },
            ],
        },
        {
            explanation: 'Register ladder for requests: tu peux…? (friend) → pourrais-tu…? (careful) → pourriez-vous…? (formal) → auriez-vous l\u2019amabilité de…? (very formal, written). Match the level to the person.',
            examples: [
                { fr: 'Pourriez-vous m\u2019indiquer où se trouve la gare ?', en: 'the standard formal request' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'voudrais': { en: 'would like (conditional of vouloir)', pron: 'voo-DREH', type: 'verb', base: { form: 'vouloir', en: 'to want' }, note: 'THE politeness verb — je voudrais = I would like' },
        'pourriez': { en: 'could (formal plural — conditional of pouvoir)', pron: 'poo-ree-AY', type: 'verb', base: { form: 'pouvoir', en: 'can / to be able to' }, note: 'pourriez-vous…? = could you…?' },
        'pourrais': { en: 'could (I / you sing. — conditional of pouvoir)', pron: 'poo-REH', type: 'verb', base: { form: 'pouvoir', en: 'can / to be able to' }, note: 'je pourrais / pourrais-tu' },
        'aimerais': { en: 'would love / like (conditional of aimer)', pron: 'em-REH', type: 'verb', base: { form: 'aimer', en: 'to like / to love' }, note: 'j\u2019aimerais + infinitive = wish' },
        'faudrait': { en: 'would be necessary (conditional of falloir)', pron: 'foh-DREH', type: 'verb', base: { form: 'falloir', en: 'to be necessary' }, note: 'impersonal: il faudrait + infinitive' },
        'devrais': { en: 'should (conditional of devoir)', pron: 'duh-VREH', type: 'verb', base: { form: 'devoir', en: 'must / to have to' }, note: 'tu devrais = you should (advice)' },
        'serais': { en: 'would be (conditional of être)', pron: 'suh-REH', type: 'verb', base: { form: 'être', en: 'to be' }, note: 'futur stem ser- + imparfait endings' },
        'aurais': { en: 'would have (conditional of avoir)', pron: 'oh-REH', type: 'verb', base: { form: 'avoir', en: 'to have' }, note: 'si j\u2019avais… j\u2019aurais…' },
        'irais': { en: 'would go (conditional of aller)', pron: 'ee-REH', type: 'verb', base: { form: 'aller', en: 'to go' }, note: 'irregular stem ir-' },
        'viendrais': { en: 'would come (conditional of venir)', pron: 'vyen-DREH', type: 'verb', base: { form: 'venir', en: 'to come' }, note: 'irregular stem viendr-' },
        'arrangerait': { en: 'would suit (conditional of arranger)', pron: 'ah-rahnzh-REH', type: 'verb', base: { form: 'arranger', en: 'to arrange / suit' }, note: 'ça m\u2019arrange = that works for me' },
        'conviendrait': { en: 'would suit (formal — conditional of convenir)', pron: 'kohn-vyen-DREH', type: 'verb', base: { form: 'convenir', en: 'to suit' }, note: 'ça me conviendrait = that would suit me' },
        'dérangerait': { en: 'would bother (conditional of déranger)', pron: 'day-rahnzh-REH', type: 'verb', base: { form: 'déranger', en: 'to bother' }, note: 'ça vous dérangerait de…? = would you mind…?' },
        'reconnaissants': { en: 'grateful (masc pl)', pron: 'ruh-kon-neh-SAHN', gender: 'masculine', type: 'adjective', masc: { word: 'reconnaissant', en: 'grateful' }, fem: { word: 'reconnaissante', en: 'grateful' }, note: 'nous vous serions reconnaissants = we would be grateful' },
        'parapluie': { en: 'umbrella', pron: 'pah-rah-PLÜEE', gender: 'masculine', plural: 'parapluies', type: 'noun' },
        'bienvenue': { en: 'welcome', pron: 'byen-vuh-NÜ', gender: 'feminine', type: 'noun', note: 'tu serais la bienvenue = you would be welcome' },
    },
};

// ── B1 · Relative Pronouns ──────────────────────────────────────────────────
const b1Relatifs: StaticFrenchLesson = {
    title: 'Relative Pronouns',
    objective: 'Connect ideas into one fluid sentence with qui, que, dont and où — the four relative pronouns B1 graders expect — including which one to use after prepositions and how dont chains with de-verbs.',

    vocabulary: [
        { fr: 'qui', en: 'who / which — SUBJECT relative', pron: 'kee', type: 'particle', register: 'neutral', example: { fr: 'L\u2019homme qui parle est mon prof.', en: 'The man who is speaking is my teacher.' }, related: [{ fr: 'ce qui', en: 'what (subject of a clause)' }] },
        { fr: 'que', en: 'that / which / whom — OBJECT relative', pron: 'kuh', type: 'particle', register: 'neutral', example: { fr: 'Le film que j\u2019ai vu était génial.', en: 'The film I saw was great.' }, related: [{ fr: 'ce que', en: 'what (object of a clause)' }] },
        { fr: 'dont', en: 'whose / about which — DE-relative', pron: 'dohn', type: 'particle', register: 'neutral', example: { fr: 'Le film dont je parle est canadien.', en: 'The film I\u2019m talking about is Canadian.' }, related: [{ fr: 'parler de', en: 'to talk about' }] },
        { fr: 'où', en: 'where / when — place OR time', pron: 'oo', type: 'particle', register: 'neutral', example: { fr: 'La ville où je suis né… / Le jour où tu es arrivé…', en: 'The city where I was born… / The day you arrived…' }, related: [{ fr: 'partout où', en: 'everywhere that' }] },
        { fr: 'lequel / laquelle', en: 'which one — after prepositions', pron: 'luh-KEL / la-lah-KEL', register: 'neutral', example: { fr: 'La table sur laquelle j\u2019ai posé le livre…', en: 'The table on which I put the book…' }, related: [{ fr: 'auquel / auxquelles', en: 'à + which' }] },
        { fr: 'se souvenir de', en: 'to remember (→ dont)', pron: 'suh soo-vuh-NEER duh', type: 'verb', register: 'neutral', example: { fr: 'La chanson dont je me souviens…', en: 'The song I remember…' }, related: [{ fr: 'se rappeler', en: 'to recall (direct: que)' }] },
        { fr: 'avoir besoin de', en: 'to need (→ dont)', pron: 'ah-VWAIR buh-ZWAN duh', type: 'verb', register: 'neutral', example: { fr: 'Le document dont j\u2019ai besoin…', en: 'The document I need…' }, related: [{ fr: 'avoir envie de', en: 'to want (→ dont)' }] },
        { fr: 'le jour où', en: 'the day when', pron: 'luh ZHOOR oo', register: 'neutral', example: { fr: 'Le jour où on s\u2019est rencontrés…', en: 'The day we met…' }, related: [{ fr: 'l\u2019année où', en: 'the year when' }] },
        { fr: 'ce qui / ce que', en: 'what — when there is no noun before', pron: 'suh kee / suh kuh', type: 'phrase', register: 'neutral', example: { fr: 'Ce que tu dis est vrai. / Ce qui m\u2019étonne, c\u2019est…', en: 'What you say is true. / What surprises me is…' }, related: [{ fr: 'tout ce que', en: 'everything that' }] },
        { fr: 'une phrase', en: 'a sentence', pron: 'ün FRAHZ', gender: 'feminine', register: 'neutral', example: { fr: 'Relie les deux phrases en une.', en: 'Join the two sentences into one.' }, related: [{ fr: 'la proposition', en: 'the clause' }] },
        { fr: 'relier', en: 'to connect / join', pron: 'ruh-LYAY', type: 'verb', register: 'neutral', example: { fr: 'Relie ces idées avec dont.', en: 'Connect these ideas with dont.' }, related: [{ fr: 'un lien', en: 'a link' }] },
        { fr: 'l\u2019accord', en: 'the agreement', pron: 'lah-kor', gender: 'masculine', register: 'neutral', example: { fr: 'La ville que j\u2019ai visitée — accord!', en: 'The city I visited — agreement!' }, related: [{ fr: 'accorder', en: 'to agree (grammar)' }] },
    ],

    pronunciation: [
        { fr: 'qui / que', approx: 'kee / kuh', en: 'one syllable each — que elides to qu\u2019 before a vowel' },
        { fr: 'dont', approx: 'dohn', en: 'nasal final -nt, no d-sound at the end' },
        { fr: 'où', approx: 'oo', en: 'grave accent distinguishes it from ou (or)' },
        { fr: 'laquelle', approx: 'lah-KEL', en: 'stress on the second syllable' },
        { fr: 'ce que tu dis', approx: 'suh kuh tü DEE', en: 'both syllables shrink to "skuh" in fast speech' },
        { fr: 'le film que j\u2019ai vu', approx: 'luh film kuh zhay VÜ', en: 'que glides into j\u2019: "kuh-zhay"' },
    ],

    grammar: {
        rule: 'qui = subject of the relative clause; que = object; dont = replaces de + thing; où = place or time. The choice depends on what comes AFTER the pronoun inside the clause.',
        explanation: 'Look at the verb right after the gap. If a VERB follows, the missing piece is a subject → qui: l\u2019homme qui parle (the man [who is] speaking). If a NOUN SUBJECT follows the verb, the missing piece is an object → que: le film que j\u2019ai vu (the film [that] I saw). que elides to qu\u2019 before a vowel and drags the past participle into agreement with its fronted object: la ville que j\u2019ai visitée. dont replaces any de-phrase: parler de (le film dont je parle), se souvenir de (la chanson dont je me souviens), avoir besoin de (le document dont j\u2019ai besoin), être content de (la nouvelle dont il est content). où covers both where and when: la ville où, le jour où, l\u2019année où. When there is no noun before (standalone "what"), use ce qui (subject) / ce que (object): ce que tu dis est vrai.',
        examples: [
            { fr: 'La femme qui travaille ici est ma tante.', en: 'The woman who works here is my aunt.', breakdown: ['la femme = the woman (noun before)', 'qui = who — VERB follows (travaille)', 'est ma tante = is my aunt'] },
            { fr: 'Le livre que tu m\u2019as prêté est génial.', en: 'The book you lent me is great.', breakdown: ['le livre = the book', 'que = that — noun+verb follows (tu m\u2019as prêté)', 'prêté agrees: le livre… prêté (masc)'] },
            { fr: 'Le film dont tout le monde parle sort vendredi.', en: 'The film everyone is talking about comes out Friday.', breakdown: ['dont = about which (parler de)', 'tout le monde = everyone', 'sort = comes out (verb of the main clause)'] },
            { fr: 'La ville où je suis né est petite.', en: 'The city where I was born is small.', breakdown: ['où = where (place)', 'je suis né = I was born (être verb)'] },
            { fr: 'Le jour où tu es arrivé, il pleuvait.', en: 'The day you arrived, it was raining.', breakdown: ['où = when (time!)', 'le jour = the day', 'il pleuvait = it was raining (background)'] },
            { fr: 'Ce dont j\u2019ai besoin, c\u2019est de calme.', en: 'What I need is calm.', breakdown: ['ce dont = what… of (avoir besoin de)', 'c\u2019est de calme = is calm'] },
        ],
        commonMistakes: [
            'Choosing qui vs que by ear: test the following verb. A verb alone after the gap → qui; a subject-verb pair → que. "L\u2019ami QUE j\u2019ai perdu" (j\u2019 = subject, ai perdu = verb).',
            'Using que for de-verbs: "Le film que je parle" is wrong — parler de requires dont: le film dont je parle.',
            'Putting the preposition back: "La ville DANS laquelle où je vis…" — either sur/à + laquelle or où, never both.',
            'Forgetting the participle agreement with fronted que objects: la ville que j\u2019ai visitée (+e — ville is feminine).',
        ],
    },

    transformations: [
        { type: 'Two sentences', fr: 'J\u2019ai un ami. Il habite à Lyon.', en: 'I have a friend. He lives in Lyon.' },
        { type: 'With qui', fr: 'J\u2019ai un ami qui habite à Lyon.', en: 'I have a friend who lives in Lyon.' },
        { type: 'Two sentences', fr: 'Tu m\u2019as prêté un livre. Il est génial.', en: 'You lent me a book. It\u2019s great.' },
        { type: 'With que', fr: 'Le livre que tu m\u2019as prêté est génial.', en: 'The book you lent me is great.' },
        { type: 'de-verb + dont', fr: 'Je parle d\u2019un film. → le film dont je parle', en: 'I\u2019m talking about a film. → the film I\u2019m talking about' },
        { type: 'Place → où', fr: 'Je suis né dans une ville. → la ville où je suis né', en: 'I was born in a city. → the city where I was born' },
        { type: 'Time → où', fr: 'Tu es arrivé un jour. → le jour où tu es arrivé', en: 'You arrived on a day. → the day you arrived' },
        { type: 'No noun → ce que', fr: 'Tu dis quelque chose. → ce que tu dis', en: 'You say something. → what you say' },
    ],

    sentenceBuilding: [
        { fr: 'C\u2019est le prof qui m\u2019a appris le français.', en: 'He\u2019s the teacher who taught me French.' },
        { fr: 'C\u2019est le prof qui m\u2019a appris le français que je parle aujourd\u2019hui.', en: 'He\u2019s the teacher who taught me the French I speak today.' },
        { fr: 'C\u2019est le prof qui m\u2019a appris le français que je parle aujourd\u2019hui, et dont je me sers au travail.', en: 'He\u2019s the teacher who taught me the French I speak today and that I use at work.' },
        { fr: 'C\u2019est le prof qui m\u2019a appris le français que je parle aujourd\u2019hui, dont je me sers au travail, et sans lequel je ne serais pas ici.', en: 'He\u2019s the teacher who taught me the French I speak today, that I use at work, and without which I wouldn\u2019t be here.' },
        { fr: 'La salle où nous étudions, le prof qui nous guide, les livres que nous lisons, la méthode dont nous parlons — tout se relie.', en: 'The room where we study, the teacher who guides us, the books we read, the method we talk about — it all connects.' },
    ],

    practice: [
        { instruction: 'Choose the pronoun:', question: 'L\u2019homme ______ travaille ici s\u2019appelle Karim.', answer: 'qui — a verb (travaille) follows the gap: subject relative' },
        { instruction: 'Choose the pronoun:', question: 'Le gâteau ______ tu as fait est délicieux.', answer: 'que — subject-verb pair (tu as fait) follows: object relative' },
        { instruction: 'Choose the pronoun:', question: 'La chanson ______ je me souviens date des années 90.', answer: 'dont — se souvenir de → dont' },
        { instruction: 'Choose the pronoun:', question: 'La semaine ______ j\u2019ai eu l\u2019examen était folle.', answer: 'où — time relative (le semaine où)' },
        { instruction: 'Agree the participle:', question: 'Les villes que j\u2019ai ______ (visiter)…', answer: 'visitées — fronted plural feminine object → -es' },
        { instruction: 'No-noun relative:', question: '______ tu dis est vrai.', answer: 'Ce que — standalone object "what"' },
    ],

    translationPractice: [
        { en: 'The man who is speaking is the director.', fr: 'L\u2019homme qui parle est le directeur.' },
        { en: 'The film we watched yesterday was boring.', fr: 'Le film que nous avons regardé hier était ennuyeux.' },
        { en: 'That\u2019s the tool I need (have need of).', fr: 'C\u2019est l\u2019outil dont j\u2019ai besoin.' },
        { en: 'The café where we met has closed.', fr: 'Le café où nous nous sommes rencontrés a fermé.' },
        { en: 'What surprises me is the price.', fr: 'Ce qui me surprend, c\u2019est le prix.' },
        { en: 'The year I was born was a hard one.', fr: 'L\u2019année où je suis né était difficile.' },
    ],

    reverseTranslation: [
        { fr: 'Le livre dont il est fier est son premier roman.', en: 'The book he is proud of is his first novel.' },
        { fr: 'La personne à qui j\u2019ai parlé m\u2019a bien expliqué.', en: 'The person I spoke to explained it well.' },
        { fr: 'Tout ce que tu m\u2019as appris m\u2019a servi.', en: 'Everything you taught me was useful.' },
        { fr: 'Le moment où tout a changé, c\u2019était en mars.', en: 'The moment everything changed was in March.' },
    ],

    register: {
        informal: 'Le type que j\u2019ai rencontré, il est trop fort. (spoken French drops whose/preposition clauses and restarts)',
        neutral: 'Le collègue dont je t\u2019ai parlé va nous rejoindre.',
        formal: 'Le cadre dans lequel ce projet s\u2019inscrit a été approuvé. (dans lequel = formal preposition relative)',
    },

    culture: 'Relative pronouns are the dividing line between "tourist French" and "working French": everything official — contracts, emails, CBC-style news — is built from qui/que/dont chains. The TCF reading section regularly tests dont with de-verbs and l\u2019accord of the participle after que. Note that spoken French avoids lequel forms entirely; they belong to writing.',

    freeProduction: 'Describe someone important to you (8–10 sentences) using each relative at least twice: qui (who they are), que (things they did), dont (a story about them — parler de, être fier de), où (a place/time with them). Guiding prompt: C\u2019est la personne qui… ; les moments que… ; les histoires dont… ; la ville où…',

    miniTest: [
        { question: 'La fille ______ chante est ma sœur.', options: ['que', 'qui', 'dont', 'où'], answer: 'qui — verb follows: subject' },
        { question: 'Le livre ______ je parle est fameux.', options: ['que', 'qui', 'dont', 'où'], answer: 'dont — parler de' },
        { question: 'Le jour ______ on s\u2019est connus…', options: ['que', 'qui', 'dont', 'où'], answer: 'où — time relative' },
        { question: 'Les villes que j\u2019ai ______ (visiter)', options: ['visité', 'visités', 'visitées', 'visiter'], answer: 'visitées — fronted fem plural object' },
        { question: '______ tu m\u2019as dit est faux.', options: ['Ce qui', 'Ce que', 'Ce dont', 'Qui'], answer: 'Ce que — object "what"' },
    ],

    review: [
        'The si-system from the conditional lecture and the relatives combine: le métier que je ferais si j\u2019étais libre…',
        'Past participles still agree with preceding objects (A2 rule) — the relative que fronts exactly such an object.',
    ],

    traps: [
        'qui vs que: look at what follows the gap — verb alone → qui; subject+verb → que. "L\u2019idée qui me plaît" vs "l\u2019idée que tu proposes".',
        'dont is for de-verbs and de-phrases only: parler de, se souvenir de, avoir besoin de, être content de, être fier de, se servir de.',
        'où covers time too: le jour où, la semaine où, l\u2019année où — using que here (le jour que) is a classic B1 error.',
        'Participle agreement after fronted que: les pommes que j\u2019ai mangées, la ville que nous avons visitée. With avoir only — and only when the object sits before.',
    ],

    homework: {
        intro: 'Every item tests the pronoun choice qui / que / dont / où (plus ce qui / ce que) and the participle agreement with fronted objects.',
        translation: [
            { prompt: 'The teacher who taught me is retiring.', answer: 'Le professeur qui m\u2019a enseigné prend sa retraite.', explanation: 'qui because a verb (m\u2019a enseigné) is the relative\u2019s subject. Main clause verb: prend sa retraite.' },
            { prompt: 'The song you played is beautiful.', answer: 'La chanson que tu as jouée est belle.', alt: ['La chanson que tu as jouée est magnifique'], explanation: 'que because tu as jouée has its own subject. Fronted feminine object → jouée (+e).' },
            { prompt: 'The project I\u2019m working on is due Monday.', answer: 'Le projet sur lequel je travaille est à rendre lundi.', alt: ['Le projet dont je m’occupe est à rendre lundi'], explanation: 'travailler sur → sur lequel; alternatively se rendre compte/d\u2019occuper de → dont. Both B1-correct.' },
            { prompt: 'The town where I grew up is by the sea.', answer: 'La ville où j\u2019ai grandi est au bord de la mer.', explanation: 'où for place. grandir takes avoir here (j\u2019ai grandi) — no agreement after intransitive use.' },
            { prompt: 'The reason he\u2019s talking about is serious.', answer: 'La raison dont il parle est sérieuse.', explanation: 'parler de → dont. Typical exam sentence pairing parler with a fronted noun.' },
            { prompt: 'What you said changed my mind.', answer: 'Ce que tu as dit m\u2019a fait changer d\u2019avis.', explanation: 'No noun before → ce que (object of dire). The main verb m\u2019a fait changer follows.' },
        ],
        blanks: [
            { prompt: 'L\u2019ami ______ habite chez moi est brésilien.', answer: 'qui', explanation: 'Verb (habite) follows the gap → subject relative qui.' },
            { prompt: 'Les clés ______ tu cherches sont sur la table.', answer: 'que', explanation: 'Subject-verb pair (tu cherches) follows → object relative que.' },
            { prompt: 'Le pays ______ il vient est le Sénégal.', answer: 'd\u2019où', alt: ['dont'], explanation: 'venir de (origin) → d\u2019où (from where). dont would only work with parler/avoir besoin style de-verbs.' },
            { prompt: 'La décision ______ je suis content a été rapide.', answer: 'dont', explanation: 'être content de → dont. De-emotion verbs all chain into dont.' },
            { prompt: 'Le moment ______ j\u2019ai compris reste clair.', answer: 'où', explanation: 'Time relative: le moment où. où is not only a place.' },
            { prompt: 'Les lettres que j\u2019______ (écrire) sont perdues.', answer: 'ai écrites', alt: ['ai écrit'], explanation: 'Fronted plural object (les lettres) → participle agrees: écrites (+es). The classic dont/que agreement test.' },
        ],
        corrections: [
            { prompt: 'Le film que je parle est canadien.', answer: 'Le film dont je parle est canadien.', explanation: 'How the mistake happens: treating parler like a direct verb. Why it does not work: parler takes DE (parler DE quelque chose). How to fix it: dont replaces de + thing → le film dont je parle.' },
            { prompt: 'La femme que travaille ici est très gentille.', answer: 'La femme qui travaille ici est très gentille.', explanation: 'How the mistake happens: que by default. Why it does not work: a lone verb (travaille) after the gap means the relative is the SUBJECT. How to fix it: qui.' },
            { prompt: 'Le jour que tu es né, il neigeait.', answer: 'Le jour où tu es né, il neigeait.', explanation: 'How the mistake happens: assuming que after time nouns. Why it does not work: French uses où for time relatives. How to fix it: le jour où.' },
            { prompt: 'La ville que j\u2019ai visité était magnifique.', answer: 'La ville que j\u2019ai visitée était magnifique.', explanation: 'How the mistake happens: forgetting the fronted-object agreement with avoir. Why it does not work: la ville (fem) sits before the participle. How to fix it: visitée (+e).' },
            { prompt: 'Ce qui tu dis est intéressant.', answer: 'Ce que tu dis est intéressant.', explanation: 'How the mistake happens: swapping ce qui / ce que. Why it does not work: after the gap there is a subject-verb pair (tu dis) → the relative is the OBJECT. How to fix it: ce que tu dis. Ce qui is when a verb follows alone (ce qui m\u2019étonne…).' },
        ],
        writing: {
            task: 'Write a paragraph about a person or a place that matters to you (8–10 sentences) using each relative at least twice: qui, que (with participle agreement at least once), dont (with two different de-verbs), où (one place, one time). Finish with one ce qui / ce que sentence summarising what it means to you.',
            requirements: [
                'Two qui clauses',
                'Two que clauses, one with participle agreement',
                'Two dont clauses with different de-verbs',
                'One place où + one time où',
                'One ce qui or ce que closing',
            ],
            minWords: 70,
        },
        checklist: [
            'I choose qui vs que by looking at what follows the gap (verb → qui; subject+verb → que)',
            'I use dont for de-verbs: parler de, se souvenir de, avoir besoin de, être content de',
            'I use où for both place AND time relatives (le jour où)',
            'I make the participle agree after fronted que objects (la ville que j\u2019ai visitée)',
            'I use ce qui / ce que when there is no noun before',
            'I can chain two relatives in one sentence without losing the thread',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The gap test: cover the relative, look at what the clause needs. Needs a SUBJECT (a verb follows alone) → qui. Needs an OBJECT (a subject-verb pair follows) → que.',
            examples: [
                { fr: 'l\u2019homme QUI parle (verb) · le film QUE je regarde (je = subject)', en: 'the gap test in action' },
            ],
        },
        {
            explanation: 'dont replaces "de + thing" from a whole family: parler de, se souvenir de, avoir besoin de, avoir envie de, être content/fier/fâché de, se servir de, profiter de.',
            examples: [
                { fr: 'le prof DONT je me souviens · le passeport DONT j\u2019ai besoin', en: 'two de-verbs, one pronoun' },
            ],
        },
        {
            explanation: 'où is the relative for both place and time: la ville où je vis, le mois où je suis arrivé. Time relatives never take que.',
            examples: [
                { fr: 'l\u2019année où tout a changé · le café où on s\u2019est retrouvés', en: 'one pronoun, two dimensions' },
            ],
        },
        {
            explanation: 'Agreement after fronted que objects (avoir only): the participle agrees with the object when it sits before the verb — la ville que j\u2019ai visitée, les lettres qu\u2019il a écrites.',
            examples: [
                { fr: 'les fleurs qu\u2019elle a achetées · le film que nous avons vus', en: 'watch the noun before que' },
            ],
        },
        {
            explanation: 'Standalone "what": no noun before → ce qui (subject: ce qui se passe) or ce que (object: ce que tu penses). dont becomes ce dont with de-verbs (ce dont j\u2019ai besoin).',
            examples: [
                { fr: 'Ce que tu dis est juste. · Ce qui m\u2019inquiète, c\u2019est le délai.', en: 'what you say / what worries me' },
            ],
        },
        {
            explanation: 'After another preposition (à, sur, avec, sans, pour), the preposition + lequel/laquelle/lesquels/lesquelles carries the relative: à qui for people (la personne à qui j\u2019ai écrit), sur laquelle for things (la table sur laquelle…).',
            examples: [
                { fr: 'la personne À QUI j\u2019ai téléphoné · le bureau DANS LEQUEL je travaille', en: 'person vs thing forms' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'qui': { en: 'who / which — subject relative', pron: 'kee', type: 'particle', note: 'a verb follows alone: l\u2019homme qui parle' },
        'que': { en: 'that / which — object relative', pron: 'kuh', type: 'particle', note: 'elides to qu\u2019 before a vowel; fronts the object for agreement' },
        'dont': { en: 'whose / of which — replaces de + thing', pron: 'dohn', type: 'particle', note: 'parler de, se souvenir de, avoir besoin de → dont' },
        'où': { en: 'where / when (relative and question word)', pron: 'oo', type: 'particle', note: 'covers place AND time: la ville où, le jour où' },
        'lequel': { en: 'which one (masc)', pron: 'luh-KEL', gender: 'masculine', type: 'pronoun', fem: { word: 'laquelle', en: 'which one (fem)' }, note: 'after prepositions: sur lequel, dans laquelle' },
        'laquelle': { en: 'which one (fem)', pron: 'lah-KEL', gender: 'feminine', type: 'pronoun', note: 'contractions: auquel, auxquels, duquel, desquelles' },
        'ce qui': { en: 'what (subject — no noun before)', pron: 'suh kee', type: 'phrase', note: 'ce qui se passe = what is happening' },
        'ce que': { en: 'what (object — no noun before)', pron: 'suh kuh', type: 'phrase', note: 'ce que tu dis = what you say' },
        'ce dont': { en: 'what… of (with de-verbs)', pron: 'suh dohn', type: 'phrase', note: 'ce dont j\u2019ai besoin = what I need' },
        'souviens': { en: 'remember (reflexive of se souvenir)', pron: 'soo-VYEN', type: 'verb', base: { form: 'se souvenir de', en: 'to remember' }, note: 'je me souviens de… → dont in relatives' },
        'prêté': { en: 'lent (PC of prêter)', pron: 'preh-TAY', type: 'verb', base: { form: 'prêter', en: 'to lend' }, note: 'prêter QUELQUE CHOSE à quelqu\u2019un' },
        'retraite': { en: 'retirement', pron: 'ruh-TRET', gender: 'feminine', type: 'noun', note: 'prendre sa retraite = to retire' },
        'ennuyeux': { en: 'boring', pron: 'ah-nüee-YUH', gender: 'masculine', type: 'adjective', fem: { word: 'ennuyeuse', en: 'boring' }, note: 'not "annoying" — that is agaçant' },
        'fiable': { en: 'reliable (masc & fem alike)', pron: 'FYAH-bluh', type: 'adjective', note: 'ends in -e in both genders' },
        'outil': { en: 'tool', pron: 'oo-TEE', gender: 'masculine', plural: 'outils', type: 'noun' },
        'se servir de': { en: 'to use (de-verb → dont)', pron: 'suh sair-VEER duh', type: 'verb', note: 'l\u2019outil dont je me sers = the tool I use' },
    },
};

export const STATIC_B1_PART1: Record<string, StaticFrenchLesson> = {
    'B1:passe-vs-imparfait': b1PasseVsImparfait,
    'B1:conditionnel': b1Conditionnel,
    'B1:relatifs': b1Relatifs,
};
