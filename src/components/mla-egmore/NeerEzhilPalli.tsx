import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaReveal, MlaCounter } from './MlaMotion';
import { Droplets } from 'lucide-react';

export function NeerEzhilPalli({ locale, inverted }: SectionProps) {
  const content = {
    en: {
      subheading: 'A water-conservation pilot at Presidency Government Girls Higher Secondary School, Egmore',
      intro: 'Launched in July 2026, the Presidency Government Girls Higher Secondary School in Egmore was selected as a pilot site for this initiative. Rajmohan inaugurated the project on 22–23 July 2026.',
      objectivesTitle: 'Objectives',
      objectives: [
        'Transform government schools into model water-stewardship campuses.',
        'Scientifically treat wastewater generated within school premises using eco-friendly, nature-based solutions.',
        'Reuse treated water for gardening and maintaining green spaces.',
        'Nurture saplings and nursery areas.',
        'Recharge groundwater.',
        'Reduce freshwater demand on school campuses.',
        'Reduce the pollution load entering city drains and rivers.',
      ],
      techTitle: 'Technology',
      techBody1: 'The project uses wetland-based wastewater treatment systems installed inside school compounds. These are decentralised, low-energy systems that use plants, soil, and microbial action to treat sewage and greywater.',
      capacityLabel: 'Treatment Capacity',
      capacityValue: '25,000',
      capacityUnit: 'litres per day',
      techPathway: 'Wastewater → Treatment → Storage / Reuse → Gardens / Nurseries → Groundwater Recharge',
      eduTitle: 'Educational Component',
      eduBody: 'The project also functions as a learning module, creating a "living lab" for environmental science. Students are involved in monitoring water quality parameters, maintaining wetland plants and garden areas, and recording water savings and groundwater recharge data.',
      implTitle: 'Implementation',
      implBody: 'The initiative involves coordination between the School Education Department, Environment Department, and technical agencies specialising in nature-based wastewater solutions. The inauguration included demonstrations of the treatment process (collection, wetland cells, storage/reuse) and orientation sessions for teachers, students, and parent representatives.',
      expansionTitle: 'Planned Expansion',
      expansionBody: 'Following the Egmore pilot, plans were announced to scale the initiative to hundreds of government schools across Tamil Nadu. Prioritisation is planned for campuses with high water stress, large student populations, and available space for wetland cells and recharge structures.',
      significanceTitle: 'Significance for Egmore',
      significanceBody: 'The project addresses local water scarcity, water management, flooding concerns, groundwater recharge, and improves overall school environmental quality.',
    },
    ta: {
      subheading: 'சென்னை எழும்பூர் மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளியில் ஒரு நீர்-பாதுகாப்பு முன்னோடித் திட்டம்',
      intro: 'ஜூலை 2026 இல் தொடங்கப்பட்ட இந்த திட்டத்திற்காக எழும்பூர் மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளி தேர்ந்தெடுக்கப்பட்டது. ராஜ்மோகன் ஜூலை 22-23, 2026 அன்று இத்திட்டத்தை தொடங்கி வைத்தார்.',
      objectivesTitle: 'நோக்கங்கள்',
      objectives: [
        'அரசுப் பள்ளிகளை மாதிரி நீர் மேலாண்மை வளாகங்களாக மாற்றுதல்.',
        'பள்ளி வளாகங்களுக்குள் உருவாகும் கழிவுநீரை இயற்கையை அடிப்படையாகக் கொண்ட தீர்வுகளைப் பயன்படுத்தி அறிவியல் பூர்வமாகச் சுத்திகரித்தல்.',
        'சுத்திகரிக்கப்பட்ட நீரை தோட்டக்கலை மற்றும் பசுமை வெளிகளைப் பராமரிக்க மீண்டும் பயன்படுத்துதல்.',
        'மரக்கன்றுகள் மற்றும் நாற்றங்கால் பகுதிகளை வளர்த்தல்.',
        'நிலத்தடி நீரை செறிவூட்டுதல்.',
        'பள்ளி வளாகங்களில் நன்னீர் தேவையைக் குறைத்தல்.',
        'நகர வடிகால்கள் மற்றும் ஆறுகளில் நுழையும் மாசுச் சுமையைக் குறைத்தல்.',
      ],
      techTitle: 'தொழில்நுட்பம்',
      techBody1: 'பள்ளி வளாகங்களுக்குள் அமைக்கப்பட்டுள்ள சதுப்புநில அடிப்படையிலான கழிவுநீர் சுத்திகரிப்பு அமைப்புகளை இத்திட்டம் பயன்படுத்துகிறது. இவை தாவரங்கள், மண் மற்றும் நுண்ணுயிரிகளின் செயல்பாட்டைப் பயன்படுத்தி கழிவுநீரைச் சுத்திகரிக்கும் குறைந்த ஆற்றல் கொண்ட அமைப்புகளாகும்.',
      capacityLabel: 'சுத்திகரிப்புத் திறன்',
      capacityValue: '25,000',
      capacityUnit: 'லிட்டர் / நாள்',
      techPathway: 'கழிவுநீர் → சுத்திகரிப்பு → சேமிப்பு / மறுபயன்பாடு → தோட்டங்கள் / நாற்றங்கால்கள் → நிலத்தடி நீர் செறிவூட்டல்',
      eduTitle: 'கல்வி அங்கம்',
      eduBody: 'இந்த திட்டம் சுற்றுச்சூழல் அறிவியலுக்கான ஒரு "வாழும் ஆய்வகத்தை" உருவாக்கி, கற்றல் தொகுதியாகவும் செயல்படுகிறது. நீரின் தர அளவுருக்களைக் கண்காணித்தல், சதுப்பு நிலத் தாவரங்கள் மற்றும் தோட்டப் பகுதிகளைப் பராமரித்தல் மற்றும் நீர் சேமிப்பு மற்றும் நிலத்தடி நீர் செறிவூட்டல் தரவுகளைப் பதிவு செய்தல் ஆகியவற்றில் மாணவர்கள் ஈடுபடுத்தப்படுகிறார்கள்.',
      implTitle: 'செயல்படுத்தல்',
      implBody: 'பள்ளிக் கல்வித் துறை, சுற்றுச்சூழல் துறை மற்றும் இயற்கையை அடிப்படையாகக் கொண்ட கழிவுநீர் தீர்வுகளில் நிபுணத்துவம் பெற்ற தொழில்நுட்ப நிறுவனங்களுக்கு இடையேயான ஒருங்கிணைப்பை இத்திட்டம் உள்ளடக்கியது. திறப்பு விழாவில் சுத்திகரிப்பு செயல்முறையின் செயல்விளக்கங்கள் மற்றும் ஆசிரியர்கள், மாணவர்கள் மற்றும் பெற்றோர் பிரதிநிதிகளுக்கான நோக்குநிலை அமர்வுகள் இடம்பெற்றன.',
      expansionTitle: 'திட்டமிடப்பட்ட விரிவாக்கம்',
      expansionBody: 'எழும்பூர் முன்னோடித் திட்டத்தைத் தொடர்ந்து, தமிழ்நாடு முழுவதும் உள்ள நூற்றுக்கணக்கான அரசுப் பள்ளிகளுக்கு இத்திட்டத்தை விரிவுபடுத்தும் திட்டங்கள் அறிவிக்கப்பட்டன. அதிக நீர் அழுத்தம், அதிக மாணவர் எண்ணிக்கை மற்றும் சதுப்பு நிலச் செல்கள் மற்றும் செறிவூட்டல் கட்டமைப்புகளுக்கு இடவசதி உள்ள வளாகங்களுக்கு முன்னுரிமை அளிக்க திட்டமிடப்பட்டுள்ளது.',
      significanceTitle: 'எழும்பூருக்கான முக்கியத்துவம்',
      significanceBody: 'இத்திட்டம் உள்ளூர் தண்ணீர் பற்றாக்குறை, நீர் மேலாண்மை, வெள்ளம் தொடர்பான கவலைகள், நிலத்தடி நீர் செறிவூட்டல் ஆகியவற்றை நிவர்த்தி செய்வதுடன் ஒட்டுமொத்த பள்ளி சுற்றுச்சூழல் தரத்தையும் மேம்படுத்துகிறது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className={`space-y-16 ${inverted ? 'text-white' : 'text-charcoal-900'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <MlaStaggerItem>
          <p className={`text-xl md:text-2xl font-light leading-relaxed font-sans ${inverted ? 'text-sand-100' : 'text-charcoal-800'}`}>
            {content.subheading}
          </p>
        </MlaStaggerItem>
        <MlaStaggerItem>
          <p className="mt-6 text-base md:text-lg font-sans text-charcoal-700">
            {content.intro}
          </p>
        </MlaStaggerItem>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <MlaStaggerContainer>
          <MlaStaggerItem><h3 className="text-2xl font-display mb-6 pb-2 border-b border-sand-300 inline-block text-charcoal-950 font-bold">{content.objectivesTitle}</h3></MlaStaggerItem>
          <ul className="space-y-4 text-base font-sans">
            {content.objectives.map((obj, i) => (
              <MlaStaggerItem key={i} y={0} x={15}>
                <li className="flex gap-4 items-start">
                  <span className="font-mono text-xs font-bold text-maroon-700 bg-sand-100 px-2 py-0.5 border border-sand-300 shrink-0">{(i + 1).toString().padStart(2, '0')}</span>
                  <span className={inverted ? 'text-sand-100' : 'text-charcoal-800'}>{obj}</span>
                </li>
              </MlaStaggerItem>
            ))}
          </ul>
        </MlaStaggerContainer>

        <div className="space-y-12">
          <MlaStaggerContainer>
            <MlaStaggerItem><h3 className="text-2xl font-display mb-4 text-charcoal-950 font-bold">{content.techTitle}</h3></MlaStaggerItem>
            <MlaStaggerItem><p className={`text-base font-sans mb-6 ${inverted ? 'text-sand-100' : 'text-charcoal-700'}`}>{content.techBody1}</p></MlaStaggerItem>
            
            <MlaStaggerItem>
              <div className={`p-6 border-l-4 border-maroon-700 rounded-xs ${inverted ? 'bg-white/5' : 'bg-sand-50/90 border border-sand-200'}`}>
                <div className="text-xs uppercase tracking-widest font-mono text-maroon-700 font-bold mb-2">{content.capacityLabel}</div>
                <MlaReveal scale={0.96}>
                  <div className="flex items-center gap-3 mb-1">
                    <Droplets size={24} className="text-maroon-700" strokeWidth={1.5} />
                    <div className="text-4xl font-display text-charcoal-950 font-bold">
                      <MlaCounter value={25000} format="number" /> <span className="text-xl font-sans font-normal text-charcoal-600">{content.capacityUnit}</span>
                    </div>
                  </div>
                </MlaReveal>
              </div>
            </MlaStaggerItem>

            <MlaStaggerItem>
              <div className={`mt-6 p-4 text-center font-mono text-xs tracking-wide border rounded-xs ${inverted ? 'border-white/20 text-sand-100' : 'border-sand-300 bg-white text-charcoal-800'}`}>
                {content.techPathway}
              </div>
            </MlaStaggerItem>
          </MlaStaggerContainer>

          <MlaStaggerContainer>
            <MlaStaggerItem><h3 className="text-2xl font-display mb-4 text-charcoal-950 font-bold">{content.eduTitle}</h3></MlaStaggerItem>
            <MlaStaggerItem><p className={`text-base font-sans ${inverted ? 'text-sand-100' : 'text-charcoal-700'}`}>{content.eduBody}</p></MlaStaggerItem>
          </MlaStaggerContainer>
        </div>
      </div>

      <MlaStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-sand-300">
        <MlaStaggerItem>
          <h4 className="text-xl font-display mb-3 text-charcoal-950 font-bold">{content.implTitle}</h4>
          <p className={`text-sm font-sans leading-relaxed ${inverted ? 'text-sand-100' : 'text-charcoal-700'}`}>{content.implBody}</p>
        </MlaStaggerItem>
        <MlaStaggerItem>
          <h4 className="text-xl font-display mb-3 text-charcoal-950 font-bold">{content.expansionTitle}</h4>
          <p className={`text-sm font-sans leading-relaxed ${inverted ? 'text-sand-100' : 'text-charcoal-700'}`}>{content.expansionBody}</p>
        </MlaStaggerItem>
        <MlaStaggerItem>
          <h4 className="text-xl font-display mb-3 text-charcoal-950 font-bold">{content.significanceTitle}</h4>
          <p className={`text-sm font-sans leading-relaxed ${inverted ? 'text-sand-100' : 'text-charcoal-700'}`}>{content.significanceBody}</p>
        </MlaStaggerItem>
      </MlaStaggerContainer>
    </MlaStaggerContainer>
  );
}
