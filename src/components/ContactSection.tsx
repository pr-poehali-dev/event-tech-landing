import Icon from "@/components/ui/icon";

const ContactSection = () => (
  <>
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
              <input
                className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20"
                placeholder="Александр"
              />
            </div>
            <div>
              <label className="text-white/40 text-sm font-body mb-2 block">Телефон или e-mail</label>
              <input
                className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20"
                placeholder="+7 (999) 000-00-00"
              />
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
            <textarea
              rows={4}
              className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-[#FF5C1A]/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="Дата, количество гостей, формат, бюджет..."
            />
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
  </>
);

export default ContactSection;
