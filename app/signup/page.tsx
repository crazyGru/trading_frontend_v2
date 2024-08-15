"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      if (res.ok) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
          className: "bg-green-500 text-white",
        });
        router.push('/login');
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-gray-100 text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <Button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <p className="text-gray-400 text-center">
                Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
