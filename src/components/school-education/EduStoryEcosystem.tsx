'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/routing';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { EduCounter } from './EduMotion';

export function EduStoryEcosystem({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking across sticky runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring damping for responsive, smooth, medium-speed physical page turns (~0.8–1.0s)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.9,
    restDelta: 0.0008,
  });

  // Current active page index (1 to 5)
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Progressive 3D rotations for Leather Cover + 4 Inner Paper Leaves
  // Calibrated for a balanced medium-speed turn: visible lift -> bend -> turn -> settle
  // Stage 0: 0.02 - 0.16 -> Leather Cover Opens (0deg -> -180deg)
  // Stage 1: 0.22 - 0.38 -> Leaf 1 Turns (0deg -> -180deg) -> Reveals Page 2
  // Stage 2: 0.42 - 0.58 -> Leaf 2 Turns (0deg -> -180deg) -> Reveals Page 3
  // Stage 3: 0.62 - 0.78 -> Leaf 3 Turns (0deg -> -180deg) -> Reveals Page 4
  // Stage 4: 0.82 - 0.96 -> Leaf 4 Turns (0deg -> -180deg) -> Reveals Page 5

  const coverRotate = useTransform(smoothProgress, [0.02, 0.16], [0, -180]);
  const leaf1Rotate = useTransform(smoothProgress, [0.22, 0.38], [0, -180]);
  const leaf2Rotate = useTransform(smoothProgress, [0.42, 0.58], [0, -180]);
  const leaf3Rotate = useTransform(smoothProgress, [0.62, 0.78], [0, -180]);
  const leaf4Rotate = useTransform(smoothProgress, [0.82, 0.96], [0, -180]);

  // Subtle natural paper curl during mid-turn (skew and lighting shift)
  const leaf1Curl = useTransform(smoothProgress, [0.22, 0.30, 0.38], [0, 3.5, 0]);
  const leaf2Curl = useTransform(smoothProgress, [0.42, 0.50, 0.58], [0, 3.5, 0]);
  const leaf3Curl = useTransform(smoothProgress, [0.62, 0.70, 0.78], [0, 3.5, 0]);
  const leaf4Curl = useTransform(smoothProgress, [0.82, 0.89, 0.96], [0, 3.5, 0]);

  // Soft natural page shadows on underlying sheets during movement
  const coverShadow = useTransform(smoothProgress, [0.02, 0.09, 0.16], [0, 0.35, 0]);
  const leaf1Shadow = useTransform(smoothProgress, [0.22, 0.30, 0.38], [0, 0.3, 0]);
  const leaf2Shadow = useTransform(smoothProgress, [0.42, 0.50, 0.58], [0, 0.3, 0]);
  const leaf3Shadow = useTransform(smoothProgress, [0.62, 0.70, 0.78], [0, 0.3, 0]);
  const leaf4Shadow = useTransform(smoothProgress, [0.82, 0.89, 0.96], [0, 0.3, 0]);

  // Active page indicator listener
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v < 0.22) setCurrentPage(1);
      else if (v < 0.42) setCurrentPage(2);
      else if (v < 0.62) setCurrentPage(3);
      else if (v < 0.82) setCurrentPage(4);
      else setCurrentPage(5);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const content = {
    en: {
      coverTitle: 'SCHOOL EDUCATION',
      coverSub1: 'TAMIL NADU',
      coverSub2: 'STATE EDUCATION POLICY',
      coverYear: '2026–27',
      coverPrompt: 'Scroll down to open file and turn pages ↓',
      insideCover: {
        heading: 'INSIDE COVER · PREFACE',
        quote: '“An integrated public education policy delivering quality, equity, and state autonomy for Tamil Nadu.”',
        footer: 'DEPARTMENT OF SCHOOL EDUCATION · GOVERNMENT OF TAMIL NADU',
      },
      leftBed: {
        header: 'POLICY MEMORANDUM · DEPARTMENT OF SCHOOL EDUCATION',
        title: 'Education Policy Framework',
        subtitle: 'Government of Tamil Nadu · Legislative Briefing 2026–27',
        p1: 'This official policy document records the structural reforms enacted by the Department of School Education, establishing foundational literacy standards, protecting teacher instruction time, and deploying digital learning infrastructure across Tamil Nadu.',
        p2: 'Every statutory directive, budgetary outlay, and curriculum benchmark compiled herein reflects government decisions placed before the Tamil Nadu Legislative Assembly.',
        stamp: 'OFFICIAL RECORD · SECRETARIAT, CHENNAI',
        footer: 'TAMIL NADU LEGISLATIVE ARCHIVE · 2026',
      },
      p1: {
        section: 'POLICY REPORT · SECTION 01',
        pageNum: 'PAGE 1 OF 5',
        title: '01. Foundational Pedagogy & Language Policy',
        thesis:
          '“Systemic transition from rote memorisation to activity-based learning across Classes 1–3, under the historic 1968 two-language framework.”',
        items: [
          {
            code: '1.1',
            title: '9 Revised Primary Textbooks',
            desc: 'Activity-rich modules for Classes 1–3 replacing rote learning with phonetic comprehension, storytelling, and tactile motor tasks.',
          },
          {
            code: '1.2',
            title: 'Two-Language Policy Mandate',
            desc: 'Permanent state adherence to Tamil mother-tongue mastery paired with global English fluency, rejecting 3-language imposition.',
          },
          {
            code: '1.3',
            title: 'Foundational Literacy Benchmarks',
            desc: 'Universal early numeracy and literacy milestones established across all 38 revenue districts prior to secondary school entry.',
          },
        ],
        footnote: 'Cross-reference: Curriculum Workbench & Two-Language Directive',
      },
      p2: {
        section: 'POLICY REPORT · SECTION 02',
        pageNum: 'PAGE 2 OF 5',
        title: '02. Teacher Enablement & Student Welfare',
        thesis:
          '“Preserving teacher instruction hours from administrative paperwork, while guaranteeing student nutrition, safety, and campus peace.”',
        col1Title: 'INSTRUCTIONAL FORCE',
        col1Items: [
          'Specialised activity training for all primary teachers on the 9 revised books.',
          'Headmaster-led door-to-door dropout identification and re-enrolment surveys.',
          'Statutory bar on non-teaching administrative burdens during classroom hours.',
        ],
        col2Title: 'CHILD SANCTUARY & NUTRITION',
        col2Items: [
          'Nutritious mid-day meals with active weekly chicken biryani nutritional proposal.',
          'Strict prohibition of political, commercial, or disruptive events on school premises.',
          'Universal free distribution of uniforms, textbooks, and development kits.',
        ],
        footnote: 'Cross-reference: Teacher Welfare & Student Nutrition Registry',
      },
      p3: {
        section: 'POLICY REPORT · SECTION 03',
        pageNum: 'PAGE 3 OF 5',
        title: '03. Digital Labs & Campus Preparedness',
        thesis:
          '“Equipping government campuses with modern technology labs, interactive smart boards, and climate-resilient classroom facilities.”',
        stat1Val: 5000,
        stat1Label: 'PILOT SCHOOLS',
        stat1Sub: 'TN SPARK AI & Computational Logic Pilot Phase',
        stat2Val: 21,
        stat2Label: 'SMART BOARDS',
        stat2Sub: 'Inaugurated across Chennai Reopening Phase',
        stat3Val: 10,
        stat3Label: 'STUDENTS GUARANTEE',
        stat3Sub: 'Statutory mandate ensuring rural schools remain open',
        roadmap:
          '3-Phase AI Curriculum: Middle School (Logic & Block Coding) → High School (Python & ML Basics) → Higher Secondary (Applied Industry Electives).',
        footnote: 'Cross-reference: TN SPARK Laboratory & Campus Readiness Audits',
      },
      p4: {
        section: 'POLICY REPORT · SECTION 04',
        pageNum: 'PAGE 4 OF 5',
        title: '04. Infrastructure & Fiscal Allocation',
        thesis:
          '“Transparent capital outlay of ₹44,527 Crores benchmarked against audited actuals, paired with single-window digital governance.”',
        stat1Val: 44527,
        stat1Prefix: '₹',
        stat1Suffix: ' Cr',
        stat1Label: 'TOTAL EDUCATION BUDGET',
        stat1Sub: 'State Allocation · FY 2026–27',
        stat2Val: 2176,
        stat2Prefix: '+₹',
        stat2Suffix: ' Cr',
        stat2Label: 'REAL NET SPEND INCREASE',
        stat2Sub: 'Benchmarked against Prior Year Actuals (₹42,351 Cr)',
        workflow: [
          { step: '01', title: 'SUBMIT', sub: 'Digital Document Upload' },
          { step: '02', title: 'VERIFY', sub: 'Online Departmental Scrutiny' },
          { step: '03', title: 'TIMESTAMP', sub: 'Immutable SLA Audit Log' },
          { step: '04', title: 'TRACK', sub: 'Public Status Dashboard' },
          { step: '05', title: 'APPROVE', sub: 'Direct Online NOC Delivery' },
        ],
        footnote: 'Cross-reference: Fiscal Transparency Board & Fee Determination Caps',
      },
      p5: {
        section: 'POLICY REPORT · SECTION 05',
        pageNum: 'PAGE 5 OF 5',
        title: '05. Chronological Milestones & Sources',
        thesis:
          '“Official gazette of policy orders, textbook releases, and legislative assembly debates cross-referenced against public records.”',
        milestones: [
          { date: '19 May 2026', title: '9 Revised Primary Textbooks Formally Released' },
          { date: '04 June 2026', title: 'Heatwave-Adjusted Reopening & 21 Smart Boards Inaugurated' },
          { date: '01 July 2026', title: 'Single-Window Online Portal for Private School NOCs Live' },
          { date: '22 July 2026', title: 'TN SPARK AI Roadmap Introduced for 5,000 Schools' },
          { date: '02 August 2026', title: '10-Student Reopening Guarantee & Budget Allocation Placed' },
        ],
        cycle: ['ALLOCATE', 'SPEND', 'AUDIT', 'TRACK', 'ACCOUNTABILITY'],
        footnote: 'Source: Tamil Nadu Legislative Assembly Hansard & Official Gazettes',
      },
      p4B: {
        heading: 'SECTION 04 COMPLEMENT · FISCAL ACCOUNTABILITY',
        title: 'Statutory Audits & Line-Item Transparency',
        desc: 'All financial disbursements under the ₹44,527 Cr school education outlay are tied to specific school infrastructure deliverables, teacher salaries, and meal logistics.',
        footer: 'PAGE 04B · ARCHIVE REFERENCE',
      },
      p3B: {
        heading: 'SECTION 03 COMPLEMENT · LAB ROLLOUT',
        title: 'High-Tech Classrooms for Rural Mandals',
        desc: 'TN SPARK bridges the digital divide by introducing experiential AI and computational logic into rural middle and high schools across Tamil Nadu.',
        footer: 'PAGE 03B · ARCHIVE REFERENCE',
      },
      p2B: {
        heading: 'SECTION 02 COMPLEMENT · HUMAN RESOURCES',
        title: 'Dignity of the Teaching Force',
        desc: 'By eliminating non-teaching administrative burdens, teachers dedicate maximum classroom attention to foundational literacy and individual student mentoring.',
        footer: 'PAGE 02B · ARCHIVE REFERENCE',
      },
      p1B: {
        heading: 'SECTION 01 COMPLEMENT · PEDAGOGICAL METHOD',
        title: 'Activity-Based Early Childhood Foundations',
        desc: 'By introducing color-coded phonetic stories, picture puzzles, and hands-on activity modules, children develop natural language fluency without rote anxiety.',
        footer: 'PAGE 01B · ARCHIVE REFERENCE',
      },
    },
    ta: {
      coverTitle: 'பள்ளிக் கல்வி',
      coverSub1: 'தமிழ்நாடு',
      coverSub2: 'மாநில பள்ளிக் கல்வி கொள்கை',
      coverYear: '2026–27',
      coverPrompt: 'கோப்பைத் திறந்து பக்கங்களைத் திருப்ப கீழே ஸ்க்ரோல் செய்யவும் ↓',
      insideCover: {
        heading: 'உள்பக்கம் · முன்னுரை',
        quote: '“தமிழ்நாட்டிற்கான தரம், சமத்துவம் மற்றும் மாநில சுயாட்சியை வழங்கும் ஒருங்கிணைந்த பொதுக் கல்விக் கொள்கை.”',
        footer: 'பள்ளிக் கல்வித்துறை · தமிழ்நாடு அரசு',
      },
      leftBed: {
        header: 'கொள்கைக் குறிப்பு · பள்ளிக் கல்வித்துறை',
        title: 'பள்ளிக் கல்வி கொள்கை ஆவணம்',
        subtitle: 'தமிழ்நாடு அரசு · சட்டமன்றக் கொள்கை அறிக்கை 2026–27',
        p1: 'இக்கொள்கை ஆவணம் பள்ளிக் கல்வித்துறையின் முக்கிய சீர்திருத்தங்கள், தொடக்கக் கல்வி பாடத்திட்ட மாற்றங்கள், ஆசிரியர் கற்பித்தல் நேரம் மற்றும் டிஜிட்டல் தொழில்நுட்ப ஆய்வகங்களின் விவரங்களைத் தொகுத்து வழங்குகிறது.',
        p2: 'இங்கு குறிப்பிடப்பட்டுள்ள அனைத்து நிதி ஒதுக்கீடுகளும், பாடத்திட்ட விவரங்களும் தமிழ்நாடு சட்டமன்றப் பதிவேடு மற்றும் அரசு ஆணைகளின் அடிப்படையில் உறுதிசெய்யப்பட்டவை.',
        stamp: 'அதிகாரப்பூர்வ ஆவணம் · தலைமைச் செயலகம், சென்னை',
        footer: 'தமிழ்நாடு சட்டமன்ற ஆவணக் காப்பகம் · 2026',
      },
      p1: {
        section: 'கொள்கை அறிக்கை · பிரிவு 01',
        pageNum: 'பக்கம் 1 / 5',
        title: '01. பாடத்திட்டம் & இருமொழிக் கொள்கை',
        thesis:
          '“1-3 வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள் மூலம் மனப்பாடக் கல்வியை ஒழித்து, தாய்மொழி தமிழ் வழிக் கல்வியோடு உலகளாவிய ஆங்கிலத் திறனை வளர்த்தல்.”',
        items: [
          {
            code: '1.1',
            title: '9 புதிய செயல்வழிப் பாடநூல்கள்',
            desc: 'மனப்பாடத்திற்கு மாற்றாக விளையாட்டுக் கதைகள், படக்கதைகள் மற்றும் செயல்பாடுகள் வழியே கற்கும் புதிய பாடநூல்கள்.',
          },
          {
            code: '1.2',
            title: 'இருமொழிக் கொள்கை உறுதிப்பாடு',
            desc: 'தாய்மொழி தமிழ் வழிக் கல்வியும், உலகளாவிய ஆங்கிலத் திறனும் மட்டுமே தமிழ்நாட்டின் உறுதியான இருமொழிக் கொள்கை.',
          },
          {
            code: '1.3',
            title: 'அடிப்படை எழுத்தறிவு இலக்குகள்',
            desc: 'தொடக்கக் கல்வியிலேயே குழந்தைகளின் கற்றல் குறைபாடுகளைக் களையும் 38 மாவட்ட அளவிலான இலக்குகள்.',
          },
        ],
        footnote: 'சான்று: பாடத்திட்டப் பிரிவு & இருமொழிக் கொள்கை ஆணை',
      },
      p2: {
        section: 'கொள்கை அறிக்கை · பிரிவு 02',
        pageNum: 'பக்கம் 2 / 5',
        title: '02. ஆசிரியர் மேம்பாடு & மாணவர் பாதுகாப்பு',
        thesis:
          '“கல்வி என்பது ஆசிரியரின் கண்ணியத்திலும், குழந்தையின் உடல் நலம் மற்றும் அமைதியான பள்ளி வளாகத்திலும் முழுமை பெறுகிறது.”',
        col1Title: 'ஆசிரியர் திறன் & பணி நேரம்',
        col1Items: [
          '9 புதிய செயல்வழிப் பாடநூல்களைக் கற்பிக்க ஆசிரியர்களுக்கு சிறப்புப் பயிற்சிகள்.',
          'பள்ளி செல்லாக் குழந்தைகளைக் கண்டறிந்து சேர்க்க தலைமை ஆசிரியர்கள் தலைமையில் கள ஆய்வு.',
          'தேவையற்ற நிர்வாகப் பணிகளைக் குறைத்து, முழு கவனமும் கற்பித்தலில் இருக்கும் சூழல்.',
        ],
        col2Title: 'மாணவர் நலம் & சத்துணவு',
        col2Items: [
          'அரசுப் பள்ளி மதிய உணவில் வாரம் ஒரு முறை சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு.',
          'பள்ளி நேரங்களில் அரசியல் மற்றும் வணிக நிகழ்ச்சிகள் வளாகத்திற்குள் நடத்த முற்றாகத் தடை.',
          'இலவச சீருடைகள், பாடநூல்கள் மற்றும் கல்வி உபகரணங்கள் முழுமையான விநியோகம்.',
        ],
        footnote: 'சான்று: ஆசிரியர் நலன் & மாணவர் சத்துணவுப் பதிவேடு',
      },
      p3: {
        section: 'கொள்கை அறிக்கை · பிரிவு 03',
        pageNum: 'பக்கம் 3 / 5',
        title: '03. நவீன வகுப்பறைகள் & டிஜிட்டல் ஆய்வகங்கள்',
        thesis:
          '“அரசுப் பள்ளிகளில் அதிவேக இணைய வசதி, ஸ்மார்ட் போர்டுகள் மற்றும் பாதுகாப்பான வளாக உள்கட்டமைப்பு.”',
        stat1Val: 5000,
        stat1Label: 'முன்னோடிப் பள்ளிகள்',
        stat1Sub: 'டி.என் ஸ்பார்க் AI & கணக்கீட்டுத் தர்க்கத் திட்டம்',
        stat2Val: 21,
        stat2Label: 'ஸ்மார்ட் போர்டுகள்',
        stat2Sub: 'சென்னை பள்ளி மறுதிறப்பில் பயன்பாட்டிற்குத் திறப்பு',
        stat3Val: 10,
        stat3Label: 'மாணவர்கள் சேர்ந்தாலே இயங்கும்',
        stat3Sub: 'கிராமப்புறப் பள்ளிகள் மறுதிறப்பு உத்தரவு',
        roadmap:
          'நடுநிலைப் பள்ளி மாணவர்களுக்கு அடிப்படை தர்க்கம், உயர்நிலைப் பள்ளியில் பைதான் & ML, மேல்நிலைப் பள்ளியில் தொழில்துறை சிறப்புப் பயிற்சிகள்.',
        footnote: 'சான்று: டி.என் ஸ்பார்க் ஆய்வகம் & தயார்நிலை தணிக்கை',
      },
      p4: {
        section: 'கொள்கை அறிக்கை · பிரிவு 04',
        pageNum: 'பக்கம் 4 / 5',
        title: '04. நிதி ஒதுக்கீடு & நிர்வாகச் சீர்திருத்தம்',
        thesis:
          '“அரசின் கல்வி நிதி ஒதுக்கீடு உண்மையான செலவினங்களோடும், சட்டமன்ற ஆவணங்களோடும் ஒப்பிட்டு வெளிப்படையாக விளக்கம்.”',
        stat1Val: 44527,
        stat1Prefix: '₹',
        stat1Suffix: ' கோடி',
        stat1Label: 'மொத்த கல்வி நிதி ஒதுக்கீடு',
        stat1Sub: 'மாநில பட்ஜெட் · 2026–27',
        stat2Val: 2176,
        stat2Prefix: '+₹',
        stat2Suffix: ' கோடி',
        stat2Label: 'உண்மையான செலவின வளர்ச்சி',
        stat2Sub: 'முந்தைய செலவை விட கூடுதல் ஒதுக்கீடு',
        workflow: [
          { step: '01', title: 'விண்ணப்பம்', sub: '100% டிஜிட்டல் பதிவேற்றம்' },
          { step: '02', title: 'சரிபார்ப்பு', sub: 'நேரடி அரசு ஆய்வு' },
          { step: '03', title: 'நேரக் குறிப்பு', sub: 'கணினி வழிக் கண்காணிப்பு' },
          { step: '04', title: 'கண்காணிப்பு', sub: 'ஆன்லைன் நிலவரம்' },
          { step: '05', title: 'அனுமதி', sub: 'இடைத்தரகர்களற்ற NOC' },
        ],
        footnote: 'சான்று: நிதிநிலை அறிக்கை & கல்விக் கட்டண நிர்ணயக் குழு',
      },
      p5: {
        section: 'கொள்கை அறிக்கை · பிரிவு 05',
        pageNum: 'பக்கம் 5 / 5',
        title: '05. காலவரிசை & அதிகாரப்பூர்வ சான்றுகள்',
        thesis:
          '“இத்தளத்தில் குறிப்பிடப்பட்டுள்ள அனைத்து விவரங்களும் சட்டமன்றப் பதிவேடு மற்றும் அரசு செய்திக் குறிப்புகளின் அடிப்படையில் தொகுக்கப்பட்டவை.”',
        milestones: [
          { date: '19 மே 2026', title: '1-3 வகுப்புகளுக்கு 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு' },
          { date: '04 ஜூன் 2026', title: 'கோடை வெப்பத் தணிப்புக்குப் பின் பள்ளி திறப்பு & 21 ஸ்மார்ட் போர்டுகள்' },
          { date: '01 ஜூலை 2026', title: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC தளம் தொடக்கம்' },
          { date: '22 ஜூலை 2026', title: '5,000 பள்ளிகளில் AI கல்வி முன்னோடித் திட்டம்' },
          { date: '02 ஆகஸ்ட் 2026', title: '10 மாணவர்கள் சேர்ந்தாலே பள்ளி இயங்கும் உத்தரவு' },
        ],
        cycle: ['ஒதுக்கீடு', 'செலவினம்', 'தணிக்கை', 'கண்காணிப்பு', 'பொறுப்புடைமை'],
        footnote: 'சான்று: தமிழ்நாடு சட்டமன்றப் பதிவேடு & அரசு செய்திக் குறிப்புகள்',
      },
      p4B: {
        heading: 'பிரிவு 04 இணைப்பு · நிதிப் பொறுப்புடைமை',
        title: 'சட்டரீதியான தணிக்கைகள் & வெளிப்படைத்தன்மை',
        desc: 'ரூ.44,527 கோடி பள்ளிக் கல்வி ஒதுக்கீட்டின் கீழான அனைத்து நிதிப் பகிர்வுகளும், பள்ளிக் கட்டமைப்பு மேம்பாடு, ஆசிரியர் ஊதியம் மற்றும் மதிய உணவுத் திட்டங்களுக்கு நேரடியாகச் சென்றடைவது உறுதி செய்யப்படுகிறது.',
        footer: 'பக்கம் 04B · ஆவணக் காப்பகக் குறிப்பு',
      },
      p3B: {
        heading: 'பிரிவு 03 இணைப்பு · ஆய்வக விரிவாக்கம்',
        title: 'ஊரகப் பகுதிகளுக்கான அதிநவீன வகுப்பறைகள்',
        desc: 'தமிழ்நாடு முழுவதும் உள்ள கிராமப்புற நடுநிலை மற்றும் உயர்நிலைப் பள்ளிகளில் செயல்முறை வழியிலான AI மற்றும் கணினித் தர்க்கக் கல்வியை அறிமுகப்படுத்துவதன் மூலம் டி.என் ஸ்பார்க் திட்டம் டிஜிட்டல் இடைவெளியைக் குறைக்கிறது.',
        footer: 'பக்கம் 03B · ஆவணக் காப்பகக் குறிப்பு',
      },
      p2B: {
        heading: 'பிரிவு 02 இணைப்பு · மனித வளம்',
        title: 'ஆசிரியர் பணியின் கண்ணியம்',
        desc: 'ஆசிரியர்கள் கற்பித்தல் அல்லாத நிர்வாகப் பணிகளிலிருந்து விடுவிக்கப்படுவதால், அவர்கள் முழு கவனத்தையும் மாணவர்களின் அடிப்படை எழுத்தறிவு மற்றும் தனிப்பட்ட வழிகாட்டலில் செலுத்த முடிகிறது.',
        footer: 'பக்கம் 02B · ஆவணக் காப்பகக் குறிப்பு',
      },
      p1B: {
        heading: 'பிரிவு 01 இணைப்பு · கற்பித்தல் முறை',
        title: 'செயல்பாடு சார்ந்த குழந்தை பருவ அடித்தளங்கள்',
        desc: 'நிறங்கள் சார்ந்த கதைகள், படப் புதிர்கள் மற்றும் செயல்முறை சார்ந்த கற்றல் வழியே குழந்தைகள் எவ்வித மனப்பாட அழுத்தமும் இன்றி இயல்பான மொழித் திறனை வளர்த்துக்கொள்கின்றனர்.',
        footer: 'பக்கம் 01B · ஆவணக் காப்பகக் குறிப்பு',
      },
    },
  }[locale];

  return (
    <section
      ref={containerRef}
      id="policy-notebook"
      aria-label="Official Tamil Nadu School Education Policy Dossier"
      className="relative w-full h-[780vh] bg-[#D5C9B3] border-b border-[#BFB298] select-none"
    >
      {/* Sticky Fullscreen 3D Stage */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center p-3 sm:p-6 overflow-hidden z-30">
        {/* ==================================================================== */}
        {/* PHYSICAL LEATHER POLICY BINDER & PRINTED DOCUMENT SPREAD            */}
        {/* ==================================================================== */}
        <div className="w-full flex items-center justify-center [perspective:2400px]">
          {/* Main Leather Binder Chassis */}
          <div className="relative w-[96vw] max-w-[940px] h-[520px] sm:h-[550px] md:h-[570px] [transform-style:preserve-3d]">
            {/* Real Brown Leather Binder Base (Clean Cognac Leather with Subtle Edge Shadow) */}
            <div className="absolute inset-0 bg-[#3F2516] rounded-xs shadow-[0_28px_56px_rgba(0,0,0,0.4),0_6px_16px_rgba(0,0,0,0.2)] -z-30 transform translate-y-2 translate-x-1.5 border border-[#2B160B]">
              {/* Subtle perimeter leather crease */}
              <div className="absolute inset-2 border border-[#2B160B]/60 rounded-xs pointer-events-none" />
            </div>

            {/* Faux Paper Block Stack Lines (Realistic Bound Book Thickness) */}
            <div className="absolute -bottom-1 inset-x-3 h-2 bg-[#E6DEC9] border-b border-[#C8BEA7] -z-10 rounded-b-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]" />
            <div className="absolute -bottom-2 inset-x-5 h-2 bg-[#D8CFB9] border-b border-[#B8AE97] -z-20 rounded-b-xs" />

            {/* ================================================================ */}
            {/* LEFT SPREAD BED (Fixed Left Page: Official Policy Memorandum)    */}
            {/* ================================================================ */}
            <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] bg-[#FAF7EE] border-r border-[#D9D0BD] rounded-l-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_-14px_0_20px_rgba(0,0,0,0.05)]">
              {/* Spine shadow gradient */}
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/12 to-transparent pointer-events-none" />

              <div className="space-y-4">
                {/* Header line */}
                <div className="border-b border-[#DCD3C0] pb-2 text-xs font-mono uppercase tracking-wider text-charcoal-500">
                  {content.leftBed.header}
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-[2.1rem] font-normal text-charcoal-900 leading-tight">
                    {content.leftBed.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 font-serif italic">
                    {content.leftBed.subtitle}
                  </p>
                </div>

                <div className="pt-2 text-[13.5px] text-charcoal-800 leading-relaxed space-y-3">
                  <p>{content.leftBed.p1}</p>
                  <p>{content.leftBed.p2}</p>
                </div>

                <div className="inline-block border-l-2 border-charcoal-800 pl-2.5 text-xs font-mono text-charcoal-600 uppercase">
                  {content.leftBed.stamp}
                </div>
              </div>

              <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8] flex justify-between">
                <span>{content.leftBed.footer}</span>
                <span>VOL. I</span>
              </div>
            </div>

            {/* ================================================================ */}
            {/* RIGHT SPREAD BED (Permanent Right Bed: Page 5)                   */}
            {/* ================================================================ */}
            <div className="absolute right-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] bg-[#FAF7EE] rounded-r-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_14px_0_20px_rgba(0,0,0,0.05)]">
              {/* Spine shadow gradient */}
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/12 to-transparent pointer-events-none" />

              {/* Page 5 Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#DCD3C0] pb-2 text-charcoal-500">
                  <span className="font-bold tracking-wider">{content.p5.section}</span>
                  <span>{content.p5.pageNum}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-900 leading-tight">
                    {content.p5.title}
                  </h4>
                  <p className="text-sm text-charcoal-600 font-serif italic">
                    {content.p5.thesis}
                  </p>
                </div>

                {/* Milestones Document Table */}
                <div className="space-y-1.5 py-1 text-sm text-charcoal-800 border-t border-b border-[#E5DCB8] my-2">
                  {content.p5.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-baseline justify-between py-1 border-b border-[#EFE8D6] last:border-none">
                      <span className="font-mono text-xs font-bold text-charcoal-900 w-32 shrink-0">{m.date}</span>
                      <span className="text-[13px] text-charcoal-700 text-right leading-tight">{m.title}</span>
                    </div>
                  ))}
                </div>

                {/* Integrity Cycle Sequence */}
                <div className="text-xs font-mono text-charcoal-600 flex flex-wrap gap-1.5 items-center">
                  {content.p5.cycle.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1">
                      <span className="font-bold">{c}</span>
                      {i < content.p5.cycle.length - 1 && <span>→</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8]">
                {content.p5.footnote}
              </div>
            </div>

            {/* ================================================================ */}
            {/* 3D FLIPPING SHEET 4 (Page 4 Front / Reference Back)              */}
            {/* ================================================================ */}
            <motion.div
              style={{
                rotateY: leaf4Rotate,
                skewY: leaf4Curl,
                transformOrigin: 'left center',
              }}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] [transform-style:preserve-3d] z-10"
            >
              {/* Front Face: Page 04 (Infrastructure & Fiscal Allocation) */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-r-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_14px_0_20px_rgba(0,0,0,0.05)] [backface-visibility:hidden]">
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/12 to-transparent pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#DCD3C0] pb-2 text-charcoal-500">
                    <span className="font-bold tracking-wider">{content.p4.section}</span>
                    <span>{content.p4.pageNum}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-900 leading-tight">
                      {content.p4.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 font-serif italic">
                      {content.p4.thesis}
                    </p>
                  </div>

                  {/* Budget Allocation Summary */}
                  <div className="py-2 border-t border-b border-[#E5DCB8] space-y-1">
                    <div className="font-display text-4xl font-normal text-charcoal-900 tabular-nums">
                      <EduCounter
                        value={content.p4.stat1Val}
                        prefix={content.p4.stat1Prefix}
                        suffix={content.p4.stat1Suffix}
                        duration={1.5}
                      />
                    </div>
                    <div className="text-xs font-mono font-bold text-charcoal-700 uppercase">
                      {content.p4.stat1Label} · {content.p4.stat2Prefix}{content.p4.stat2Val}{content.p4.stat2Suffix} Net Increase
                    </div>
                    <p className="text-xs text-charcoal-600">{content.p4.stat1Sub}</p>
                  </div>

                  {/* Process Table */}
                  <div className="grid grid-cols-5 gap-1.5 text-center py-1">
                    {content.p4.workflow.map((wf, idx) => (
                      <div key={idx} className="p-1.5 border border-[#E5DCB8] bg-[#F4EDE0]/50">
                        <div className="text-[10px] font-mono font-bold text-charcoal-800">{wf.step}</div>
                        <div className="text-[9.5px] font-bold text-charcoal-700 mt-0.5">{wf.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8]">
                  {content.p4.footnote}
                </div>

                <motion.div style={{ opacity: leaf4Shadow }} className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-l-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_-14px_0_20px_rgba(0,0,0,0.05)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-charcoal-500 uppercase tracking-wider border-b border-[#DCD3C0] pb-2">
                    {content.p4B.heading}
                  </div>
                  <h4 className="font-display text-xl font-normal text-charcoal-900">
                    {content.p4B.title}
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {content.p4B.desc}
                  </p>
                </div>
                <div className="text-xs font-mono text-charcoal-400 border-t border-[#E5DCB8] pt-2">
                  {content.p4B.footer}
                </div>
              </div>
            </motion.div>

            {/* ================================================================ */}
            {/* 3D FLIPPING SHEET 3 (Page 3 Front / Reference Back)              */}
            {/* ================================================================ */}
            <motion.div
              style={{
                rotateY: leaf3Rotate,
                skewY: leaf3Curl,
                transformOrigin: 'left center',
              }}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] [transform-style:preserve-3d] z-20"
            >
              {/* Front Face: Page 03 (Digital Labs & Campus Preparedness) */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-r-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_14px_0_20px_rgba(0,0,0,0.05)] [backface-visibility:hidden]">
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/12 to-transparent pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#DCD3C0] pb-2 text-charcoal-500">
                    <span className="font-bold tracking-wider">{content.p3.section}</span>
                    <span>{content.p3.pageNum}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-900 leading-tight">
                      {content.p3.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 font-serif italic">
                      {content.p3.thesis}
                    </p>
                  </div>

                  {/* 3 Key Numerical Data Points */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-[#E5DCB8]">
                    <div className="text-center">
                      <div className="font-display text-3xl font-normal text-charcoal-900">
                        <EduCounter value={content.p3.stat1Val} prefix="~" suffix="+" duration={1.4} />
                      </div>
                      <div className="text-[10px] font-mono font-bold text-charcoal-700 uppercase">
                        {content.p3.stat1Label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-3xl font-normal text-charcoal-900">
                        <EduCounter value={content.p3.stat2Val} duration={1.4} />
                      </div>
                      <div className="text-[10px] font-mono font-bold text-charcoal-700 uppercase">
                        {content.p3.stat2Label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-3xl font-normal text-charcoal-900">
                        <EduCounter value={content.p3.stat3Val} prefix="≥" suffix="+" duration={1.4} />
                      </div>
                      <div className="text-[10px] font-mono font-bold text-charcoal-700 uppercase">
                        {content.p3.stat3Label}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {content.p3.roadmap}
                  </p>
                </div>

                <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8]">
                  {content.p3.footnote}
                </div>

                <motion.div style={{ opacity: leaf3Shadow }} className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-l-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_-14px_0_20px_rgba(0,0,0,0.05)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-charcoal-500 uppercase tracking-wider border-b border-[#DCD3C0] pb-2">
                    {content.p3B.heading}
                  </div>
                  <h4 className="font-display text-xl font-normal text-charcoal-900">
                    {content.p3B.title}
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {content.p3B.desc}
                  </p>
                </div>
                <div className="text-xs font-mono text-charcoal-400 border-t border-[#E5DCB8] pt-2">
                  {content.p3B.footer}
                </div>
              </div>
            </motion.div>

            {/* ================================================================ */}
            {/* 3D FLIPPING SHEET 2 (Page 2 Front / Reference Back)              */}
            {/* ================================================================ */}
            <motion.div
              style={{
                rotateY: leaf2Rotate,
                skewY: leaf2Curl,
                transformOrigin: 'left center',
              }}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] [transform-style:preserve-3d] z-30"
            >
              {/* Front Face: Page 02 (Teacher Enablement & Student Welfare) */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-r-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_14px_0_20px_rgba(0,0,0,0.05)] [backface-visibility:hidden]">
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/12 to-transparent pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#DCD3C0] pb-2 text-charcoal-500">
                    <span className="font-bold tracking-wider">{content.p2.section}</span>
                    <span>{content.p2.pageNum}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-900 leading-tight">
                      {content.p2.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 font-serif italic">
                      {content.p2.thesis}
                    </p>
                  </div>

                  {/* Two Column Document Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#E5DCB8]">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-charcoal-800 uppercase">
                        {content.p2.col1Title}
                      </div>
                      <ul className="text-xs text-charcoal-700 space-y-1">
                        {content.p2.col1Items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="font-bold">›</span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-charcoal-800 uppercase">
                        {content.p2.col2Title}
                      </div>
                      <ul className="text-xs text-charcoal-700 space-y-1">
                        {content.p2.col2Items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="font-bold">›</span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8]">
                  {content.p2.footnote}
                </div>

                <motion.div style={{ opacity: leaf2Shadow }} className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-l-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_-14px_0_20px_rgba(0,0,0,0.05)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-charcoal-500 uppercase tracking-wider border-b border-[#DCD3C0] pb-2">
                    {content.p2B.heading}
                  </div>
                  <h4 className="font-display text-xl font-normal text-charcoal-900">
                    {content.p2B.title}
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {content.p2B.desc}
                  </p>
                </div>
                <div className="text-xs font-mono text-charcoal-400 border-t border-[#E5DCB8] pt-2">
                  {content.p2B.footer}
                </div>
              </div>
            </motion.div>

            {/* ================================================================ */}
            {/* 3D FLIPPING SHEET 1 (Page 1 Front / Reference Back)              */}
            {/* ================================================================ */}
            <motion.div
              style={{
                rotateY: leaf1Rotate,
                skewY: leaf1Curl,
                transformOrigin: 'left center',
              }}
              className="absolute right-1.5 top-1.5 bottom-1.5 w-[calc(50%-3px)] [transform-style:preserve-3d] z-40"
            >
              {/* Front Face: Page 01 (Foundational Pedagogy & Language Policy) */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-r-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_14px_0_20px_rgba(0,0,0,0.05)] [backface-visibility:hidden]">
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/12 to-transparent pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#DCD3C0] pb-2 text-charcoal-500">
                    <span className="font-bold tracking-wider">{content.p1.section}</span>
                    <span>{content.p1.pageNum}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-900 leading-tight">
                      {content.p1.title}
                    </h4>
                    <p className="text-sm text-charcoal-600 font-serif italic">
                      {content.p1.thesis}
                    </p>
                  </div>

                  {/* Clean Numbered Directives */}
                  <div className="space-y-2 text-sm text-charcoal-800 pt-1 border-t border-[#E5DCB8]">
                    {content.p1.items.map((pt, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="font-mono text-xs font-bold text-charcoal-900 uppercase">
                          {pt.code} {pt.title}
                        </div>
                        <p className="text-[13px] text-charcoal-700 leading-relaxed">{pt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-mono text-charcoal-400 pt-2 border-t border-[#E5DCB8]">
                  {content.p1.footnote}
                </div>

                <motion.div style={{ opacity: leaf1Shadow }} className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 bg-[#FAF7EE] rounded-l-xs p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[inset_-14px_0_20px_rgba(0,0,0,0.05)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-charcoal-500 uppercase tracking-wider border-b border-[#DCD3C0] pb-2">
                    {content.p1B.heading}
                  </div>
                  <h4 className="font-display text-xl font-normal text-charcoal-900">
                    {content.p1B.title}
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {content.p1B.desc}
                  </p>
                </div>
                <div className="text-xs font-mono text-charcoal-400 border-t border-[#E5DCB8] pt-2">
                  {content.p1B.footer}
                </div>
              </div>
            </motion.div>

            {/* ================================================================ */}
            {/* 3D BROWN LEATHER COVER (Authentic Government Document Folder)    */}
            {/* ================================================================ */}
            <motion.div
              style={{
                rotateY: coverRotate,
                transformOrigin: 'left center',
              }}
              className="absolute right-0 top-0 bottom-0 w-1/2 [transform-style:preserve-3d] z-50 cursor-pointer shadow-2xl"
            >
              {/* Front of Brown Leather Folder (Clean, Authoritative Government Dossier) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#452817] via-[#381F12] to-[#2A160B] rounded-r-xs p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-2 border-[#200F07] shadow-[0_24px_48px_rgba(0,0,0,0.45)] [backface-visibility:hidden]">
                {/* Subtle perimeter leather crease */}
                <div className="absolute inset-3 border border-[#200F07]/60 rounded-2xs pointer-events-none" />

                {/* Top Spacer */}
                <div className="h-4" />

                {/* Centered Official Tamil Nadu Government Emblem & Typography */}
                <div className="space-y-5 text-center flex flex-col items-center my-auto">
                  {/* Official Government of Tamil Nadu Emblem Asset (Debossed in Leather) */}
                  <div className="relative w-22 h-22 sm:w-26 sm:h-26 opacity-85 filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.06)] brightness-[0.9]">
                    <Image
                      src="/images/tn-seal.svg"
                      alt="Official Emblem of Tamil Nadu"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Clean Authoritative Title */}
                  <div className="space-y-3">
                    <h3 className="font-display text-4xl sm:text-[2.75rem] font-light tracking-wide text-[#EADFCB] leading-tight">
                      {content.coverTitle}
                    </h3>

                    <div className="space-y-0.5 text-sm sm:text-base uppercase tracking-widest text-[#C8BEA7]">
                      <div>{content.coverSub1}</div>
                      <div>{content.coverSub2}</div>
                      <div className="text-xs font-mono text-[#A89E87] pt-1">{content.coverYear}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Simple Scroll Cue */}
                <div className="text-center text-xs font-mono text-[#A89E87] tracking-wider pt-4 border-t border-[#2A160B]">
                  {content.coverPrompt}
                </div>

                <motion.div style={{ opacity: coverShadow }} className="absolute inset-0 bg-black/40 pointer-events-none" />
              </div>

              {/* Inside of Leather Cover (Turned Page Facing Left) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#381F12] to-[#25130A] text-[#EADFCB] rounded-l-xs p-8 flex flex-col justify-between overflow-hidden border-r border-[#200F07] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#A89E87] uppercase tracking-widest border-b border-[#4A2E1B] pb-2">
                    {content.insideCover.heading}
                  </div>
                  <p className="font-serif italic text-base text-[#FAF7EE] leading-relaxed">
                    {content.insideCover.quote}
                  </p>
                </div>
                <div className="text-xs font-mono text-[#8C7D6B] uppercase tracking-wider">
                  {content.insideCover.footer}
                </div>
              </div>
            </motion.div>

            {/* Central Leather Spine Joint */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-r from-black/35 via-[#1A0D07] to-black/35 shadow-inner z-50 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
