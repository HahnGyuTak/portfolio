import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  X,
  FileText,
  ExternalLink,
  Mail,
} from "lucide-react";
import { getContent, projectOrder, type Project } from "./data";
import { copy, readLanguage, rememberLanguage, type Language } from "./locale";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "R&D" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const external = { target: "_blank", rel: "noopener noreferrer" };

function ResourceLink({
  link,
  project,
}: {
  link: { label: string; url: string };
  project: string;
}) {
  const host = new URL(link.url).hostname;
  const brand =
    host === "github.com"
      ? "github"
      : host === "huggingface.co"
        ? "huggingface"
        : host === "apps.apple.com"
          ? "appstore"
          : host === "play.google.com"
            ? "googleplay"
            : null;
  const names: Record<string, string> = {
    github: "GitHub",
    huggingface: "Hugging Face",
    appstore: "App Store",
    googleplay: "Google Play",
  };
  const label = `${project} · ${link.label}${brand ? ` (${names[brand]})` : ""}`;
  return (
    <a
      className="resource-link"
      href={link.url}
      {...external}
      aria-label={label}
      title={label}
    >
      {brand ? (
        <img src={`./icons/${brand}.svg`} alt="" width="20" height="20" />
      ) : host.includes("dbpia") ? (
        <FileText size={20} />
      ) : (
        <ExternalLink size={19} />
      )}
      <span className="link-tooltip">
        {link.label}
        {brand ? ` · ${names[brand]}` : ""}
      </span>
    </a>
  );
}

function LanguageButton({ language, onToggle, inDialog = false }: {
  language: Language;
  onToggle: () => void;
  inDialog?: boolean;
}) {
  const label = language === "ko" ? "Switch to English" : "한국어로 보기";
  return (
    <button
      className={`language-switch${inDialog ? " language-switch--dialog" : ""}`}
      onClick={onToggle}
      aria-label={label}
      title={label}
      lang={language === "ko" ? "en" : "ko"}
    >
      {language === "ko" ? "EN" : "KO"}
    </button>
  );
}

