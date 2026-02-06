import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { 
  Users, 
  Link as LinkIcon, 
  Copy, 
  Star,
  MessageSquare,
  Clock,
  Play,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const mockReviews = [
  {
    id: 1,
    sessionTitle: "Q4 Sales Presentation",
    date: "2 days ago",
    duration: "5:32",
    reviews: [
      {
        reviewer: "Alex",
        rating: 4,
        comment: "Great opening! Maybe slow down a bit in the middle section. The closing was powerful.",
        timestamp: "1:45",
      },
      {
        reviewer: "Sarah",
        rating: 5,
        comment: "Really confident delivery. I loved how you used that statistic at the beginning.",
        timestamp: "0:30",
      },
    ],
    averageRating: 4.5,
  },
  {
    id: 2,
    sessionTitle: "Team Introduction",
    date: "1 week ago",
    duration: "3:15",
    reviews: [
      {
        reviewer: "Mike",
        rating: 4,
        comment: "Good energy! Try making more eye contact with the camera.",
        timestamp: "2:00",
      },
    ],
    averageRating: 4,
  },
];

const PeerReview = () => {
  const [shareLink, setShareLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateShareLink = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const link = `https://scriptlab.app/review/${Math.random().toString(36).substring(7)}`;
    setShareLink(link);
    setIsGenerating(false);
    
    toast({
      title: "Share link created! 🔗",
      description: "Anyone with this link can leave feedback",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copied! 📋",
      description: "Share this link with your reviewers",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Peer Feedback
            </h1>
          </div>
          <p className="text-muted-foreground">
            Share your practice sessions and get feedback from friends, teammates, or mentors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Share Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                Share for Review
              </CardTitle>
              <CardDescription>
                Create a public link to share your latest practice session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-xl bg-muted/50 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Latest Practice Session</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Q4 Sales Presentation • 5:32
                </p>
                
                {!shareLink ? (
                  <Button 
                    onClick={generateShareLink} 
                    disabled={isGenerating}
                    className="glow-orange"
                  >
                    {isGenerating ? "Generating..." : "Generate Share Link"}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input value={shareLink} readOnly className="text-center" />
                      <Button variant="outline" onClick={copyLink}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anyone with this link can view and leave feedback
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">What reviewers can do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Watch or listen to your recording
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Leave timestamped comments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Rate your performance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    No login required
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Leave Review (Demo) */}
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>
                Preview what reviewers will see
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star className="w-6 h-6 fill-primary text-primary" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Feedback</label>
                <Textarea
                  placeholder="Share your thoughts on this presentation..."
                  rows={4}
                />
              </div>

              <Button className="w-full">Submit Review</Button>
            </CardContent>
          </Card>
        </div>

        {/* Past Reviews */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Reviewed Sessions</h2>
          <div className="space-y-4">
            {mockReviews.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.sessionTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}
                        </span>
                        <span>{session.date}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <span className="font-semibold">{session.averageRating}</span>
                      </div>
                      <Badge variant="secondary">
                        {session.reviews.length} review{session.reviews.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {session.reviews.map((review, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                              {review.reviewer[0]}
                            </div>
                            <span className="font-medium">{review.reviewer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            at {review.timestamp}
                          </div>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PeerReview;
