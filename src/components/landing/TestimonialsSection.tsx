import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Manager",
    avatar: "SC",
    content: "I used to dread presentations. After 2 weeks with ScriptLab, I delivered my best quarterly review ever. My boss was impressed!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "University Student",
    avatar: "JW",
    content: "The AI feedback is like having a speech coach in my pocket. It told me I speak too fast — something no one ever mentioned but was so true!",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Startup Founder",
    avatar: "MG",
    content: "Pitched to investors 3 times before ScriptLab. Failed all 3. After using the Script Generator and practicing with AI feedback, I got funded!",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Sales Executive",
    avatar: "DP",
    content: "The teleprompter mode saved me during a live webinar. I never lost my place, and the flow was seamless. Game changer!",
    rating: 5,
  },
  {
    name: "Emily Foster",
    role: "Teacher",
    avatar: "EF",
    content: "I use ScriptLab to prepare for parent-teacher conferences. The Script Polisher makes my points so much clearer and more professional.",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    role: "Software Engineer",
    avatar: "AK",
    content: "Technical presentations used to terrify me. Now I actually enjoy them. The progress tracking keeps me motivated to improve.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-4">
            Loved by <span className="text-gradient-orange">Speakers Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've transformed their public speaking with ScriptLab
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-secondary/40 border border-muted-foreground/10 backdrop-blur-sm hover:border-primary/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-secondary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-secondary-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
