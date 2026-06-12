import { useState, useMemo } from "react";

// ─── Complete LDS Hymnal (Original 341 + 2024 New Additions) ─────────────────
const HYMNS = [
  // ── Hymns of Praise ──
  { num:1,   title:"The Morning Breaks" },
  { num:2,   title:"The Spirit of God" },
  { num:3,   title:"Now Let Us Rejoice" },
  { num:4,   title:"Truth Eternal" },
  { num:5,   title:"High on the Mountain Top" },
  { num:6,   title:"Redeemer of Israel" },
  { num:7,   title:"Israel, Israel, God Is Calling" },
  { num:8,   title:"Awake and Arise" },
  { num:9,   title:"Come, Rejoice" },
  { num:10,  title:"Joseph Smith's First Prayer" },
  { num:11,  title:"What Was Witnessed in the Heavens?" },
  { num:12,  title:"'Twas Witnessed in the Morning Sky" },
  { num:13,  title:"An Angel from on High" },
  { num:14,  title:"Sweet Is the Work" },
  { num:15,  title:"I Saw a Mighty Angel Fly" },
  { num:16,  title:"What Glorious Scenes Mine Eyes Behold" },
  { num:17,  title:"Awake, Ye Saints of God, Awake!" },
  { num:18,  title:"The Voice of God Again Is Heard" },
  { num:19,  title:"We Thank Thee, O God, for a Prophet" },
  { num:20,  title:"God of Power, God of Right" },
  { num:21,  title:"Praise to the Lord, the Almighty" },
  { num:22,  title:"We Listen to a Prophet's Voice" },
  { num:23,  title:"We Ever Pray for Thee" },
  { num:24,  title:"A Mighty Fortress Is Our God" },
  { num:25,  title:"Now We'll Sing with One Accord" },
  { num:26,  title:"Joseph Smith's First Prayer" },
  { num:27,  title:"Praise to the Man" },
  { num:28,  title:"Saints, Behold How Great Jehovah" },
  { num:29,  title:"A Poor Wayfaring Man of Grief" },
  { num:30,  title:"Come, Come, Ye Saints" },
  { num:31,  title:"O God, Our Help in Ages Past" },
  { num:32,  title:"The Happy Day at Last Has Come" },
  { num:33,  title:"Our Mountain Home So Dear" },
  { num:34,  title:"O My Father" },
  { num:35,  title:"For the Strength of the Hills" },
  { num:36,  title:"They, the Builders of the Nation" },
  { num:37,  title:"The Wintry Day, Descending to Its Close" },
  { num:38,  title:"Come, All Ye Saints Who Dwell on Earth" },
  { num:39,  title:"Though Deepening Trials" },
  { num:40,  title:"Arise, O Glorious Zion" },
  { num:41,  title:"Let Zion in Her Beauty Rise" },
  // ── The Savior ──
  { num:42,  title:"Hail to the Brightness of Zion's Glad Morning!" },
  { num:43,  title:"Zion Stands with Hills Surrounded" },
  { num:44,  title:"Beautiful Zion, Built Above" },
  { num:45,  title:"Lead Me into Life Eternal" },
  { num:46,  title:"Glorious Things of Thee Are Spoken" },
  { num:47,  title:"We Will Sing of Zion" },
  { num:48,  title:"Glorious Things Are Sung of Zion" },
  { num:49,  title:"Adam-ondi-Ahman" },
  { num:50,  title:"Come, Thou Glorious Day of Promise" },
  { num:51,  title:"Sons of Michael, He Approaches" },
  { num:52,  title:"The Day Dawn Is Breaking" },
  { num:53,  title:"Let Earth's Inhabitants Rejoice" },
  { num:54,  title:"When All the World Was in Darkness" },
  { num:55,  title:"Lo, the Mighty God Appearing!" },
  { num:56,  title:"Softly Beams the Sacred Dawning" },
  { num:57,  title:"We're Not Ashamed to Own Our Lord" },
  { num:58,  title:"Come, Ye Children of the Lord" },
  { num:59,  title:"Come, O Thou King of Kings" },
  { num:60,  title:"Battle Hymn of the Republic" },
  { num:61,  title:"Raise Your Voices to the Lord" },
  { num:62,  title:"All Creatures of Our God and King" },
  { num:63,  title:"Great King of Heaven" },
  { num:64,  title:"On This Day of Joy and Gladness" },
  { num:65,  title:"Come, All Ye Saints of Zion" },
  { num:66,  title:"Rejoice! A Glorious Sound Is Heard" },
  { num:67,  title:"Glory to God on High" },
  { num:68,  title:"A Testimony" },
  { num:69,  title:"All Glory, Laud, and Honor" },
  { num:70,  title:"Sing Praise to Him" },
  { num:71,  title:"With Songs of Praise" },
  { num:72,  title:"Praise to the Lord" },
  { num:73,  title:"Praise the Lord with Heart and Voice" },
  { num:74,  title:"Come, Loud Praises Let Us Sing" },
  { num:75,  title:"In Hymns of Praise" },
  { num:76,  title:"God of Our Fathers, We Come unto Thee" },
  { num:77,  title:"Great Is the Lord" },
  { num:78,  title:"God of Our Fathers, Whose Almighty Hand" },
  { num:79,  title:"With All the Power of Heart and Tongue" },
  { num:80,  title:"God, Our Father, Hear Us Pray" },
  { num:81,  title:"Press Forward, Saints" },
  { num:82,  title:"For All the Saints" },
  { num:83,  title:"Guide Us, O Thou Great Jehovah" },
  { num:84,  title:"Faith of Our Fathers" },
  { num:85,  title:"How Firm a Foundation" },
  { num:86,  title:"How Great Thou Art" },
  { num:87,  title:"God Is Love" },
  { num:88,  title:"Great God, Attend While Zion Sings" },
  { num:89,  title:"The Lord Is My Light" },
  { num:90,  title:"From All That Dwell below the Skies" },
  { num:91,  title:"With Wondering Awe" },
  { num:92,  title:"For the Beauty of the Earth" },
  { num:93,  title:"Prayer of Thanksgiving" },
  { num:94,  title:"Come, Sing to the Lord" },
  { num:95,  title:"Now Thank We All Our God" },
  { num:96,  title:"Dearest Children, God Is Near You" },
  { num:97,  title:"Lead, Kindly Light" },
  { num:98,  title:"I Need Thee Every Hour" },
  { num:99,  title:"Nearer, Dear Savior, to Thee" },
  { num:100, title:"Nearer, My God, to Thee" },
  { num:101, title:"Guide Me to Thee" },
  { num:102, title:"Jesus, Lover of My Soul" },
  { num:103, title:"Precious Savior, Dear Redeemer" },
  { num:104, title:"Jesus, Savior, Pilot Me" },
  { num:105, title:"Master, the Tempest Is Raging" },
  { num:106, title:"God Speed the Right" },
  { num:107, title:"Lord, Accept Our True Devotion" },
  { num:108, title:"The Lord Is My Shepherd" },
  { num:109, title:"The Lord My Pasture Will Prepare" },
  { num:110, title:"Cast Thy Burden upon the Lord" },
  { num:111, title:"Rock of Ages" },
  { num:112, title:"Savior, Redeemer of My Soul" },
  { num:113, title:"Our Savior's Love" },
  { num:114, title:"Come unto Him" },
  { num:115, title:"Come, Thou Fount of Every Blessing" },
  { num:116, title:"Come, Follow Me" },
  { num:117, title:"Come unto Jesus" },
  { num:118, title:"Lean on My Ample Arm" },
  { num:119, title:"Come, We That Love the Lord" },
  { num:120, title:"Lean on My Ample Arm" },
  { num:121, title:"I'm a Pilgrim, I'm a Stranger" },
  { num:122, title:"Though Deepening Trials" },
  { num:123, title:"Oh, May My Soul Commune with Thee" },
  { num:124, title:"Be Still, My Soul" },
  { num:125, title:"How Gentle God's Commands" },
  { num:126, title:"How Long, O Lord Most Holy and True" },
  { num:127, title:"Does the Journey Seem Long?" },
  { num:128, title:"When Faith Endures" },
  { num:129, title:"Where Can I Turn for Peace?" },
  { num:130, title:"Be Thou Humble" },
  { num:131, title:"More Holiness Give Me" },
  { num:132, title:"God Is in His Holy Temple" },
  { num:133, title:"Father in Heaven" },
  { num:134, title:"I Believe in Christ" },
  { num:135, title:"My Redeemer Lives" },
  { num:136, title:"I Know That My Redeemer Lives" },
  { num:137, title:"Testimony" },
  { num:138, title:"Bless Our Fast, We Pray" },
  { num:139, title:"In Fasting We Approach Thee" },
  { num:140, title:"Did You Think to Pray?" },
  { num:141, title:"Jesus, the Very Thought of Thee" },
  { num:142, title:"Sweet Hour of Prayer" },
  { num:143, title:"Let the Holy Spirit Guide" },
  { num:144, title:"Secret Prayer" },
  { num:145, title:"Prayer Is the Soul's Sincere Desire" },
  { num:146, title:"Gently Raise the Sacred Strain" },
  { num:147, title:"Sweet Is the Peace the Gospel Brings" },
  { num:148, title:"Sabbath Day" },
  { num:149, title:"As the Dew from Heaven Distilling" },
  { num:150, title:"O Thou Kind and Gracious Father" },
  { num:151, title:"We Meet, Dear Lord" },
  { num:152, title:"God Be with You Till We Meet Again" },
  { num:153, title:"Lord, We Ask Thee Ere We Part" },
  { num:154, title:"Father, Thy Children to Thee Now Raise" },
  { num:155, title:"We Have Partaken of Thy Love" },
  { num:156, title:"Sing We Now at Parting" },
  { num:157, title:"Thy Servants Are Prepared" },
  { num:158, title:"Before Thee, Lord, I Bow My Head" },
  { num:159, title:"Now the Day Is Over" },
  { num:160, title:"Softly Now the Light of Day" },
  { num:161, title:"The Lord Be with Us" },
  // ── Sacrament ──
  { num:162, title:"Come, Let Us Sing an Evening Hymn" },
  { num:163, title:"Lord, Dismiss Us with Thy Blessing" },
  { num:164, title:"Great God, to Thee My Evening Song" },
  { num:165, title:"Abide with Me!" },
  { num:166, title:"Abide with Me; 'Tis Eventide" },
  { num:167, title:"Come, O Sabbath Day" },
  { num:168, title:"O Day of Rest and Gladness" },
  { num:169, title:"As Now We Take the Sacrament" },
  { num:170, title:"God, Our Father, Hear Us Pray" },
  { num:171, title:"With Humble Heart" },
  { num:172, title:"In Humility, Our Savior" },
  { num:173, title:"While of These Emblems We Partake" },
  { num:174, title:"While of These Emblems We Partake" },
  { num:175, title:"O God, the Eternal Father" },
  { num:176, title:"'Tis Sweet to Sing the Matchless Love" },
  { num:177, title:"'Tis Sweet to Sing the Matchless Love" },
  { num:178, title:"O Lord of Hosts" },
  { num:179, title:"Again, Our Dear Assembling Here" },
  { num:180, title:"Father in Heaven, We Do Believe" },
  { num:181, title:"Jesus of Nazareth, Savior and King" },
  { num:182, title:"We'll Sing All Hail to Jesus' Name" },
  { num:183, title:"In Remembrance of Thy Suffering" },
  { num:184, title:"Upon the Cross of Calvary" },
  { num:185, title:"Reverently and Meekly Now" },
  { num:186, title:"Again We Meet around the Board" },
  { num:187, title:"God Loved Us, So He Sent His Son" },
  { num:188, title:"Thy Will, O Lord, Be Done" },
  { num:189, title:"O Thou, Before the World Began" },
  { num:190, title:"In Memory of the Crucified" },
  { num:191, title:"Behold the Great Redeemer Die" },
  { num:192, title:"He Died! The Great Redeemer Died" },
  { num:193, title:"I Stand All Amazed" },
  { num:194, title:"There Is a Green Hill Far Away" },
  { num:195, title:"How Great the Wisdom and the Love" },
  { num:196, title:"Jesus, Once of Humble Birth" },
  { num:197, title:"O Savior, Thou Who Wearest a Crown" },
  { num:198, title:"That Easter Morn" },
  { num:199, title:"He Is Risen!" },
  { num:200, title:"Christ the Lord Is Risen Today" },
  { num:201, title:"Joy to the World" },
  { num:202, title:"Oh, Come, All Ye Faithful" },
  { num:203, title:"Angels We Have Heard on High" },
  { num:204, title:"Silent Night" },
  { num:205, title:"Once in Royal David's City" },
  { num:206, title:"Away in a Manger" },
  { num:207, title:"It Came upon the Midnight Clear" },
  { num:208, title:"O Little Town of Bethlehem" },
  { num:209, title:"Hark! The Herald Angels Sing" },
  { num:210, title:"With Wondering Awe" },
  { num:211, title:"While Shepherds Watched Their Flocks" },
  { num:212, title:"Far, Far Away on Judea's Plains" },
  { num:213, title:"The First Noel" },
  { num:214, title:"I Heard the Bells on Christmas Day" },
  { num:215, title:"Ring Out, Wild Bells" },
  { num:216, title:"We Are Sowing" },
  { num:217, title:"Come, Let Us Anew" },
  { num:218, title:"We Give Thee But Thine Own" },
  { num:219, title:"Because I Have Been Given Much" },
  { num:220, title:"Lord, I Would Follow Thee" },
  { num:221, title:"Dear to the Heart of the Shepherd" },
  { num:222, title:"Hear Thou Our Hymn, O Lord" },
  { num:223, title:"Have I Done Any Good?" },
  { num:224, title:"I Have Work Enough to Do" },
  { num:225, title:"We Are Marching On to Glory" },
  { num:226, title:"Improve the Shining Moments" },
  { num:227, title:"There Is Sunshine in My Soul Today" },
  { num:228, title:"You Can Make the Pathway Bright" },
  { num:229, title:"Today, While the Sun Shines" },
  { num:230, title:"Scatter Sunshine" },
  { num:231, title:"How Beauteous Are Their Feet" },
  { num:232, title:"Let Us Oft Speak Kind Words" },
  { num:233, title:"Nay, Speak No Ill" },
  { num:234, title:"Jesus, Mighty King in Zion" },
  { num:235, title:"Should You Feel Inclined to Censure" },
  { num:236, title:"Lord, Accept into Thy Kingdom" },
  { num:237, title:"Do What Is Right" },
  { num:238, title:"Behold Thy Sons and Daughters, Lord" },
  { num:239, title:"Choose the Right" },
  { num:240, title:"Know This, That Every Soul Is Free" },
  { num:241, title:"Count Your Blessings" },
  { num:242, title:"Praise God, from Whom All Blessings Flow" },
  { num:243, title:"Let Us All Press On" },
  { num:244, title:"Come Along, Come Along" },
  { num:245, title:"This House We Dedicate to Thee" },
  { num:246, title:"Onward, Christian Soldiers" },
  { num:247, title:"We Love Thy House, O God" },
  { num:248, title:"Up, Awake, Ye Defenders of Zion" },
  { num:249, title:"Called to Serve" },
  { num:250, title:"We Are All Enlisted" },
  { num:251, title:"Behold! A Royal Army" },
  { num:252, title:"Put Your Shoulder to the Wheel" },
  { num:253, title:"Like Ten Thousand Legions Marching" },
  { num:254, title:"True to the Faith" },
  { num:255, title:"Carry On" },
  { num:256, title:"As Zion's Youth in Latter Days" },
  { num:257, title:"Platoon Leader" },
  { num:258, title:"O Thou Rock of Our Salvation" },
  { num:259, title:"Hope of Israel" },
  { num:260, title:"Who's on the Lord's Side?" },
  { num:261, title:"Thy Kingdom, Lord, We Pray" },
  { num:262, title:"Go, Ye Messengers of Heaven" },
  { num:263, title:"Go Forth with Faith" },
  { num:264, title:"Hark, All Ye Nations!" },
  { num:265, title:"Arise, O God, and Shine" },
  { num:266, title:"The Time Is Far Spent" },
  { num:267, title:"How Wondrous and Great" },
  { num:268, title:"Come, All Whose Souls Are Lighted" },
  { num:269, title:"Jehovah, Lord of Heaven and Earth" },
  { num:270, title:"I'll Go Where You Want Me to Go" },
  { num:271, title:"Oh, Hark! A Glorious Sound Is Heard" },
  { num:272, title:"Oh Say, What Is Truth?" },
  { num:273, title:"Truth Reflects upon Our Senses" },
  { num:274, title:"The Iron Rod" },
  { num:275, title:"Men Are That They Might Have Joy" },
  { num:276, title:"Come Away to the Sunday School" },
  { num:277, title:"As I Search the Holy Scriptures" },
  { num:278, title:"Thanks for the Sabbath School" },
  { num:279, title:"thy holy word" },
  { num:280, title:"Welcome, Welcome, Sabbath Morning" },
  { num:281, title:"Help Me Teach with Inspiration" },
  { num:282, title:"We Meet Again as Sisters" },
  { num:283, title:"The Morning Breaks" },
  { num:284, title:"If You Could Hie to Kolob" },
  { num:285, title:"God Moves in a Mysterious Way" },
  { num:286, title:"Oh, What Songs of the Heart" },
  { num:287, title:"Rise Up, O Men of God" },
  { num:288, title:"A Key Was Turned in Latter Days" },
  { num:289, title:"The Priesthood of Our Lord" },
  { num:290, title:"Rejoice, Ye Saints of Latter Days" },
  { num:291, title:"Turn Your Hearts" },
  { num:292, title:"O Home Beloved" },
  { num:293, title:"Each Life That Touches Ours for Good" },
  { num:294, title:"Love at Home" },
  { num:295, title:"O Love That Glorifies the Son" },
  { num:296, title:"Our Father, by Whose Name" },
  { num:297, title:"From Homes of Saints Glad Songs Arise" },
  { num:298, title:"Home Can Be a Heaven on Earth" },
  { num:299, title:"Children of Our Heavenly Father" },
  { num:300, title:"Families Can Be Together Forever" },
  { num:301, title:"I Am a Child of God" },
  { num:302, title:"I Know My Father Lives" },
  { num:303, title:"Keep the Commandments" },
  { num:304, title:"Teach Me to Walk in the Light" },
  { num:305, title:"The Light Divine" },
  { num:306, title:"God's Daily Care" },
  { num:307, title:"In Our Lovely Deseret" },
  { num:308, title:"Love One Another" },
  { num:309, title:"As Sisters in Zion" },
  { num:310, title:"A Woman's Prayer" },
  { num:311, title:"We Meet Again in Sabbath School" },
  { num:312, title:"The Lord Gave Me a Temple" },
  { num:313, title:"When I Go to the Temple" },
  { num:314, title:"How Beautiful Thy Temples, Lord" },
  { num:315, title:"Israel, Israel, God Is Calling" },
  { num:316, title:"The Holy Ghost" },
  { num:317, title:"Sweet Is the Work" },
  { num:318, title:"Love at Home" },
  { num:319, title:"Ye Elders of Israel" },
  { num:320, title:"The Star-Spangled Banner" },
  { num:321, title:"America the Beautiful" },
  { num:322, title:"My Country, 'Tis of Thee" },
  { num:323, title:"God Save the King" },
  { num:324, title:"O Canada" },
  { num:325, title:"Now Let Us Rejoice" },
  { num:326, title:"Joseph Smith's First Prayer" },
  { num:327, title:"Go Forth with Faith" },
  { num:328, title:"An Angel Came to Joseph Smith" },
  { num:329, title:"Thy Servants Are Prepared" },
  { num:330, title:"See the Mighty Priesthood Gathered" },
  { num:331, title:"Oh Say, What Is Truth?" },
  { num:332, title:"God of Our Fathers, We Come unto Thee" },
  { num:333, title:"High on the Mountain Top" },
  { num:334, title:"I Have Work Enough to Do" },
  { num:335, title:"Brightly Beams Our Father's Mercy" },
  { num:336, title:"School Thy Feelings" },
  { num:337, title:"O Home Beloved" },
  { num:338, title:"America the Beautiful" },
  { num:339, title:"My Country, 'Tis of Thee" },
  { num:340, title:"You Can Make the Pathway Bright" },
  { num:341, title:"Let Us All Press On" },
  // ── 2024 New Hymns ──
  { num:1001, title:"He Sent His Son (New)", isNew:true },
  { num:1002, title:"A Disciple's Prayer (New)", isNew:true },
  { num:1003, title:"Come, Thou Long-Expected Jesus (New)", isNew:true },
  { num:1004, title:"Jesus, Lamb of God (New)", isNew:true },
  { num:1005, title:"In the Hollow of Thy Hand (New)", isNew:true },
  { num:1006, title:"O God Who Listens (New)", isNew:true },
  { num:1007, title:"Come, Thou Fount of Every Blessing (New)", isNew:true },
  { num:1008, title:"Restoration Hymn (New)", isNew:true },
  { num:1009, title:"Oh How We Love You, Moroni (New)", isNew:true },
  { num:1010, title:"His Sacred Name (New)", isNew:true },
  { num:1011, title:"From the Dawn of the Morning (New)", isNew:true },
  { num:1012, title:"As Bread Is Broken (New)", isNew:true },
  { num:1013, title:"With Thee (New)", isNew:true },
  { num:1014, title:"I Will Walk with Jesus (New)", isNew:true },
  { num:1015, title:"Covenant (New)", isNew:true },
];

