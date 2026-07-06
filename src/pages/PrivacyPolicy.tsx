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
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>We collect information you provide directly to us, such as:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Account information (name, email, student ID)</li>
                        <li>Profile information (branch, semester, bio)</li>
                        <li>Uploaded study materials and notes</li>
                        <li>Resume and career information</li>
                        <li>Communication with our support team</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Provide and maintain our educational platform</li>
                        <li>Process and display your uploaded study materials</li>
                        <li>Send you notifications about platform updates</li>
                        <li>Improve our services and user experience</li>
                        <li>Ensure platform security and prevent abuse</li>
                        <li>Provide customer support</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>We may share your information in the following circumstances:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>With other users:</strong> Your name and uploaded content are visible to other platform users</li>
                        <li><strong>For educational purposes:</strong> Study materials you upload are shared with the student community</li>
                        <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                        <li><strong>Service providers:</strong> With trusted third-party services that help us operate the platform</li>
                      </ul>
                      <p className="mt-4">
                        <strong>We do not sell, rent, or trade your personal information to third parties for commercial purposes.</strong>
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We implement appropriate security measures to protect your personal information against 
                      unauthorized access, alteration, disclosure, or destruction. This includes encryption of 
                      sensitive data and regular security assessments.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your information for as long as your account is active or as needed to provide 
                      services. You may request deletion of your account and personal information at any time, 
                      though some information may be retained for legal or administrative purposes.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>We use cookies and similar tracking technologies to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Remember your login status and preferences</li>
                        <li>Analyze platform usage and improve performance</li>
                        <li>Provide personalized content recommendations</li>
                        <li>Ensure platform security</li>
                      </ul>
                      <p>You can control cookie settings through your browser preferences.</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>You have the right to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Access and update your personal information</li>
                        <li>Delete your account and associated data</li>
                        <li>Opt out of non-essential communications</li>
                        <li>Request a copy of your data</li>
                        <li>Lodge a complaint with relevant authorities</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our platform may contain links to third-party websites or integrate with external services. 
                      We are not responsible for the privacy practices of these third parties. We encourage you 
                      to review their privacy policies before providing any personal information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our platform is designed for college students and users must be at least 18 years old. 
                      We do not knowingly collect personal information from children under 18. If we become 
                      aware of such collection, we will take steps to delete the information promptly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Changes to Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy periodically to reflect changes in our practices or 
                      applicable laws. We will notify you of significant changes by posting the updated policy 
                      on our platform and updating the "Last updated" date.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                      <br />
                      Email: collegestudy.support@gmail.com
                      <br />
                      Phone: +91 8957221543
                      <br />
                      <br />
                      We will respond to your inquiries within a reasonable timeframe.
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