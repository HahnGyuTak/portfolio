import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  Globe2,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { getContent, projectOrder, type Project } from "./data";
import { copy, readLanguage, rememberLanguage, type Language } from "./locale";
import ProjectDialog from "./components/ProjectDialog";
import { ProjectCard } from "./components/ProjectCard";
import { spring, quickSpring } from "./motion";
import { PortfolioResearch } from "./PortfolioResearch";
import { ProfileV2, PublicationsV2, ToolkitV2, ExperienceV2, ContactV2 } from "./PortfolioSections";
import "../styles/portfolio-v2.css";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "R&D" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const external = { target: "_blank", rel: "noopener noreferrer" };

const v2Sections = [
  { id: "about", label: "Profile" },
  sections[1],
  { id: "publications", label: "Publications" },
  { id: "toolkit", label: "Toolkit" },
  ...sections.slice(2),
];

type Version = 1 | 2;
const readVersion = (): Version => new URLSearchParams(location.search).get("v") === "1" ? 1 : 2;

function projectReturn() {
  const from = history.state?.portfolioProjectFrom;
  return typeof from === "string" ? { from, view: new URL(location.href) } : null;
}

function LanguageButton({ language, onToggle, showIcon }: {
  language: Language;
  onToggle: () => void;
  showIcon: boolean;
}) {
  const label = language === "ko" ? "Switch to English" : "한국어로 보기";
  return (
    <button
      className="language-switch"
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      lang={language === "ko" ? "en" : "ko"}
    >
      {showIcon && <Globe2 size={15} aria-hidden="true" />}
      {language === "ko" ? "EN" : "KO"}
    </button>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [version, setVersion] = useState(readVersion);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("all");
  const [language, setLanguage] = useState<Language>(readLanguage);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    new URLSearchParams(location.search).get("project"),
  );
  const data = getContent(language);
  const projects = data.projects as Project[];
  const selected = projects.find((p) => p.id === selectedId) || null;
  const navigation = version === 1 ? sections : v2Sections;
  const t = copy[language];
  const aiRush = data.programs.find((program) => program.id === "naver-ai-rush");
  const resumeHref = language === "en" ? "./resume-en.html" : "./resume.html";
  const dialogReturn = useRef(projectReturn());
  const closing = useRef(false);
  const pendingScroll = useRef(location.hash.slice(1));
  const restoreVersionFocus = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
    history.replaceState(history.state, "", url);
    dialogReturn.current = projectReturn();
    setLanguage(next);
  };
  const nextVersion = version === 2 ? 1 : 2;
  const toggleVersion = () => {
    restoreVersionFocus.current = !!document.activeElement?.matches(".version-switch");
    const url = new URL(location.href);
    if (nextVersion === 1) url.searchParams.set("v", "1");
    else url.searchParams.delete("v");
    history.replaceState(history.state, "", url);
    dialogReturn.current = projectReturn();
    pendingScroll.current = active || "about";
    setMenuOpen(false);
    setVersion(nextVersion);
  };
  const versionLabel = language === "ko"
    ? `V${nextVersion} 디자인으로 전환`
    : `Switch to version ${nextVersion}`;
  const versionControl = (
    <button type="button" className="version-switch" aria-label={versionLabel} title={versionLabel} onClick={toggleVersion}>
      V{nextVersion}
    </button>
  );
  const controls = (
    <div className="view-controls">
      <LanguageButton language={language} onToggle={toggleLanguage} showIcon={version === 2} />
      {versionControl}
    </div>
  );
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const scrollFrame = useRef(0);
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("about");
      let current = version === 2 || window.scrollY >= (hero?.offsetHeight ?? 0) - 1 ? "about" : "";
      const threshold = (headerRef.current?.offsetHeight ?? 69) + 2;
      for (const s of navigation.slice(1)) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= threshold) current = s.id;
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
  }, [navigation, version, filter, language]);
  useLayoutEffect(() => {
    if (restoreVersionFocus.current) {
      restoreVersionFocus.current = false;
      const control = document.querySelector<HTMLElement>(".project-dialog[open] .version-switch")
        ?? document.querySelector<HTMLElement>(".view-controls .version-switch");
      control?.focus({ preventScroll: true });
    }
    const id = pendingScroll.current;
    pendingScroll.current = "";
    if (!id) return;
    const target = document.getElementById(id)
      ?? (version === 1 && ["publications", "toolkit"].includes(id) ? document.getElementById("experience") : null);
    if (target) {
      const offset = headerRef.current?.offsetHeight ?? 69;
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - offset);
    }
  }, [version]);
  useLayoutEffect(() => {
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
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [active, version]);
  useEffect(() => {
    const sync = () => {
      const returned = dialogReturn.current;
      if (returned?.from === location.href) {
        const url = new URL(location.href);
        for (const key of ["lang", "v"]) {
          const value = returned.view.searchParams.get(key);
          if (value) url.searchParams.set(key, value);
          else url.searchParams.delete(key);
        }
        if (url.href !== location.href) history.replaceState(history.state, "", url);
      }
      closing.current = false;
      dialogReturn.current = projectReturn();
      setSelectedId(new URLSearchParams(location.search).get("project"));
      setLanguage(readLanguage());
      setVersion(readVersion());
    };
    sync();
    const interruptScroll = () => cancelAnimationFrame(scrollFrame.current);
    const interruptWithKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        interruptScroll();
      }
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("wheel", interruptScroll, { passive: true });
    window.addEventListener("touchstart", interruptScroll, { passive: true });
    window.addEventListener("keydown", interruptWithKey);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("wheel", interruptScroll);
      window.removeEventListener("touchstart", interruptScroll);
      window.removeEventListener("keydown", interruptWithKey);
      clearTimeout(copyTimer.current);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);
  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    cancelAnimationFrame(scrollFrame.current);
    const from = window.scrollY;
    const to = Math.max(0, element.getBoundingClientRect().top + from - (headerRef.current?.offsetHeight ?? 69));
    const url = new URL(location.href);
    url.hash = id;
    history.replaceState(history.state, "", url);
    setMenuOpen(false);
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
  const projectHref = (id: string) => {
    const url = new URL(location.href);
    url.searchParams.set("project", id);
    url.searchParams.set("lang", language);
    return url.href;
  };
  const openProject = (project: Project) => {
    history.pushState({ portfolioProjectFrom: location.href }, "", projectHref(project.id));
    dialogReturn.current = projectReturn();
    setSelectedId(project.id);
  };
  const openProjectLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const project = projects.find((entry) => entry.id === id);
    if (!project) return;
    event.preventDefault();
    openProject(project);
  };
  const closeProject = () => {
    if (closing.current) return;
    if (dialogReturn.current) {
      closing.current = true;
      history.back();
      return;
    }
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
  const dialog = (
    <ProjectDialog key="project-dialog" project={selected} language={language} version={version}
      versionControl={versionControl} onToggleLanguage={toggleLanguage} onClose={closeProject} />
  );
  if (version === 2) {
    return (
      <div className="portfolio-v2" lang={language}>
        <a className="skip-link" href="#projects">{language === "ko" ? "R&D 바로가기" : "Skip to R&D"}</a>
        <header className="v2-masthead" ref={headerRef} onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }
        }}>
          <div className="v2-inner v2-masthead-row">
            <a className="v2-wordmark" href="#about" onClick={(event) => {
              event.preventDefault();
              navigateTo("about");
            }}>Gyutak Hahn</a>
            <button className="v2-menu-toggle" type="button" ref={menuButtonRef}
              aria-controls="v2-navigation" aria-expanded={menuOpen}
              aria-label={language === "ko" ? "섹션 메뉴" : "Section menu"}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="v2-navigation" id="v2-navigation" aria-label="Main navigation" data-open={menuOpen}>
              {navigation.map(({ id, label }) => (
                <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(id);
                  }}>{label}</a>
              ))}
            </nav>
            {controls}
          </div>
        </header>
        <main>
          <ProfileV2 data={data} language={language} resumeHref={resumeHref} />
          <PortfolioResearch language={language} projects={projects} visible={visible} filter={filter}
            onFilterChange={setFilter} onOpenProject={openProject} />
          <PublicationsV2 data={data} language={language} />
          <ToolkitV2 data={data} language={language} projectHref={projectHref} onProjectClick={openProjectLink} />
          <ExperienceV2 data={data} language={language} projectHref={projectHref} onProjectClick={openProjectLink} />
          <ContactV2 data={data} language={language} resumeHref={resumeHref} copied={copied} copyEmail={copyEmail} />
        </main>
        {dialog}
      </div>
    );
  }
  return (
    <div className="portfolio-v1">
      <a className="skip-link" href="#projects">
        Skip to R&amp;D
      </a>
      {controls}
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
          <motion.span
            className="nav-indicator"
            aria-hidden="true"
            initial={false}
            animate={{ x: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
            transition={reduceMotion ? { duration: 0 } : spring}
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
                {filter === f.id && (
                  <motion.span
                    className="filter-indicator"
                    layoutId="filter-indicator"
                    aria-hidden="true"
                    transition={reduceMotion ? { duration: 0 } : quickSpring}
                  />
                )}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {visible.length} R&amp;D entries
          </p>
          <div className="project-grid">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} language={language} onOpen={openProject} />
              ))}
            </AnimatePresence>
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
              {aiRush && (
                <>
                  <h3 className="group-title">Activities</h3>
                  <div className="research-list">
                    <article>
                      <time>{aiRush.period}</time>
                      <h4>{aiRush.title}</h4>
                      <span className="research-role">{aiRush.role}</span>
                      <p>{aiRush.description}</p>
                    </article>
                  </div>
                </>
              )}
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
                lang="en"
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
                {data.awards.map(({ year, title, organization, projectId }) => (
                  <div key={title}>
                    <time>{year}</time>
                    <div>
                      <h4>
                        {projectId ? (
                          <a className="award-project-link" href={projectHref(projectId)}
                            onClick={(event) => openProjectLink(event, projectId)}>
                            <span>{title}</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </a>
                        ) : title}
                      </h4>
                      {organization && <p>{organization}</p>}
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
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  className="copy-icon"
                  key={copied ? "copied" : "copy"}
                  initial={reduceMotion ? false : { opacity: 0, y: 4, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.8 }}
                  transition={reduceMotion ? { duration: 0 } : { ...quickSpring, opacity: { duration: 0.1 } }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </motion.span>
              </AnimatePresence>
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
      {dialog}
    </div>
  );
}
