/* ==========================================================================
   CC HOMEPAGE CONTENT
   --------------------------------------------------------------------------
   Everything the homepage shows (except the hero and 2025 stats, which live
   in index.html) comes from this file. Edit, save, refresh — no build step.

   Dates use the format 'YYYY-MM-DD'. Lists are sorted newest-first
   automatically, so you can add new items anywhere.

   Photos: set `photo: 'assets/team/name.jpg'` on any person. Leave it empty
   and the site shows their initials instead.

   Anything marked  SAMPLE  is placeholder content written to preview the
   design. Replace it with real people, quotes and posts before going live.
   ========================================================================== */

window.CC_CONTENT = {
  site: {
    email: 'hello@thecollegecrafters.com',

    /* Shown in the footer contact block. `phone` is what readers see;
       `phoneLink` is the digits the tel: link dials, so the two can be
       formatted independently. */
    phone: '+92 3028082222',
    phoneLink: '+923028082222',

    // Used by every "Book Meeting" button on the page
    booking: [
      {
        label: 'Undergraduate',
        hint: 'Students applying to college',
        url: 'https://collegecrafters.notion.site/17b451c741e08096aaa5c3032d5d42df?pvs=105',
      },
      {
        label: 'Graduate',
        hint: 'Graduate school applicants',
        url: 'https://collegecrafters.notion.site/18c451c741e08105b71ef42403965718?pvs=105',
      },
    ],

    // "See all" links — point these at the full pages once they exist
    links: {
      journalArchive: '#journal',
    },
  },

  /* ------------------------------------------------------------------------
     BOARD MEMBERS
     Cards show name, an optional `credential` line, and role. No bios.
     Set `photo` to a file in assets/team/ to replace the placeholder headshot.
     ------------------------------------------------------------------------ */
  board: [
    {
      name: 'Nicholas S. Zeppos',
      credential: '',
      role: 'University Attorney and former Chancellor of Vanderbilt University',
      photo: 'assets/team/zeppos.jpg',
    },
  ],

  /* ------------------------------------------------------------------------
     TEAM
     `credential` is the optional line under the name (school and class year,
     or a qualification). Leave it '' to omit. Cards show name, credential and
     role only — no bios.
     ------------------------------------------------------------------------ */
  team: [
    {
      name: 'Muhammad Fasih Khizer',
      credential: "Vanderbilt University '24",
      role: 'Co-Founder & CEO',
      photo: 'assets/team/fasih.jpg',
    },
    {
      name: 'Yasir Iqbal',
      credential: 'New Jersey Institute of Technology',
      role: 'Co-Founder & Chief Operating Officer (COO)',
      photo: 'assets/team/yasir.jpg',
    },
    {
      name: 'Sidra Waseem',
      credential: '18 years of experience',
      role: 'Chief Academic and Partnership Officer',
      photo: 'assets/team/sidra.jpg',
    },
    {
      name: 'Muhammad Arslan Asghar',
      credential: "NYU Abu Dhabi '25",
      role: 'Chief Technology Officer (CTO) & Head Counsellor',
      photo: 'assets/team/arslan.jpg',
    },
    {
      name: 'Shayan Husham',
      credential: "NYU Abu Dhabi '25",
      role: 'CFO & Sales Manager',
      photo: '',
    },
    {
      name: 'Mariam Amir Awan',
      credential: '',
      role: 'Director & Head Counsellor of College Seekers',
      photo: '',
    },
    {
      name: 'Abida Sindhu',
      credential: "Northwestern University, Master's in Education",
      role: 'Director, Extracurriculars',
      photo: '',
    },
    {
      name: 'Zul',
      credential: 'MBA, Harvard',
      role: 'Director, Operations',
      photo: '',
    },
    {
      name: 'Ibrahim',
      credential: 'PhD, University of Chicago',
      role: 'Grad Head Counsellor',
      photo: 'assets/team/ibrahim.jpg',
    },
  ],

  /* ------------------------------------------------------------------------
     5-STEP APPLICATION PROCESS
     Shown as switchable tracks: the general story-first process, plus one
     breakdown per destination country. Each track has 5 `steps`; a step
     with a `services` list gets the two-column layout, a step without one
     gets a single wide reading column. `spotlight` (optional) adds a small
     callout under the steps — used here for UCL & LSE under UK.
     ------------------------------------------------------------------------ */
  process: {
    tracks: [
      {
        id: 'general',
        label: 'Our Process',
        mode: 'flow',
        title: '',
        intro: '',
        steps: [
          {
            title: 'Story & Strategy',
            kicker: 'Find your story',
            summary: 'Before a single essay is written, we find the story only you can tell — and the schools that want it.',
            outcome: 'A clear personal narrative and a balanced, best-fit college list.',
            services: [
              {
                name: 'Application & University Strategy',
                text: 'We align transcript, activities, essays, and recommendations so they tell one story — so admissions officers remember who you are, not just what you did.',
              },
              {
                name: 'College Selection',
                text: 'We help you find schools that want your story — best fit for who you are, not just your stats.',
              },
            ],
          },
          {
            title: 'Building the Four Pieces',
            kicker: 'Shape the application',
            summary: 'Transcript, activities, essays and recommendations — each piece should reinforce the same story.',
            outcome: 'Essays in your own voice and activities that read as a pattern, not a list.',
            services: [
              {
                name: 'Essay Support & Review',
                text: 'Where your voice takes center stage. We help your essays sound like you and reinforce the same story the rest of your application tells.',
              },
              {
                name: 'Extracurricular & Leadership Program',
                text: "We help your activities read as a pattern — mission and values — not a random list, so they support the story you're telling.",
              },
              {
                name: 'Research Opportunities',
                text: 'The academic spine of your narrative — course choices and research that show what you care about intellectually.',
              },
            ],
          },
          {
            title: 'Getting to the Table',
            kicker: 'Academics & testing',
            summary: "Grades and scores get you considered. We make sure they're working for your story, not against it.",
            outcome: 'A transcript with depth and test scores that clear the bar.',
            services: [
              {
                name: 'Course & Rigor Selection',
                text: 'Your course choices tell a story about what you care about intellectually. We help you build a transcript that shows depth, curiosity, and readiness.',
              },
              {
                name: 'Standardized Test Prep',
                text: 'Gets you to the table; we then focus on the story that gets you in. Personalized coaching and proven strategies for SAT, ACT, and more.',
              },
            ],
          },
          {
            title: 'Proof & Fit',
            kicker: 'Aid & interviews',
            summary: "Show schools you belong in person — and make sure cost doesn't limit where you can go.",
            outcome: 'Complete aid and scholarship applications, and a confident interview.',
            services: [
              {
                name: 'Financial Aid & Scholarship Application',
                text: "We assist you in applying for financial aid and scholarships so your story isn't limited by cost.",
              },
              {
                name: 'Interview Preparation',
                text: 'Where you speak your story; we help you deliver the same narrative in person with mock interviews and feedback.',
              },
            ],
          },
          {
            title: 'Ongoing Support',
            kicker: 'Decisions & beyond',
            summary: "From first draft to final decision — and after — you're never doing this alone.",
            outcome: 'A mentor and a network that stay with you long after you apply.',
            services: [
              {
                name: 'Networking',
                text: 'Connect with admits who lived the process; their voices can help you sharpen and confirm your story.',
              },
              {
                name: 'Mentorship & Ongoing Support',
                text: 'One person who helps you connect the dots from first draft to final application — so every piece still tells the same story.',
              },
            ],
          },
        ],
      },
      {
        id: 'us',
        label: 'United States',
        title: 'Applying to the United States',
        intro:
          "The US is home to some of the world's most prestigious universities, and some of the most generous financial aid for international students.",
        steps: [
          {
            icon: 'book',
            title: 'Academics',
            summary:
              'US universities review your Grade 9–12 record, including internal transcripts and external results. We support all major curricula: IB, AP, O/A Levels, and Matriculation.',
          },
          {
            icon: 'target',
            title: 'Standardized Testing',
            summary:
              'The SAT and ACT are both widely accepted. The SAT (scored out of 1600) rewards analytical, evidence-based reasoning; the ACT (scored 1–36) is faster-paced and more straightforward. A 1400+ SAT is competitive, 1500+ is outstanding for top schools. International students also typically need TOEFL/IELTS, though a strong SAT Reading & Writing score can sometimes waive this. Your C.C counselor will help you choose.',
          },
          {
            icon: 'sparkle',
            title: 'Extracurricular Activities',
            summary: 'Up to 10 activities are evaluated, quality over quantity. Self-initiated passion projects carry real weight.',
          },
          {
            icon: 'edit',
            title: 'Essays',
            summary:
              'Your personal and supplemental essays show admissions committees who you are beyond the numbers. C.C students work directly with current students at top universities like NYU and Stanford to craft essays that stand out.',
          },
          {
            icon: 'users',
            title: 'Recommendation Letters',
            summary:
              'Most US schools require 3 letters: 2 from subject teachers, 1 from your counselor. Strong, specific letters can make the difference.',
          },
        ],
        mode: 'map',
        outcome: {
          icon: 'award',
          title: 'One application, read as a whole',
          text: 'US review is holistic: these five are weighed together as a single picture, not worked through in order.',
        },
      },
      {
        id: 'uk',
        label: 'United Kingdom',
        title: 'Applying to the United Kingdom',
        intro: 'UK universities are globally ranked and academically rigorous, and the process looks quite different from the US.',
        steps: [
          {
            icon: 'book',
            title: 'Academics',
            summary: 'Academic performance carries the most weight. UK universities assess external results, such as O/A Levels.',
          },
          {
            icon: 'target',
            title: 'Testing',
            summary:
              'Depending on your course, you may need university-specific admissions tests, internal assessments, or the LNAT (required for Law at UCL, LSE, Oxford, and others).',
          },
          {
            icon: 'file',
            title: 'Resume / CV & Projects',
            summary: 'A clear CV highlighting academic projects, research, and extracurriculars matters most for competitive courses.',
          },
          {
            icon: 'edit',
            title: 'Personal Statement',
            summary:
              'Your single most important document. One statement covers all UCAS choices, so it must be course-specific and show genuine academic passion. New for 2026 entry: UCAS has replaced the old 4,000-character essay with three structured questions — why you want to study the subject, your relevant skills and experience, and how your achievements connect to your course. A clearer framework for well-prepared students.',
          },
          {
            icon: 'users',
            title: 'Recommendation Letters',
            summary: 'At least one strong academic reference is required, speaking to your intellectual ability and fit for your chosen course.',
          },
        ],
        mode: 'map',
        outcome: {
          icon: 'award',
          title: 'One course-specific case',
          text: 'A UK offer turns on fit for the specific course you name, with academic performance carrying the most weight.',
        },
        spotlight: {
          title: 'Spotlight: UCL & LSE',
          text: "UCL ranks among the world's top 10 universities. LSE is globally recognized for economics, social sciences, and law. Both are within reach — and C.C has the experience to help you get there.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------------
     NEWS — DORMANT, NOT RENDERED ANYWHERE
     The News section and its pages were removed from the site. This content
     is kept so News can be restored without rewriting it: add a `news` item
     back to nav-data.js and a page entry with { type: 'data', source: 'news' }
     to page-content.js, and it renders again. Delete this array (plus
     newsList() in site.js and the .ncard rules in site.css) to purge it.

     `featured: true` puts an item in the large card. Add `image` to use a
     photo; otherwise `highlight` shows a big number on a teal card.
     ------------------------------------------------------------------------ */
  news: [
    {
      date: '2026-09-15',
      tag: 'Results',
      title: '107 acceptances and $23.9M in aid: a record admissions cycle',
      excerpt:
        'Our students earned 107 acceptances — including 15 at the Ivy League, Stanford and MIT, and 35 at US News top-20 universities — with 83 students receiving financial aid or scholarships.',
      url: 'https://thecollegecrafters.com/',
      featured: true,
      highlight: { value: '107', label: 'Acceptances · 197% growth since 2021' },
    },
    {
      // SAMPLE
      date: '2026-09-10',
      tag: 'Announcement',
      title: 'Consultations now open for the new application cycle',
      excerpt: 'Book an undergraduate or graduate strategy meeting with our team to start planning your applications.',
      url: '#top',
    },
    {
      // SAMPLE
      date: '2026-09-03',
      tag: 'College Seekers',
      title: 'College Seekers welcomes its newest cohort',
      excerpt: 'Our affiliated program opens its doors to a new group of students beginning their college search.',
      url: '#college-seekers',
    },
    {
      // SAMPLE
      date: '2026-08-25',
      tag: 'Launch',
      title: 'Introducing the CC Daily Journal',
      excerpt: 'A short read every day from our counselors on essays, deadlines, aid and life after admission.',
      url: '#journal',
    },
  ],

  /* ------------------------------------------------------------------------
     COLLEGE & CAREER UPDATES  (SAMPLE)
     category: 'admissions' | 'financial-aid' | 'testing' | 'careers'
     ------------------------------------------------------------------------ */
  updates: [
    {
      date: '2026-09-16',
      category: 'financial-aid',
      region: 'US',
      title: 'FAFSA and CSS Profile season is almost here',
      summary: 'Both forms typically open October 1. File early — some schools and states award aid on a first-come basis.',
      url: '',
    },
    {
      date: '2026-09-14',
      category: 'admissions',
      region: 'UK',
      title: 'UCAS: mid-October deadline for Oxford, Cambridge and medicine',
      summary: 'Applications to Oxford or Cambridge, and to most medicine, dentistry and veterinary courses, close in mid-October.',
      url: '',
    },
    {
      date: '2026-09-12',
      category: 'admissions',
      region: 'US',
      title: 'Early Decision or Early Action? Choosing your round',
      summary: "ED is binding; EA isn't. Many early deadlines fall on November 1 or 15 — confirm each school's policy first.",
      url: '',
    },
    {
      date: '2026-09-09',
      category: 'testing',
      region: 'Global',
      title: 'Picking your last test date before early applications',
      summary: 'Check which test dates each school accepts for early rounds, so your scores arrive before the file is read.',
      url: '',
    },
    {
      date: '2026-09-05',
      category: 'careers',
      region: 'Global',
      title: 'Summer research and internship programs open early',
      summary: 'Many competitive programs for high school students open in winter, with deadlines between January and March.',
      url: '',
    },
    {
      date: '2026-09-02',
      category: 'admissions',
      region: 'CA',
      title: 'Applying to Canada: OUAC and direct applications',
      summary: 'Ontario universities use OUAC; most other provinces apply directly to each university, each with its own timeline.',
      url: '',
    },
  ],

  /* ------------------------------------------------------------------------
     UPCOMING DEADLINES — 2026–27 cycle (autumn 2027 entry)
     Checked October 2026 against UCAS, College Board, ACT and OUAC.
     Days-left counts update automatically. An entry with a `year` is an
     exact date and disappears once it has passed; an entry without one is
     a recurring date that rolls over to next year.
     ------------------------------------------------------------------------ */
  deadlines: [
    { label: 'UCAS: Oxford, Cambridge, medicine, dentistry & vet', month: 10, day: 15, year: 2026, region: 'UK' },
    { label: 'ACT test date', month: 10, day: 17, year: 2026, region: 'Global' },
    { label: 'Early Decision & Early Action (many schools)', month: 11, day: 1, year: 2026, region: 'US' },
    { label: 'SAT test date', month: 11, day: 7, year: 2026, region: 'Global' },
    { label: 'Early Decision & Early Action (second wave)', month: 11, day: 15, year: 2026, region: 'US' },
    { label: 'SAT test date (last of 2026)', month: 12, day: 5, year: 2026, region: 'Global' },
    { label: 'ACT test date', month: 12, day: 12, year: 2026, region: 'Global' },
    { label: 'Regular Decision (many schools)', month: 1, day: 1, year: 2027, region: 'US' },
    { label: 'UCAS equal-consideration deadline', month: 1, day: 13, year: 2027, region: 'UK' },
    { label: 'OUAC: Ontario universities', month: 1, day: 15, year: 2027, region: 'Canada' },
    { label: 'UCAS: universities aim to send decisions', month: 3, day: 31, year: 2027, region: 'UK' },
    { label: 'US National Decision Day', month: 5, day: 1, year: 2027, region: 'US' },
    { label: 'UCAS: reply to offers (most applicants)', month: 5, day: 5, year: 2027, region: 'UK' },
    { label: 'UCAS: final deadline before Clearing', month: 6, day: 30, year: 2027, region: 'UK' },
  ],

  /* ------------------------------------------------------------------------
     TESTIMONIALS  (SAMPLE — replace with real, permissioned quotes)

     `quote`, `name`, `detail` and `result` drive the home page carousel.
     The testimonials page additionally uses `headline` (the story title),
     `role` ('Student' or 'Parent', which the filter tabs read), `country`
     (the "from" in the byline) and `accent` (a decorative colour for the
     card — it is not tied to any institution). All four are optional: an
     entry without them still renders, just more plainly.

     `photo` is the student's portrait on the story card. Leave it empty and
     the card shows their initials on a wash of the accent colour instead.
     See assets/students/README.md for sizes and for what to get permission
     for before publishing someone's picture.
     ------------------------------------------------------------------------ */
  /* The four portraits in the home page hero ("Trusted by students…").
     Picked separately from the stories so the sharpest photos can lead.
     Uses the same 600×750 crops as the story cards; remove this list and
     the row falls back to the first four testimonials. */
  trustPhotos: [
    { name: 'Rammal Sheikh', photo: 'assets/students/rammal-sheikh.jpg' },
    { name: 'Zainab', photo: 'assets/students/zainab.jpg' },
    { name: 'Areeb Assad', photo: 'assets/students/areeb-assad.jpg' },
    { name: 'Raya Billa', photo: 'assets/students/raya-billa.jpg' },
  ],

  testimonials: [
    {
      headline: 'Duke felt impossible until I realized I had a real chance',
      quote:
        "Applying to universities like Duke can be intimidating, especially when you’re also thinking about the financial side of studying abroad. College Crafters helped me approach the process with a lot more clarity and confidence. They helped me bring my experiences together into an application that genuinely represented who I am, rather than trying to fit me into a formula. Getting admitted to Duke with full financial aid was a moment I’ll always be grateful for, and I don’t think I would have approached the process the same way without their guidance.",
      name: 'Rammal Sheikh',
      role: 'Student',
      country: 'Pakistan',
      detail: 'Student · Class of 2025-26',
      result: 'Duke University · Full Financial Aid',
      accent: '#57068c',
      photo: 'assets/students/rammal-sheikh.jpg',
    },
    {
      headline: 'Dartmouth felt like a dream until it became real',
      quote:
        "The application process can feel overwhelming when you’re aiming for a university like Dartmouth. What helped me most was having people who understood both the process and what I was trying to achieve. From refining my application to making sure my experiences came through clearly, the guidance made the process much more manageable. Seeing the Dartmouth acceptance — along with the scholarship — was a moment I’ll never forget.",
      name: 'Haaris Usman Saeed',
      role: 'Student',
      country: 'Pakistan',
      detail: 'Student · Class of 2025-26',
      result: 'Dartmouth College · Full Financial Aid',
      accent: '#0d7377',
      photo: 'assets/students/haaris-usman-saeed.jpg',
    },
    {
      headline: 'My applications finally reflected what I wanted to study',
      quote:
        'I had worked hard throughout school, but turning everything I had done into a strong college application was a completely different challenge. College Crafters helped me bring my academics, interests, and experiences together into a clear application. Receiving an acceptance from Dartmouth was incredible, and having multiple options, including NJIT and Rhodes University, made the outcome even more rewarding.',
      name: 'Areeb Assad',
      role: 'Student',
      country: 'Pakistan',
      detail: 'Student · Class of 2026',
      result: 'Dartmouth College · NJIT · Rhodes University · Full Financial Aid',
      accent: '#1d4f91',
      photo: 'assets/students/areeb-assad.jpg',
    },
    {
      headline: 'I stopped wondering whether I was aiming too high',
      quote:
        "Applying to highly selective universities can make you constantly question whether you’re good enough. The guidance I received helped me stop thinking about the process as simply getting into a good college and start thinking about where I would actually thrive. Seeing Columbia and Williams among my acceptances made me realize that the right application can open doors you once thought were out of reach.",
      name: 'Raya Billa',
      role: 'Student',
      country: 'Pakistan',
      detail: 'Student · Class of 2025-26',
      result: 'Columbia University · Williams College · Full Financial Aid',
      accent: '#a85400',
      photo: 'assets/students/raya-billa.jpg',
    },
  ],

  /* ------------------------------------------------------------------------
     UNIVERSITIES — the admits marquee on the home page

     `label` is what shows, `name` is the full name announced to screen
     readers, `color` is the university's own brand colour.

     Colours are each school's official brand value, except Princeton,
     Purdue, Cambridge and LSE, which are darkened from the official hex so
     the name clears 4.5:1 contrast on the tinted band. Swap in the exact
     brand value if you would rather have the match than the contrast.

     To use a real logo image instead of the wordmark, add a `logo` path:

       { label: 'MIT', name: '...', color: '#a31f34', logo: 'assets/logos/mit.svg' }

     The wordmark stays in the markup as a fallback, so if the file is
     missing or renamed the name shows instead of a broken image.
     See assets/logos/README.md before adding any — they are trademarks.
     ------------------------------------------------------------------------ */
  universities: [
    { label: 'MIT', name: 'Massachusetts Institute of Technology', color: '#a31f34' },
    { label: 'Stanford', name: 'Stanford University', color: '#8c1515' },
    { label: 'Harvard', name: 'Harvard University', color: '#a51c30' },
    { label: 'Princeton', name: 'Princeton University', color: '#a85400' },
    { label: 'Yale', name: 'Yale University', color: '#00356b' },
    { label: 'Columbia', name: 'Columbia University', color: '#1d4f91' },
    { label: 'NYU', name: 'New York University', color: '#57068c' },
    { label: 'Duke', name: 'Duke University', color: '#012169' },
    { label: 'Michigan', name: 'University of Michigan', color: '#00274c' },
    { label: 'Purdue', name: 'Purdue University', color: '#7d6235' },
    { label: 'Oxford', name: 'University of Oxford', color: '#002147' },
    { label: 'Cambridge', name: 'University of Cambridge', color: '#005fae' },
    { label: 'UCL', name: 'University College London', color: '#500778' },
    { label: 'LSE', name: 'London School of Economics and Political Science', color: '#c8102e' },
  ],

  /* ------------------------------------------------------------------------
     COLLEGE SEEKERS — Direct Apply University Network
     Regions come from the "College Seekers: Panel University List" sheet.
     Every region is a two-column table: Universities | Concentrations.
     Where the sheet has no concentrations for a region yet, cells show an
     em dash and the region carries a `note` saying so.
     ------------------------------------------------------------------------ */
  collegeSeekers: {
    affiliation: 'An affiliated program by College Crafters',
    tagline: 'Direct Apply University Network',
    description:
      'Giving students direct access to top university and college options across these regions.',
    regions: [
      {
        id: 'united-states',
        label: 'United States',
        heading: 'Core US University Network',
        intro: 'Direct-apply options across our core US university network.',
        columns: ['Universities', 'Concentrations'],
        rows: [
          ['University of Illinois Chicago', 'Business, Science and Arts'],
          ['Southwest Minnesota State University', 'Business, Science and Arts'],
          ['Eastern Michigan University', 'Business, Science and Arts'],
          ['Minnesota State University Moorhead (MSUM)', 'Business, Science and Arts'],
          ['St.Cloud State University', 'Business, Science and Arts'],
          ['University of Central Arkansas', 'Business, Science and Arts'],
          ['California State University', 'Business, Science and Arts'],
          ['University of South Dakota', 'Business, Science and Arts'],
          ['Wichita State University', 'Business, Science and Arts'],
          ['Murray State University', 'Business, Science and Arts'],
          ['Western Michigan University - Kalamazoo', 'Business, Science and Arts'],
          ['Tiffin University', 'Business, Science and Arts'],
          ['Washington University of Science and Technology', 'Business, Science and Arts'],
          ['Monroe University', 'Business, Science and Arts'],
          ['University of Wisconsin - Superior', 'Business, Science and Arts'],
          ['Southern New Hampshire University', 'Business, Science and Arts'],
          ['California State University, Bakersfield', 'Business, Science and Arts'],
          ['San Francisco State University', 'Business, Science and Arts'],
          ['Cleveland State University', 'Business, Science and Arts'],
          ['Purdue University Northwest', 'Business, Science and Arts'],
          ['Saint Leo University', 'Business, Science and Arts'],
          ['Pittsburg State University', 'Business, Science and Arts'],
          ['Texas State University', 'Business, Science and Arts'],
          ['University of Massachusetts Boston (UMass Boston)', 'Business, Science and Arts'],
          ['Texas A&M', 'Business, Science and Arts'],
        ],
      },
      {
        id: 'canada',
        label: 'Canada',
        heading: 'Top-Tier Universities & Tuition Panels',
        intro: 'High-value, direct-apply university options through our Canadian portfolio.',
        columns: ['Universities', 'Concentrations'],
        rows: [
          ['Alogoma University (Ontario)', 'Business, Arts and Sciences'],
          ['Yorkville University - Vancouver', 'Business, Arts and Sciences'],
          ['Lauretian University', 'Business, Arts and Sciences'],
          ['Wilfrid Laurier University - Waterloo', 'Business, Arts, Sciences and Eng'],
          ['Western University', 'Business, Arts, Sciences and Eng'],
          ['Brock University', 'Business, Arts and Sciences'],
          ['University of Waterloo', 'Business, Arts, Sciences and Eng'],
          ['The University of British Columbia (UBC)', 'Business, Arts and Sciences'],
          ['Thompson Rivers University - TRU', 'Business, Arts and Sciences'],
          ['University of Ottawa', 'Business, Arts, Sciences and Eng'],
        ],
      },
      {
        id: 'united-kingdom',
        label: 'United Kingdom',
        heading: 'UK Universities, Pathways & International Colleges',
        intro: 'Direct entry, foundation and pathway routes across England, Scotland, Wales and Northern Ireland.',
        columns: ['Universities', 'Concentrations'],
        rows: [
          ['University of Southampton, Southampton, England', '—'],
          ['University of Birmingham ( Foundation)', '—'],
          ['University of Bath, Bath, England', '—'],
          ['The University of Exeter, Exeter, England', '—'],
          ['University of Reading, Reading, England', '—'],
          ['Cranfield University, Cranfield, England', '—'],
          ['Queen\'s University Belfast, Belfast, Northern Ireland', '—'],
          ['University of Aberdeen, Aberdeen, Scotland', '—'],
          ['University of Sussex, Brighton, England', '—'],
          ['University of Surrey, Guildford, England', '—'],
          ['University of Leicester, Leicester, England', '—'],
          ['Royal Holloway, University of London, Egham, England', '—'],
          ['University of Dundee, Dundee, Scotland', '—'],
          ['University of Dundee (ICD Partnership Limited) (Pathways)', '—'],
          ['Aston University, Birmingham, England', '—'],
          ['University of Essex, Colchester, England', '—'],
          ['SOAS University of London, London, England', '—'],
          ['University of Hull, Hull, England', '—'],
          ['Coventry University, Coventry & London, England', '—'],
          ['Goldsmiths, University of London, London, England', '—'],
          ['Nottingham Trent University, Nottingham, England', '—'],
          ['Kingston University, Kingston, England', '—'],
          ['University of Bradford (Bradford International College Limited)', '—'],
          ['Middlesex University, London, England', '—'],
          ['University of Greenwich, London, England', '—'],
          ['University of Greenwich (Greenwich International College Limited )', '—'],
          ['University of Brighton, Brighton, England', '—'],
          ['Keele University, Keele, England', '—'],
          ['University of East London, London, England', '—'],
          ['University of East London, Pathway Programs (Directly through University)', '—'],
          ['London Metropolitan University, London, England', '—'],
          ['Birmingham City University, Birmingham, England', '—'],
          ['University of Derby, Derby, England', '—'],
          ['Canterbury Christ Church University, Canterbury, England', '—'],
          ['Abertay University, Dundee, Scotland', '—'],
          ['St George\'s University of London, London, England', '—'],
          ['University for the Creative Arts, Farnham, England', '—'],
          ['Teesside University , Middlesbrough and London Campus', '—'],
          ['Cardiff Metropolitan University, Cardiff, Wales', '—'],
          ['University of Gloucestershire, Gloucester, England', '—'],
          ['Ravensbourne University London, England', '—'],
          ['University of Wales Trinity Saint David, London, Birmingham and Swansea Campus', '—'],
          ['Regent’s University London, London, England', '—'],
          ['Hult International Business School, London, England', '—'],
          ['Norwich University of Arts, Norwich, England', '—'],
          ['Le - Cordon Bleu, London, England', '—'],
          ['Istituto Marangoni, London, England', '—'],
          ['Regent College London, Middlesex, England', '—'],
          ['University of Kent International College, Canterbury, England', '—'],
          ['(Study Group) University of Sussex International Study Centre', '—'],
          ['(Study Group) Liverpool John Moores University, Liverpool, England', '—'],
          ['QAHE- Ulster University, Birmingham London & Manchester, England', '—'],
          ['QAHE- Northumbria University, London Campus, England', '—'],
          ['Anglia Ruskin University College (ARUC)', '—'],
          ['KIC / University of Bournemouth (Foundation)', '—'],
          ['Nottingham Trent International College', '—'],
          ['(KAPLAN) University of Brighton International College', '—'],
          ['(KAPLAN) University of Essex, Colchester. Ineternational Pathway', '—'],
          ['(KAPLAN) Glasgow International College', '—'],
          ['(KAPLAN) Liverpool International College', '—'],
          ['(KAPLAN) University of Nottingham International College', '—'],
          ['(KAPLAN) University of York International Pathway College', '—'],
          ['(KAPLAN) University of the West of England, Bristol', '—'],
          ['(KAPLAN) KIC /City University', '—'],
          ['(KAPLAN) KIC/University of Cranfield', '—'],
          ['(KAPLAN) KIC / University of Westminster', '—'],
          ['(KAPLAN) Queen Mary University of London', '—'],
          ['(KAPLAN) International College London', '—'],
          ['(KAPLAN) University of Bristol', '—'],
          ['(Study Group) Cardiff University International Study Centre', '—'],
          ['(Study Group) Durham University International Study Centre', '—'],
          ['(Study Group) Leeds Beckett University International Study Centre', '—'],
          ['(Study Group) Teesside University International Study Centre', '—'],
          ['(Study Group) The University of Sheffield International College', '—'],
          ['(Study Group) University of Aberdeen International Study Centre', '—'],
          ['(Study Group) University of Huddersfield International Study Centre', '—'],
          ['(Study Group) University of Kingston International Study Centre', '—'],
          ['(Study Group) University of Leeds International Study Centre', '—'],
          ['(Study Group) University of Strathclyde International Study Centre', '—'],
          ['(Study Group) University of Surrey International Study Centre', '—'],
          ['(QAHE) Solent University', '—'],
          ['(QAHE) University of South Wales', '—'],
          ['(NAVITAS) Birmingham City University- International College', '—'],
          ['(NAVITAS) Hertfordshire International College', '—'],
          ['(NAVITAS) International College of Portsmouth', '—'],
          ['(NAVITAS) Keele University International College', '—'],
          ['(NAVITAS) London Brunel International College', '—'],
          ['(NAVITAS) The College, Swansea University', '—'],
          ['(NAVITAS) University of Plymouth International College', '—'],
          ['(NAVITAS) Manchester Metropolitan University International College (MMUIC)', '—'],
          ['University Of Sheffield', '—'],
          ['University Of Edinburgh', '—'],
          ['Cardif University', '—'],
          ['University of Birmingham', '—'],
          ['University of Westminster', '—'],
          ['Regents University, London', '—'],
          ['Regents College, London', '—'],
          ['The University of Buckingham', '—'],
        ],
        note: 'Concentrations for this region are not yet listed in the source panel sheet — contact a C.C counselor for the programs available at a specific university.',
      },
      {
        id: 'malaysia',
        label: 'Malaysia',
        heading: 'Malaysia Campus Network',
        intro: 'International branch campuses and Malaysian universities, at a lower total cost of study.',
        columns: ['Universities', 'Concentrations'],
        rows: [
          ['University of Wollongong, Malaysia', '—'],
          ['Taylor\'s University, Malaysia', '—'],
          ['UCSI University, Kuala Lumpur', '—'],
          ['Asia Pacific University of Technology And Innovation, Kuala Lumpur', '—'],
          ['University of Kuala Lumpur, Malaysia', '—'],
          ['Sunway Le Cordon Bleu, Malaysia', '—'],
          ['Raffles University, Malaysia Campus', '—'],
          ['Raffles College of Higher Education, Malaysia Campus', '—'],
        ],
        note: 'Concentrations for this region are not yet listed in the source panel sheet — contact a C.C counselor for the programs available at a specific university.',
      },
      {
        id: 'uae',
        label: 'UAE',
        heading: 'UAE Branch Campuses',
        intro: 'Dubai, Abu Dhabi, Ajman and Ras Al Khaimah campuses of international universities.',
        columns: ['Universities', 'Concentrations'],
        rows: [
          ['University of Wollongong, Dubai Campus', '—'],
          ['Curtin University, Dubai Campus', '—'],
          ['University of Stirling, Dubai Campus', '—'],
          ['Murdoch University, Dubai Campus', '—'],
          ['Ajman University, Ajman', '—'],
          ['Canadian University Dubai', '—'],
          ['Abu Dhabi University, Abu Dhabi & Dubai', '—'],
          ['Middlesex University, Dubai Campus', '—'],
          ['Bath Spa University, Ras Al-Khaimah', '—'],
          ['Birla Institute of Technology and Science (BITS Pilani), Dubai Campus', '—'],
          ['University of Bolton Academic Centre Ras Al Khaimah', '—'],
          ['De Montfort University, Dubai', '—'],
          ['Rochester Institute of Technology Dubai (RIT Dubai)', '—'],
          ['Hult International Business School, Dubai Campus', '—'],
          ['Manipal Academy of Higher Education (MAHE), Dubai Campus', '—'],
          ['S P Jain School of Global Management, Dubai Campus', '—'],
          ['Symbiosis International University, Dubai Campus', '—'],
          ['EM Normandie, Dubai Campus', '—'],
          ['HTMI Switzerland, Dubai Campus', '—'],
          ['American University of Ras Al Khaimah', '—'],
          ['Synergy University, Dubai Campus', '—'],
          ['Istituto Marangoni Fashion and Design School, Dubai', '—'],
          ['Abu Dhabi Hospitality Academy Les Roches, Abu Dhabi Campus', '—'],
          ['Institute of Management Technology (IMT), Dubai', '—'],
          ['Global Business Studies-GBS Dubai', '—'],
          ['UK College of Business and Computing, Dubai Campus', '—'],
          ['Regent College, Dubai Campus', '—'],
        ],
        note: 'Concentrations for this region are not yet listed in the source panel sheet — contact a C.C counselor for the programs available at a specific university.',
      },
    ],
    disclaimer:
      'Tuition fees and intake availability vary by institution — contact a C.C counselor for current details specific to your target schools.',
  },

  /* ------------------------------------------------------------------------
     COLLEGE SEEKERS - GRADUATE
     Direct-apply graduate and doctoral network, from the "PhD Universities"
     sheet (tabs: UK, Canada, Australia, USA).

     Same shape as `collegeSeekers` above and rendered by the same component,
     so the Graduate page matches the Undergraduate one. These regions use
     `list` rather than `columns`/`rows` because the source sheet carries only
     university names — its other column is fee data, which is deliberately
     not published here.

     The UK, Canada and Australia tabs are doctoral (PhD) lists. The US tab is
     the sheet's combined graduate and PhD list. Order follows the sheet.
     ------------------------------------------------------------------------ */
  collegeSeekersGraduate: {
    affiliation: 'An affiliated program by College Crafters',
    tagline: 'Direct Apply Graduate Network',
    description:
      'Direct access to graduate and doctoral study across our partner universities in the United States, Canada, the United Kingdom and Australia.',
    regions: [
      {
        id: 'united-states',
        label: 'United States',
        heading: 'US Graduate & PhD Network',
        intro: 'Graduate and doctoral entry routes across our US partner universities.',
        list: [
          'Northeastern University',
          'University of Massachusetts Amherst',
          'University of Massachusetts Boston',
          'University of Connecticut',
          'University at Buffalo, SUNY',
          'Drexel University',
          'Temple University',
          'University of Delaware',
          'University of Maryland',
          'George Mason University',
          'Virginia Commonwealth University',
          'University of Virginia',
          'Virginia Tech',
          'University of Cincinnati',
          'Case Western Reserve University',
          'Cleveland State University',
          'Kent State University',
          'University of Toledo',
          'University of Illinois Chicago',
          'Illinois Institute of Technology',
          'DePaul University',
          'Purdue University',
          'University of South Florida',
          'Florida International University',
          'University of Central Florida',
          'Florida State University',
          'University of Florida',
          'University of Miami',
          'Florida Atlantic University',
          'Arizona State University',
          'University of Arizona',
          'Northern Arizona University',
          'University of Colorado Denver',
          'University of Colorado Boulder',
          'Colorado State University',
          'University of Kansas',
          'Kansas State University',
          'University of Missouri',
          'University of Nebraska–Lincoln',
          'University of Oklahoma',
          'Oklahoma State University',
          'University of Texas at Arlington',
          'University of Texas at Dallas',
          'University of Texas at San Antonio',
          'Texas Tech University',
          'University of Houston',
          'Baylor University',
          'University of North Texas',
          'University of South Carolina',
          'University of Alabama',
          'University of Alabama at Birmingham',
          'Auburn University',
          'University of Kentucky',
          'University of Louisville',
          'Louisiana State University',
          'Tulane University',
          'University of Mississippi',
          'Mississippi State University',
          'Johns Hopkins University',
          'University of California - Riverside',
        ],
      },
      {
        id: 'canada',
        label: 'Canada',
        heading: 'Canada PhD Network',
        intro: 'Doctoral entry routes through our Canadian partner universities.',
        list: [
          'University of Windsor',
          'Dalhousie University',
          'Université Laval',
          'University of Manitoba',
          'University of Regina',
          'University of Alberta',
          'University of British Columbia',
          'Simon Fraser University',
          'University of Victoria',
          'University of Guelph',
          'University of Waterloo',
          'Western University',
          'McMaster University',
          'Queen\'s University',
          'University of Ottawa',
          'Carleton University',
          'York University',
          'Trent University',
          'Lakehead University',
          'Memorial University of Newfoundland',
          'University of New Brunswick',
          'Concordia University',
          'Université de Montréal',
        ],
      },
      {
        id: 'united-kingdom',
        label: 'United Kingdom',
        heading: 'UK PhD Network',
        intro: 'Doctoral research places across our UK partner universities.',
        list: [
          'University of Hertfordshire',
          'Northumbria University',
          'Nottingham Trent University',
          'University of Bradford',
          'University of Liverpool',
          'Queen Mary University of London',
          'University of East Anglia',
          'University of Greenwich',
          'University of Portsmouth',
          'University of Plymouth',
          'University of Kent',
          'University of Essex',
          'University of Sussex',
          'University of Surrey',
          'University of Reading',
          'University of Leicester',
          'University of Birmingham',
          'University of Nottingham',
          'University of Sheffield',
          'University of Leeds',
          'University of York',
          'Newcastle University',
          'University of Manchester',
          'University of Warwick',
          'University of Bristol',
          'University of Southampton',
          'University of Exeter',
          'University of Bath',
          'Cardiff University',
          'University of Glasgow',
          'University of Strathclyde',
          'University of Aberdeen',
          'Heriot-Watt University',
          'University of Dundee',
          'University of Edinburgh',
        ],
      },
      {
        id: 'australia',
        label: 'Australia',
        heading: 'Australia PhD Network',
        intro: 'Doctoral entry routes through our Australian partner universities.',
        list: [
          'Deakin University',
          'RMIT University',
          'Griffith University',
          'University of Tasmania',
          'Federation University Australia',
          'La Trobe University',
        ],
      },
    ],
    disclaimer:
      'Program availability, supervisor capacity and intake months vary by institution — contact a C.C counselor for current details specific to your target schools.',
  },

  /* ------------------------------------------------------------------------
     CC DAILY JOURNAL  (SAMPLE)
     Add one entry per day. The newest entry is featured; if its date is
     today it's labelled "Today's entry" automatically.

     These are short notes: the `excerpt` is the whole entry, so the cards
     are not links. If a note does have a longer piece behind it, add a real
     `url` and the card becomes a link — add `readTime` too and it shows
     beside the author. Neither renders without a working `url`, so a card
     never advertises a page that is not there.
     ------------------------------------------------------------------------ */
  journal: [
    {
      date: '2026-09-17',
      title: 'The first-sentence problem',
      excerpt:
        "Your opening line doesn't need to be clever — it needs to put the reader somewhere specific. Three ways to start an essay in a moment instead of a summary.",
      topic: 'Essays',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-16',
      title: 'What "fit" actually means on a college list',
      excerpt: 'Fit is more than rankings and acceptance rates. How to build a list around the way you learn and live.',
      topic: 'College list',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-15',
      title: 'Your activities list should read like a pattern',
      excerpt: 'Admissions readers look for through-lines. How to order and describe activities so your values show.',
      topic: 'Activities',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-14',
      title: 'Asking for recommendations without the awkwardness',
      excerpt: 'Who to ask, when to ask, and the one-page brief that makes a teacher’s letter far more specific.',
      topic: 'Recommendations',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-13',
      title: 'Weekend reset: a 20-minute application check-in',
      excerpt: 'A short weekly routine to keep deadlines, drafts and to-dos from piling up.',
      topic: 'Planning',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-12',
      title: 'Net price calculators, explained in five minutes',
      excerpt: 'The sticker price is rarely what families pay. How to estimate your real cost before you apply.',
      topic: 'Financial aid',
      author: 'College Crafters Team',
    },
    {
      date: '2026-09-11',
      title: 'The interview question everyone forgets to prepare',
      excerpt: '"Do you have any questions for me?" is a chance to show fit. Here is how to use it.',
      topic: 'Interviews',
      author: 'College Crafters Team',
    },
  ],
};
