const mongoose = require('mongoose');
const Article = require('./models/Article');
require('dotenv').config();

// All 12 articles from your mockArticles.js
const mockArticles = [
  {
    title: "Indian Army's New Tactical Communication System",
    excerpt: "The Indian Army has successfully deployed a new tactical communication system to enhance battlefield connectivity and coordination.",
    content: "The Indian Army has recently deployed an advanced tactical communication system that promises to revolutionize battlefield operations. This state-of-the-art system provides secure, real-time communication between units, ensuring seamless coordination during operations.\n\nThe system features:\n- Encrypted communication channels\n- Real-time GPS tracking\n- Multi-level security protocols\n- Integration with existing military infrastructure\n\nThis development comes at a crucial time when modern warfare demands rapid information exchange and coordinated responses. The tactical communication system will significantly enhance the Army's operational capabilities and response times.",
    category: "Army",
    examTags: ["CDS", "NDA", "AFCAT", "CAPF"],
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    importantPoints: [
      "Enhances battlefield coordination and communication",
      "Improves operational security through encryption",
      "Reduces response time during critical situations",
      "Represents modernization of Indian Army's communication infrastructure"
    ],
    examImportance: "This topic is crucial for defence exams as it demonstrates:\n1. Modernization efforts in the Indian Armed Forces\n2. Understanding of tactical communication systems\n3. Importance of technology in modern warfare\n4. Defence procurement and infrastructure development"
  },
  {
    title: "INS Vikrant: India's First Indigenous Aircraft Carrier",
    excerpt: "INS Vikrant marks a significant milestone in India's naval capabilities, showcasing indigenous shipbuilding expertise.",
    content: "INS Vikrant, India's first indigenously designed and built aircraft carrier, represents a monumental achievement in the nation's shipbuilding capabilities. This 40,000-tonne warship was commissioned in 2022 and has since become a symbol of India's growing naval prowess.\n\nKey features of INS Vikrant:\n- Capacity to carry 30 aircraft including MiG-29K fighters\n- State-of-the-art radar and sensor systems\n- Advanced combat management system\n- Indigenous design and 76% indigenous content\n\nThe carrier enhances India's power projection capabilities in the Indian Ocean Region and strengthens the country's strategic position. It demonstrates India's ability to design and construct complex naval platforms, reducing dependence on foreign suppliers.",
    category: "Navy",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
    importantPoints: [
      "First indigenously designed aircraft carrier",
      "76% indigenous content, showcasing Atmanirbhar Bharat",
      "Enhances power projection in Indian Ocean Region",
      "Capable of carrying 30 aircraft including fighters and helicopters"
    ],
    examImportance: "Critical for defence exams because:\n1. Demonstrates India's indigenous defence manufacturing capabilities\n2. Shows progress in naval modernization\n3. Important for understanding India's strategic maritime interests\n4. Highlights Make in India initiative in defence sector"
  },
  {
    title: "Rafale Fighter Jets: Air Force's Game Changer",
    excerpt: "The Rafale aircraft have significantly enhanced the Indian Air Force's combat capabilities and operational readiness.",
    content: "The induction of Rafale fighter jets has marked a new era in the Indian Air Force's combat capabilities. These multi-role fighters, manufactured by Dassault Aviation, provide the IAF with advanced air superiority and ground attack capabilities.\n\nRafale features:\n- Advanced radar and electronic warfare systems\n- Beyond-visual-range air-to-air missiles\n- Precision ground attack munitions\n- Nuclear capability\n- Superior maneuverability and range\n\nThe aircraft are stationed at Ambala and Hasimara airbases and have been integrated into the IAF's operational doctrine. They significantly enhance India's air defence capabilities and provide a strategic deterrent in the region.",
    category: "Air Force",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    importantPoints: [
      "Multi-role fighter enhancing IAF capabilities",
      "Nuclear-capable platform for strategic deterrence",
      "Advanced electronic warfare and radar systems",
      "Based at Ambala and Hasimara airbases"
    ],
    examImportance: "Important for exams as it covers:\n1. Modernization of Indian Air Force\n2. Strategic defence partnerships (India-France)\n3. Multi-role combat aircraft capabilities\n4. Nuclear triad completion in India's defence strategy"
  },
  {
    title: "Joint Military Exercise 'Ex Malabar 2024'",
    excerpt: "India, US, Japan, and Australia conducted joint naval exercises to enhance maritime cooperation and interoperability.",
    content: "Exercise Malabar 2024 brought together naval forces from India, the United States, Japan, and Australia in a demonstration of maritime cooperation and interoperability. This annual exercise has grown in significance as Quad countries strengthen their strategic partnership.\n\nExercise highlights:\n- Anti-submarine warfare drills\n- Air defence operations\n- Maritime interdiction operations\n- Surface warfare exercises\n- Humanitarian assistance and disaster relief\n\nThe exercise strengthens regional security architecture and promotes a free and open Indo-Pacific. It demonstrates India's commitment to multilateral naval cooperation and its role as a net security provider in the region.",
    category: "Joint Forces",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
    importantPoints: [
      "Quad countries naval cooperation exercise",
      "Focus on maritime security in Indo-Pacific",
      "Enhances interoperability between naval forces",
      "Demonstrates India's role as net security provider"
    ],
    examImportance: "Relevant for exams because:\n1. Shows India's strategic partnerships and foreign policy\n2. Understanding of Quad alliance and Indo-Pacific strategy\n3. Importance of joint military exercises\n4. India's position in regional security architecture"
  },
  {
    title: "Agniveer Scheme: Modernizing Armed Forces Recruitment",
    excerpt: "The Agnipath scheme introduces a new model for recruiting personnel into the Indian Armed Forces.",
    content: "The Agnipath scheme represents a transformative approach to military recruitment in India. Introduced in 2022, this scheme recruits personnel (Agniveers) for a four-year service period, with 25% retained for permanent commission.\n\nKey aspects:\n- Four-year service tenure with exit after 2-4 years\n- 25% retention for permanent service\n- Focus on youth and modern skill development\n- Attractive financial package and post-service opportunities\n- Integration into all three services (Army, Navy, Air Force)\n\nThe scheme aims to create a younger, more tech-savvy force while providing employment opportunities to India's youth. It has generated significant discussion about its impact on operational effectiveness and career prospects.",
    category: "Joint Forces",
    examTags: ["CDS", "NDA", "AFCAT", "CAPF"],
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1581601831974-1c2d46d29b35?w=800",
    importantPoints: [
      "Four-year service model with 25% retention",
      "Applies to Army, Navy, and Air Force",
      "Focus on youth and modern skills",
      "Includes financial benefits and exit packages"
    ],
    examImportance: "Critical topic for all defence exams:\n1. Recent major reform in recruitment policy\n2. Affects all three services\n3. Important for understanding current armed forces structure\n4. High probability in current affairs sections"
  },
  {
    title: "India's Defence Export Milestone",
    excerpt: "India achieves record defence exports, showcasing growing capabilities in defence manufacturing and export.",
    content: "India has achieved a historic milestone in defence exports, reaching an all-time high and establishing itself as a significant player in the global defence market. This achievement reflects the success of government policies promoting defence manufacturing and export.\n\nKey highlights:\n- Record-breaking export figures in recent years\n- Export to over 85 countries\n- Diverse product range including missiles, radars, and naval vessels\n- Boost to Make in India initiative\n- Enhanced strategic partnerships through defence cooperation\n\nMajor export destinations include Southeast Asia, Middle East, and African nations. Products range from Brahmos missiles to advanced radars and communication systems. This growth demonstrates India's evolving defence industrial base and technological capabilities.",
    category: "Joint Forces",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-03",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800",
    importantPoints: [
      "Record defence exports achieved",
      "Exports to over 85 countries worldwide",
      "Includes missiles, radars, naval systems",
      "Supports Atmanirbhar Bharat and Make in India"
    ],
    examImportance: "Important for exams as it shows:\n1. India's growing defence manufacturing capabilities\n2. Success of government policies (Make in India)\n3. Strategic partnerships through defence trade\n4. Economic and strategic significance of defence exports"
  },
  {
    title: "Indian Coast Guard Modernization Program",
    excerpt: "The Coast Guard enhances its capabilities with new vessels and aircraft to strengthen maritime security.",
    content: "The Indian Coast Guard continues its modernization program with the induction of new patrol vessels, aircraft, and surveillance systems. This enhancement is crucial for protecting India's vast coastline and exclusive economic zone.\n\nModernization initiatives:\n- New offshore patrol vessels (OPVs)\n- Advanced helicopters for surveillance\n- Unmanned aerial vehicles (UAVs)\n- Enhanced radar and communication systems\n- Pollution response vessels\n\nThe Coast Guard plays a vital role in maritime security, search and rescue operations, and environmental protection. Its modernization ensures better surveillance of India's 7,516 km coastline and effective response to maritime threats.",
    category: "Navy",
    examTags: ["CDS", "AFCAT", "CAPF"],
    date: "2024-01-01",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    importantPoints: [
      "Strengthens maritime security along 7,516 km coastline",
      "New vessels and aircraft for enhanced surveillance",
      "Focus on search, rescue, and environmental protection",
      "Integration of UAVs for better coverage"
    ],
    examImportance: "Relevant for exams because:\n1. Coast Guard is part of armed forces structure\n2. Maritime security is crucial for India\n3. Understanding of multi-dimensional security challenges\n4. Role in protecting coastal areas and EEZ"
  },
  {
    title: "DRDO's Hypersonic Technology Demonstrator Vehicle",
    excerpt: "India successfully tests hypersonic technology, joining an elite group of nations with this capability.",
    content: "India has successfully tested its Hypersonic Technology Demonstrator Vehicle (HSTDV), marking a significant achievement in missile technology. This test places India among a select group of nations with hypersonic technology capabilities.\n\nTechnology highlights:\n- Speed exceeding Mach 5 (5 times the speed of sound)\n- Scramjet propulsion technology\n- Strategic significance for missile defence\n- Development by DRDO (Defence Research and Development Organisation)\n\nHypersonic technology has both civilian and military applications, with strategic implications for national security. The successful test demonstrates India's advanced research and development capabilities in cutting-edge defence technology.",
    category: "Joint Forces",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2023-12-28",
    image: "https://images.unsplash.com/photo-1614728423162-4ae772e9d08e?w=800",
    importantPoints: [
      "Speed exceeding Mach 5 (hypersonic)",
      "Uses scramjet propulsion technology",
      "Developed by DRDO",
      "Strategic significance for missile defence"
    ],
    examImportance: "Critical for exams as it covers:\n1. DRDO's technological achievements\n2. Strategic missile capabilities\n3. India's position in hypersonic technology\n4. National security and defence research"
  },
  {
    title: "Tejas Mk-1A: Indigenous Fighter Aircraft Production",
    excerpt: "HAL begins production of Tejas Mk-1A, marking a significant step in India's indigenous fighter aircraft program.",
    content: "Hindustan Aeronautics Limited (HAL) has commenced production of the Tejas Mk-1A fighter aircraft, representing a major milestone in India's quest for self-reliance in defence manufacturing. The Mk-1A variant includes several improvements over the base Tejas model.\n\nKey enhancements:\n- Advanced Active Electronically Scanned Array (AESA) radar\n- Improved electronic warfare suite\n- Enhanced weapons capability\n- Better maintainability and reliability\n- Increased indigenous content\n\nThe Tejas program demonstrates India's growing capabilities in aerospace engineering and defence manufacturing. It reduces dependence on foreign suppliers and strengthens the Make in India initiative in the defence sector.",
    category: "Air Force",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-18",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    importantPoints: [
      "Indigenous fighter aircraft production by HAL",
      "AESA radar and advanced EW systems",
      "Reduces dependence on foreign suppliers",
      "Strengthens Make in India in defence"
    ],
    examImportance: "Important for exams because:\n1. Demonstrates indigenous aerospace capabilities\n2. Shows progress in defence manufacturing\n3. Highlights HAL's role in defence production\n4. Relevant for understanding defence self-reliance"
  },
  {
    title: "INS Visakhapatnam: Latest Stealth Destroyer Commissioned",
    excerpt: "INS Visakhapatnam, the lead ship of Project 15B, has been commissioned, enhancing India's naval firepower.",
    content: "INS Visakhapatnam, the first of the Visakhapatnam-class stealth guided-missile destroyers, has been commissioned into the Indian Navy. Built under Project 15B, this warship represents the latest in naval technology and design.\n\nKey features:\n- Stealth technology for reduced radar signature\n- Advanced weapons and sensor systems\n- Enhanced survivability features\n- Indigenous content in critical systems\n- Multi-role capabilities\n\nThe destroyer significantly enhances the Indian Navy's blue-water capabilities and strengthens India's maritime security posture. It demonstrates the progress of indigenous shipbuilding and naval design capabilities.",
    category: "Navy",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-20",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
    importantPoints: [
      "Stealth guided-missile destroyer",
      "Lead ship of Project 15B",
      "Enhanced naval firepower and capabilities",
      "Indigenous shipbuilding achievement"
    ],
    examImportance: "Critical for exams as it shows:\n1. Naval modernization and capability enhancement\n2. Indigenous shipbuilding progress\n3. Stealth technology in naval platforms\n4. India's growing blue-water navy capabilities"
  },
  {
    title: "Army's Integrated Battle Groups (IBG) Concept",
    excerpt: "The Indian Army is restructuring into Integrated Battle Groups for enhanced operational effectiveness.",
    content: "The Indian Army is implementing the Integrated Battle Groups (IBG) concept, a major restructuring initiative aimed at enhancing operational effectiveness and rapid response capabilities. This transformation represents a shift towards more agile and self-contained fighting formations.\n\nIBG characteristics:\n- Self-contained combat units\n- Integrated combat arms\n- Enhanced mobility and firepower\n- Streamlined command structure\n- Focus on rapid deployment\n\nThe IBG concept is designed to make the Army more responsive to modern warfare requirements, enabling faster decision-making and more effective combat operations. This restructuring aligns with global military transformation trends.",
    category: "Army",
    examTags: ["CDS", "NDA", "CAPF"],
    date: "2024-01-22",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    importantPoints: [
      "Major Army restructuring initiative",
      "Self-contained combat formations",
      "Enhanced operational effectiveness",
      "Aligned with modern warfare requirements"
    ],
    examImportance: "Important for exams because:\n1. Major organizational transformation in Army\n2. Modern warfare concepts and strategies\n3. Operational effectiveness improvements\n4. Understanding of military restructuring"
  },
  {
    title: "BrahMos Missile: Indo-Russian Defence Cooperation",
    excerpt: "BrahMos supersonic cruise missile continues to be a symbol of successful Indo-Russian defence partnership.",
    content: "The BrahMos supersonic cruise missile represents one of the most successful examples of Indo-Russian defence cooperation. Developed jointly by India's DRDO and Russia's NPO Mashinostroyeniya, BrahMos has become a key component of India's defence arsenal.\n\nBrahMos capabilities:\n- Supersonic speed (Mach 2.8-3.0)\n- Multi-platform deployment (land, sea, air)\n- High precision and destructive power\n- Versatile warhead options\n- Continuous upgrades and variants\n\nThe missile system has been successfully integrated across all three services and has generated significant export interest. It demonstrates the potential of strategic defence partnerships and joint development programs.",
    category: "Joint Forces",
    examTags: ["CDS", "NDA", "AFCAT"],
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1614728423162-4ae772e9d08e?w=800",
    importantPoints: [
      "Indo-Russian joint development success",
      "Supersonic cruise missile capability",
      "Multi-platform deployment",
      "Export potential and strategic significance"
    ],
    examImportance: "Relevant for exams as it covers:\n1. Strategic defence partnerships\n2. Joint development programs\n3. Missile technology and capabilities\n4. Defence exports and international cooperation"
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing articles...');
    await Article.deleteMany({});
    console.log('✅ Cleared existing articles');

    console.log('📝 Inserting articles...');
    const articles = await Article.insertMany(mockArticles);
    console.log(`✅ Successfully added ${articles.length} articles!`);

    console.log('\n📊 Summary:');
    console.log(`   - Army: ${articles.filter(a => a.category === 'Army').length}`);
    console.log(`   - Navy: ${articles.filter(a => a.category === 'Navy').length}`);
    console.log(`   - Air Force: ${articles.filter(a => a.category === 'Air Force').length}`);
    console.log(`   - Joint Forces: ${articles.filter(a => a.category === 'Joint Forces').length}`);

    mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();