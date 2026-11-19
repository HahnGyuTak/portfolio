import { ArrowRight, ExternalLink, FileText, Trophy } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "./data";
import { copy, type Language } from "./locale";
import "../styles/portfolio-research.css";

const filters = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "development", label: "Development" },
];

const cardCopy: Partial<Record<string, Record<Language, string> & { tags: string[] }>> = {
  wallbaduk: {
    ko: "게임을 단독 개발해 3주 만에 iOS·Android에 출시했습니다. 모방학습·PPO와 탐색을 결합한 AI도 정식판에 적용했습니다.",
    en: "I built and shipped the game solo on iOS and Android in three weeks, then released an AI that combines imitation learning, PPO, and search.",
    tags: ["PPO", "Flutter"],
  },
  stable: {
    ko: "시각적 근거를 활용해 추가 학습 없이 MLLM의 속성 결합을 개선했습니다.",
    en: "I used visual evidence to improve attribute binding in multimodal LLMs without additional training.",
    tags: ["Multimodal LLM", "Activation Steering"],
  },
  souf: {
    ko: "학생 프리랜서 플랫폼을 창업하고, 피드·채팅·계약 기능의 개발과 출시 후 운영을 총괄했습니다.",
    en: "I founded a student freelance platform, led development of its feed, chat, and contracts, and managed operations after launch.",
    tags: ["Product Planning", "Startup Operations"],
  },
  mote: {
    ko: "한국어 회의 음성을 화자별로 전사하고 요약을 앱에 연결했습니다.",
    en: "I integrated Korean meeting transcription by speaker and automatic summaries into the app.",
    tags: ["Whisper", "Speaker Diarization"],
  },
  writenow: {
    ko: "문서 샘플로 입출력 데이터를 직접 구축하고, 지정한 JSON 형식으로 응답하도록 GPT를 파인튜닝했습니다.",
    en: "I built paired training data from document samples and fine-tuned GPT to return the required JSON structure.",
    tags: ["GPT Fine-tuning", "Dataset Curation"],
  },
  rested: {
    ko: "물건 찾기·감정 구분 퀴즈를 개발하고, 팀원들과 자가 재활 프로그램에 통합해 시연했습니다.",
    en: "I built object-finding and emotion-recognition quizzes and worked with my team to integrate and demonstrate the rehabilitation app.",
    tags: ["Object Detection", "StarGAN"],
  },
  "diff-svc": {
    ko: "적은 가창 샘플을 DiffWave로 증강해 음성 변환 모델을 학습하고 결과를 비교했습니다.",
    en: "I used DiffWave to augment limited singing recordings, trained voice conversion models, and compared the results.",
    tags: ["DiffWave", "Data Augmentation"],
  },
  lenfit: {
    ko: "관절 각도·위치·이동 방향으로 자세를 판정해 불완전한 반복 동작을 걸러냈습니다.",
    en: "I used joint angles, positions, and movement direction to assess form and filter out incomplete exercise repetitions.",
    tags: ["Google ML Kit", "Pose Estimation"],
  },
  "stargan-ta": {
    ko: "팀원들과 표정 변환 모델의 전이학습을 실험하고 결과를 ICROS 학술대회 논문집에 게재했습니다.",
    en: "My co-authors and I tested transfer learning for facial expression generation and published the results in the ICROS proceedings.",
    tags: ["StarGAN", "Transfer Learning"],
  },
};

const resourceBrands: Record<string, string> = {
  "github.com": "github",
  "huggingface.co": "huggingface",
  "apps.apple.com": "appstore",
  "play.google.com": "googleplay",
};

const resourceLabels: Record<string, Record<Language, string>> = {
  "/MettingApp/AI": { ko: "AI", en: "AI" },
  "/HahnGyuTak/openai-whisper-finetuning": { ko: "학습", en: "Training" },
  "/Hanium-MIRACLE/Lenfit": { ko: "자세", en: "Pose" },
  "/Hanium-MIRACLE/lenfit-app": { ko: "앱", en: "App" },
  "/non/stuTlnt/view.do": { ko: "대상", en: "Prize" },
};

