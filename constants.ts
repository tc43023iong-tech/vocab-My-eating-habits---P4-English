
import { Word, Furniture } from './types';

export const WORD_LIST: Word[] = [
  { 
    en: 'steak', cn: '牛排', emoji: '🥩', pronunciation: '/steɪk/', category: 'meat', 
    sentence: 'I like to eat juicy ____ for dinner.',
    details: {
      syllables: 'steak (1)',
      breakdown: 's-teak',
      etymology: 'From Old Norse "steik", meaning to roast meat on a spit.',
      funFact: 'The most expensive steak in the world comes from Wagyu cows in Japan!',
      realityScanner: 'Steak is rich in iron and protein, which helps our blood carry oxygen.'
    }
  },
  { 
    en: 'pork', cn: '豬肉', emoji: '🥓', pronunciation: '/pɔːk/', category: 'meat', 
    sentence: 'We use ____ to make delicious char siu.',
    details: {
      syllables: 'pork (1)',
      breakdown: 'p-ork',
      etymology: 'From the French word "porc", brought by the Normans to England.',
      funFact: 'Pigs are actually very clean animals and smarter than dogs!',
      realityScanner: 'Pork is a major source of Vitamin B1, which helps our nerves work well.'
    }
  },
  { 
    en: 'beef', cn: '牛肉', emoji: '🐂', pronunciation: '/biːf/', category: 'meat', 
    sentence: 'Many people like eating ____ balls in soup.',
    details: {
      syllables: 'beef (1)',
      breakdown: 'b-eef',
      etymology: 'From Old French "boef". We use "cow" for the animal and "beef" for the meat.',
      funFact: 'Cows have four stomach compartments to help them digest tough grass!',
      realityScanner: 'Beef contains zinc, which helps our immune system stay strong.'
    }
  },
  { 
    en: 'chicken', cn: '雞肉', emoji: '🍗', pronunciation: '/ˈtʃɪkɪn/', category: 'meat', 
    sentence: 'Fried ____ is a very popular snack.',
    details: {
      syllables: 'chick-en (2)',
      breakdown: 'chick + en',
      etymology: 'From Old English "cicen". It originally meant a young fowl.',
      funFact: 'Chickens are the closest living relatives to the Tyrannosaurus Rex!',
      realityScanner: 'Chicken is a "lean protein," which means it has less fat than red meat.'
    }
  },
  { 
    en: 'grapes', cn: '提子', emoji: '🍇', pronunciation: '/ɡreɪps/', category: 'fruit', 
    sentence: 'Purple ____ are sweet and small.',
    details: {
      syllables: 'grapes (1)',
      breakdown: 'g-rapes',
      etymology: 'From Old French "grape", which meant a bunch or cluster.',
      funFact: 'Grapes are technically berries! They can be used to make juice or jelly.',
      realityScanner: 'The skin of grapes contains antioxidants that help protect our heart.'
    }
  },
  { 
    en: 'cherries', cn: '櫻桃', emoji: '🍒', pronunciation: '/ˈtʃeriz/', category: 'fruit', 
    sentence: 'Red ____ look like little hearts.',
    details: {
      syllables: 'cher-ries (2)',
      breakdown: 'cher-ries',
      etymology: 'From the Greek word "kerasos", named after a city in Turkey.',
      funFact: 'Cherry trees are part of the rose family and have beautiful flowers!',
      realityScanner: 'Cherries contain melatonin, a natural substance that helps us sleep better.'
    }
  },
  { 
    en: 'lychees', cn: '荔枝', emoji: '🧄', pronunciation: '/ˈlaɪtʃiːz/', category: 'fruit', 
    sentence: '____ are sweet white fruits from summer.',
    details: {
      syllables: 'ly-chees (2)',
      breakdown: 'ly-chees',
      etymology: 'From Chinese "lìzhī". "Lì" means "to leave" the branch quickly.',
      funFact: 'The skin of a lychee is bumpy like a dragon’s skin, but the inside is soft!',
      realityScanner: 'Lychees have more Vitamin C than oranges per weight!'
    }
  },
  { 
    en: 'longans', cn: '龍眼', emoji: '🥥', pronunciation: '/ˈlɒŋ.ɡənz/', category: 'fruit', 
    sentence: '____ are small brown fruits with big seeds.',
    details: {
      syllables: 'lon-gans (2)',
      breakdown: 'lon-gans',
      etymology: 'Cantonese for "Dragon Eye" because the black seed looks like a pupil.',
      funFact: 'Longans are very close relatives of lychees and rambutans!',
      realityScanner: 'In traditional medicine, dried longans are used to help people relax.'
    }
  },
  { 
    en: 'spaghetti', cn: '意大利麵', emoji: '🍝', pronunciation: '/spəˈgeti/', category: 'staple', 
    sentence: 'I love long ____ with tomato sauce.',
    details: {
      syllables: 'spa-ghet-ti (3)',
      breakdown: 'spa-ghet-ti',
      etymology: 'Italian for "little strings". "Spago" means string.',
      funFact: 'Spaghetti was actually invented in China, not Italy, thousands of years ago!',
      realityScanner: 'Spaghetti is made from durum wheat, which provides complex carbohydrates for energy.'
    }
  },
  { 
    en: 'macaroni', cn: '通心粉', emoji: '🥣', pronunciation: '/ˌmækəˈrəʊni/', category: 'staple', 
    sentence: 'Grandma makes ____ soup for breakfast.',
    details: {
      syllables: 'ma-ca-ro-ni (4)',
      breakdown: 'ma-ca-ro-ni',
      etymology: 'From Italian "maccare", which means to crush or bruise wheat.',
      funFact: 'There are over 350 different shapes of pasta in the world!',
      realityScanner: 'The hollow center of macaroni helps it cook evenly and hold sauce inside.'
    }
  },
  { 
    en: 'carrots', cn: '紅蘿蔔', emoji: '🥕', pronunciation: '/ˈkærəts/', category: 'vegetable', 
    sentence: 'Rabbits love to eat orange ____.',
    details: {
      syllables: 'car-rots (2)',
      breakdown: 'car-rots',
      etymology: 'From Greek "karoton". It was named for its horn-like shape.',
      funFact: 'The first carrots in the world were purple or white, not orange!',
      realityScanner: 'Carrots are famous for Beta-carotene, which our body turns into Vitamin A.'
    }
  },
  { 
    en: 'tomatoes', cn: '番茄', emoji: '🍅', pronunciation: '/təˈmɑːtəʊz/', category: 'vegetable', 
    sentence: 'Red ____ are juicy and healthy.',
    details: {
      syllables: 'to-ma-toes (3)',
      breakdown: 'to-ma-toes',
      etymology: 'From the Aztec word "tomatl". They were first grown in Mexico.',
      funFact: 'Botanically, tomatoes are fruits! But we cook them as vegetables.',
      realityScanner: 'Tomatoes have Lycopene, which protects our cells from damage.'
    }
  },
  { 
    en: 'potatoes', cn: '馬鈴薯', emoji: '🥔', pronunciation: '/pəˈteɪtəʊz/', category: 'vegetable', 
    sentence: 'We can make French fries from ____.',
    details: {
      syllables: 'po-ta-toes (3)',
      breakdown: 'po-ta-toes',
      etymology: 'From Spanish "patata", mixing the names of two different plants.',
      funFact: 'Potato was the first vegetable ever grown in outer space (1995)!',
      realityScanner: 'Potatoes have more potassium than bananas, which helps our muscles.'
    }
  },
  { 
    en: 'lettuce', cn: '生菜', emoji: '🥬', pronunciation: '/ˈletɪs/', category: 'vegetable', 
    sentence: 'We use green ____ to make a salad.',
    details: {
      syllables: 'let-tuce (2)',
      breakdown: 'let-tuce',
      etymology: 'From Latin "lac", meaning milk, because the stem has white juice.',
      funFact: 'Ancient Egyptians thought lettuce was a symbol of strength!',
      realityScanner: 'Lettuce is about 95% water, so it’s great for staying hydrated.'
    }
  },
  { 
    en: 'broccoli', cn: '西蘭花', emoji: '🥦', pronunciation: '/ˈbɒkəli/', category: 'vegetable', 
    sentence: '____ looks like a small green tree.',
    details: {
      syllables: 'broc-co-li (3)',
      breakdown: 'broc-co-li',
      etymology: 'Italian for "cabbage sprout". It was developed from wild cabbage.',
      funFact: 'If you let broccoli grow too long, the green "trees" turn into yellow flowers!',
      realityScanner: 'Broccoli has as much calcium per cup as a glass of milk!'
    }
  },
  { 
    en: 'peas', cn: '傳統豌豆', emoji: '🟢', pronunciation: '/piːz/', category: 'vegetable', 
    sentence: 'Small green ____ are hidden in pods.',
    details: {
      syllables: 'peas (1)',
      breakdown: 'p-eas',
      etymology: 'From Greek "pison". It was one of the first plants people farmed.',
      funFact: 'Frozen peas are often fresher than fresh ones because they are frozen in hours!',
      realityScanner: 'Peas are a type of legume, meaning they add nitrogen to the soil.'
    }
  },
  { 
    en: 'beans', cn: '豆莢', emoji: '🌱', pronunciation: '/biːnz/', category: 'vegetable', 
    sentence: 'Green ____ are long and crunchy.',
    details: {
      syllables: 'beans (1)',
      breakdown: 'b-eans',
      etymology: 'From Proto-Germanic "bauno". It is an ancient word for any large seed.',
      funFact: 'There are over 40,000 different types of beans kept in world seed banks!',
      realityScanner: 'Beans are "super-foods" because they have both fiber and protein.'
    }
  },
  { 
    en: 'a lot of', cn: '很多', emoji: '💰', pronunciation: '', category: 'quantity', 
    sentence: 'There are ____ fruits in the basket.',
    details: {
      syllables: 'a lot of (3)',
      breakdown: 'a + lot + of',
      etymology: 'A "lot" used to be an object used to make choices by drawing portions.',
      funFact: 'We use "a lot of" for both things we can count and things we cannot!',
      realityScanner: 'Using "a lot of" is more common in speaking than formal writing.'
    }
  },
  { 
    en: 'fewer', cn: '少一些', emoji: '📉', pronunciation: '', category: 'quantity', 
    sentence: 'I want ____ candies because they are sweet.',
    details: {
      syllables: 'few-er (2)',
      breakdown: 'few + er',
      etymology: 'From Old English "feawe". The "-er" makes it a comparison.',
      funFact: 'Grammar Rule: Use "fewer" for things you can count, like apples!',
      realityScanner: 'Comparing amounts helps us make healthier choices in our diet.'
    }
  },
  { 
    en: 'less', cn: '少一些', emoji: '🥣', pronunciation: '', category: 'quantity', 
    sentence: 'Drink ____ soda to stay healthy.',
    details: {
      syllables: 'less (1)',
      breakdown: 'l-ess',
      etymology: 'From Old English "laes", meaning smaller or minor.',
      funFact: 'Grammar Rule: Use "less" for things you can’t count, like water or time!',
      realityScanner: 'Eating "less" sugar can prevent cavities and keep our energy steady.'
    }
  },
  { 
    en: 'more', cn: '多一些', emoji: '📈', pronunciation: '', category: 'quantity', 
    sentence: 'Can I have ____ vegetables, please?',
    details: {
      syllables: 'more (1)',
      breakdown: 'm-ore',
      etymology: 'From Old English "mara", meaning greater in size or number.',
      funFact: 'In some languages, "more" and "less" are combined into a single word!',
      realityScanner: 'We should always try to eat "more" colors of vegetables every day.'
    }
  },
  { 
    en: 'a little', cn: '少量', emoji: '💧', pronunciation: '', category: 'quantity', 
    sentence: 'Add ____ sugar to my tea.',
    details: {
      syllables: 'a lit-tle (3)',
      breakdown: 'a + lit-tle',
      etymology: 'From Old English "lytel". It refers to a small portion.',
      funFact: '"A little" usually sounds positive, while "little" sounds negative!',
      realityScanner: 'We use "a little" for uncountable things like salt or milk.'
    }
  },
  { 
    en: 'a few', cn: '少量', emoji: '🤏', pronunciation: '', category: 'quantity', 
    sentence: 'I have ____ friends in the park.',
    details: {
      syllables: 'a few (2)',
      breakdown: 'a + few',
      etymology: 'Similar to "fewer". It means a small number of something.',
      funFact: '"A few" means 3 or more, while "a couple" usually means exactly 2!',
      realityScanner: 'We use "a few" for countable things like friends, books, or cars.'
    }
  },
  { 
    en: 'energy', cn: '能量', emoji: '⚡', pronunciation: '', category: 'nutrients', 
    sentence: 'Healthy food gives us ____ to play.',
    details: {
      syllables: 'en-er-gy (3)',
      breakdown: 'en-er-gy',
      etymology: 'From Greek "energeia", which means "activity" or "at work".',
      funFact: 'Even when you are sleeping, your body is using energy to keep you alive!',
      realityScanner: 'We measure the energy in food using "calories".'
    }
  },
  { 
    en: 'protein', cn: '蛋白質', emoji: '💪', pronunciation: '', category: 'nutrients', 
    sentence: 'Meat and eggs have a lot of ____.',
    details: {
      syllables: 'pro-tein (2)',
      breakdown: 'pro-tein',
      etymology: 'From the Greek "proteios", which means "primary" or "first place".',
      funFact: 'Our hair and fingernails are almost entirely made of protein!',
      realityScanner: 'Protein helps fix our muscles when we exercise and grow taller.'
    }
  }
];

