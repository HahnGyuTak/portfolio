import { useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../data";
import { copy, type Language } from "../locale";
import { quickSpring, spring } from "../motion";

type ProjectDialogProps = {
  project: Project | null;
  language: Language;
  onToggleLanguage: () => void;
  onClose: () => void;
};

function DialogContent({
  project,
  language,
  onToggleLanguage,
  onClose,
}: ProjectDialogProps & { project: Project }) {
  const ref = useRef<HTMLDialogElement>(null);
  const isPresent = useIsPresent();
  const reducedMotion = useReducedMotion();
  const t = copy[language];
  const languageLabel = language === "ko" ? "Switch to English" : "한국어로 보기";

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const focused = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : document.querySelector<HTMLButtonElement>(`[data-project-id="${project.id}"]`);
    const prior = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      // AnimatePresence unmounts only once the exit motion has finished. Keep
      // the native focus trap and scroll lock active until that moment.
      dialog.close();
      document.body.style.overflow = prior;
      if (focused?.isConnected) focused.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      data-exiting={!isPresent}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 10, scale: reducedMotion ? 1 : 0.985 }}
      transition={reducedMotion ? { duration: 0 } : {
        ...spring,
        opacity: { duration: 0.18, ease: "easeOut" },
      }}
      onCancel={(event) => {
        // Prevent the browser's instant close so Escape uses the same exit as
        // the close button and backdrop, then releases focus after the motion.
        event.preventDefault();
        if (isPresent) onClose();
      }}
      onClick={(event) => {
        if (isPresent && event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="eyebrow">
            {project.category === "research" ? "RESEARCH" : "DEVELOPMENT"} /{" "}
            {project.period}
          </span>
          <div className="dialog-actions">
            <motion.button
              className="language-switch language-switch--dialog"
              onClick={() => { if (isPresent) onToggleLanguage(); }}
              aria-label={languageLabel}
              title={languageLabel}
              lang={language === "ko" ? "en" : "ko"}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={quickSpring}
            >
              {language === "ko" ? "EN" : "KO"}
            </motion.button>
            <motion.button
              className="icon-button"
              onClick={() => { if (isPresent) onClose(); }}
              aria-label={t.closeDetails}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={quickSpring}
            >
              <X size={22} />
            </motion.button>
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
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {project.links.length > 0 && (
          <div className="dialog-links">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
        {project.id === "mote" && (
          <figure className="project-screens">
            <div>
              <img src="./images/mote-recording.jpg" alt={t.moteRecording} loading="lazy" />
              <img src="./images/mote-summary.jpg" alt={t.moteSummary} loading="lazy" />
            </div>
            <figcaption>{t.moteCaption}</figcaption>
          </figure>
        )}
        {project.id === "wallbaduk" && (
          <figure className="project-screens">
            <div>
              <img src="./images/wallbaduk-game.png" alt={t.wallbadukAlt} loading="lazy" />
            </div>
            <figcaption>{t.wallbadukCaption}</figcaption>
          </figure>
        )}
      </div>
    </motion.dialog>
  );
}

export default function ProjectDialog(props: ProjectDialogProps) {
  return (
    <AnimatePresence mode="wait">
      {props.project && <DialogContent key={props.project.id} {...props} project={props.project} />}
    </AnimatePresence>
  );
}
