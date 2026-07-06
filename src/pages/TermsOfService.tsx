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
                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using College Study Hub, you accept and agree to be bound by the terms 
                      and provision of this agreement. College Study Hub is an educational platform designed 
                      for students to share study materials and career resources.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Educational Use Only</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>The platform is strictly for educational purposes only.</strong> Users may access, 
                      download, and use shared materials solely for personal educational and academic purposes. 
                      Commercial use of any content is strictly prohibited.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Content Sharing and Distribution</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>
                        <strong>Users are not allowed to sell, redistribute, or publicly share any uploaded 
                        notes without explicit permission</strong> from the original author and platform administrators.
                      </p>
                      <p>
                        All shared content must be:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Original work or properly credited with permissions</li>
                        <li>Free from copyright violations</li>
                        <li>Educationally relevant and appropriate</li>
                        <li>Not harmful, offensive, or discriminatory</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Admin Approval Process</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>All shared notes are subject to approval by admin.</strong> Content will be manually uploaded by College Study Hub administrators, with proper credit to the original creators by adding their name in contributor list which is available on home page. The platform 
                      <strong> reserves the right to review, reject, or remove any content </strong> that violates these terms 
                      or is deemed inappropriate for the educational community.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>Users are responsible for:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Ensuring they have the right to share any uploaded content</li>
                        <li>Providing accurate and truthful information</li>
                        <li>Respecting other users and maintaining a positive learning environment</li>
                        <li>Not sharing personal contact information in public areas</li>
                        <li>Not attempting to hack, spam, or misuse the platform</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Account Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Violation of these rules may result in account suspension or permanent ban.</strong> 
                      The platform reserves the right to terminate user accounts without prior notice for violations 
                      of these terms, inappropriate behavior, or misuse of the platform.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Users retain ownership of their original content but grant College Study Hub a license to 
                      display and distribute the content for educational purposes. The platform respects intellectual 
                      property rights and will respond to valid copyright claims.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      User privacy is important to us. Please review our Privacy Policy to understand how we 
                      collect, use, and protect your personal information. By using our platform, you consent 
                      to our privacy practices.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      College Study Hub provides the platform "as is" without warranties. We are not liable for 
                      any damages arising from the use of our platform or the content shared by users. Users 
                      participate at their own risk.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify these terms at any time. Users will be notified of significant 
                      changes, and continued use of the platform constitutes acceptance of the modified terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      For questions about these Terms of Service, please contact us at:
                      <br />
                      Email: collegestudy.support@gmail.com
                      <br />
                      Phone: +91 8957221543
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