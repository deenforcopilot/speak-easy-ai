import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect, useRef } from "react";
import { 
  MonitorPlay, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Maximize,
  FlipHorizontal,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const defaultScript = `Welcome everyone, and thank you for being here today.

I'm going to share with you three powerful insights that changed how I think about public speaking.

First, preparation is everything. The most confident speakers aren't born that way — they're prepared.

Second, practice with purpose. Don't just rehearse — record yourself, watch it back, and improve.

Third, embrace your nervousness. Those butterflies? They're energy waiting to be channeled.

Remember: courage is not the absence of fear — it's speaking despite the fear.

Your voice matters. Your ideas matter. The world is waiting to hear what you have to say.

Thank you.`;

const Teleprompter = () => {
  const [script, setScript] = useState(defaultScript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [speed, setSpeed] = useState([50]);
  const [fontSize, setFontSize] = useState([32]);
  const [isMirrored, setIsMirrored] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lines = script.split('\n').filter(line => line.trim());

  useEffect(() => {
    if (isPlaying && currentLine < lines.length) {
      const interval = 6000 - (speed[0] * 50); // Speed range: 1000ms to 5500ms
      intervalRef.current = setInterval(() => {
        setCurrentLine(prev => {
          if (prev >= lines.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, lines.length, currentLine]);

  const togglePlay = () => {
    if (currentLine >= lines.length - 1) {
      setCurrentLine(0);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentLine(0);
  };

  const goToPrevLine = () => {
    setCurrentLine(prev => Math.max(0, prev - 1));
  };

  const goToNextLine = () => {
    setCurrentLine(prev => Math.min(lines.length - 1, prev + 1));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MonitorPlay className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Teleprompter
            </h1>
          </div>
          <p className="text-muted-foreground">
            Never forget your lines. See your script with auto-scroll and line highlighting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Scroll Speed</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Slow</span>
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">Fast</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Small</span>
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      min={18}
                      max={48}
                      step={2}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">Large</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mirror-mode">Mirror Mode</Label>
                  <Switch
                    id="mirror-mode"
                    checked={isMirrored}
                    onCheckedChange={setIsMirrored}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Script</CardTitle>
                <CardDescription>Edit or paste your script</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={script}
                  onChange={(e) => {
                    setScript(e.target.value);
                    setCurrentLine(0);
                    setIsPlaying(false);
                  }}
                  rows={10}
                  className="resize-none"
                  placeholder="Paste your script here..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Teleprompter Display */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Prompter Display</CardTitle>
                  <CardDescription>
                    Line {currentLine + 1} of {lines.length}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={containerRef}
                  className={cn(
                    "bg-navy rounded-xl p-8 min-h-[400px] flex flex-col",
                    isMirrored && "scale-x-[-1]"
                  )}
                >
                  {/* Lines Display */}
                  <div className="flex-1 overflow-hidden relative">
                    <div className="space-y-4 transition-transform duration-500">
                      {lines.map((line, index) => {
                        const distance = Math.abs(index - currentLine);
                        const opacity = index === currentLine ? 1 : Math.max(0.2, 1 - distance * 0.3);
                        const scale = index === currentLine ? 1 : Math.max(0.85, 1 - distance * 0.05);
                        
                        return (
                          <p
                            key={index}
                            style={{
                              fontSize: `${fontSize[0]}px`,
                              opacity,
                              transform: `scale(${scale})`,
                            }}
                            className={cn(
                              "text-center leading-relaxed transition-all duration-300",
                              index === currentLine
                                ? "text-primary font-semibold"
                                : "text-secondary-foreground"
                            )}
                          >
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-muted-foreground/20">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrevLine}
                      disabled={currentLine === 0}
                      className="bg-secondary/50 border-muted-foreground/30 text-secondary-foreground"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={reset}
                      className="bg-secondary/50 border-muted-foreground/30 text-secondary-foreground"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>

                    <Button
                      size="lg"
                      onClick={togglePlay}
                      className={cn(
                        "w-16 h-16 rounded-full",
                        isPlaying ? "bg-destructive hover:bg-destructive/90" : "glow-orange"
                      )}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsMirrored(!isMirrored)}
                      className={cn(
                        "bg-secondary/50 border-muted-foreground/30 text-secondary-foreground",
                        isMirrored && "bg-primary text-primary-foreground"
                      )}
                    >
                      <FlipHorizontal className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextLine}
                      disabled={currentLine >= lines.length - 1}
                      className="bg-secondary/50 border-muted-foreground/30 text-secondary-foreground"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Teleprompter;
