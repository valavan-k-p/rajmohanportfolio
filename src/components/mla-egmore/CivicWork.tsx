import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function CivicWork({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Egmore’s dense population, mixed residential-commercial areas, and ageing infrastructure create ongoing urban governance challenges. As one of Chennai’s oldest and most historically significant areas, balancing modern infrastructure needs with existing constraints requires constant civic attention.',
      p2: 'The constituency office has identified several key areas that require sustained intervention and coordination with various government departments.',
      concernsHeading: 'Key Civic Concerns',
      concerns: [
        'Water supply',
        'Waste management',
        'Traffic congestion',
        'Drainage',
        'Roads',
        'Flooding',
        'Housing',
        'Land regularisation',
      ],
    },
    ta: {
      p1: 'எழும்பூரின் அடர்த்தியான மக்கள் தொகை, கலவையான குடியிருப்பு-வணிகப் பகுதிகள் மற்றும் பழமையான உள்கட்டமைப்பு ஆகியவை தொடர்ச்சியான நகர்ப்புற ஆளுகை சவால்களை உருவாக்குகின்றன. சென்னையின் பழமையான மற்றும் வரலாற்று முக்கியத்துவம் வாய்ந்த பகுதிகளில் ஒன்றாக இருப்பதால், நவீன உள்கட்டமைப்பு தேவைகளை இருக்கும் கட்டுப்பாடுகளுடன் சமநிலைப்படுத்துவதற்கு தொடர்ச்சியான குடிமை கவனம் தேவைப்படுகிறது.',
      p2: 'பல்வேறு அரசுத் துறைகளுடன் தொடர்ச்சியான தலையீடு மற்றும் ஒருங்கிணைப்பு தேவைப்படும் பல முக்கிய பகுதிகளைத் தொகுதி அலுவலகம் அடையாளம் கண்டுள்ளது.',
      concernsHeading: 'முக்கிய குடிமைப் பிரச்சினைகள்',
      concerns: [
        'நீர் வழங்கல்',
        'கழிவு மேலாண்மை',
        'போக்குவரத்து நெரிசல்',
        'வடிகால் அமைப்பு',
        'சாலைகள்',
        'வெள்ளம்',
        'வீட்டுவசதி',
        'நில முறைப்படுத்தல்',
      ],
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-red-600">
      <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
      <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.concernsHeading}</h3></MlaStaggerItem>
      <ul className="list-disc pl-6 space-y-2">
        {content.concerns.map((item, index) => (
          <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
        ))}
      </ul>
    </MlaStaggerContainer>
  );
}
