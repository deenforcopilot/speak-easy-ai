import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-muted-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-secondary-foreground">
              ScriptLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/generator" className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors">
              Generator
            </Link>
            <Link to="/polisher" className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors">
              Polisher
            </Link>
            <Link to="/practice" className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors">
              Practice
            </Link>
            <Link to="/teleprompter" className="text-sm text-muted-foreground hover:text-secondary-foreground transition-colors">
              Teleprompter
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/50">
                Dashboard
              </Button>
            </Link>
            <Link to="/generator">
              <Button className="glow-orange">
                Try Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-muted-foreground/10">
            <div className="flex flex-col gap-4">
              <Link 
                to="/generator" 
                className="text-secondary-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Generator
              </Link>
              <Link 
                to="/polisher" 
                className="text-secondary-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Polisher
              </Link>
              <Link 
                to="/practice" 
                className="text-secondary-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Practice
              </Link>
              <Link 
                to="/teleprompter" 
                className="text-secondary-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Teleprompter
              </Link>
              <Link 
                to="/dashboard" 
                className="text-secondary-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/generator" onClick={() => setIsOpen(false)}>
                <Button className="w-full glow-orange">Try Free</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
