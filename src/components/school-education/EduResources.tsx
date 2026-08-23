'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduResources({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Public Documentation & Verified Source Index',
      standfirst:
        'Every claim, metric, and policy development on this portal is drawn from public records, legislative statements, and verified news reporting.',
      groups: [
        {
          category: 'Government Profiles & Official Orders',
          items: [
            {
              title: 'Tamil Nadu Government Department Profile & Portfolio Notification',
              source: 'tn.gov.in / Department of School Education',
              href: 'https://www.tn.gov.in/dept_profile.php?dep_id',
              desc: 'Official portfolio notification assigning School Education among Cabinet responsibilities.',
            },
            {
              title: 'Online NOC and Private School Recognition Portal Directive',
              source: 'New Indian Express (June 17, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/17/no-more-bribes-private-schools-can-apply-online-for-noc-from-july-1-minister-rajmohan',
              desc: 'Administrative orders transitioning private school approvals to an online portal from July 1.',
            },
          ],
        },
        {
          category: 'Curriculum, Textbooks & Language Policy',
          items: [
            {
              title: 'Release of 9 Activity-Rich Textbooks for Classes 1–3',
              source: 'The Hindu & New Indian Express (May 19, 2026)',
              href: 'https://www.thehindu.com/news/cities/chennai/students-of-classes-i-iii-to-get-activity-rich-colourful-textbooks-when-schools-reopen/article71017847.ece',
              desc: 'Details on curriculum reform to eliminate rote memorisation and introduce experiential learning.',
            },
            {
              title: 'Commitment to Tamil Nadu’s Two-Language Policy',
              source: 'The Hindu & Economic Times Education',
              href: 'https://www.thehindu.com/news/national/tamil-nadu/will-remain-committed-to-tamil-nadus-two-language-policy-in-schools-tvk-minister-rajmohan/article70997615.ece',
              desc: 'Reaffirmation of the State’s Tamil and English formula and stance on state policy sufficiency.',
            },
          ],
        },
        {
          category: 'Infrastructure, Technology & Student Welfare',
          items: [
            {
              title: 'Smart Boards Inauguration & Summer School Readiness',
              source: 'The News Mill & Careers360 (June 2026)',
              href: 'https://thenewsmill.com/2026/06/tamil-nadu-education-minister-inaugurates-smart-boards-as-schools-reopen-after-summer-break/',
              desc: 'Inauguration of 21 smart boards in Chennai and pre-reopening campus facility audits.',
            },
            {
              title: 'TN SPARK AI & Emerging Technologies Roadmap',
              source: 'New Indian Express (July 22, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jul/22/tamil-nadu-charts-ai-roadmap-for-government-school-students',
              desc: 'Pilot deployment across ~5,000 schools and roadmap for Classes 6–8 and 9–12.',
            },
            {
              title: 'Reopening Low-Enrolment Schools (“10 Students are Enough”) & Budget Analysis',
              source: 'Dinamalar Kalvimalar (August 2026)',
              href: 'https://www.dinamalar.com/news/kalvimalar-news-en/39ten-students-are-enough39-tn-assures-reopening-of-schools-closed-for-low-enrolment/61081',
              desc: 'Legislative directives on rural school access, dropout surveys, and ₹44,527 Cr budget breakdown.',
            },
          ],
        },
      ],
      notice:
        'Archival Note: Proposals such as the weekly chicken biryani noon meal are noted as active proposals under ministerial review and not finalized schemes.',
    },
    ta: {
      headline: 'பொது ஆவணங்கள் & சரிபார்க்கப்பட்ட ஆதாரங்கள்',
      standfirst:
        'இத்தளத்தில் இடம்பெற்றுள்ள அனைத்துத் தகவல்களும் அரசுப் பதிவுகள், சட்டமன்றக் குறிப்புகள் மற்றும் செய்தி அறிக்கைகளின் அடிப்படையில் தொகுக்கப்பட்டுள்ளன.',
      groups: [
        {
          category: 'அரசு விபரக்குறிப்பு & அரசாணைகள்',
          items: [
            {
              title: 'தமிழ்நாடு அரசு துறை விவரக்குறிப்பு & அமைச்சரவை பொறுப்பு',
              source: 'tn.gov.in / பள்ளிக் கல்வித் துறை',
              href: 'https://www.tn.gov.in/dept_profile.php?dep_id',
              desc: 'பள்ளிக் கல்வித்துறை அமைச்சராகப் பொறுப்பேற்றதற்கான அதிகாரப்பூர்வ விவரக் குறிப்பு.',
            },
            {
              title: 'இணையவழி NOC மற்றும் தனியார் பள்ளி அங்கீகார உத்தரவு',
              source: 'நியூ இந்தியன் எக்ஸ்பிரஸ் (ஜூன் 17, 2026)',
              href: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/17/no-more-bribes-private-schools-can-apply-online-for-noc-from-july-1-minister-rajmohan',
              desc: 'தனியார் பள்ளிகளுக்கான அனுமதிகளை வெளிப்படையான இணையதள முறைக்கு மாற்றிய அறிவிப்பு.',
            },
          ],
        },
        {
          category: 'பாடத்திட்டம், பாடநூல்கள் & மொழிக் கொள்கை',
          items: [
            {
              title: '1, 2, 3-ஆம் வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள்',
              source: 'தி இந்து & நியூ இந்தியன் எக்ஸ்பிரஸ் (மே 19, 2026)',
              href: 'https://www.thehindu.com/news/cities/chennai/students-of-classes-i-iii-to-get-activity-rich-colourful-textbooks-when-schools-reopen/article71017847.ece',
              desc: 'மனப்பாட முறையை நீக்கி செயல்வழிக் கற்றலை அறிமுகப்படுத்திய பாடநூல்கள் பற்றிய விபரம்.',
            },
            {
              title: 'தமிழ்நாட்டின் இருமொழிக் கொள்கை உறுதிப்பாடு',
              source: 'தி இந்து & எகனாமிக் டைம்ஸ் எஜுகேஷன்',
              href: 'https://www.thehindu.com/news/national/tamil-nadu/will-remain-committed-to-tamil-nadus-two-language-policy-in-schools-tvk-minister-rajmohan/article70997615.ece',
              desc: 'தமிழ்-ஆங்கிலம் இருமொழிக் கொள்கையின் அவசியமும் மாநில கல்விக் கொள்கையின் வலிமையும்.',
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
    <div className="space-y-12">
      <EduReveal className="max-w-[48rem]">
        <p className="text-charcoal-700 text-base leading-relaxed">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Grouped Link List */}
      <div className="space-y-10">
        {content.groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h3 className="font-display text-xl text-maroon-700 border-b border-sand-300 pb-2">
              {group.category}
            </h3>

            <EduStaggerContainer className="divide-y divide-sand-300">
              {group.items.map((item, idx) => (
                <EduStaggerItem
                  key={idx}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 max-w-[48rem]">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-lg text-charcoal-900 group-hover:text-maroon-700 transition-colors no-underline block"
                    >
                      {item.title} <span className="text-xs font-mono text-charcoal-500">↗</span>
                    </a>
                    <p className="text-xs text-charcoal-600 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-charcoal-500 md:text-right whitespace-nowrap">
                    {item.source}
                  </div>
                </EduStaggerItem>
              ))}
            </EduStaggerContainer>
          </div>
        ))}
      </div>

      {/* Governance Notice */}
      <EduReveal delay={0.15} className="p-4 bg-sand-100 border border-sand-300">
        <p className="text-xs text-charcoal-700 font-sans italic">
          {content.notice}
        </p>
      </EduReveal>
    </div>
  );
}
