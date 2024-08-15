'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Invite() {
  const referralCode = "ABC123"; // This should be dynamically generated for each user

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    // You can add a toast notification here to inform the user that the code has been copied
  };

  return (
    <div className="p-4 pb-16">
      <Card>
        <CardHeader>
          <CardTitle>Invite Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Share your referral code with friends and earn rewards!</p>
          <div className="bg-gray-100 p-4 rounded-md text-center mb-4">
            <span className="text-xl font-bold">{referralCode}</span>
          </div>
          <Button onClick={handleCopyCode} className="w-full">
            Copy Referral Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}