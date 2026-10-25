import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { BRANCH_OPTIONS, YEAR_OPTIONS } from '@/components/ProfileCompletionModal';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { parseHbtuRollNumber } from '@/utils/userMetadataHelper';
import { Loader2, ArrowLeft, Edit3, Save, X, User, Mail, Phone, GraduationCap, Calendar, CheckCircle2, UploadCloud, School, UserCheck } from 'lucide-react';

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

  const isHbtuRoll = Boolean(
    (user?.email || '').toLowerCase().endsWith('@hbtu.ac.in') &&
    parseHbtuRollNumber(user?.email || '')
  );

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

  const [collegeType, setCollegeType] = useState<'hbtu' | 'non-hbtu' | ''>('');
  const [customCollege, setCustomCollege] = useState('');
  const [otherBranch, setOtherBranch] = useState('');
  const [otherYear, setOtherYear] = useState('');

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
      let query = supabase
        .from('profiles')
        .select('first_name, last_name, email, mobile_number, college, branch, year, avatar_url, created_at');

      if (user.email) {
        query = query.or(`id.eq.${user.id},user_id.eq.${user.id},email.eq.${user.email.toLowerCase()}`);
      } else {
        query = query.or(`id.eq.${user.id},user_id.eq.${user.id}`);
      }

      const { data: profileData, error } = await query.maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      }

      const googleAvatar = user.user_metadata?.picture?.trim() || user.user_metadata?.avatar_url?.trim() || '';
      const dbAvatar = profileData?.avatar_url?.trim() || '';
      const initialAvatar = dbAvatar || googleAvatar || '';

      if (profileData) {
        const fetchedProfile: ProfileData = {
          first_name: profileData.first_name || user.user_metadata?.first_name || '',
          last_name: profileData.last_name || user.user_metadata?.last_name || '',
          email: profileData.email || user.email || '',
          mobile_number: profileData.mobile_number || user.user_metadata?.mobile_number || '',
          college: profileData.college || user.user_metadata?.college || '',
          branch: profileData.branch || user.user_metadata?.branch || '',
          year: profileData.year || user.user_metadata?.year || '',
          avatar_url: initialAvatar,
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
          avatar_url: initialAvatar,
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
      // Default to existing confirmed avatar URL, or fallback to Google avatar
      let finalAvatarUrl = profile.avatar_url?.trim() || '';

      if (avatarFile) {
        // Attempt upload
        const publicUrl = await uploadAvatar(avatarFile);
        if (publicUrl) {
          finalAvatarUrl = publicUrl;
          try { sessionStorage.setItem(`cached_avatar_${user.id}`, publicUrl); } catch {}
        } else {
          uploadFailed = true;
        }
      }

      if (!finalAvatarUrl) {
        finalAvatarUrl = user.user_metadata?.picture?.trim() || user.user_metadata?.avatar_url?.trim() || '';
      }

      let finalCollege = collegeType === 'hbtu' ? 'HBTU Kanpur' : (collegeType === 'non-hbtu' ? customCollege.trim() : (editedProfile.college || 'HBTU Kanpur'));
      let finalBranch = editedProfile.branch === 'Other' ? otherBranch.trim() : editedProfile.branch;
      let finalYear = editedProfile.year === 'Other' ? otherYear.trim() : editedProfile.year;

      // If empty, fallback to auto-detected roll number values
      if (!finalCollege && isHbtuRoll) finalCollege = 'HBTU Kanpur';
      if (!finalBranch && isHbtuRoll) finalBranch = parseHbtuRollNumber(user.email || '')?.branch || '';
      if (!finalYear && isHbtuRoll) finalYear = parseHbtuRollNumber(user.email || '')?.year || '';

      const profileUpdates = {
        first_name: editedProfile.first_name,
        last_name: editedProfile.last_name,
        // Convert empty string to null to avoid unique constraint violations
        mobile_number: editedProfile.mobile_number?.trim() === '' ? null : editedProfile.mobile_number,
        college: finalCollege,
        branch: finalBranch,
        year: finalYear,
        avatar_url: finalAvatarUrl || null,
      };

      // Direct upsert into public.profiles table
      try {
        const { error: upErr } = await supabase.from('profiles').upsert({
          user_id: user.id,
          first_name: editedProfile.first_name,
          last_name: editedProfile.last_name,
          email: user.email || '',
          mobile_number: profileUpdates.mobile_number,
          college: finalCollege,
          branch: finalBranch,
          year: finalYear,
          avatar_url: profileUpdates.avatar_url,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

        if (upErr) {
          console.warn("Direct profiles upsert on user_id warning in Profile.tsx:", upErr);
          let updateQuery = supabase.from('profiles').update({
            first_name: editedProfile.first_name,
            last_name: editedProfile.last_name,
            email: user.email || '',
            mobile_number: profileUpdates.mobile_number,
            college: finalCollege,
            branch: finalBranch,
            year: finalYear,
            avatar_url: profileUpdates.avatar_url,
            user_id: user.id,
            updated_at: new Date().toISOString()
          });
          if (user.email) {
            updateQuery = updateQuery.or(`id.eq.${user.id},user_id.eq.${user.id},email.eq.${user.email.toLowerCase()}`);
          } else {
            updateQuery = updateQuery.or(`id.eq.${user.id},user_id.eq.${user.id}`);
          }
          await updateQuery;
        }
      } catch (upErr) {
        console.warn("Direct profiles upsert warning in Profile.tsx:", upErr);
      }

      // Robust Upsert: Handles both Insert and Update in one go using our custom RPC
      try {
        await supabase.rpc('upsert_my_profile', {
          p_first_name: editedProfile.first_name,
          p_last_name: editedProfile.last_name,
          p_college: finalCollege,
          p_branch: finalBranch,
          p_year: finalYear,
          p_email: user.email || '',
          p_mobile_number: profileUpdates.mobile_number,
          p_avatar_url: profileUpdates.avatar_url
        });
      } catch (rpcErr) {
        console.warn("RPC upsert warning in Profile.tsx:", rpcErr);
      }

      // Update auth metadata
      const fullName = `${editedProfile.first_name} ${editedProfile.last_name}`.trim();
      const { error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          first_name: editedProfile.first_name,
          last_name: editedProfile.last_name,
          name: fullName,
          full_name: fullName,
          college: finalCollege,
          branch: finalBranch,
          year: finalYear,
          mobile_number: editedProfile.mobile_number,
          avatar_url: finalAvatarUrl,
          profile_completed: true
        }
      });

      if (userUpdateError) console.warn("User metadata update warning:", userUpdateError);

      try {
        localStorage.setItem(`profile_completed_${user.id}`, 'true');
      } catch {}

      // Force session refresh to allow Sidebar to see new metadata immediately
      try {
        await supabase.auth.refreshSession();
      } catch (refErr) {
        console.warn("Session refresh warning:", refErr);
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_profile_updated'));
      }

      setProfile({
        ...editedProfile,
        college: finalCollege,
        branch: finalBranch,
        year: finalYear,
        avatar_url: finalAvatarUrl
      });
      setEditedProfile({
        ...editedProfile,
        college: finalCollege,
        branch: finalBranch,
        year: finalYear,
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
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
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
              <div className="absolute bottom-[-20%] left-[10%] w-[30%] h-[100%] bg-emerald-400/20 blur-2xl rounded-full"></div>

              {/* Main Image - Anchored Right & Faded into background */}
              <div className="absolute inset-0 flex items-center justify-end">
                <img
                  src="/AllProfilebanner.png"
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                  className="h-full w-auto object-contain object-right"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)'
                  } as React.CSSProperties}
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
                          className="absolute bottom-1 right-1 p-2 bg-emerald-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-emerald-700 transition-transform active:scale-95"
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
                      onClick={() => {
                        setIsEditing(true);
                        if (profile.college === 'HBTU Kanpur') {
                          setCollegeType('hbtu');
                          setCustomCollege('');
                        } else {
                          setCollegeType('non-hbtu');
                          setCustomCollege(profile.college);
                        }
                        
                        if (BRANCH_OPTIONS.includes(profile.branch)) {
                          setEditedProfile(prev => ({...prev, branch: profile.branch}));
                          setOtherBranch('');
                        } else {
                          setEditedProfile(prev => ({...prev, branch: profile.branch ? 'Other' : ''}));
                          setOtherBranch(profile.branch);
                        }

                        if (YEAR_OPTIONS.some(y => y.value === profile.year)) {
                          setEditedProfile(prev => ({...prev, year: profile.year}));
                          setOtherYear('');
                        } else {
                          setEditedProfile(prev => ({...prev, year: profile.year ? 'Other' : ''}));
                          setOtherYear(profile.year);
                        }
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-full px-6"
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

              {/* Incomplete details alert banner */}
              {!isLoading && (!profile.college || !profile.branch || !profile.year) && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Academic Details Incomplete</p>
                      <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                        Your College, Branch, or Batch / Graduating Year is missing. Please complete your profile.
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      window.dispatchEvent(new Event('studyhub_open_profile_completion'));
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs shrink-0 shadow-md cursor-pointer"
                  >
                    Complete Profile Pop-up
                  </Button>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 border-b dark:border-slate-700 pb-2">
                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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

                  {isHbtuRoll && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>HBTU Roll Number Detected: Academic details are auto-filled. You can edit them if your branch upgraded in 2nd year or for lateral entry / PG courses.</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">College</Label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button type="button" onClick={() => { setCollegeType('hbtu'); setCustomCollege(''); }} className={`flex items-center justify-center gap-1 rounded-lg border p-2 text-sm transition-all ${collegeType === 'hbtu' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><School className="w-4 h-4"/> HBTU Kanpur</button>
                          <button type="button" onClick={() => { setCollegeType('non-hbtu'); }} className={`flex items-center justify-center gap-1 rounded-lg border p-2 text-sm transition-all ${collegeType === 'non-hbtu' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><UserCheck className="w-4 h-4"/> Other College</button>
                        </div>
                        {collegeType === 'non-hbtu' && <Input value={customCollege} onChange={e => setCustomCollege(e.target.value)} placeholder="Enter full college name" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />}
                      </div>
                    ) : (
                      <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.college || 'Not set'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Branch</Label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <Select value={editedProfile.branch} onValueChange={(v) => { setEditedProfile({ ...editedProfile, branch: v }); if (v !== "Other") setOtherBranch(""); }}>
                            <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"><SelectValue placeholder="Select branch" /></SelectTrigger>
                            <SelectContent className="max-h-60">{BRANCH_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                          </Select>
                          {editedProfile.branch === "Other" && <Input value={otherBranch} onChange={e => setOtherBranch(e.target.value)} placeholder="e.g. Architecture" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />}
                        </div>
                      ) : (
                        <p className="text-slate-900 dark:text-slate-100 font-medium text-lg">{profile.branch || '-'}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Batch / Graduating Year</Label>
                      {isEditing ? (
                        <div className="space-y-2">
                          <Select value={editedProfile.year} onValueChange={(v) => { setEditedProfile({ ...editedProfile, year: v }); if (v !== "Other") setOtherYear(""); }}>
                            <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"><SelectValue placeholder="Select year" /></SelectTrigger>
                            <SelectContent className="max-h-60">{YEAR_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                          </Select>
                          {editedProfile.year === "Other" && <Input value={otherYear} onChange={e => setOtherYear(e.target.value)} placeholder="e.g. 2014" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />}
                        </div>
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


