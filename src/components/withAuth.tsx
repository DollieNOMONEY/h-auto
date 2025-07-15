// /components/withAuth.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function ProtectedRoute(props: P) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
      if (!loading) {
        // If not logged in, redirect to a login page
        if (!user) {
          router.push("/login_only_page"); // <-- Create a /login page for yourself
          return;
        }
        // Check if the logged-in user is the owner
        if (user.uid === process.env.NEXT_PUBLIC_OWNER_UID) {
          setIsOwner(true);
        } else {
          // If not the owner, redirect to homepage or an 'unauthorized' page
          router.push("/");
        }
      }
    }, [user, loading, router]);

    // Show a loading screen while checking auth state
    if (loading || !isOwner) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#001135] text-white">
          <p>Loading & Verifying Access...</p>
        </div>
      );
    }
    
    // If the user is the owner, render the component
    return <Component {...props} />;
  };
};

export default withAuth;