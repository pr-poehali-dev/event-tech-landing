import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_GALA = "https://cdn.poehali.dev/projects/0543cd19-8c4b-447b-af5e-1bf0504c2dc7/files/b4ab4e7d-15ff-4217-9137-2e649ece655b.jpg";
const IMG_FESTIVAL = "https://cdn.poehali.dev/projects/0543cd19-8c4b-447b-af5e-1bf0504c2dc7/files/b5ced6e0-e8bb-4c86-8f9b-fa9b847f258c.jpg";
const IMG_CONFERENCE = "https://cdn.poehali.dev/projects/0543cd19-8c4b-447b-af5e-1bf0504c2dc7/files/3dcccac3-148d-4429-9e09-5b4e500868e9.jpg";

const partners = [
  { name: "BrandCo", desc: "Стратегический партнёр", logo: "🏢" },
  { name: "MediaMax", desc: "Медиа-производство", logo: "📡" },
  { name: "LightPro", desc: "Световое оборудование", logo: "💡" },
  { name: "SoundWave", desc: "Звуковые технологии", logo: "🎵" },
  { name: "TechVision", desc: "Видеопроизводство", logo: "🎬" },
  { name: "FlowerArt", desc: "Флористика и декор", logo: "🌸" },
];

const services = [
  { icon: "Star", title: "Корпоративные события", desc: "Конференции, форумы, тимбилдинги и корпоративы. Организуем под ключ с полным сопровождением.", color: "#FF5C1A" },
  { icon: "Music", title: "Фестивали и концерты", desc: "Масштабные публичные мероприятия с профессиональным звуком, светом и сценографией.", color: "#FF1A8C" },
  { icon: "Heart", title: "Частные мероприятия", desc: "Свадьбы, юбилеи, вечеринки. Каждое событие — уникальная история, рассказанная в деталях.", color: "#FFD600" },
  { icon: "Globe", title: "Онлайн и гибридные", desc: "Трансляции, виртуальные конференции и гибридные форматы для аудитории по всему миру.", color: "#00D4FF" },
  { icon: "Camera", title: "Фото и видеосъёмка", desc: "Профессиональная съёмка и монтаж. Ваши события останутся в памяти навсегда.", color: "#A855F7" },
  { icon: "Palette", title: "Декор и сценография", desc: "Концептуальный дизайн пространства, флористика, инсталляции и световые шоу.", color: "#10B981" },
];

const portfolio = [
  { img: IMG_GALA, title: "Гала-ужин «Звёздная ночь»", category: "Корпоратив", year: "2024" },
  { img: IMG_FESTIVAL, title: "Фестиваль NEON FEST", category: "Фестиваль", year: "2024" },
  { img: IMG_CONFERENCE, title: "TechSummit 2024", category: "Конференция", year: "2024" },
];

const stats = [
  { num: "500+", label: "Событий проведено" },
  { num: "12", label: "Лет на рынке" },
  { num: "98%", label: "Довольных клиентов" },
  { num: "40+", label: "Городов России" },
];

const spotlights = [
  { left: "8%",  delay: 0,    color: "#FF5C1A", angle: -18, intensity: 0.55 },
  { left: "22%", delay: 0.8,  color: "#FF1A8C", angle: -6,  intensity: 0.45 },
  { left: "38%", delay: 1.6,  color: "#FFD600", angle:  4,  intensity: 0.5  },
  { left: "55%", delay: 0.4,  color: "#FF5C1A", angle: -2,  intensity: 0.6  },
  { left: "70%", delay: 1.2,  color: "#FF1A8C", angle:  8,  intensity: 0.45 },
  { left: "84%", delay: 2.0,  color: "#FFD600", angle:  16, intensity: 0.5  },
];

