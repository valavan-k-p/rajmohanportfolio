import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaHoverCard } from './MlaMotion';

export function ConstituencyPriorities({ locale }: SectionProps) {
  const content = {
    en: [
      {
        title: 'Housing',
        items: [
          'Housing tenements',
          'Settlement regularisation',
          'Pattas for eligible families',
          'Thattankulam',
          'Thideer Nagar',
          'Natesan Nagar',
        ],
      },
      {
        title: 'Urban Infrastructure',
        items: [
          'Stormwater drains',
          'Sewer networks',
          'Road restoration',
          'Flood mitigation',
          'Water supply',
        ],
      },
      {
        title: 'Education',
        items: [
          'Government school infrastructure',
          'Technology-enabled classrooms',
          'Teacher training',
          'AI and coding initiatives',
          'Water conservation in schools',
        ],
      },
      {
        title: 'Civic Responsiveness',
        items: [
          'Ward-level inspections',
          'Resident interaction',
          'Grievance redressal',
          'Coordination with civic authorities',
        ],
      },
    ],
    ta: [
      {
        title: 'வீட்டுவசதி',
        items: [
          'வீட்டு வசதி வாரிய குடியிருப்புகள்',
          'குடியிருப்பு முறைப்படுத்தல்',
          'தகுதியான குடும்பங்களுக்கு பட்டா',
          'தட்டான் குளம்',
          'திடீர் நகர்',
          'நடேசன் நகர்',
        ],
      },
      {
        title: 'நகர்ப்புற உள்கட்டமைப்பு',
        items: [
          'மழைநீர் வடிகால்கள்',
          'கழிவுநீர் வலைப்பின்னல்கள்',
          'சாலை சீரமைப்பு',
          'வெள்ளத் தடுப்பு',
          'நீர் வழங்கல்',
        ],
      },
      {
        title: 'கல்வி',
        items: [
          'அரசுப் பள்ளி உள்கட்டமைப்பு',
          'தொழில்நுட்ப வசதியுடன் கூடிய வகுப்பறைகள்',
          'ஆசிரியர் பயிற்சி',
          'செயற்கை நுண்ணறிவு மற்றும் குறியீட்டு முன்முயற்சிகள்',
          'பள்ளிகளில் நீர் பாதுகாப்பு',
        ],
      },
      {
        title: 'குடிமைப் பொறுப்புணர்வு',
        items: [
          'வார்டு அளவிலான ஆய்வுகள்',
          'குடியிருப்பாளர் தொடர்பு',
          'குறை தீர்க்கும் நடவடிக்கை',
          'குடிமை அதிகாரிகளுடனான ஒருங்கிணைப்பு',
        ],
      },
    ],
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {content.map((category, idx) => (
        <MlaStaggerItem key={idx} y={25} className="h-full">
          <MlaHoverCard className="h-full">
            <div className="bg-sand-50 p-6 border border-sand-300 shadow-sm h-full">
              <h3 className="font-display text-xl text-maroon-800 mb-4 pb-2 border-b border-red-200">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-charcoal-700 flex items-start gap-2">
                    <span className="text-red-500 mt-1.5 leading-none shrink-0" aria-hidden="true">■</span>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MlaHoverCard>
        </MlaStaggerItem>
      ))}
    </MlaStaggerContainer>
  );
}
