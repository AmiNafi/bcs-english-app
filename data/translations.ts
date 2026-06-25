export interface TranslationEntry {
  english: string;
  bangla: string;
  grammaticalNote: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export interface SentenceTranslation {
  english: string;
  bangla: string;
  note?: string;
  category: string;
}

// ─── PHRASAL VERBS (55 entries) ───────────────────────────────────────────────

export const phrasalVerbs: TranslationEntry[] = [
  { english: "Call off", bangla: "বাতিল করা", grammaticalNote: "to cancel something planned", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Call for", bangla: "দাবি করা / প্রয়োজন হওয়া", grammaticalNote: "to require or demand", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Call on", bangla: "কাউকে দেখতে যাওয়া / আহ্বান করা", grammaticalNote: "to visit someone or appeal to them", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Call up", bangla: "ফোন করা / ডাকা", grammaticalNote: "to telephone or summon", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Bring about", bangla: "সৃষ্টি করা / ঘটানো", grammaticalNote: "to cause something to happen", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Bring up", bangla: "লালন-পালন করা / উত্থাপন করা", grammaticalNote: "to raise a child or mention a topic", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Bring forward", bangla: "এগিয়ে আনা / উপস্থাপন করা", grammaticalNote: "to move to an earlier time or present a proposal", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Break out", bangla: "হঠাৎ শুরু হওয়া / পালিয়ে যাওয়া", grammaticalNote: "to start suddenly or escape from confinement", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Break down", bangla: "ভেঙে পড়া / নষ্ট হওয়া", grammaticalNote: "to stop working or collapse emotionally", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Break in", bangla: "জোর করে প্রবেশ করা / বাধা দিয়ে কথা বলা", grammaticalNote: "to enter forcibly or interrupt a conversation", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Break off", bangla: "ভেঙে দেওয়া / হঠাৎ থামা", grammaticalNote: "to end abruptly or detach", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Break through", bangla: "বাধা অতিক্রম করা / সাফল্য অর্জন করা", grammaticalNote: "to force a way through or achieve a major advance", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Look into", bangla: "তদন্ত করা / খতিয়ে দেখা", grammaticalNote: "to investigate", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Look after", bangla: "যত্ন নেওয়া / দেখাশোনা করা", grammaticalNote: "to take care of someone or something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Look down on", bangla: "তুচ্ছ মনে করা / অবজ্ঞা করা", grammaticalNote: "to consider someone inferior", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Look forward to", bangla: "আগ্রহের সাথে অপেক্ষা করা", grammaticalNote: "to anticipate with pleasure", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Look up to", bangla: "শ্রদ্ধা করা / সম্মান করা", grammaticalNote: "to admire or respect someone", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Run out of", bangla: "শেষ হয়ে যাওয়া / নিঃশেষ হওয়া", grammaticalNote: "to have no more of something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Run into", bangla: "হঠাৎ দেখা হওয়া / সমস্যায় পড়া", grammaticalNote: "to meet someone unexpectedly or encounter a problem", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Run away", bangla: "পালিয়ে যাওয়া", grammaticalNote: "to flee from a place or situation", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Give up", bangla: "ছেড়ে দেওয়া / হাল ছেড়ে দেওয়া", grammaticalNote: "to stop trying or abandon a habit", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Give in", bangla: "হার মানা / নতি স্বীকার করা", grammaticalNote: "to surrender or submit to pressure", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Give away", bangla: "বিনামূল্যে দেওয়া / ফাঁস করা", grammaticalNote: "to donate freely or reveal a secret", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Put off", bangla: "পিছিয়ে দেওয়া / স্থগিত করা", grammaticalNote: "to postpone", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Put up with", bangla: "সহ্য করা / মেনে নেওয়া", grammaticalNote: "to tolerate something unpleasant", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Put forward", bangla: "প্রস্তাব করা / উপস্থাপন করা", grammaticalNote: "to propose or suggest an idea", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Set up", bangla: "স্থাপন করা / প্রতিষ্ঠা করা", grammaticalNote: "to establish or arrange", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Set aside", bangla: "আলাদা রাখা / সরিয়ে রাখা", grammaticalNote: "to save for a purpose or disregard temporarily", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Set out", bangla: "যাত্রা শুরু করা / উদ্দেশ্য নির্ধারণ করা", grammaticalNote: "to begin a journey or state an intention", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Take after", bangla: "সদৃশ হওয়া / মতো হওয়া", grammaticalNote: "to resemble in personality or appearance", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Take over", bangla: "দায়িত্ব নেওয়া / অধিগ্রহণ করা", grammaticalNote: "to assume control of something", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Take up", bangla: "শুরু করা / গ্রহণ করা", grammaticalNote: "to begin a new activity or occupy space/time", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Take off", bangla: "উড়ে যাওয়া / সফল হওয়া", grammaticalNote: "for a plane to leave the ground or something to become successful", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Turn down", bangla: "প্রত্যাখ্যান করা / কমিয়ে দেওয়া", grammaticalNote: "to refuse or reduce the volume/level", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Turn out", bangla: "প্রমাণিত হওয়া / উপস্থিত হওয়া", grammaticalNote: "to happen in a particular way or attend an event", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Turn up", bangla: "হঠাৎ হাজির হওয়া / বাড়িয়ে দেওয়া", grammaticalNote: "to arrive unexpectedly or increase volume", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Come across", bangla: "হঠাৎ পাওয়া / মুখোমুখি হওয়া", grammaticalNote: "to encounter unexpectedly", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Come up with", bangla: "উদ্ভাবন করা / ভেবে বের করা", grammaticalNote: "to produce an idea or solution", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Come down with", bangla: "অসুস্থ হয়ে পড়া", grammaticalNote: "to become ill", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Go through", bangla: "সহ্য করা / পরীক্ষা করা", grammaticalNote: "to experience hardship or examine carefully", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Go over", bangla: "পুনরায় পরীক্ষা করা / পড়ে দেখা", grammaticalNote: "to review or examine something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Go ahead", bangla: "এগিয়ে যাওয়া / অনুমতি দেওয়া", grammaticalNote: "to proceed or give permission", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Stand by", bangla: "পাশে থাকা / সমর্থন করা", grammaticalNote: "to support someone or wait ready", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Stand up for", bangla: "পক্ষ নেওয়া / সমর্থন করা", grammaticalNote: "to defend or support a person or principle", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Stand out", bangla: "আলাদাভাবে চোখে পড়া / বিশিষ্ট হওয়া", grammaticalNote: "to be clearly better or more noticeable", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Carry out", bangla: "সম্পন্ন করা / বাস্তবায়ন করা", grammaticalNote: "to perform or implement a task", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Carry on", bangla: "চালিয়ে যাওয়া / অব্যাহত রাখা", grammaticalNote: "to continue doing something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Fall apart", bangla: "ভেঙে পড়া / টুকরো হওয়া", grammaticalNote: "to disintegrate or lose emotional control", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Fall behind", bangla: "পিছিয়ে পড়া", grammaticalNote: "to fail to keep up with others", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Fall through", bangla: "ব্যর্থ হওয়া / কার্যকর না হওয়া", grammaticalNote: "to fail to happen or be completed", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Figure out", bangla: "বুঝতে পারা / সমাধান করা", grammaticalNote: "to understand or solve after thinking", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Hold on", bangla: "অপেক্ষা করা / ধরে থাকা", grammaticalNote: "to wait or grip firmly", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Hold back", bangla: "আটকে রাখা / দমন করা", grammaticalNote: "to restrain or suppress", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Make up", bangla: "তৈরি করা / ক্ষতিপূরণ করা / মিটমাট করা", grammaticalNote: "to invent, compensate for, or reconcile after a disagreement", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Make out", bangla: "বুঝতে পারা / দেখতে পাওয়া", grammaticalNote: "to discern or understand with difficulty", difficulty: "hard", category: "Phrasal Verb" },
];

// ─── IDIOMS AND PHRASES (80 entries) ─────────────────────────────────────────

export const idiomsAndPhrases: TranslationEntry[] = [
  { english: "At the drop of a hat", bangla: "তাৎক্ষণিকভাবে / বিনা কারণে", grammaticalNote: "immediately, without hesitation", difficulty: "medium", category: "Idiom" },
  { english: "Beat around the bush", bangla: "ঘুরিয়ে পেঁচিয়ে বলা", grammaticalNote: "to avoid the main topic", difficulty: "medium", category: "Idiom" },
  { english: "Bite the bullet", bangla: "কষ্ট সহ্য করে এগিয়ে যাওয়া", grammaticalNote: "to endure a painful or difficult situation", difficulty: "hard", category: "Idiom" },
  { english: "Break the ice", bangla: "প্রথম পরিচয়ের জড়তা কাটানো", grammaticalNote: "to start a conversation in an awkward situation", difficulty: "easy", category: "Idiom" },
  { english: "Burn the midnight oil", bangla: "রাত জেগে কাজ করা", grammaticalNote: "to work or study very late at night", difficulty: "easy", category: "Idiom" },
  { english: "Cost an arm and a leg", bangla: "অত্যন্ত ব্যয়সাধ্য হওয়া", grammaticalNote: "to be very expensive", difficulty: "easy", category: "Idiom" },
  { english: "Cut corners", bangla: "সহজ পথে কাজ করা / মান না বজায় রাখা", grammaticalNote: "to do something in the quickest but lowest-quality way", difficulty: "medium", category: "Idiom" },
  { english: "Hit the nail on the head", bangla: "ঠিক কথা বলা / মর্মস্থল স্পর্শ করা", grammaticalNote: "to describe exactly what is causing the problem", difficulty: "medium", category: "Idiom" },
  { english: "Kick the bucket", bangla: "মারা যাওয়া", grammaticalNote: "informal idiom — to die", difficulty: "medium", category: "Idiom" },
  { english: "Let the cat out of the bag", bangla: "গোপন কথা ফাঁস করা", grammaticalNote: "to reveal a secret accidentally", difficulty: "medium", category: "Idiom" },
  { english: "Once in a blue moon", bangla: "কদাচিৎ / বিরলে", grammaticalNote: "rarely or very seldom", difficulty: "easy", category: "Idiom" },
  { english: "Pull someone's leg", bangla: "কাউকে ঠাট্টা করা / রসিকতা করা", grammaticalNote: "to tease or joke with someone", difficulty: "easy", category: "Idiom" },
  { english: "Sit on the fence", bangla: "নিরপেক্ষ থাকা / মাঝামাঝি অবস্থান নেওয়া", grammaticalNote: "to avoid taking sides in a dispute", difficulty: "medium", category: "Idiom" },
  { english: "Spill the beans", bangla: "গোপন কথা প্রকাশ করা", grammaticalNote: "to reveal secret information", difficulty: "medium", category: "Idiom" },
  { english: "The ball is in your court", bangla: "এখন তোমার পালা / সিদ্ধান্ত তোমার", grammaticalNote: "it is up to you to make the next move or decision", difficulty: "medium", category: "Idiom" },
  { english: "A blessing in disguise", bangla: "প্রথমে খারাপ মনে হলেও আসলে ভালো", grammaticalNote: "something that seems bad but turns out to be good", difficulty: "hard", category: "Idiom" },
  { english: "Under the weather", bangla: "অসুস্থ / শরীর ভালো না", grammaticalNote: "feeling unwell or slightly ill", difficulty: "easy", category: "Idiom" },
  { english: "Bite the dust", bangla: "পরাজিত হওয়া / ব্যর্থ হওয়া", grammaticalNote: "to fail or be defeated", difficulty: "medium", category: "Idiom" },
  { english: "Barking up the wrong tree", bangla: "ভুল ব্যক্তিকে দোষারোপ করা / ভুল পথে যাওয়া", grammaticalNote: "to pursue a mistaken or misguided course of action", difficulty: "hard", category: "Idiom" },
  { english: "Get cold feet", bangla: "ভয় পেয়ে পিছিয়ে যাওয়া", grammaticalNote: "to become nervous or fearful about something planned", difficulty: "medium", category: "Idiom" },
  { english: "Hit the sack", bangla: "ঘুমাতে যাওয়া", grammaticalNote: "informal — to go to bed", difficulty: "easy", category: "Idiom" },
  { english: "Kill two birds with one stone", bangla: "এক ঢিলে দুই পাখি মারা", grammaticalNote: "to accomplish two things with a single action", difficulty: "easy", category: "Idiom" },
  { english: "Add fuel to the fire", bangla: "আগুনে ঘি ঢালা / পরিস্থিতি আরও খারাপ করা", grammaticalNote: "to make a bad situation worse", difficulty: "medium", category: "Idiom" },
  { english: "All in the same boat", bangla: "একই বিপদে থাকা / একই অবস্থায় থাকা", grammaticalNote: "in the same difficult situation", difficulty: "easy", category: "Idiom" },
  { english: "Blow one's own trumpet", bangla: "নিজের ঢাক নিজে পেটানো / আত্মপ্রশংসা করা", grammaticalNote: "to boast about one's own achievements", difficulty: "medium", category: "Idiom" },
  { english: "Burn one's bridges", bangla: "সম্পর্ক চিরতরে নষ্ট করা", grammaticalNote: "to do something that makes it impossible to return to a previous situation", difficulty: "hard", category: "Idiom" },
  { english: "Cry wolf", bangla: "মিথ্যা বিপদ ডাক দেওয়া", grammaticalNote: "to raise a false alarm repeatedly", difficulty: "medium", category: "Idiom" },
  { english: "Cut the mustard", bangla: "প্রত্যাশা পূরণ করা / মানদণ্ড অর্জন করা", grammaticalNote: "to reach the required standard", difficulty: "hard", category: "Idiom" },
  { english: "Every cloud has a silver lining", bangla: "প্রতিটি বিপদে আশার আলো থাকে", grammaticalNote: "every negative situation has a positive aspect", difficulty: "medium", category: "Idiom" },
  { english: "Face the music", bangla: "পরিণতির মুখোমুখি হওয়া / শাস্তি মেনে নেওয়া", grammaticalNote: "to accept the consequences of one's actions", difficulty: "medium", category: "Idiom" },
  { english: "Get the ball rolling", bangla: "কাজ শুরু করা / সূচনা করা", grammaticalNote: "to start an activity or process", difficulty: "easy", category: "Idiom" },
  { english: "Give the benefit of the doubt", bangla: "সন্দেহের সুবিধা দেওয়া / বিশ্বাস করা", grammaticalNote: "to trust someone's statement even though you are not certain it is true", difficulty: "hard", category: "Idiom" },
  { english: "Hit the road", bangla: "যাত্রা শুরু করা / চলে যাওয়া", grammaticalNote: "to leave or begin a journey", difficulty: "easy", category: "Idiom" },
  { english: "In the long run", bangla: "দীর্ঘমেয়াদে / শেষ পর্যন্ত", grammaticalNote: "eventually, after a long period of time", difficulty: "easy", category: "Idiom" },
  { english: "Jump on the bandwagon", bangla: "জনপ্রিয় দলে যোগ দেওয়া / স্রোতে গা ভাসানো", grammaticalNote: "to follow a trend or popular cause", difficulty: "hard", category: "Idiom" },
  { english: "Keep a low profile", bangla: "নিচু অবস্থানে থাকা / নজর এড়িয়ে চলা", grammaticalNote: "to avoid attracting attention", difficulty: "medium", category: "Idiom" },
  { english: "Leave no stone unturned", bangla: "সর্বোচ্চ চেষ্টা করা / কোনো চেষ্টা বাদ না রাখা", grammaticalNote: "to try every possible means to achieve something", difficulty: "medium", category: "Idiom" },
  { english: "Let sleeping dogs lie", bangla: "পুরনো ঝামেলা না ঘাঁটানো", grammaticalNote: "to avoid bringing up old conflicts or problems", difficulty: "hard", category: "Idiom" },
  { english: "Miss the boat", bangla: "সুযোগ হারানো", grammaticalNote: "to miss an opportunity", difficulty: "easy", category: "Idiom" },
  { english: "Nip in the bud", bangla: "শুরুতেই দমন করা / অঙ্কুরে বিনষ্ট করা", grammaticalNote: "to stop something at an early stage before it develops", difficulty: "hard", category: "Idiom" },
  { english: "On the fence", bangla: "দ্বিধায় থাকা / সিদ্ধান্ত না নেওয়া", grammaticalNote: "undecided or neutral on an issue", difficulty: "medium", category: "Idiom" },
  { english: "On the tip of one's tongue", bangla: "মুখের ডগায় থাকা / মনে পড়তে পড়তে না পড়া", grammaticalNote: "about to be said or almost remembered", difficulty: "medium", category: "Idiom" },
  { english: "Over the moon", bangla: "অত্যন্ত খুশি / আনন্দে আত্মহারা", grammaticalNote: "extremely happy", difficulty: "easy", category: "Idiom" },
  { english: "Piece of cake", bangla: "অত্যন্ত সহজ কাজ", grammaticalNote: "something very easy to do", difficulty: "easy", category: "Idiom" },
  { english: "Play devil's advocate", bangla: "বিপরীত মত প্রকাশ করা পরীক্ষার জন্য", grammaticalNote: "to argue against a position for the sake of debate", difficulty: "hard", category: "Idiom" },
  { english: "Read between the lines", bangla: "লুকানো অর্থ বোঝা", grammaticalNote: "to understand the hidden meaning behind what is said or written", difficulty: "medium", category: "Idiom" },
  { english: "Rub someone the wrong way", bangla: "কাউকে বিরক্ত করা / উল্টো ফলাফল হওয়া", grammaticalNote: "to irritate or annoy someone", difficulty: "hard", category: "Idiom" },
  { english: "See eye to eye", bangla: "একমত হওয়া / মতামতে মিল থাকা", grammaticalNote: "to agree with someone", difficulty: "medium", category: "Idiom" },
  { english: "Shoot oneself in the foot", bangla: "নিজের ক্ষতি নিজে ডেকে আনা", grammaticalNote: "to accidentally do something that causes problems for yourself", difficulty: "hard", category: "Idiom" },
  { english: "Steal the show", bangla: "সবার মনোযোগ আকর্ষণ করা / সেরা পারফরম্যান্স করা", grammaticalNote: "to attract the most attention and praise", difficulty: "medium", category: "Idiom" },
  { english: "The last straw", bangla: "সীমার শেষ বিন্দু / অসহ্যের শেষ সীমা", grammaticalNote: "the final problem that makes a situation unbearable", difficulty: "hard", category: "Idiom" },
  { english: "Throw in the towel", bangla: "হার মেনে নেওয়া / লড়াই ছেড়ে দেওয়া", grammaticalNote: "to admit defeat or give up", difficulty: "medium", category: "Idiom" },
  { english: "Tie the knot", bangla: "বিয়ে করা", grammaticalNote: "informal — to get married", difficulty: "easy", category: "Idiom" },
  { english: "Touch and go", bangla: "অনিশ্চিত / ঝুঁকিপূর্ণ", grammaticalNote: "a risky or uncertain situation", difficulty: "hard", category: "Idiom" },
  { english: "Under someone's thumb", bangla: "কারো নিয়ন্ত্রণে থাকা / বশে থাকা", grammaticalNote: "to be controlled by someone", difficulty: "hard", category: "Idiom" },
  { english: "Up in the air", bangla: "অনিশ্চিত / সিদ্ধান্ত না হওয়া", grammaticalNote: "uncertain or undecided", difficulty: "medium", category: "Idiom" },
  { english: "With flying colours", bangla: "উজ্জ্বলভাবে সফল হওয়া / দারুণভাবে উত্তীর্ণ হওয়া", grammaticalNote: "with great success", difficulty: "medium", category: "Idiom" },
  { english: "Wolf in sheep's clothing", bangla: "ভেড়ার চামড়ায় বাঘ / কপট লোক", grammaticalNote: "someone dangerous who appears harmless", difficulty: "hard", category: "Idiom" },
  { english: "You can't judge a book by its cover", bangla: "চেহারা দেখে বিচার করা যায় না", grammaticalNote: "do not judge something solely on outward appearance", difficulty: "easy", category: "Idiom" },
  { english: "A penny for your thoughts", bangla: "কী ভাবছ বলো তো?", grammaticalNote: "asked when someone is quiet and seems to be thinking deeply", difficulty: "medium", category: "Idiom" },
  { english: "Actions speak louder than words", bangla: "কাজে বিশ্বাস, কথায় নয়", grammaticalNote: "what someone does is more important than what they say", difficulty: "easy", category: "Idiom" },
  { english: "At a loss for words", bangla: "কথা খুঁজে না পাওয়া / হতবাক হওয়া", grammaticalNote: "unable to speak or respond due to shock or surprise", difficulty: "medium", category: "Idiom" },
  { english: "Back to square one", bangla: "একেবারে শুরু থেকে আবার শুরু করা", grammaticalNote: "having to start again after a failure", difficulty: "easy", category: "Idiom" },
  { english: "Beat a dead horse", bangla: "বৃথা চেষ্টা করা / মৃত বিষয় নিয়ে কথা বলা", grammaticalNote: "to waste time on something that is already finished or impossible", difficulty: "hard", category: "Idiom" },
  { english: "Come rain or shine", bangla: "যাই হোক না কেন / সব অবস্থায়", grammaticalNote: "whatever happens; in all circumstances", difficulty: "medium", category: "Idiom" },
  { english: "Down to earth", bangla: "বাস্তববাদী / সহজ-সরল", grammaticalNote: "practical and realistic; not pretentious", difficulty: "easy", category: "Idiom" },
  { english: "Draw a blank", bangla: "কিছু মনে না পড়া / ব্যর্থ হওয়া", grammaticalNote: "to fail to remember something or get no results", difficulty: "medium", category: "Idiom" },
  { english: "Fit as a fiddle", bangla: "সম্পূর্ণ সুস্থ ও সবল", grammaticalNote: "in very good health", difficulty: "medium", category: "Idiom" },
  { english: "Go the extra mile", bangla: "অতিরিক্ত প্রচেষ্টা করা", grammaticalNote: "to put in more effort than is required", difficulty: "easy", category: "Idiom" },
  { english: "Hit the books", bangla: "মনোযোগ দিয়ে পড়াশোনা করা", grammaticalNote: "to study seriously", difficulty: "easy", category: "Idiom" },
  { english: "In hot water", bangla: "বিপদে পড়া / ঝামেলায় পড়া", grammaticalNote: "in trouble or difficulty", difficulty: "medium", category: "Idiom" },
  { english: "Keep one's fingers crossed", bangla: "ভালো কিছুর আশায় থাকা", grammaticalNote: "to hope that something will happen", difficulty: "easy", category: "Idiom" },
  { english: "Lose one's temper", bangla: "রাগ হারানো / রাগান্বিত হওয়া", grammaticalNote: "to become very angry", difficulty: "easy", category: "Idiom" },
  { english: "Make ends meet", bangla: "কোনোমতে চলা / আয়-ব্যয় মেলানো", grammaticalNote: "to have just enough money for basic needs", difficulty: "medium", category: "Idiom" },
  { english: "No pain, no gain", bangla: "কষ্ট না করলে কেষ্ট মেলে না", grammaticalNote: "you have to work hard to achieve something", difficulty: "easy", category: "Idiom" },
  { english: "On cloud nine", bangla: "আনন্দে আত্মহারা / অত্যন্ত সুখী", grammaticalNote: "extremely happy", difficulty: "medium", category: "Idiom" },
  { english: "Once bitten, twice shy", bangla: "একবার ঠকলে দুবার সাবধান হওয়া", grammaticalNote: "after an unpleasant experience you are more careful next time", difficulty: "medium", category: "Idiom" },
  { english: "Put one's foot in one's mouth", bangla: "অজান্তে বেমানান কথা বলা", grammaticalNote: "to say something embarrassing or wrong unintentionally", difficulty: "hard", category: "Idiom" },
  { english: "Scratch the surface", bangla: "সমস্যার উপরিভাগ স্পর্শ করা / গভীরে না যাওয়া", grammaticalNote: "to deal with a small part of a subject or problem", difficulty: "hard", category: "Idiom" },
  { english: "Take it with a grain of salt", bangla: "সন্দেহের সাথে গ্রহণ করা", grammaticalNote: "to be sceptical about something", difficulty: "hard", category: "Idiom" },
  { english: "The tip of the iceberg", bangla: "হিমশৈলের চূড়া / সমস্যার ক্ষুদ্র অংশ", grammaticalNote: "a small evident part of a much larger problem", difficulty: "medium", category: "Idiom" },
];

// ─── LINKING VERBS (new section) ─────────────────────────────────────────────

export const linkingVerbs: TranslationEntry[] = [
  { english: "Is / Am / Are", bangla: "হয় / হই / হও — বর্তমান কালে 'থাকা/হওয়া'", grammaticalNote: "Primary linking verb: connects subject to predicate adjective/noun. 'She is smart.' 'They are students.'", difficulty: "easy", category: "Linking Verb" },
  { english: "Was / Were", bangla: "ছিল / ছিলাম / ছিলে — অতীত কালে", grammaticalNote: "Past tense of 'be'. 'He was tired.' 'We were happy.'", difficulty: "easy", category: "Linking Verb" },
  { english: "Seem", bangla: "মনে হওয়া / মনে হচ্ছে", grammaticalNote: "Links subject to an adjective expressing appearance. 'She seems upset.' Never confused with action.", difficulty: "easy", category: "Linking Verb" },
  { english: "Appear", bangla: "মনে হওয়া / দেখতে লাগা", grammaticalNote: "Describes how something looks or seems. 'He appears nervous.' Often followed by adjective.", difficulty: "easy", category: "Linking Verb" },
  { english: "Become", bangla: "হয়ে ওঠা / পরিণত হওয়া", grammaticalNote: "Shows a change of state. 'She became a doctor.' 'The sky became dark.'", difficulty: "easy", category: "Linking Verb" },
  { english: "Feel", bangla: "অনুভব করা / মনে হওয়া", grammaticalNote: "As a linking verb, describes a state. 'I feel happy.' NOT 'I feel happily.' Use adjective, not adverb.", difficulty: "medium", category: "Linking Verb" },
  { english: "Look", bangla: "দেখতে লাগা / মনে হওয়া", grammaticalNote: "As a linking verb: 'She looks tired.' NOT 'She looks tiredly.' Takes adjective, not adverb.", difficulty: "medium", category: "Linking Verb" },
  { english: "Sound", bangla: "শুনতে লাগা / মনে হওয়া", grammaticalNote: "Describes how something seems when heard or perceived. 'That sounds interesting.'", difficulty: "medium", category: "Linking Verb" },
  { english: "Smell", bangla: "গন্ধ পাওয়া / গন্ধ লাগা", grammaticalNote: "As a linking verb: 'The flowers smell sweet.' Takes adjective NOT adverb.", difficulty: "medium", category: "Linking Verb" },
  { english: "Taste", bangla: "স্বাদ লাগা / স্বাদ পাওয়া", grammaticalNote: "As a linking verb: 'The food tastes delicious.' Takes adjective, not adverb.", difficulty: "medium", category: "Linking Verb" },
  { english: "Remain", bangla: "থাকা / রয়ে যাওয়া", grammaticalNote: "Shows continuation of a state. 'She remained calm.' 'The issue remains unresolved.'", difficulty: "medium", category: "Linking Verb" },
  { english: "Stay", bangla: "থাকা / অবস্থান করা", grammaticalNote: "Shows no change in condition. 'Stay calm.' 'The temperature stayed low.'", difficulty: "easy", category: "Linking Verb" },
  { english: "Grow", bangla: "হয়ে ওঠা / পরিণত হওয়া", grammaticalNote: "Shows gradual change. 'He grew angry.' 'The city grew large.' Takes adjective.", difficulty: "medium", category: "Linking Verb" },
  { english: "Turn", bangla: "পরিণত হওয়া / হয়ে যাওয়া", grammaticalNote: "Shows change into a new state. 'The leaves turned yellow.' 'She turned pale.'", difficulty: "medium", category: "Linking Verb" },
  { english: "Prove", bangla: "প্রমাণিত হওয়া / সত্য হওয়া", grammaticalNote: "Links subject to outcome. 'The plan proved successful.' 'His words proved false.'", difficulty: "hard", category: "Linking Verb" },
  { english: "Fall", bangla: "হয়ে পড়া / পরিণত হওয়া", grammaticalNote: "Used in phrases to show a change of state. 'He fell ill.' 'She fell silent.' 'They fell apart.'", difficulty: "hard", category: "Linking Verb" },
  { english: "Go", bangla: "হয়ে যাওয়া (নেতিবাচক অবস্থায়)", grammaticalNote: "Used for negative changes of state. 'Go wrong', 'go bad', 'go blind', 'go bankrupt'.", difficulty: "hard", category: "Linking Verb" },
  { english: "Run", bangla: "হয়ে যাওয়া / পড়া", grammaticalNote: "Used in fixed phrases. 'Run dry' (শুকিয়ে যাওয়া), 'run short' (কম পড়া), 'run wild'.", difficulty: "hard", category: "Linking Verb" },
  { english: "Get", bangla: "হয়ে যাওয়া / পরিণত হওয়া", grammaticalNote: "Informal alternative to 'become'. 'Get angry', 'get tired', 'get married', 'get ready'.", difficulty: "medium", category: "Linking Verb" },
  { english: "Keep", bangla: "থাকা / বজায় রাখা", grammaticalNote: "Shows continuation. 'Keep quiet.' 'Keep still.' 'Keep calm.' Takes adjective.", difficulty: "easy", category: "Linking Verb" },
];

// ─── SAMPLE SENTENCES (85 entries) ───────────────────────────────────────────

export const sampleSentences: SentenceTranslation[] = [
  // Education
  { english: "Education is the most powerful weapon which you can use to change the world.", bangla: "শিক্ষা হলো সবচেয়ে শক্তিশালী অস্ত্র যা দিয়ে আপনি পৃথিবী পরিবর্তন করতে পারেন।", note: "Nelson Mandela quote — frequently used in BCS", category: "Education" },
  { english: "An investment in knowledge pays the best interest.", bangla: "জ্ঞানে বিনিয়োগই সর্বোত্তম সুদ প্রদান করে।", note: "Benjamin Franklin — BCS written exam favorite", category: "Education" },
  { english: "Education without values is like a ship without a compass.", bangla: "মূল্যবোধহীন শিক্ষা হলো দিকনির্দেশনাহীন জাহাজের মতো।", category: "Education" },
  { english: "The purpose of education is not to fill the mind but to train it.", bangla: "শিক্ষার উদ্দেশ্য মনকে পূর্ণ করা নয়, বরং তাকে প্রশিক্ষিত করা।", note: "BCS written exam — education philosophy", category: "Education" },
  { english: "Quality education is the foundation of a developed nation.", bangla: "মানসম্পন্ন শিক্ষা একটি উন্নত জাতির ভিত্তি।", category: "Education" },
  { english: "The illiterate of the twenty-first century will not be those who cannot read and write.", bangla: "একবিংশ শতাব্দীর নিরক্ষর তারা হবে না যারা পড়তে ও লিখতে পারে না।", note: "Alvin Toffler — BCS viva topic", category: "Education" },

  // Environment
  { english: "Climate change is an existential threat to humanity.", bangla: "জলবায়ু পরিবর্তন মানবজাতির অস্তিত্বের জন্য হুমকিস্বরূপ।", note: "Environmental topic — frequently tested in BCS", category: "Environment" },
  { english: "We do not inherit the earth from our ancestors; we borrow it from our children.", bangla: "আমরা পৃথিবীকে পূর্বপুরুষদের কাছ থেকে উত্তরাধিকারসূত্রে পাই না; আমরা এটি আমাদের সন্তানদের কাছ থেকে ধার করি।", note: "Native American proverb — environmental writing", category: "Environment" },
  { english: "Environmental pollution is one of the greatest challenges of our time.", bangla: "পরিবেশ দূষণ আমাদের সময়ের সবচেয়ে বড় চ্যালেঞ্জগুলির একটি।", category: "Environment" },
  { english: "Deforestation is destroying the lungs of the earth at an alarming rate.", bangla: "বন উজাড় উদ্বেগজনক গতিতে পৃথিবীর ফুসফুস ধ্বংস করছে।", note: "Environment & Amazon — BCS written", category: "Environment" },
  { english: "Bangladesh is one of the most vulnerable countries to the effects of climate change.", bangla: "বাংলাদেশ জলবায়ু পরিবর্তনের প্রভাবের জন্য সবচেয়ে ঝুঁকিপূর্ণ দেশগুলির মধ্যে একটি।", category: "Environment" },
  { english: "The Sundarbans mangrove forest protects coastal Bangladesh from devastating cyclones.", bangla: "সুন্দরবনের ম্যানগ্রোভ বন উপকূলীয় বাংলাদেশকে বিধ্বংসী ঘূর্ণিঝড় থেকে রক্ষা করে।", category: "Environment" },

  // Democracy & Governance
  { english: "Democracy cannot survive without an educated and informed citizenry.", bangla: "শিক্ষিত এবং সচেতন নাগরিক ছাড়া গণতন্ত্র টিকে থাকতে পারে না।", note: "Political science — BCS written exam favorite", category: "Democracy" },
  { english: "Corruption is one of the greatest obstacles to the development of a nation.", bangla: "দুর্নীতি একটি জাতির উন্নয়নের সবচেয়ে বড় বাধাগুলির মধ্যে একটি।", note: "Anti-corruption theme — common in BCS", category: "Democracy" },
  { english: "Good governance is the cornerstone of sustainable development.", bangla: "সুশাসন টেকসই উন্নয়নের ভিত্তিপ্রস্তর।", category: "Democracy" },
  { english: "The rule of law must prevail over the rule of power.", bangla: "ক্ষমতার শাসনের উপর আইনের শাসন প্রতিষ্ঠিত হওয়া উচিত।", note: "BCS written — governance and law", category: "Democracy" },
  { english: "A free press is the guardian of democracy and the voice of the people.", bangla: "স্বাধীন সংবাদমাধ্যম গণতন্ত্রের রক্ষক এবং জনগণের কণ্ঠস্বর।", category: "Democracy" },
  { english: "Transparency and accountability are the pillars of good governance.", bangla: "স্বচ্ছতা ও জবাবদিহিতা সুশাসনের স্তম্ভ।", category: "Democracy" },

  // Social Issues
  { english: "Poverty is not an accident; it is man-made and can be removed by human action.", bangla: "দারিদ্র্য কোনো দুর্ঘটনা নয়; এটি মানুষের তৈরি এবং মানুষের কর্মকাণ্ড দ্বারা দূর করা সম্ভব।", note: "Nelson Mandela — poverty reduction topic", category: "Social Issues" },
  { english: "Gender equality is not a women's issue; it is a human issue.", bangla: "লিঙ্গ সমতা কেবল নারীর বিষয় নয়; এটি একটি মানবিক বিষয়।", note: "Women empowerment — BCS written and viva", category: "Social Issues" },
  { english: "Child marriage remains one of the most persistent human rights violations in Bangladesh.", bangla: "বাল্যবিবাহ বাংলাদেশে সবচেয়ে ক্রমাগত মানবাধিকার লঙ্ঘনের একটি হিসেবে রয়ে গেছে।", category: "Social Issues" },
  { english: "Women's empowerment is a prerequisite for sustainable development.", bangla: "নারীর ক্ষমতায়ন টেকসই উন্নয়নের পূর্বশর্ত।", note: "Gender and development — BCS written", category: "Social Issues" },
  { english: "Urbanisation without planning leads to social and environmental degradation.", bangla: "পরিকল্পনা ছাড়া নগরায়ন সামাজিক ও পরিবেশগত অবনতির দিকে নিয়ে যায়।", category: "Social Issues" },

  // Health
  { english: "Health is wealth, and without good health no pleasure can be enjoyed.", bangla: "স্বাস্থ্যই সম্পদ, এবং সুস্বাস্থ্য ছাড়া কোনো আনন্দ উপভোগ করা যায় না।", note: "Health and well-being — BCS staple", category: "Health" },
  { english: "Prevention is better than cure.", bangla: "প্রতিকারের চেয়ে প্রতিরোধ উত্তম।", note: "Classic proverb — quick typing practice", category: "Health" },
  { english: "Mental health is as important as physical health and must be treated with equal seriousness.", bangla: "মানসিক স্বাস্থ্য শারীরিক স্বাস্থ্যের মতোই গুরুত্বপূর্ণ এবং সমান গুরুত্বের সাথে এটিকে চিকিত্সা করতে হবে।", category: "Health" },
  { english: "Access to clean water and sanitation is a fundamental human right.", bangla: "বিশুদ্ধ পানি ও স্যানিটেশনে প্রবেশাধিকার একটি মৌলিক মানবাধিকার।", note: "SDG topic — BCS written", category: "Health" },
  { english: "The COVID-19 pandemic exposed the weaknesses in our global health systems.", bangla: "কোভিড-১৯ মহামারী আমাদের বৈশ্বিক স্বাস্থ্যব্যবস্থার দুর্বলতা উন্মোচন করেছে।", category: "Health" },

  // Economics
  { english: "The government should take immediate steps to alleviate poverty.", bangla: "সরকারের উচিত দারিদ্র্য দূর করতে তাৎক্ষণিক পদক্ষেপ নেওয়া।", note: "BCS-style formal sentence", category: "Economics" },
  { english: "Remittances from expatriate Bangladeshis play a vital role in the national economy.", bangla: "প্রবাসী বাংলাদেশিদের রেমিট্যান্স জাতীয় অর্থনীতিতে গুরুত্বপূর্ণ ভূমিকা পালন করে।", category: "Economics" },
  { english: "The ready-made garment sector is the backbone of Bangladesh's export economy.", bangla: "তৈরি পোশাক খাত বাংলাদেশের রপ্তানি অর্থনীতির মেরুদণ্ড।", note: "RMG topic — BCS written and viva", category: "Economics" },
  { english: "Sustainable economic growth requires investment in human capital.", bangla: "টেকসই অর্থনৈতিক প্রবৃদ্ধির জন্য মানব পুঁজিতে বিনিয়োগ প্রয়োজন।", category: "Economics" },
  { english: "Inflation reduces the purchasing power of ordinary citizens.", bangla: "মূল্যস্ফীতি সাধারণ নাগরিকদের ক্রয়ক্ষমতা হ্রাস করে।", note: "Economic terminology — BCS economics section", category: "Economics" },
  { english: "Bangladesh must diversify its export base to reduce dependence on the garment industry.", bangla: "পোশাক শিল্পের উপর নির্ভরতা কমাতে বাংলাদেশকে তার রপ্তানি ভিত্তি বৈচিত্র্যময় করতে হবে।", category: "Economics" },

  // Technology
  { english: "The digital revolution is transforming every aspect of modern life.", bangla: "ডিজিটাল বিপ্লব আধুনিক জীবনের প্রতিটি দিককে রূপান্তরিত করছে।", category: "Technology" },
  { english: "Artificial intelligence will reshape the global economy and the nature of work.", bangla: "কৃত্রিম বুদ্ধিমত্তা বৈশ্বিক অর্থনীতি ও কাজের প্রকৃতিকে পুনর্গঠন করবে।", note: "AI topic — BCS viva current affairs", category: "Technology" },
  { english: "Digital literacy is essential for full participation in the twenty-first century economy.", bangla: "একবিংশ শতাব্দীর অর্থনীতিতে পূর্ণ অংশগ্রহণের জন্য ডিজিটাল সাক্ষরতা অপরিহার্য।", category: "Technology" },
  { english: "Social media has both connected us and divided us in unprecedented ways.", bangla: "সামাজিক মাধ্যম আমাদেরকে একযোগে অভূতপূর্ব উপায়ে সংযুক্ত ও বিচ্ছিন্ন করেছে।", category: "Technology" },
  { english: "Cybersecurity has become a national security priority in the digital age.", bangla: "ডিজিটাল যুগে সাইবার নিরাপত্তা জাতীয় নিরাপত্তার অগ্রাধিকারে পরিণত হয়েছে।", category: "Technology" },

  // Agriculture
  { english: "Agriculture is the backbone of the Bangladesh economy and the livelihood of millions.", bangla: "কৃষি বাংলাদেশ অর্থনীতির মেরুদণ্ড এবং লক্ষ লক্ষ মানুষের জীবিকা।", category: "Agriculture" },
  { english: "Modern farming techniques have significantly increased agricultural productivity in Bangladesh.", bangla: "আধুনিক কৃষি কৌশল বাংলাদেশে কৃষি উৎপাদনশীলতা উল্লেখযোগ্যভাবে বৃদ্ধি করেছে।", category: "Agriculture" },
  { english: "Food security requires not only producing enough food but also ensuring access to it.", bangla: "খাদ্য নিরাপত্তার জন্য শুধু পর্যাপ্ত খাদ্য উৎপাদনই নয়, এটিতে প্রবেশাধিকার নিশ্চিত করাও প্রয়োজন।", note: "SDG 2 — Zero Hunger", category: "Agriculture" },

  // Famous Quotes
  { english: "Knowledge is power, but character is more.", bangla: "জ্ঞানই শক্তি, কিন্তু চরিত্র তার চেয়েও বেশি।", category: "Famous Quotes" },
  { english: "The pen is mightier than the sword.", bangla: "কলম তলোয়ারের চেয়ে শক্তিশালী।", note: "Famous proverb — quick practice sentence", category: "Proverbs" },
  { english: "A stitch in time saves nine.", bangla: "সময়মতো একটি সেলাই পরে নয়টি সেলাই বাঁচায়।", note: "English proverb — test speed and accuracy", category: "Proverbs" },
  { english: "All that glitters is not gold.", bangla: "যা চকচক করে তাই সোনা নয়।", category: "Proverbs" },
  { english: "Fortune favours the brave.", bangla: "ভাগ্য সাহসীদের পক্ষে থাকে।", category: "Proverbs" },
  { english: "Necessity is the mother of invention.", bangla: "প্রয়োজনীয়তাই উদ্ভাবনের জননী।", category: "Proverbs" },
  { english: "Actions speak louder than words.", bangla: "কাজ কথার চেয়ে জোরে কথা বলে।", category: "Proverbs" },
  { english: "Time and tide wait for no man.", bangla: "সময় ও স্রোত কারো জন্য অপেক্ষা করে না।", category: "Proverbs" },
  { english: "Where there is a will, there is a way.", bangla: "যেখানে ইচ্ছা আছে, সেখানে পথ আছে।", category: "Proverbs" },
  { english: "Too many cooks spoil the broth.", bangla: "বেশি রাঁধুনি রান্না নষ্ট করে।", category: "Proverbs" },

  // Formal BCS sentences
  { english: "Without hard work, success is impossible.", bangla: "কঠোর পরিশ্রম ছাড়া সাফল্য অসম্ভব।", category: "Motivation" },
  { english: "The quick brown fox jumps over the lazy dog.", bangla: "দ্রুতগামী বাদামি শেয়াল অলস কুকুরের উপর দিয়ে লাফিয়ে যায়।", note: "Contains all 26 letters — test typing speed", category: "Typing Practice" },
  { english: "It is better to light a candle than to curse the darkness.", bangla: "অন্ধকারকে অভিশাপ দেওয়ার চেয়ে একটি মোমবাতি জ্বালানো ভালো।", note: "Famous saying — BCS motivation writing", category: "Proverbs" },
  { english: "The greatest glory in living lies not in never falling, but in rising every time we fall.", bangla: "জীবনে বেঁচে থাকার সবচেয়ে বড় গৌরব কখনো না পড়ায় নয়, বরং পড়ে যাওয়ার পর প্রতিবার উঠে দাঁড়ানোয়।", note: "Nelson Mandela — resilience", category: "Motivation" },
  { english: "In the middle of every difficulty lies opportunity.", bangla: "প্রতিটি সংকটের মাঝেই সুযোগ লুকিয়ে থাকে।", note: "Albert Einstein — BCS motivational writing", category: "Motivation" },
  { english: "The only way to do great work is to love what you do.", bangla: "মহান কাজ করার একমাত্র উপায় হলো যা করছেন তাকে ভালোবাসা।", note: "Steve Jobs — career and profession writing", category: "Motivation" },

  // BCS Formal writing
  { english: "Bangladesh has made remarkable progress in reducing maternal and child mortality.", bangla: "মাতৃমৃত্যু ও শিশুমৃত্যুর হার হ্রাসে বাংলাদেশ উল্লেখযোগ্য অগ্রগতি করেছে।", note: "Health and MDGs — BCS written", category: "Health" },
  { english: "The government must invest more in renewable energy to ensure a sustainable future.", bangla: "টেকসই ভবিষ্যৎ নিশ্চিত করতে সরকারকে নবায়নযোগ্য শক্তিতে আরও বিনিয়োগ করতে হবে।", category: "Environment" },
  { english: "Microfinance has empowered millions of poor women in rural Bangladesh.", bangla: "ক্ষুদ্রঋণ গ্রামীণ বাংলাদেশে লক্ষ লক্ষ দরিদ্র নারীকে ক্ষমতায়িত করেছে।", note: "Grameen Bank — BCS written and viva", category: "Economics" },
  { english: "The liberation war of 1971 gave birth to an independent and sovereign Bangladesh.", bangla: "১৯৭১ সালের মুক্তিযুদ্ধ একটি স্বাধীন ও সার্বভৌম বাংলাদেশের জন্ম দিয়েছে।", note: "History — BCS written and viva essential", category: "History" },
  { english: "Bangabandhu Sheikh Mujibur Rahman is the father of the nation of Bangladesh.", bangla: "বঙ্গবন্ধু শেখ মুজিবুর রহমান বাংলাদেশের জাতির পিতা।", note: "National history — BCS must-know", category: "History" },
  { english: "The Language Movement of 1952 was a defining moment in the history of Bangladesh.", bangla: "১৯৫২ সালের ভাষা আন্দোলন বাংলাদেশের ইতিহাসে একটি নির্ধারণী মুহূর্ত ছিল।", note: "February 21 — Language Day history", category: "History" },

  // Grammar practice
  { english: "She seems to be very interested in the project.", bangla: "তিনি প্রকল্পটিতে অত্যন্ত আগ্রহী বলে মনে হচ্ছে।", note: "Linking verb 'seem' — grammar practice", category: "Grammar" },
  { english: "The food tastes delicious and the service is excellent.", bangla: "খাবারের স্বাদ সুস্বাদু এবং সেবা চমৎকার।", note: "Linking verb 'taste' — grammar practice", category: "Grammar" },
  { english: "He became a successful engineer after years of hard work.", bangla: "বছরের পর বছর পরিশ্রমের পর তিনি একজন সফল প্রকৌশলী হয়ে উঠলেন।", note: "Linking verb 'become' — grammar practice", category: "Grammar" },
  { english: "The situation remains critical despite the efforts of the relief workers.", bangla: "ত্রাণকর্মীদের প্রচেষ্টা সত্ত্বেও পরিস্থিতি সংকটজনক রয়ে গেছে।", note: "Linking verb 'remain'", category: "Grammar" },
  { english: "The music sounds beautiful and it makes me feel relaxed.", bangla: "সঙ্গীতটি সুন্দর শোনাচ্ছে এবং এটি আমাকে স্বস্তি অনুভব করায়।", note: "Linking verbs 'sound' and 'feel'", category: "Grammar" },
  { english: "The sky turned dark as the storm approached the coast.", bangla: "ঝড় উপকূলের কাছে আসার সাথে সাথে আকাশ অন্ধকার হয়ে গেল।", note: "Linking verb 'turn' showing change", category: "Grammar" },

  // SDG and Global issues
  { english: "The Sustainable Development Goals aim to end poverty, protect the planet, and ensure peace.", bangla: "টেকসই উন্নয়ন লক্ষ্যমাত্রা দারিদ্র্য দূর করতে, পৃথিবী রক্ষা করতে এবং শান্তি নিশ্চিত করতে চায়।", note: "SDGs — BCS international affairs", category: "International" },
  { english: "Human rights are universal and inalienable and must be protected by governments.", bangla: "মানবাধিকার সর্বজনীন ও অহস্তান্তরযোগ্য এবং সরকারগুলো দ্বারা রক্ষা করা আবশ্যক।", category: "International" },
  { english: "Global cooperation is essential to address the challenges of the twenty-first century.", bangla: "একবিংশ শতাব্দীর চ্যালেঞ্জ মোকাবেলায় বৈশ্বিক সহযোগিতা অপরিহার্য।", category: "International" },

  // Short practice
  { english: "Honesty is the best policy.", bangla: "সততাই সর্বোত্তম নীতি।", category: "Proverbs" },
  { english: "United we stand, divided we fall.", bangla: "একতায় বল, বিভেদে পতন।", category: "Proverbs" },
  { english: "Better late than never.", bangla: "না আসার চেয়ে দেরিতে আসা ভালো।", category: "Proverbs" },
  { english: "Look before you leap.", bangla: "লাফ দেওয়ার আগে দেখো।", category: "Proverbs" },
  { english: "Two wrongs do not make a right.", bangla: "দুটি ভুল মিলে একটি সঠিক হয় না।", category: "Proverbs" },
  { english: "Charity begins at home.", bangla: "দানের শুরু ঘর থেকে।", category: "Proverbs" },
  { english: "Every dog has its day.", bangla: "সবার জীবনেই সুদিন আসে।", category: "Proverbs" },
  { english: "Half a loaf is better than none.", bangla: "না থাকার চেয়ে অর্ধেক থাকা ভালো।", category: "Proverbs" },
];
