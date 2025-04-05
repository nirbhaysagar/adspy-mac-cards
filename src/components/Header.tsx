
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useSupabase';
import { Link } from 'react-router-dom';
import { BookmarkCheck, LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, signOut, loading } = useAuth();
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 py-4 border-b">
      <div className="mb-4 sm:mb-0">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          AdSpy
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        {loading ? (
          <div className="w-24 h-9 bg-gray-200 rounded animate-pulse"></div>
        ) : user ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/saved-ads">
                <BookmarkCheck size={18} className="mr-1" />
                Saved Ads
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              onClick={signOut} 
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut size={18} />
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link to="/auth">
              <User size={18} className="mr-1" />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
