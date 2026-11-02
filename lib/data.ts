export const profile = {
  name: "Masambu",
  roles: ["Communications & Creative", "Software Engineering"],
  headline: "I shape how organisations communicate, and build the software behind it",
  location: "Uganda",
  intro:
    "I design and build responsive, mobile-first websites, bridging creative direction and clean full-stack engineering.",
  email: "masambue11@gmail.com",
  phone: "+256 782 440907",
  phoneHref: "tel:+256782440907",
  linkedin: "https://www.linkedin.com/in/masambu-emmanuel-0a66b16a/",
  github: "https://github.com/masambuOfficial",
  about:
    "I'm a versatile professional at the intersection of creativity and technology. With a Bachelor of Science in Communication and Media Technology and a Diploma in Information Management Systems, I bring a blend of skills: from multimedia productions to immersive interfaces and full-stack web applications. I thrive where innovation meets aesthetics.",
  education: [
    "BSc in Communication and Media Technology",
    "Diploma in Information Management Systems",
  ],
};

export type CategoryId =
  | "web"
  | "wordpress"
  | "uiux"
  | "graphics"
  | "video";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "wordpress", label: "WordPress" },
  { id: "uiux", label: "UI/UX" },
  { id: "graphics", label: "Brand & Identity" },
  { id: "video", label: "Multimedia" },
];

export type Service = {
  title: string;
  text: string;
  icon: "comms" | "media" | "brand" | "code" | "design";
};

export const tracks: {
  id: string;
  title: string;
  years: number;
  /** Work-filter category opened by "See related work". */
  filter: CategoryId;
  services: Service[];
}[] = [
  {
    id: "creative",
    title: "Communications & Creative",
    years: 11,
    filter: "video",
    services: [
      {
        title: "Communications & awareness strategy",
        text: "Developing communications and awareness strategies: defining the audience and the message, then planning the channels, content and campaigns that carry it.",
        icon: "comms",
      },
      {
        title: "Livestream & audio-visual production",
        text: "Video and livestream production for events, ministries and institutions: planning the audiovisual setup, directing the live stream, and producing episodic series from first shoot to final delivery.",
        icon: "media",
      },
      {
        title: "Brand & visual identity",
        text: "Logos and identity systems for businesses, schools and communities: understanding the brand, sketching and refining the mark, then pairing it with colour and typography that stay consistent across print and screen.",
        icon: "brand",
      },
    ],
  },
  {
    id: "digital",
    title: "Web & Digital Products",
    years: 3,
    filter: "web",
    services: [
      {
        title: "Full-stack development",
        text: "Responsive, mobile-first frontends in Next.js, React and TypeScript, backed by APIs, databases and integrations such as payments and email, built with NestJS and Firebase.",
        icon: "code",
      },
      {
        title: "UI/UX design",
        text: "Interfaces shaped around real workflows, from wireframes to prototypes in Figma.",
        icon: "design",
      },
    ],
  },
];

export type Project = {
  title: string;
  category: CategoryId;
  description?: string;
  /** Local image in /public, or a YouTube thumbnail for video items. */
  image: string;
  /** Short mono label shown on the card, e.g. "Next.js · 2025". */
  meta?: string;
  /** Internal route or external URL. */
  href?: string;
  /** YouTube video id; opens in a modal player when set. */
  youtubeId?: string;
};

export const projects: Project[] = [
  {
    title: "AEW-AEC Conference Platform",
    category: "web",
    description:
      "Full-stack event management for UNESCO Africa Engineering Week: multilingual, with payments and 1000+ registrations.",
    meta: "Next.js · NestJS · 2025",
    image: "/images/aewaec-conference-2025.png",
    href: "/projects/aew-aec",
  },
  {
    title: "Kingdom Life Tabernacle",
    category: "wordpress",
    image: "/images/kingdomlifetabernacle.net.png",
    href: "https://kingdomlifetabernacle.net/",
  },
  {
    title: "Higher Education Students' Financing Board",
    category: "wordpress",
    image: "/images/hesfb.go.ug.png",
    href: "https://hesfb.go.ug/",
  },
  {
    title: "IGAD Support Platform",
    category: "wordpress",
    image: "/images/igadsupportplatform.org.png",
    href: "https://igadsupportplatform.org/",
  },
  {
    title: "Activemakes",
    category: "wordpress",
    image: "/images/activemakes.com.png",
    href: "https://www.activemakes.com/",
  },
  {
    title: "Refactory Information Management System",
    category: "uiux",
    description:
      "A clean, intuitive interface for managing student and institutional data, built around simple, efficient workflows.",
    image: "/images/rims-portal.png",
    href: "https://www.figma.com/proto/R5l024UZvT2NOhnaGs6nmn/refactory-IMS?node-id=953-98&node-type=canvas&t=GxO8Qf1wkqlXtXqS-1&scaling=contain&content-scaling=fixed&page-id=402%3A18&starting-point-node-id=892%3A2&show-proto-sidebar=1",
  },
  {
    title: "Logo Designs",
    category: "graphics",
    description: "A selection of brand identities and logo marks.",
    image: "/images/logo-design-process.jpg",
    href: "/logos",
  },
  {
    title: "Students' Loan Scheme Beneficiaries List AY2024/25",
    category: "video",
    description: "Livestream production and multimedia setup.",
    image: "https://img.youtube.com/vi/lmTdxNdcI3k/hqdefault.jpg",
    youtubeId: "lmTdxNdcI3k",
  },
  {
    title: "Students' Loan Scheme Beneficiaries List AY2023/24",
    category: "video",
    description: "Livestream production and multimedia setup.",
    image: "https://img.youtube.com/vi/8XyJmarucdA/hqdefault.jpg",
    youtubeId: "8XyJmarucdA",
  },
  {
    title: "Tower of Faith Series: TOF Dedication",
    category: "video",
    description: "A 12-episode series, produced end to end.",
    image: "https://img.youtube.com/vi/5ybZaas_DSY/hqdefault.jpg",
    youtubeId: "5ybZaas_DSY",
  },
  {
    title: "10 Years Celebration of the Kingdom Life Ministry",
    category: "video",
    description: "Full multimedia production for the anniversary event.",
    image: "https://img.youtube.com/vi/23ektKhD5ac/hqdefault.jpg",
    youtubeId: "23ektKhD5ac",
  },
];

export const logos = [
  { src: "/images/flourish-hub.jpg", alt: "Flourish Hub logo" },
  {
    src: "/images/kamonkoli-college-old-students-association.png",
    alt: "Kamonkoli College Old Students' Association logo",
  },
  { src: "/images/foodsitoowa.svg", alt: "FoodSitoowa logo" },
];
