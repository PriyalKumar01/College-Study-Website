import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, CheckCircle, AlertCircle, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';

const OpportunityUpload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: '',
    description: '',
    location: '',
    apply_url: '',
    deadline: '',
    created_at: new Date().toISOString().slice(0, 10),
    image: null as File | null,
  });

  const categories = ['Internship', 'Full-Time', 'Hackathons', 'Challenges', 'Contests', 'Others'];

  useEffect(() => {
    if (user) {
      checkAdminAccess();
    }
  }, [user]);

  const checkAdminAccess = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_email', user?.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload only JPG, PNG, or WebP images.',
          variant: 'destructive',
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Please upload images smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }

      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to upload opportunities.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.title || !formData.company || !formData.type || !formData.description || !formData.location || !formData.apply_url) {
      toast({
        title: 'Missing information',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      let imageUrl = '';
      
      if (formData.image) {
        // Upload image to Supabase Storage
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `opportunities/${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('opportunity-images')
          .upload(fileName, formData.image);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('opportunity-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Insert opportunity record into database
      const { error: insertError } = await supabase
        .from('opportunities')
        .insert({
          title: formData.title,
          company: formData.company,
          type: formData.type,
          description: formData.description,
          location: formData.location,
          apply_url: formData.apply_url,
          deadline: formData.deadline || null,
          created_at: formData.created_at ? new Date(formData.created_at).toISOString() : new Date().toISOString(),
          image_url: imageUrl,
          created_by: user.id,
          user_name: user.email?.split('@')[0] || 'Admin',
        });

      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: 'Opportunity posted successfully!',
        description: 'The opportunity is now live on the platform.',
      });

      // Reset form
      setFormData({
        title: '',
        company: '',
        type: '',
        description: '',
        location: '',
        apply_url: '',
        deadline: '',
        created_at: new Date().toISOString().slice(0, 10),
        image: null,
      });

      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Navigate to opportunities page
      setTimeout(() => {
        navigate('/opportunities');
      }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="gradient-card text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
              <CardDescription>
                You don't have admin privileges to post opportunities.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Post New Opportunity 🚀
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and share opportunities with students across the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Opportunity Details
                </CardTitle>
                <CardDescription>
                  Fill out the form below to post a new opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Software Engineer Intern"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g., Google"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Category *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Bengaluru, India"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed description of the opportunity..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="apply_url">Apply URL *</Label>
                    <Input
                      id="apply_url"
                      type="url"
                      value={formData.apply_url}
                      onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })}
                      placeholder="https://company.com/careers/apply"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="created_at">Start Date</Label>
                      <Input
                        id="created_at"
                        type="date"
                        value={formData.created_at}
                        onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Deadline (Optional)</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image-upload">Company Logo/Image (Optional)</Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {formData.image && (
                      <p className="text-sm text-success mt-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {formData.image.name} selected
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full btn-hero"
                  >
                    {isUploading ? 'Posting...' : 'Post Opportunity'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Posting Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Accurate Information</h4>
                    <p className="text-sm text-muted-foreground">Ensure all details are accurate and up-to-date</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Clear Description</h4>
                    <p className="text-sm text-muted-foreground">Provide detailed requirements and job description</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Set Deadline</h4>
                    <p className="text-sm text-muted-foreground">Add application deadline for better management</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Legitimate Opportunities</h4>
                    <p className="text-sm text-muted-foreground">Only post verified and legitimate opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityUpload;