import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function HousingRegularisation({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Housing remains a central civic demand in Egmore. The constituency profile details ongoing policy-level commitments aimed at addressing settlement issues rather than completed large-scale projects at this stage.',
      listHeading: 'Key Policy Commitments:',
      list: [
        'Regularisation of settlements where feasible.',
        'Allotment of tenements within or near the constituency to avoid relocating residents to distant suburbs.',
        'Enumeration of eligible families.',
        'Issuance of pattas where possible.',
        'Advocacy for additional housing board and slum clearance tenements.',
      ],
      locationsHeading: 'Focus Areas:',
      locations: [
        'Thattankulam',
        'Thideer Nagar',
        'Natesan Nagar',
      ],
      note: 'Note: The source explicitly describes these interventions primarily as policy-level commitments and ongoing processes rather than completed infrastructure projects.',
    },
    ta: {
      p1: 'வீட்டுவசதி என்பது எழும்பூரில் ஒரு முக்கிய குடிமைத் தேவையாகத் தொடர்கிறது. நிறைவடைந்த பெரிய அளவிலான திட்டங்களைக் காட்டிலும், தற்போதைய நிலையில் குடியிருப்புகள் தொடர்பான பிரச்சினைகளைத் தீர்ப்பதை நோக்கமாகக் கொண்ட கொள்கை அளவிலான அர்ப்பணிப்புகளைத் தொகுதி விவரக்குறிப்பு விவரிக்கிறது.',
      listHeading: 'முக்கிய கொள்கை அர்ப்பணிப்புகள்:',
      list: [
        'சாத்தியமான இடங்களில் குடியிருப்புகளை முறைப்படுத்துதல்.',
        'குடியிருப்பாளர்களைத் தொலைதூரப் புறநகர்ப் பகுதிகளுக்கு மாற்றுவதைத் தவிர்க்க, தொகுதிக்கு உள்ளேயோ அல்லது அருகிலோ குடியிருப்புகளை ஒதுக்குதல்.',
        'தகுதியான குடும்பங்களைக் கணக்கெடுத்தல்.',
        'சாத்தியமான இடங்களில் பட்டா வழங்குதல்.',
        'கூடுதல் வீட்டு வசதி வாரியம் மற்றும் குடிசை மாற்று வாரிய குடியிருப்புகளுக்கான பரிந்துரை.',
      ],
      locationsHeading: 'கவனம் செலுத்தும் பகுதிகள்:',
      locations: [
        'தட்டான் குளம்',
        'திடீர் நகர்',
        'நடேசன் நகர்',
      ],
      note: 'குறிப்பு: ஆதாரமானது இந்தத் தலையீடுகளை நிறைவடைந்த உள்கட்டமைப்புத் திட்டங்களை விட, முதன்மையாகக் கொள்கை அளவிலான அர்ப்பணிப்புகள் மற்றும் தொடர்ச்சியான செயல்முறைகளாக வெளிப்படையாக விவரிக்கிறது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-900 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-maroon-700 font-sans space-y-6">
      <MlaStaggerItem><p className="text-charcoal-700 leading-relaxed text-base md:text-lg">{content.p1}</p></MlaStaggerItem>
      
      <MlaStaggerItem><h3 className="text-xl font-display font-bold text-charcoal-950 mt-8 mb-4">{content.listHeading}</h3></MlaStaggerItem>
      <ul className="list-disc pl-6 space-y-2 text-charcoal-700 text-base">
        {content.list.map((item, index) => (
          <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
        ))}
      </ul>

      <MlaStaggerItem><h3 className="text-xl font-display font-bold text-charcoal-950 mt-8 mb-4">{content.locationsHeading}</h3></MlaStaggerItem>
      <ul className="list-disc pl-6 space-y-2 text-charcoal-700 text-base">
        {content.locations.map((item, index) => (
          <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
        ))}
      </ul>

      <MlaStaggerItem>
        <div className="mt-8 p-4 bg-sand-50 border-l-4 border-maroon-700 border border-sand-300 rounded-xs text-sm italic text-charcoal-800">
          {content.note}
        </div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
