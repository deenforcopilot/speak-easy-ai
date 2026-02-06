import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 bg-navy border-t border-muted-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-secondary-foreground">
                ScriptLab
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your AI Speaking Coach 24/7. Transform fear into confidence with AI-powered presentation training.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/generator" className="hover:text-primary transition-colors">Script Generator</Link></li>
              <li><Link to="/polisher" className="hover:text-primary transition-colors">Script Polisher</Link></li>
              <li><Link to="/practice" className="hover:text-primary transition-colors">Practice & Feedback</Link></li>
              <li><Link to="/teleprompter" className="hover:text-primary transition-colors">Teleprompter</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">More</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Progress</Link></li>
              <li><Link to="/peer-review" className="hover:text-primary transition-colors">Peer Reviews</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-muted-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ScriptLab. Your AI Speaking Coach.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for better speakers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
