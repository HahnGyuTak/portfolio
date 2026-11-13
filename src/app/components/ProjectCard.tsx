import { forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { motion, useIsPresent, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import type { Project } from "../data";
import { copy, type Language } from "../locale";
import { spring } from "../motion";

const external = { target: "_blank", rel: "noopener noreferrer" };

function ResourceLink({
  link,
  project,
}: {
  link: Project["links"][number];
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
      className={link.showLabel ? "resource-link resource-link--labeled" : "resource-link"}
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
        <ExternalLink size={link.showLabel ? 14 : 19} aria-hidden="true" />
      )}
      <span className={link.showLabel ? undefined : "link-tooltip"}>
        {link.label}
        {brand ? ` · ${names[brand]}` : ""}
      </span>
    </a>
  );
}

type ProjectCardProps = {
  project: Project;
  language: Language;
  onOpen: (project: Project) => void;
};

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, language, onOpen },
  forwardedRef,
) {
  const articleRef = useRef<HTMLElement | null>(null);
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const t = copy[language];
  const setRef = useCallback((element: HTMLElement | null) => {
    articleRef.current = element;
    if (typeof forwardedRef === "function") forwardedRef(element);
    else if (forwardedRef) forwardedRef.current = element;
  }, [forwardedRef]);

  useLayoutEffect(() => {
    // Exiting cards remain visible briefly, but must leave the tab order immediately.
    if (articleRef.current) articleRef.current.inert = !isPresent;
  }, [isPresent]);

  return (
    <motion.article
      ref={setRef}
      className={project.id === "wallbaduk" ? "project-card project-card--featured" : "project-card"}
      aria-hidden={!isPresent || undefined}
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
      transition={reduceMotion ? { duration: 0 } : { ...spring, opacity: { duration: 0.12 } }}
    >
      <div className="card-meta">
        <span className={project.id === "wallbaduk" ? "card-featured-label" : undefined}>
          {project.id === "wallbaduk"
            ? t.featuredProject
            : project.category === "research" ? "Research" : "Development"}
        </span>
        <time>{project.period}</time>
      </div>
      <h3>
        <button className="card-title" data-project-id={project.id} onClick={() => onOpen(project)}>
          {project.name}
        </button>
      </h3>
      <p className="card-subtitle">{project.subtitle}</p>
      {project.status && <span className="project-status">{project.status}</span>}
      <p className="card-summary">{project.summary}</p>
      <div className="card-focus">
        <span>Focus</span>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <div className="resource-links">
          {project.links.map((link) => (
            <ResourceLink key={link.url} link={link} project={project.name} />
          ))}
        </div>
        <button
          className="details-button"
          onClick={() => onOpen(project)}
          aria-label={`${project.name} · ${t.details}`}
        >
          Details <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
});

export default ProjectCard;
