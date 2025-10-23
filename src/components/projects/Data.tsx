import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'ResQbot',
    description:
      'ResQBot is an AI-powered WhatsApp assistant designed to deliver real-time earthquake predictions, early warnings, and emergency response — all through a simple chat interface. From analyzing seismic risks based on your location to triggering SOS alerts with live GPS sharing, ResQBot turns disaster preparedness into a fast, accessible conversation. No apps, no friction — just life-saving information when it matters most. One of my most impactful projects yet.',
    techStack: [
      'FastAPI',
      'Uvicorn',
      'Python',
      'WhatsApp Cloud API',
      'FAISS','DeepSeek Coder 1.3B',
      'Flan-T5',
      'Joblib',
      'NumPy',
      'Pandas',
      'Google Colab',
      'dotenv','Logistic Regression',
      'Regression Model'
    ],
    date: '2025',
    links: [
      {
        name: 'Launch Video',
        url: 'https://www.linkedin.com/posts/kanveermadan_ai-disasterresponse-whatsappapi-activity-7331962106788950016-IRmd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFH7nJsBOPqLffgFEBiHRNCRgqj185EiWRc',
      },
      {
        name: 'Usage tutorial',
        url: 'https://www.youtube.com/watch?v=PRu1cfvT2bA',
      }
    ],
    images: [
      {
        src: '/synto1.png',
        alt: 'Synto landing page',
      },
      {
        src: '/synto2.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto3.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto4.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto5.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto6.png',
        alt: 'Synto chat interface',
      },
    ],
  },
  {
    title: 'CareerCraft',
    description:
      "CareerCraft is an AI-powered career assistant built as part of the prestigious Google x Kaggle Generative AI Capstone Challenge. It transforms the traditional job search experience by intelligently analyzing resumes, extracting key insights, and semantically matching them with real-world job descriptions. CareerCraft doesn’t stop at recommendations — it identifies your skill gaps and guides you toward targeted upskilling. Just upload your resume, and let CareerCraft do the thinking — no manual filters, no generic advice. One of my most ambitious and impactful AI projects to date.",
    techStack: ['Python', 'LangChain', 'Google Gemini API','Streamlit','Scikit-Learn','spaCy','Pandas','Numpy'],
    date: '2024',
    links: [
      {
        name: 'website',
        url: 'https://rrate.app',
      },
      {
        name: 'github',
        url: 'https://github.com/toukoum/Rrate',
      },
    ],
    images: [
      {
        src: '/rrate1.png',
        alt: 'Rrate landing page',
      },
      {
        src: '/rrate2.png',
        alt: 'Rrate comparison page',
      },
      {
        src: '/rrate3.png',
        alt: 'Rrate comparison page',
      },
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10 max-h-[calc(100vh-6rem)] overflow-y-auto px-6 pb-36 pr-3 hide-scrollbar">
      {/* Header section with description */}
      <div className="max-h-[calc(100vh-6rem)] overflow-y-auto px-6 pb-36 pt-10 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-3xl custom-scrollbar">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'First Project',
    title: 'ResQbot',
    src: '/resqbot.png',
    content: <ProjectContent project={{ title: 'ResQbot' }} />,
  },
  {
    category: 'Google x Kaggle Gen AI Capstone Project',
    title: 'CareerCraft',
    src: '/careercraft.png',
    content: <ProjectContent project={{ title: 'CareerCraft' }} />,
  },
];
