import Link from 'next/link';
import Image from 'next/image';
import { SCHOOL, PROGRAMS, COMMITMENTS, TIMELINE, SCHOLARSHIPS, TESTIMONIALS, BUS_ROUTES, PUBLIC_NOTICES_SAMPLE } from '@/lib/content';
import { HERO_IMAGES, imgUrl, getImagesForSection } from '@/lib/images';
import { listActiveNotices } from '@/lib/db';
import { NoticeTicker } from '@/components/site/NoticeTicker';
import { Photo } from '@/components/ui/Photo';
import { Logo } from '@/components/ui/Logo';
import { BilingualLabel } from '@/components/ui/BilingualLabel';
import { LaurelLeft, LaurelRight, AmberRule, Flourish, NhsMonogram } from '@/components/ui/Ornaments';
import { HeroCarousel } from '@/components/site/HeroCarousel';
import { CountUp } from '@/components/site/CountUp';
import { TestimonialCarousel } from '@/components/site/TestimonialCarousel';
import { Reveal } from '@/components/site/Reveal';
import { FacultySpotlight } from '@/components/site/FacultySpotlight';
import { PrincipalSpotlight } from '@/components/site/PrincipalSpotlight';

export default async function HomePage() {
  const notices = await listActiveNotices();
  const lifeAtNhs = getImagesForSection('life-at-nhs').slice(0, 8);
  const annualImages = getImagesForSection('annual-function').slice(0, 6);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="bg-paper border-b border-rule relative overflow-hidden">
        {/* Decorative watermark logo */}
        <div className="absolute -top-12 -right-12 lg:right-8 lg:top-8 w-[340px] h-[340px] lg:w-[480px] lg:h-[480px] opacity-[0.06] pointer-events-none" aria-hidden>
          <Image src="/logo-full.png" alt="" width={480} height={480} priority />
        </div>
        {/* Laurel flanks */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none text-forest-800/40" aria-hidden>
          <LaurelLeft className="w-12 h-40" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none text-forest-800/40" aria-hidden>
          <LaurelRight className="w-12 h-40" />
        </div>

        <div className="max-w-edition mx-auto px-6 pt-10 pb-14 md:pt-14 md:pb-20 relative">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 shrink-0">
                  <Logo size="nav" priority />
                </div>
                <div>
                  <div className="font-display text-sm text-forest-800 leading-none">{SCHOOL.name}</div>
                  <div className="hindi-display text-[10px] tracking-institutional uppercase text-slate-500 mt-1">
                    {SCHOOL.hindiName} · Estd. 2021
                  </div>
                </div>
              </div>
              <AmberRule className="mb-4" />
              <BilingualLabel
                en="Bagodar · Giridih · Jharkhand"
                hi="बागोदर · गिरिडीह · झारखण्ड"
              />
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mt-3 text-ink">
                {SCHOOL.name}.
                <span className="block italic text-forest-800 font-light mt-1">
                  {SCHOOL.tagline.en}
                </span>
              </h1>
              <h2 className="hindi-headline text-2xl md:text-3xl lg:text-4xl text-amber-600 mt-3 leading-[1.15]">
                {SCHOOL.tagline.hi}
              </h2>
              <div className="mt-6 grid md:grid-cols-2 gap-6 max-w-reading">
                <p className="text-slate-700 leading-relaxed">
                  One promise has held since 14 April 2021 — that no child in this region will be held back because of fee. Everything else — the syllabus, the hostel, the buses, the cultural programme — exists to make that promise hold.
                </p>
                <p className="hindi-body text-base text-slate-700 leading-relaxed">
                  14 अप्रैल 2021 से एक ही प्रतिज्ञा है — इस क्षेत्र का कोई भी बच्चा शुल्क के कारण पीछे नहीं रहेगा। पाठ्यक्रम, छात्रावास, बसें, सांस्कृतिक कार्यक्रम — सब इसी प्रतिज्ञा को पूरा करने के लिए हैं।
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/admissions" className="btn-primary">
                  Apply for admission 2026–27
                </Link>
                <Link href="/about" className="btn-secondary">
                  About the school
                </Link>
                <Link href="/gallery" className="btn-link">
                  See the campus →
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                {COMMITMENTS.slice(0, 3).map((c) => (
                  <div key={c.label} className="border-l-2 border-amber-500 pl-4">
                    <div className="font-display text-2xl text-amber-600 leading-none">{c.value}</div>
                    <div className="text-[10px] uppercase tracking-institutional text-slate-500 mt-1.5">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
              <HeroCarousel />
              <p className="text-xs text-slate-500 italic mt-6 font-display text-center">
                Photography from the school grounds · 2025–26
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== SPOTLIGHT ============================== */}
      <section className="bg-sand-100 border-b border-sand-200 relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block pointer-events-none opacity-40" aria-hidden>
          <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-amber-100/30 to-transparent" />
        </div>
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20 relative">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
              <div className="rule-accent mb-3" />
              <div className="eyebrow">Spotlight · पर प्रकाश</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                The day the school opened.
              </h2>
              <p className="hindi-sub text-base text-slate-600 mt-2">
                14 अप्रैल 2021 — विद्यालय का प्रथम दिवस
              </p>
              <p className="mt-5 text-slate-700 max-w-reading leading-relaxed">
                On 14 April 2021, forty-seven children walked through a green gate on the main road at Dama, and our school began. There was no inauguration, no ribbon-cutting — only a small photograph of the founder's class standing in front of the assembly ground, taken by a teacher with a borrowed phone.
              </p>
              <p className="mt-4 text-slate-700 max-w-reading leading-relaxed">
                Five years later we have 480 students, 14 teachers, four buses, and a hostel. The gate is the same one. The photograph is framed in the office.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <Link href="/about" className="btn-link">
                  Read the full story →
                </Link>
                <Link href="/gallery" className="btn-link">
                  See the photograph →
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden border border-rule">
                <Image
                  src="/images/independence-day-school-girls-portrait.jpeg"
                  alt="Founders' Day group photo — students and teachers outside the National High School building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover photo-warm"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/85 via-forest-900/40 to-transparent p-5">
                  <p className="font-display italic text-sand-100 text-sm leading-snug">
                    "The photograph is framed in the office."
                  </p>
                  <p className="text-xs text-sand-300 mt-1">— Founding year, 14 April 2021</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-sand-300">
                <NhsMonogram className="w-5 h-5 text-amber-600/60" />
                <Flourish className="w-32 text-amber-600/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== COUNTERS ============================== */}
      <section className="bg-forest-800 text-sand-100 border-b border-forest-900">
        <div className="max-w-edition mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { value: 47, suffix: '', label: 'Founding students, 2021', detail: '14 April 2021' },
              { value: 480, suffix: '+', label: 'Students enrolled', detail: 'Nursery to Class 10' },
              { value: 14, suffix: '', label: 'Teaching faculty', detail: 'Avg 12 yrs experience' },
              { value: 100, suffix: '%', label: 'Syllabus on time', detail: 'guaranteed every year' },
            ].map((c) => (
              <div key={c.label} className="border-l-2 border-amber-500 pl-4">
                <div className="font-display text-4xl md:text-5xl text-amber-400 leading-none">
                  <CountUp to={c.value} suffix={c.suffix} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-institutional text-sand-200 font-semibold">
                  {c.label}
                </div>
                <div className="mt-1 text-xs text-sand-300/70">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== SIX DOORS ============================== */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <Reveal className="grid grid-cols-12 gap-8 md:gap-10">
            <header className="col-span-12 md:col-span-4">
              <div className="flex items-center justify-between mb-3">
                <LaurelLeft className="w-8 h-12 text-forest-800" />
                <NhsMonogram className="w-6 h-6 text-amber-600" />
                <LaurelRight className="w-8 h-12 text-forest-800" />
              </div>
              <BilingualLabel en="Discover the school" hi="विद्यालय की खोज" />
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                Six doors. Pick one.
              </h2>
              <h3 className="hindi-headline text-xl md:text-2xl text-forest-800 mt-2">
                छह द्वार। एक चुनें।
              </h3>
              <p className="mt-5 text-slate-700 max-w-md text-sm leading-relaxed">
                The school has six centres of activity — academics, hostel, transport, the cultural programme, the library, and our outreach. Pick any to enter.
              </p>
            </header>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
                {[
                  { href: '/academics', title: 'Academics', titleHi: 'शिक्षा', image: 'annual-function-stage-boy-green-uniform-mic-01' },
                  { href: '/facilities', title: 'Facilities', titleHi: 'सुविधाएँ', image: 'annual-function-stage-boy-mic-orange-shirt-01' },
                  { href: '/gallery', title: 'Photo album', titleHi: 'फोटो एल्बम', image: 'independence-day-rally-banner-front' },
                  { href: '/facilities/transport', title: 'Bus routes', titleHi: 'बस मार्ग', image: 'independence-day-rally-students-marching' },
                  { href: '/notices', title: 'Notice board', titleHi: 'सूचना पट्ट', image: 'flag-hoisting-ceremony-flag-rising-01' },
                  { href: '/admissions', title: 'Admissions', titleHi: 'प्रवेश', image: 'chief-guest-welcome-bouquet-presentation' },
                ].map((d) => (
                  <Link key={d.href} href={d.href} className="group relative bg-paper hover:bg-sand-50 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo src={imgUrl(d.image)} alt={d.title} ratio="4/3" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-sand-100">
                        <div className="font-display text-base">{d.title}</div>
                        <div className="hindi-display text-[10px] uppercase tracking-institutional text-sand-200/80">{d.titleHi}</div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500 group-hover:text-forest-800">Open →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== PRINCIPAL ============================== */}
      <section className="bg-sand-100 border-b border-sand-200">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <PrincipalSpotlight variant="home" />
          </Reveal>
        </div>
      </section>

      {/* ============================== FACULTY SPOTLIGHT ============================== */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="eyebrow">Faculty · शिक्षक वर्ग</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                Who teaches here.
              </h2>
              <p className="hindi-sub text-base text-slate-600 mt-2">
                हमारे शिक्षक वर्ग
              </p>
            </div>
            <Link href="/faculty" className="btn-link">
              See full directory →
            </Link>
          </div>

          <FacultySpotlight count={6} />
        </div>
      </section>

      {/* ============================== LIFE AT NHS — EDITORIAL ============================== */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="eyebrow">Photographs from the campus</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                Life at N.H.S.
              </h2>
              <p className="hindi-sub text-sm text-slate-600 mt-2">
                विद्यालय प्रांगण से तस्वीरें
              </p>
            </div>
            <Link href="/gallery" className="btn-link">
              Open the full album →
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            <div className="col-span-12 md:col-span-7">
              <Photo src={imgUrl(lifeAtNhs[0])} alt="Wide photograph of the Independence Day rally at N.H.S. Bagodar" ratio="3/2" priority />
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
              {lifeAtNhs.slice(1, 5).map((stem, i) => (
                <Photo key={stem} src={imgUrl(stem)} alt={`Photograph from the school grounds — frame ${i + 2}`} ratio="square" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {lifeAtNhs.slice(4, 8).map((stem) => (
              <Photo key={stem} src={imgUrl(stem)} alt="Photograph from the school grounds" ratio="4/5" />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FOUR STAGES ============================== */}
      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <header className="max-w-2xl mb-10">
            <BilingualLabel en="Academics" hi="शिक्षा" />
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Four stages. One expectation.
            </h2>
            <h3 className="hindi-headline text-xl md:text-2xl text-forest-800 mt-2">
              चार स्तर। एक अपेक्षा।
            </h3>
            <p className="mt-4 text-slate-700">
              Every child moves through four stages. Concept-oriented learning, remedial classes for those who fall behind, syllabus completion guaranteed. We do not promise any "future-ready" or "AI-powered" framework — just basic concepts taught properly.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-rule border border-rule">
            {PROGRAMS.map((p, i) => (
              <Link key={p.stage} href="/academics" className="bg-paper p-6 flex flex-col hover:bg-sand-50 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <span className="count-badge text-3xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-institutional text-slate-500">
                    Stage {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl text-ink group-hover:text-forest-800">{p.stage}</h3>
                <p className="hindi-sub text-xs text-slate-500 mt-1">{p.stageHi}</p>
                <p className="text-xs uppercase tracking-institutional text-amber-600 mt-2">
                  {p.classes}
                </p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed flex-1">
                  {p.description}
                </p>
                <span className="btn-link mt-3 text-xs">Curriculum →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TESTIMONIALS ============================== */}
      <section className="bg-sand-100 border-b border-sand-200">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-10">
            <header className="col-span-12 md:col-span-4">
              <div className="eyebrow">What parents say</div>
              <h2 className="font-display text-3xl text-ink mt-3">
                From our community
              </h2>
              <p className="hindi-sub text-sm text-slate-600 mt-2">
                हमारे समुदाय से
              </p>
              <p className="text-sm text-slate-700 mt-5">
                Three parents agreed to share, on the condition we did not name them. Auto-cycles every seven seconds.
              </p>
            </header>
            <div className="col-span-12 md:col-span-8">
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== NOTICE BOARD ============================== */}
      <NoticeTicker items={notices} />

      {/* ============================== ANNUAL FUNCTION ============================== */}
      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10 items-start">
            <header className="col-span-12 md:col-span-5">
              <div className="eyebrow">Annual Function · वार्षिक उत्सव</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                On stage, every November.
              </h2>
              <p className="hindi-sub text-sm text-slate-600 mt-2">
                हर नवंबर, मंच पर।
              </p>
              <p className="mt-4 text-slate-700 max-w-md">
                The 6th Annual Function on 15 November 2025 had 200+ students performing — folk dances, speeches, skits on freedom fighters, and a full school choir.
              </p>
              <Link href="/gallery" className="btn-link mt-5">
                Browse the album →
              </Link>
            </header>
            <div className="col-span-12 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {annualImages.map((stem) => (
                <Photo key={stem} src={imgUrl(stem)} alt="Annual Function performance photograph" ratio="4/5" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== SCHOLARSHIPS ============================== */}
      <section className="bg-forest-800 text-sand-100 border-b border-forest-900">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <header className="col-span-12 md:col-span-5">
              <BilingualLabel en="Scholarships & fee relief" />
              <h2 className="font-display text-3xl md:text-4xl mt-3 text-paper">
                No child turned away for fee.
              </h2>
              <h3 className="hindi-headline text-xl md:text-2xl text-amber-300 mt-2">
                शुल्क के कारण किसी बच्चे को वंचित नहीं किया जाएगा।
              </h3>
              <p className="mt-4 text-sand-200/90 max-w-md">
                Four categories of students receive additional relief, and one category receives 100% free education.
              </p>
              <Link href="/admissions" className="btn-link mt-5 text-amber-400">
                See fee structure →
              </Link>
            </header>
            <div className="col-span-12 md:col-span-7">
              <ul className="divide-y divide-forest-700">
                {SCHOLARSHIPS.map((s, i) => (
                  <li key={s.title} className="py-5 flex items-start gap-4">
                    <span className="font-display text-2xl text-amber-400 w-10 shrink-0 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-paper">{s.title}</h3>
                      <p className="hindi-sub text-sm text-sand-200/70 italic mt-0.5">{s.titleHi}</p>
                      <p className="text-sm text-sand-200/85 mt-2">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== BUS ROUTES ============================== */}
      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8">
            <header className="col-span-12 md:col-span-4">
              <div className="eyebrow">Bus routes · बस मार्ग</div>
              <h2 className="font-display text-3xl text-ink mt-3">
                Four routes. One schedule.
              </h2>
              <p className="text-sm text-slate-700 mt-4">
                Drivers and conductors are background-verified. Pickup and drop timings are issued term-wise to parents.
              </p>
              <Link href="/facilities/transport" className="btn-link mt-5">
                Transport details →
              </Link>
            </header>
            <div className="col-span-12 md:col-span-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule">
                {BUS_ROUTES.map((r) => (
                  <li key={r.name} className="bg-paper p-5 hover:bg-sand-50 transition-colors">
                    <h3 className="font-display text-base text-ink">{r.name}</h3>
                    <p className="hindi-sub text-xs text-slate-500 mt-0.5">{r.nameHi}</p>
                    <p className="text-sm text-slate-700 mt-2">{r.coverage}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 font-mono">
                      <span>Pickup <strong className="text-ink">{r.pickup}</strong></span>
                      <span>Drop <strong className="text-ink">{r.drop}</strong></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== TIMELINE ============================== */}
      <section className="border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <header className="col-span-12 md:col-span-4">
              <div className="eyebrow">Six years, one building</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
                The school's first years.
              </h2>
              <p className="hindi-sub text-sm text-slate-600 mt-2">
                छह वर्ष, एक भवन।
              </p>
            </header>
            <ol className="col-span-12 md:col-span-8">
              {TIMELINE.map((t, i) => (
                <li key={t.year} className="grid grid-cols-12 gap-4 py-4 border-t border-rule first:border-t-0">
                  <div className="col-span-3 md:col-span-2 font-display text-2xl text-amber-600">{t.year}</div>
                  <div className="col-span-1 hidden md:flex items-center">
                    <span className="block w-2 h-2 rounded-full bg-forest-800" />
                  </div>
                  <div className="col-span-9 md:col-span-9 pt-1">
                    <p className="text-slate-700 text-sm leading-relaxed">{t.event}</p>
                    <p className="hindi-body text-sm text-slate-600 italic mt-1 leading-relaxed">{t.eventHi}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================== CTA STRIP ============================== */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-edition mx-auto px-6 py-14">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-8">
              <div className="eyebrow">Admissions 2026–27 · प्रवेश</div>
              <h2 className="font-display text-2xl md:text-3xl text-ink mt-2">
                Walk into the office any weekday between 09:00 and 15:00.
              </h2>
              <p className="hindi-sub text-sm text-slate-600 mt-2">
                किसी भी कार्यदिवस सुबह 09:00 से दोपहर 03:00 के बीच कार्यालय में आएं।
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-wrap gap-3 md:justify-end">
              <Link href="/admissions" className="btn-primary">
                Apply now →
              </Link>
              <a href={`tel:${SCHOOL.phones[0].replace(/\s/g, '')}`} className="btn-secondary">
                Call {SCHOOL.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}