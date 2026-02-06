import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-navy-gradient overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your AI Speaking Coach 24/7</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Turn Your Fear Into{" "}
            <span className="text-gradient-orange">Confidence</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-primary font-semibold">77% of people</span> fear public speaking more than death. 
            ScriptLab transforms that fear into powerful presentations with AI-powered coaching.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Scripts Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Confidence Boost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/generator">
              <Button size="lg" className="text-lg px-8 py-6 glow-orange group">
                Start Free – No Signup
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-muted-foreground/30 text-secondary-foreground hover:bg-secondary/50">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            ✓ No credit card required &nbsp; ✓ Try all features free &nbsp; ✓ Save progress later
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-secondary/50 border border-muted-foreground/10 backdrop-blur-sm animate-fade-in hover:border-primary/30 transition-colors" style={{ animationDelay: "0.6s" }}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-2">AI Script Generator</h3>
            <p className="text-sm text-muted-foreground">Create professional speeches in minutes with AI</p>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/50 border border-muted-foreground/10 backdrop-blur-sm animate-fade-in hover:border-primary/30 transition-colors" style={{ animationDelay: "0.7s" }}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-2">Practice & Feedback</h3>
            <p className="text-sm text-muted-foreground">Record yourself and get instant AI coaching</p>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/50 border border-muted-foreground/10 backdrop-blur-sm animate-fade-in hover:border-primary/30 transition-colors" style={{ animationDelay: "0.8s" }}>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">See your improvement over time with analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
};
