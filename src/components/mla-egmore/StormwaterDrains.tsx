import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaReveal, MlaCounter } from './MlaMotion';
import { Waves, Banknote } from 'lucide-react';

export function StormwaterDrains({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Egmore’s historical vulnerability to waterlogging and flooding has made the modernisation of stormwater drains a major infrastructure priority.',
      statsTitle: 'Project Details in Source',
      stat1Value: '1.91 km',
      stat1Label: 'of works mentioned',
      stat2Value: '₹2.06 Cr',
      stat2Label: 'approximate value',
      locationsTitle: 'Mentioned Locations:',
      locations: [
        'Police Commissioner Office Road',
        'Tamil Road',
        'Velayutham Street',
        'Koyathoppu',
        'Gandhi-Irwin Road',
        'St Andrew’s Church vicinity',
      ],
      contextTitle: 'City-wide Context',
      contextBody: 'These local interventions are part of a broader city-wide infrastructure programme under Singara Chennai 2.0. According to the source, the Greater Chennai Corporation (GCC) was racing to complete approximately 1,126 km of drains across the entire city by September 2026.',
      actionsTitle: 'Action & Coordination',
      actions: [
        'Monitoring project progress',
        'Pushing for faster completion ahead of the northeast monsoon',
        'Coordination with GCC',
        'Coordination with Water Resources Department (WRD)',
        'Focusing on structural flood mitigation',
      ],
    },
    ta: {
      p1: 'தண்ணீர் தேங்குதல் மற்றும் வெள்ளப்பெருக்கினால் எழும்பூரின் வரலாற்று ரீதியான பாதிப்புகள், மழைநீர் வடிகால்களை நவீனமயமாக்குவதை ஒரு முக்கிய உள்கட்டமைப்பு முன்னுரிமையாக மாற்றியுள்ளது.',
      statsTitle: 'ஆதாரத்தில் உள்ள திட்ட விவரங்கள்',
      stat1Value: '1.91 கி.மீ',
      stat1Label: 'பணிகள் குறிப்பிடப்பட்டுள்ளன',
      stat2Value: '₹2.06 கோடி',
      stat2Label: 'தோராயமான மதிப்பு',
      locationsTitle: 'குறிப்பிடப்பட்ட இடங்கள்:',
      locations: [
        'காவல் ஆணையர் அலுவலக சாலை',
        'தமிழ் சாலை',
        'வேலாயுதம் தெரு',
        'கோயத்தோப்பு',
        'காந்தி-இர்வின் சாலை',
        'செயின்ட் ஆண்ட்ரூஸ் தேவாலயப் பகுதி',
      ],
      contextTitle: 'நகரம் தழுவிய சூழல்',
      contextBody: 'இந்த உள்ளூர் தலையீடுகள் சிங்காரச் சென்னை 2.0 இன் கீழ் ஒரு பரந்த நகரம் தழுவிய உள்கட்டமைப்புத் திட்டத்தின் ஒரு பகுதியாகும். ஆதாரத்தின்படி, பெருநகர சென்னை மாநகராட்சி (GCC) செப்டம்பர் 2026 க்குள் நகரம் முழுவதும் சுமார் 1,126 கி.மீ வடிகால்களை முடிக்க விரைந்து செயல்பட்டது.',
      actionsTitle: 'செயல்பாடு & ஒருங்கிணைப்பு',
      actions: [
        'திட்ட முன்னேற்றத்தைக் கண்காணித்தல்',
        'வடகிழக்குப் பருவமழைக்கு முன்னதாக விரைவாக முடிக்க வலியுறுத்துதல்',
        'GCC உடனான ஒருங்கிணைப்பு',
        'நீர்வளத் துறையுடன் (WRD) ஒருங்கிணைப்பு',
        'கட்டமைப்பு ரீதியான வெள்ளத் தடுப்பில் கவனம் செலுத்துதல்',
      ],
    },
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
      <MlaStaggerContainer className="space-y-12">
        <MlaStaggerItem>
          <p className="text-xl md:text-2xl font-light text-slate-900 leading-relaxed">
            {content.p1}
          </p>
        </MlaStaggerItem>

        <MlaStaggerItem>
          <h3 className="font-display text-2xl text-slate-900 mb-6">{content.actionsTitle}</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-slate-900 marker:text-slate-900">
            {content.actions.map((action, idx) => (
              <li key={idx}>{action}</li>
            ))}
          </ul>
        </MlaStaggerItem>

        <MlaStaggerItem>
          <h3 className="font-display text-2xl text-slate-900 mb-6">{content.locationsTitle}</h3>
          <div className="flex flex-wrap gap-3">
            {content.locations.map((loc, idx) => (
              <span key={idx} className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 text-sm tracking-wide">
                {loc}
              </span>
            ))}
          </div>
        </MlaStaggerItem>
      </MlaStaggerContainer>

      <MlaStaggerContainer className="space-y-8">
        <MlaStaggerItem className="bg-slate-900 text-white p-8 border-t-4 border-slate-50/30">
          <h4 className="text-sm uppercase tracking-widest text-slate-50 mb-6">{content.statsTitle}</h4>
          
          <div className="mb-8">
            <MlaReveal scale={0.96}>
              <div className="flex items-center gap-3 mb-2">
                <Waves size={28} className="text-slate-50" strokeWidth={1.5} />
                <div 
                  className="text-5xl" 
                  style={{ 
                    fontFamily: 'var(--font-cormorant)',
                    textShadow: '0 0 12px rgba(138, 115, 163, 0.25)' 
                  }}
                >
                  <MlaCounter value={1.91} format="decimal" /> <span className="text-2xl font-sans text-slate-50/80">km</span>
                </div>
              </div>
            </MlaReveal>
            <div className="text-slate-50">{content.stat1Label}</div>
          </div>
          
          <div>
            <MlaReveal scale={0.96}>
              <div className="flex items-center gap-3 mb-2">
                <Banknote size={24} className="text-slate-50" strokeWidth={1.5} />
                <div 
                  className="text-4xl" 
                  style={{ 
                    fontFamily: 'var(--font-cormorant)',
                    textShadow: '0 0 10px rgba(138, 115, 163, 0.25)' 
                  }}
                >
                  <span className="text-2xl font-sans text-slate-50/80">₹</span><MlaCounter value={2.06} format="decimal" /> <span className="text-2xl font-sans text-slate-50/80">Cr</span>
                </div>
              </div>
            </MlaReveal>
            <div className="text-slate-50">{content.stat2Label}</div>
          </div>
        </MlaStaggerItem>

        <MlaStaggerItem className="bg-slate-50 p-6 border border-slate-200">
          <h4 className="font-display text-xl text-slate-900 mb-3">{content.contextTitle}</h4>
          <p className="text-slate-900 text-sm leading-relaxed">{content.contextBody}</p>
        </MlaStaggerItem>
      </MlaStaggerContainer>
    </MlaStaggerContainer>
  );
}
