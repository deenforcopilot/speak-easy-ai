import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Wand2, 
  Mic, 
  MonitorPlay, 
  Users, 
  TrendingUp,
  ArrowRight,
  Clock,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const quickActions = [
  {
    icon: FileText,
    title: "Generate Script",
    description: "Create a new speech from scratch",
    link: "/generator",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wand2,
    title: "Polish Script",
    description: "Improve your existing script",
    link: "/polisher",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Mic,
    title: "Practice Now",
    description: "Record and get AI feedback",
    link: "/practice",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MonitorPlay,
    title: "Teleprompter",
    description: "Present with confidence",
    link: "/teleprompter",
    color: "bg-primary/10 text-primary",
  },
];

const recentScripts = [
  { title: "Q4 Sales Presentation", date: "2 hours ago", duration: "5 min" },
  { title: "Team Introduction Speech", date: "Yesterday", duration: "3 min" },
  { title: "Product Launch Pitch", date: "3 days ago", duration: "10 min" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to practice your presentation skills today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Scripts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Practice Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2.5h</div>
                  <div className="text-sm text-muted-foreground">Practice Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">+15%</div>
                  <div className="text-sm text-muted-foreground">Improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.link} to={action.link}>
                <Card className="h-full hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Scripts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Scripts
              </CardTitle>
              <CardDescription>Your latest generated and polished scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScripts.map((script, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div>
                      <div className="font-medium">{script.title}</div>
                      <div className="text-sm text-muted-foreground">{script.date} • {script.duration}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Link to="/generator">
                <Button variant="outline" className="w-full mt-4">
                  Create New Script
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Your Progress
              </CardTitle>
              <CardDescription>Track your speaking improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Clarity</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Structure</span>
                    <span className="text-sm text-muted-foreground">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Engagement</span>
                    <span className="text-sm text-muted-foreground">71%</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
              </div>
              <Link to="/profile">
                <Button variant="outline" className="w-full mt-6">
                  View Full Progress
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Tip of the Day */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">💡 Tip of the Day</h3>
                <p className="text-muted-foreground">
                  Start your presentation with a question or surprising fact to grab your audience's attention immediately. 
                  This technique is called a "hook" and can increase engagement by up to 40%!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
