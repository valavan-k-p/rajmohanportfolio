import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaHoverCard, MlaReveal } from './MlaMotion';
import { Home, Route, BookOpen, Users } from 'lucide-react';

export function ConstituencyPriorities({ locale }: SectionProps) {
  const content = {
    en: [
      {
        title: 'Housing',
        icon: Home,
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
        icon: Route,
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
        icon: BookOpen,
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
        icon: Users,
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
        icon: Home,
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
        icon: Route,
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
        icon: BookOpen,
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
        icon: Users,
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
    <MlaStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {content.map((category, idx) => (
        <MlaStaggerItem key={idx} y={25} className="h-full">
          <MlaHoverCard className="h-full group">
            <div className="bg-white p-6 border border-sand-300 rounded-xs shadow-xs h-full transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-maroon-700 group-hover:shadow-md relative overflow-hidden">
              {/* Maroon accent line that expands on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-maroon-700 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              
              <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-sand-200">
                <MlaReveal 
                  scale={0.92}
                  y={0}
                  className="text-maroon-700 transition-transform duration-500 ease-out group-hover:[transform:rotate(5deg)_scale(1.1)]"
                >
                  <div>
                    <category.icon size={22} strokeWidth={1.5} />
                  </div>
                </MlaReveal>
                <h3 className="text-xl font-display text-charcoal-900 tracking-tight font-medium group-hover:text-maroon-800 transition-colors">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-charcoal-700 text-sm font-sans flex items-start gap-2.5 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon-700/80 mt-1.5 shrink-0" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
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
