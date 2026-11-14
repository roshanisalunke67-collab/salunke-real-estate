import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BedDouble, Building2, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, Clock3, Facebook, Instagram, Mail, MapPin,
  Menu, MessageCircle, Phone, Ruler, Search, ShieldCheck, Sparkles, X, Bot, Languages, WandSparkles, Send, ImagePlus, Download, Mic, Volume2, VolumeX, House, Store, Map, Clapperboard
} from "lucide-react";

import type { Property } from "./types";
import { verifiedProperties } from "./data/properties";

const PHONE = "919930925899";
const DISPLAY_PHONE = "+91 99309 25899";
const WA_BASE = `https://wa.me/${PHONE}`;

const navItems = ["Home", "About Us", "Properties", "Sell Your Property", "Services", "Our Team", "Blog", "FAQ", "Contact"];

function waLink(message: string) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [purpose, setPurpose] = useState("All");
  const [construction, setConstruction] = useState("All");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sellSent, setSellSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntroVisible(false), reducedMotion ? 250 : 3900);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => verifiedProperties.filter((p) => {
    const purposeMatch = p.type === "Plot" ? p.purpose === "Sale" && (purpose === "All" || purpose === "Sale") : purpose === "All" || p.purpose === purpose;
    const constructionMatch = construction === "All" || p.construction === construction;
    const locationMatch = location === "All locations" || p.location.toLowerCase().includes(location.toLowerCase());
    const categoryMatch = category === "All" || p.type === category;
    const q = query.trim().toLowerCase();
    const queryMatch = !q || `${p.title} ${p.location} ${p.type} ${p.construction} ${p.description || ""} ${(p.features || []).join(" ")}`.toLowerCase().includes(q);
    return purposeMatch && constructionMatch && locationMatch && categoryMatch && queryMatch;
  }), [purpose, construction, location, category, query]);

  const scrollTo = (label: string) => {
    const ids: Record<string, string> = {
      "Home": "home", "About Us": "about", "Properties": "properties",
      "Sell Your Property": "sell", "Services": "services", "Our Team": "team",
      "Blog": "insights", "FAQ": "faq", "Contact": "contact"
    };
    setActiveNav(label);
    setMobileOpen(false);
    document.getElementById(ids[label] || "home")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>, kind: "sell" | "contact") => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`).join("\n");
    const msg = `${kind === "sell" ? "Property owner enquiry" : "Website enquiry"}\n${lines}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    if (kind === "sell") setSellSent(true); else setContactSent(true);
    e.currentTarget.reset();
  };

  const shown = showAll ? filtered : filtered.slice(0, 3);

  return (
    <>
      {introVisible && <div className="cinema-intro" role="status" aria-label="Salunke Real Estate welcome animation">
        <div className="cinema-sky" />
        <div className="cinema-stage"><div className="cinema-curtain curtain-left"/><div className="cinema-curtain curtain-right"/></div>
        <div className="cinema-content"><span className="cinema-kicker"><Clapperboard size={14}/> WELCOME TO</span><div className="cinema-monogram"><Building2 size={35}/></div><h2>SALUNKE <em>REAL ESTATE</em></h2><p>YOUR PROPERTY JOURNEY, BEAUTIFULLY BEGINS</p></div>
        <button className="cinema-skip" onClick={() => setIntroVisible(false)}>Skip intro <ArrowRight size={13}/></button>
      </div>}
      <div className="topbar">
        <div className="container topbar-inner">
          <span><Clock3 size={14} /> Daily assistance · 9:00 AM – 11:00 PM</span>
          <div className="top-links">
            <a href={`tel:${PHONE}`}><Phone size={14} /> {DISPLAY_PHONE}</a>
            <a href={waLink("Hello Salunke Real Estate, I have a property enquiry.")} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp us</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={() => setActiveNav("Home")}>
            <span className="brand-mark"><Building2 size={25} strokeWidth={1.5} /></span>
            <span><strong>SALUNKE</strong><small>REAL ESTATE</small></span>
          </a>
          <nav className={mobileOpen ? "nav open" : "nav"}>
            {navItems.map((item) => (
              <button key={item} className={activeNav === item ? "nav-link active" : "nav-link"} onClick={() => scrollTo(item)}>{item}</button>
            ))}
            <a className="nav-cta" href={waLink("Hello, I would like to discuss a property requirement.")} target="_blank" rel="noreferrer">Enquire Now <ArrowUpRight size={15} /></a>
          </nav>
          <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="container hero-content">
            <div className="eyebrow light"><span /> PROPERTY GUIDANCE, MADE PERSONAL</div>
            <h1>Find a place<br /><em>to call your own.</em></h1>
            <p>Thoughtful property assistance for buying, selling and renting homes and commercial spaces across Kalyan, Thane and Mumbai.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => scrollTo("Properties")}>Explore properties <ArrowRight size={17} /></button>
              <button className="btn btn-outline-light" onClick={() => scrollTo("Sell Your Property")}>List your property</button>
            </div>
            <div className="hero-note"><ShieldCheck size={17} /> Personal assistance from first enquiry to beyond the transaction</div>
          </div>
          <div className="hero-side-label">KALYAN · THANE · MUMBAI</div>
        </section>

        <section className="search-section">
          <div className="container">
            <div className="search-panel">
              <div className="search-intro"><span className="eyebrow">START YOUR SEARCH</span><h2>What are you looking for?</h2></div>
              <div className="search-controls">
                <label><span>I'm looking to</span><select value={purpose} onChange={(e) => setPurpose(e.target.value)}><option value="All">Sale or rent</option><option value="Sale">Sale</option><option value="Rent">Rent</option></select></label>
                <label><span>Construction</span><select value={construction} onChange={(e) => setConstruction(e.target.value)}><option value="All">New or resale</option><option>New Construction</option><option>Resale Construction</option></select></label>
                <label><span>Property type</span><select value={category} onChange={(e) => { setCategory(e.target.value); if (e.target.value === "Plot" && purpose === "Rent") setPurpose("Sale"); }}><option value="All">All types</option><option value="Flat">Flat</option><option value="Shop">Shop</option><option value="Plot">Plot</option></select></label>
                <button className="btn btn-dark search-btn" onClick={() => scrollTo("Properties")}><Search size={17} /> Find property</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section properties-section" id="properties">
          <div className="container">
            <div className="section-head">
              <div><span className="eyebrow">A PLACE FOR EVERY NEXT CHAPTER</span><h2>Explore properties</h2><p>Browse the latest sale and rental options shared by Salunke Real Estate. Contact us to reconfirm availability, exact specifications and viewing times.</p></div>
              <a className="text-link" href={waLink("Hello, please share your current property listings.")} target="_blank" rel="noreferrer">Request latest listings <ArrowUpRight size={16} /></a>
            </div>
            <div className="property-browser">
              <div className="browse-label">1. Choose construction</div>
              <div className="browse-pills construction-pills">
                {["All", "New Construction", "Resale Construction"].map((item) => <button key={item} className={construction === item ? "browse-pill selected" : "browse-pill"} onClick={() => setConstruction(item)}>{item === "All" ? "All properties" : item}</button>)}
              </div>
              <p className="filter-note">Construction status has not yet been confirmed for these owner-shared listings. They remain visible under “All properties” until classified as new or resale.</p>
              <div className="browse-label">2. Choose property type</div>
              <div className="property-type-choices">
                {[
                  {value:"Flat",label:"Flats",icon:<House size={21}/>,detail:"Sale & rent"},
                  {value:"Shop",label:"Shops",icon:<Store size={21}/>,detail:"Sale & rent"},
                  {value:"Plot",label:"Plots",icon:<Map size={21}/>,detail:"For sale"},
                ].map((item) => <button key={item.value} className={category === item.value ? "type-choice selected" : "type-choice"} onClick={() => { const next = category === item.value ? "All" : item.value; setCategory(next); if (next === "Plot" && purpose === "Rent") setPurpose("Sale"); }}>{item.icon}<strong>{item.label}</strong><small>{item.detail}</small></button>)}
              </div>
              <div className="browse-label">3. Select purpose</div>
              <div className="browse-pills purpose-pills">
                {[{value:"All",label:"Sale & rent"},{value:"Sale",label:"For sale"},{value:"Rent",label:"For rent"}].map(item => <button key={item.value} className={purpose === item.value ? "browse-pill selected" : "browse-pill"} onClick={() => setPurpose(item.value)} disabled={category === "Plot" && item.value === "Rent"}>{item.label}</button>)}
              </div>
            </div>
            <div className="property-toolbar">
              <div className="result-count">{filtered.length} property options</div>
              <div className="property-toolbar-tools"><label>Location <select value={location} onChange={(e) => setLocation(e.target.value)}><option>All locations</option><option>Kalyan</option><option>Thane</option><option>Dombivli</option><option>Mumbai</option></select></label><input aria-label="Search properties" placeholder="Search by property or area" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
            </div>
            <div className="property-grid">
              {shown.map((p) => <article className="property-card" key={p.id}>
                <div className="property-image-wrap"><img src={p.image} alt={`${p.title} - representative image`} /><span className="property-tag">{p.construction === "To Be Confirmed" ? "Construction status to confirm" : p.construction} · {p.purpose}</span><span className="image-count">{p.tag}</span></div>
                <div className="property-body">
                  <div className="property-location"><MapPin size={13} /> {p.location} <span className="property-type-label">{p.type}</span></div>
                  <h3>{p.title}</h3>
                  {p.description && <p className="property-description">{p.description}</p>}
                  <div className="property-price">{p.price}</div>
                  {p.features && p.features.length > 0 && <div className="property-features">{p.features.map((feature) => <span key={feature}>{feature}</span>)}</div>}
                  <div className="property-meta">
                    {p.beds > 0 && <span><BedDouble size={15} /> {p.beds} Beds</span>}
                    {p.baths > 0 && <span><Building2 size={15} /> {p.baths} Baths</span>}
                    <span><Ruler size={15} /> {p.area}</span>
                  </div>
                  <a className="card-link" href={waLink(`Hello, I am interested in: ${p.title} in ${p.location}. Please share availability and details.`)} target="_blank" rel="noreferrer">Enquire about this <ArrowUpRight size={15} /></a>
                </div>
              </article>)}
            </div>
            {filtered.length === 0 && <div className="empty-state"><Sparkles size={24}/><strong>No properties match these filters.</strong><span>Tell our AI assistant what you need, or contact us on WhatsApp. We will share options after confirming availability.</span><a className="btn btn-dark" href={waLink("Hello Salunke Real Estate, please let me know about available properties.")} target="_blank" rel="noreferrer">Ask for available properties <ArrowUpRight size={15}/></a></div>}
            {filtered.length > 3 && <div className="center"><button className="btn btn-outline-dark" onClick={() => setShowAll(!showAll)}>{showAll ? "Show fewer" : "View more properties"} <ArrowRight size={16} /></button></div>}
            <p className="demo-note">Photos are representative stock images, not photographs of the exact units. Availability, construction status, price, measurements and ownership details must be reconfirmed with Salunke Real Estate before a visit or transaction.</p>
          </div>
        </section>

        <section className="section ai-tools-section" id="ai-tools">
          <div className="container">
            <div className="section-head"><div><span className="eyebrow">SMART PROPERTY SUPPORT</span><h2>Meet Salunke AI</h2><p>Ask about the published sale and rental listings, get a draft listing description, or improve a genuine property photo.</p></div></div>
            <div className="ai-tools-grid">
              <article className="ai-tool-card"><Bot size={26}/><h3>AI property assistant</h3><p>Chat in English, Hindi or Marathi. The assistant only recommends property options published on this website. Use the microphone to speak and the speaker icon to hear replies.</p><button className="btn btn-dark" onClick={() => setAiChatOpen(true)}>Open assistant <ArrowRight size={16}/></button></article>
              <article className="ai-tool-card"><WandSparkles size={26}/><h3>Property description writer</h3><p>Generate a polished draft from details you provide. Review every fact before publishing.</p><DescriptionGenerator/></article>
              <article className="ai-tool-card"><ImagePlus size={26}/><h3>Property photo enhancer</h3><p>Improve lighting and clarity of your own property photos without changing the actual property.</p><ImageEnhancer/></article>
            </div>
          </div>
        </section>

        <section className="about-band" id="about">
          <div className="about-photo"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" alt="Elegant modern home interior" /></div>
          <div className="about-copy">
            <span className="eyebrow light">A MORE PERSONAL PROPERTY JOURNEY</span>
            <h2>Local understanding.<br /><em>Personal attention.</em></h2>
            <p>At Salunke Real Estate, we help individuals and families navigate property decisions with clear communication and practical guidance. Whether you're searching for a home, exploring a commercial space or planning to sell or rent, we're here to understand what matters to you.</p>
            <button className="btn btn-gold" onClick={() => scrollTo("Contact")}>Get to know us <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-head centered"><div><span className="eyebrow">HOW WE CAN HELP</span><h2>Property services, thoughtfully handled</h2><p>Support for key property decisions, with your needs at the centre.</p></div></div>
            <div className="service-grid">
              {[
                ["01","Buying a property","Explore residential and commercial options based on your preferred location, needs and budget.","Buying"],
                ["02","Selling a property","Connect with prospective buyers and receive assistance through the selling journey.","Selling"],
                ["03","Renting a home or shop","Find rental options or connect with people looking for a suitable space.","Renting"],
                ["04","Commercial properties","Enquire about shops, offices and other commercial property requirements.","Commercial"],
                ["05","Plots and land","Discuss plot requirements and property opportunities in the areas we serve.","Plots"],
                ["06","Property management","Ask about ongoing property-related assistance and management requirements.","Management"],
              ].map(([n,title,desc,topic]) => <div className="service-card" key={n}>
                <span className="service-number">{n}</span><h3>{title}</h3><p>{desc}</p>
                <a href={waLink(`Hello, I would like to enquire about ${topic.toLowerCase()} services.`)} target="_blank" rel="noreferrer">Discuss your requirement <ArrowUpRight size={15} /></a>
              </div>)}
            </div>
          </div>
        </section>

        <section className="sell-section" id="sell">
          <div className="container sell-grid">
            <div className="sell-copy">
              <span className="eyebrow light">FOR PROPERTY OWNERS</span>
              <h2>Thinking of selling<br />or renting your property?</h2>
              <p>Tell us a little about your property and what you have in mind. We'll get in touch to understand your requirements and discuss possible next steps.</p>
              <div className="sell-points"><span><CheckCircle2 size={17} /> Personal discussion</span><span><CheckCircle2 size={17} /> Local market understanding</span><span><CheckCircle2 size={17} /> Support through the process</span></div>
            </div>
            <form className="lead-form" onSubmit={(e) => handleForm(e, "sell")}>
              <h3>Request a property consultation</h3><p>Share your details and we'll contact you.</p>
              <div className="form-row"><label>Your name<input name="Name" required placeholder="Full name" /></label><label>Mobile number<input name="Mobile" required type="tel" placeholder="+91" /></label></div>
              <div className="form-row"><label>Property location<input name="Location" required placeholder="e.g. Kalyan West" /></label><label>Property type<select name="Property type" defaultValue=""><option value="" disabled>Select type</option><option>Flat / Apartment</option><option>Shop</option><option>Office</option><option>Plot / Land</option><option>Villa / Bungalow</option><option>Other</option></select></label></div>
              <div className="form-row"><label>I'm interested in<select name="Requirement" defaultValue="Selling"><option>Selling</option><option>Renting</option><option>Property management</option></select></label><label>Expected price / rent<input name="Expected price or rent" placeholder="Optional" /></label></div>
              <label>Additional details<textarea name="Additional details" rows={3} placeholder="Area, building name, preferred timing, etc." /></label>
              <button className="btn btn-dark form-submit" type="submit">Send enquiry on WhatsApp <ArrowRight size={16} /></button>
              {sellSent && <small className="form-success">Your WhatsApp enquiry window was opened. Please send the message to complete your enquiry.</small>}
              <small className="privacy-note">Your details will be used to respond to this enquiry.</small>
            </form>
          </div>
        </section>

        <section className="section locations-section">
          <div className="container">
            <div className="section-head"><div><span className="eyebrow">OUR SERVICE AREAS</span><h2>Rooted locally, connected regionally</h2><p>Speak with us about property requirements in these areas.</p></div></div>
            <div className="location-grid">
              {[
                ["Kalyan","Kalyan West · Kalyan East · Khadakpada"],
                ["Thane","Thane city · Nearby neighbourhoods"],
                ["Dombivli","East · West · Surrounding areas"],
                ["Mumbai","Selected locations, subject to availability"],
              ].map(([name,areas]) => <a href={waLink(`Hello, I am looking for a property in ${name}. Please contact me.`)} target="_blank" rel="noreferrer" className="location-card" key={name}><MapPin size={19}/><span><strong>{name}</strong><small>{areas}</small></span><ArrowUpRight size={16}/></a>)}
            </div>
            <p className="demo-note">Service coverage and property availability should be confirmed for each enquiry.</p>
          </div>
        </section>

        <section className="team-section" id="team">
          <div className="container team-inner">
            <div><span className="eyebrow light">A DIRECT LINE TO YOUR PROPERTY ADVISOR</span><h2>Personal service.<br /><em>One conversation at a time.</em></h2><p>Speak directly with the Salunke Real Estate team about buying, selling, renting or managing a property.</p></div>
            <div className="team-contact"><div className="team-avatar">SR</div><div><span className="team-label">YOUR PROPERTY CONTACT</span><h3>Salunke Real Estate</h3><p>Kalyan · Thane · Mumbai</p><a href={`tel:${PHONE}`}><Phone size={16}/> {DISPLAY_PHONE}</a></div></div>
          </div>
        </section>

        <section className="section insights-section" id="insights">
          <div className="container">
            <div className="section-head"><div><span className="eyebrow">PROPERTY KNOWLEDGE</span><h2>Helpful things to know</h2><p>Practical topics to consider when making a property decision.</p></div></div>
            <div className="insight-grid">
              <article><img src="https://images.unsplash.com/photo-1560518883-ce09059ee01b?auto=format&fit=crop&w=900&q=80" alt="House keys on a table"/><span>BUYING GUIDE</span><h3>Questions to ask before choosing a home</h3><p>Consider location, total costs, documentation and your long-term needs.</p></article>
              <article><img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=80" alt="Modern home exterior"/><span>SELLING GUIDE</span><h3>Getting your property ready for a sale</h3><p>Organise property details, ownership documents and realistic expectations.</p></article>
              <article><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" alt="Modern office interior"/><span>RENTAL GUIDE</span><h3>What to clarify before renting a space</h3><p>Discuss rent, deposit, agreement terms, maintenance and possession.</p></article>
            </div>
            <p className="demo-note">These are starter editorial topics. Detailed articles can be added when the business is ready to publish them.</p>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div><span className="eyebrow">GOOD TO KNOW</span><h2>Frequently asked questions</h2><p>Have a question that's not covered here? Get in touch and we'll help clarify.</p><a className="text-link" href={waLink("Hello, I have a question about Salunke Real Estate services.")} target="_blank" rel="noreferrer">Ask us on WhatsApp <ArrowUpRight size={16}/></a></div>
            <div className="faq-list">
              {[
                ["What areas do you serve?","We are based in Kalyan and handle enquiries for Kalyan, Thane, Dombivli and selected Mumbai locations. Please contact us to confirm coverage for your requirement."],
                ["Can you help me buy or sell a property?","Yes. Contact us with your preferred location, property type and budget or expected selling price so we can understand your requirement."],
                ["Can I enquire about renting a flat or shop?","Yes. Share the location, type of space, budget and preferred timeline. We can discuss suitable options subject to availability."],
                ["What information should I share to list my property?","Start with the property location, type, area, building or society name, expected price or rent and your contact details. Please share documents securely only when requested."],
                ["Do you provide support after a transaction?","You can contact us for property-related assistance after the transaction. The scope of any ongoing support should be agreed for each case."],
                ["How do I contact Salunke Real Estate?","Call or WhatsApp +91 99309 25899, or use the enquiry form on this website."]
              ].map(([q,a],i) => <div className={faqOpen === i ? "faq-item expanded" : "faq-item"} key={q}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}><span>{q}</span>{faqOpen === i ? <X size={17}/> : <ChevronDown size={18}/>}</button>
                {faqOpen === i && <p>{a}</p>}
              </div>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy"><span className="eyebrow light">LET'S TALK PROPERTY</span><h2>Your next property<br /><em>conversation starts here.</em></h2><p>Tell us what you're looking for. We'll be happy to hear from you.</p>
              <a href={`tel:${PHONE}`} className="contact-line"><Phone size={18}/><span><small>CALL US</small>{DISPLAY_PHONE}</span></a>
              <a href={waLink("Hello Salunke Real Estate, I would like to make an enquiry.")} target="_blank" rel="noreferrer" className="contact-line"><MessageCircle size={18}/><span><small>WHATSAPP</small>Chat with our team</span></a>
              <div className="contact-line"><MapPin size={18}/><span><small>BASED IN</small>Kalyan, Maharashtra, India</span></div>
              <div className="contact-line"><Clock3 size={18}/><span><small>AVAILABILITY</small>Daily, 9:00 AM – 11:00 PM</span></div>
            </div>
            <form className="contact-form" onSubmit={(e) => handleForm(e, "contact")}>
              <h3>Send us an enquiry</h3><p>We'll use WhatsApp to help you send your details.</p>
              <label>Your name<input name="Name" required placeholder="Your full name"/></label>
              <label>Mobile number<input name="Mobile" required type="tel" placeholder="Your phone number"/></label>
              <label>I'm interested in<select name="Interested in"><option>Buying a property</option><option>Selling a property</option><option>Renting a property</option><option>Commercial property</option><option>Plot / land</option><option>Property management</option><option>Other</option></select></label>
              <label>Message<textarea name="Message" rows={4} required placeholder="Tell us about your requirement"/></label>
              <button className="btn btn-gold form-submit" type="submit">Send enquiry <ArrowRight size={16}/></button>
              {contactSent && <small className="form-success">Your WhatsApp enquiry window was opened. Please send the message to complete your enquiry.</small>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand"><a className="brand brand-light" href="#home"><span className="brand-mark"><Building2 size={25}/></span><span><strong>SALUNKE</strong><small>REAL ESTATE</small></span></a><p>Property buying, selling, renting and management assistance across Kalyan, Thane and Mumbai.</p><div className="socials"><a href={waLink("Hello Salunke Real Estate")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="#contact" aria-label="Facebook"><Facebook/></a></div></div>
          <div><h4>EXPLORE</h4>{["Home","About Us","Properties","Sell Your Property","Services"].map(x=><button className="footer-link" key={x} onClick={()=>scrollTo(x)}>{x}</button>)}</div>
          <div><h4>INFORMATION</h4>{["Our Team","Blog","FAQ","Contact"].map(x=><button className="footer-link" key={x} onClick={()=>scrollTo(x)}>{x}</button>)}</div>
          <div><h4>GET IN TOUCH</h4><a className="footer-contact" href={`tel:${PHONE}`}><Phone size={15}/> {DISPLAY_PHONE}</a><a className="footer-contact" href={waLink("Hello, I have a property enquiry.")} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a><span className="footer-contact"><MapPin size={15}/> Kalyan, Maharashtra</span><span className="footer-contact"><Clock3 size={15}/> 9 AM – 11 PM, daily</span></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Salunke Real Estate. All rights reserved.</span><span>Property information is subject to verification and availability.</span></div>
      </footer>
      <AIChatWidget properties={verifiedProperties} open={aiChatOpen} setOpen={setAiChatOpen} />
      <a className="floating-wa" href={waLink("Hello Salunke Real Estate, I have a property enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={23}/><span>Chat with us</span></a>
    </>
  );
}

type ChatMessage = { role: "user" | "assistant"; text: string };

function AIChatWidget({ properties, open, setOpen }: { properties: Property[]; open: boolean; setOpen: (value: boolean) => void }) {
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: "Namaste! I’m Salunke AI, your property assistant. Tell me what you need in English, Hindi or Marathi. You can also use the microphone to speak, or tap the speaker icon to hear my replies." }]);

  const speak = (text: string, index: number) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const locale = language === "Hindi" ? "hi-IN" : language === "Marathi" ? "mr-IN" : "en-IN";
    utterance.lang = locale;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.toLowerCase() === locale.toLowerCase()) || voices.find((v) => v.lang.toLowerCase().startsWith(locale.slice(0,2).toLowerCase()));
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const browser = window as Window & { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any };
    const Recognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Recognition) { setMessages((old) => [...old, { role: "assistant", text: "Voice typing is not supported in this browser. You can still type your message or use the speaker button to hear replies." }]); return; }
    const recognition = new Recognition();
    recognition.lang = language === "Hindi" ? "hi-IN" : language === "Marathi" ? "mr-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => { setInput(event.results[0][0].transcript); setListening(false); };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  };

  const send = async (text = input) => {
    const clean = text.trim(); if (!clean || busy) return;
    const next = [...messages, { role: "user" as const, text: clean }];
    setMessages(next); setInput(""); setBusy(true);
    try {
      const response = await fetch("/.netlify/functions/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "chat", language, message: clean, history: next.slice(-8), properties }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "AI service is not configured yet.");
      setMessages((old) => [...old, { role: "assistant", text: data.text }]);
    } catch (error) {
      setMessages((old) => [...old, { role: "assistant", text: error instanceof Error ? error.message : "I couldn't connect right now. Please contact us on WhatsApp." }]);
    } finally { setBusy(false); }
  };

  return <>
    {open && <aside className="ai-chat-panel" aria-label="Salunke AI chat">
      <div className="ai-chat-head"><span><Bot size={20}/> <span><strong>Salunke AI Assistant</strong><small>Property help · English / हिंदी / मराठी</small></span></span><button aria-label="Close chat" onClick={() => setOpen(false)}><X/></button></div>
      <label className="chat-language"><Languages size={15}/><select value={language} onChange={(e) => setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Marathi</option></select></label>
      <div className="ai-chat-messages">{messages.map((m,i)=><div className={`ai-message-row ${m.role}`} key={i}><div className={`ai-bubble ${m.role}`}>{m.text}</div>{m.role === "assistant" && <button className="speak-reply" type="button" title="Listen to this reply" onClick={() => speakingIndex === i ? (window.speechSynthesis.cancel(), setSpeakingIndex(null)) : speak(m.text, i)}>{speakingIndex === i ? <VolumeX size={14}/> : <Volume2 size={14}/>}</button>}</div>)}{busy && <div className="ai-bubble assistant">Thinking…</div>}</div>
      <form className="ai-chat-compose" onSubmit={(e)=>{e.preventDefault();void send();}}><button type="button" className={listening ? "mic-button listening" : "mic-button"} onClick={startVoiceInput} aria-label="Speak your requirement" title="Speak your requirement"><Mic size={17}/></button><input id="ai-chat-input" value={input} onChange={(e)=>setInput(e.target.value)} placeholder={listening ? "Listening… speak now" : "Type or use the microphone…"}/><button disabled={busy || !input.trim()} aria-label="Send message"><Send size={17}/></button></form>
      <a className="ai-chat-wa" href={waLink("Hello Salunke Real Estate, I spoke with the website assistant. Here is my enquiry:\n" + messages.map(m => `${m.role === "user" ? "Me" : "Assistant"}: ${m.text}`).join("\n"))} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowUpRight size={14}/></a>
    </aside>}
    <button className="ai-chat-launch" onClick={()=>setOpen(!open)}><Bot size={20}/><span>{open ? "Close assistant" : "Ask Salunke AI"}</span></button>
  </>;
}

function DescriptionGenerator() {
  const [details,setDetails]=useState({type:"2 BHK flat",location:"",area:"",price:"",features:""});
  const [language,setLanguage]=useState("English"); const [result,setResult]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  const update=(key:string,value:string)=>setDetails(old=>({...old,[key]:value}));
  const generate=async()=>{setBusy(true);setError("");setResult("");try{const r=await fetch("/.netlify/functions/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"description",details,language})});const d=await r.json();if(!r.ok)throw new Error(d.error||"AI is not configured yet.");setResult(d.text);}catch(e){setError(e instanceof Error?e.message:"Could not generate description.");}finally{setBusy(false);}};
  return <div className="ai-mini-form"><input value={details.type} onChange={e=>update("type",e.target.value)} placeholder="Property type"/><input value={details.location} onChange={e=>update("location",e.target.value)} placeholder="Location"/><input value={details.area} onChange={e=>update("area",e.target.value)} placeholder="Area (sq ft)"/><input value={details.price} onChange={e=>update("price",e.target.value)} placeholder="Price / rent (optional)"/><textarea value={details.features} onChange={e=>update("features",e.target.value)} placeholder="Verified features only" rows={2}/><select value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Marathi</option></select><button className="btn btn-dark" onClick={()=>void generate()} disabled={busy || !details.location.trim()}>{busy?"Generating…":"Generate description"} <Sparkles size={15}/></button>{error&&<small className="tool-error">{error}</small>}{result&&<div className="tool-result"><p>{result}</p><button type="button" onClick={()=>navigator.clipboard.writeText(result)}>Copy description</button></div>}</div>;
}

function ImageEnhancer() {
  const [file,setFile]=useState<File|null>(null); const [preview,setPreview]=useState(""); const [enhanced,setEnhanced]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  const choose=(f?:File)=>{if(!f)return;if(!f.type.startsWith("image/")){setError("Please select an image file.");return;}if(f.size>4*1024*1024){setError("Please choose an image smaller than 4 MB.");return;}setFile(f);setPreview(URL.createObjectURL(f));setEnhanced("");setError("");};
  const enhance=async()=>{if(!file)return;setBusy(true);setError("");try{const dataUrl=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsDataURL(file);});const base64=dataUrl.split(",")[1];const r=await fetch("/.netlify/functions/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"enhance",mimeType:file.type,image:base64})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Image enhancement isn't available yet.");setEnhanced(`data:${d.mimeType||"image/png"};base64,${d.image}`);}catch(e){setError(e instanceof Error?e.message:"Could not enhance image.");}finally{setBusy(false);}};
  return <div className="ai-mini-form"><label className="file-picker"><ImagePlus size={17}/> Choose a genuine property photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>choose(e.target.files?.[0])}/></label>{preview&&<img className="enhance-preview" src={enhanced||preview} alt="Property preview"/>}<button className="btn btn-dark" onClick={()=>void enhance()} disabled={!file||busy}>{busy?"Enhancing…":"Enhance photo"} <WandSparkles size={15}/></button>{enhanced&&<a className="download-image" href={enhanced} download={`salunke-property-enhanced.${enhanced.startsWith("data:image/jpeg")?"jpg":"png"}`}><Download size={15}/> Download enhanced photo</a>}{error&&<small className="tool-error">{error}</small>}<small className="tool-hint">AI enhancement is intended for lighting and clarity only. Review the result to ensure no property details have changed.</small></div>;
}

export default App;
