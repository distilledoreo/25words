const LOCAL_DICTIONARY = [
  "apple","banana","car","dog","elephant","forest","guitar","house","island","jungle",
  "kangaroo","lamp","mountain","notebook","ocean","piano","queen","river","sunflower","tree",
  "umbrella","violin","window","xylophone","yogurt","zebra","airport","bridge","castle","diamond",
  "engine","fountain","garden","harbor","iceberg","jacket","kitchen","library","museum","network",
  "orchard","palace","quartz","robot","stadium","tunnel","unicorn","volcano","waterfall","xenon",
  "yacht","zeppelin","arch","battery","compass","drama","eclipse","fabric","glacier","horizon",
  "invoice","jewel","keyboard","lantern","meadow","nectar","opal","parrot","quill","radar",
  "satellite","temple","utensil","valley","whale","xerox","yodel","zephyr","alley","bamboo",
  "crystal","delta","ember","fjord","galleon","harvest","ignite","jigsaw","kettle","lagoon",
  "marble","nebula","overture","pixel","quasar","riddle","saffron","tundra","unity","vortex",
  "wander","xanthan","yearn","zeal","atlas","breeze","canyon","dynamo","ember","flint",
  "glow","hearth","ivy","jetty","kin","lumen","mosaic","nexus","oracle","parade",
  "quartzite","ripple","solace","tapestry","umbra","verge","wisp","yarrow","zircon","aurora",
  "brook","cinder","dune","estuary","fjord","grove","hush","isle","jolt","keel"
];

// Helper to capitalize words nicely
const capitalize = (s) => {
  if (!s) return s;
  return s.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
};

// Sample unique items from array
const sampleUnique = (arr, n) => {
  const set = new Set();
  const out = [];
  const max = Math.min(n, arr.length);
  while (out.length < max) {
    const i = Math.floor(Math.random() * arr.length);
    if (!set.has(i)) {
      set.add(i);
      out.push(arr[i]);
    }
  }
  return out;
};

/**
 * Fetch random words from public API or fallback to local dictionary
 * @param {number} count - Number of words to fetch
 * @returns {Promise<string[]>} Array of random words
 */
export async function fetchRandomWords(count = 5) {
  // Try the public random-word-api first
  const apiUrls = [
    `https://random-word-api.vercel.app/api?words=${count}`,
    `https://random-word-api.herokuapp.com/word?number=${count}`
  ];

  for (const url of apiUrls) {
    try {
      const resp = await fetch(url, { cache: "no-store" });
      if (!resp.ok) throw new Error('Bad response');
      const data = await resp.json();
      if (Array.isArray(data) && data.length >= count) {
        // sanitize + capitalize
        return data.slice(0, count).map(w => capitalize(String(w).replace(/[^a-zA-Z\s-]/g, '')));
      }
    } catch (err) {
      // try next url
      // console.warn('Random word API failed for', url, err.message);
    }
  }

  // fallback to local dictionary
  const picked = sampleUnique(LOCAL_DICTIONARY, count);
  return picked.map(w => capitalize(w));
}
