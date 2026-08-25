import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function GrievanceRedressal({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan’s office serves as a first point of contact for residents with civic complaints, aiming to bridge the gap between citizens and municipal authorities.',
      meetingsTitle: 'Ward-Level Meetings & Inspections',
      meetingsBody: 'Inspections are frequently conducted following resident complaints and media reports. For example, in Arian Lane, Vepery, inspections were conducted with Greater Chennai Corporation officials, and immediate de-siltation and periodic maintenance were directed for stormwater drains.',
      digitalTitle: 'Digital Grievance Channel',
      digitalBody: 'A dedicated WhatsApp line is intended for residents to register complaints concerning garbage, streetlights, drains, and roads. The office tracks these complaints and follows up with the respective Greater Chennai Corporation departments.',
      whatsappLabel: 'WhatsApp Complaint Line',
      whatsappNumber: '99409 40405',
    },
    ta: {
      p1: 'ராஜ்மோகனின் அலுவலகம், குடிமைப் புகார்களைக் கொண்ட குடியிருப்பாளர்களுக்கான முதல் தொடர்புப் புள்ளியாகச் செயல்படுகிறது. இது குடிமக்களுக்கும் நகராட்சி அதிகாரிகளுக்கும் இடையிலான இடைவெளியைக் குறைப்பதை நோக்கமாகக் கொண்டுள்ளது.',
      meetingsTitle: 'வார்டு அளவிலான கூட்டங்கள் & ஆய்வுகள்',
      meetingsBody: 'குடியிருப்பாளர்களின் புகார்கள் மற்றும் ஊடக அறிக்கைகளைத் தொடர்ந்து அடிக்கடி ஆய்வுகள் நடத்தப்படுகின்றன. உதாரணமாக, வேப்பேரி ஆரியன் லேனில், பெருநகர சென்னை மாநகராட்சி அதிகாரிகளுடன் ஆய்வுகள் மேற்கொள்ளப்பட்டன, மேலும் மழைநீர் வடிகால்களை உடனடியாகத் தூர்வாரவும், அவ்வப்போது பராமரிக்கவும் உத்தரவிடப்பட்டது.',
      digitalTitle: 'டிஜிட்டல் குறை தீர்க்கும் வழிமுறை',
      digitalBody: 'குப்பை, தெருவிளக்குகள், வடிகால்கள் மற்றும் சாலைகள் தொடர்பான புகார்களைப் பதிவு செய்ய, குடியிருப்பாளர்களுக்காக ஒரு பிரத்யேக வாட்ஸ்அப் எண் வழங்கப்பட்டுள்ளது. அலுவலகம் இந்தப் புகார்களைக் கண்காணித்து, அந்தந்த பெருநகர சென்னை மாநகராட்சித் துறைகளுடன் பின்தொடர்கிறது.',
      whatsappLabel: 'வாட்ஸ்அப் புகார் எண்',
      whatsappNumber: '99409 40405',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 items-start">
      <MlaStaggerContainer className="prose prose-lg text-charcoal-900 prose-headings:font-display prose-headings:font-normal font-sans">
        <MlaStaggerItem><p className="text-xl text-charcoal-800 leading-relaxed mb-10">{content.p1}</p></MlaStaggerItem>
        
        <MlaStaggerItem><h3 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-3">{content.meetingsTitle}</h3></MlaStaggerItem>
        <MlaStaggerItem><p className="text-charcoal-700 text-base leading-relaxed">{content.meetingsBody}</p></MlaStaggerItem>

        <MlaStaggerItem><h3 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-3">{content.digitalTitle}</h3></MlaStaggerItem>
        <MlaStaggerItem><p className="text-charcoal-700 text-base leading-relaxed">{content.digitalBody}</p></MlaStaggerItem>
      </MlaStaggerContainer>

      <MlaStaggerItem className="bg-sand-50 p-8 border-t-4 border-maroon-700 border border-sand-300 rounded-xs text-center shadow-xs">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-3">{content.whatsappLabel}</div>
        <div className="font-display text-3xl md:text-4xl text-charcoal-950 font-bold tracking-wider">
          {content.whatsappNumber}
        </div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
