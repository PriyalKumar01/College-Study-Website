import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Users, Smile, Sparkles } from 'lucide-react';

interface AvatarSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (avatar: string) => void;
  currentAvatar?: string;
}

const AvatarSelector = ({ open, onClose, onSelect, currentAvatar }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || '');

  const avatars = [
    { id: '👨‍🎓', label: 'Student Boy 1', color: 'bg-blue-500' },
    { id: '👩‍🎓', label: 'Student Girl 1', color: 'bg-pink-500' },
    { id: '🧑‍💼', label: 'Professional 1', color: 'bg-purple-500' },
    { id: '👨‍💻', label: 'Developer Boy', color: 'bg-green-500' },
    { id: '👩‍💻', label: 'Developer Girl', color: 'bg-teal-500' },
    { id: '🧑‍🔬', label: 'Scientist', color: 'bg-indigo-500' },
    { id: '👨‍🏫', label: 'Teacher Boy', color: 'bg-orange-500' },
    { id: '👩‍🏫', label: 'Teacher Girl', color: 'bg-red-500' },
    { id: '🧑‍🎨', label: 'Artist', color: 'bg-yellow-500' },
    { id: '👨‍⚕️', label: 'Doctor Boy', color: 'bg-cyan-500' },
    { id: '👩‍⚕️', label: 'Doctor Girl', color: 'bg-rose-500' },
    { id: '🧑‍🚀', label: 'Astronaut', color: 'bg-slate-500' },
  ];

  const handleSelect = () => {
    if (selectedAvatar) {
      onSelect(selectedAvatar);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Your Avatar
          </DialogTitle>
          <DialogDescription>
            Select an avatar that represents you best
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 py-4">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                selectedAvatar === avatar.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-16 h-16 rounded-full ${avatar.color} flex items-center justify-center text-3xl`}>
                {avatar.id}
              </div>
              <span className="text-xs text-center font-medium">{avatar.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedAvatar}>
            Select Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSelector;
// Reviewed: academic catalog & interface consistency check (v2.0.19)
