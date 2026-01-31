import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Edit3, Save, X, User, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  college: string;
  branch: string;
  year: string;
  avatar_url: string;
  created_at: string;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    college: '',
    branch: '',
    year: '',
    avatar_url: '',
    created_at: '',
  });
  
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  // Avatar options
  const avatarOptions = [
    '/lovable-uploads/74279ef2-dc77-4aa2-97ca-c05cd96d2b9a.png',
    '/lovable-uploads/958026bc-6d17-4c26-851b-51683b70eedf.png',
    '/lovable-uploads/f15f6f50-a4a5-4b2e-b676-422e9520a924.png',
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // First try to get from profiles table
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If profile exists in database, use it
      if (profileData) {
        const fetchedProfile: ProfileData = {
          first_name: profileData.first_name || user.user_metadata?.first_name || '',
          last_name: profileData.last_name || user.user_metadata?.last_name || '',
          email: profileData.email || user.email || '',
          mobile_number: profileData.mobile_number || user.user_metadata?.mobile_number || '',
          college: profileData.college || user.user_metadata?.college || '',
          branch: profileData.branch || user.user_metadata?.branch || '',
          year: profileData.year || user.user_metadata?.year || '',
          avatar_url: profileData.avatar_url || '',
          created_at: profileData.created_at || '',
        };
        setProfile(fetchedProfile);
        setEditedProfile(fetchedProfile);
      } else {
        // Fallback to user metadata
        const metaProfile: ProfileData = {
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email: user.email || '',
          mobile_number: user.user_metadata?.mobile_number || '',
          college: user.user_metadata?.college || '',
          branch: user.user_metadata?.branch || '',
          year: user.user_metadata?.year || '',
          avatar_url: '',
          created_at: user.created_at || '',
        };
        setProfile(metaProfile);
        setEditedProfile(metaProfile);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: editedProfile.first_name,
            last_name: editedProfile.last_name,
            college: editedProfile.college,
            branch: editedProfile.branch,
            year: editedProfile.year,
            avatar_url: editedProfile.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email || '',
            first_name: editedProfile.first_name,
            last_name: editedProfile.last_name,
            mobile_number: editedProfile.mobile_number,
            college: editedProfile.college,
            branch: editedProfile.branch,
            year: editedProfile.year,
            avatar_url: editedProfile.avatar_url,
          });

        if (error) throw error;
      }

      // Also update user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: editedProfile.first_name,
          last_name: editedProfile.last_name,
          college: editedProfile.college,
          branch: editedProfile.branch,
          year: editedProfile.year,
        }
      });

      setProfile(editedProfile);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully",
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error saving profile",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getInitials = () => {
    const first = profile.first_name?.[0] || '';
    const last = profile.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-border">
            <CardHeader className="border-b border-border pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold text-foreground">My Profile</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gray-900 hover:bg-gray-800"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-8">
                <Avatar className="h-24 w-24 border-2 border-border">
                  <AvatarImage src={editedProfile.avatar_url || profile.avatar_url} />
                  <AvatarFallback className="text-2xl bg-gray-100 text-gray-600">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2 text-center">Select an avatar:</p>
                    <div className="flex gap-3">
                      {avatarOptions.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => setEditedProfile({ ...editedProfile, avatar_url: url })}
                          className={`rounded-full border-2 transition-all ${
                            editedProfile.avatar_url === url
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={url} />
                          </Avatar>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-foreground mt-4">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>

              {/* Profile Fields */}
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.first_name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, first_name: e.target.value })}
                        className="mt-1 h-10 border-gray-300"
                      />
                    ) : (
                      <p className="mt-1 text-foreground font-medium">{profile.first_name || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.last_name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, last_name: e.target.value })}
                        className="mt-1 h-10 border-gray-300"
                      />
                    ) : (
                      <p className="mt-1 text-foreground font-medium">{profile.last_name || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Email & Contact - Read Only */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <p className="mt-1 text-foreground font-medium">{profile.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Number
                    </Label>
                    <p className="mt-1 text-foreground font-medium">{profile.mobile_number || 'Not provided'}</p>
                    <p className="text-xs text-muted-foreground mt-1">Contact cannot be changed</p>
                  </div>
                </div>

                {/* College Details */}
                <div>
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    College
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.college}
                      onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                      className="mt-1 h-10 border-gray-300"
                      placeholder="e.g., HBTU Kanpur"
                    />
                  ) : (
                    <p className="mt-1 text-foreground font-medium">{profile.college || 'Not set'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Branch</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.branch}
                        onChange={(e) => setEditedProfile({ ...editedProfile, branch: e.target.value })}
                        className="mt-1 h-10 border-gray-300"
                        placeholder="e.g., CSE"
                      />
                    ) : (
                      <p className="mt-1 text-foreground font-medium">{profile.branch || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Year</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.year}
                        onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                        className="mt-1 h-10 border-gray-300"
                        placeholder="e.g., 2nd Year"
                      />
                    ) : (
                      <p className="mt-1 text-foreground font-medium">{profile.year || 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Registration Date */}
                <div>
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Registered On
                  </Label>
                  <p className="mt-1 text-foreground font-medium">{formatDate(profile.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
