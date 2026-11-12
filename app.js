/**
 * StyleSphere — Core Frontend Engine
 * Zero dependency, pure vanilla high-performance state & visual renderer
 */

// ================= GLOBAL DATA CATALOGS =================

const INSPIRATIONS_DATA = [
  {
    country: 'indonesia',
    title: 'Modern Batik & Linen Fusion',
    location: 'Jakarta, Indonesia 🇮🇩',
    desc: 'Contemporary casual batik shirt paired with ivory linen trousers and leather slip-on loafers.',
    tags: ['Batik Modern', 'Hijab/Non-Hijab', 'All Ages'],
    img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'korea',
    title: 'Seoul Oversized Minimalist',
    location: 'Hongdae, Seoul 🇰🇷',
    desc: 'Oversized drop-shoulder poplin shirt, wide-leg charcoal slacks, and minimalist white leather court sneakers.',
    tags: ['Streetwear', 'Clean Fit', 'Youth'],
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'japan',
    title: 'Tokyo City Boy Layering',
    location: 'Shibuya, Tokyo 🇯🇵',
    desc: 'Boxy utility vest over heavyweight tee, balloon pleated chinos, and suede wallabee shoes.',
    tags: ['City Boy', 'Functional', 'Relaxed'],
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'italy',
    title: 'Milanese Sartorial Elegance',
    location: 'Milan, Italy 🇮🇹',
    desc: 'Unstructured hopsack blazer in tobacco brown, fine merino knit polo, and Gurkha dress trousers.',
    tags: ['Old Money', 'Quiet Luxury', 'Adult & 50+'],
    img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'us',
    title: 'NYC Soho Casual Chic',
    location: 'New York, USA 🇺🇸',
    desc: 'Cropped trench over high-waist vintage straight denim with chunky lug-sole Chelsea boots.',
    tags: ['Casual Chic', 'Everyday', 'Versatile'],
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'indonesia',
    title: 'Modest Pastel Hijab Harmony',
    location: 'Bandung, Indonesia 🇮🇩',
    desc: 'Soft sage green pashmina draped with buttoned knit cardigan and flowy pleated A-line skirt.',
    tags: ['Hijab Friendly', 'Modest', 'Soft Tone'],
    img: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'italy',
    title: 'Amalfi Coastal Resort Linen',
    location: 'Capri, Italy 🇮🇹',
    desc: 'Breezy cream camp-collar linen shirt with khaki drawstring shorts and woven espadrilles.',
    tags: ['Summer Resort', 'Lightweight', 'Breezy'],
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
  },
  {
    country: 'korea',
    title: 'K-Drama Tailored Power Look',
    location: 'Gangnam, Seoul 🇰🇷',
    desc: 'Structured double-breasted tweed jacket with matching cigarette trousers and pointed slingback heels.',
    tags: ['Tailored', 'Formal', 'Sophisticated'],
    img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80'
  }
];

const SCANNER_DEFAULT_DATA = {
  img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
  items: [
    {
      slot: 'Top',
      type: 'Relaxed Poplin Blouse',
      cut: 'Drop-Shoulder Boxy Cut',
      colorName: 'Ivory Cream',
      hex: '#F7F5F0',
      icon: 'shirt'
    },
    {
      slot: 'Bottom',
      type: 'High-Waist Tailored Culottes',
      cut: 'Wide-Leg Pleated',
      colorName: 'Charcoal Slate',
      hex: '#252525',
      icon: 'scissors'
    },
    {
      slot: 'Shoes',
      type: 'Classic Penny Loafers',
      cut: 'Almond Toe / Calfskin',
      colorName: 'Rich Espresso',
      hex: '#3B2820',
      icon: 'footprints'
    },
    {
      slot: 'Bags',
      type: 'Minimalist Crescent Shoulder Bag',
      cut: 'Smooth Italian Leather',
      colorName: 'Warm Taupe',
      hex: '#A58E79',
      icon: 'shopping-bag'
    },
    {
      slot: 'Belts / Gesper',
      type: 'Brushed Brass Buckle Gesper',
      cut: 'Slim 25mm Reversible Leather',
      colorName: 'Cognac Camel',
      hex: '#C19A6B',
      icon: 'shield'
    },
    {
      slot: 'Scarves / Slayer',
      type: 'Soft Silk Pashmina / Slayer',
      cut: 'Lightweight Breathable Drape',
      colorName: 'Champagne Beige',
      hex: '#E8E0D5',
      icon: 'wind'
    }
  ]
};