function ProjectDialog({
  project,
  language,
  onToggleLanguage,
  onClose,
}: {
  project: Project | null;
  language: Language;
  onToggleLanguage: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = copy[language];
  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    const focused = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = prior;
      focused?.focus();
    };
  }, [project?.id]);
  if (!project) return null;
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="eyebrow">
            {project.category === "research" ? "RESEARCH" : "DEVELOPMENT"} /{" "}
            {project.period}
          </span>
          <div className="dialog-actions">
            <LanguageButton language={language} onToggle={onToggleLanguage} inDialog />
            <button
              className="icon-button"
              onClick={onClose}
              aria-label={t.closeDetails}
            >
              <X size={22} />
            </button>
          </div>
        </div>
        <h2 id="dialog-title">{project.name}</h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        {project.status && (
          <span className="project-status dialog-status">{project.status}</span>
        )}
        <div className="dialog-role">
          <span>MY ROLE</span>
          <p>{project.role}</p>
        </div>
        <div className="detail-block">
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </div>
        <div className="detail-block">
          <h3>Contribution</h3>
          <ol>
            {project.contributions.map((s, i) => (
              <li key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="detail-result">
          <span>OUTCOME</span>
          <p>{project.outcome}</p>
        </div>
        <div className="tag-list">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="dialog-links">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} {...external}>
                {l.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
        {project.id === "mote" && (
          <figure className="project-screens">
            <div>
              <img
                src="./images/mote-recording.jpg"
                alt={t.moteRecording}
                loading="lazy"
              />
              <img
                src="./images/mote-summary.jpg"
                alt={t.moteSummary}
                loading="lazy"
              />
            </div>
            <figcaption>{t.moteCaption}</figcaption>
          </figure>
        )}
        {project.id === "wallbaduk" && (
          <figure className="project-screens">
            <div>
              <img
                src="./images/wallbaduk-game.png"
                alt={t.wallbadukAlt}
                loading="lazy"
              />
            </div>
            <figcaption>{t.wallbadukCaption}</figcaption>
          </figure>
        )}
      </div>
    </dialog>
  );
}

export default function App() {
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("all");
  const [language, setLanguage] = useState<Language>(readLanguage);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    new URLSearchParams(location.search).get("project"),
  );
  const data = getContent(language);
  const projects = data.projects as Project[];
  const selected = projects.find((p) => p.id === selectedId) || null;
  const t = copy[language];
  const resumeHref = language === "en" ? "./resume-en.html" : "./resume.html";
  useEffect(() => {
    rememberLanguage(language);
    document.documentElement.lang = language;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(selector)?.setAttribute("content", copy[language].description);
    }
  }, [language]);
  const toggleLanguage = () => {
    const next = language === "ko" ? "en" : "ko";
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    history.replaceState(null, "", url);
    setLanguage(next);
  };
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const scrollFrame = useRef(0);
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("about");
      let current =
        window.scrollY >= (hero?.offsetHeight ?? 0) - 1 ? "about" : "";
      for (const s of sections.slice(1)) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 70) current = s.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      )
        current = "contact";
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    const update = () => {
      const a = navRef.current?.querySelector<HTMLAnchorElement>(
        `[href="#${active}"]`,
      );
      setIndicator(
        a
          ? { left: a.offsetLeft, width: a.offsetWidth }
          : { left: 0, width: 0 },
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);
  useEffect(() => {
    const sync = () => {
      setSelectedId(new URLSearchParams(location.search).get("project"));
      setLanguage(readLanguage());
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      clearTimeout(copyTimer.current);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);
  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    cancelAnimationFrame(scrollFrame.current);
    const from = window.scrollY;
    const to = Math.max(0, element.getBoundingClientRect().top + from - 69);
    const url = new URL(location.href);
    url.hash = id;
    history.replaceState(null, "", url);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, to);
      return;
    }
    const start = performance.now();
    const step = (time: number) => {
      const progress = Math.min((time - start) / 600, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      window.scrollTo(0, from + (to - from) * eased);
      if (progress < 1) scrollFrame.current = requestAnimationFrame(step);
    };
    scrollFrame.current = requestAnimationFrame(step);
  };
  const openProject = (p: Project) => {
    const u = new URL(location.href);
    u.searchParams.set("project", p.id);
    history.replaceState(null, "", u);
    setSelectedId(p.id);
  };
  const closeProject = () => {
    const u = new URL(location.href);
    u.searchParams.delete("project");
    history.replaceState(null, "", u);
    setSelectedId(null);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.person.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      location.href = `mailto:${data.person.email}`;
    }
  };
  const sorted = projectOrder
    .map((id) => projects.find((p) => p.id === id)!)
    .filter(Boolean);
  const visible = sorted.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      <a className="skip-link" href="#projects">
        Skip to R&amp;D
      </a>
      {!selected && <LanguageButton language={language} onToggle={toggleLanguage} />}
      <header className="hero" id="about">
        <div className="profile">
          <img
            className="profile-photo"
            src="./images/profile.png"
            alt={t.profileAlt}
            width="136"
            height="136"
          />
          <h1>GYUTAK HAHN</h1>
          <h3 className="profile-role">AI RESEARCHER &amp; DEVELOPER</h3>
          <p className="profile-intro">
            {t.intro[0]}<br /> {t.intro[1]}
          </p>
          <div className="profile-education">
            <h2>Education</h2>
            {t.education.map((entry) => (
              <p key={entry.degree}>{entry.degree} <span>{entry.period}</span></p>
            ))}
          </div>
          <div className="profile-links">
            <a
              className="profile-icon"
              href={data.person.github}
              {...external}
              aria-label={t.github}
              title="GitHub"
            >
              <img src="./icons/github.svg" alt="" width="19" height="19" />
            </a>
            <a
              className="profile-icon"
              href={`mailto:${data.person.email}`}
              aria-label={t.email}
              title="Email"
            >
              <Mail size={20} />
            </a>
            <a className="resume-link" href={resumeHref} {...external}>
              CV <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </header>
      <nav className="sticky-nav" data-stuck={active !== ""} aria-label="Main navigation">
        <div className="nav-inner" ref={navRef}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(s.id);
              }}
              aria-current={active === s.id ? "location" : undefined}
            >
              {s.label}
            </a>
          ))}
          <span
            className="nav-indicator"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </nav>
      <main>
        <section id="projects" className="section projects-section">
          <h2 className="section-title">R&D</h2>
          <div className="filters" role="group" aria-label="R&D category">
            {[
              { id: "all", label: "All" },
              { id: "research", label: "Research" },
              { id: "development", label: "Development" },
            ].map((f) => (
              <button
                key={f.id}
                className={filter === f.id ? "selected" : ""}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span>
                  {f.id === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === f.id).length}
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {visible.length} R&amp;D entries
          </p>
          <div className="project-grid">
            {visible.map((p) => (
              <article className="project-card" key={p.id}>
                <div className="card-meta">
                  <span>
                    {p.category === "research" ? "Research" : "Development"}
                  </span>
                  <time>{p.period}</time>
                </div>
                <h3>
                  <button className="card-title" onClick={() => openProject(p)}>
                    {p.name}
                  </button>
                </h3>
                <p className="card-subtitle">{p.subtitle}</p>
                {p.status && <span className="project-status">{p.status}</span>}
                <p className="card-summary">{p.summary}</p>
                <div className="card-focus">
                  <span>Focus</span>
                  <div className="tag-list">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <div className="resource-links">
                    {p.links.map((l) => (
                      <ResourceLink key={l.url} link={l} project={p.name} />
                    ))}
                  </div>
                  <button
                    className="details-button"
                    onClick={() => openProject(p)}
                    aria-label={`${p.name} · ${t.details}`}
                  >
                    Details <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="experience" className="section experience-section">
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="experience-grid">
            <div>
              <h3 className="group-title">Research</h3>
              <div className="research-list">
                {data.researchHistory.map((r, i) => (
                  <article key={r.organization}>
                    <time>{i === 0 ? t.researchStart : r.period}</time>
                    <h4>{r.organization}</h4>
                    <span className="research-role">{r.role}</span>
                    <p>{r.topic}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <h3 className="group-title">Papers</h3>
              <article className="publication">
                <div className="publication-meta">
                  <span>{data.submission.venue}</span>
                  <span className="project-status">{data.submission.status}</span>
                </div>
                <h4>{data.submission.title}</h4>
                <p>{data.submission.authors}</p>
                <small>{data.submission.submittedAt} {t.submitted}</small>
              </article>
              <a
                className="publication"
                href={data.publication.url}
                {...external}
              >
                <span>
                  ICROS 2023 <ArrowUpRight size={17} />
                </span>
                <h4>{data.publication.title}</h4>
                <p>{data.publication.authors}</p>
                <small>{t.conference}</small>
              </a>
              <h3 className="group-title awards-title">Awards</h3>
              <div className="awards-list">
                {data.awards.map((a) => (
                  <div key={a.year}>
                    <time>{a.year}</time>
                    <div>
                      <h4>{a.title}</h4>
                      <p>{a.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="skills-list">
            {data.skills.map((s) => (
              <div key={s.label}>
                <h3>{s.label}</h3>
                <p>{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <h2 className="section-title">CONTACT</h2>
          <div className="email-line">
            <a href={`mailto:${data.person.email}`}>{data.person.email}</a>
            <button
              className="icon-button"
              onClick={copyEmail}
              aria-label={t.copyEmail}
              title="Copy email"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copied ? "Copied" : ""}
          </p>
          <div className="contact-links">
            <a href={data.person.github} {...external}>
              GitHub <ArrowUpRight size={15} />
            </a>
            <a href={data.person.blog} {...external}>
              Blog <ArrowUpRight size={15} />
            </a>
            <a href={data.person.linkedin} {...external}>
              LinkedIn <ArrowUpRight size={15} />
            </a>
            <a href={resumeHref} {...external}>
              CV <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        © {new Date().getFullYear()} Gyutak Hahn{" "}
        <a
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            navigateTo("about");
          }}
        >
          Back to top ↑
        </a>
      </footer>
      <ProjectDialog project={selected} language={language} onToggleLanguage={toggleLanguage} onClose={closeProject} />
    </>
  );
}
