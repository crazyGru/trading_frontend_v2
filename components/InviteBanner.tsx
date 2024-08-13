// components/InviteBanner.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function InviteBanner() {
  return (
    <Card className="bg-gradient-to-r from-green-400 to-blue-500 my-6">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Invite Friends</h2>
          <p className="mb-2">Get $10 for every friend who joins</p>
        </div>
        <Button variant="secondary" className="whitespace-nowrap">
          <Users className="mr-2" size={18} />
          Invite Now
        </Button>
      </CardContent>
    </Card>
  );
}