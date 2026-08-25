import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function FurtherResearch({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'The source material identifies specific areas requiring further documentation to present a complete constituency profile:',
      item1: 'Infrastructure projects Rajmohan has announced for Egmore.',
      item2: 'How Egmore residents have reacted to his education initiatives.',
      note: 'Further documentation required. Research pending.',
    },
    ta: {
      p1: 'முழுமையான தொகுதி விவரக்குறிப்பை வழங்குவதற்கு, மேலும் ஆவணப்படுத்தல் தேவைப்படும் குறிப்பிட்ட பகுதிகளை ஆதாரப் பொருள் அடையாளம் காட்டுகிறது:',
      item1: 'எழும்பூருக்காக ராஜ்மோகன் அறிவித்துள்ள உள்கட்டமைப்புத் திட்டங்கள்.',
      item2: 'அவரது கல்வி முன்முயற்சிகளுக்கு எழும்பூர் குடியிருப்பாளர்கள் எவ்வாறு பதிலளித்துள்ளனர்.',
      note: 'மேலும் ஆவணப்படுத்தல் தேவை. ஆராய்ச்சி நிலுவையில் உள்ளது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="max-w-3xl mx-auto text-center">
      <MlaStaggerItem>
        <p className="text-xl text-slate-900 mb-8 font-light">
          {content.p1}
        </p>
      </MlaStaggerItem>
      
      <MlaStaggerItem>
        <div className="space-y-6 text-lg text-slate-900 mb-12 text-left bg-slate-50 p-8 border border-slate-200">
          <div className="flex gap-4">
            <span className="text-slate-50 font-bold shrink-0">1</span>
            <span>{content.item1}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-50 font-bold shrink-0">2</span>
            <span>{content.item2}</span>
          </div>
        </div>
      </MlaStaggerItem>

      <MlaStaggerItem>
        <div className="inline-block px-6 py-3 border border-red-200 text-slate-900 uppercase tracking-widest text-sm font-medium">
          {content.note}
        </div>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
