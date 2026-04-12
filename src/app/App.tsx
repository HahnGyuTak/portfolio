import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  date: string;
  excerpt: string;
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0],
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0.95],
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          "https://hahngyutak.github.io/feed.xml",
        );
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const items = xml.querySelectorAll("item");
        const posts: BlogPost[] = Array.from(items)
          .slice(0, 3)
          .map((item) => {
            const title =
              item.querySelector("title")?.textContent || "";
            const link =
              item.querySelector("link")?.textContent || "";
            const pubDate =
              item.querySelector("pubDate")?.textContent || "";
            const description =
              item.querySelector("description")?.textContent ||
              "";

            const date = new Date(pubDate);
            const formattedDate = date.toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
              },
            );

            // 첫 번째 </blockquote> 이후의 내용만 추출
            const blockquoteIndex =
              description.indexOf("</blockquote>");
            const contentAfterBlockquote =
              blockquoteIndex !== -1
                ? description.substring(
                    blockquoteIndex + "</blockquote>".length,
                  )
                : description;

            const excerpt =
              contentAfterBlockquote
                .replace(/<[^>]*>/g, "")
                .trim()
                .substring(0, 150) + "...";

            return {
              title,
              link,
              date: formattedDate,
              excerpt,
            };
          });

        setBlogPosts(posts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setBlogPosts([
          {
            title: "Visit my blog for latest posts",
            date: "",
            excerpt:
              "Check out my blog at hahngyutak.github.io",
            link: "https://hahngyutak.github.io",
          },
        ]);
      } finally {
        setIsLoadingBlog(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div ref={containerRef} className="bg-white relative">
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center px-6 sticky top-0"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight mb-6"
            style={{ fontWeight: 600, lineHeight: 1.1 }}
          >
            Gyutak Hahn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="text-[clamp(1.25rem,3vw,1.75rem)] text-neutral-600"
            style={{ fontWeight: 400 }}
          >
            AI Researcher · Developer · Operator
          </motion.p>
        </div>
      </motion.section>

      {/* Introduce & Education */}
      <Section id="introduce" delay={0}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] mb-8"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              About Me
            </h2>
            <p className="text-[1.125rem] text-neutral-700 leading-relaxed mb-8">
              I am pursuing a master's degree at Korea
              University, studying multi-modal learning —
              focused on building frameworks that mimic human
              multisensory reasoning and designing models for
              natural human-AI interaction.
            </p>
            <p className="text-[1.125rem] text-neutral-700 leading-relaxed mb-8">
              Beyond research, I am passionate about following
              the latest AI trends and turning cutting-edge
              ideas into real products across web and mobile
              domains. Several of my projects have been deployed
              on the App Store, Google Play, and GitHub, with
              some reaching top 100 rankings in their
              categories.
            </p>

            <div className="space-y-6">
              <h3
                className="text-[1.5rem]"
                style={{ fontWeight: 600 }}
              >
                Education
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-neutral-300 pl-6">
                  <p
                    className="text-neutral-900"
                    style={{ fontWeight: 500 }}
                  >
                    M.S. in Artificial Intelligence
                  </p>
                  <p className="text-neutral-600">
                    Korea University, 2025 - Present
                  </p>
                </div>
                <div className="border-l-2 border-neutral-300 pl-6">
                  <p
                    className="text-neutral-900"
                    style={{ fontWeight: 500 }}
                  >
                    B.S. in Intelligent Mechatronics Engineering
                  </p>
                  <p className="text-neutral-600">
                    Sejong University, 2019 - 2025
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NzU3MTYxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Workspace"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Section>

      {/* Papers */}
      <Section id="papers" delay={0.1}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
          }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Publications
        </motion.h2>

        {/* Currently no published papers */}
        {/* <div className="space-y-12">
          {[
            {
              title:
                "Advanced Machine Learning Techniques for Data Analysis",
              venue: "ICML 2025",
              authors: "Your Name, Co-Author",
              year: "2025",
            },
            {
              title:
                "Neural Networks and Deep Learning Applications",
              venue: "NeurIPS 2024",
              authors: "Your Name, Co-Author, Another Author",
              year: "2024",
            },
            {
              title:
                "Computer Vision Systems in Real-World Scenarios",
              venue: "CVPR 2024",
              authors: "Your Name, Research Team",
              year: "2024",
            },
          ].map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              viewport={{ once: false, margin: "-50px" }}
              className="group pb-12 border-b border-neutral-200 last:border-0"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <h3
                    className="text-[1.5rem] mb-3 group-hover:text-neutral-600 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {paper.title}
                  </h3>
                  <p className="text-neutral-600 mb-2">
                    {paper.authors}
                  </p>
                  <p className="text-neutral-500">
                    {paper.venue}
                  </p>
                </div>
                <span
                  className="text-neutral-400"
                  style={{ fontWeight: 500 }}
                >
                  {paper.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
          }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-3xl"
        >
          <p className="text-[1.25rem] text-neutral-600 leading-relaxed">
            Currently conducting research on Multimodal Large
            Language Models (LLMs), exploring how AI systems can
            understand and generate content across multiple
            modalities such as text and images.
          </p>
        </motion.div>
      </Section>

      {/* Projects */}
      <Section id="projects" delay={0.2}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
          }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Data Visualization Tool",
              description:
                "Interactive data visualization library for real-time analytics and reporting.",
              image:
                "data:image/png;base64,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",
              tech: ["D3.js", "TypeScript", "Node.js"],
              type: "Team",
              link: "https://github.com/yourusername/data-viz-tool",
            },
            {
              title: "WallGo",
              description: "Mobile Strategy Board Game",
              image:
                "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/79/9b/ba/799bba5e-f1d3-4514-2268-1d9c75688ead/Placeholder.mill/400x400bb-75.webp",
              tech: ["Flutter", "Reinforcement learning"],
              type: "Solo",
              link: "https://apps.apple.com/kr/app/wall%EB%B0%94%EB%91%91/id6747090524",
            },
            {
              title: "Mote",
              description:
                "AI-based voice meeting transcription app",
              image:
                "https://drive.google.com/file/d/1MUO-nm35zmELc1TwNyVjmgfng_3FxrdR/view?usp=sharing",
              tech: ["Pytorch", "Swift", "Flask", "STT"],
              type: "Team",
              link: "https://github.com/MettingApp",
            },
            {
              title: "Time Auction",
              description:
                "Recreated two games inspired by Devils’ Plan Season 2, a popular reality survival show.",
              image:
                "https://time-auction-client.onrender.com/img/main_title.png",
              tech: ["React"],
              type: "Solo",
              link: "https://time-auction-client.onrender.com",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              viewport={{ once: false, margin: "-50px" }}
              className="group"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 cursor-pointer"
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm"
                  style={{ fontWeight: 500 }}
                >
                  {project.type}
                </div>
              </a>
              <h3
                className="text-[1.75rem] mb-3"
                style={{ fontWeight: 600 }}
              >
                {project.title}
              </h3>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section id="awards" delay={0.3}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
          }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Awards & Recognition
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {[
            {
              title: "Grand Prize",
              org: "Academic Competitions, Department of IME",
              year: "2024",
            },
            {
              title: "Grand Prize",
              org: "16th Annual Creative Design Competition, Sejong Univ",
              year: "2023",
            },
            {
              title: "Selected",
              org: "Hanium ICT Mentoring",
              year: "2023",
            },
            {
              title: "4th Prize",
              org: "SW Coding Contest, Sejong University",
              year: "2019",
            },
          ].map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.33, 1, 0.68, 1],
              }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="text-[1.25rem] flex-1"
                  style={{ fontWeight: 600 }}
                >
                  {award.title}
                </h3>
                <span
                  className="text-neutral-400 ml-4"
                  style={{ fontWeight: 500 }}
                >
                  {award.year}
                </span>
              </div>
              <p className="text-neutral-600">{award.org}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section id="blog" delay={0.4}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
          }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Blog
        </motion.h2>

        {isLoadingBlog ? (
          <div className="text-center text-neutral-400">
            Loading blog posts...
          </div>
        ) : (
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                viewport={{ once: false, margin: "-50px" }}
                className="block group pb-8 border-b border-neutral-200 last:border-0"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <h3
                      className="text-[1.75rem] mb-3 group-hover:text-neutral-600 transition-colors"
                      style={{ fontWeight: 600 }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 mb-2">
                      {post.excerpt}
                    </p>
                    <p className="text-neutral-400 text-sm">
                      {post.date}
                    </p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </Section>

      {/* Contact */}
      <Section id="contact" delay={0.5}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-[clamp(2.5rem,5vw,4rem)] mb-8"
            style={{ fontWeight: 600, lineHeight: 1.1 }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="text-[1.25rem] text-neutral-600 mb-12 leading-relaxed"
          >
            I'm always interested in hearing about new
            opportunities, collaborations, or just having a
            conversation about technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.33, 1, 0.68, 1],
            }}
            viewport={{ once: false, margin: "-100px" }}
            className="flex justify-center gap-8"
          >
            <a
              href="mailto:gthahn@korea.ac.kr"
              className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a
              href="https://github.com/HahnGyuTak"
              className="flex items-center gap-3 px-8 py-4 border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gyutakhahn/"
              className="flex items-center gap-3 px-8 py-4 border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto text-center text-neutral-500 text-sm">
          © 2026 Your Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  children,
  delay,
}: {
  id: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center py-32 px-6 relative bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}