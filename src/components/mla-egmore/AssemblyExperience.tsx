import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function AssemblyExperience({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan’s legislative experience in 2026 has been defined by his dual responsibilities as both School Education Minister and Minister for Information and Publicity.',
      p2: 'His role in the Assembly has frequently placed him at the centre of major legislative debates concerning democratic transparency, education funding, women’s safety, law and order, cabinet accountability, and federal autonomy.',
    },
    ta: {
      p1: '2026 ஆம் ஆண்டில் ராஜ்மோகனின் சட்டமன்ற அனுபவம், பள்ளிக் கல்வித் துறை அமைச்சர் மற்றும் தகவல் மற்றும் விளம்பரத் துறை அமைச்சர் ஆகிய இரு பொறுப்புகளாலும் வரையறுக்கப்பட்டுள்ளது.',
      p2: 'சட்டமன்றத்தில் அவரது பங்கு ஜனநாயக வெளிப்படைத்தன்மை, கல்வி நிதி, பெண்கள் பாதுகாப்பு, சட்டம் ஒழுங்கு, அமைச்சரவை பொறுப்புக்கூறல் மற்றும் கூட்டாட்சி சுயாட்சி தொடர்பான முக்கிய சட்டமன்ற விவாதங்களின் மையத்தில் அவரை அடிக்கடி நிலைநிறுத்தியுள்ளது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="text-center space-y-6">
      <MlaStaggerItem>
        <p className="text-2xl md:text-3xl font-light text-slate-900 leading-relaxed">
          {content.p1}
        </p>
      </MlaStaggerItem>
      <MlaStaggerItem>
        <p className="text-lg md:text-xl text-slate-900 max-w-3xl mx-auto">
          {content.p2}
        </p>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
