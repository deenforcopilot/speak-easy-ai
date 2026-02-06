import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { 
  Wand2, 
  Copy, 
  Download, 
  Loader2,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tones = [
  { value: "friendly", label: "Friendly", emoji: "😊", description: "Warm and approachable" },
  { value: "formal", label: "Formal", emoji: "👔", description: "Professional and structured" },
  { value: "inspiring", label: "Inspiring", emoji: "✨", description: "Motivational and uplifting" },
  { value: "persuasive", label: "Persuasive", emoji: "💪", description: "Convincing and compelling" },
];

const mockPolishedScript = `Did you know that public speaking fear affects more people than any other phobia? Today, I'll share three proven strategies that transformed nervous speakers into confident presenters.

First, let's talk about preparation. The most confident speakers aren't born that way—they're prepared. When you know your material thoroughly, your mind can focus on connecting with your audience rather than remembering what comes next.

Second, practice with purpose. Don't just rehearse—record yourself, watch it back, and identify one thing to improve each time. Small, consistent improvements compound into remarkable transformation.

Third, embrace the nervousness. Those butterflies in your stomach? They're actually energy waiting to be channeled. The best speakers learn to use that adrenaline to fuel their passion, not paralyze their performance.

Here's your action step: Before your next presentation, practice it three times out loud. Not in your head—out loud. You'll be amazed at the difference.

Remember: every expert was once a beginner. Your journey to confident speaking starts with a single step. Take that step today.`;

const Polisher = () => {
  const [originalScript, setOriginalScript] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedScript, setPolishedScript] = useState("");
  const { toast } = useToast();

  const handlePolish = async () => {
    if (!originalScript.trim()) {
      toast({
        title: "No script provided",
        description: "Please paste your script to polish",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTone) {
      toast({
        title: "Select a tone",
        description: "Please choose how you want your script to sound",
        variant: "destructive",
      });
      return;
    }

    setIsPolishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPolishedScript(mockPolishedScript);
    setIsPolishing(false);
    
    toast({
      title: "Script polished! ✨",
      description: "Your script has been enhanced and refined.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(polishedScript);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Your polished script has been copied.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Script Polisher
            </h1>
          </div>
          <p className="text-muted-foreground">
            Transform your draft into a polished, professional speech. Paste your script and let AI refine it.
          </p>
        </div>

        {/* Tone Selection */}
        <div className="mb-6">
          <Label className="mb-3 block">Choose Your Tone</Label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {tones.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all",
                  selectedTone === tone.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                )}
              >
                <div className="text-2xl mb-2">{tone.emoji}</div>
                <div className="font-semibold">{tone.label}</div>
                <div className="text-sm text-muted-foreground">{tone.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Original Script */}
          <Card>
            <CardHeader>
              <CardTitle>Your Original Script</CardTitle>
              <CardDescription>Paste your current draft here</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your script here... 

For example:
'Hi everyone, today I want to talk about public speaking. It's scary for many people. But it doesn't have to be. There are ways to get better at it. First, you need to practice. Second, you should know your material. Third, try to relax. That's basically it. Thanks.'"
                value={originalScript}
                onChange={(e) => setOriginalScript(e.target.value)}
                className="min-h-[400px] resize-none"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {originalScript.split(/\s+/).filter(Boolean).length} words
                </span>
                <Button 
                  onClick={handlePolish}
                  disabled={isPolishing || !originalScript.trim() || !selectedTone}
                  className="glow-orange"
                >
                  {isPolishing ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Polishing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 w-4 h-4" />
                      Polish Script
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Polished Script */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {polishedScript && <CheckCircle className="w-5 h-5 text-success" />}
                    Polished Version
                  </CardTitle>
                  <CardDescription>
                    {polishedScript ? "Enhanced and refined" : "Your improved script will appear here"}
                  </CardDescription>
                </div>
                {polishedScript && (
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
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!polishedScript && !isPolishing && (
                <div className="min-h-[400px] flex items-center justify-center text-center p-8">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Ready to Transform</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Paste your script on the left, select a tone, and click "Polish Script"
                    </p>
                  </div>
                </div>
              )}

              {isPolishing && (
                <div className="min-h-[400px] flex items-center justify-center text-center">
                  <div>
                    <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                    <h3 className="font-semibold mb-2">Polishing Your Script...</h3>
                    <p className="text-sm text-muted-foreground">
                      Removing fluff, improving flow, adjusting tone
                    </p>
                  </div>
                </div>
              )}

              {polishedScript && !isPolishing && (
                <div className="space-y-4">
                  <div className="min-h-[400px] p-4 rounded-lg bg-muted/50 text-foreground leading-relaxed whitespace-pre-wrap">
                    {polishedScript}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {polishedScript.split(/\s+/).filter(Boolean).length} words
                    </span>
                    <Button>
                      Practice This Script
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Polisher;
