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
    <MlaStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left max-w-4xl mx-auto">
      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.name.label}</div>
        <div className="text-2xl font-display text-charcoal-900 group-hover:translate-x-1 transition-transform duration-500">{content.name.value}</div>
      </MlaStaggerItem>
      
      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.constituency.label}</div>
        <div className="text-2xl font-display text-charcoal-900 group-hover:translate-x-1 transition-transform duration-500">{content.constituency.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.role.label}</div>
        <div className="text-xl text-charcoal-800 group-hover:translate-x-1 transition-transform duration-500">{content.role.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.tenure.label}</div>
        <div className="text-xl text-charcoal-800 group-hover:translate-x-1 transition-transform duration-500">{content.tenure.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.party.label}</div>
        <div className="text-xl text-charcoal-800 group-hover:translate-x-1 transition-transform duration-500">{content.party.value}</div>
      </MlaStaggerItem>

      <MlaStaggerItem className="relative p-6 md:p-8 bg-white/40 backdrop-blur-sm border border-sand-200/80 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-maroon-900/5 group overflow-hidden" y={30}><div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600 transition-all duration-700 ease-out group-hover:w-full" />
        <div className="text-sm uppercase tracking-widest text-maroon-700 font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{content.ministries.label}</div>
        <ul className="text-xl text-charcoal-800 space-y-1.5 group-hover:translate-x-1 transition-transform duration-500">
          {content.ministries.value.map((ministry, idx) => (
            <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400/60 group-hover:bg-red-500 transition-colors duration-500" />{ministry}</li>
          ))}
        </ul>
      </MlaStaggerItem>
    </MlaStaggerContainer>
  );
}


