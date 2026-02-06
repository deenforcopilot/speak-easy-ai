import { AppLayout } from "@/components/layout/AppLayout";
import { 
  User, 
  TrendingUp, 
  FileText, 
  Mic, 
  Calendar,
  Award,
  Clock,
  Target,
  Flame
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const progressData = {
  overall: {
    current: 76,
    change: 15,
    label: "Overall Speaking Score",
  },
  metrics: [
    { name: "Clarity", value: 78, change: 8, color: "bg-primary" },
    { name: "Confidence", value: 65, change: 12, color: "bg-primary" },
    { name: "Structure", value: 82, change: 5, color: "bg-primary" },
    { name: "Tone", value: 71, change: 18, color: "bg-primary" },
    { name: "Engagement", value: 68, change: 10, color: "bg-primary" },
  ],
  stats: {
    scriptsCreated: 12,
    practicesSessions: 8,
    totalPracticeTime: "2h 35m",
    currentStreak: 5,
  },
  recentActivity: [
    { action: "Practiced", title: "Q4 Sales Presentation", date: "2 hours ago" },
    { action: "Generated", title: "Team Introduction Script", date: "Yesterday" },
    { action: "Polished", title: "Investor Pitch Deck", date: "2 days ago" },
    { action: "Practiced", title: "Product Demo", date: "3 days ago" },
    { action: "Generated", title: "Conference Keynote", date: "1 week ago" },
  ],
  achievements: [
    { name: "First Script", icon: "📝", earned: true },
    { name: "Practice Pro", icon: "🎙️", earned: true },
    { name: "Week Warrior", icon: "🔥", earned: true },
    { name: "Confidence Boost", icon: "💪", earned: true },
    { name: "Perfect Pitch", icon: "🎯", earned: false },
    { name: "Master Speaker", icon: "🏆", earned: false },
  ],
};

const Profile = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Your Progress
            </h1>
          </div>
          <p className="text-muted-foreground">
            Track your speaking improvement over time
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 bg-navy-gradient text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                👤
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">Guest Speaker</h2>
                <p className="text-muted-foreground mb-4">Speaking journey started 2 weeks ago</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{progressData.stats.currentStreak} day streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>{progressData.achievements.filter(a => a.earned).length} achievements</span>
                  </div>
                </div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-secondary/30">
                <div className="text-5xl font-bold text-primary mb-1">{progressData.overall.current}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
                <div className="text-sm text-success mt-1">+{progressData.overall.change}% this month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{progressData.stats.scriptsCreated}</div>
                  <div className="text-sm text-muted-foreground">Scripts Created</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Mic className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{progressData.stats.practicesSessions}</div>
                  <div className="text-sm text-muted-foreground">Practice Sessions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{progressData.stats.totalPracticeTime}</div>
                  <div className="text-sm text-muted-foreground">Practice Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Flame className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{progressData.stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Skill Progress
                </CardTitle>
                <CardDescription>Your improvement across key speaking metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {progressData.metrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-success text-sm">+{metric.change}%</span>
                        <span className="font-semibold">{metric.value}%</span>
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>Milestones on your speaking journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {progressData.achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className={`text-center p-4 rounded-xl ${
                        achievement.earned
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted opacity-50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="text-xs font-medium">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {activity.action}
                          </Badge>
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tip Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="font-semibold mb-2">Keep the momentum!</h3>
                <p className="text-sm text-muted-foreground">
                  You're on a {progressData.stats.currentStreak}-day streak! Practice today to keep it going. 
                  Even 5 minutes of practice can make a difference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
