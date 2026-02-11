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
import { Loader2, ArrowLeft, Edit3, Save, X, User, Mail, Phone, GraduationCap, Calendar, CheckCircle2, UploadCloud } from 'lucide-react';

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

export default function Profile() {
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
          college: profileData.college || '', // Trust DB value strictly
          branch: profileData.branch || '',   // Trust DB value strictly
          year: profileData.year || user.user_metadata?.year || '',
          // IMPORTANT: Trust DB value strictly for avatar. Do NOT fallback here to avoid saving metadata URL to DB on next save.
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
          avatar_url: '', // Do not set metadata avatar here either, let JSX handle display fallback
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

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG, PNG, or WebP image only.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user?.id) return null;

    try {
      setUploadingAvatar(true);

      // Use user ID folder for RLS policy compliance
      const filePath = `${user.id}/avatar.png`;

      // Upload file with upsert to replace existing
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Add cache-busting timestamp to URL
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`;
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);

      const errorMessage = error.message || "Could not upload image.";
      const errorDetails = error.statusCode ? ` (Error ${error.statusCode})` : '';

      toast({
        title: "Avatar Upload Failed",
        description: `${errorMessage}${errorDetails}. Please try again.`,
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
      // Default to existing confirmed avatar URL, not the potentially optimistic one
      let finalAvatarUrl = profile.avatar_url;

      if (avatarFile) {
        // Attempt upload
        const publicUrl = await uploadAvatar(avatarFile);
        if (publicUrl) {
          finalAvatarUrl = publicUrl;
        } else {
          uploadFailed = true;
          // If upload failed, we keep the OLD avatar_url (finalAvatarUrl = profile.avatar_url)
          // instead of setting it to null or the optimistic one
        }
      }

      const profileUpdates = {
        first_name: editedProfile.first_name,
        last_name: editedProfile.last_name,
        // Convert empty string to null to avoid unique constraint violations
        mobile_number: editedProfile.mobile_number?.trim() === '' ? null : editedProfile.mobile_number,
        college: editedProfile.college,
        branch: editedProfile.branch,
        year: editedProfile.year,
        avatar_url: finalAvatarUrl,
      };

      // Robust Upsert: Handles both Insert and Update in one go
      // Explicitly providing 'id: user.id' ensures we pass the RLS check (auth.uid() = id)
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // CRITICAL: This was missing, causing RLS violation on insert
          user_id: user.id,
          email: user.email || '',
          ...profileUpdates,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // 5. Update auth metadata (optional, but good for sync)
      const { error: userUpdateError } = await supabase.auth.updateUser({
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

      if (userUpdateError) throw userUpdateError;

      // 6. Refresh Global Auth Context (Reverted)
      // await refreshProfile();

      // Force session refresh to allow Sidebar to see new metadata immediately
      await supabase.auth.refreshSession();

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
          description: "Details updated, but avatar upload failed. Please checks storage permissions or try a smaller file.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your changes have been saved successfully",
        });
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);

      if (error.code === '23505' || error.message?.includes('profile_mobile_no')) {
        toast({
          title: "Contact Number Exists",
          description: "This mobile number is already linked to another account.",
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
      setUploadingAvatar(false);
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

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-400">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Dashboard
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
            {/* Header Banner Image */}
            {/* Header Banner Image */}
            <div className="h-48 relative overflow-hidden group bg-[#4facfe]">
              {/* Seamless Background Extension */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] opacity-100"></div>

              {/* Decorative Elements to simulate "generation" */}
              <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-white/10 blur-3xl rounded-full transform rotate-12"></div>
              <div className="absolute bottom-[-20%] left-[10%] w-[30%] h-[100%] bg-blue-400/20 blur-2xl rounded-full"></div>

              {/* Main Image - Anchored Right & Faded into background */}
              <div className="absolute inset-0 flex items-center justify-end">
                <img
                  src="/AllProfilebanner.png"
                  alt="Profile Banner"
                  className="h-full w-auto object-contain object-right"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)'
                  }}
                />
              </div>

              {/* Shine/Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </div>

            <CardContent className="px-8 pb-8 -mt-20">
              {/* Header Section with Avatar */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  <div className="relative group">
                    <Avatar className="h-36 w-36 border-4 border-white dark:border-slate-900 shadow-xl ring-2 ring-slate-100 dark:ring-slate-800 bg-white dark:bg-slate-950">
                      <AvatarImage src={avatarPreview || editedProfile.avatar_url || profile.avatar_url || user?.user_metadata?.avatar_url} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-500 dark:text-slate-400">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>

                    {isEditing && (
                      <>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-transform active:scale-95"
                        >
                          <UploadCloud className="h-4 w-4" />
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={handleAvatarChange}
                          title="Upload avatar image"
                        />
                      </>
                    )}
                  </div>

                  <div className="text-center md:text-left mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {profile.first_name || 'Student'} {profile.last_name}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="w-full md:w-auto flex justify-center md:justify-end">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-full px-6"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="rounded-full border-slate-200 hover:bg-slate-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-full px-6"
                      >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 border-b dark:border-slate-700 pb-2">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Personal Details
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">First Name</Label>
                      {isEditing ? (
                        <Input value={editedProfile.first_name} onChange={e => setEditedProfile({ ...editedProfile, first_name: e.target.value })} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      ) : (
                        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.first_name || '-'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Last Name</Label>
                      {isEditing ? (
                        <Input value={editedProfile.last_name} onChange={e => setEditedProfile({ ...editedProfile, last_name: e.target.value })} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      ) : (
                        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.last_name || '-'}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Email</Label>
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-900/50">
                      <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-300 font-medium flex-1 truncate">{profile.email}</span>
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold bg-white dark:bg-green-950 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Contact Number</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.mobile_number}
                        onChange={e => setEditedProfile({ ...editedProfile, mobile_number: e.target.value })}
                        placeholder="+91 9999999999"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      />
                    ) : (
                      <p className="text-slate-900 dark:text-slate-100 font-medium text-lg flex items-center gap-2">
                        {profile.mobile_number ? (
                          <>
                            <Phone className="w-4 h-4 text-slate-400" />
                            {profile.mobile_number}
                          </>
                        ) : (
                          <span className="text-slate-400 italic">Not provided</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 border-b dark:border-slate-700 pb-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Academic Details
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">College</Label>
                    {isEditing ? (
                      <Input value={editedProfile.college} onChange={e => setEditedProfile({ ...editedProfile, college: e.target.value })} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                    ) : (
                      <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.college || 'Not set'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Branch</Label>
                      {isEditing ? (
                        <Input value={editedProfile.branch} onChange={e => setEditedProfile({ ...editedProfile, branch: e.target.value })} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      ) : (
                        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.branch || '-'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Year</Label>
                      {isEditing ? (
                        <Input value={editedProfile.year} onChange={e => setEditedProfile({ ...editedProfile, year: e.target.value })} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      ) : (
                        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.year || '-'}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800 mt-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase">Member Since</span>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">{formatDate(profile.created_at)}</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};


