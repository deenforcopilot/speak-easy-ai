import { 
  Sparkles, 
  Wand2, 
  Mic, 
  MonitorPlay, 
  Users, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "AI Script Generator",
    description: "Don't know what to say? Tell us your topic, audience, and time limit — we'll craft a structured speech with a hook, main points, and memorable close.",
    link: "/generator",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Wand2,
    title: "Script Polisher",
    description: "Already have a script? Paste it in, choose your tone — Friendly, Formal, Inspiring, or Persuasive — and watch it transform into a clearer, more powerful version.",
    link: "/polisher",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Mic,
    title: "Practice & AI Feedback",
    description: "Record yourself speaking and get instant coach-style feedback on your speed, clarity, tone, and confidence. Know exactly what to improve after each session.",
    link: "/practice",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MonitorPlay,
    title: "Teleprompter Mode",
    description: "Afraid of forgetting your lines? Our smart teleprompter shows your script line-by-line with auto-scroll and adjustable speed. Never get stuck again.",
    link: "/teleprompter",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Peer Feedback",
    description: "Share your practice sessions with friends, teammates, or mentors. Get real human feedback with comments, ratings, and suggestions.",
    link: "/peer-review",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Watch yourself grow! Track your clarity, confidence, structure, and engagement scores over time. Celebrate your wins and stay motivated.",
    link: "/profile",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-orange">Speak With Confidence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From creating your first script to mastering your delivery — ScriptLab guides you every step of the way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {feature.description}
              </p>
              
              <Link to={feature.link}>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group/btn">
                  Try it now
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