export const POKEMON_IDS = {
  detective: 25, // Pikachu
  matching: 133, // Eevee
  spelling: 15, // Beedrill
  fill: 54, // Psyduck
  bubble: 7, // Squirtle
  search: 1, // Bulbasaur
  battle: 6, // Charizard
  memory: 151, // Mew
};

export const FURNITURE_POOL: Furniture[] = [
  { id: '1', name: 'Comfy Sofa', emoji: '🛋️' },
  { id: '2', name: 'Cute Desk', emoji: '🪑' },
  { id: '3', name: 'Plant Pot', emoji: '🪴' },
  { id: '4', name: 'Magic Lamp', emoji: '🏮' },
  { id: '5', name: 'Big Rug', emoji: '🧶' },
  { id: '6', name: 'Toy Chest', emoji: '📦' },
  { id: '7', name: 'Bookshelf', emoji: '📚' },
  { id: '8', name: 'Painting', emoji: '🖼️' },
  { id: '9', name: 'Bird Cage', emoji: '🦜' },
  { id: '10', name: 'Game Console', emoji: '🎮' },
  { id: '11', name: 'Fruit Bowl', emoji: '🍎' },
  { id: '12', name: 'Clock', emoji: '⏰' },
  { id: '13', name: 'Bear Plush', emoji: '🧸' },
  { id: '14', name: 'Mini Fridge', emoji: '🧊' },
  { id: '15', name: 'Starlight Ceiling', emoji: '✨' },
  { id: '16', name: 'Crayon Box', emoji: '🖍️' },
];

export const getPokemonImg = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