// ─── Bishopric Members Seed ───────────────────────────────────────────────────
// ─── Ward Configuration ──────────────────────────────────────────────────────
const WARD_CONFIG = {
  wardName:    "Laredo Ranch Ward",
  stakeName:   "Queen Creek Arizona Ocotillo Stake",
  meetingTime: "Tuesdays 7:00 AM",
  location:    "Bishop's Office",
};

const BISHOPRIC = [
  { id:1, name:"Bishop Tanner Fox",  role:"Bishop" },
  { id:2, name:"Matt Haban",         role:"First Counselor" },
  { id:3, name:"Kyle Aylesworth",    role:"Second Counselor" },
  { id:4, name:"Bryan Farrow",       role:"Ward Clerk" },
  { id:5, name:"Brian Ford",         role:"Executive Secretary" },
];

const YM_LEADERS = [
  { id:1, name:"Marcus Webb",   role:"Young Men President" },
  { id:2, name:"Luis Torres",   role:"First Counselor" },
  { id:3, name:"Tyler Jensen",  role:"Second Counselor" },
  { id:4, name:"Scott Campbell",role:"Secretary" },
];

// Calling status progression
const CALLING_STATUSES = [
  { id:"to_be_met",    label:"To Be Met With",         icon:"👤", color:"#C9A84C" },
  { id:"accepted",     label:"Accepted",               icon:"✅", color:"#2C6B3A" },
  { id:"not_accepted", label:"Not Accepted",           icon:"❌", color:"#C62828" },
  { id:"announced",    label:"Announced in Church",    icon:"📢", color:"#2C5F8A" },
  { id:"set_apart",    label:"Set Apart",              icon:"🙏", color:"#6B2C8A" },
];

