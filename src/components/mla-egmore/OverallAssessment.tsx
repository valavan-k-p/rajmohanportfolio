import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function OverallAssessment({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan’s experience as MLA of Egmore reflects a combination of grassroots constituency management and high-level policy leadership. His ministerial responsibilities have provided a statewide platform, while his constituency role has focused on immediate urban challenges, school programmes, water conservation, civic inspections, grievance redressal, infrastructure coordination, and community engagement.',
      p2: 'The source describes the TVK approach in Egmore as a combination of high-visibility MLA-driven interventions (such as direct inspections, the WhatsApp grievance line, and housing regularisation commitments) with city-wide programmes (like Singara Chennai 2.0, stormwater drain works, and monsoon preparedness).',
      p3: 'The reference material describes tangible improvements in areas such as drain de-siltation, water-quality checks, and school water-conservation pilots, while also noting continuing demands for faster fund releases, equitable project distribution, consistent basic maintenance, and accelerated implementation across the constituency.',
    },
    ta: {
      p1: 'எழும்பூர் எம்.எல்.ஏவாக ராஜ்மோகனின் அனுபவம், அடிமட்டத் தொகுதி மேலாண்மை மற்றும் உயர்மட்ட கொள்கைத் தலைமை ஆகியவற்றின் கலவையைப் பிரதிபலிக்கிறது. அவரது அமைச்சரவைப் பொறுப்புகள் மாநில அளவிலான தளத்தை வழங்கியுள்ளன, அதே நேரத்தில் அவரது தொகுதிப் பொறுப்பு உடனடி நகர்ப்புற சவால்கள், பள்ளித் திட்டங்கள், நீர் பாதுகாப்பு, குடிமை ஆய்வுகள், குறை தீர்த்தல், உள்கட்டமைப்பு ஒருங்கிணைப்பு மற்றும் சமூக ஈடுபாடு ஆகியவற்றில் கவனம் செலுத்துகிறது.',
      p2: 'எழும்பூரில் TVK இன் அணுகுமுறையை, அதிகத் தெரிவுநிலை கொண்ட எம்.எல்.ஏ தலைமையிலான தலையீடுகளுடன் (நேரடி ஆய்வுகள், வாட்ஸ்அப் புகார் எண் மற்றும் வீட்டுவசதி முறைப்படுத்தல் உறுதிமொழிகள் போன்றவை) நகரம் தழுவிய திட்டங்களின் (சிங்காரச் சென்னை 2.0, மழைநீர் வடிகால் பணிகள் மற்றும் பருவமழை முன்னெச்சரிக்கைகள் போன்றவை) கலவையாக ஆதாரம் விவரிக்கிறது.',
      p3: 'வடிகால் தூர்வாருதல், நீர்த் தர சோதனைகள் மற்றும் பள்ளி நீர்-பாதுகாப்பு முன்னோடித் திட்டங்கள் போன்ற பகுதிகளில் உறுதியான மேம்பாடுகள் ஏற்பட்டுள்ளதாகக் குறிப்புப் பொருள் விவரிக்கிறது. அதே நேரத்தில் விரைவான நிதி வெளியீடு, சமமான திட்ட விநியோகம், சீரான அடிப்படைப் பராமரிப்பு மற்றும் தொகுதி முழுவதும் விரைவான செயல்பாட்டிற்கான தொடர்ச்சியான கோரிக்கைகள் குறித்தும் இது சுட்டிக்காட்டுகிறது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal">
      <MlaStaggerItem><p className="lead text-xl mb-8">{content.p1}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
      <MlaStaggerItem><p className="mt-6">{content.p3}</p></MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
