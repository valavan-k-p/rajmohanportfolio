import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

export function AboutEgmore({ locale }: SectionProps) {
  // We're using English for both locales as per the current implementation plan,
  // but structuring it so Tamil can be easily added later.
  const content = {
    en: {
      p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his victory in the Tamil Nadu Assembly elections.',
      p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
      p3: 'His role has involved a dual responsibility: addressing constituency-level development demands while also handling statewide responsibilities as a senior cabinet minister.',
      p4: 'From the beginning of his tenure, his constituency work has focused on long-standing civic concerns raised during the 2026 election campaign.',
      concernsHeading: 'Key concerns include:',
      concerns: [
        'Better housing tenements in Thattankulam',
        'Better housing facilities in Thideer Nagar',
        'Better housing facilities in Natesan Nagar',
        'Issuance of pattas for eligible families living on temple lands',
        'Modernisation of stormwater drains',
        'Improvement of sewer networks',
        'Relaying damaged roads in Choolai',
        'Relaying damaged roads in Periamet',
      ],
      p5: 'His MLA role involves coordination with municipal authorities and state departments to prioritise infrastructure upgrades.',
      presenceHeading: 'His constituency presence has included:',
      presence: [
        'Public meetings',
        'Ward-level interactions',
        'Civic inspections',
        'Follow-up on pending projects',
        'Engagement around accountability in civic works',
      ],
    },
    ta: {
      p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his victory in the Tamil Nadu Assembly elections.',
      p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
      p3: 'His role has involved a dual responsibility: addressing constituency-level development demands while also handling statewide responsibilities as a senior cabinet minister.',
      p4: 'From the beginning of his tenure, his constituency work has focused on long-standing civic concerns raised during the 2026 election campaign.',
      concernsHeading: 'Key concerns include:',
      concerns: [
        'Better housing tenements in Thattankulam',
        'Better housing facilities in Thideer Nagar',
        'Better housing facilities in Natesan Nagar',
        'Issuance of pattas for eligible families living on temple lands',
        'Modernisation of stormwater drains',
        'Improvement of sewer networks',
        'Relaying damaged roads in Choolai',
        'Relaying damaged roads in Periamet',
      ],
      p5: 'His MLA role involves coordination with municipal authorities and state departments to prioritise infrastructure upgrades.',
      presenceHeading: 'His constituency presence has included:',
      presence: [
        'Public meetings',
        'Ward-level interactions',
        'Civic inspections',
        'Follow-up on pending projects',
        'Engagement around accountability in civic works',
      ],
    },
  }[locale];

  return (
    <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-red-600 space-y-6">
      <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p3}</p></MlaStaggerItem>
      <MlaStaggerItem><p>{content.p4}</p></MlaStaggerItem>

      <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.concernsHeading}</h3></MlaStaggerItem>
      <ul className="list-disc pl-6 space-y-2">
        {content.concerns.map((item, index) => (
          <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
        ))}
      </ul>

      <MlaStaggerItem><p className="mt-8">{content.p5}</p></MlaStaggerItem>

      <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.presenceHeading}</h3></MlaStaggerItem>
      <ul className="list-disc pl-6 space-y-2">
        {content.presence.map((item, index) => (
          <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
        ))}
      </ul>
    </MlaStaggerContainer>
  );
}