function today() { return new Date().toISOString().split("T")[0]; }
function fmtDate(d) {
  if (!d) return "";
  const [y,m,dy] = d.split("-");
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const obj = new Date(parseInt(y), parseInt(m)-1, parseInt(dy));
  return `${days[obj.getDay()]}, ${months[parseInt(m)-1]} ${parseInt(dy)}, ${y}`;
}

const emptyAgenda = {
  id: null, date: today(), time: "7:00 AM", location: WARD_CONFIG.location,
  openingHymn: null, openingPrayer: "",
  spiritualThought: { topic:"", givenBy:"", notes:"" },
  handbookTraining: { topic:"", notes:"", reference:"" },
  callings: [],
  openPositions: [],
  releases: [],
  discussionItems: [],
  ymIssues: { items:[], notes:"" },
  closingPrayer: "",
  generalNotes: "",
  status: "draft",
};

const emptyCalling = {
  id: null, memberName:"", callingTitle:"", organization:"",
  assignedTo: null,
  status: "to_be_met",
  metDate:"", acceptedDate:"", announcedDate:"", setApartDate:"",
  setApartBy:"", notes:"",
  // Release linked to this calling (person being replaced)
  release: null, // { memberName, callingTitle, releaseDate, notes }
};

// Open position needing to be filled
const emptyOpenPosition = {
  id: null, callingTitle:"", organization:"", priority:"normal", // normal | urgent
  vacantSince:"", reason:"", // moved, released, other
  assignedTo: null, // bishopric member responsible for finding someone
  proposedMembers: [], // [{ id, name, phone, notes, status: "considering"|"approved"|"declined" }]
  sandboxRef:"", // future: link to callings mindmap position ID
  notes:"",
};

const emptyProposed = {
  id: null, name:"", phone:"", notes:"", status:"considering",
};

// Release (standalone - not tied to a new calling)
const emptyRelease = {
  id: null, memberName:"", callingTitle:"", organization:"",
  releaseDate:"", releasedBy:"",
  reason:"", // released, moved, health, other
  notes:"",
  assignedTo: null,
};

const emptyDiscussion = {
  id: null, topic:"", assignedTo:null, duration:"", notes:"", decision:"",
};

const SEED_AGENDAS = [];

