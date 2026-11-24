// ============================================================
//  EDIT YOUR ENGAGEMENT INVITATION HERE — every text on the page comes from this file.
//  Texts have two versions: { en: "English", ar: "عربي" }.
//  Times are written 24h "HH:MM"; how they show depends on timeFormat below.
// ============================================================

export type Tx = { en: string; ar: string };

export const wedding = {
  // ---------- couple ----------
  /** names in the order they appear on the invitation */
  couple: [
    { en: "Momen", ar: "مؤمن" }, // groom
    { en: "Darin", ar: "دارين" }, // bride
  ] as [Tx, Tx],
  /** parents' names block — null hides it. Example:
   *  [{ title: {en:"Mr. & Mrs.",ar:"السيد والسيدة"}, names: [{en:"…",ar:"…"}] }, { …second family… }] */
  parents: null as null | [{ title: Tx; names: Tx[] }, { title: Tx; names: Tx[] }],

  // ---------- date & place ----------
  /** YYYY-MM-DD — weekday, calendar and countdown come from this */
  date: "2026-12-07",
  /** venue time zone (countdown + calendar use the venue's time, wherever the guest is) */
  timeZone: "Africa/Cairo",
  utcOffset: "+02:00", // Egypt in winter
  cityLine: { en: "Cairo, Egypt", ar: "القاهرة، مصر" } as Tx,
  /** how times show on the page: "24h" = 18:00, "12h" = 6:00 PM */
  timeFormat: "12h" as "24h" | "12h",

  ceremony: {
    title: { en: "ENGAGEMENT PARTY", ar: "حفل الخطوبة" } as Tx,
    place: { en: "Love Halls", ar: "قاعة لاف هولز" } as Tx,
    address: { en: "Next to Silver Nile Club, Nile Corniche, Maadi", ar: "بجوار نادي سيلفر نايل، كورنيش النيل، المعادي" } as Tx,
    time: "18:00",
    endTime: "23:00", // for "Add to Calendar"
    /** link guests open for directions */
    mapsLink: "https://maps.app.goo.gl/3c2XEpHjgTvwKbcH9",
    /** map on the page: place name + exact pin (lat/lng from the Google Maps link: the "!3d…!4d…" numbers) */
    map: { name: "Love Halls", lat: 29.9785021, lng: 31.2324685 },
  },
  /** separate reception venue — null = same place as the ceremony */
  reception: null as null | { title: Tx; place: Tx; address: Tx; time: string; mapsLink: string; map: { name: string; lat: number; lng: number } },

  // ---------- RSVP ----------
  rsvp: { deadline: "2026-12-06" }, // last day to reply (venue time)

  // ---------- dress code ----------
  dressCode: {
    title: { en: "Formal / Semi-formal", ar: "رسمي / شبه رسمي" } as Tx,
    note: { en: "We'd love to see you in the colors of our day", ar: "يسعدنا أن نراكم بألوان يومنا" } as Tx,
    colors: [
      { color: "#141414", name: { en: "Black", ar: "أسود" } },
      { color: "#8c8c8c", name: { en: "Grey", ar: "رمادي" } },
      { color: "#7a1c24", name: { en: "Deep red", ar: "أحمر داكن" } },
      { color: "#1d3557", name: { en: "Deep blue", ar: "أزرق داكن" } },
      { color: "#4a2c1d", name: { en: "Deep brown", ar: "بني داكن" } },
    ] as { color: string; name: Tx }[],
  },

  // ---------- day schedule (icon optional: "bird" | "gate" | "fountain") ----------
  schedule: [
    {
      time: "18:00",
      title: { en: "The engagement begins", ar: "بداية حفل الخطوبة" },
      note: { en: "Don't be late — we're not starting without you!", ar: "متتأخروش… مش هنبدأ من غيركم!" },
    },
  ] as { time: string; title: Tx; note?: Tx; icon?: "bird" | "gate" | "fountain" }[],

  // ---------- quotes (shown instead of the schedule) ----------
  quotes: [
    { en: "Our happiness is only complete when you are there to share it.", ar: "فرحتنا مش هتكمل غير بوجودكم معانا." },
    { en: "We found each other — now we want to celebrate it with the people we love most.", ar: "لقينا بعض… ودلوقتي عايزين نفرح بده مع أغلى الناس علينا." },
    { en: "Come laugh with us, dance with us, and make this night unforgettable.", ar: "تعالوا اضحكوا معانا، ارقصوا معانا، وخلّوا الليلة دي متتنسيش." },
    { en: "Every love story is beautiful, but ours is better with you in it.", ar: "كل قصة حب حلوة… بس قصتنا أحلى وإنتم فيها." },
  ] as Tx[],

  // ---------- wording ----------
  text: {
    welcome: { en: "WELCOME TO OUR ENGAGEMENT", ar: "أهلاً بكم في حفل خطوبتنا" },
    introLine: { en: "Cordially invite you", ar: "يتشرفان بدعوتكم" },
    open: { en: "Open", ar: "افتح الدعوة" },
    invite: { en: "Together with our families\nwe invite you to our engagement", ar: "مع عائلتينا\nيسعدنا دعوتكم لحضور حفل خطوبتنا" },
    ceremonyHeading: { en: "ENGAGEMENT INFO", ar: "تفاصيل الحفل" },
    at: { en: "AT", ar: "الساعة" },
    galleryHeading: { en: "Photo Gallery", ar: "ألبوم الصور" },
    bigDayHeading: { en: "THE BIG DAY", ar: "اليوم الموعود" },
    bigDayNote: { en: "We can't wait to celebrate with you", ar: "ننتظركم لنحتفل معاً" },
    countdownLabel: { en: "Countdown", ar: "العد التنازلي" },
    countdownUnits: { en: "days|hours|min|sec", ar: "يوم|ساعة|دقيقة|ثانية" },
    addToCalendar: { en: "Add to Calendar", ar: "أضف إلى التقويم" },
    rsvpButton: { en: "CONFIRM ATTENDANCE", ar: "تأكيد الحضور" },
    rsvpBy: { en: "Kindly reply by {date}", ar: "برجاء تأكيد الحضور قبل {date}" },
    rsvpClosed: { en: "RSVP is closed", ar: "انتهى موعد تأكيد الحضور" },
    venueHeading: { en: "Party Venue", ar: "مكان الحفل" },
    directions: { en: "Get directions", ar: "الاتجاهات على الخريطة" },
    copyAddress: { en: "Copy address", ar: "نسخ العنوان" },
    copied: { en: "Copied ✓", ar: "تم النسخ ✓" },
    dressCodeHeading: { en: "DRESS CODE", ar: "الدريس كود" },
    scheduleHeading: { en: "ENGAGEMENT SCHEDULE", ar: "برنامج الحفل" },
    quotesHeading: { en: "FROM OUR HEARTS", ar: "من قلوبنا" },
    guestbookHeading: { en: "Guestbook", ar: "دفتر التهاني" },
    footer: { en: "Your presence would be the greatest gift we could receive!", ar: "حضوركم هو أجمل هدية لنا!" },
  } satisfies Record<string, Tx>,

  // ---------- forms ----------
  form: {
    name: { en: "Your name*", ar: "الاسم*" },
    accept: { en: "Joyfully accept", ar: "سأحضر بكل سرور" },
    decline: { en: "Regretfully decline", ar: "أعتذر عن الحضور" },
    guests: { en: "Number of guests (including you)", ar: "عدد الضيوف (بما فيهم أنت)" },
    phone: { en: "Phone (optional)", ar: "رقم الهاتف (اختياري)" },
    message: { en: "Message (optional)", ar: "رسالة (اختياري)" },
    sendRsvp: { en: "SEND RSVP", ar: "إرسال" },
    sending: { en: "SENDING...", ar: "جارٍ الإرسال..." },
    thanks: { en: "Thank you, {name}!", ar: "شكراً يا {name}!" },
    thanksYes: { en: "We can't wait to celebrate with you.", ar: "ننتظركم بكل حب." },
    thanksNo: { en: "We'll miss you — thank you for letting us know.", ar: "سنفتقدكم، شكراً لإبلاغنا." },
    close: { en: "Close", ar: "إغلاق" },
    error: { en: "Could not send — please try again.", ar: "تعذّر الإرسال، حاول مرة أخرى." },
    wishName: { en: "Enter your name*", ar: "اكتب اسمك*" },
    wishText: { en: "Enter your wishes*", ar: "اكتب تهنئتك*" },
    sendWish: { en: "SEND WISHES", ar: "أرسل التهنئة" },
    wishThanks: { en: "Thank you for your wishes! ♡", ar: "شكراً على تهنئتكم! ♡" },
    wishEmpty: { en: "Be the first to leave a wish ♡", ar: "كن أول من يكتب تهنئة ♡" },
    wishLoading: { en: "Loading wishes… ♡", ar: "جارٍ تحميل التهاني… ♡" },
    magic: { en: "Suggest a wish", ar: "اقترح تهنئة" },
  } satisfies Record<string, Tx>,

  // ---------- look & behaviour ----------
  song: "/music/song.mp3", // replace public/music/song.mp3 with your song (same name)
  theme: "#005885",
  autoScroll: { delayMs: 1900, pxPerSecond: 50 }, // after opening (like the original)
  gallerySlideMs: 4000, // gallery auto-slide, 0 = off
  /** language when the page opens: "auto" = Arabic for Arabic phones, else English */
  defaultLang: "auto" as "auto" | "en" | "ar",

  // ---------- Google Sheet (RSVP + guestbook) ----------
  // Paste your Apps Script web-app URL here, or set NEXT_PUBLIC_SHEET_URL in .env.local
  // (see google-sheet/README.md). Empty = replies only stay on the page.
  sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL ?? "",
};

// ---------- gallery photos, in order ----------
// Put your files in public/images/photos/ and list them here. 1 photo = no slider, 2+ = slider.
export const photos: string[] = [
  "/images/photos/photo-1.webp",
  "/images/photos/photo-2.webp",
];

// ---------- guestbook ----------
export type Wish = { name: string; date: string; message: string };

/** Wishes shown when no Google Sheet is connected (empty = "Be the first…"). */
export const wishes: Wish[] = [];

/** Ideas used by the 🪄 button */
export const wishIdeas: Tx[] = [
  { en: "Wishing you a lifetime of love, laughter and happily ever after.", ar: "ألف مبروك الخطوبة! ربنا يتمم لكم على خير ويسعد قلوبكم دايماً." },
  { en: "May your love grow stronger with every passing year. Congratulations!", ar: "ألف مبروك! ربنا يجعلها بداية حياة سعيدة مليانة حب." },
  { en: "So happy for you both. Here's to love, adventure and many beautiful years together.", ar: "فرحانين جداً بيكم، ربنا يدوم الحب والفرحة بينكم." },
  { en: "Two hearts, one love, endless happiness. Congratulations on your engagement!", ar: "قلبين وحب واحد وسعادة ملهاش آخر، مبروك الخطوبة!" },
];
