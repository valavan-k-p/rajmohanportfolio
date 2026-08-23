import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaReveal } from './MlaMotion';

export function EducationInitiatives({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan’s role as School Education Minister directly informs his constituency work in Egmore, creating a bridge between statewide policy and local implementation.',
      list: [
        'Inauguration of the Neer Ezhil Palli water conservation project.',
        'Distribution of new benches and desks at Presidency Girls Higher Secondary School under a CSR initiative.',
        'Advocacy for technology-enabled classrooms in local government schools.',
        'Focus on teacher training and capacity building.',
      ],
      pilotTitle: 'Technology & Future Skills',
      pilotBody: 'As part of a broader statewide policy, a pilot initiative has been announced to introduce AI, coding, and AR/VR modules in 5,000 government schools. Within Egmore, this translates into advocacy for early adoption of these technology-enabled classrooms and enhanced teacher training to prepare students for future skills.',
    },
    ta: {
      p1: 'பள்ளிக் கல்வித் துறை அமைச்சராக ராஜ்மோகனின் பங்கு, எழும்பூரில் உள்ள அவரது தொகுதிப் பணிகளை நேரடியாக வழிநடத்துகிறது. இது மாநில அளவிலான கொள்கைக்கும் உள்ளூர்ச் செயலாக்கத்திற்கும் இடையே ஒரு பாலத்தை உருவாக்குகிறது.',
      list: [
        'நீர் எழில் பள்ளி நீர் பாதுகாப்பு திட்டத்தின் திறப்பு விழா.',
        'CSR முன்முயற்சியின் கீழ் மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளியில் புதிய பெஞ்சுகள் மற்றும் மேசைகள் விநியோகம்.',
        'உள்ளூர் அரசுப் பள்ளிகளில் தொழில்நுட்ப வசதியுடன் கூடிய வகுப்பறைகளுக்கான பரிந்துரை.',
        'ஆசிரியர் பயிற்சி மற்றும் திறன் மேம்பாட்டில் கவனம் செலுத்துதல்.',
      ],
      pilotTitle: 'தொழில்நுட்பம் & எதிர்காலத் திறன்கள்',
      pilotBody: 'மாநில அளவிலான பரந்த கொள்கையின் ஒரு பகுதியாக, 5,000 அரசுப் பள்ளிகளில் செயற்கை நுண்ணறிவு, குறியீட்டு முறை மற்றும் AR/VR தொகுதிகளை அறிமுகப்படுத்துவதற்கான ஒரு முன்னோடித் திட்டம் அறிவிக்கப்பட்டுள்ளது. எழும்பூரைப் பொறுத்தவரை, எதிர்காலத் திறன்களுக்காக மாணவர்களைத் தயார்படுத்த, இந்த தொழில்நுட்ப வசதியுடன் கூடிய வகுப்பறைகளை முன்கூட்டியே ஏற்றுக்கொள்வதற்கும் மேம்பட்ட ஆசிரியர் பயிற்சிக்கும் பரிந்துரை செய்வதாக இது அமைகிறது.',
    },
  }[locale];

  return (
    <MlaStaggerContainer className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
      <MlaStaggerItem className="bg-sand-100 p-8 border-l-4 border-red-500">
        <h3 className="font-display text-2xl text-charcoal-900 mb-4">{content.pilotTitle}</h3>
        <p className="text-charcoal-700 leading-relaxed">{content.pilotBody}</p>
        <div className="mt-8 text-sm uppercase tracking-widest text-red-600 font-medium">Policy Initiative</div>
        <MlaReveal scale={0.96}>
          <div className="font-display text-4xl text-charcoal-900 mt-1">5,000 <span className="text-xl font-sans text-charcoal-600 font-light lowercase">schools planned statewide</span></div>
        </MlaReveal>
      </MlaStaggerItem>

      <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-red-600">
        <MlaStaggerItem><p className="text-xl leading-relaxed mb-8">{content.p1}</p></MlaStaggerItem>
        <ul className="list-disc pl-6 space-y-4">
          {content.list.map((item, idx) => (
            <MlaStaggerItem key={idx} y={0} x={15}><li>{item}</li></MlaStaggerItem>
          ))}
        </ul>
      </MlaStaggerContainer>
    </MlaStaggerContainer>
  );
}