function ProjectResources({ project, language }: { project: Project; language: Language }) {
  if (project.links.length === 0) return null;

  return (
    <div className="v2-card-resources">
      {project.links.map((link) => {
        const { hostname, pathname } = new URL(link.url);
        const brand = resourceBrands[hostname];
        const label = resourceLabels[pathname]?.[language] ?? (link.showLabel ? link.label : "");
        const accessibleLabel = `${project.name} · ${link.label}`;
        const isAward = pathname === "/non/stuTlnt/view.do";
        const Icon = isAward ? Trophy : hostname === "hahngyutak.github.io" ||
          hostname === "www.dbpia.co.kr" || pathname.endsWith("/download.do")
          ? FileText
          : ExternalLink;

        return (
          <a
            className="v2-card-resource"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={accessibleLabel}
            title={accessibleLabel}
            key={link.url}
          >
            {brand
              ? <img src={`./icons/${brand}.svg`} alt="" width={18} height={18} />
              : <Icon size={18} strokeWidth={1.65} aria-hidden="true" />}
            {label && <span>{label}</span>}
          </a>
        );
      })}
    </div>
  );
}

function ResearchCard({
  project,
  language,
  onOpenProject,
}: {
  project: Project;
  language: Language;
  onOpenProject: (project: Project) => void;
}) {
  const profile = cardCopy[project.id];
  const t = copy[language];
  const wallbaduk = project.id === "wallbaduk";
  const mote = project.id === "mote";
  const detailUrl = new URL(window.location.href);
  detailUrl.searchParams.set("project", project.id);
  detailUrl.searchParams.set("lang", language);
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onOpenProject(project);
  };

  return (
    <article
      className={wallbaduk ? "v2-card v2-card--wallbaduk" : "v2-card"}
      data-project-id={project.id}
    >
      {wallbaduk && (
        <div className="v2-card-app-icon">
          <img
            src="./images/wallbaduk-app-icon.webp"
            width={640}
            height={640}
            alt={language === "ko" ? "벽바둑 앱 아이콘" : "WallBaduk app icon"}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="v2-card-body">
        <p className="v2-card-category">{project.category === "research" ? "Research" : "Development"}</p>
        <div className="v2-card-copy">
          <div className="v2-card-description">
            <h3>
              <a className="v2-card-link" href={detailUrl.href} onClick={open} title={t.details}>
                {project.name}
                <span className="v2-card-arrow" aria-hidden="true"><ArrowRight size={20} strokeWidth={1.65} /></span>
              </a>
            </h3>
            {project.status && <p className="v2-card-status">{project.status}</p>}
            <p className="v2-card-summary">{profile?.[language] ?? project.summary}</p>
          </div>
          {mote && (
            <div className="v2-card-screens">
              <img src="./images/mote-recording.jpg" width={312} height={676}
                alt={t.moteRecording} loading="lazy" decoding="async" />
              <img src="./images/mote-summary.jpg" width={312} height={676}
                alt={t.moteSummary} loading="lazy" decoding="async" />
            </div>
          )}
        </div>
        <div className="v2-card-footer">
          <ul className="v2-card-tags" aria-label={language === "ko" ? "핵심 기술" : "Focus areas"}>
            {(profile?.tags ?? project.tags).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <ProjectResources project={project} language={language} />
        </div>
      </div>
    </article>
  );
}

export function PortfolioResearch({
  language,
  projects,
  visible,
  filter,
  onFilterChange,
  onOpenProject,
}: {
  language: Language;
  projects: Project[];
  visible: Project[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onOpenProject: (project: Project) => void;
}) {
  return (
    <section id="projects" className="v2-research" aria-labelledby="v2-research-title">
      <div className="v2-inner">
        <div className="v2-research-header">
          <h2 id="v2-research-title">R&amp;D</h2>
          <div className="v2-research-filters" role="group" aria-label="R&D category">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => onFilterChange(id)}
              >
                {label}
                <span>{id === "all" ? projects.length : projects.filter((p) => p.category === id).length}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {language === "ko" ? `R&D 프로젝트 ${visible.length}개` : `${visible.length} R&D projects`}
        </p>
        <div className={`v2-project-grid v2-project-grid--${filter}`}>
          {visible.map((project) => (
            <ResearchCard key={project.id} project={project} language={language} onOpenProject={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}
