"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter,useSearchParams } from 'next/navigation';
import Link from "next/link";
import { z } from "zod";
import { ZodError } from "zod";

// Zod schema definition
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setReferralCode(code);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data using Zod schema
      const formData = { email, password, username, confirmPassword, referralCode };
      signupSchema.parse(formData);

      setIsLoading(true);
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
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(formattedErrors);
      } else {
        toast({
          title: "Error",
          description: `${error}`,
          variant: "destructive",
        });
        console.error(error);
      }
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
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}         
              <Input
                type="text"
                placeholder="Invite Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-gray-500 focus:ring-gray-500"
              />                  
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
