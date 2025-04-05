
import React from 'react';
import { useAds, useSavedAds, useAuth, type Ad } from '@/hooks/useSupabase';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdsList() {
  const { ads, loading: adsLoading } = useAds();
  const { user } = useAuth();
  const { savedAds, saveAd, loading: savedAdsLoading } = useSavedAds(user?.id);
  
  const savedAdIds = React.useMemo(() => {
    return savedAds.map(sa => sa.ad_id);
  }, [savedAds]);
  
  const isAdSaved = (adId: string) => savedAdIds.includes(adId);
  
  if (adsLoading) {
    return (
      <div className="w-full text-center p-8">
        <p>Loading ads...</p>
      </div>
    );
  }
  
  if (ads.length === 0) {
    return (
      <div className="w-full text-center p-8">
        <p>No ads found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ads.map((ad) => (
        <AdCard 
          key={ad.id} 
          ad={ad} 
          isSaved={isAdSaved(ad.id)} 
          onSave={() => saveAd(ad.id)} 
          isAuthenticated={!!user}
        />
      ))}
    </div>
  );
}

interface AdCardProps {
  ad: Ad;
  isSaved: boolean;
  onSave: () => void;
  isAuthenticated: boolean;
}

function AdCard({ ad, isSaved, onSave, isAuthenticated }: AdCardProps) {
  return (
    <Card title={ad.account_name || "Unknown Advertiser"}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-blue-50">{ad.platform}</Badge>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Calendar size={14} />
            <span>{new Date(ad.scraped_at || "").toLocaleDateString()}</span>
          </div>
        </div>
        
        {ad.location && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin size={14} />
            <span>{ad.location}</span>
          </div>
        )}
        
        <p className="text-sm mb-4 flex-grow">{ad.ad_text}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {ad.keywords?.map((keyword, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          {isAuthenticated ? (
            <Button 
              variant={isSaved ? "default" : "outline"} 
              size="sm" 
              onClick={onSave}
              disabled={isSaved}
              className={isSaved ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck size={16} className="mr-1" /> Saved
                </>
              ) : (
                <>
                  <Bookmark size={16} className="mr-1" /> Save
                </>
              )}
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <Bookmark size={16} className="mr-1" /> Login to save
              </Button>
            </Link>
          )}
          
          {ad.email && (
            <a href={`mailto:${ad.email}`} className="text-sm text-blue-600 hover:underline">
              Contact
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
