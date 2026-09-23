import { SCHOOL } from '@/lib/content';

export const metadata = {
  title: 'Contact & visit',
  description:
    'Contact and visit information for National High School, Bagodar, Giridih, Jharkhand. Phone, email, and how to reach the campus.',
};

export default function ContactPage() {
  const mapEmbed =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    // default: embedded map search for "Bagodar Giridih Jharkhand"
    'https://www.google.com/maps?q=Bagodar+Giridih+Jharkhand&output=embed';

  return (
    <>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Contact & visit</div>
              <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                Come see us. Or call.
              </h1>
              <p className="mt-5 text-lg text-slate-700 max-w-reading">
                Office hours are {SCHOOL.hours.office}. The principal is available in person between 09:00 and 11:00 on weekdays. For admissions, the dedicated window is {SCHOOL.hours.admissions}.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-12 gap-10">
            {/* Contact details */}
            <div className="col-span-12 md:col-span-5 space-y-8">
              <div>
                <div className="eyebrow">Address</div>
                <p className="mt-2 text-lg text-ink leading-snug">
                  National High School<br />
                  Main Road, Dama, Aoura (Aura)<br />
                  Bagodar, Giridih<br />
                  Jharkhand — {SCHOOL.pincode}
                </p>
              </div>

              <div>
                <div className="eyebrow">Telephone</div>
                <ul className="mt-2 space-y-1">
                  {SCHOOL.phones.map((p) => (
                    <li key={p}>
                      <a href={`tel:${p.replace(/\s/g, '')}`} className="text-lg text-ink hover:text-forest-800">
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="eyebrow">WhatsApp</div>
                <a
                  href={`https://wa.me/${SCHOOL.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="mt-2 inline-flex items-center gap-2 text-lg text-forest-800 hover:text-amber-600"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.4 0 0 5.4 0 12.06a12 12 0 0 0 1.66 6.07L0 24l5.99-1.57a12.05 12.05 0 0 0 6.07 1.55h.01c6.66 0 12.06-5.4 12.06-12.06a12 12 0 0 0-3.61-8.44ZM12.06 21.91h-.01a9.91 9.91 0 0 1-5.05-1.39l-.36-.21-3.55.93.95-3.46-.24-.36a9.91 9.91 0 0 1-1.51-5.31c0-5.49 4.46-9.95 9.95-9.95a9.85 9.85 0 0 1 7.04 2.92 9.85 9.85 0 0 1 2.91 7.04c0 5.49-4.46 9.94-9.95 9.94Zm5.45-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.46a8.95 8.95 0 0 1-1.65-2.04c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.5l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <div className="eyebrow">Email</div>
                <a href={`mailto:${SCHOOL.email}`} className="mt-2 text-lg text-ink hover:text-forest-800">
                  {SCHOOL.email}
                </a>
              </div>

              <div>
                <div className="eyebrow">Office hours</div>
                <ul className="mt-2 text-base text-ink space-y-1">
                  <li className="flex justify-between"><span>Mon–Fri</span><span>08:00 – 16:30</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span>09:00 – 14:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="text-slate-500">Closed</span></li>
                </ul>
              </div>

              <div className="card-hair bg-sand-100">
                <div className="eyebrow text-amber-600 mb-2">From Giridih town</div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Take NH-114A south from Giridih town toward Bagodar. At Bagodar town, follow the signs for Dama (about 3 km east). The school is on the main road at Aoura — look for the green and yellow gate on your left. By auto-rickshaw from Bagodar stand: ₹40.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="col-span-12 md:col-span-7">
              <div className="border border-rule aspect-[4/3] md:aspect-auto md:h-full min-h-[360px] bg-sand-100">
                <iframe
                  src={mapEmbed}
                  title="Map showing the location of National High School, Bagodar"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Map embeds are interactive. If unavailable, open in{' '}
                <a
                  className="underline underline-offset-2 text-forest-800"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Bagodar Giridih Jharkhand')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}