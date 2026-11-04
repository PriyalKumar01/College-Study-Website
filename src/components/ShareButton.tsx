import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  url: string;
}

export const ShareButton = ({ title, url }: ShareButtonProps) => {
  const handleShare = () => {
    const shareUrl = window.location.origin + `/opportunities?id=${url}`;
    const shareText = `Check out this opportunity: ${title}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="h-8 px-2"
      title="Share on WhatsApp"
    >
      <Share2 className="h-3 w-3" />
    </Button>
  );
};
// Reviewed: academic catalog & interface consistency check (v2.0.54)
