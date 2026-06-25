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

export const phrasalVerbs: TranslationEntry[] = [
  { english: "Call off", bangla: "বাতিল করা", grammaticalNote: "Phrasal verb — to cancel something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Call for", bangla: "দাবি করা / প্রয়োজন হওয়া", grammaticalNote: "Phrasal verb — to require or demand", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Bring about", bangla: "সৃষ্টি করা / ঘটানো", grammaticalNote: "Phrasal verb — to cause something to happen", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Break out", bangla: "হঠাৎ শুরু হওয়া / পালিয়ে যাওয়া", grammaticalNote: "Phrasal verb — to start suddenly / escape", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Break down", bangla: "ভেঙে পড়া / নষ্ট হওয়া", grammaticalNote: "Phrasal verb — to stop working or collapse emotionally", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Look into", bangla: "তদন্ত করা / খতিয়ে দেখা", grammaticalNote: "Phrasal verb — to investigate", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Run out of", bangla: "শেষ হয়ে যাওয়া / নিঃশেষ হওয়া", grammaticalNote: "Phrasal verb — to have no more of something", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Give up", bangla: "ছেড়ে দেওয়া / হাল ছেড়ে দেওয়া", grammaticalNote: "Phrasal verb — to stop trying or abandon", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Put off", bangla: "পিছিয়ে দেওয়া / স্থগিত করা", grammaticalNote: "Phrasal verb — to postpone", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Set up", bangla: "স্থাপন করা / প্রতিষ্ঠা করা", grammaticalNote: "Phrasal verb — to establish", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Take after", bangla: "সদৃশ হওয়া / মতো হওয়া", grammaticalNote: "Phrasal verb — to resemble in personality", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Turn down", bangla: "প্রত্যাখ্যান করা", grammaticalNote: "Phrasal verb — to refuse or reject", difficulty: "easy", category: "Phrasal Verb" },
  { english: "Come across", bangla: "হঠাৎ পাওয়া / মুখোমুখি হওয়া", grammaticalNote: "Phrasal verb — to encounter unexpectedly", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Go through", bangla: "সহ্য করা / পরীক্ষা করা", grammaticalNote: "Phrasal verb — to experience or examine carefully", difficulty: "medium", category: "Phrasal Verb" },
  { english: "Stand by", bangla: "পাশে থাকা / সমর্থন করা", grammaticalNote: "Phrasal verb — to support someone or wait", difficulty: "easy", category: "Phrasal Verb" },
];

export const idiomsAndPhrases: TranslationEntry[] = [
  { english: "At the drop of a hat", bangla: "তাৎক্ষণিকভাবে / কোনো কারণ ছাড়াই", grammaticalNote: "Idiom — immediately or without hesitation", difficulty: "medium", category: "Idiom" },
  { english: "Beat around the bush", bangla: "ঘুরিয়ে পেঁচিয়ে বলা", grammaticalNote: "Idiom — to avoid the main topic", difficulty: "medium", category: "Idiom" },
  { english: "Bite the bullet", bangla: "কষ্ট সহ্য করে এগিয়ে যাওয়া", grammaticalNote: "Idiom — to endure a painful situation", difficulty: "hard", category: "Idiom" },
  { english: "Break the ice", bangla: "প্রথম পরিচয়ের জড়তা কাটানো", grammaticalNote: "Idiom — to start a conversation in an awkward situation", difficulty: "easy", category: "Idiom" },
  { english: "Burn the midnight oil", bangla: "রাত জেগে কাজ করা", grammaticalNote: "Idiom — to work or study late at night", difficulty: "easy", category: "Idiom" },
  { english: "Cost an arm and a leg", bangla: "অত্যন্ত ব্যয়সাধ্য হওয়া", grammaticalNote: "Idiom — to be very expensive", difficulty: "easy", category: "Idiom" },
  { english: "Cut corners", bangla: "সহজ পথে কাজ করা / মান না বজায় রাখা", grammaticalNote: "Idiom — to do something in the quickest but lowest-quality way", difficulty: "medium", category: "Idiom" },
  { english: "Hit the nail on the head", bangla: "ঠিক কথা বলা / মর্মস্থল স্পর্শ করা", grammaticalNote: "Idiom — to describe exactly what is causing the problem", difficulty: "medium", category: "Idiom" },
  { english: "Kick the bucket", bangla: "মারা যাওয়া", grammaticalNote: "Idiom (informal) — to die", difficulty: "medium", category: "Idiom" },
  { english: "Let the cat out of the bag", bangla: "গোপন কথা ফাঁস করা", grammaticalNote: "Idiom — to reveal a secret accidentally", difficulty: "medium", category: "Idiom" },
  { english: "Once in a blue moon", bangla: "কদাচিৎ / বিরলে", grammaticalNote: "Idiom — rarely or very seldom", difficulty: "easy", category: "Idiom" },
  { english: "Pull someone's leg", bangla: "কাউকে ঠাট্টা করা / রসিকতা করা", grammaticalNote: "Idiom — to tease or joke with someone", difficulty: "easy", category: "Idiom" },
  { english: "Sit on the fence", bangla: "নিরপেক্ষ থাকা / মাঝামাঝি অবস্থান নেওয়া", grammaticalNote: "Idiom — to avoid taking sides in a dispute", difficulty: "medium", category: "Idiom" },
  { english: "Spill the beans", bangla: "গোপন কথা প্রকাশ করা", grammaticalNote: "Idiom — to reveal secret information", difficulty: "medium", category: "Idiom" },
  { english: "The ball is in your court", bangla: "এখন তোমার পালা / সিদ্ধান্ত তোমার", grammaticalNote: "Idiom — it is up to you to make the next move", difficulty: "medium", category: "Idiom" },
  { english: "A blessing in disguise", bangla: "প্রথমে খারাপ মনে হলেও আসলে ভালো", grammaticalNote: "Idiom — something that seems bad but turns out good", difficulty: "hard", category: "Idiom" },
  { english: "Under the weather", bangla: "অসুস্থ / শরীর ভালো না", grammaticalNote: "Idiom — feeling unwell", difficulty: "easy", category: "Idiom" },
  { english: "Bite the dust", bangla: "পরাজিত হওয়া / ব্যর্থ হওয়া", grammaticalNote: "Idiom — to fail or be defeated", difficulty: "medium", category: "Idiom" },
  { english: "Barking up the wrong tree", bangla: "ভুল ব্যক্তিকে দোষারোপ করা", grammaticalNote: "Idiom — to pursue the wrong course of action", difficulty: "hard", category: "Idiom" },
  { english: "Get cold feet", bangla: "ভয় পেয়ে পিছিয়ে যাওয়া", grammaticalNote: "Idiom — to become fearful about something planned", difficulty: "medium", category: "Idiom" },
];

export const sampleSentences: SentenceTranslation[] = [
  {
    english: "Education is the most powerful weapon which you can use to change the world.",
    bangla: "শিক্ষা হলো সবচেয়ে শক্তিশালী অস্ত্র যা দিয়ে আপনি পৃথিবী পরিবর্তন করতে পারেন।",
    note: "Famous quote by Nelson Mandela — often appears in BCS",
    category: "Famous Quotes",
  },
  {
    english: "Honesty is the best policy.",
    bangla: "সততাই সর্বোত্তম পন্থা।",
    note: "Common proverb — test your writing speed",
    category: "Proverbs",
  },
  {
    english: "The government should take immediate steps to alleviate poverty.",
    bangla: "সরকারের উচিত দারিদ্র্য দূর করতে তাৎক্ষণিক পদক্ষেপ নেওয়া।",
    note: "BCS-style formal sentence",
    category: "Formal",
  },
  {
    english: "Democracy cannot survive without an educated and informed citizenry.",
    bangla: "শিক্ষিত এবং সচেতন নাগরিক ছাড়া গণতন্ত্র টিকে থাকতে পারে না।",
    note: "Political science — BCS written exam favorite",
    category: "Politics",
  },
  {
    english: "Knowledge is power, but character is more.",
    bangla: "জ্ঞানই শক্তি, কিন্তু চরিত্র তার চেয়েও বেশি।",
    category: "Famous Quotes",
  },
  {
    english: "The pen is mightier than the sword.",
    bangla: "কলম তলোয়ারের চেয়ে শক্তিশালী।",
    note: "Famous proverb — quick practice sentence",
    category: "Proverbs",
  },
  {
    english: "Corruption is one of the greatest obstacles to the development of a nation.",
    bangla: "দুর্নীতি একটি জাতির উন্নয়নের সবচেয়ে বড় বাধাগুলির মধ্যে একটি।",
    note: "Anti-corruption theme — common in BCS viva and written",
    category: "Social Issues",
  },
  {
    english: "Climate change is an existential threat to humanity.",
    bangla: "জলবায়ু পরিবর্তন মানবজাতির অস্তিত্বের জন্য হুমকিস্বরূপ।",
    note: "Environmental topic — frequently tested",
    category: "Environment",
  },
  {
    english: "Without hard work, success is impossible.",
    bangla: "কঠোর পরিশ্রম ছাড়া সাফল্য অসম্ভব।",
    category: "Motivation",
  },
  {
    english: "A stitch in time saves nine.",
    bangla: "সময়মতো একটি সেলাই পরে নয়টি সেলাই বাঁচায়।",
    note: "English proverb — test your speed and accuracy",
    category: "Proverbs",
  },
];
