'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import SparklesText from "@/components/magicui/sparkles-text";
 
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const token = Cookies.get('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear the access token and user data
    Cookies.remove('access_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <SparklesText text="CryptoTrade" className='text-xl' />
      <div>
        {isLoggedIn ? (
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="ghost" asChild className="mr-2">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}