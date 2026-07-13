import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

const PrivacyPolicy = () => {
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
                Privacy Policy
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh] pr-4">
                <div className="space-y-6 text-gray-800 dark:text-gray-200">
                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">1. Information We Collect</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>To keep the platform authentic and secure, we collect the following data:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Account Details:</strong> Verifiable name, email address, and authentication status.</li>
                        <li><strong>Academic Profile:</strong> Real college name, branch, and graduating year. Using disposable emails or false details is strictly prohibited.</li>
                        <li><strong>Content Uploads:</strong> Shared study materials, notes, roadmaps, and contributor metadata.</li>
                        <li><strong>Security Logs:</strong> IP address, device fingerprints, and signup attempt history (to prevent bot registrations).</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">2. How We Use Your Information</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>We use the collected information solely to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Maintain a safe, academic learning environment for students.</li>
                        <li>Verify that users are real students from legitimate colleges.</li>
                        <li>Display uploaded notes and recognize contributors in the Hall of Fame.</li>
                        <li>Moderate content uploads and prevent spam or commercial abuse.</li>
                        <li>Enforce device/IP blocks for users violating terms (e.g., using temp mail or selling notes).</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">3. Data Sharing & Protection</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        We do not sell, rent, or trade your personal information. Your profile details (name, college, branch, year) 
                        and uploaded notes are displayed only within the platform to facilitate student collaboration.
                      </p>
                      <p className="mt-2 text-red-500 font-bold">
                        Any attempt to scrape or harvest profile data or notes from this website is strictly illegal and will lead to legal action.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">4. Cookies & Session Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies and secure local storage to keep you logged in and preserve your settings. 
                      You can control cookies in your browser settings, but blocking them may prevent login.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">5. Data Retention & Account Deletion</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your account details as long as your account is active. If your account is suspended or banned 
                      due to term violations (like using fake details or temporary email addresses), we retain your device details 
                      and IP logs indefinitely to enforce the ban.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-500 mb-3">6. Policy Updates & Contact</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy periodically. For any privacy-related questions or data deletion requests, contact us at:
                      <br /><br />
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
              onClick={() => window.open(`${window.location.origin}/privacy-policy.html`, '_blank')}
              className="flex items-center gap-2 mx-auto"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Privacy Document
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;