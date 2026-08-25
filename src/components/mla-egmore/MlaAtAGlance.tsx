import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function MlaAtAGlance({ locale }: SectionProps) {
  const content = {
    en: {
      name: { label: 'Name', value: 'Rajmohan Arumugam' },
      constituency: { label: 'Constituency', value: 'Egmore (SC)' },
      role: { label: 'Role', value: 'Member of the Legislative Assembly' },
      tenure: { label: 'Tenure', value: 'Beginning May 2026' },
      party: { label: 'Political Party', value: 'Tamilaga Vettri Kazhagam (TVK)' },
      ministries: {
        label: 'Ministerial Responsibilities Mentioned in Source',
        value: ['School Education', 'Information and Publicity'],
      },
    },
    ta: {
      name: { label: 'பெயர்', value: 'ராஜ்மோகன் ஆறுமுகம்' },
      constituency: { label: 'தொகுதி', value: 'எழும்பூர் (தனி)' },
      role: { label: 'பதவி', value: 'சட்டமன்ற உறுப்பினர்' },
      tenure: { label: 'பதவிக்காலம்', value: 'மே 2026 முதல்' },
      party: { label: 'அரசியல் கட்சி', value: 'தமிழக வெற்றி கழகம் (TVK)' },
      ministries: {
        label: 'ஆதாரத்தில் குறிப்பிடப்பட்டுள்ள அமைச்சர் பொறுப்புகள்',
        value: ['பள்ளிக் கல்வி', 'தகவல் மற்றும் விளம்பரம்'],
      },
    },
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-3xl mx-auto">
      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.name.label}</div>
        <div className="text-2xl font-display text-charcoal-900">{content.name.value}</div>
      </MlaStaggerItem>
      
      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.constituency.label}</div>
        <div className="text-2xl font-display text-charcoal-900">{content.constituency.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.role.label}</div>
        <div className="text-lg text-charcoal-800 font-sans">{content.role.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.tenure.label}</div>
        <div className="text-lg text-charcoal-800 font-sans">{content.tenure.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.party.label}</div>
        <div className="text-lg text-charcoal-800 font-sans">{content.party.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="border-t border-sand-300 pt-4">
        <div className="font-mono text-xs uppercase tracking-widest text-maroon-700 font-bold mb-1">{content.ministries.label}</div>
        <ul className="text-lg text-charcoal-800 font-sans space-y-1">
          {content.ministries.value.map((ministry, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-maroon-700" />
              <span>{ministry}</span>
            </li>
          ))}
        </ul>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}
