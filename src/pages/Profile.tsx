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
import { Loader2, ArrowLeft, Edit3, Save, X, User, Mail, Phone, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      setUploadingAvatar(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      // Fallback: If avatars bucket doesn't exist or fails, we can't upload.
      // For now, let's just return null and notify user.
      toast({
        title: "Avatar Upload Failed",
        description: "Could not upload image. Please check bucket permissions.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };


  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    let uploadFailed = false;

    try {
      let finalAvatarUrl = editedProfile.avatar_url;

      if (avatarFile) {
        // Attempt upload
        const publicUrl = await uploadAvatar(avatarFile);
        if (publicUrl) {
          finalAvatarUrl = publicUrl;
        } else {
          uploadFailed = true;
          // We continue saving other fields even if upload failed
        }
      }

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const profileUpdates = {
        first_name: editedProfile.first_name,
        last_name: editedProfile.last_name,
        mobile_number: editedProfile.mobile_number,
        college: editedProfile.college,
        branch: editedProfile.branch,
        year: editedProfile.year,
        // Only update avatar_url if we have a valid new one, or if we are just keeping the old one.
        // If upload failed, we keep the previous URL from editedProfile (which was init from profile)
        // Wait, if upload failed, `finalAvatarUrl` is `editedProfile.avatar_url`. 
        // If the user changed the file, they expect a new URL. If we keep the old one, it's fine as fallback.
        avatar_url: finalAvatarUrl,
      };

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({
            ...profileUpdates,
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
            ...profileUpdates
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
          mobile_number: editedProfile.mobile_number,
          avatar_url: finalAvatarUrl
        }
      });

      setProfile({
        ...editedProfile,
        avatar_url: finalAvatarUrl
      });
      setEditedProfile({
        ...editedProfile,
        avatar_url: finalAvatarUrl
      });
      setAvatarFile(null);
      setAvatarPreview(null);
      setIsEditing(false);

      if (uploadFailed) {
        toast({
          title: "Profile saved partially",
          description: "Details updated, but avatar could not be uploaded due to storage permissions.",
          variant: "destructive", // Orange/Red waring
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your changes have been saved successfully",
        });
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);

      // Handle duplicate key violation (specifically for mobile number)
      if (error.code === '23505' || error.message?.includes('profile_mobile_no')) {
        toast({
          title: "Contact Number Exists",
          description: "This mobile number is already linked to another account. Please use a different number.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving profile",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setAvatarFile(null);
    setAvatarPreview(null);
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

  const isMobileReadOnly = !!profile.mobile_number; // Read-only if it already has a value saved in DB

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200"
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
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200"
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
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-border cursor-pointer">
                    <AvatarImage src={avatarPreview || editedProfile.avatar_url || profile.avatar_url} className="object-cover" />
                    <AvatarFallback className="text-2xl bg-gray-100 text-gray-600">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                      >
                        <span className="text-xs font-medium">Change</span>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </>
                  )}
                </div>

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

                {/* Email & Contact - Read Only Logic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    {/* Email is ALWAYS read-only - With Verified Badge */}
                    <div className="relative">
                      <Input
                        value={profile.email}
                        disabled
                        className="mt-1 h-10 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-300 pr-20 cursor-not-allowed"
                      />
                      <div className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold tracking-wide uppercase">Verified</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      Email cannot be changed
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Number
                    </Label>
                    {isEditing && !isMobileReadOnly ? (
                      <Input
                        value={editedProfile.mobile_number}
                        onChange={(e) => setEditedProfile({ ...editedProfile, mobile_number: e.target.value })}
                        className="mt-1 h-10 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter mobile number"
                      />
                    ) : (
                      <div className="mt-1">
                        {isEditing ? (
                          <div className="relative">
                            <Input
                              value={profile.mobile_number || ''}
                              disabled
                              className="h-10 border-gray-300 bg-muted/50 text-muted-foreground cursor-not-allowed"
                              placeholder="Not provided"
                            />
                            {isMobileReadOnly && (
                              <p className="text-[10px] text-muted-foreground mt-1.5">
                                Contact number locked after saving
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-foreground font-medium">{profile.mobile_number || 'Not provided'}</p>
                        )}
                      </div>
                    )}
                    {isMobileReadOnly && isEditing && !profile.mobile_number && (
                      <p className="text-xs text-muted-foreground mt-1">Contact cannot be changed after saving</p>
                    )}
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
