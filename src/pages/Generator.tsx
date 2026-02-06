import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { 
  Sparkles, 
  Clock, 
  Users, 
  Copy, 
  Download, 
  Edit,
  Loader2,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockGeneratedScript = {
  hook: "Did you know that 77% of people fear public speaking more than death? Today, I'm going to show you how to turn that fear into your greatest superpower.",
  mainPoints: [
    {
      title: "Understanding Your Fear",
      content: "Fear of public speaking, or glossophobia, is completely natural. Our brains are wired to perceive social judgment as a threat. But here's the secret: every great speaker you admire once felt exactly what you're feeling right now."
    },
    {
      title: "The Power of Preparation", 
      content: "Confidence doesn't come from being perfect—it comes from being prepared. When you know your material inside and out, your brain can focus on connecting with your audience instead of panicking about what comes next."
    },
    {
      title: "Practice Makes Progress",
      content: "Notice I said 'progress,' not 'perfect.' Every time you practice, you're rewiring your brain. You're building neural pathways that make speaking feel more natural. Start small, practice often, and watch yourself transform."
    }
  ],
  close: "Remember: courage is not the absence of fear—it's speaking despite the fear. Your voice matters, your ideas matter, and the world is waiting to hear what you have to say. So take that first step today. Thank you."
};

const Generator = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [audience, setAudience] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<typeof mockGeneratedScript | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic || !duration || !audience) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGeneratedScript(mockGeneratedScript);
    setIsGenerating(false);
    
    toast({
      title: "Script generated! ✨",
      description: "Your speech is ready. Feel free to edit and customize it.",
    });
  };

  const handleCopy = () => {
    if (!generatedScript) return;
    const fullScript = `${generatedScript.hook}\n\n${generatedScript.mainPoints.map(p => `${p.title}\n${p.content}`).join('\n\n')}\n\n${generatedScript.close}`;
    navigator.clipboard.writeText(fullScript);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Your script has been copied.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              AI Script Generator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Create a professional speech from scratch. Just tell us your topic, and we'll craft a structured presentation for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Speech Details</CardTitle>
              <CardDescription>Tell us about your presentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic / Title *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Overcoming Fear of Public Speaking"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 minutes (Short)</SelectItem>
                    <SelectItem value="5">5 minutes (Standard)</SelectItem>
                    <SelectItem value="10">10 minutes (Extended)</SelectItem>
                    <SelectItem value="15">15+ minutes (Long)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Audience *</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Who will you present to?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friends">Friends & Family</SelectItem>
                    <SelectItem value="colleagues">Colleagues & Team</SelectItem>
                    <SelectItem value="teachers">Teachers & Professors</SelectItem>
                    <SelectItem value="investors">Investors & Stakeholders</SelectItem>
                    <SelectItem value="customers">Customers & Clients</SelectItem>
                    <SelectItem value="general">General Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific points you want to include, tone preferences, etc."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                className="w-full glow-orange"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Generating Your Script...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Generate Script
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <div className="space-y-4">
            {!generatedScript && !isGenerating && (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your Script Will Appear Here</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in the details on the left and click "Generate Script" to create your presentation.
                  </p>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2">Crafting Your Speech...</h3>
                  <p className="text-muted-foreground">
                    Our AI is structuring your presentation with a hook, main points, and memorable close.
                  </p>
                </CardContent>
              </Card>
            )}

            {generatedScript && !isGenerating && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <CardTitle>Your Script is Ready!</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {audience}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hook */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                      🎣 Opening Hook
                    </div>
                    <p className="text-foreground leading-relaxed">{generatedScript.hook}</p>
                  </div>

                  {/* Main Points */}
                  {generatedScript.mainPoints.map((point, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        📌 Point {index + 1}: {point.title}
                      </div>
                      <p className="text-foreground leading-relaxed">{point.content}</p>
                    </div>
                  ))}

                  {/* Close */}
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <div className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">
                      🎯 Memorable Close
                    </div>
                    <p className="text-foreground leading-relaxed">{generatedScript.close}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Script
                    </Button>
                    <Button className="flex-1">
                      Practice This Script
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Generator;
