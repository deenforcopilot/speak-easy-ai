import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useRef } from "react";
import { 
  Mic, 
  Video,
  Square,
  Play,
  Pause,
  RotateCcw,
  Upload,
  Loader2,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockFeedback = {
  overall: 76,
  metrics: [
    { name: "Speaking Speed", value: 82, status: "good", feedback: "142 WPM - Perfect pace for comprehension" },
    { name: "Clarity", value: 78, status: "good", feedback: "Clear articulation with room for improvement on technical terms" },
    { name: "Tone Variation", value: 65, status: "warning", feedback: "Try varying your pitch more to keep audience engaged" },
    { name: "Confidence", value: 71, status: "good", feedback: "Strong opening, slight hesitation in the middle section" },
    { name: "Filler Words", value: 85, status: "good", feedback: "Only 3 filler words detected - great job!" },
  ],
  strengths: [
    "Strong opening hook that grabs attention",
    "Good use of pauses for emphasis",
    "Clear structure with logical flow",
  ],
  improvements: [
    "Add more vocal variety to avoid monotone",
    "Slow down slightly when explaining complex points",
    "Make more direct statements - reduce hedging language",
  ],
  actionSteps: [
    "Practice the middle section 2-3 more times",
    "Record yourself reading with exaggerated tone, then dial it back 50%",
    "Replace 'I think' and 'maybe' with confident assertions",
  ],
};

const Practice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<typeof mockFeedback | null>(null);
  const [recordingMode, setRecordingMode] = useState<"audio" | "video">("audio");
  const [script, setScript] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setHasRecording(false);
    setFeedback(null);
    
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    toast({
      title: "Recording started 🎙️",
      description: "Speak clearly and at your natural pace",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    toast({
      title: "Recording saved! ✅",
      description: "Click 'Analyze' to get AI feedback",
    });
  };

  const analyzeRecording = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setFeedback(mockFeedback);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete! 🎯",
      description: "Check out your personalized feedback below",
    });
  };

  const resetRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    setFeedback(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-success";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mic className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Practice & AI Feedback
            </h1>
          </div>
          <p className="text-muted-foreground">
            Record yourself speaking and get instant AI coaching on your delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recording Section */}
          <div className="space-y-6">
            {/* Mode Selection */}
            <div className="flex gap-3">
              <Button
                variant={recordingMode === "audio" ? "default" : "outline"}
                onClick={() => setRecordingMode("audio")}
                className={recordingMode === "audio" ? "" : ""}
              >
                <Mic className="w-4 h-4 mr-2" />
                Audio Only
              </Button>
              <Button
                variant={recordingMode === "video" ? "default" : "outline"}
                onClick={() => setRecordingMode("video")}
              >
                <Video className="w-4 h-4 mr-2" />
                Video + Audio
              </Button>
            </div>

            {/* Recording Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recording Studio</CardTitle>
                <CardDescription>
                  {isRecording ? "Recording in progress..." : "Click to start recording"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Recording Preview Area */}
                <div className={cn(
                  "aspect-video rounded-xl flex items-center justify-center mb-6 transition-colors",
                  isRecording ? "bg-destructive/10 border-2 border-destructive" : "bg-muted"
                )}>
                  {recordingMode === "video" ? (
                    <div className="text-center">
                      <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Camera preview</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-all",
                        isRecording ? "bg-destructive animate-pulse" : "bg-muted-foreground/20"
                      )}>
                        <Mic className={cn(
                          "w-10 h-10",
                          isRecording ? "text-destructive-foreground" : "text-muted-foreground"
                        )} />
                      </div>
                      {isRecording && (
                        <div className="text-3xl font-mono font-bold text-destructive">
                          {formatTime(recordingTime)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  {!isRecording && !hasRecording && (
                    <Button onClick={startRecording} size="lg" className="glow-orange">
                      <Mic className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <Button onClick={stopRecording} size="lg" variant="destructive">
                      <Square className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  )}

                  {hasRecording && !isAnalyzing && !feedback && (
                    <>
                      <Button onClick={resetRecording} variant="outline" size="lg">
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Re-record
                      </Button>
                      <Button onClick={analyzeRecording} size="lg" className="glow-orange">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Analyze
                      </Button>
                    </>
                  )}

                  {isAnalyzing && (
                    <Button disabled size="lg">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </Button>
                  )}

                  {feedback && (
                    <Button onClick={resetRecording} variant="outline" size="lg">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Practice Again
                    </Button>
                  )}
                </div>

                {hasRecording && !feedback && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Recording: {formatTime(recordingTime)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Optional Script */}
            <Card>
              <CardHeader>
                <CardTitle>Your Script (Optional)</CardTitle>
                <CardDescription>Paste your script to practice with</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your script here to reference while practicing..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows={6}
                />
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            {!feedback && !isAnalyzing && (
              <Card className="h-full min-h-[500px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Feedback Will Appear Here</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Record yourself speaking, then click "Analyze" to get personalized coaching feedback.
                  </p>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="h-full min-h-[500px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2">Analyzing Your Performance...</h3>
                  <p className="text-muted-foreground">
                    Checking speed, clarity, tone, and confidence
                  </p>
                </CardContent>
              </Card>
            )}

            {feedback && (
              <>
                {/* Overall Score */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                        <div className="text-4xl font-bold text-primary">{feedback.overall}%</div>
                      </div>
                      <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedback.metrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className={cn("text-sm font-medium", getStatusColor(metric.status))}>
                            {metric.value}%
                          </span>
                        </div>
                        <Progress value={metric.value} className="h-2 mb-1" />
                        <p className="text-xs text-muted-foreground">{metric.feedback}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Strengths & Improvements */}
                <div className="grid gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        What You Did Well
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedback.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-success">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-warning" />
                        What to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedback.improvements.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-warning">⚠</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Action Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feedback.actionSteps.map((step, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary font-bold">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Practice;
