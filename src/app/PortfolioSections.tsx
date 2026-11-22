import { type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { type getContent } from "./data";
import { copy, type Language } from "./locale";
import "../styles/portfolio-sections.css";

type SectionProps = {
  language: Language;
  data: ReturnType<typeof getContent>;
};

type ProjectNavigationProps = {
  projectHref: (id: string) => string;
  onProjectClick: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
};

const external = { target: "_blank", rel: "noopener noreferrer" };

function CvLink({ href, language }: { href: string; language: Language }) {
  return (
    <a className="v2-cv-link" href={href} {...external}>
      {language === "ko" ? "CV 보기" : "View CV"}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}

export function ProfileV2({ language, data, resumeHref }: SectionProps & { resumeHref: string }) {
  const t = copy[language];
  return (
    <section className="v2-inner v2-profile" id="about" aria-labelledby="v2-name">
      <div className="v2-nameplate" data-enter>
        <img className="v2-avatar" src="./images/profile.png" alt={t.profileAlt} width="180" height="180" />
        <div>
          <h1 id="v2-name">{data.person.nameEn}</h1>
          <p className="v2-role">AI RESEARCHER &amp; DEVELOPER</p>
        </div>
      </div>
      <div className="v2-profile-body">
        <div className="v2-bio">
          <p className="v2-intro">{t.intro[0]}</p>
          <p className="v2-intro-followup">{t.intro[1]}</p>
          <div className="v2-profile-actions">
            <CvLink href={resumeHref} language={language} />
            <a className="v2-text-link" href={data.person.github} {...external} aria-label={t.github}>
              <img src="./icons/github.svg" alt="" width="19" height="19" />
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="v2-education" aria-labelledby="v2-education-label">
          <p id="v2-education-label" className="v2-education-title">Education</p>
          {data.education.map((entry) => (
            <div className="v2-degree" key={entry.school}>
              <strong>{entry.school}</strong>
              <span>{entry.program}</span>
              <small>{entry.period}</small>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Authors({ names, highlight, lang }: { names: string; highlight: string; lang: Language }) {
  const authors = names.split(" · ");
  return (
    <p className="v2-authors" lang={lang}>
      {authors.map((name, index) => (
        <span key={name}>
          {index > 0 && ", "}
          {name === highlight ? <strong>{name}</strong> : name}
        </span>
      ))}
    </p>
  );
}

export function PublicationsV2({ language, data }: SectionProps) {
  const { submission, publication } = data;
  const publicationDate = publication.date.replace(".", "-");

  return (
    <section className="v2-inner v2-publications" id="publications" aria-labelledby="v2-publications-title">
      <h2 className="v2-section-heading" id="v2-publications-title">Publications</h2>
      <div className="v2-citations">
        <article className="v2-citation">
          <span className="v2-publication-year">{submission.submittedAt.slice(0, 4)}</span>
          <div>
            <div className="v2-venue">
              {submission.venue}
              <span className="v2-review-state">{submission.status}</span>
            </div>
            <h3 lang="en">{submission.title}</h3>
            <Authors names={submission.authors} highlight="Gyu-Tak Hahn" lang="en" />
            <p className="v2-publication-meta">
              <time dateTime={submission.submittedAt.replaceAll(".", "-")}>{submission.submittedAt}</time>{" "}
              {copy[language].submitted}
            </p>
          </div>
        </article>
        <article className="v2-citation">
          <span className="v2-publication-year">{publication.date.slice(0, 4)}</span>
          <div>
            <p className="v2-venue" lang="en" title={publication.venue}>ICROS 2023</p>
            <h3 className="v2-published-title" lang="en">{publication.title}</h3>
            <Authors names={publication.authors} highlight="G. T. Hahn" lang="en" />
            <div className="v2-publication-links">
              <p className="v2-publication-meta">
                <time dateTime={publicationDate}>{publication.date}</time> · pp. {publication.pages}
              </p>
              <a className="v2-text-link" href={publication.url} {...external}>
                {language === "ko" ? "논문 보기" : "Read paper"}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

const toolkitGroups = [
  {
    label: "Research & Modeling",
    icon: "pytorch",
    firstLineItems: 3,
    projects: ["stable", "mote"],
    ko: "시각언어 모델의 속성 결합 연구와 한국어 음성 인식 모델 파인튜닝",
    en: "Attribute binding in vision-language models and fine-tuning speech recognition for Korean",
  },
  {
    label: "Data & Evaluation",
    icon: "python",
    firstLineItems: 3,
    projects: ["mote", "writenow"],
    ko: "회의 음성 전사 평가와 문서 작성용 입출력 데이터 구축",
    en: "Evaluating meeting transcriptions and preparing input–output pairs for document drafting",
  },
  {
    label: "Product Engineering",
    icon: "flutter",
    firstLineItems: 2,
    projects: ["wallbaduk", "lenfit"],
    ko: "실시간 멀티플레이 구현과 모바일 운동 자세 판정",
    en: "Implementing real-time multiplayer and exercise posture detection on mobile",
  },
];

export function ToolkitV2({ language, data, projectHref, onProjectClick }: SectionProps & ProjectNavigationProps) {
  return (
    <section className="v2-toolkit" id="toolkit" aria-labelledby="v2-toolkit-title">
      <div className="v2-inner">
        <h2 className="v2-section-heading" id="v2-toolkit-title">Toolkit</h2>
        <div className="v2-toolkit-grid">
          {toolkitGroups.map((meta) => {
            const group = data.skills.find((group) => group.label === meta.label);
            if (!group) return null;
            return (
              <article className="v2-tool-group" key={group.label}>
                <img className="v2-tool-icon" src={`./icons/${meta.icon}.svg`} alt="" width="42" height="42" loading="lazy" />
                <h3>{group.label}</h3>
                <p className="v2-tool-names">
                  {group.items.slice(0, meta.firstLineItems).join(" · ")}<br />
                  {group.items.slice(meta.firstLineItems).join(" · ")}
                </p>
                <p className="v2-tool-use">{meta[language]}</p>
                <div className="v2-tool-links">
                  {meta.projects.map((id) => {
                    const project = data.projects.find((entry) => entry.id === id);
                    return project && (
                      <a className="v2-text-link" key={id} href={projectHref(id)} onClick={(event) => onProjectClick(event, id)}>
                        {project.name}
                        <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ExperienceV2({ language, data, projectHref, onProjectClick }: SectionProps & ProjectNavigationProps) {
  const research = data.researchHistory.map((entry) => {
    const current = entry.period.endsWith("–");
    const period = current
      ? entry.period + (language === "ko" ? "현재" : "Present")
      : entry.period.replace(/^(\d{4})(\.\d{2}–)(\d{2})$/, "$1$2$1.$3");
    return { ...entry, period, current };
  });
  const souf = data.projects.find((entry) => entry.id === "souf");
  const experience = [...research];
  if (souf) {
    experience.push({
      organization: souf.name,
      period: souf.period,
      role: language === "ko" ? "창업자·대표" : "Founder & CEO",
      topic: language === "ko"
        ? "학생 프리랜서 플랫폼 기획·개발 총괄 및 운영"
        : "Led product planning, development, and operations for a student freelancer platform",
      current: false,
    });
  }
  experience.sort((a, b) => b.period.slice(0, 7).localeCompare(a.period.slice(0, 7)));

  return (
    <section className="v2-inner v2-experience" id="experience" aria-labelledby="v2-experience-title">
      <h2 className="v2-section-heading" id="v2-experience-title">Experience</h2>
      <div className="v2-experience-grid">
        <div className="v2-positions">
          {experience.map((entry) => (
            <article className="v2-position" key={entry.organization}>
              <p className="v2-position-date">
                {entry.period}{entry.current && <span className="v2-current-dot" aria-hidden="true" />}
              </p>
              <div>
                <h3>{entry.organization}</h3>
                <p className="v2-position-summary"><strong>{entry.role}</strong> · {entry.topic}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="v2-awards">
          <h3>Awards</h3>
          {data.awards.map(({ year, title, organization, projectId }) => (
            <div className="v2-award" key={title}>
              <time dateTime={year}>{year}</time>
              <div>
                <p>
                  {projectId ? (
                    <a className="award-project-link" href={projectHref(projectId)}
                      onClick={(event) => onProjectClick(event, projectId)}>
                      <span>{title}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  ) : title}
                </p>
                {organization && <small>{organization}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactV2({ language, data, resumeHref, copied, copyEmail }: SectionProps & {
  resumeHref: string;
  copied: boolean;
  copyEmail: () => void;
}) {
  const { person } = data;
  const t = copy[language];
  return (
    <section className="v2-contact" id="contact" aria-labelledby="v2-contact-title">
      <div className="v2-inner v2-contact-inner">
        <h2 className="v2-section-heading" id="v2-contact-title">Contact</h2>
        <div className="v2-contact-body">
          <div className="v2-email-line">
            <a className="v2-email" href={`mailto:${person.email}`}>{person.email}</a>
            <button className="v2-copy-email" type="button" onClick={copyEmail} aria-label={t.copyEmail} title={t.copyEmail}>
              {copied ? <Check size={24} aria-hidden="true" /> : <Copy size={24} aria-hidden="true" />}
            </button>
          </div>
          <p className="v2-copy-status" role="status">
            {copied ? (language === "ko" ? "이메일 주소를 복사했습니다." : "Email address copied.") : ""}
          </p>
          <CvLink href={resumeHref} language={language} />
        </div>
        <footer className="v2-contact-footer">
          <a href="#about">{person.nameEn}</a>
          <div className="v2-external-links">
            {[
              { label: "GitHub", url: person.github },
              { label: "Research Blog", url: person.blog },
              { label: "LinkedIn", url: person.linkedin },
            ].map((link) => (
              <a className="v2-text-link" key={link.label} href={link.url} {...external}>
                {link.label} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
