import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-center">
                Terms of Service
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh] pr-4">
                <div className="space-y-6 text-gray-800 dark:text-gray-200">
                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">1. Acceptance of Terms & Educational Scope</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using College Study Hub, you agree to comply with and be bound by these Terms of Service. 
                      This platform is built exclusively for students to share academic resources, notes, and roadmaps, facilitating peer-to-peer 
                      learning and collaboration between batchmates and juniors.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">2. Strictly Non-Commercial (Low & Middle-Income Family Support)</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      College Study Hub is a non-profit academic initiative designed to support students, particularly those from <strong>low-income and middle-class families</strong>, 
                      by providing free or highly minimalistic-priced study materials. 
                      <strong className="text-red-500 block mt-2">Any commercial exploitation, selling of notes, charging for shared materials, or using platform resources for commercial purposes is strictly prohibited and illegal.</strong>
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">3. False Information & Disposable Email Abuse</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To maintain a secure and accountable learning community, <strong>all users must register using their real, verifiable academic credentials</strong> 
                      (including full legal name, real college name, branch, and graduation year). 
                      <strong className="text-red-500 block mt-2">Signing up using fake names, false college details, or disposable/temporary/fake email services is strictly prohibited and constitutes a breach of service.</strong> 
                      Any account detected using fake information or disposable emails will be permanently terminated immediately. We reserve the right to report such fraud to college administrations and initiate legal proceedings if necessary.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">4. Intellectual Property & Redistribution Ban</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      All notes and study materials shared here are intended for <strong>personal academic use only</strong>. 
                      You are strictly prohibited from copying, scraping, downloading, or redistributing materials from College Study Hub 
                      to publish them on other websites, apps, Telegram channels, public drives, or local groups without prior written permission from the platform administrators. 
                      Any unauthorized redistribution of materials will result in an immediate device/IP ban and legal action for copyright infringement.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">5. Misuse of Public Information & Scraping</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Any attempt to scrape user data, profiles, notes, admin/contributor lists, or email addresses from this platform, 
                      whether manually or using automated scripts (bots, crawlers, APIs), is strictly illegal. 
                      Misusing open contact information displayed on the website for spam, commercial outreach, or harassment will lead to immediate legal action and permanent IP banning.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">6. Content Moderation & Account Suspension</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      All user-contributed materials are subject to strict administrative moderation. Administrators reserve the right to 
                      review, edit, reject, or delete any content, and suspend or permanently ban any account at their sole discretion, 
                      without prior warning, if they find any violation of these terms or behavior detrimental to the student community.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">7. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      College Study Hub provides its platform and contents on an "as-is" basis. We make no guarantees regarding the 100% accuracy, 
                      validity, or completeness of user-uploaded notes. The platform is not liable for any academic or personal damages arising 
                      from the use of resources hosted on this site.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">8. Changes to Terms & Contact</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify these terms at any time. Continued usage of the platform after updates constitutes acceptance of the new terms.
                      <br /><br />
                      For inquiries, reporting violations, or disputes, contact us at:
                      <br />
                      <strong>Email:</strong> collegestudy.support@gmail.com
                      <br />
                      <strong>Phone:</strong> +91 8957221543
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* External Link Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <Button 
              variant="outline" 
              onClick={() => window.open(`${window.location.origin}/terms-of-service.html`, '_blank')}
              className="flex items-center gap-2 mx-auto"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Terms Document
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;