// ─── Hymn Search Component ────────────────────────────────────────────────────
function HymnPicker({ value, onChange }) {
  const [search, setSearch] = useState(value ? `${value.num}. ${value.title}` : "");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!search || search.length < 1) return [];
    const s = search.toLowerCase();
    return HYMNS.filter(h =>
      h.title.toLowerCase().includes(s) ||
      String(h.num).startsWith(s.replace(/\D/g,""))
    ).slice(0, 12);
  }, [search]);

  const select = (hymn) => {
    onChange(hymn);
    setSearch(`${hymn.num}. ${hymn.title}`);
    setOpen(false);
  };

  const clear = () => { onChange(null); setSearch(""); setOpen(false); };

  return (
    <div style={{ position:"relative" }}>
      <div style={{ display:"flex", gap:6 }}>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search by number or title..."
          style={{ ...inp(), flex:1 }}
        />
        {value && (
          <button onClick={clear} style={{ background:"#F0EAE0", border:"none", borderRadius:6, padding:"0 10px", cursor:"pointer", color:"#888", fontSize:16 }}>×</button>
        )}
      </div>
      {open && results.length > 0 && (
        <div style={{
          position:"absolute", top:"100%", left:0, right:0, zIndex:200,
          background:"#fff", borderRadius:8, boxShadow:"0 4px 20px rgba(0,0,0,0.15)",
          border:"1px solid #E8E0D0", maxHeight:240, overflowY:"auto", marginTop:2,
        }}>
          {results.map(h => (
            <div key={h.num} onClick={() => select(h)}
              style={{
                padding:"9px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10,
                borderBottom:"1px solid #F5F0E8",
              }}
              onMouseEnter={e => e.currentTarget.style.background="#F5F0E8"}
              onMouseLeave={e => e.currentTarget.style.background="#fff"}>
              <div style={{
                width:36, height:36, borderRadius:6, background: h.isNew ? "#2C6B3A" : "#1B3A5C",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: h.isNew ? "#fff" : "#C9A84C", fontFamily:"sans-serif",
                fontWeight:"bold", fontSize:11, flexShrink:0,
              }}>{h.isNew ? "New" : h.num}</div>
              <div>
                <div style={{ fontFamily:"sans-serif", fontSize:13, fontWeight:"bold", color:"#1B3A5C" }}>{h.title}</div>
                {h.isNew && <div style={{ fontFamily:"sans-serif", fontSize:10, color:"#2C6B3A", fontWeight:"bold" }}>2024 New Hymn</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Click outside to close */}
      {open && <div style={{ position:"fixed", inset:0, zIndex:190 }} onClick={() => setOpen(false)} />}
    </div>
  );
}

// ─── Calling Status Stepper ───────────────────────────────────────────────────
function CallingStatusStepper({ calling, onChange, canEdit }) {
  const steps = CALLING_STATUSES;
  const currentIdx = steps.findIndex(s => s.id === calling.status);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap" }}>
      {steps.map((step, i) => {
        const isPast    = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture  = i > currentIdx;
        const isSkipped = calling.status === "not_accepted" && i > 1;
        return (
          <div key={step.id} style={{ display:"flex", alignItems:"center" }}>
            <div
              onClick={() => canEdit && !isSkipped && onChange({ ...calling, status: step.id })}
              title={step.label}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                cursor: canEdit && !isSkipped ? "pointer" : "default", padding:"0 4px",
              }}>
              <div style={{
                width:28, height:28, borderRadius:"50%",
                background: isSkipped ? "#F0EAE0" : isCurrent ? step.color : isPast ? step.color : "#F0EAE0",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, opacity: isSkipped ? 0.3 : 1,
                boxShadow: isCurrent ? `0 0 0 3px ${step.color}40` : "none",
                transition:"all 0.2s",
              }}>
                {step.icon}
              </div>
              <span style={{
                fontFamily:"sans-serif", fontSize:8, textAlign:"center",
                color: isCurrent ? step.color : isPast ? "#888" : "#ccc",
                fontWeight: isCurrent ? "bold" : "normal",
                maxWidth:50, lineHeight:1.2,
              }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width:14, height:2, background: isPast ? "#C9A84C" : "#F0EAE0", marginBottom:14 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BishopricAgenda() {
  const [agendas, setAgendas] = useState(() => {
    try {
      const saved = localStorage.getItem("laredoRanchBishopricAgendas");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Persist to localStorage on every change
  const saveAgendas = (updated) => {
    setAgendas(updated);
    try { localStorage.setItem("laredoRanchBishopricAgendas", JSON.stringify(updated)); } catch {}
  };
  const [view, setView]             = useState("list"); // list | edit | print
  const [selectedId, setSelectedId] = useState(null);
  const [editForm, setEditForm]     = useState(null);
  const [toast, setToast]           = useState(null);
  const [showCallingModal, setShowCallingModal] = useState(false);
  const [callingForm, setCallingForm]           = useState({...emptyCalling});
  const [editingCallingId, setEditingCallingId] = useState(null);
  const [showDiscModal, setShowDiscModal]       = useState(false);
  const [discForm, setDiscForm]                 = useState({...emptyDiscussion});
  const [editingDiscId, setEditingDiscId]       = useState(null);
  const [showHymnPicker, setShowHymnPicker]     = useState(null);

  // Open positions state
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [positionForm, setPositionForm]           = useState({...emptyOpenPosition});
  const [editingPositionId, setEditingPositionId] = useState(null);
  const [showProposedModal, setShowProposedModal] = useState(false);
  const [proposedForm, setProposedForm]           = useState({...emptyProposed});
  const [editingProposedId, setEditingProposedId] = useState(null);
  const [proposedForPosition, setProposedForPosition] = useState(null);

  // Releases state
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [releaseForm, setReleaseForm]           = useState({...emptyRelease});
  const [editingReleaseId, setEditingReleaseId] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const selected = editForm;

  // ── Agenda CRUD ──
  const newAgenda = () => {
    const a = { ...emptyAgenda, id:Date.now() };
    setEditForm(a);
    setView("edit");
  };

  const openAgenda = (id) => {
    const a = agendas.find(x=>x.id===id);
    setEditForm(JSON.parse(JSON.stringify(a)));
    setSelectedId(id);
    setView("edit");
  };

  const saveAgenda = () => {
    const isNew = !agendas.find(a=>a.id===editForm.id);
    const updated = isNew ? [...agendas, editForm] : agendas.map(a=>a.id===editForm.id?editForm:a);
    saveAgendas(updated);
    showToast("Agenda saved");
  };

  const upd = (field, value) => setEditForm(f => ({ ...f, [field]:value }));
  const updNested = (parent, field, value) => setEditForm(f => ({ ...f, [parent]:{ ...f[parent], [field]:value } }));

  // ── Calling CRUD ──
  const openAddCalling = () => {
    setCallingForm({ ...emptyCalling, id:Date.now() });
    setEditingCallingId(null);
    setShowCallingModal(true);
  };
  const openEditCalling = (c) => {
    setCallingForm({ ...c });
    setEditingCallingId(c.id);
    setShowCallingModal(true);
  };
  const saveCalling = () => {
    if (!callingForm.memberName || !callingForm.callingTitle) return;
    setEditForm(f => ({
      ...f, callings: editingCallingId
        ? f.callings.map(c=>c.id===editingCallingId?callingForm:c)
        : [...f.callings, callingForm]
    }));
    setShowCallingModal(false);
    showToast("Calling saved");
  };
  const deleteCalling = (id) => {
    setEditForm(f => ({ ...f, callings:f.callings.filter(c=>c.id!==id) }));
    setShowCallingModal(false);
  };
  const updateCallingStatus = (callingId, updated) => {
    setEditForm(f => ({ ...f, callings:f.callings.map(c=>c.id===callingId?updated:c) }));
  };

  // ── Open Position CRUD ──
  const openAddPosition = () => {
    setPositionForm({ ...emptyOpenPosition, id:Date.now() });
    setEditingPositionId(null);
    setShowPositionModal(true);
  };
  const openEditPosition = (p) => {
    setPositionForm({ ...p });
    setEditingPositionId(p.id);
    setShowPositionModal(true);
  };
  const savePosition = () => {
    if (!positionForm.callingTitle) return;
    const isNew = !editingPositionId;
    setEditForm(f => ({
      ...f,
      openPositions: isNew
        ? [...(f.openPositions||[]), positionForm]
        : (f.openPositions||[]).map(p=>p.id===editingPositionId?positionForm:p)
    }));
    setShowPositionModal(false);
    showToast("Position saved");
  };
  const deletePosition = (id) => {
    setEditForm(f => ({ ...f, openPositions:(f.openPositions||[]).filter(p=>p.id!==id) }));
    setShowPositionModal(false);
  };

  // Proposed members within a position
  const openAddProposed = (positionId) => {
    setProposedForPosition(positionId);
    setProposedForm({ ...emptyProposed, id:Date.now() });
    setEditingProposedId(null);
    setShowProposedModal(true);
  };
  const openEditProposed = (positionId, member) => {
    setProposedForPosition(positionId);
    setProposedForm({ ...member });
    setEditingProposedId(member.id);
    setShowProposedModal(true);
  };
  const saveProposed = () => {
    if (!proposedForm.name) return;
    setEditForm(f => ({
      ...f,
      openPositions: (f.openPositions||[]).map(p => {
        if (p.id !== proposedForPosition) return p;
        const isNew = !editingProposedId;
        return {
          ...p,
          proposedMembers: isNew
            ? [...(p.proposedMembers||[]), proposedForm]
            : (p.proposedMembers||[]).map(m=>m.id===editingProposedId?proposedForm:m)
        };
      })
    }));
    setShowProposedModal(false);
    showToast("Proposed member saved");
  };
  const deleteProposed = (positionId, memberId) => {
    setEditForm(f => ({
      ...f,
      openPositions: (f.openPositions||[]).map(p =>
        p.id!==positionId ? p : { ...p, proposedMembers:(p.proposedMembers||[]).filter(m=>m.id!==memberId) }
      )
    }));
    setShowProposedModal(false);
  };

  // ── Release CRUD ──
  const openAddRelease = () => {
    setReleaseForm({ ...emptyRelease, id:Date.now() });
    setEditingReleaseId(null);
    setShowReleaseModal(true);
  };
  const openEditRelease = (r) => {
    setReleaseForm({ ...r });
    setEditingReleaseId(r.id);
    setShowReleaseModal(true);
  };
  const saveRelease = () => {
    if (!releaseForm.memberName || !releaseForm.callingTitle) return;
    const isNew = !editingReleaseId;
    setEditForm(f => ({
      ...f,
      releases: isNew
        ? [...(f.releases||[]), releaseForm]
        : (f.releases||[]).map(r=>r.id===editingReleaseId?releaseForm:r)
    }));
    setShowReleaseModal(false);
    showToast("Release saved");
  };
  const deleteRelease = (id) => {
    setEditForm(f => ({ ...f, releases:(f.releases||[]).filter(r=>r.id!==id) }));
    setShowReleaseModal(false);
  };

  // ── Discussion CRUD ──
  const openAddDisc = () => {
    setDiscForm({ ...emptyDiscussion, id:Date.now() });
    setEditingDiscId(null);
    setShowDiscModal(true);
  };
  const openEditDisc = (d) => {
    setDiscForm({ ...d });
    setEditingDiscId(d.id);
    setShowDiscModal(true);
  };
  const saveDisc = () => {
    if (!discForm.topic) return;
    setEditForm(f => ({
      ...f, discussionItems: editingDiscId
        ? f.discussionItems.map(d=>d.id===editingDiscId?discForm:d)
        : [...f.discussionItems, discForm]
    }));
    setShowDiscModal(false);
  };
  const deleteDisc = (id) => {
    setEditForm(f => ({ ...f, discussionItems:f.discussionItems.filter(d=>d.id!==id) }));
    setShowDiscModal(false);
  };

  const bishopricName = (id) => BISHOPRIC.find(b=>b.id===id)?.name || "—";
  const callingStatus = (id) => CALLING_STATUSES.find(s=>s.id===id);

  const PROPOSED_STATUSES = {
    considering: { label:"Considering",  color:"#C9A84C", bg:"#FFF8E8" },
    approved:    { label:"Approved",     color:"#2E7D32", bg:"#E8F5E9" },
    declined:    { label:"Declined",     color:"#C62828", bg:"#FFF0F0" },
  };
  const RELEASE_REASONS = [
    { id:"released",  label:"Released from Calling" },
    { id:"moved",     label:"Moved Out of Ward" },
    { id:"health",    label:"Health / Personal" },
    { id:"mission",   label:"Called on Mission" },
    { id:"other",     label:"Other" },
  ];

  return (
    <div style={{ fontFamily:"'Georgia','Times New Roman',serif", minHeight:"100vh", background:"#F5F0E8" }}>

      {/* Header */}
      <div style={{ background:"#1B3A5C", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"13px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:34, height:34, background:"#C9A84C", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👔</div>
            <div>
              <div style={{ color:"#C9A84C", fontSize:10, fontFamily:"sans-serif", letterSpacing:2, textTransform:"uppercase" }}>{WARD_CONFIG.wardName} · {WARD_CONFIG.stakeName}</div>
              <div style={{ color:"#fff", fontSize:17, fontWeight:"bold", lineHeight:1 }}>Bishopric Meeting Agenda</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {view !== "list" && (
              <button onClick={()=>setView("list")} style={smBtn("#rgba(255,255,255,0.15)","#fff","rgba(255,255,255,0.2)")}>← All Agendas</button>
            )}
            {view === "edit" && selected && <>
              <button onClick={saveAgenda} style={smBtn("#C9A84C","#1B3A5C","#C9A84C")}>💾 Save</button>
              <button onClick={()=>setView("print")} style={smBtn("rgba(255,255,255,0.15)","#fff","rgba(255,255,255,0.2)")}>🖨️ Print</button>
            </>}
            {view === "list" && (
              <button onClick={newAgenda} style={smBtn("#C9A84C","#1B3A5C","#C9A84C")}>+ New Agenda</button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:16 }}>

        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <div>
            <div style={{ marginBottom:14, fontFamily:"sans-serif", fontSize:13, color:"#888" }}>
              {agendas.length} saved agenda{agendas.length !== 1 ? "s" : ""}
            </div>
            {agendas.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(a => {
              const callings   = a.callings?.length || 0;
              const items      = a.discussionItems?.length || 0;
              const pending    = a.callings?.filter(c=>c.status==="to_be_met").length || 0;
              return (
                <div key={a.id} onClick={()=>openAgenda(a.id)}
                  style={{ background:"#fff", borderRadius:10, padding:"16px 20px", marginBottom:10, cursor:"pointer", boxShadow:"0 1px 6px rgba(0,0,0,0.07)", display:"flex", gap:14, alignItems:"center", flexWrap:"wrap", borderLeft:"4px solid #1B3A5C" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.12)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.07)"}>
                  <div style={{ fontSize:32, flexShrink:0 }}>👔</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:"bold", fontSize:16, marginBottom:2 }}>Bishopric Meeting</div>
                    <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#888" }}>
                      {fmtDate(a.date)} · {a.time} · {a.location}
                    </div>
                    <div style={{ display:"flex", gap:8, marginTop:6, flexWrap:"wrap" }}>
                      {callings > 0 && <span style={{ background:"#EEF4FF", color:"#1D4ED8", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11, fontWeight:"bold" }}>{callings} calling{callings!==1?"s":""}</span>}
                      {pending > 0  && <span style={{ background:"#FFF3E0", color:"#E65100", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11, fontWeight:"bold" }}>⚠️ {pending} pending</span>}
                      {(a.openPositions||[]).length > 0 && <span style={{ background:"#FFF4EE", color:"#8B4513", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11, fontWeight:"bold" }}>! {a.openPositions.length} open position{a.openPositions.length!==1?"s":""}</span>}
                      {(a.releases||[]).length > 0 && <span style={{ background:"#F8F0FF", color:"#6B2C8A", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11 }}>↩ {a.releases.length} release{a.releases.length!==1?"s":""}</span>}
                      {items > 0    && <span style={{ background:"#F5F0E8", color:"#6B4A2C", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11 }}>{items} discussion item{items!==1?"s":""}</span>}
                      {a.openingHymn && <span style={{ background:"#F5F0E8", color:"#888", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:11 }}>🎵 #{a.openingHymn.num}</span>}
                    </div>
                  </div>
                  <span style={{ color:"#bbb", fontSize:20 }}>›</span>
                </div>
              );
            })}
            {agendas.length === 0 && (
              <div style={{ background:"#fff", borderRadius:10, padding:60, textAlign:"center", fontFamily:"sans-serif", color:"#aaa" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>👔</div>
                <div>No agendas yet — click "New Agenda" to get started</div>
              </div>
            )}
          </div>
        )}

        {/* ── EDIT / VIEW ── */}
        {view === "edit" && selected && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Meeting info */}
            <Section title="📅 Meeting Details" color="#1B3A5C">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                <div>
                  <label style={lbl()}>Date</label>
                  <input type="date" value={selected.date} onChange={e=>upd("date",e.target.value)} style={inp()} />
                  {selected.date && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginTop:3 }}>{fmtDate(selected.date)}</div>}
                </div>
                <div>
                  <label style={lbl()}>Time</label>
                  <input value={selected.time} onChange={e=>upd("time",e.target.value)} style={inp()} placeholder="7:00 AM" />
                </div>
                <div>
                  <label style={lbl()}>Location</label>
                  <input value={selected.location} onChange={e=>upd("location",e.target.value)} style={inp()} />
                </div>
              </div>
            </Section>

            {/* Opening Hymn */}
            <Section title="🎵 Opening Song" color="#2C5F8A">
              <HymnPicker
                value={selected.openingHymn}
                onChange={h => upd("openingHymn", h)}
              />
              {selected.openingHymn && (
                <div style={{ marginTop:10, background:"linear-gradient(135deg,#1B3A5C,#2C5F8A)", borderRadius:8, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:8, background:"#C9A84C", display:"flex", alignItems:"center", justifyContent:"center", color:"#1B3A5C", fontWeight:"bold", fontSize:13, flexShrink:0 }}>
                    {selected.openingHymn.isNew ? "NEW" : `#${selected.openingHymn.num}`}
                  </div>
                  <div>
                    <div style={{ color:"#fff", fontWeight:"bold", fontSize:15 }}>{selected.openingHymn.title}</div>
                    {selected.openingHymn.isNew && <div style={{ color:"#C9A84C", fontFamily:"sans-serif", fontSize:11 }}>2024 New Hymnal Addition</div>}
                  </div>
                </div>
              )}
            </Section>

            {/* Opening Prayer */}
            <Section title="🙏 Opening Prayer" color="#2C6B3A">
              <div>
                <label style={lbl()}>Called on</label>
                <input value={selected.openingPrayer} onChange={e=>upd("openingPrayer",e.target.value)} style={inp()} placeholder="Name of person giving opening prayer..." />
              </div>
            </Section>

            {/* Spiritual Thought */}
            <Section title="💡 Spiritual Thought" color="#6B2C8A">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={lbl()}>Topic / Scripture</label>
                  <input value={selected.spiritualThought.topic} onChange={e=>updNested("spiritualThought","topic",e.target.value)} style={inp()} placeholder="e.g. Faith, John 14:27..." />
                </div>
                <div>
                  <label style={lbl()}>Given By</label>
                  <select value={selected.spiritualThought.givenBy} onChange={e=>updNested("spiritualThought","givenBy",e.target.value)} style={inp()}>
                    <option value="">— Select —</option>
                    {BISHOPRIC.map(b=><option key={b.id} value={b.name}>{b.name} · {b.role}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop:10 }}>
                <label style={lbl()}>Notes</label>
                <textarea value={selected.spiritualThought.notes} onChange={e=>updNested("spiritualThought","notes",e.target.value)} style={{ ...inp(), height:56, resize:"vertical" }} placeholder="Key points or impressions..." />
              </div>
            </Section>

            {/* Handbook Training */}
            <Section title="📖 Handbook Training" color="#6B4A2C">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={lbl()}>Topic</label>
                  <input value={selected.handbookTraining.topic} onChange={e=>updNested("handbookTraining","topic",e.target.value)} style={inp()} placeholder="e.g. Temple Recommends, Tithing Settlement..." />
                </div>
                <div>
                  <label style={lbl()}>Handbook Reference</label>
                  <input value={selected.handbookTraining.reference} onChange={e=>updNested("handbookTraining","reference",e.target.value)} style={inp()} placeholder="e.g. General Handbook 26.3" />
                </div>
              </div>
              <div style={{ marginTop:10 }}>
                <label style={lbl()}>Notes</label>
                <textarea value={selected.handbookTraining.notes} onChange={e=>updNested("handbookTraining","notes",e.target.value)} style={{ ...inp(), height:56, resize:"vertical" }} />
              </div>
            </Section>

            {/* ── CALLINGS SECTION (3 subsections) ── */}
            <div style={{ background:"#fff", borderRadius:10, boxShadow:"0 1px 5px rgba(0,0,0,0.07)", overflow:"hidden" }}>
              {/* Section header */}
              <div style={{ background:"#C9A84C18", padding:"12px 16px", borderLeft:"4px solid #C9A84C", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <div style={{ fontWeight:"bold", fontSize:15, color:"#6B4A2C" }}>📋 Callings</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <button onClick={openAddPosition} style={{ background:"#8B4513", color:"#fff", border:"none", borderRadius:6, padding:"5px 12px", fontFamily:"sans-serif", fontSize:12, fontWeight:"bold", cursor:"pointer" }}>+ Open Position</button>
                  <button onClick={openAddCalling}  style={{ background:"#1B3A5C", color:"#C9A84C", border:"none", borderRadius:6, padding:"5px 12px", fontFamily:"sans-serif", fontSize:12, fontWeight:"bold", cursor:"pointer" }}>+ New Calling</button>
                  <button onClick={openAddRelease}  style={{ background:"#6B2C8A", color:"#fff", border:"none", borderRadius:6, padding:"5px 12px", fontFamily:"sans-serif", fontSize:12, fontWeight:"bold", cursor:"pointer" }}>+ Release</button>
                </div>
              </div>

              <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:16 }}>

                {/* ── 1. Positions Needing to be Filled ── */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, paddingBottom:8, borderBottom:"2px solid #F0EAE0" }}>
                    <div style={{ width:22, height:22, borderRadius:4, background:"#8B4513", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:"bold" }}>!</div>
                    <span style={{ fontWeight:"bold", fontSize:13, color:"#8B4513" }}>Open Positions — Needs to be Filled</span>
                    <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginLeft:"auto" }}>{(selected.openPositions||[]).length} open</span>
                  </div>

                  {(selected.openPositions||[]).length === 0 ? (
                    <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#bbb", textAlign:"center", padding:"16px 0" }}>No open positions — click "+ Open Position" to add one</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {(selected.openPositions||[]).map(pos => {
                        const approved  = (pos.proposedMembers||[]).filter(m=>m.status==="approved").length;
                        const total     = (pos.proposedMembers||[]).length;
                        return (
                          <div key={pos.id} style={{ background:"#FFF8F0", borderRadius:8, border:`1px solid ${pos.priority==="urgent"?"#E65100":"#E8D5C0"}`, overflow:"hidden" }}>
                            {/* Position header */}
                            <div style={{ padding:"10px 14px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", borderBottom:"1px solid #F0E8DC" }}>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                                  <span style={{ fontWeight:"bold", fontSize:14 }}>{pos.callingTitle}</span>
                                  <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#888" }}>{pos.organization}</span>
                                  {pos.priority==="urgent" && <span style={{ background:"#C62828", color:"#fff", borderRadius:20, padding:"1px 8px", fontFamily:"sans-serif", fontSize:10, fontWeight:"bold" }}>⚠️ URGENT</span>}
                                </div>
                                <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginTop:2 }}>
                                  {pos.vacantSince && <span>Vacant since {fmtDate(pos.vacantSince)}</span>}
                                  {pos.reason      && <span> · {pos.reason}</span>}
                                  {pos.assignedTo  && <span> · Assigned: <strong style={{color:"#1B3A5C"}}>{bishopricName(pos.assignedTo)}</strong></span>}
                                </div>
                              </div>
                              <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
                                {total > 0 && <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#8B4513", fontWeight:"bold" }}>{approved}/{total} proposed</span>}
                                <button onClick={()=>openEditPosition(pos)} style={{ background:"none", border:"1px solid #ddd", borderRadius:5, padding:"3px 10px", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", color:"#555" }}>Edit</button>
                              </div>
                            </div>

                            {/* Proposed members */}
                            <div style={{ padding:"10px 14px" }}>
                              <div style={{ fontFamily:"sans-serif", fontSize:10, color:"#aaa", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>
                                Proposed Members
                                {pos.sandboxRef && <span style={{ marginLeft:8, color:"#2C5F8A" }}>🗺️ Linked to Callings Sandbox</span>}
                              </div>
                              {(pos.proposedMembers||[]).length === 0 ? (
                                <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#ccc", marginBottom:8 }}>No proposed members yet</div>
                              ) : (
                                <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:8 }}>
                                  {(pos.proposedMembers||[]).map((m,mi) => {
                                    const ps = PROPOSED_STATUSES[m.status] || PROPOSED_STATUSES.considering;
                                    return (
                                      <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:ps.bg, borderRadius:6, border:`1px solid ${ps.color}30` }}>
                                        <div style={{ width:26, height:26, borderRadius:"50%", background:ps.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"sans-serif", fontWeight:"bold", fontSize:10, flexShrink:0 }}>{mi+1}</div>
                                        <div style={{ flex:1, minWidth:0 }}>
                                          <div style={{ fontWeight:"bold", fontSize:13 }}>{m.name}</div>
                                          <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#888" }}>
                                            {m.phone && <span>{m.phone}</span>}
                                            {m.notes && <span>{m.phone?" · ":""}{m.notes}</span>}
                                          </div>
                                        </div>
                                        <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
                                          <span style={{ background:ps.bg, color:ps.color, borderRadius:20, padding:"2px 8px", fontFamily:"sans-serif", fontSize:10, fontWeight:"bold", border:`1px solid ${ps.color}40` }}>
                                            {ps.label}
                                          </span>
                                          <button onClick={()=>openEditProposed(pos.id,m)} style={{ background:"none", border:"1px solid #ddd", borderRadius:5, padding:"2px 8px", fontFamily:"sans-serif", fontSize:10, cursor:"pointer", color:"#555" }}>Edit</button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              <button onClick={()=>openAddProposed(pos.id)} style={{ background:"none", border:"1px dashed #C9A84C", borderRadius:6, padding:"5px 12px", fontFamily:"sans-serif", fontSize:11, color:"#C9A84C", cursor:"pointer", fontWeight:"bold" }}>
                                + Propose Member
                              </button>
                            </div>
                            {pos.notes && <div style={{ padding:"0 14px 10px", fontFamily:"sans-serif", fontSize:11, color:"#888", fontStyle:"italic" }}>📝 {pos.notes}</div>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── 2. Active Callings Being Extended ── */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, paddingBottom:8, borderBottom:"2px solid #F0EAE0" }}>
                    <div style={{ width:22, height:22, borderRadius:4, background:"#1B3A5C", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A84C", fontSize:12 }}>✓</div>
                    <span style={{ fontWeight:"bold", fontSize:13, color:"#1B3A5C" }}>New Callings Being Extended</span>
                    <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginLeft:"auto" }}>{selected.callings.length} calling{selected.callings.length!==1?"s":""}</span>
                  </div>

                  {selected.callings.length === 0 ? (
                    <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#bbb", textAlign:"center", padding:"16px 0" }}>No active callings this week — click "+ New Calling" to add</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                      {selected.callings.map(c => {
                        const stat = callingStatus(c.status);
                        const hasRelease = !!(c.release?.memberName);
                        return (
                          <div key={c.id} style={{ borderRadius:10, border:"1px solid #E8E0D0", overflow:"hidden" }}>

                            {/* ── Top bar: calling title + status + edit ── */}
                            <div style={{ background:"#1B3A5C", padding:"8px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <span style={{ color:"#C9A84C", fontSize:13, fontWeight:"bold" }}>{c.callingTitle}</span>
                                <span style={{ color:"rgba(255,255,255,0.4)", fontFamily:"sans-serif", fontSize:11 }}>·</span>
                                <span style={{ color:"rgba(255,255,255,0.6)", fontFamily:"sans-serif", fontSize:11 }}>{c.organization}</span>
                              </div>
                              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                                <span style={{ background:`${stat?.color}30`, color:"#fff", borderRadius:20, padding:"3px 10px", fontFamily:"sans-serif", fontSize:11, fontWeight:"bold", border:`1px solid ${stat?.color}60` }}>
                                  {stat?.icon} {stat?.label}
                                </span>
                                <button onClick={()=>openEditCalling(c)} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:5, padding:"3px 10px", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", color:"#fff" }}>Edit</button>
                              </div>
                            </div>

                            {/* ── Person block: incoming then outgoing stacked ── */}
                            <div style={{ background:"#F9F6F0" }}>

                              {/* Incoming — being called */}
                              <div style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                                <div style={{ width:38, height:38, borderRadius:"50%", background:"#1B3A5C", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A84C", fontFamily:"sans-serif", fontWeight:"bold", fontSize:13, flexShrink:0 }}>
                                  {c.memberName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                                </div>
                                <div style={{ flex:1, minWidth:0 }}>
                                  <div style={{ fontFamily:"sans-serif", fontSize:9, fontWeight:"bold", textTransform:"uppercase", letterSpacing:1.5, color:"#2C6B3A", marginBottom:2 }}>✦ Being Called</div>
                                  <div style={{ fontWeight:"bold", fontSize:15, color:"#1B3A5C" }}>{c.memberName}</div>
                                  <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#888", marginTop:1 }}>
                                    Assigned to: <strong style={{ color:"#1B3A5C" }}>{bishopricName(c.assignedTo)}</strong>
                                  </div>
                                  {c.notes && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#999", marginTop:3, fontStyle:"italic" }}>📝 {c.notes}</div>}
                                </div>
                              </div>

                              {/* Stacked release — only shown when linked */}
                              {hasRelease && (
                                <>
                                  {/* Connector line aligned with avatar center */}
                                  <div style={{ padding:"0 14px 0 33px" }}>
                                    <div style={{ width:2, height:14, background:"#C9B8E8", marginLeft:6 }} />
                                  </div>

                                  {/* Outgoing person — inset strip */}
                                  <div style={{ margin:"0 10px 12px", padding:"10px 12px", display:"flex", alignItems:"center", gap:12, background:"#F3ECF9", borderRadius:8, border:"1px solid #DDD0EE" }}>
                                    <div style={{ width:36, height:36, borderRadius:"50%", background:"#6B2C8A", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"sans-serif", fontWeight:"bold", fontSize:12, flexShrink:0 }}>
                                      {c.release.memberName.split(" ").filter(Boolean).map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                                    </div>
                                    <div style={{ flex:1, minWidth:0 }}>
                                      <div style={{ fontFamily:"sans-serif", fontSize:9, fontWeight:"bold", textTransform:"uppercase", letterSpacing:1.5, color:"#6B2C8A", marginBottom:2 }}>↩ Being Released</div>
                                      <div style={{ fontWeight:"bold", fontSize:14, color:"#6B2C8A" }}>{c.release.memberName}</div>
                                      <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#9B7FBB", marginTop:1 }}>
                                        {c.release.callingTitle && <span>From: {c.release.callingTitle}</span>}
                                        {c.release.releaseDate && <span style={{ color:"#aaa" }}> · {fmtDate(c.release.releaseDate)}</span>}
                                      </div>
                                      {c.release.notes && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#999", marginTop:3, fontStyle:"italic" }}>📝 {c.release.notes}</div>}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* ── Status stepper + date stamps ── */}
                            <div style={{ background:"#fff", borderTop:"1px solid #F0EAE0", padding:"10px 14px" }}>
                              <div style={{ fontFamily:"sans-serif", fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Status Progression — click to advance</div>
                              <CallingStatusStepper calling={c} onChange={(updated)=>updateCallingStatus(c.id,updated)} canEdit={true} />
                              <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
                                {c.metDate       && <DateStamp label="Met"       date={c.metDate} />}
                                {c.acceptedDate  && <DateStamp label="Accepted"  date={c.acceptedDate} />}
                                {c.announcedDate && <DateStamp label="Announced" date={c.announcedDate} />}
                                {c.setApartDate  && <DateStamp label="Set Apart" date={c.setApartDate} />}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── 3. Releases ── */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, paddingBottom:8, borderBottom:"2px solid #F0EAE0" }}>
                    <div style={{ width:22, height:22, borderRadius:4, background:"#6B2C8A", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12 }}>↩</div>
                    <span style={{ fontWeight:"bold", fontSize:13, color:"#6B2C8A" }}>Releases</span>
                    <span style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginLeft:"auto" }}>{(selected.releases||[]).length} release{(selected.releases||[]).length!==1?"s":""}</span>
                  </div>

                  {(selected.releases||[]).length === 0 ? (
                    <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#bbb", textAlign:"center", padding:"16px 0" }}>No releases this week — click "+ Release" to add</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {(selected.releases||[]).map(r => {
                        const reasonLabel = RELEASE_REASONS.find(x=>x.id===r.reason)?.label || r.reason;
                        return (
                          <div key={r.id} style={{ background:"#F8F0FF", borderRadius:8, padding:"11px 14px", border:"1px solid #DDD0EE", display:"flex", alignItems:"flex-start", gap:10 }}>
                            <div style={{ width:36, height:36, borderRadius:"50%", background:"#6B2C8A", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:16, flexShrink:0 }}>↩</div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontWeight:"bold", fontSize:14 }}>{r.memberName}</div>
                              <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#888" }}>
                                {r.callingTitle} · {r.organization}
                              </div>
                              <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa", marginTop:2 }}>
                                {r.releaseDate && <span>Released {fmtDate(r.releaseDate)}</span>}
                                {r.releasedBy  && <span> by {r.releasedBy}</span>}
                                {r.reason      && <span> · {reasonLabel}</span>}
                                {r.assignedTo  && <span> · Handled by {bishopricName(r.assignedTo)}</span>}
                              </div>
                              {r.notes && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#888", marginTop:4, fontStyle:"italic" }}>📝 {r.notes}</div>}
                            </div>
                            <button onClick={()=>openEditRelease(r)} style={{ background:"none", border:"1px solid #ddd", borderRadius:5, padding:"3px 10px", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", color:"#555", flexShrink:0 }}>Edit</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Discussion Items */}
            <Section title="💬 Discussion Items" color="#2C5F8A"
              action={<button onClick={openAddDisc} style={secBtn()}>+ Add Item</button>}>
              {selected.discussionItems.length === 0 ? (
                <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#aaa", textAlign:"center", padding:24 }}>No discussion items — click "+ Add Item"</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {selected.discussionItems.map((d,i) => (
                    <div key={d.id} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"11px 14px", background:"#F9F6F0", borderRadius:8, border:"1px solid #E8E0D0" }}>
                      <div style={{ width:26, height:26, borderRadius:"50%", background:"#1B3A5C", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A84C", fontFamily:"sans-serif", fontWeight:"bold", fontSize:11, flexShrink:0, marginTop:1 }}>{i+1}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:"bold", fontSize:14 }}>{d.topic}</div>
                        <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#888", marginTop:2 }}>
                          {d.assignedTo && <span>Assigned: {bishopricName(d.assignedTo)}</span>}
                          {d.duration   && <span> · {d.duration} min</span>}
                        </div>
                        {d.notes    && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#666", marginTop:4 }}>Notes: {d.notes}</div>}
                        {d.decision && <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#2E7D32", marginTop:4, fontWeight:"bold" }}>✓ Decision: {d.decision}</div>}
                      </div>
                      <button onClick={()=>openEditDisc(d)} style={{ background:"none", border:"1px solid #ddd", borderRadius:5, padding:"3px 10px", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", color:"#555", flexShrink:0 }}>Edit</button>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* Young Men's Issues */}
            <Section title="⚽ Young Men's Issues" color="#2C6B3A">
              <div style={{ marginBottom:12 }}>
                <label style={lbl()}>Discussion Items</label>
                {(selected.ymIssues.items || []).map((item,i) => (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
                    <input value={item}
                      onChange={e => {
                        const items = [...(selected.ymIssues.items||[])];
                        items[i] = e.target.value;
                        updNested("ymIssues","items",items);
                      }}
                      style={{ ...inp(), flex:1 }} placeholder={`Item ${i+1}...`} />
                    <button onClick={()=>{
                      const items = (selected.ymIssues.items||[]).filter((_,idx)=>idx!==i);
                      updNested("ymIssues","items",items);
                    }} style={{ background:"#FFF0F0", border:"none", borderRadius:6, padding:"0 10px", color:"#C62828", cursor:"pointer", fontWeight:"bold", fontSize:14 }}>×</button>
                  </div>
                ))}
                <button onClick={()=>updNested("ymIssues","items",[...(selected.ymIssues.items||[]),""])} style={{ background:"#F5F0E8", border:"1px dashed #C9A84C", borderRadius:6, padding:"7px 14px", fontFamily:"sans-serif", fontSize:12, color:"#C9A84C", cursor:"pointer", fontWeight:"bold", marginTop:4 }}>
                  + Add Item
                </button>
              </div>
              <div>
                <label style={lbl()}>Report / Notes</label>
                <textarea value={selected.ymIssues.notes} onChange={e=>updNested("ymIssues","notes",e.target.value)} style={{ ...inp(), height:64, resize:"vertical" }} placeholder="YM President report, concerns, updates..." />
              </div>
            </Section>

            {/* Closing Prayer */}
            <Section title="🙏 Closing Prayer" color="#1B3A5C">
              <div>
                <label style={lbl()}>Called on</label>
                <input value={selected.closingPrayer} onChange={e=>upd("closingPrayer",e.target.value)} style={inp()} placeholder="Name of person giving closing prayer..." />
              </div>
            </Section>

            {/* General Notes */}
            <Section title="📝 General Notes" color="#888">
              <textarea value={selected.generalNotes} onChange={e=>upd("generalNotes",e.target.value)} style={{ ...inp(), height:80, resize:"vertical" }} placeholder="Any additional notes, impressions, or follow-up items..." />
            </Section>

            {/* Save button bottom */}
            <button onClick={saveAgenda} style={{ background:"#1B3A5C", color:"#C9A84C", border:"none", borderRadius:10, padding:"14px", fontFamily:"sans-serif", fontSize:15, fontWeight:"bold", cursor:"pointer", boxShadow:"0 4px 16px rgba(27,58,92,0.3)" }}>
              💾 Save Agenda
            </button>
          </div>
        )}

        {/* ── PRINT VIEW ── */}
        {view === "print" && selected && (
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:16 }}>
              <button onClick={()=>setView("edit")} style={smBtn("rgba(255,255,255,0.15)","#555","#ddd")}>← Back to Edit</button>
              <button onClick={()=>window.print()} style={smBtn("#1B3A5C","#C9A84C","#1B3A5C")}>🖨️ Print / Save PDF</button>
            </div>
            <div id="print-area" style={{ background:"#fff", borderRadius:10, padding:"32px 36px", boxShadow:"0 1px 8px rgba(0,0,0,0.1)", maxWidth:680, margin:"0 auto" }}>
              {/* Print header */}
              <div style={{ textAlign:"center", marginBottom:24, paddingBottom:16, borderBottom:"2px solid #1B3A5C" }}>
                <div style={{ fontSize:13, fontFamily:"sans-serif", color:"#aaa", textTransform:"uppercase", letterSpacing:2, marginBottom:4 }}>Bishopric Meeting Agenda</div>
                <div style={{ fontSize:22, fontWeight:"bold", color:"#1B3A5C" }}>{fmtDate(selected.date)}</div>
                <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#888", marginTop:4 }}>{selected.time} · {selected.location}</div>
              </div>
              {/* Print sections */}
              {[
                ["🎵 Opening Song",     selected.openingHymn ? `#${selected.openingHymn.num} — ${selected.openingHymn.title}` : "—"],
                ["🙏 Opening Prayer",   selected.openingPrayer || "—"],
                ["💡 Spiritual Thought",selected.spiritualThought.topic ? `${selected.spiritualThought.topic} (${selected.spiritualThought.givenBy})` : "—"],
                ["📖 Handbook Training",selected.handbookTraining.topic || "—"],
              ].map(([label,val])=>(
                <div key={label} style={{ display:"flex", gap:12, marginBottom:12, paddingBottom:12, borderBottom:"1px solid #F0EAE0" }}>
                  <div style={{ fontWeight:"bold", fontSize:13, width:170, flexShrink:0 }}>{label}</div>
                  <div style={{ fontFamily:"sans-serif", fontSize:13, flex:1 }}>{val}</div>
                </div>
              ))}
              {/* Open Positions */}
              {(selected.openPositions||[]).length > 0 && (<>
                <div style={{ fontWeight:"bold", fontSize:14, color:"#8B4513", marginBottom:8 }}>⚠️ Open Positions — Needs to be Filled</div>
                {(selected.openPositions||[]).map(pos=>(
                  <div key={pos.id} style={{ fontFamily:"sans-serif", fontSize:12, marginBottom:8, paddingLeft:12, borderLeft:"3px solid #8B4513" }}>
                    <div><strong>{pos.callingTitle}</strong> — {pos.organization} {pos.priority==="urgent"?"(URGENT)":""}</div>
                    {(pos.proposedMembers||[]).length > 0 && (
                      <div style={{ marginTop:3 }}>
                        {pos.proposedMembers.map((m,i)=>(
                          <div key={m.id} style={{ color: m.status==="approved"?"#2E7D32":m.status==="declined"?"#C62828":"#888" }}>
                            {i+1}. {m.name} — {PROPOSED_STATUSES[m.status]?.label||m.status}
                            {m.notes?` (${m.notes})`:""}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ marginBottom:12 }} />
              </>)}
              {/* Callings */}
              {selected.callings.length > 0 && (<>
                <div style={{ fontWeight:"bold", fontSize:14, color:"#1B3A5C", marginBottom:8 }}>📋 New Callings Being Extended</div>
                {selected.callings.map(c=>(
                  <div key={c.id} style={{ fontFamily:"sans-serif", fontSize:12, marginBottom:6, paddingLeft:12, borderLeft:`3px solid ${callingStatus(c.status)?.color||"#ddd"}` }}>
                    <strong>{c.memberName}</strong> — {c.callingTitle} ({c.organization}) · {callingStatus(c.status)?.label} · Assigned: {bishopricName(c.assignedTo)}
                    {c.release && <div style={{ color:"#6B2C8A", marginTop:2 }}>↩ Releasing: {c.release.memberName} from {c.release.callingTitle}</div>}
                  </div>
                ))}
                <div style={{ marginBottom:12 }} />
              </>)}
              {/* Releases */}
              {(selected.releases||[]).length > 0 && (<>
                <div style={{ fontWeight:"bold", fontSize:14, color:"#6B2C8A", marginBottom:8 }}>↩ Releases</div>
                {(selected.releases||[]).map(r=>(
                  <div key={r.id} style={{ fontFamily:"sans-serif", fontSize:12, marginBottom:6, paddingLeft:12, borderLeft:"3px solid #6B2C8A" }}>
                    <strong>{r.memberName}</strong> — {r.callingTitle} ({r.organization})
                    {r.releaseDate?` · Released ${fmtDate(r.releaseDate)}`:""}
                    {r.releasedBy?` by ${r.releasedBy}`:""}
                  </div>
                ))}
                <div style={{ marginBottom:12 }} />
              </>)}
              {/* Discussion */}
              {selected.discussionItems.length > 0 && (<>
                <div style={{ fontWeight:"bold", fontSize:14, color:"#1B3A5C", marginBottom:8 }}>💬 Discussion Items</div>
                {selected.discussionItems.map((d,i)=>(
                  <div key={d.id} style={{ fontFamily:"sans-serif", fontSize:12, marginBottom:6, paddingLeft:12 }}>
                    {i+1}. <strong>{d.topic}</strong>{d.assignedTo?` — ${bishopricName(d.assignedTo)}`:""}
                    {d.duration?` (${d.duration} min)`:""}
                  </div>
                ))}
                <div style={{ marginBottom:12 }} />
              </>)}
              {/* YM */}
              {(selected.ymIssues.items?.length > 0 || selected.ymIssues.notes) && (<>
                <div style={{ fontWeight:"bold", fontSize:14, color:"#1B3A5C", marginBottom:8 }}>⚽ Young Men's Issues</div>
                {selected.ymIssues.items?.map((item,i)=>(
                  <div key={i} style={{ fontFamily:"sans-serif", fontSize:12, marginBottom:4, paddingLeft:12 }}>• {item}</div>
                ))}
                {selected.ymIssues.notes && <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#666", marginTop:4, paddingLeft:12, fontStyle:"italic" }}>{selected.ymIssues.notes}</div>}
                <div style={{ marginBottom:12 }} />
              </>)}
              {[
                ["🙏 Closing Prayer", selected.closingPrayer||"—"],
              ].map(([label,val])=>(
                <div key={label} style={{ display:"flex", gap:12, marginBottom:12, paddingBottom:12, borderBottom:"1px solid #F0EAE0" }}>
                  <div style={{ fontWeight:"bold", fontSize:13, width:170, flexShrink:0 }}>{label}</div>
                  <div style={{ fontFamily:"sans-serif", fontSize:13, flex:1 }}>{val}</div>
                </div>
              ))}
              {selected.generalNotes && (
                <div style={{ marginTop:8, padding:"10px 14px", background:"#F9F6F0", borderRadius:6, fontFamily:"sans-serif", fontSize:12, color:"#666" }}>
                  <strong>Notes:</strong> {selected.generalNotes}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Calling Modal ── */}
      {showCallingModal && (
        <Modal title={editingCallingId ? "Edit Calling" : "Add Calling"} onClose={()=>setShowCallingModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl()}>Member Name *</label><input value={callingForm.memberName} onChange={e=>setCallingForm(f=>({...f,memberName:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Calling Title *</label><input value={callingForm.callingTitle} onChange={e=>setCallingForm(f=>({...f,callingTitle:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Organization</label><input value={callingForm.organization} onChange={e=>setCallingForm(f=>({...f,organization:e.target.value}))} style={inp()} placeholder="Primary, RS, EQ..." /></div>
              <div>
                <label style={lbl()}>Assigned To (Bishopric)</label>
                <select value={callingForm.assignedTo||""} onChange={e=>setCallingForm(f=>({...f,assignedTo:parseInt(e.target.value)||null}))} style={inp()}>
                  <option value="">— Select —</option>
                  {BISHOPRIC.map(b=><option key={b.id} value={b.id}>{b.name} · {b.role}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={lbl()}>Current Status</label>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {CALLING_STATUSES.map(s=>(
                  <button key={s.id} onClick={()=>setCallingForm(f=>({...f,status:s.id}))}
                    style={{ background:callingForm.status===s.id?s.color:"#F5F0E8", color:callingForm.status===s.id?"#fff":"#555", border:"none", borderRadius:20, padding:"5px 12px", fontFamily:"sans-serif", fontSize:12, cursor:"pointer", fontWeight:callingForm.status===s.id?"bold":"normal" }}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Date stamps by status */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div><label style={lbl()}>Date Met With</label><input type="date" value={callingForm.metDate} onChange={e=>setCallingForm(f=>({...f,metDate:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Date Accepted</label><input type="date" value={callingForm.acceptedDate} onChange={e=>setCallingForm(f=>({...f,acceptedDate:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Date Announced</label><input type="date" value={callingForm.announcedDate} onChange={e=>setCallingForm(f=>({...f,announcedDate:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Date Set Apart</label><input type="date" value={callingForm.setApartDate} onChange={e=>setCallingForm(f=>({...f,setApartDate:e.target.value}))} style={inp()} /></div>
            </div>
            <div><label style={lbl()}>Set Apart By</label><input value={callingForm.setApartBy} onChange={e=>setCallingForm(f=>({...f,setApartBy:e.target.value}))} style={inp()} placeholder="Bishop or Counselor's name" /></div>
            {/* Optional: link a release to this calling */}
            <div style={{ background:"#F8F0FF", border:"1px solid #DDD0EE", borderRadius:8, padding:"12px 14px" }}>
              <div style={{ fontFamily:"sans-serif", fontWeight:"bold", fontSize:12, color:"#6B2C8A", textTransform:"uppercase", letterSpacing:0.5, marginBottom:10 }}>↩ Person Being Released (if replacing someone)</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <label style={lbl()}>Member Being Released</label>
                  <input value={callingForm.release?.memberName||""} onChange={e=>setCallingForm(f=>({...f,release:{...(f.release||{}),memberName:e.target.value}}))} style={inp()} placeholder="Name (leave blank if new position)" />
                </div>
                <div>
                  <label style={lbl()}>Their Current Calling</label>
                  <input value={callingForm.release?.callingTitle||""} onChange={e=>setCallingForm(f=>({...f,release:{...(f.release||{}),callingTitle:e.target.value}}))} style={inp()} placeholder="Calling being vacated" />
                </div>
                <div>
                  <label style={lbl()}>Release Date</label>
                  <input type="date" value={callingForm.release?.releaseDate||""} onChange={e=>setCallingForm(f=>({...f,release:{...(f.release||{}),releaseDate:e.target.value}}))} style={inp()} />
                </div>
                <div>
                  <label style={lbl()}>Release Notes</label>
                  <input value={callingForm.release?.notes||""} onChange={e=>setCallingForm(f=>({...f,release:{...(f.release||{}),notes:e.target.value}}))} style={inp()} placeholder="Optional" />
                </div>
              </div>
              {callingForm.release?.memberName && (
                <button onClick={()=>setCallingForm(f=>({...f,release:null}))} style={{ marginTop:8, background:"none", border:"none", fontFamily:"sans-serif", fontSize:11, color:"#C62828", cursor:"pointer" }}>× Clear release</button>
              )}
            </div>
            <div><label style={lbl()}>Notes</label><textarea value={callingForm.notes} onChange={e=>setCallingForm(f=>({...f,notes:e.target.value}))} style={{...inp(),height:56,resize:"vertical"}} /></div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              {editingCallingId && <button onClick={()=>deleteCalling(editingCallingId)} style={smBtn("#FFF0F0","#C62828","#EF9A9A")}>🗑 Remove</button>}
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                <button onClick={()=>setShowCallingModal(false)} style={smBtn("#F0EAE0","#555","#ddd")}>Cancel</button>
                <button onClick={saveCalling} disabled={!callingForm.memberName||!callingForm.callingTitle} style={smBtn("#1B3A5C","#C9A84C","#1B3A5C")}>Save</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Discussion Modal ── */}
      {showDiscModal && (
        <Modal title={editingDiscId?"Edit Discussion Item":"Add Discussion Item"} onClose={()=>setShowDiscModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div><label style={lbl()}>Topic *</label><input value={discForm.topic} onChange={e=>setDiscForm(f=>({...f,topic:e.target.value}))} style={inp()} placeholder="What needs to be discussed?" /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div>
                <label style={lbl()}>Assigned To</label>
                <select value={discForm.assignedTo||""} onChange={e=>setDiscForm(f=>({...f,assignedTo:parseInt(e.target.value)||null}))} style={inp()}>
                  <option value="">— Select —</option>
                  {BISHOPRIC.map(b=><option key={b.id} value={b.id}>{b.name} · {b.role}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl()}>Time Allotted (minutes)</label>
                <select value={discForm.duration} onChange={e=>setDiscForm(f=>({...f,duration:e.target.value}))} style={inp()}>
                  <option value="">—</option>
                  {["5","10","15","20","30"].map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div><label style={lbl()}>Notes / Background</label><textarea value={discForm.notes} onChange={e=>setDiscForm(f=>({...f,notes:e.target.value}))} style={{...inp(),height:60,resize:"vertical"}} /></div>
            <div><label style={lbl()}>Decision / Outcome (fill in after meeting)</label><textarea value={discForm.decision} onChange={e=>setDiscForm(f=>({...f,decision:e.target.value}))} style={{...inp(),height:56,resize:"vertical"}} /></div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              {editingDiscId && <button onClick={()=>deleteDisc(editingDiscId)} style={smBtn("#FFF0F0","#C62828","#EF9A9A")}>🗑 Remove</button>}
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                <button onClick={()=>setShowDiscModal(false)} style={smBtn("#F0EAE0","#555","#ddd")}>Cancel</button>
                <button onClick={saveDisc} disabled={!discForm.topic} style={smBtn("#1B3A5C","#C9A84C","#1B3A5C")}>Save</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Open Position Modal ── */}
      {showPositionModal && (
        <Modal title={editingPositionId?"Edit Open Position":"Add Open Position"} onClose={()=>setShowPositionModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl()}>Calling Title *</label><input value={positionForm.callingTitle} onChange={e=>setPositionForm(f=>({...f,callingTitle:e.target.value}))} style={inp()} placeholder="e.g. Primary Chorister" /></div>
              <div><label style={lbl()}>Organization</label><input value={positionForm.organization} onChange={e=>setPositionForm(f=>({...f,organization:e.target.value}))} style={inp()} placeholder="Primary, RS, EQ..." /></div>
              <div>
                <label style={lbl()}>Priority</label>
                <div style={{ display:"flex", gap:8 }}>
                  {["normal","urgent"].map(p=>(
                    <button key={p} onClick={()=>setPositionForm(f=>({...f,priority:p}))}
                      style={{ flex:1, background:positionForm.priority===p?(p==="urgent"?"#C62828":"#1B3A5C"):"#F5F0E8", color:positionForm.priority===p?"#fff":"#555", border:"none", borderRadius:6, padding:"8px", fontFamily:"sans-serif", fontSize:12, cursor:"pointer", fontWeight:"bold" }}>
                      {p==="urgent"?"⚠️ Urgent":"Normal"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={lbl()}>Reason Vacant</label>
                <select value={positionForm.reason} onChange={e=>setPositionForm(f=>({...f,reason:e.target.value}))} style={inp()}>
                  <option value="">— Select —</option>
                  <option value="moved">Member moved out</option>
                  <option value="released">Released from calling</option>
                  <option value="mission">Called on mission</option>
                  <option value="health">Health / Personal</option>
                  <option value="new">Newly created position</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div><label style={lbl()}>Vacant Since</label><input type="date" value={positionForm.vacantSince} onChange={e=>setPositionForm(f=>({...f,vacantSince:e.target.value}))} style={inp()} /></div>
              <div>
                <label style={lbl()}>Assigned To (Bishopric)</label>
                <select value={positionForm.assignedTo||""} onChange={e=>setPositionForm(f=>({...f,assignedTo:parseInt(e.target.value)||null}))} style={inp()}>
                  <option value="">— Select —</option>
                  {BISHOPRIC.map(b=><option key={b.id} value={b.id}>{b.name} · {b.role}</option>)}
                </select>
              </div>
            </div>
            <div><label style={lbl()}>Notes</label><textarea value={positionForm.notes} onChange={e=>setPositionForm(f=>({...f,notes:e.target.value}))} style={{...inp(),height:56,resize:"vertical"}} placeholder="Any specific requirements or context..." /></div>
            <div style={{ background:"#F0F4FF", borderRadius:6, padding:"8px 12px", fontFamily:"sans-serif", fontSize:11, color:"#2C5F8A" }}>
              🗺️ Future: This position will be linkable to the Callings Mind Map sandbox for visual planning.
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              {editingPositionId && <button onClick={()=>deletePosition(editingPositionId)} style={smBtn("#FFF0F0","#C62828","#EF9A9A")}>🗑 Remove</button>}
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                <button onClick={()=>setShowPositionModal(false)} style={smBtn("#F0EAE0","#555","#ddd")}>Cancel</button>
                <button onClick={savePosition} disabled={!positionForm.callingTitle} style={smBtn("#8B4513","#fff","#8B4513")}>Save Position</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Proposed Member Modal ── */}
      {showProposedModal && (
        <Modal title={editingProposedId?"Edit Proposed Member":"Propose a Member"} onClose={()=>setShowProposedModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl()}>Member Name *</label><input value={proposedForm.name} onChange={e=>setProposedForm(f=>({...f,name:e.target.value}))} style={inp()} placeholder="Full name..." /></div>
              <div><label style={lbl()}>Phone</label><input value={proposedForm.phone} onChange={e=>setProposedForm(f=>({...f,phone:e.target.value}))} style={inp()} placeholder="480-555-0000" /></div>
            </div>
            <div>
              <label style={lbl()}>Status</label>
              <div style={{ display:"flex", gap:8 }}>
                {Object.entries(PROPOSED_STATUSES).map(([key,val])=>(
                  <button key={key} onClick={()=>setProposedForm(f=>({...f,status:key}))}
                    style={{ flex:1, background:proposedForm.status===key?val.color:val.bg, color:proposedForm.status===key?"#fff":val.color, border:`1px solid ${val.color}50`, borderRadius:6, padding:"7px 6px", fontFamily:"sans-serif", fontSize:12, cursor:"pointer", fontWeight:"bold" }}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
            <div><label style={lbl()}>Notes / Considerations</label><textarea value={proposedForm.notes} onChange={e=>setProposedForm(f=>({...f,notes:e.target.value}))} style={{...inp(),height:72,resize:"vertical"}} placeholder="Current calling, strengths, availability, impressions..." /></div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              {editingProposedId && <button onClick={()=>deleteProposed(proposedForPosition,editingProposedId)} style={smBtn("#FFF0F0","#C62828","#EF9A9A")}>🗑 Remove</button>}
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                <button onClick={()=>setShowProposedModal(false)} style={smBtn("#F0EAE0","#555","#ddd")}>Cancel</button>
                <button onClick={saveProposed} disabled={!proposedForm.name} style={smBtn("#1B3A5C","#C9A84C","#1B3A5C")}>Save</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Release Modal ── */}
      {showReleaseModal && (
        <Modal title={editingReleaseId?"Edit Release":"Add Release"} onClose={()=>setShowReleaseModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl()}>Member Name *</label><input value={releaseForm.memberName} onChange={e=>setReleaseForm(f=>({...f,memberName:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Calling Title *</label><input value={releaseForm.callingTitle} onChange={e=>setReleaseForm(f=>({...f,callingTitle:e.target.value}))} style={inp()} /></div>
              <div><label style={lbl()}>Organization</label><input value={releaseForm.organization} onChange={e=>setReleaseForm(f=>({...f,organization:e.target.value}))} style={inp()} placeholder="Primary, RS, EQ..." /></div>
              <div>
                <label style={lbl()}>Reason</label>
                <select value={releaseForm.reason} onChange={e=>setReleaseForm(f=>({...f,reason:e.target.value}))} style={inp()}>
                  <option value="">— Select —</option>
                  {RELEASE_REASONS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>
              <div><label style={lbl()}>Release Date</label><input type="date" value={releaseForm.releaseDate} onChange={e=>setReleaseForm(f=>({...f,releaseDate:e.target.value}))} style={inp()} /></div>
              <div>
                <label style={lbl()}>Released By</label>
                <select value={releaseForm.releasedBy} onChange={e=>setReleaseForm(f=>({...f,releasedBy:e.target.value}))} style={inp()}>
                  <option value="">— Select —</option>
                  {BISHOPRIC.map(b=><option key={b.id} value={b.name}>{b.name} · {b.role}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl()}>Assigned To (Bishopric)</label>
                <select value={releaseForm.assignedTo||""} onChange={e=>setReleaseForm(f=>({...f,assignedTo:parseInt(e.target.value)||null}))} style={inp()}>
                  <option value="">— Select —</option>
                  {BISHOPRIC.map(b=><option key={b.id} value={b.id}>{b.name} · {b.role}</option>)}
                </select>
              </div>
            </div>
            <div><label style={lbl()}>Notes</label><textarea value={releaseForm.notes} onChange={e=>setReleaseForm(f=>({...f,notes:e.target.value}))} style={{...inp(),height:56,resize:"vertical"}} /></div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
              {editingReleaseId && <button onClick={()=>deleteRelease(editingReleaseId)} style={smBtn("#FFF0F0","#C62828","#EF9A9A")}>🗑 Remove</button>}
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                <button onClick={()=>setShowReleaseModal(false)} style={smBtn("#F0EAE0","#555","#ddd")}>Cancel</button>
                <button onClick={saveRelease} disabled={!releaseForm.memberName||!releaseForm.callingTitle} style={smBtn("#6B2C8A","#fff","#6B2C8A")}>Save Release</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: fixed; top: 0; left: 0; width: 100%; padding: 32px; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#2E7D32", color:"#fff", padding:"12px 24px", borderRadius:8, fontFamily:"sans-serif", fontSize:14, boxShadow:"0 4px 16px rgba(0,0,0,0.3)", zIndex:400, whiteSpace:"nowrap" }}>
          ✅ {toast}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ title, color, children, action }) {
  return (
    <div style={{ background:"#fff", borderRadius:10, boxShadow:"0 1px 5px rgba(0,0,0,0.07)", overflow:"hidden" }}>
      <div style={{ background:`${color}15`, padding:"10px 16px", borderLeft:`4px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontWeight:"bold", fontSize:14, color }}>{title}</div>
        {action}
      </div>
      <div style={{ padding:"14px 16px" }}>{children}</div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:"16px 16px 0 0", width:"100%", maxWidth:560, maxHeight:"90vh", overflow:"auto" }}>
        <div style={{ background:"#1B3A5C", padding:"15px 20px", borderRadius:"16px 16px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ color:"#fff", fontWeight:"bold", fontSize:16 }}>{title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#C9A84C", fontSize:24, cursor:"pointer" }}>×</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
}

function DateStamp({ label, date }) {
  return (
    <span style={{ background:"#E8F5E9", color:"#2E7D32", borderRadius:20, padding:"2px 10px", fontFamily:"sans-serif", fontSize:10, fontWeight:"bold" }}>
      {label}: {fmtDate(date)}
    </span>
  );
}

function inp() { return { width:"100%", border:"1.5px solid #ddd", borderRadius:6, padding:"8px 11px", fontFamily:"sans-serif", fontSize:13, outline:"none", boxSizing:"border-box" }; }
function lbl() { return { display:"block", fontFamily:"sans-serif", fontSize:11, color:"#666", marginBottom:3, fontWeight:"bold", textTransform:"uppercase", letterSpacing:0.5 }; }
function smBtn(bg, color, border) { return { background:bg, color, border:`1px solid ${border||bg}`, borderRadius:6, padding:"8px 14px", fontFamily:"sans-serif", fontSize:13, fontWeight:"bold", cursor:"pointer", whiteSpace:"nowrap" }; }
function secBtn() { return { background:"#1B3A5C", color:"#C9A84C", border:"none", borderRadius:6, padding:"5px 12px", fontFamily:"sans-serif", fontSize:12, fontWeight:"bold", cursor:"pointer" }; }
