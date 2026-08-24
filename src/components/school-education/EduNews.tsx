'use client';

import type { Locale } from '@/lib/i18n/routing';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
} from './EduMotion';

export function EduNews({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'News & Gazette Dispatches (2026)',
      standfirst:
        'Official government communications, press conferences, and verified editorial coverage detailing policy decisions by Minister Rajmohan Arumugam.',
      articles: [
        {
          date: '10 August 2026',
          category: 'NUTRITION & WELFARE',
          title: 'TN Considers Weekly Chicken Biryani in Noon Meal Scheme to Boost Nutrition and Enrolment',
          source: 'The New Indian Express',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Aug/10/tn-considers-weekly-chicken-biryani-in-noon-meal-scheme-to-boost-nutrition-and-enrolment',
          summary:
            'A flagship proposal under active review to incorporate biryani once weekly across state-run mid-day meal centres, supporting physical development among primary students.',
          lead: true,
        },
        {
          date: '02 August 2026',
          category: 'INFRASTRUCTURE & EQUITY',
          title: '‘Ten Students are Enough’: TN Assures Reopening of Schools Closed for Low Enrolment',
          source: 'Dinamalar Kalvimalar',
          href: 'https://www.dinamalar.com/news/kalvimalar-news-en/39ten-students-are-enough39-tn-assures-reopening-of-schools-closed-for-low-enrolment/61081',
          summary:
            'Minister Rajmohan guaranteed the reopening of rural government schools with minimum enrolments, protecting educational access in remote hamlets.',
          lead: false,
        },
        {
          date: '22 July 2026',
          category: 'AI & TECH LABS',
          title: 'Tamil Nadu Charts AI Roadmap for Government School Students across 5,000 Campuses',
          source: 'The New Indian Express',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/22/tamil-nadu-charts-ai-roadmap-for-government-school-students',
          summary:
            'Rollout of the state AI curriculum (TN SPARK) across ~5,000 schools, equipping students with computational logic, coding, and ethical AI awareness.',
          lead: false,
        },
        {
          date: '01 July 2026',
          category: 'GOVERNANCE & REFORMS',
          title: 'Online Portal Launched for Private School NOCs and Recognition Renewals to Eliminate Middlemen',
          source: 'The New Indian Express',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/01/online-portal-for-private-school-nocs-launched',
          summary:
            'Complete digitisation of the NOC application workflow for private educational institutions, establishing statutory transparency and anti-corruption oversight.',
          lead: false,
        },
        {
          date: '04 June 2026',
          category: 'CAMPUS READINESS',
          title: 'Tamil Nadu Education Minister Inaugurates 21 Smart Boards in Chennai as Schools Reopen',
          source: 'The News Mill & Careers360',
          href: 'https://thenewsmill.com/2026/06/tamil-nadu-education-minister-inaugurates-smart-boards-as-schools-reopen-after-summer-break/',
          summary:
            'Inauguration of interactive smart boards across Chennai campuses following district-wide heatwave and facility preparedness inspections.',
          lead: false,
        },
        {
          date: '19 May 2026',
          category: 'CURRICULUM REVISION',
          title: 'Nine Activity-Based Textbooks Released for Classes 1–3, Ending Rote Learning',
          source: 'The Hindu & Dinamalar',
          href: 'https://www.thehindu.com/news/national/tamil-nadu/',
          summary:
            'Official launch of 9 comprehensively revised activity textbooks designed to develop fine motor skills and creative comprehension without rote memorisation.',
          lead: false,
        },
      ],
    },
    ta: {
      headline: 'செய்திகள் & அதிகாரப்பூர்வ அறிவிப்புகள் (2026)',
      standfirst:
        'அமைச்சர் ராஜ்மோகன் ஆறுமுகம் தலைமையில் மேற்கொள்ளப்பட்ட முக்கியக் கொள்கை முடிவுகள், பத்திரிகையாளர் சந்திப்புகள் மற்றும் செய்தித்தொகுப்புகள்.',
      articles: [
        {
          date: '10 ஆகஸ்ட் 2026',
          category: 'ஊட்டச்சத்து & நலத்திட்டம்',
          title: 'அரசுப் பள்ளி மதிய உணவுத் திட்டத்தில் வாரம் ஒரு முறை சிக்கன் பிரியாணி: அரசின் தீவிரப் பரிசீலனை',
          source: 'தி நியூ இந்தியன் எக்ஸ்பிரஸ்',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Aug/10/tn-considers-weekly-chicken-biryani-in-noon-meal-scheme-to-boost-nutrition-and-enrolment',
          summary:
            'மாணவர்களின் ஊட்டச்சத்து மற்றும் பள்ளி வருகையை அதிகரிக்க மதிய உணவில் வாரம் ஒரு முறை பிரியாணி வழங்கும் திட்டம் அரசின் பரிசீலனையில் உள்ளது.',
          lead: true,
        },
        {
          date: '02 ஆகஸ்ட் 2026',
          category: 'பள்ளி உள்கட்டமைப்பு',
          title: '‘10 மாணவர்கள் சேர்ந்தாலே பள்ளி இயங்கும்’: மூடப்பட்ட பள்ளிகளைத் திறக்க அமைச்சர் உறுதி',
          source: 'தினமலர் கல்விமலர்',
          href: 'https://www.dinamalar.com/news/kalvimalar-news-en/39ten-students-are-enough39-tn-assures-reopening-of-schools-closed-for-low-enrolment/61081',
          summary:
            'கிராமப்புற மாணவர்களின் கல்வி தடைபடாமல் இருக்க 10 மாணவர்கள் சேர்ந்தாலே அரசுப் பள்ளிகள் தொடர்ந்து செயல்படும் என சட்டமன்றத்தில் உறுதி.',
          lead: false,
        },
        {
          date: '22 ஜூலை 2026',
          category: 'AI & டிஜிட்டல் ஆய்வகங்கள்',
          title: '5,000 அரசுப் பள்ளிகளில் செயற்கை நுண்ணறிவு (AI) திட்ட வரைபடம் அறிவிப்பு',
          source: 'தி நியூ இந்தியன் எக்ஸ்பிரஸ்',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/22/tamil-nadu-charts-ai-roadmap-for-government-school-students',
          summary:
            '5,000 அரசுப் பள்ளி மாணவர்களுக்கு AI தொழில்நுட்பம், கோடிங் மற்றும் டிஜிட்டல் நெறிமுறைகளைக் கற்றுத்தரும் புதிய முன்னோடித் திட்டம் தொடக்கம்.',
          lead: false,
        },
        {
          date: '01 ஜூலை 2026',
          category: 'நிர்வாகச் சீர்திருத்தம்',
          title: 'தனியார் பள்ளிகளுக்கான தடையில்லா சான்றிதழ் (NOC) பெற புதிய இணையவழித் தளம் தொடக்கம்',
          source: 'தி நியூ இந்தியன் எக்ஸ்பிரஸ்',
          href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/01/online-portal-for-private-school-nocs-launched',
          summary:
            'இடைத்தரகர்களை ஒழித்து, தனியார் பள்ளி அங்கீகாரங்களை வெளிப்படையான முறையில் வழங்க புதிய இணையவழி முறை அமல்படுத்தப்பட்டுள்ளது.',
          lead: false,
        },
        {
          date: '04 ஜூன் 2026',
          category: 'பள்ளித் தயார்நிலை',
          title: 'பள்ளிகள் திறப்பு: சென்னையில் 21 புதிய ஸ்மார்ட் போர்டுகளை அமைச்சர் திறந்து வைத்தார்',
          source: 'தி நியூஸ் மில் & கேரியர்ஸ்360',
          href: 'https://thenewsmill.com/2026/06/tamil-nadu-education-minister-inaugurates-smart-boards-as-schools-reopen-after-summer-break/',
          summary:
            'கோடை விடுமுறைக்குப் பின் பள்ளிகள் திறக்கப்பட்ட நாளில் சென்னை அரசுப் பள்ளிகளில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டுக்குக் கொண்டுவரப்பட்டன.',
          lead: false,
        },
        {
          date: '19 மே 2026',
          category: 'புதிய பாடத்திட்டம்',
          title: '1-3 வகுப்புகளுக்கு மனப்பாடக் கல்வியை ஒழிக்கும் 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு',
          source: 'தி இந்து & தினமலர்',
          href: 'https://www.thehindu.com/news/national/tamil-nadu/',
          summary:
            'தொடக்கப் பள்ளி மாணவர்களுக்கு மனப்பாட முறையை விடுத்து, விளையாட்டு வழியே கற்கும் 9 புதிய வண்ணப் பாடநூல்கள் வெளியிடப்பட்டன.',
          lead: false,
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[50rem]">
        <h3 className="font-display text-3xl sm:text-4xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-lg leading-relaxed mt-2.5">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Newspaper Editorial Grid with Lead Article First & Staggered Articles */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-2" stagger={0.07}>
        {content.articles.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            direction={item.lead ? 'up' : idx % 2 === 0 ? 'left' : 'right'}
            showTopLine={true}
            topLineColor="bg-maroon-700/60"
            className={`pt-5 flex flex-col justify-between space-y-4 ${
              item.lead ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="font-semibold text-maroon-700 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-charcoal-500">{item.date}</span>
              </div>
              <h4
                className={`font-display text-charcoal-900 leading-snug font-semibold ${
                  item.lead ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
                }`}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-maroon-700 transition-colors no-underline group"
                >
                  {item.title}{' '}
                  <span className="text-sm font-mono text-charcoal-400 group-hover:text-maroon-700">↗</span>
                </a>
              </h4>
              <p className="text-charcoal-700 text-base leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="text-sm text-charcoal-500 font-mono pt-3 border-t border-sand-200 flex items-center justify-between">
              <span>{item.source}</span>
              <span className="text-maroon-700 font-bold">● Official Dispatch</span>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      <EduHorizontalLine color="bg-sand-200" duration={0.65} />
    </div>
  );
}
