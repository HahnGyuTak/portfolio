import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Github,
  Plus,
  X,
  FileText,
} from "lucide-react";
import { data, projects, projectOrder, type Project } from "./data";

const sections = [
  { id: "about", label: "소개" },
  { id: "work", label: "대표 프로젝트" },
  { id: "archive", label: "전체 경험" },
  { id: "journey", label: "이력" },
  { id: "contact", label: "연락" },
];
const external = { target: "_blank", rel: "noopener noreferrer" };

function ProjectVisual({ id }: { id: string }) {
  if (id === "wallbaduk")
    return (
      <div
        className="project-art board-art"
        aria-label="벽바둑 7×7 게임판 구조도"
      >
        <span className="art-caption">WALLBADUK / STRATEGY BOARD GAME</span>
        <div className="game-board" aria-hidden="true">
          {Array.from({ length: 49 }, (_, i) => (
            <span
              key={i}
              className={`board-cell ${[10, 17, 24].includes(i) ? "wall-right" : ""} ${[29, 30, 31].includes(i) ? "wall-bottom" : ""}`}
            >
              {i === 10 ? (
                <i className="stone black" />
              ) : i === 38 ? (
                <i className="stone blue" />
              ) : i === 31 ? (
                <i className="possible" />
              ) : null}
            </span>
          ))}
        </div>
        <div className="art-bottom">
          <span>
            7 × 7<br />
            <b>한 수 너머의 전략</b>
          </span>
          <span className="art-pill">
            iOS + Android <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    );
  if (id === "mote")
    return (
      <div
        className="project-art audio-art"
        aria-label="Mote의 음성 입력, 화자 분리, 전사 과정을 설명하는 도식"
      >
        <span className="art-caption">MOTE / VOICE → INFORMATION</span>
        <div className="audio-window">
          <div className="window-heading">
            <span className="record-dot" />
            회의를 기록하는 중<span>한국어</span>
          </div>
          <div className="waveform" aria-hidden="true">
            {Array.from({ length: 48 }, (_, i) => (
              <i
                key={i}
                style={{
                  height: `${10 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.31)) * 65}px`,
                }}
              />
            ))}
          </div>
          <div className="transcript">
            <span>화자 01</span>
            <div>
              <i />
              <i />
            </div>
          </div>
          <div className="transcript second">
            <span>화자 02</span>
            <div>
              <i />
              <i />
            </div>
          </div>
          <div className="audio-chips">
            <span>Whisper</span>
            <ArrowRight size={13} />
            <span>화자 분리</span>
            <ArrowRight size={13} />
            <span>요약</span>
          </div>
        </div>
        <div className="art-bottom">
          <span>
            MODEL SIZE
            <br />
            <b>
              3.2 GB <span className="muted-arrow">→</span> 820 MB
            </b>
          </span>
          <span className="art-note">양자화 적용</span>
        </div>
      </div>
    );
  return (
    <div
      className="project-art clip-art"
      aria-label="PromptStyler 스타일 토큰 학습과 도메인 일반화 구조도"
    >
      <span className="art-caption">PROMPTSTYLER / STYLE GENERALIZATION</span>
      <div className="style-stack" aria-hidden="true">
        <div className="style-sheet sheet-a">
          A<span>PHOTO</span>
        </div>
        <div className="style-sheet sheet-b">
          A<span>SKETCH</span>
        </div>
        <div className="style-sheet sheet-c">
          A<span>STYLE</span>
        </div>
      </div>
      <div className="clip-flow">
        <span>Learnable style</span>
        <span className="flow-line" />
        <b>CLIP</b>
        <span className="flow-line" />
        <span>Shared meaning</span>
      </div>
      <div className="art-bottom">
        <span>
          LEARN THE STYLE.
          <br />
          <b>Preserve the meaning.</b>
        </span>
        <span className="art-pill">
          Paper → Code <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
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
  }, [project]);
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
            {project.category === "research" ? "RESEARCH" : "PROJECT"} /{" "}
            {project.period}
          </span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="프로젝트 상세 닫기"
          >
            <X size={22} />
          </button>
        </div>
        <h2 id="dialog-title">{project.name}</h2>
        <p className="dialog-subtitle">{project.subtitle}</p>
        <div className="dialog-role">
          <span>MY ROLE</span>
          <p>{project.role}</p>
        </div>
        <div className="detail-block">
          <h3>해결하려던 문제</h3>
          <p>{project.problem}</p>
        </div>
        <div className="detail-block">
          <h3>직접 한 일</h3>
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
                alt="Mote 앱의 회의 녹음 화면"
                loading="lazy"
              />
              <img
                src="./images/mote-summary.jpg"
                alt="Mote 앱의 AI 회의 요약 결과 화면"
                loading="lazy"
              />
            </div>
            <figcaption>실제 앱 화면 · 녹음 및 회의 요약</figcaption>
          </figure>
        )}
        {project.id === "wallbaduk" && (
          <figure className="project-screens">
            <div>
              <img
                src="./images/wallbaduk-game.png"
                alt="벽바둑 개발 버전의 7×7 게임판과 2인 대결 화면"
                loading="lazy"
              />
            </div>
            <figcaption>개발 버전의 실제 대전 화면</figcaption>
          </figure>
        )}
      </div>
    </dialog>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    const update = () => {
      let current = "about";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.38)
          current = section.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      )
        current = "contact";
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
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
      if (a) setIndicator({ left: a.offsetLeft, width: a.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(location.search).get("project");
      setSelected(projects.find((p) => p.id === id) || null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      clearTimeout(copyTimer.current);
    };
  }, []);
  const openProject = (p: Project) => {
    const u = new URL(location.href);
    u.searchParams.set("project", p.id);
    history.replaceState(null, "", u);
    setSelected(p);
  };
  const closeProject = () => {
    const u = new URL(location.href);
    u.searchParams.delete("project");
    history.replaceState(null, "", u);
    setSelected(null);
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
      <a className="skip-link" href="#about">
        본문으로 건너뛰기
      </a>
      <header className="hero" id="top">
        <div className="topbar">
          <a className="wordmark" href="#top" aria-label="한규탁 홈">
            GH<span>.</span>
          </a>
          <span className="topbar-title">
            GYUTAK HAHN
            <br />
            <span>AI RESEARCH & ENGINEERING</span>
          </span>
          <a className="topbar-link" href="./resume.html" {...external}>
            이력서 <ArrowUpRight size={16} />
          </a>
          <a
            className="icon-button github-top"
            href={data.person.github}
            {...external}
            aria-label="GitHub 프로필"
          >
            <Github size={21} />
          </a>
        </div>
        <div className="hero-content">
          <p className="eyebrow">
            <span className="live-dot" /> AI RESEARCHER & DEVELOPER
          </p>
          <h1>
            Learn. Connect.
            <br />
            <span>Build.</span>
          </h1>
          <div className="hero-bottom">
            <div>
              <p className="hero-korean">
                낯선 기술을 배우고, 경험을 연결해,
                <br />쓸 수 있는 결과물로 만듭니다.
              </p>
              <p className="hero-description">
                이미지·텍스트·음성 AI부터 앱 개발과 서비스 운영까지.
                <br className="desktop-break" /> 기술과 사용자 사이를 연결하는
                개발자, 한규탁입니다.
              </p>
            </div>
            <a
              className="round-link"
              href="#work"
              aria-label="대표 프로젝트 살펴보기"
            >
              <ArrowDown size={26} />
              <span>
                EXPLORE
                <br />
                MY WORK
              </span>
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <span>BASED IN SEOUL, KR</span>
          <span>RESEARCH ↔ PRODUCT</span>
          <span>
            SCROLL TO EXPLORE <ArrowDown size={12} />
          </span>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="orbit-label l1">VISION</span>
          <span className="orbit-label l2">LANGUAGE</span>
          <span className="orbit-label l3">AUDIO</span>
        </div>
      </header>
      <nav className="sticky-nav" aria-label="주요 메뉴">
        <div ref={navRef} className="nav-inner">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
            >
              <small>0{i + 1}</small>
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
        <section id="about" className="section about-section">
          <div className="section-label">
            <span>01 / ABOUT</span>
            <span>서로 다른 경험, 하나의 방향</span>
          </div>
          <div className="about-grid">
            <h2>
              모델을 이해하고,
              <br />
              제품으로 연결합니다<span className="blue">.</span>
            </h2>
            <div className="about-copy">
              {data.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <a className="text-link" href="#journey">
                지나온 과정 보기 <ArrowDown size={15} />
              </a>
            </div>
          </div>
          <div className="principles">
            {data.about.principles.map((p, i) => (
              <div key={p.label}>
                <span className="principle-number">0{i + 1}</span>
                <h3>
                  {p.label}
                  <span>↗</span>
                </h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
          <div className="expertise-line">
            <span>WORKING ACROSS</span>
            <p>
              Computer Vision <i>·</i> Language <i>·</i> Audio <i>·</i> Product
              Engineering
            </p>
          </div>
        </section>
        <section id="work" className="section work-section">
          <div className="section-label">
            <span>02 / SELECTED WORK</span>
            <span>연구에서 실제 사용까지</span>
          </div>
          <div className="section-heading">
            <h2>
              생각을 코드로.
              <br />
              코드를 경험으로.
            </h2>
            <p>
              서로 다른 문제에 필요한 기술을 익히고,
              <br />
              직접 구현하며 완성한 세 가지 경험입니다.
            </p>
          </div>
          <div className="featured-list">
            {data.featuredIds.map((id, i) => {
              const p = projects.find((v) => v.id === id)!;
              return (
                <article className={`featured-project feature-${id}`} key={id}>
                  <button
                    className="visual-button"
                    onClick={() => openProject(p)}
                    aria-label={`${p.name} 상세 보기`}
                  >
                    <ProjectVisual id={id} />
                    <span className="visual-open">
                      <Plus size={22} />
                    </span>
                  </button>
                  <div className="feature-copy">
                    <span className="eyebrow">
                      0{i + 1} / {p.kicker.split(" · ")[0]}
                    </span>
                    <h3>
                      {p.name}
                      <span>{p.subtitle}</span>
                    </h3>
                    <p>{p.summary}</p>
                    <div className="feature-result">
                      {id === "promptstyler"
                        ? "논문 재현 · 학습 · 평가 · 시각화"
                        : id === "mote"
                          ? "모델 학습 → 경량화 → API·앱 연동"
                          : "3주 내 양대 마켓 출시 · PPO는 베타 적용"}
                    </div>
                    <div className="tag-list">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <button
                      className="text-link"
                      onClick={() => openProject(p)}
                    >
                      내가 해결한 문제와 기여 <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="archive" className="archive-section">
          <div className="section">
            <div className="section-label">
              <span>03 / EXPERIENCE ARCHIVE</span>
              <span>각 경험을 열어 기여와 결과를 확인하세요</span>
            </div>
            <div className="archive-heading">
              <h2>
                경험의 넓이,
                <br />
                문제 해결의 깊이.
              </h2>
              <div className="filters" role="group" aria-label="경험 분류">
                {data.filters.map((f) => (
                  <button
                    key={f.id}
                    aria-pressed={filter === f.id}
                    className={filter === f.id ? "selected" : ""}
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
            </div>
            <p className="sr-only" aria-live="polite">
              {visible.length}개 경험 표시 중
            </p>
            <div className="archive-table">
              <div className="archive-table-head" aria-hidden="true">
                <span>PERIOD</span>
                <span>PROJECT / RESEARCH</span>
                <span>FOCUS</span>
                <span />
              </div>
              {visible.map((p) => (
                <button
                  className="archive-row"
                  key={p.id}
                  onClick={() => openProject(p)}
                >
                  <span className="archive-date">{p.period}</span>
                  <span className="archive-name">
                    <b>{p.name}</b>
                    <span>{p.subtitle}</span>
                  </span>
                  <span className="archive-tags">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                  <span className="archive-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="journey" className="section journey-section">
          <div className="section-label">
            <span>04 / JOURNEY</span>
            <span>배움과 실험이 쌓인 시간</span>
          </div>
          <h2>
            한 걸음씩,
            <br />
            새로운 영역으로.
          </h2>
          <div className="journey-grid">
            <div className="journey-column">
              <h3 className="column-title">RESEARCH & EDUCATION</h3>
              <div className="timeline">
                {data.researchHistory.map((r, i) => (
                  <div className="timeline-item" key={r.organization}>
                    <span className="timeline-dot" />
                    <time>{i === 0 ? "2025.09 시작" : r.period}</time>
                    <h4>{r.organization}</h4>
                    <span className="timeline-role">{r.role}</span>
                    <p>{r.topic}</p>
                  </div>
                ))}
              </div>
              <div className="education-list">
                {data.education.map((e) => (
                  <div key={e.school}>
                    <span>{e.period}</span>
                    <h4>{e.school}</h4>
                    <p>{e.program}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="journey-column">
              <h3 className="column-title">PUBLICATION</h3>
              <a
                className="publication"
                href={data.publication.url}
                {...external}
              >
                <span className="publication-venue">
                  ICROS 2023 <ArrowUpRight size={20} />
                </span>
                <h4>{data.publication.title}</h4>
                <p>{data.publication.authors}</p>
                <span>제38회 제어로봇시스템학회 학술대회 · pp. 924–925</span>
              </a>
              <h3 className="column-title awards-heading">RECOGNITION</h3>
              <div className="awards-list">
                {data.awards.map((a) => (
                  <div key={a.year}>
                    <span>{a.year}</span>
                    <div>
                      <h4>{a.title}</h4>
                      <p>{a.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a className="text-link" href="./resume.html" {...external}>
                전체 이력 보기 <FileText size={16} />
              </a>
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
        <section id="contact" className="contact-section">
          <div className="section">
            <div className="section-label">
              <span>05 / WHAT'S NEXT?</span>
              <span>함께 풀어갈 다음 문제</span>
            </div>
            <h2>
              Let’s connect<span>.</span>
            </h2>
            <p>
              새로운 문제를 함께 풀어보고 싶습니다.
              <br />
              AI 연구와 개발, 기술을 제품으로 연결하는 기회를 기다립니다.
            </p>
            <div className="email-line">
              <a href={`mailto:${data.person.email}`}>
                {data.person.email}
                <ArrowUpRight />
              </a>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label="이메일 주소 복사"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
              <span className="copy-status" role="status">
                {copied ? "복사했습니다" : ""}
              </span>
            </div>
            <div className="social-links">
              <a href={data.person.github} {...external}>
                <Github size={17} />
                GitHub
                <ArrowUpRight size={15} />
              </a>
              <a href={data.person.blog} {...external}>
                기술 블로그
                <ArrowUpRight size={15} />
              </a>
              <a href={data.person.linkedin} {...external}>
                LinkedIn
                <ArrowUpRight size={15} />
              </a>
              <a href="./resume.html" {...external}>
                이력서
                <ArrowUpRight size={15} />
              </a>
            </div>
            <footer>
              <a className="wordmark" href="#top" aria-label="맨 위로">
                GH<span>.</span>
              </a>
              <span>© {new Date().getFullYear()} GYUTAK HAHN</span>
              <a href="#top">BACK TO TOP ↑</a>
            </footer>
          </div>
        </section>
      </main>
      <ProjectDialog project={selected} onClose={closeProject} />
    </>
  );
}
