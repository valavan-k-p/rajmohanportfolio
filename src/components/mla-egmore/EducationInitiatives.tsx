import type { SectionProps } from './SectionMapper';
import { MlaReveal, MlaStaggerContainer, MlaStaggerItem, MlaCounter } from './MlaMotion';

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
    <div className="relative mt-4 mb-16">
      {/* Delicate background rule */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-[41.666%] w-px bg-sand-300" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
        
        {/* Left column: Focus Block */}
        <div className="lg:col-span-5 relative z-10 lg:pt-10">
          <MlaReveal y={40} className="bg-charcoal-900 p-8 md:p-10 shadow-md border-t-4 border-maroon-700 rounded-xs relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-6 h-px bg-yellow-400" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-400 font-bold">Policy Initiative</span>
            </div>
            
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight relative z-10 font-bold">
              {content.pilotTitle}
            </h3>
            
            <p className="text-sand-200/90 leading-relaxed font-sans font-light mb-10 text-sm sm:text-base relative z-10">
              {content.pilotBody}
            </p>
            
            <div className="pt-6 border-t border-charcoal-700 relative z-10 flex items-baseline gap-4">
              <div className="font-display text-5xl md:text-6xl text-white font-bold tracking-tight">
                <MlaCounter value={5000} />
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-sand-300 leading-snug">
                Schools planned statewide
              </div>
            </div>
          </MlaReveal>
        </div>

        {/* Right column: Flowing Editorial Text */}
        <div className="lg:col-span-7 lg:pl-6 relative z-10 flex flex-col justify-center">
          <MlaReveal y={20} className="mb-10 relative">
            <h4 className="text-xl md:text-2xl font-display text-charcoal-950 leading-relaxed italic font-normal">
              &ldquo;{content.p1}&rdquo;
            </h4>
          </MlaReveal>
          
          <MlaStaggerContainer className="space-y-6">
            {content.list.map((item, idx) => (
              <MlaStaggerItem key={idx} y={20} className="flex gap-4 md:gap-6 group cursor-default">
                <div className="font-mono text-xs font-bold text-maroon-700 bg-sand-100 px-2 py-0.5 border border-sand-300 h-fit shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="relative pb-4 border-b border-sand-200 group-hover:border-maroon-700/50 transition-colors duration-500 w-full">
                  <p className="text-base text-charcoal-800 font-sans leading-relaxed">
                    {item}
                  </p>
                </div>
              </MlaStaggerItem>
            ))}
          </MlaStaggerContainer>
        </div>
      </div>
    </div>
  );
}
