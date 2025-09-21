import {
  Building,
  Bus,
  Users,
  Scale,
  Landmark,
  Gavel,
  FileText,
} from "lucide-react";

export interface Area {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const areas: Area[] = [
  {
    id: "finance",
    name: "Finance, Infrastructure & Planning",
    description:
      "Managing municipal finances, infrastructure development, and urban planning initiatives.",
    icon: Building,
  },
  {
    id: "public-services",
    name: "Public Services & Urban Mobility",
    description:
      "Overseeing public utilities, maintenance services, and urban transportation systems.",
    icon: Bus,
  },
  {
    id: "community",
    name: "Community Engagement",
    description:
      "Fostering connections with residents and promoting neighborhood participation.",
    icon: Users,
  },
  {
    id: "general",
    name: "General Secretariat",
    description:
      "Coordinating administrative functions and supporting overall municipal operations.",
    icon: FileText,
  },
  {
    id: "legal",
    name: "Legal & Institutional Affairs",
    description:
      "Providing legal counsel and managing institutional relationships.",
    icon: Scale,
  },
  {
    id: "council",
    name: "Deliberative Council",
    description:
      "Legislative body responsible for policy-making and municipal governance.",
    icon: Landmark,
  },
  {
    id: "accounts",
    name: "Court of Accounts",
    description:
      "Overseeing municipal finances and ensuring proper use of public funds.",
    icon: FileText,
  },
  {
    id: "justice",
    name: "Misdemeanor Court",
    description:
      "Handling minor legal infractions and maintaining local order.",
    icon: Gavel,
  },
];