const StageLights = ({ mouseX, mouseY, sectionRef }: {
  mouseX: number;
  mouseY: number;
  sectionRef: React.RefObject<HTMLElement>;
}) => {
  const [angles, setAngles] = useState(spotlights.map((s) => s.angle));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    setAngles(spotlights.map((s, i) => {
      if (i !== 3) return s.angle;
      const fixtureX = (parseFloat(s.left) / 100) * rect.width + rect.left;
      const fixtureY = rect.top;
      const dx = mouseX - fixtureX;
      const dy = mouseY - fixtureY;
      const raw = Math.atan2(dx, dy) * (180 / Math.PI);
      return Math.max(-45, Math.min(45, raw));
    }));
  }, [mouseX, mouseY, sectionRef]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/8" />

      {spotlights.map((s, i) => {
        const isTracking = i === 3;
        const angle = angles[i];
        return (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: s.left,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
              transition: isTracking ? "transform 0.12s ease-out" : undefined,
              animation: !isTracking
                ? `spotlight-flicker ${3.5 + i * 0.7}s ease-in-out infinite`
                : undefined,
              animationDelay: `${s.delay}s`,
            }}
          >
            {/* Fixture head */}
            <div
              className="w-5 h-3 rounded-b-sm mx-auto"
              style={{
                background: isTracking
                  ? "linear-gradient(to bottom, #3a2a1a, #1a0a00)"
                  : "linear-gradient(to bottom, #2a2a2a, #111)",
                boxShadow: `0 2px 10px ${s.color}${isTracking ? "cc" : "60"}`,
                marginLeft: "-10px",
              }}
            />
            {/* Beam cone */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "55px solid transparent",
                borderRight: "55px solid transparent",
                borderTop: `520px solid ${s.color}`,
                opacity: s.intensity * (isTracking ? 0.35 : 0.22),
                filter: `blur(${isTracking ? 14 : 18}px)`,
                marginLeft: "-45px",
              }}
            />
            {/* Inner bright core */}
            <div
              className="absolute top-3"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent",
                borderTop: `400px solid ${s.color}`,
                opacity: s.intensity * (isTracking ? 0.6 : 0.35),
                filter: `blur(${isTracking ? 4 : 6}px)`,
                marginLeft: "-8px",
              }}
            />
            {/* Floor glow pool */}
            <div
              className="absolute"
              style={{
                top: "510px",
                left: "50%",
                transform: "translateX(-50%)",
                width: isTracking ? "180px" : "140px",
                height: isTracking ? "80px" : "60px",
                borderRadius: "50%",
                background: `radial-gradient(ellipse, ${s.color}${isTracking ? "55" : "35"} 0%, transparent 70%)`,
                filter: "blur(12px)",
                transition: "width 0.12s ease-out, height 0.12s ease-out",
              }}
            />
          </div>
        );
      })}

      {/* Cursor spotlight glow */}
      {mouseX > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mouseX - (sectionRef.current?.getBoundingClientRect().left ?? 0) - 80,
            top: mouseY - (sectionRef.current?.getBoundingClientRect().top ?? 0) - 80,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FF5C1A22 0%, transparent 70%)",
            filter: "blur(8px)",
            transition: "left 0.08s ease-out, top 0.08s ease-out",
          }}
        />
      )}
    </div>
  );
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const NavBar = ({ onNav }: { onNav: (s: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "services", label: "Услуги" },
    { id: "portfolio", label: "Портфолио" },
    { id: "about", label: "О нас" },
    { id: "partners", label: "Партнёры" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/5" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display font-black text-xl tracking-tight">
          <span className="text-gradient-orange">ARTSTAGE</span>
          <span className="text-white/50">.PRO</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { onNav(l.id); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
              className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-[#FF5C1A] to-[#FF1A8C] text-white font-display font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Обсудить проект
          </button>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#10101A]/98 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setMobileOpen(false); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-left font-body text-white/70 hover:text-white transition-colors py-2"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default function Index() {
  const [, setActiveSection] = useState("hero");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  useReveal();

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-body">
      <NavBar onNav={setActiveSection} />

      {/* HERO */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <StageLights mouseX={mouse.x} mouseY={mouse.y} sectionRef={heroRef} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#FF5C1A]/15 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#FF1A8C]/15 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFD600]/5 blur-[160px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 text-sm text-white/60 font-body animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#FF5C1A] animate-pulse" />
            Event-агентство полного цикла
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tight animate-fade-up">
            <span className="text-gradient-orange">ARTSTAGE</span>
            <span className="text-white/30">.PRO</span>
            <br />
            <span className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">МЫ СОЗДАЁМ СОБЫТИЯ,</span>
            <br />
            <span className="text-gradient-yellow">О КОТОРЫХ ГОВОРЯТ</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            От идеи до воплощения. Корпоративы, фестивали, конференции и приватные мероприятия под ключ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-[#FF5C1A] to-[#FF1A8C] text-white font-display font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-all hover:scale-105 glow-orange"
            >
              Обсудить проект
            </button>
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/20 text-white font-display font-bold px-8 py-4 rounded-full text-sm hover:border-[#FF5C1A]/50 transition-all hover:bg-white/5"
            >
              Наши работы →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            {stats.map((s) => (
              <div key={s.num} className="text-center">
                <div className="font-display font-black text-3xl md:text-4xl text-gradient-orange">{s.num}</div>
                <div className="text-white/40 text-sm mt-1 font-body">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-white/5 bg-[#10101A] py-4">
        <div className="flex gap-12 animate-ticker whitespace-nowrap">
          {["КОРПОРАТИВЫ", "ФЕСТИВАЛИ", "КОНФЕРЕНЦИИ", "СВАДЬБЫ", "КОНЦЕРТЫ", "ФОРУМЫ", "ПРЕЗЕНТАЦИИ", "ГАЛА-ВЕЧЕРА",
            "КОРПОРАТИВЫ", "ФЕСТИВАЛИ", "КОНФЕРЕНЦИИ", "СВАДЬБЫ", "КОНЦЕРТЫ", "ФОРУМЫ", "ПРЕЗЕНТАЦИИ", "ГАЛА-ВЕЧЕРА"].map((t, i) => (
            <span key={i} className="font-display font-black text-sm tracking-widest text-white/15 flex items-center gap-12">
              {t} <span className="text-[#FF5C1A]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto section-reveal">
        <div className="mb-16">
          <div className="text-[#FF5C1A] font-display text-sm font-bold tracking-widest uppercase mb-4">Что мы делаем</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            Наши <span className="text-gradient-orange">услуги</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card-hover group relative bg-[#10101A] border border-white/5 rounded-2xl p-7 overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}15, transparent 70%)` }}
              />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                <Icon name={s.icon} size={22} />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-body">{s.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-display font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                Подробнее <Icon name="ArrowRight" size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 bg-[#10101A]/50 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-[#FF1A8C] font-display text-sm font-bold tracking-widest uppercase mb-4">Наши работы</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-black text-4xl md:text-5xl text-white">
                Портфолио <span className="text-gradient-orange">проектов</span>
              </h2>
              <button className="self-start border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-display font-bold text-sm px-5 py-2.5 rounded-full transition-all">
                Все проекты →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer card-hover">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-display font-bold text-[#FF5C1A] bg-[#FF5C1A]/10 border border-[#FF5C1A]/20 px-3 py-1 rounded-full">{p.category}</span>
                    <span className="text-xs text-white/30">{p.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto section-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#FFD600] font-display text-sm font-bold tracking-widest uppercase mb-4">О компании</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              12 лет создаём
              <br />
              <span className="text-gradient-yellow">незабываемые</span>
              <br />
              моменты
            </h2>
            <p className="text-white/50 leading-relaxed mb-6 font-body">
              Мы — команда профессионалов, влюблённых в своё дело. С 2012 года создаём события, которые объединяют людей, вдохновляют и остаются в памяти на годы.
            </p>
            <p className="text-white/50 leading-relaxed mb-10 font-body">
              От небольших корпоративов до масштабных городских фестивалей — мы подходим к каждому проекту с одинаковой страстью и вниманием к деталям.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Полный цикл", "Команда 50+", "Работаем 24/7", "Своё оборудование"].map((tag) => (
                <span key={tag} className="bg-white/5 border border-white/10 text-white/60 text-sm font-body px-4 py-2 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#16162A] border border-white/5 rounded-2xl p-6 col-span-2">
                <div className="font-display font-black text-5xl text-gradient-orange mb-2">500+</div>
                <div className="text-white/50 font-body">успешно реализованных проектов в России и СНГ</div>
              </div>
              <div className="bg-gradient-to-br from-[#FF5C1A]/20 to-[#FF1A8C]/10 border border-[#FF5C1A]/20 rounded-2xl p-6">
                <div className="font-display font-black text-3xl text-white mb-2">98%</div>
                <div className="text-white/50 text-sm font-body">клиентов возвращаются снова</div>
              </div>
              <div className="bg-[#16162A] border border-white/5 rounded-2xl p-6">
                <div className="font-display font-black text-3xl text-[#FFD600] mb-2">40+</div>
                <div className="text-white/50 text-sm font-body">городов присутствия</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-[#FF1A8C]/10 blur-[60px]" />
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24 px-6 bg-[#10101A]/50 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#FF5C1A] font-display text-sm font-bold tracking-widest uppercase mb-4">Экосистема</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white">
              Наши <span className="text-gradient-orange">партнёры</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto font-body">
              Работаем с лучшими в индустрии, чтобы гарантировать высочайшее качество каждого события
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((p, i) => (
              <div key={i} className="card-hover group bg-[#10101A] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-[#FF5C1A]/20 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#16162A] to-[#1E1E35] border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:border-[#FF5C1A]/30 transition-colors">
                  {p.logo}
                </div>
                <div>
                  <div className="font-display font-bold text-white mb-1">{p.name}</div>
                  <div className="text-white/40 text-sm font-body">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/30 text-sm font-body">
              Хотите стать нашим партнёром?{" "}
              <button onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })} className="text-[#FF5C1A] hover:underline">
                Напишите нам
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 section-reveal">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#FF1A8C] font-display text-sm font-bold tracking-widest uppercase mb-4">Свяжитесь с нами</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6">
            Давайте создадим
            <br />
            <span className="text-gradient-orange">что-то грандиозное</span>
          </h2>
          <p className="text-white/40 mb-12 max-w-lg mx-auto font-body leading-relaxed">
            Расскажите о вашем событии — мы свяжемся в течение часа и предложим концепцию.
          </p>
          <div className="bg-[#10101A] border border-white/5 rounded-3xl p-8 md:p-10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-white/40 text-sm font-body mb-2 block">Ваше имя</label>
                <input className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20" placeholder="Александр" />
              </div>
              <div>
                <label className="text-white/40 text-sm font-body mb-2 block">Телефон или e-mail</label>
                <input className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20" placeholder="+7 (999) 000-00-00" />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-white/40 text-sm font-body mb-2 block">Тип события</label>
              <select className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white/70 font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors">
                <option value="">Выберите формат...</option>
                <option>Корпоратив</option>
                <option>Фестиваль / концерт</option>
                <option>Конференция</option>
                <option>Свадьба</option>
                <option>Другое</option>
              </select>
            </div>
            <div className="mb-8">
              <label className="text-white/40 text-sm font-body mb-2 block">Расскажите о проекте</label>
              <textarea rows={4} className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20 resize-none" placeholder="Дата, количество гостей, формат, бюджет..." />
            </div>
            <button className="w-full bg-gradient-to-r from-[#FF5C1A] to-[#FF1A8C] text-white font-display font-bold py-4 rounded-xl text-base hover:opacity-90 transition-all hover:scale-[1.01] glow-orange">
              Отправить заявку
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/30 text-sm font-body">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-[#FF5C1A]" />
              <span>+7 (800) 000-00-00</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-[#FF5C1A]" />
              <span>hello@eventstudio.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-[#FF5C1A]" />
              <span>Москва, ул. Тверская, 12</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-lg">
            <span className="text-gradient-orange">ARTSTAGE</span>
            <span className="text-white/50">.PRO</span>
          </div>
          <div className="text-white/20 text-sm font-body text-center">© 2024 ARTSTAGE.PRO. Все права защищены.</div>
          <div className="flex gap-4">
            {[
              { icon: "Instagram", label: "Instagram" },
              { icon: "Send", label: "Telegram" },
              { icon: "Youtube", label: "YouTube" },
            ].map((s) => (
              <button key={s.label} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/30 transition-colors">
                <Icon name={s.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}