const OCCASIONS_DATA = {
  kondangan: [
    {
      title: 'Batik Sutra & Beskap Modern',
      demographic: 'Adults / Pria & Wanita',
      modesty: 'Hijab / Non-Hijab Friendly',
      top: 'Kemeja Batik Tulis Sutra / Kebaya Modern Brokat',
      bottom: 'Celana Wol Tailored Hitam / Kain Lilit Songket',
      shoes: 'Pantofel Kulit Oxford / Selop Brokat Mules',
      accessories: 'Gesper Kulit Formal, Bros Keemasan, Hand Clutch',
      img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Kebaya Encim & Selendang Anggun',
      demographic: 'All Ages / Wanita',
      modesty: 'Hijab Friendly (Pashmina Champagne)',
      top: 'Kebaya Bordir Halus Kartini',
      bottom: 'Rok Plisket Batik Cokelat Temu Lawak',
      shoes: 'Pointed Heeled Pumps Emas Muda',
      accessories: 'Tas Jinjing Tenun & Gesper Kebaya Perak',
      img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Jas Single-Breasted Dasi Sutra',
      demographic: 'Young & Adult / Pria',
      modesty: 'Universal Formal',
      top: 'Jas Wool Navy Dark & Kemeja Putih Poplin',
      bottom: 'Celana Bahan Slim Tapered Navy',
      shoes: 'Sepatu Loafers Kulit Mengkilap',
      accessories: 'Dasi Sutra Maroon, Jam Tangan Kulit, Gesper Hitam',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    }
  ],
  formal: [
    {
      title: 'Executive Black-Tie Gala Set',
      demographic: 'Adults / Senior 50+',
      modesty: 'Universal Luxury',
      top: 'Tuxedo Satin Lapel / Floor-Length Gown',
      bottom: 'Tailored Dinner Pants',
      shoes: 'Patent Leather Dress Shoes / Classic Stilettos',
      accessories: 'Bowtie / Minimalist Pearl Choker & Clutch',
      img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Modern Academic & Diploma Suit',
      demographic: 'Teens & Young Adults (17-25)',
      modesty: 'Modest Formal',
      top: 'Structured Grey Herringbone Blazer',
      bottom: 'Crisp Pleated Charcoal Trousers',
      shoes: 'Polished Black Derby Shoes',
      accessories: 'Leather Gesper & Minimalist Portfolio Bag',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    }
  ],
  kerja: [
    {
      title: 'Smart Business Casual (Kantor Kreatif)',
      demographic: 'Young & Adult (20-45)',
      modesty: 'Hijab / Non-Hijab Friendly',
      top: 'Knit Polo Shirt / Drape Linen Blouse',
      bottom: 'Ankle Cut Chino Khaki / Wide Leg Slacks',
      shoes: 'Clean Leather White Sneakers / Loafers',
      accessories: 'Sling Laptop Bag, Gesper Anyam Cokelat',
      img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Corporate Professional Navy Blazer',
      demographic: 'All Genders (25-50+)',
      modesty: 'Modest Structured',
      top: 'Kemeja Katun Biru Muda & Blazer Navy',
      bottom: 'Celana Bahan Wol Abu-abu Tua',
      shoes: 'Sepatu Kulit Formal / Block Heels 3cm',
      accessories: 'Briefcase Kulit & Ikat Pinggang Formal',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    }
  ],
  nongkrong: [
    {
      title: 'Café & Street Casual Oversize',
      demographic: 'Kids to Young Adults (12-30)',
      modesty: 'Casual Modern',
      top: 'Heavyweight Boxy T-Shirt (Putih/Sage)',
      bottom: 'Loose Carpenter Cargo Pants / Baggy Denim',
      shoes: 'Retro Court Skate Sneakers',
      accessories: 'Slayer Bandana / Cap, Canvas Tote Bag',
      img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Soft Korean Knit & Denim Outing',
      demographic: 'All Ages / Wanita & Pria',
      modesty: 'Hijab Pashmina Friendly',
      top: 'Cardigan Rajut Taupe + Inner Kaos Basic',
      bottom: 'Celana Jeans Lurus High-Rise',
      shoes: 'Flat Mules Kulit / Retro Dad Runners',
      accessories: 'Mini Crossbody Bag & Slayer Leher',
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    }
  ],
  taman: [
    {
      title: 'Breezy Family Picnic & Stroller Fit',
      demographic: 'Babies (0-5), Kids & Parents',
      modesty: 'Relaxed & Breathable',
      top: 'Kaos Katun Organik / Linen Tunic Adem',
      bottom: 'Celana Pendek Chino / Culottes Katun Karet',
      shoes: 'Sepatu Slip-on Ringan / Sandal Tali Kulit',
      accessories: 'Topi Bucket Anti-UV, Slayer Leher Bayi, Cooler Bag',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Kids & Teens Park Play Active',
      demographic: 'Toddlers to Teens',
      modesty: 'High Mobility',
      top: 'Jersey Katun Breathable Ringan',
      bottom: 'Celana Jogger Stretch dengan Pelindung Lutut',
      shoes: 'Cushioned Running Shoes Anak/Remaja',
      accessories: 'Topi Baseball & Botol Minum Tumbler Ringan',
      img: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

const SPORTS_DATA = {
  hiking: {
    name: 'Hiking / Naik Gunung',
    subtitle: 'High-Altitude Trekking & Trail Expedition',
    desc: 'Dirancang untuk ketahanan cuaca pegunungan tropis, bahan cepat kering (quick-dry), ventilasi optimal, serta proteksi duri dan angin dingin.',
    outfit: {
      top: 'Base-Layer Merino Wool / Quick-Dry Poly Long Sleeve + Windproof Softshell',
      bottom: 'Celana Cargo Trekking Quick-Dry (Ripstop Stretch)',
      headwear: 'Buff / Slayer Multifungsi + Topi Rimba UV Protector (Hijab: Jersey Sport Hijab)',
      shoes: 'Sepatu Gunung High-Cut Vibram Grip Waterproof'
    },
    checklist: [
      { name: 'Trekking Poles (Sepasang Aluminium/Carbon)', essential: true },
      { name: 'Carrier / Daypack 35L - 50L Ergonomis', essential: true },
      { name: 'Raincoat / Ponco GORE-TEX Tahan Badai', essential: true },
      { name: 'Water Bladder / Botol Minum 2 Liter + Elektrolit', essential: true },
      { name: 'Headlamp LED 300+ Lumens + Baterai Cadangan', essential: true },
      { name: 'Kotak P3K Medis Darurat & Emergency Blanket', essential: true },
      { name: 'Slayer Leher / Masker Debu Gunung', essential: false },
      { name: 'Kacamata UV Polarized Gunung', essential: false }
    ],
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80'
  },
  gym: {
    name: 'Gym & Strength Training',
    subtitle: 'Heavy Lifting, CrossFit & Calisthenics',
    desc: 'Fokus pada fleksibilitas rentang gerak 360 derajat, kain anti-gesekan, dan sol sepatu datar stabil untuk deadlift/squat.',
    outfit: {
      top: 'Compression Tee / Sleeveless Tech Tank (Hijab: Long Modest Active Tunic)',
      bottom: 'Performance Training Shorts dengan Compression Inner / Tights',
      headwear: 'Sweatband / Headband Handuk Penahan Keringat',
      shoes: 'Flat-Sole Training Shoes (Metcon / Barefoot Grip)'
    },
    checklist: [
      { name: 'Sabuk Angkat Beban (Weightlifting Leather Belt)', essential: true },
      { name: 'Lifting Straps / Hand Grip Pad', essential: true },
      { name: 'Shaker Protein + Botol Air Minum 1L', essential: true },
      { name: 'Handuk Gym Cepat Kering (Microfiber)', essential: true },
      { name: 'Smartwatch / Heart Rate Monitor', essential: false },
      { name: 'Wireless Earbuds Noise Cancelling', essential: false }
    ],
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
  },
  pilates: {
    name: 'Pilates & Yoga Studio',
    subtitle: 'Reformer Pilates, Flow Yoga & Core Mobility',
    desc: 'Kain nilon elastane ekstra lembut tanpa kancing atau gesper keras agar nyaman di atas reformer carriage atau matras.',
    outfit: {
      top: 'Seamless Longline Bra / Draped Modal Open-Back Top',
      bottom: 'High-Rise Butter-Soft Leggings (Ankle Length)',
      headwear: 'Soft Scrunchie / Hijab Turban Sport Breathable',
      shoes: 'Grip Socks dengan Silikon Anti-Selip'
    },
    checklist: [
      { name: 'Matras Yoga Karet Alami (Natural Rubber 5mm)', essential: true },
      { name: 'Kaos Kaki Grip Anti-Slip Pilates (2 Pasang)', essential: true },
      { name: 'Resistance Band Elastis (Light to Heavy)', essential: true },
      { name: 'Botol Minum Infused Water Kaca / Stainless', essential: true },
      { name: 'Yoga Block Busa Padat & Tali Peregangan', essential: false }
    ],
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80'
  },
  running: {
    name: 'Running & Marathon Cardio',
    subtitle: 'Road Running, 5K, 10K & Half-Marathon',
    desc: 'Keringanan bobot gram ultra-ringan, sirkulasi angin sejuk, panel reflektif untuk lari malam, serta bantalan sepatu responsif.',
    outfit: {
      top: 'Aero-mesh Featherweight Jersey (Anti-Chafing Seams)',
      bottom: 'Split Shorts 3-inch / 2-in-1 Running Tights',
      headwear: 'Lightweight Breathable Runner Cap',
      shoes: 'Carbon-Plated Racing Shoes / Responsive Cushion Trainers'
    },
    checklist: [
      { name: 'Running Vest / Hydration Pack Ringan', essential: true },
      { name: 'Energy Gel Nutrisi Cepat Serap', essential: true },
      { name: 'Lampu Klip Reflektif untuk Lari Subuh/Malam', essential: true },
      { name: 'Kaos Kaki Lari Anti-Lecet (Seamless)', essential: true },
      { name: 'Kacamata Lari Anti-Guncang (Sports Sunglasses)', essential: false }
    ],
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
  }
};

const COLOR_PRESETS = [
  { name: 'Classic Black', hex: '#111827' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Ivory Cream', hex: '#F7F5F0' },
  { name: 'Warm Beige', hex: '#E8E0D5' },
  { name: 'Tobacco Camel', hex: '#C19A6B' },
  { name: 'Rich Espresso', hex: '#3B2820' },
  { name: 'Midnight Navy', hex: '#1E293B' },
  { name: 'Sky Cerulean', hex: '#0EA5E9' },
  { name: 'Botanical Sage', hex: '#9CAF88' },
  { name: 'Forest Olive', hex: '#4D6B53' },
  { name: 'Terracotta Rust', hex: '#C25E43' },
  { name: 'Burgundy Wine', hex: '#7F1D1D' },
  { name: 'Soft Dusty Pink', hex: '#F4C2C2' },
  { name: 'Lavender Mist', hex: '#C084FC' },
  { name: 'Charcoal Slate', hex: '#334155' },
  { name: 'Warm Taupe', hex: '#A58E79' },
  { name: 'Mustard Ochre', hex: '#D97706' },
  { name: 'Emerald Jewel', hex: '#059669' }
];

const CUTS_DATABASE = {
  tops: [
    'Regular Crewneck', 'Oversized Boxy Tee', 'Button-Down Oxford', 'Camp-Collar Linen Shirt',
    'Mandarin Band Collar', 'Merino Knit Polo', 'Sleeveless Ribbed Tank', 'Crop Blouse',
    'Draped Silk Blouse', 'Kebaya Brokat Modern', 'Batik Lengan Panjang', 'Chiffon Tunic',
    'Heavyweight French Terry Hoodie', 'Unstructured Tailored Blazer', 'Safari Pocket Overshirt'
  ],
  bottoms: [
    'Straight Leg Jeans', 'Baggy Carpenter Denim', 'Pleated Gurkha Trousers', 'Slim Chino Pants',
    'Wide-Leg Tailored Slacks', 'Balloon Tapered Chinos', 'Cargo Multi-Pocket Pants',
    'Linen Drawstring Trousers', 'Tailored Cigarette Pants', 'Sweatpants Jogger Fleece'
  ],
  skirts: [
    'A-Line Pleated Midi', 'Satin Bias-Cut Maxi Skirt', 'Kain Lilit Songket / Batik',
    'Tiered Bohemian Skirt', 'Pencil Skirt Formal', 'Tenniscore Pleated Skort',
    'Flowy Chiffon Wrap Dress', 'Abaya Maxi Modest'
  ],
  accessories: [
    'Shoulder Crescent Bag', 'Leather Tote Bag', 'Tote Canvas Laptop', 'Tactical Crossbody Sling',
    'Gesper Gesper Kulit 25mm', 'Gesper Anyam Kulit Santai', 'Gesper Kuningan Formal',
    'Slayer Leher Sutra', 'Pashmina Modal Silk Hijab', 'Segiempat Voal Premium Hijab',
    'Bandana Slayer Katun', 'Oxford Leather Shoes', 'Penny Loafers', 'White Court Sneakers',
    'Chunky Lug-Sole Boots', 'Pointed Slingback Mules'
  ]
};

// ================= APP STATE =================

let currentTab = 'dashboard';
let currentScannerData = JSON.parse(JSON.stringify(SCANNER_DEFAULT_DATA));
let selectedSlotForColorSwap = 0; // Index of item in currentScannerData.items

// ================= INITIALIZATION =================

document.addEventListener('DOMContentLoaded', () => {
  renderInspirations('all');
  renderScannerSlots();
  renderColorSwatches();
  filterOccasionTag('kondangan');
  selectSportActivity('hiking');
  renderCutsDirectory();
  lucide.createIcons();
});

// ================= TAB SWITCHING =================

function switchTab(tabId) {
  currentTab = tabId;

  // Hide all tab panes
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));

  // Show active tab
  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) {
    activePane.classList.remove('hidden');
  }

  // Update desktop nav styles
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
    btn.classList.add('text-slate-700');
  });
  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
    activeNav.classList.remove('text-slate-700');
  }

  // Update mobile bottom nav
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    if (btn.getAttribute('data-target') === tabId) {
      btn.classList.add('text-brand-600');
      btn.classList.remove('text-slate-500');
    } else {
      btn.classList.remove('text-brand-600');
      btn.classList.add('text-slate-500');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

function triggerQuickScan() {
  switchTab('scanner');
}

// ================= INSPIRATIONS RENDERER =================

function filterInspirations(country) {
  // Update pill styles
  document.querySelectorAll('.insp-pill').forEach(btn => {
    btn.classList.remove('bg-slate-900', 'text-white');
    btn.classList.add('bg-white', 'text-slate-600');
  });
  event.target.classList.add('bg-slate-900', 'text-white');
  event.target.classList.remove('bg-white', 'text-slate-600');

  renderInspirations(country);
}

function renderInspirations(country) {
  const container = document.getElementById('inspiration-grid');
  if (!container) return;

  const filtered = country === 'all' 
    ? INSPIRATIONS_DATA 
    : INSPIRATIONS_DATA.filter(item => item.country === country);

  container.innerHTML = filtered.map(item => `
    <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col justify-between">
      <div>
        <div class="relative aspect-[3/4] bg-slate-100 overflow-hidden">
          <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            ${item.location}
          </span>
        </div>
        <div class="p-4 space-y-2">
          <h3 class="font-display font-bold text-base text-slate-900 leading-snug">${item.title}</h3>
          <p class="text-xs text-slate-500 line-clamp-2">${item.desc}</p>
        </div>
      </div>
      <div class="p-4 pt-0">
        <div class="flex flex-wrap gap-1 border-t border-slate-100 pt-3">
          ${item.tags.map(t => `<span class="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// ================= SCANNER & COLOR SWAPPER =================

function renderScannerSlots() {
  const container = document.getElementById('garment-slots-container');
  if (!container) return;

  container.innerHTML = currentScannerData.items.map((item, idx) => `
    <div onclick="selectSlotForColor(${idx})" class="p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${selectedSlotForColorSwap === idx ? 'border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
          <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-brand-600">${item.slot}</span>
          <h4 class="font-bold text-sm text-slate-900">${item.type}</h4>
          <span class="text-xs text-slate-500">${item.cut}</span>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <div class="w-7 h-7 rounded-full border border-black/15 shadow-sm" style="background-color: ${item.hex}" title="${item.colorName}"></div>
        <div class="text-right">
          <span class="text-[11px] font-mono font-bold text-slate-700 block">${item.hex}</span>
          <span class="text-[10px] text-slate-400">Click to Swap</span>
        </div>
      </div>
    </div>
  `).join('');

  // Update floating badges
  document.getElementById('badge-top-name').textContent = currentScannerData.items[0]?.type || 'Top';
  document.getElementById('badge-bottom-name').textContent = currentScannerData.items[1]?.type || 'Bottom';
  document.getElementById('badge-shoes-name').textContent = currentScannerData.items[2]?.type || 'Shoes';

  lucide.createIcons();
}

function selectSlotForColor(idx) {
  selectedSlotForColorSwap = idx;
  renderScannerSlots();
}

function renderColorSwatches() {
  const container = document.getElementById('swatch-quick-bar');
  if (!container) return;

  container.innerHTML = COLOR_PRESETS.map(col => `
    <button onclick="swapColorOnSelectedItem('${col.hex}', '${col.name}')" class="w-7 h-7 rounded-full border border-black/15 hover:scale-110 transition shadow-sm shrink-0" style="background-color: ${col.hex}" title="${col.name} (${col.hex})"></button>
  `).join('');
}

function swapColorOnSelectedItem(hex, name) {
  if (currentScannerData.items[selectedSlotForColorSwap]) {
    currentScannerData.items[selectedSlotForColorSwap].hex = hex;
    currentScannerData.items[selectedSlotForColorSwap].colorName = name;
    renderScannerSlots();
  }
}

function handleImageUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    document.getElementById('scanner-preview-img').src = dataUrl;
    
    // Switch to scanner tab and show result
    switchTab('scanner');
  };
  reader.readAsDataURL(file);
}

function loadSamplePreset(presetKey) {
  switchTab('scanner');
}

function exportScanSummary() {
  alert('Outfit Breakdown & Color Palette exported successfully to your clipboard!');
}

// ================= OCCASION TAGS RENDERER =================

function filterOccasionTag(tag) {
  // Update occasion tab styles
  document.querySelectorAll('.occ-tab').forEach(btn => {
    btn.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
    btn.classList.add('bg-white', 'border-slate-200', 'text-slate-700');
  });
  const activeBtn = document.querySelector(`.occ-tab[data-tag="${tag}"]`);
  if (activeBtn) {
    activeBtn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
    activeBtn.classList.remove('bg-white', 'border-slate-200', 'text-slate-700');
  }

  const container = document.getElementById('occasion-cards-grid');
  if (!container) return;

  const list = OCCASIONS_DATA[tag] || [];
  container.innerHTML = list.map(item => `
    <div class="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div class="relative aspect-video bg-slate-100 overflow-hidden">
          <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            ${item.demographic}
          </span>
          <span class="absolute top-3 right-3 bg-brand-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            ${item.modesty}
          </span>
        </div>
        
        <div class="p-5 space-y-3">
          <h3 class="font-display font-bold text-lg text-slate-900 leading-snug">${item.title}</h3>

          <div class="space-y-2 text-xs">
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-400 w-16 shrink-0 uppercase tracking-wider text-[10px]">Top:</span>
              <span class="text-slate-700">${item.top}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-400 w-16 shrink-0 uppercase tracking-wider text-[10px]">Bottom:</span>
              <span class="text-slate-700">${item.bottom}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-400 w-16 shrink-0 uppercase tracking-wider text-[10px]">Shoes:</span>
              <span class="text-slate-700">${item.shoes}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="font-bold text-slate-400 w-16 shrink-0 uppercase tracking-wider text-[10px]">Acc:</span>
              <span class="text-slate-700">${item.accessories}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="applyLookToScanner('${item.title}', '${item.img}')" class="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5">
          <i data-lucide="scan" class="w-3.5 h-3.5 text-brand-600"></i> Load in Head-to-Toe Scanner
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function applyLookToScanner(title, imgUrl) {
  document.getElementById('scanner-preview-img').src = imgUrl;
  switchTab('scanner');
}

// ================= SPORTS & ACTIVEWEAR HUB =================

function selectSportActivity(sportKey) {
  // Update buttons
  document.querySelectorAll('.sport-btn').forEach(btn => {
    btn.classList.remove('bg-slate-900', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'border-slate-200', 'text-slate-700');
  });
  const activeBtn = document.querySelector(`.sport-btn[data-sport="${sportKey}"]`);
  if (activeBtn) {
    activeBtn.classList.add('bg-slate-900', 'text-white', 'shadow-md');
    activeBtn.classList.remove('bg-white', 'border-slate-200', 'text-slate-700');
  }

  const data = SPORTS_DATA[sportKey];
  const container = document.getElementById('sport-detail-card');
  if (!container || !data) return;

  container.innerHTML = `
    <!-- Left: Activity Info & Recommended Breathable Outfit -->
    <div class="lg:col-span-6 space-y-5">
      <div>
        <div class="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 uppercase tracking-wider mb-1">
          <i data-lucide="activity" class="w-3.5 h-3.5"></i> ${data.subtitle}
        </div>
        <h3 class="font-display font-bold text-2xl text-slate-900">${data.name}</h3>
        <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">${data.desc}</p>
      </div>

      <div class="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
        <img src="${data.img}" alt="${data.name}" class="w-full h-full object-cover">
      </div>

      <!-- Breathable Outfit Breakdown -->
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
        <span class="text-xs font-bold text-slate-800 uppercase tracking-wider block">Recommended Breathable Outfit:</span>
        <div class="space-y-1.5 text-xs">
          <p><strong class="text-slate-700">Top Layer:</strong> ${data.outfit.top}</p>
          <p><strong class="text-slate-700">Bottom:</strong> ${data.outfit.bottom}</p>
          <p><strong class="text-slate-700">Head / Neckwear:</strong> ${data.outfit.headwear}</p>
          <p><strong class="text-slate-700">Footwear:</strong> ${data.outfit.shoes}</p>
        </div>
      </div>
    </div>

    <!-- Right: Recommended Equipment Checklist -->
    <div class="lg:col-span-6 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 class="font-bold text-base text-slate-900">Recommended Equipment Checklist</h4>
          <span class="text-xs text-slate-500">Interactive gear preparation for this sport</span>
        </div>
        <span class="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
          Safety Certified
        </span>
      </div>

      <div class="space-y-2">
        ${data.checklist.map((item, i) => `
          <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition">
            <div class="flex items-center gap-3">
              <input type="checkbox" checked class="w-4 h-4 rounded text-brand-600 accent-brand-600 focus:ring-brand-500">
              <span class="text-xs font-semibold text-slate-800">${item.name}</span>
            </div>
            ${item.essential ? '<span class="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">Essential</span>' : '<span class="text-[10px] text-slate-400">Optional</span>'}
          </label>
        `).join('')}
      </div>

      <div class="p-4 rounded-xl bg-brand-50/60 border border-brand-200 text-xs text-brand-900 flex items-center justify-between">
        <span>Ready for adventure? Check off items as you pack!</span>
        <button onclick="alert('Gear checklist printed / exported successfully!')" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-[11px] transition">Export Checklist</button>
      </div>
    </div>
  `;

  lucide.createIcons();
}

// ================= COLOR WHEEL & CUTS DIRECTORY =================

function updateColorSelection(hex) {
  document.getElementById('selected-hex-display').textContent = hex.toUpperCase();
  document.getElementById('color-preview-box').style.backgroundColor = hex;
}

function renderCutsDirectory() {
  // Preset palettes
  const palContainer = document.getElementById('preset-color-palette');
  if (palContainer) {
    palContainer.innerHTML = COLOR_PRESETS.map(col => `
      <button onclick="updateColorSelection('${col.hex}'); document.getElementById('hex-picker-input').value = '${col.hex}'" class="h-10 rounded-xl border border-black/15 shadow-sm hover:scale-105 transition" style="background-color: ${col.hex}" title="${col.name}"></button>
    `).join('');
  }

  // Cuts
  const fillPills = (id, list) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = list.map(item => `
      <span class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:border-brand-500 cursor-pointer transition">${item}</span>
    `).join('');
  };

  fillPills('cuts-tops', CUTS_DATABASE.tops);
  fillPills('cuts-bottoms', CUTS_DATABASE.bottoms);
  fillPills('cuts-skirts', CUTS_DATABASE.skirts);
  fillPills('cuts-accessories', CUTS_DATABASE.accessories);
}

// ================= GLOBAL FILTERS =================

function applyGlobalFilters() {
  const age = document.getElementById('global-age-select')?.value;
  const modesty = document.getElementById('global-modesty-select')?.value;
  
  const badge = document.getElementById('active-demographic-badge');
  if (badge) {
    badge.textContent = `Age: ${age.toUpperCase()} · ${modesty.toUpperCase()}`;
  }
}
