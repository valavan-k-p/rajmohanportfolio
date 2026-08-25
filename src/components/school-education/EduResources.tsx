'use client';

import type { Locale } from '@/lib/i18n/routing';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
} from './EduMotion';

export function EduResources({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Verified Public Sources, Gazettes & Hansard',
      standfirst:
        'Official citations, news coverage, and government records referenced in this briefing, indexed for public scrutiny and academic reference.',
      groups: [
        {
          category: 'Curriculum Reform & Foundational Pedagogy',
          items: [
            {
              title: '9 Revised Primary Activity Textbooks Released',
              source: 'The Hindu & Dinamalar (May 19, 2026)',
              href: 'https://www.thehindu.com/news/national/tamil-nadu/',
              desc: 'Official launch report of activity-based textbooks for Classes 1–3 and pedagogy training.',
            },
            {
              title: 'Tamil Nadu Two-Language Policy Reaffirmation',
              source: 'Tamil Nadu Legislative Assembly Hansard (July 2026)',
              href: 'https://www.assembly.tn.gov.in/',
              desc: 'Official debate transcript affirming the 1968 two-language formula and rejecting NEP 3-language imposition.',
            },
            {
              title: 'Drop-out Tracking Mandate for Headmasters',
              source: 'The New Indian Express (August 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/',
              desc: 'Departmental orders for door-to-door child identification and re-enrolment.',
            },
          ],
        },
        {
          category: 'Governance, Private School Regulation & Approvals',
          items: [
            {
              title: 'Online Portal for Private School NOCs & Recognitions',
              source: 'The New Indian Express (July 01, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/01/online-portal-for-private-school-nocs-launched',
              desc: 'Launch announcement of the automated timestamped NOC approval system to prevent delays.',
            },
            {
              title: 'Private School Fee Committee Enforcement Directive',
              source: 'Department of School Education Circular (June 2026)',
              href: 'https://www.tnschools.gov.in/',
              desc: 'Statutory warnings to managements against fee collections exceeding prescribed limits.',
            },
            {
              title: 'Campus Neutrality & Visitor Restrictions Notice',
              source: 'The New Indian Express (July 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/',
              desc: 'Administrative orders barring unauthorized outside political/commercial events on campuses.',
            },
          ],
        },
        {
          category: 'Infrastructure, Technology & Student Welfare',
          items: [
            {
              title: 'Inauguration of 21 Smart Boards in Chennai Schools',
              source: 'The News Mill & Careers360 (June 2026)',
              href: 'https://thenewsmill.com/2026/06/tamil-nadu-education-minister-inaugurates-smart-boards-as-schools-reopen-after-summer-break/',
              desc: 'Coverage of the first phase smart board rollout during post-summer school reopening.',
            },
            {
              title: 'TN SPARK AI & Technology Roadmap for 5,000 Schools',
              source: 'The New Indian Express (July 22, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/22/tamil-nadu-charts-ai-roadmap-for-government-school-students',
              desc: 'Detailed policy outline for computational thinking and AI labs across secondary schools.',
            },
            {
              title: '10-Student Reopening Guarantee & ₹44,527 Cr Budget Defence',
              source: 'Dinamalar Kalvimalar (August 2026)',
              href: 'https://www.dinamalar.com/news/kalvimalar-news-en/39ten-students-are-enough39-tn-assures-reopening-of-schools-closed-for-low-enrolment/61081',
              desc: 'Ministerial address guaranteeing rural school continuity and budget breakdown.',
            },
          ],
        },
      ],
      notice:
        'Archival Note: Proposals such as weekly chicken biryani remain under active state consideration and are marked accordingly.',
    },
    ta: {
      headline: 'சரிபார்க்கப்பட்ட பொது ஆவணங்கள் & செய்தி ஆதாரங்கள்',
      standfirst:
        'இத்தளத்தில் குறிப்பிடப்பட்டுள்ள கொள்கை முடிவுகள் மற்றும் திட்டங்களுக்கான அதிகாரப்பூர்வ ஆவணங்கள், செய்திக் குறிப்புகள் மற்றும் சட்டமன்றப் பதிவுகள்.',
      groups: [
        {
          category: 'பாடத்திட்ட சீர்திருத்தம் & தொடக்கக் கல்வி',
          items: [
            {
              title: '1-3 வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு',
              source: 'தி இந்து & தினமலர் (மே 19, 2026)',
              href: 'https://www.thehindu.com/news/national/tamil-nadu/',
              desc: 'மனப்பாடக் கல்விக்கு மாற்றான புதிய செயல்வழிப் பாடநூல்கள் வெளியீட்டுச் செய்தி.',
            },
            {
              title: 'தமிழ்நாட்டின் இருமொழிக் கொள்கை சட்டமன்ற உறுதிப்பாடு',
              source: 'தமிழ்நாடு சட்டமன்றப் பதிவேடு (ஜூலை 2026)',
              href: 'https://www.assembly.tn.gov.in/',
              desc: '1968 இருமொழிக் கொள்கையை உறுதி செய்து, மும்மொழித் திணிப்பை நிராகரித்த சட்டமன்ற விவாதம்.',
            },
            {
              title: 'பள்ளி செல்லாக் குழந்தைகளைக் கண்டறியும் கள ஆய்வு உத்தரவு',
              source: 'நியூ இந்தியன் எக்ஸ்பிரஸ் (ஆகஸ்ட் 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/',
              desc: 'இடைநின்ற குழந்தைகளை மீண்டும் பள்ளியில் சேர்க்க தலைமை ஆசிரியர்களுக்கான உத்தரவு.',
            },
          ],
        },
        {
          category: 'நிர்வாகம், தனியார் பள்ளி ஒழுங்குமுறை & அனுமதிகள்',
          items: [
            {
              title: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC அனுமதி தளம் தொடக்கம்',
              source: 'நியூ இந்தியன் எக்ஸ்பிரஸ் (ஜூலை 01, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/01/online-portal-for-private-school-nocs-launched',
              desc: 'இடைத்தரகர்களைத் தடுத்து வெளிப்படையான முறையில் NOC வழங்க புதிய இணையவழி முறை தொடக்கம்.',
            },
            {
              title: 'தனியார் பள்ளிக் கட்டணக் குழு வரம்புகள் அமலாக்கம்',
              source: 'பள்ளிக் கல்வித்துறை சுற்றறிக்கை (ஜூன் 2026)',
              href: 'https://www.tnschools.gov.in/',
              desc: 'அரசு நிர்ணயித்த கட்டணத்தை விட கூடுதல் கட்டணம் வசூலிப்பதைத் தடுக்கும் சுற்றறிக்கை.',
            },
            {
              title: 'பள்ளி வளாக அமைதி & வெளி நபர்கள் தடை உத்தரவு',
              source: 'நியூ இந்தியன் எக்ஸ்பிரஸ் (ஜூலை 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/',
              desc: 'பள்ளி நேரங்களில் அரசியல் மற்றும் வணிக நிகழ்ச்சிகளைத் தடை செய்யும் உத்தரவு.',
            },
          ],
        },
        {
          category: 'உள்கட்டமைப்பு, தொழில்நுட்பம் & மாணவர் நலம்',
          items: [
            {
              title: 'ஸ்மார்ட் போர்டுகள் திறப்பு & பள்ளித் தயார்நிலை ஆய்வு',
              source: 'தி நியூஸ் மில் & கேரியர்ஸ்360 (ஜூன் 2026)',
              href: 'https://thenewsmill.com/2026/06/tamil-nadu-education-minister-inaugurates-smart-boards-as-schools-reopen-after-summer-break/',
              desc: 'சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டுக்குக் கொண்டுவரப்பட்ட செய்தி.',
            },
            {
              title: 'டி.என் ஸ்பார்க் AI & தொழில்நுட்பக் கல்வி வரைபடம்',
              source: 'நியூ இந்தியன் எக்ஸ்பிரஸ் (ஜூலை 22, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/22/tamil-nadu-charts-ai-roadmap-for-government-school-students',
              desc: '5,000 பள்ளிகளில் முன்னோடித் திட்டம் மற்றும் அடுத்த கட்ட விரிவாக்கத் திட்டங்கள்.',
            },
            {
              title: '10 மாணவர்கள் சேர்ந்தால் பள்ளிகள் திறப்பு & ₹44,527 கோடி நிதி விளக்கம்',
              source: 'தினமலர் கல்விமலர் (ஆகஸ்ட் 2026)',
              href: 'https://www.dinamalar.com/news/kalvimalar-news-en/39ten-students-are-enough39-tn-assures-reopening-of-schools-closed-for-low-enrolment/61081',
              desc: 'கிராமப்புறப் பள்ளி மறுதிறப்பு, இடைநிற்றல் கணக்கெடுப்பு மற்றும் பட்ஜெட் விளக்க விவரங்கள்.',
            },
          ],
        },
      ],
      notice:
        'ஆவணக் குறிப்பு: வாரம் ஒரு முறை சிக்கன் பிரியாணி போன்ற திட்டங்கள் பரிசீலனையில் உள்ள முன்மொழிவுகள் மட்டுமே.',
    },
  }[locale];

  return (
    <div className="space-y-10 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[50rem]">
        <h3 className="font-display text-3xl sm:text-4xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-lg leading-relaxed mt-2.5">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Grouped Link List with Progressive Drawing Lines */}
      <div className="space-y-10">
        {content.groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-maroon-700">
              {group.category}
            </h4>
            <EduHorizontalLine color="bg-sand-300" duration={0.6} />

            <EduStaggerContainer className="space-y-1" stagger={0.06}>
              {group.items.map((item, idx) => (
                <EduStaggerItem
                  key={idx}
                  direction={idx % 2 === 0 ? 'left' : 'right'}
                  showTopLine={true}
                  topLineColor="bg-sand-200"
                  className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-3 group"
                >
                  <div className="space-y-1 max-w-[48rem]">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-xl sm:text-2xl text-charcoal-900 group-hover:text-maroon-700 transition-colors no-underline block font-semibold"
                    >
                      {item.title} <span className="text-sm font-mono text-charcoal-400 group-hover:text-maroon-700">↗</span>
                    </a>
                    <p className="text-sm text-charcoal-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-sm font-mono text-charcoal-500 md:text-right whitespace-nowrap">
                    {item.source}
                  </div>
                </EduStaggerItem>
              ))}
            </EduStaggerContainer>
          </div>
        ))}
      </div>

      <div className="text-sm text-charcoal-500 font-mono pt-4 border-t border-sand-200">
        {content.notice}
      </div>
    </div>
  );
}
