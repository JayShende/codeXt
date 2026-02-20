import { User, Palette, Zap, Clock, Rocket, Code2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Sync",
    sDesc: "Sync code and editor settings instantly across users.",
    description:
      "Experience seamless collaboration with live updates for code, language, theme, and editor preferences — no refresh required.",
  },
  {
    icon: Code2,
    title: "Powerful Editor",
    sDesc: "Powered by Monaco Editor — the engine behind VS Code.",
    description:
      "Enjoy intelligent code editing with autocomplete, syntax highlighting, multi-cursor support, and rich developer tooling.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    sDesc: "42+ languages with 40+ beautiful editor themes",
    description:
      "Switch between multiple programming languages and stunning themes to match your workflow and coding vibe..",
  },
  {
    icon: Clock,
    title: "24-Hour Expiry",
    sDesc: "Temporary snippets that auto-expire after 24 hours.",
    description:
      "Share quick code examples without worrying about permanent storage — perfect for interviews, debugging, or demos.",
  },
  {
    icon: Rocket,
    title: "Instant Access",
    sDesc: "No login required to start coding.",
    description:
      "Create and edit snippets instantly. Jump straight into coding without friction.",
  },
  {
    icon: User,
    title: "User Dashboard",

    sDesc: "Sign up to manage and organize your snippets.",
    description:
      "Create an account to save, revisit, and manage your snippets from a clean and intuitive dashboard.",
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-12" id="features">
      <div>
        <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Unleash Your Productivity
        </h2>
        <div className="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 px-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="flex flex-col rounded-xl border px-5 py-6"
              key={feature.title}
            >
              <div className="bg-muted mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <feature.icon className="size-5" />
              </div>
              <span className="text-secondary text-lg font-semibold">
                {feature.title}
              </span>
              <span className="text-md text-muted-foreground">
                {feature.sDesc}
              </span>
              <p className="text-foreground/80 mt-1 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
