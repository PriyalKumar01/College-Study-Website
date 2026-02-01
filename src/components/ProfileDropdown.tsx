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
  const { user, signOut } = useAuth();

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url;
  const avatarEmoji = user.user_metadata?.avatar || '👤';
  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName} `.trim() || 'User';

  const email = user.email || '';
  const college = user.user_metadata?.college || 'Not specified';
  const branch = user.user_metadata?.branch || 'Not specified';
  const year = user.user_metadata?.year || 'Not specified';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
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
            <div>
              <p className="font-semibold text-base">{fullName}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">College:</span>
            <span className="font-medium">{college}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Branch:</span>
            <span className="font-medium">{branch}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Year:</span>
            <span className="font-medium">{year}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/profile">
            <User className="h-4 w-4 mr-2" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
