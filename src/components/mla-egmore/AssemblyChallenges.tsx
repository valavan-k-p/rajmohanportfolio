'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { MessageSquare, ShieldAlert, Users, BookOpen, Scale } from 'lucide-react';

export function AssemblyChallenges({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      );

      // Items stagger
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: [
      {
        date: 'June 2026',
        title: 'Live Telecast of Assembly Proceedings',
        icon: MessageSquare,
        body: (
          <div className="space-y-4">
            <p>
              Leader of the Opposition Udhayanidhi Stalin criticised Rajmohan’s Information Department over alleged irregularities in the live telecast of Assembly proceedings. The criticism included allegations that sessions were selectively broadcast, edited clips favoured the ruling party, the live feed was interrupted during discussions related to the Governor’s Address, and opposition speeches were allegedly suppressed.
            </p>
            <p>
              Rajmohan defended the government, asserting that the TVK administration had restored full live telecasts after years of restrictions under the previous regime. He denied deliberate blackout and characterised the issue as a technical matter being politicised by the opposition.
            </p>
          </div>
        ),
      },
      {
        date: 'June 2026',
        title: 'Law and Order & Women’s Safety',
        icon: ShieldAlert,
        body: (
          <div className="space-y-4">
            <p>
              During Assembly exchanges concerning crimes against women, the Anna University sexual assault case, and alleged police harassment in Anna Nagar, Rajmohan mounted a defence of the administration’s law and order record.
            </p>
            <p>
              He specifically defended the newly formed <strong>‘Singappen’ special women’s police unit</strong> as a structural improvement in responding to women’s safety concerns.
            </p>
          </div>
        ),
      },
      {
        date: 'July 2026',
        title: 'Defence of Cabinet Colleague',
        icon: Users,
        body: (
          <div className="space-y-4">
            <p>
              A controversy arose involving Industries Minister S Keerthana after a video of her inspecting a government school went viral, with critics accusing her of patronising behaviour toward a student.
            </p>
            <p>
              Rajmohan defended the interaction as affectionate and well-intentioned, while also acknowledging the principle that ministerial visits should be conducted with sensitivity and respect for students and staff.
            </p>
          </div>
        ),
      },
      {
        date: 'August 2026',
        title: 'School Education Budget',
        icon: BookOpen,
        body: (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-6">
              <div className="bg-sand-100 p-5 rounded-2xl min-w-[200px] border border-sand-200">
                <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-2">2025–26</div>
                <div className="font-display text-4xl text-charcoal-900 font-bold">₹46,767 <span className="text-sm font-sans font-normal text-charcoal-600">cr</span></div>
              </div>
              <div className="bg-sand-100 p-5 rounded-2xl min-w-[200px] border border-sand-200">
                <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-2">2026–27</div>
                <div className="font-display text-4xl text-charcoal-900 font-bold">₹44,527 <span className="text-sm font-sans font-normal text-charcoal-600">cr</span></div>
              </div>
            </div>
            <p className="text-charcoal-700 font-sans text-base leading-relaxed">
              Opposition members criticised the allocation, arguing that the reduction could affect infrastructure upgrades, teacher recruitment, and student welfare schemes.
            </p>
            <p className="text-charcoal-700 font-sans text-base leading-relaxed">
              Rajmohan counterargued that the allocation was not a cut in real terms, stating that the previous government had not fully utilised its budget. He pointed to new investments in AI education, school modernisation, and breakfast schemes as evidence of continued commitment.
            </p>
          </div>
        ),
      },
      {
        date: 'August 2026',
        title: 'FCRA Amendment Bill Resolution',
        icon: Scale,
        body: (
          <div className="space-y-4 text-charcoal-700 font-sans text-base leading-relaxed">
            <p>
              Rajmohan moved a resolution opposing the Union government’s FCRA Amendment Bill, 2026. His stated concerns included potential negative effects on minority-run educational institutions, social welfare institutions, charitable organisations, schools, hospitals, and welfare bodies.
            </p>
            <p>
              His stated legislative position supported national security and transparency in foreign funding, while arguing that regulations should not infringe on property rights, natural justice, or the federal structure.
            </p>
          </div>
        ),
      },
    ],
    ta: [
      {
        date: 'ஜூன் 2026',
        title: 'சட்டமன்ற நிகழ்வுகளின் நேரடி ஒளிபரப்பு',
        icon: MessageSquare,
        body: (
          <div className="space-y-4 text-charcoal-700 font-sans text-base leading-relaxed">
            <p>
              சட்டமன்ற நிகழ்வுகளின் நேரடி ஒளிபரப்பில் முறைகேடுகள் நடந்ததாகக் கூறி, ராஜ்மோகனின் தகவல் துறையை எதிர்க்கட்சித் தலைவர் உதயநிதி ஸ்டாலின் விமர்சித்தார். அமர்வுகள் தேர்ந்தெடுக்கப்பட்டு ஒளிபரப்பப்பட்டன, ஆளும் கட்சிக்குச் சாதகமாகத் திருத்தப்பட்ட காணொளிகள் வெளியிடப்பட்டன, ஆளுநர் உரை தொடர்பான விவாதங்களின் போது நேரடி ஒளிபரப்பு தடைபட்டது மற்றும் எதிர்க்கட்சிகளின் பேச்சுகள் நசுக்கப்பட்டன என்ற குற்றச்சாட்டுகள் இதில் அடங்கும்.
            </p>
            <p>
              இதற்குப் பதிலளித்த ராஜ்மோகன், முந்தைய ஆட்சியின் கீழ் பல ஆண்டுகளாக இருந்த கட்டுப்பாடுகளுக்குப் பிறகு, TVK நிர்வாகம் முழுமையான நேரடி ஒளிபரப்பை மீட்டெடுத்துள்ளது என்று வலியுறுத்தி அரசாங்கத்தைப் பாதுகாத்தார். இருட்டடிப்பு செய்யப்பட்டதை அவர் மறுத்தார், மேலும் இது எதிர்க்கட்சிகளால் அரசியலாக்கப்படும் ஒரு தொழில்நுட்பப் பிரச்சினை என்று வர்ணித்தார்.
            </p>
          </div>
        ),
      },
      {
        date: 'ஜூன் 2026',
        title: 'சட்டம் ஒழுங்கு மற்றும் பெண்கள் பாதுகாப்பு',
        icon: ShieldAlert,
        body: (
          <div className="space-y-4 text-charcoal-700 font-sans text-base leading-relaxed">
            <p>
              பெண்களுக்கு எதிரான குற்றங்கள், அண்ணா பல்கலைக்கழக பாலியல் வன்கொடுமை வழக்கு மற்றும் அண்ணா நகரில் காவல்துறை அத்துமீறல் குற்றச்சாட்டுகள் தொடர்பான சட்டமன்ற விவாதங்களின் போது, நிர்வாகத்தின் சட்டம் ஒழுங்கு பதிவை ராஜ்மோகன் பாதுகாத்துப் பேசினார்.
            </p>
            <p>
              பெண்கள் பாதுகாப்பு தொடர்பான கவலைகளுக்குப் பதிலளிக்கும் ஒரு கட்டமைப்பு மேம்பாடாக, புதிதாக உருவாக்கப்பட்ட <strong>‘சிங்கப்பெண்’ சிறப்பு மகளிர் காவல் பிரிவை</strong> அவர் குறிப்பாகப் பாதுகாத்தார்.
            </p>
          </div>
        ),
      },
      {
        date: 'ஜூலை 2026',
        title: 'அமைச்சரவை சகாவைப் பாதுகாத்தல்',
        icon: Users,
        body: (
          <div className="space-y-4 text-charcoal-700 font-sans text-base leading-relaxed">
            <p>
              தொழில்துறை அமைச்சர் எஸ்.கீர்த்தனா ஒரு அரசுப் பள்ளியை ஆய்வு செய்யும் காணொளி வைரலான பிறகு ஒரு சர்ச்சை எழுந்தது. ஒரு மாணவரிடம் அவர் இரக்கமற்ற முறையில் நடந்து கொண்டதாக விமர்சகர்கள் குற்றம் சாட்டினர்.
            </p>
            <p>
              இந்த உரையாடல் அன்பானது மற்றும் நல்ல நோக்கமுடையது என்று ராஜ்மோகன் பாதுகாத்தார், அதே வேளையில் அமைச்சர்களின் வருகைகள் மாணவர்கள் மற்றும் ஊழியர்கள் மீதான உணர்திறன் மற்றும் மரியாதையுடன் நடத்தப்பட வேண்டும் என்ற கொள்கையையும் அவர் ஒப்புக்கொண்டார்.
            </p>
          </div>
        ),
      },
      {
        date: 'ஆகஸ்ட் 2026',
        title: 'பள்ளிக் கல்வி பட்ஜெட்',
        icon: BookOpen,
        body: (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-6">
              <div className="bg-sand-100 p-5 rounded-2xl min-w-[200px] border border-sand-200">
                <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-2">2025–26</div>
                <div className="font-display text-4xl text-charcoal-900 font-bold">₹46,767 <span className="text-sm font-sans font-normal text-charcoal-600">கோடி</span></div>
              </div>
              <div className="bg-sand-100 p-5 rounded-2xl min-w-[200px] border border-sand-200">
                <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-2">2026–27</div>
                <div className="font-display text-4xl text-charcoal-900 font-bold">₹44,527 <span className="text-sm font-sans font-normal text-charcoal-600">கோடி</span></div>
              </div>
            </div>
            <p className="text-charcoal-700 font-sans text-base leading-relaxed">
              நிதி ஒதுக்கீடு குறைக்கப்பட்டதால் உள்கட்டமைப்பு மேம்பாடுகள், ஆசிரியர் நியமனம் மற்றும் மாணவர் நலத் திட்டங்கள் பாதிக்கப்படலாம் என்று வாதிட்டு எதிர்க்கட்சி உறுப்பினர்கள் இந்த ஒதுக்கீட்டை விமர்சித்தனர்.
            </p>
            <p className="text-charcoal-700 font-sans text-base leading-relaxed">
              முந்தைய அரசாங்கம் தனது பட்ஜெட்டை முழுமையாகப் பயன்படுத்தவில்லை என்று கூறி, இந்த ஒதுக்கீடு உண்மையான சொற்களில் குறைப்பு அல்ல என்று ராஜ்மோகன் எதிர்வாதம் செய்தார். செயற்கை நுண்ணறிவு கல்வி, பள்ளி நவீனமயமாக்கல் மற்றும் காலை உணவுத் திட்டங்கள் ஆகியவற்றுக்கான புதிய முதலீடுகளை அவர் தொடர்ச்சியான அர்ப்பணிப்புக்கான சான்றாகச் சுட்டிக்காட்டினார்.
            </p>
          </div>
        ),
      },
      {
        date: 'ஆகஸ்ட் 2026',
        title: 'FCRA திருத்த மசோதா தீர்மானம்',
        icon: Scale,
        body: (
          <div className="space-y-4 text-charcoal-700 font-sans text-base leading-relaxed">
            <p>
              ஒன்றிய அரசின் FCRA திருத்த மசோதா, 2026 ஐ எதிர்த்து ராஜ்மோகன் ஒரு தீர்மானத்தை முன்மொழிந்தார். சிறுபான்மையினரால் நடத்தப்படும் கல்வி நிறுவனங்கள், சமூக நல நிறுவனங்கள், தொண்டு நிறுவனங்கள், பள்ளிகள், மருத்துவமனைகள் மற்றும் நலன்புரி அமைப்புகள் மீது ஏற்படக்கூடிய எதிர்மறையான விளைவுகள் குறித்து அவர் தனது கவலைகளைத் தெரிவித்தார்.
            </p>
            <p>
              வெளிநாட்டு நிதியுதவியில் தேசிய பாதுகாப்பு மற்றும் வெளிப்படைத்தன்மையை அவரது சட்டமன்ற நிலைப்பாடு ஆதரித்த போதிலும், விதிமுறைகள் சொத்து உரிமைகள், இயற்கை நீதி அல்லது கூட்டாட்சி கட்டமைப்பை மீறக்கூடாது என்று அவர் வாதிட்டார்.
            </p>
          </div>
        ),
      },
    ],
  }[locale];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-12 relative">
      {/* Central Line */}
      <div className="timeline-line absolute left-[28px] md:left-[39px] top-0 bottom-0 w-[2px] bg-sand-300 z-0 origin-top" />

      <div className="space-y-16">
        {content.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="timeline-item relative pl-16 md:pl-24 z-10">
              {/* Icon Marker */}
              <div className="absolute left-0 top-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white border-4 border-sand-100 shadow-sm flex items-center justify-center text-maroon-700 z-20">
                <Icon className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-sand-200">
                <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-3">
                  {item.date}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-charcoal-900 font-bold mb-6">
                  {item.title}
                </h3>
                <div className="text-charcoal-700 leading-relaxed font-sans text-lg">
                  {item.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
