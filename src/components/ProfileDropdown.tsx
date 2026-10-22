import { User, LogOut, Crown, Shield } from 'lucide-react';
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
  const { user, signOut, approvalStatus, isOwner, isAdmin } = useAuth();

  if (!user) return null;

  const cachedAvatar = user.id ? (() => { try { return sessionStorage.getItem(`cached_avatar_${user.id}`); } catch { return null; } })() : null;
  const avatarUrl = cachedAvatar?.trim() || user.user_metadata?.avatar_url?.trim() || user.user_metadata?.picture?.trim() || '';
  const avatarEmoji = user.user_metadata?.avatar || '👤';
  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.user_metadata?.name || user.user_metadata?.full_name || 'User';
  const email = user.email || '';

  const isPending = approvalStatus === 'pending';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className={`h-8 w-8 sm:h-9 sm:w-9 border-2 ${isPending ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-primary/20'}`}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-base font-bold">
              {firstName ? firstName[0].toUpperCase() : avatarEmoji}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-1.5 rounded-xl border border-border bg-popover shadow-xl">
        <DropdownMenuLabel className="p-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-lg font-bold">
                {firstName ? firstName[0].toUpperCase() : avatarEmoji}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm truncate text-foreground">{fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* My Profile */}
        <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-semibold py-2">
          <Link to="/profile" className="flex items-center w-full">
            <User className="h-4 w-4 mr-2.5 text-primary" />
            My Profile
          </Link>
        </DropdownMenuItem>

        {/* Owner Controls (Visible to Owner: Owner Dashboard + Admin Portal) */}
        {isOwner && (
          <>
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-semibold py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 focus:bg-amber-500/10">
              <Link to="/owner-dashboard" className="flex items-center w-full">
                <Crown className="h-4 w-4 mr-2.5 text-amber-500" />
                Owner Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-semibold py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 focus:bg-blue-500/10">
              <Link to="/admin-portal" className="flex items-center w-full">
                <Shield className="h-4 w-4 mr-2.5 text-blue-500" />
                Admin Portal
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {/* Admin Controls (Only for non-owner Admins) */}
        {isAdmin && !isOwner && (
          <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-semibold py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 focus:bg-blue-500/10">
            <Link to="/admin-portal" className="flex items-center w-full">
              <Shield className="h-4 w-4 mr-2.5 text-blue-500" />
              Admin Portal
            </Link>
          </DropdownMenuItem>
        )}

        {isPending && (
          <DropdownMenuItem asChild className="cursor-pointer rounded-lg text-xs font-semibold py-2 text-amber-600 dark:text-amber-400">
            <Link to="/pending-approval" className="flex items-center w-full">
              <User className="h-4 w-4 mr-2.5" />
              Approval Status
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem 
          onClick={() => signOut()} 
          className="cursor-pointer rounded-lg text-xs font-semibold py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 focus:bg-red-50 dark:focus:bg-red-950/20"
        >
          <LogOut className="h-4 w-4 mr-2.5" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
