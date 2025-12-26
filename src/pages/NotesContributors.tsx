import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Award, Medal, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface Contributor {
  rank: number;
  name: string;
  branch: string;
  batch: string;
  
  coins: number;
  medal?: "gold" | "silver" | "bronze";
}

const NotesContributors = () => {
  const navigate = useNavigate();

  const contributors: Contributor[] = [
    {
      rank: 1,
      name: "Rahul Singh",
      branch: "CHE",
      batch: "27",
     
      coins: 87,
      medal: "gold",
    },
    {
      rank: 2,
      name: "Raunak Gupta",
      branch: "EE",
      batch: "28",
      coins: 81,
      
    },
    {
      rank: 3,
      name: "Tanishka Gupta",
      branch: "ET",
      batch: "28",
      
      coins: 74,
      medal: "silver", 
    },
    {
      rank: 4,
      name: "Smriti Dwivedi",
      branch: "CE",
      batch: "28",
      
      coins: 72,
      medal: "bronze",
    },
    {
      rank: 5,
      name: "Vrishti Chauhan",
      branch: "ME",
      batch: "28",
     
      coins: 70,
    },
     {
      rank: 6,
      name: "Kanchan Upadhyay",
      branch: "PT",
      batch: "28",
     
      coins: 67,
    },
    {
      rank: 7,
      name: "Bhoomika",
      branch: "MBA",
      batch: "27",
      
      coins: 54,
      
    },
    {
      rank: 8,
      name: "Ananya Kanujiya",
      branch: "CSE",
      batch: "28",
      
      coins: 30,
      
    }
    ,
    {
      rank: 9,
      name: "Amarendra Sengar",
      branch: "CSE",
      batch: "27",
      
      coins: 15,
      
    }
    ,
    {
      rank: 10,
      name: "Amit Singh",
      branch: "CSE",
      batch: "27",
      
      coins: 13,
      
    }
    ,
    {
      rank: 11,
      name: "Rachna Sharma",
      branch: "FT",
      batch: "28",
      
      coins: 5,
      
    }
    ,
    {
      rank: 12,
      name: "Sudhir Kumar Gupta",
      branch: "CSE",
      batch: "27",
      
      coins: 4,
      
    }
    ,
    {
      rank: 13,
      name: "Vishal Yadav",
      branch: "CSE",
      batch: "27",
      
      coins: 2,
      
    }
    ,
    {
      rank: 13,
      name: "Tanya Verma",
      branch: "FT",
      batch: "28",
      
      coins: 2,
      
    },
    {
      rank: 13,
      name: "Soni Rawat",
      branch: "ME",
      batch: "28",
      
      coins: 2,
      
    },
    {
      rank: 13,
      name: "Kanishtha Mishra",
      branch: "LFT",
      batch: "28",
     
      coins: 2,
    }
    ,
    {
      rank: 14,
      name: "Ankit Yadav",
      branch: "FT",
      batch: "27",
      
      coins: 1,
      
    }
    ,
    {
      rank: 14,
      name: "Aryan Gaurav",
      branch: "IT",
      batch: "27",
      
      coins: 1,
      
    }
    ,
    {
      rank: 14,
      name: "Satyam Tripathi",
      branch: "IT",
      batch: "28",
      
      coins: 1,
      
    }
    ,
    {
      rank: 14,
      name: "Laxita Rajora",
      branch: "PT",
      batch: "29",
      
      coins: 1,
      
    },
    {
      rank: 14,
      name: "Jaideep Kumar",
      branch: "CSE",
      batch: "28",
      
      coins: 1,
      
    }
  ];

  const getMedalIcon = (medal?: string) => {
    switch (medal) {
      case "gold":
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case "silver":
        return <Award className="h-6 w-6 text-gray-400" />;
      case "bronze":
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getMedalColor = (medal?: string) => {
    switch (medal) {
      case "gold":
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
      case "silver":
        return "from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case "bronze":
        return "from-orange-500/20 to-orange-600/20 border-orange-500/50";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Top Contributors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
           <i> This leaderboard recognizes the students who have gone beyond personal learning & selflessly contributed their valuable notes. Their efforts are making studies easier and accessible for everyone in the community.
         </i>   </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {/* <Coins className="h-4 w-4 text-yellow-500" /> */}
            {/* <span>1 Note = 1000 Coins 🪙</span> */}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`feature-card ${
                  contributor.medal
                    ? `bg-gradient-to-r ${getMedalColor(contributor.medal)}`
                    : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                        {contributor.rank}
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1 flex items-center gap-2">
                          {contributor.name}
                          {contributor.medal && getMedalIcon(contributor.medal)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline">
                            {contributor.branch}'{contributor.batch}
                          </Badge>
                          <Badge variant="outline">HBTU</Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg mb-1">
                        <Coins className="h-5 w-5" />
                        {contributor.coins.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">
                         Notes contributed
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Want to Contribute?</h3>
              <p className="text-muted-foreground mb-4">
                Share your notes and help fellow students. Earn coins and get recognized!
              </p>
<Button 
  className="btn-hero " 
  onClick={() => {
    window.open(
      "https://wa.me/918957221543?text=Respected%20Priyal%20Sir%2C%20I%20would%20like%20to%20share%20my%20notes%20to%20help%20other%20students.%20I%E2%80%99ll%20send%20the%20maximum%20possible%20PDFs%20so%20they%20can%20be%20uploaded%20and%20make%20learning%20easier%20and%20more%20accessible%20for%20everyone.",
      "_blank"
    );
  }}
>
  Start Contributing
</Button>


            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotesContributors;
