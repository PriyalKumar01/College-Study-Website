import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function ProfileCompletionModal() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");

    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        if (user && !hasChecked) {
            checkProfile();
        }
    }, [user, hasChecked]);

    const checkProfile = async () => {
        if (!user) return;

        try {
            // Use maybeSingle to avoid errors if no row exists yet
            const { data, error } = await supabase
                .from("profiles")
                .select("first_name, college")
                .eq("id", user.id)
                .maybeSingle();

            if (error) {
                console.warn("Error checking profile:", error);
                return;
            }

            // If data is missing or incomplete, show modal
            if (!data || !data.first_name || !data.college) {
                // Pre-fill from metadata if available
                if (user.user_metadata) {
                    const { full_name, name } = user.user_metadata;
                    if (full_name || name) {
                        const names = (full_name || name).split(' ');
                        setFirstName(names[0] || '');
                        setLastName(names.slice(1).join(' ') || '');
                    }
                }
                setIsOpen(true);
            }

            setHasChecked(true);
        } catch (err) {
            console.error("Profile check failed:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !college || !branch || !year) {
            toast({ title: "Required Fields", description: "Please fill in all fields.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            const updates = {
                id: user!.id,
                user_id: user!.id,
                email: user!.email,
                first_name: firstName,
                last_name: lastName,
                college,
                branch,
                year,
                updated_at: new Date().toISOString(),
            };

            // Robust Upsert Logic
            const { error } = await supabase
                .from("profiles")
                .upsert(updates)
                .select()
                .single();

            if (error) throw error;

            // Update auth metadata too
            await supabase.auth.updateUser({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    college,
                    branch,
                    year,
                    profile_completed: true
                }
            });

            toast({ title: "Profile Updated", description: "You are all set!" });
            setIsOpen(false);

            // Optional: Refresh page to update UI context
            window.location.reload();

        } catch (error: any) {
            console.error("Profile update error:", error);
            toast({ title: "Error", description: error.message || "Failed to save profile.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Complete Your Profile</DialogTitle>
                    <DialogDescription>
                        Please provide a few details to continue.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Required" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="college">College Name *</Label>
                        <Input id="college" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="e.g. HBTU" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch *</Label>
                            <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. CSE" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2nd Year" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save & Continue
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
