import { User, LogOut, GraduationCap, Building2, Calendar } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { user, signOut, approvalStatus } = useAuth();

  if (!user) return null;

  const cachedAvatar = user.id ? (() => { try { return sessionStorage.getItem(`cached_avatar_${user.id}`); } catch { return null; } })() : null;
  const avatarUrl = cachedAvatar?.trim() || user.user_metadata?.avatar_url?.trim() || user.user_metadata?.picture?.trim() || '';
  const avatarEmoji = user.user_metadata?.avatar || '👤';
  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.user_metadata?.name || user.user_metadata?.full_name || 'User';

  const email = user.email || '';
  const college = user.user_metadata?.college || 'Not specified';
  const branch = user.user_metadata?.branch || 'Not specified';
  const year = user.user_metadata?.year || 'Not specified';

  const isPending = approvalStatus === 'pending';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className={`h-9 w-9 border-2 ${isPending ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-primary/20'}`}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-xl">
              {firstName ? firstName[0].toUpperCase() : avatarEmoji}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-2xl">
                {firstName ? firstName[0].toUpperCase() : avatarEmoji}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-base truncate">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
              {isPending && (
                <span className="inline-block mt-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  ⏳ Pending Approval
                </span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">College:</span>
            <span className="font-medium truncate">{college}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Branch:</span>
            <span className="font-medium truncate">{branch}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Year:</span>
            <span className="font-medium truncate">{year}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        {isPending ? (
          <DropdownMenuItem asChild className="cursor-pointer text-amber-600 dark:text-amber-400 focus:text-amber-700">
            <Link to="/pending-approval">
              <User className="h-4 w-4 mr-2" />
              Approval Status
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/profile">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
