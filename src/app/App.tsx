import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

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

  return (
    <div ref={containerRef} className="bg-white">
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
            viewport={{ once: true, margin: "-100px" }}
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
            viewport={{ once: true, margin: "-100px" }}
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
          viewport={{ once: true, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Publications
        </motion.h2>

        <div className="space-y-12">
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
              viewport={{ once: true, margin: "-50px" }}
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
        </div>
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
          viewport={{ once: true, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "AI Research Platform",
              description:
                "An open-source platform for collaborative AI research with integrated experiment tracking and model versioning.",
              image:
                "https://images.unsplash.com/photo-1649119162006-304b172c12d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NzU3MTYxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
              tech: ["Python", "TensorFlow", "React"],
              type: "Team",
            },
            {
              title: "Data Visualization Tool",
              description:
                "Interactive data visualization library for real-time analytics and reporting.",
              image:
                "https://images.unsplash.com/photo-1665043548178-8e606eca11eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc3NTgwNjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
              tech: ["D3.js", "TypeScript", "Node.js"],
              type: "Solo",
            },
            {
              title: "Neural Style Transfer App",
              description:
                "Mobile application that applies artistic styles to photos using neural networks.",
              image:
                "https://images.unsplash.com/photo-1608682285597-156feb50eb4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3NzU3MTYxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
              tech: ["PyTorch", "Swift", "CoreML"],
              type: "Solo",
            },
            {
              title: "Code Review Assistant",
              description:
                "AI-powered tool that provides automated code review suggestions and best practice recommendations.",
              image:
                "https://images.unsplash.com/photo-1665043547526-a2b0c800d130?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc3NTgwNjU5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
              tech: ["Go", "OpenAI", "Docker"],
              type: "Team",
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
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
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
              </div>
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
          viewport={{ once: true, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Awards & Recognition
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {[
            {
              title: "Best Paper Award",
              org: "International Conference on Machine Learning",
              year: "2025",
            },
            {
              title: "Outstanding Research Achievement",
              org: "ACM SIGCHI",
              year: "2024",
            },
            {
              title: "Young Researcher Award",
              org: "IEEE Computer Society",
              year: "2024",
            },
            {
              title: "Innovation Excellence Award",
              org: "Tech Innovation Summit",
              year: "2023",
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
              viewport={{ once: true, margin: "-50px" }}
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
          viewport={{ once: true, margin: "-100px" }}
          className="text-[clamp(2.5rem,5vw,4rem)] mb-16"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Blog
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              title: "The Future of AI: Trends and Predictions",
              date: "March 2026",
              excerpt:
                "Exploring the emerging trends in artificial intelligence and their potential impact on society.",
            },
            {
              title: "Building Scalable ML Systems",
              date: "February 2026",
              excerpt:
                "Best practices and architectural patterns for deploying machine learning models at scale.",
            },
            {
              title:
                "Understanding Neural Network Architectures",
              date: "January 2026",
              excerpt:
                "A deep dive into modern neural network designs and their applications.",
            },
          ].map((post, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
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
            viewport={{ once: true, margin: "-100px" }}
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
            viewport={{ once: true, margin: "-100px" }}
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
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center gap-8"
          >
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a
              href="https://github.com"
              className="flex items-center gap-3 px-8 py-4 border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
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