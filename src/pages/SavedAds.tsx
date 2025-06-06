
import React, { useState } from 'react';
import { useAuth, useSavedAds } from '@/hooks/useSupabase';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Calendar, MapPin, Trash2, FileSpreadsheet, FileText, Download, Loader } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SavedAds() {
  const { user, loading: authLoading } = useAuth();
  const { savedAds, loading: adsLoading, unsaveAd } = useSavedAds(user?.id);
  const [exporting, setExporting] = useState<boolean>(false);
  
  if (authLoading) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleExportCSV = () => {
    if (savedAds.length === 0) {
      toast({
        title: "No ads to export",
        description: "Save some ads first before exporting.",
        variant: "destructive",
      });
      return;
    }

    setExporting(true);
    try {
      exportToCSV(savedAds);
      toast({
        title: "Export successful",
        description: "Your ads have been exported to CSV format.",
      });
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your ads to CSV.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = () => {
    if (savedAds.length === 0) {
      toast({
        title: "No ads to export",
        description: "Save some ads first before exporting.",
        variant: "destructive",
      });
      return;
    }

    setExporting(true);
    try {
      exportToPDF(savedAds);
      toast({
        title: "Export successful",
        description: "Your ads have been exported to PDF format.",
      });
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your ads to PDF.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Header />
        
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Your Saved Ads</h1>
            <p className="text-gray-600">Manage your collection of saved advertisements</p>
          </div>
          
          {user && savedAds.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" disabled={exporting}>
                  {exporting ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Export
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={handleExportCSV}
                  disabled={exporting || savedAds.length === 0}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  <span>Export as CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleExportPDF}
                  disabled={exporting || savedAds.length === 0}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        {adsLoading ? (
          <div className="text-center p-8">
            <Loader size={24} className="animate-spin mx-auto mb-2" />
            <p>Loading your saved ads...</p>
          </div>
        ) : savedAds.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
            <Bookmark size={48} className="mx-auto text-gray-400 mb-2" />
            <h2 className="text-xl font-medium mb-2">No saved ads yet</h2>
            <p className="text-gray-600 mb-4">You haven't saved any ads to your collection.</p>
            <Button asChild>
              <Link to="/">Browse Ads</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedAds.map((savedAd) => {
              const ad = savedAd.ads;
              return (
                <Card key={savedAd.id} title={ad.account_name || "Unknown Advertiser"}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          unsaveAd(savedAd.id);
                          toast({
                            title: "Ad removed",
                            description: "The ad has been removed from your saved collection.",
                          });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} className="mr-1" /> Remove
                      </Button>
                      
                      {ad.email && (
                        <a href={`mailto:${ad.email}`} className="text-sm text-blue-600 hover:underline">
                          Contact
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
}
