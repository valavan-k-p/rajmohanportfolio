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
      badge: 'Policy Initiative',
      statLabel: 'Schools planned statewide',
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
      badge: 'கொள்கை முன்முயற்சி',
      statLabel: 'மாநிலம் முழுவதும் திட்டமிடப்பட்ட பள்ளிகள்',
    },
  }[locale] || {
    p1: '', list: [], pilotTitle: '', pilotBody: '', badge: '', statLabel: ''
  };

  return (
    <div className="relative mt-8 mb-24">
      {/* Delicate background rule */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-[41.666%] w-px bg-sand-200/50" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
        
        {/* Left column: Cinematic Focus Block */}
        <div className="lg:col-span-5 relative z-10 lg:pt-16">
          <MlaReveal y={40} className="bg-charcoal-900 p-10 md:p-14 shadow-2xl relative overflow-hidden group hover:shadow-red-900/10 transition-shadow duration-700">
            {/* Cinematic subtle glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 transition-opacity duration-1000 group-hover:opacity-100 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-900/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 transition-opacity duration-1000 group-hover:opacity-100 opacity-30 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-8 h-px bg-red-500/80" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-red-400 font-medium">{content.badge}</span>
            </div>
            
            <h3 className="font-display text-4xl md:text-5xl text-sand-50 mb-6 leading-tight relative z-10">
              {content.pilotTitle}
            </h3>
            
            <p className="text-sand-100/70 leading-relaxed font-light mb-14 text-lg relative z-10">
              {content.pilotBody}
            </p>
            
            <div className="pt-8 border-t border-white/10 relative z-10 flex items-baseline gap-4">
              <div className="font-display text-6xl text-white tracking-tight">
                <MlaCounter value={5000} />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-sand-200/50 max-w-[100px] leading-relaxed">
                {content.statLabel}
              </div>
            </div>
          </MlaReveal>
        </div>

        {/* Right column: Flowing Editorial Text */}
        <div className="lg:col-span-7 lg:pl-8 relative z-10 flex flex-col justify-center">
          <MlaReveal y={20} className="mb-14 relative">
            <h4 className="text-2xl md:text-3xl font-display text-maroon-800 leading-snug">
              &ldquo;{content.p1}&rdquo;
            </h4>
          </MlaReveal>
          
          <MlaStaggerContainer className="space-y-10">
            {content.list.map((item, idx) => (
              <MlaStaggerItem key={idx} y={20} className="flex gap-6 md:gap-8 group cursor-default">
                <div className="text-sm font-display text-red-600/40 pt-1 shrink-0 transition-colors duration-500 group-hover:text-red-600">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="relative pb-6 border-b border-sand-200 group-hover:border-red-200 transition-colors duration-700">
                  <p className="text-lg md:text-xl text-charcoal-700 leading-relaxed group-hover:text-charcoal-900 transition-colors duration-500">
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
