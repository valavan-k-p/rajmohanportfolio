import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function ConstraintsCriticism({ locale }: SectionProps) {
  const content = {
    en: [
      {
        title: 'Ward Fund Delays',
        body: 'In July 2026, GCC councillors, including those from the ruling side, accused the state government of withholding ward development funds amounting to ₹60 lakh per councillor per year. The Mayor reportedly acknowledged these delays, stating that a request for release had been sent to the Municipal Administration Department.',
      },
      {
        title: 'Perceived Centralisation',
        body: 'Opposition councillors have alleged that civic officials were sidelining elected ward representatives in order to favour Rajmohan’s visibility as both MLA and minister.',
      },
      {
        title: 'Hygiene Gaps',
        body: 'A July 2026 report concerning the Government Ambedkar Higher Secondary School in Egmore highlighted severe hygiene issues, noting that the school premises had reportedly become a dumping ground for garbage. This raised questions regarding basic civic maintenance consistency.',
      },
    ],
    ta: [
      {
        title: 'வார்டு நிதி தாமதங்கள்',
        body: 'ஜூலை 2026 இல், ஆளும் தரப்பு உட்பட GCC கவுன்சிலர்கள், கவுன்சிலர் ஒருவருக்கு ஆண்டுக்கு ₹60 லட்சம் என்ற அளவில் வார்டு மேம்பாட்டு நிதியை மாநில அரசு நிறுத்தி வைத்துள்ளதாகக் குற்றம் சாட்டினர். இந்த தாமதங்களை மேயர் ஒப்புக்கொண்டதாகவும், நிதியை விடுவிப்பதற்கான கோரிக்கை நகராட்சி நிர்வாகத் துறைக்கு அனுப்பப்பட்டுள்ளதாகக் கூறியதாகவும் கூறப்படுகிறது.',
      },
      {
        title: 'மையப்படுத்தல் என்ற குற்றச்சாட்டு',
        body: 'எம்.எல்.ஏ மற்றும் அமைச்சர் என இரு நிலைகளிலும் ராஜ்மோகனின் முக்கியத்துவத்திற்குச் சாதகமாக, தேர்ந்தெடுக்கப்பட்ட வார்டு பிரதிநிதிகளைக் குடிமை அதிகாரிகள் ஓரங்கட்டுவதாக எதிர்க்கட்சி கவுன்சிலர்கள் குற்றம் சாட்டியுள்ளனர்.',
      },
      {
        title: 'சுகாதார இடைவெளிகள்',
        body: 'எழும்பூரில் உள்ள அரசு அம்பேத்கர் மேல்நிலைப் பள்ளி தொடர்பான ஜூலை 2026 அறிக்கை கடுமையான சுகாதாரப் பிரச்சினைகளை எடுத்துரைத்தது. பள்ளி வளாகம் குப்பைகள் கொட்டும் இடமாக மாறிவிட்டதாக அந்த அறிக்கை குறிப்பிட்டது. இது அடிப்படை குடிமைப் பராமரிப்பின் நிலைத்தன்மை குறித்த கேள்விகளை எழுப்பியது.',
      },
    ],
  }[locale];

  return (
    <MlaStaggerContainer className="max-w-4xl space-y-12">
      {content.map((item, idx) => (
        <MlaStaggerItem key={idx} className="flex gap-6 md:gap-10">
          <div className="shrink-0 font-display text-4xl text-maroon-300 select-none">
            {(idx + 1).toString().padStart(2, '0')}
          </div>
          <div>
            <h3 className="font-display text-2xl text-charcoal-900 mb-4">{item.title}</h3>
            <p className="text-lg text-charcoal-700 leading-relaxed">
              {item.body}
            </p>
          </div>
        </MlaStaggerItem>
      ))}
    </MlaStaggerContainer>
  );
}
