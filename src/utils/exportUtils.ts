
import { SavedAd } from '@/hooks/useSupabase';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Add the missing types for jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToCSV = (savedAds: SavedAd[]): void => {
  // Format data for CSV
  const headers = ['Account Name', 'Platform', 'Ad Text', 'Email', 'Location', 'Date'];
  
  // Create CSV rows from saved ads
  const rows = savedAds.map(savedAd => {
    const ad = savedAd.ads;
    return [
      ad.account_name || 'Unknown',
      ad.platform || 'Unknown',
      ad.ad_text || 'No content',
      ad.email || 'Not available',
      ad.location || 'Unknown',
      ad.scraped_at ? new Date(ad.scraped_at).toLocaleDateString() : 'Unknown'
    ];
  });
  
  // Convert to CSV format
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const filename = `saved_ads_${new Date().toISOString().split('T')[0]}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (savedAds: SavedAd[]): void => {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Saved Ads Export',
    subject: 'Exported saved advertisements',
    author: 'AdSpy App',
    keywords: 'ads, saved, export',
    creator: 'AdSpy App'
  });
  
  // Add title to the PDF
  doc.setFontSize(18);
  doc.text('Saved Advertisements', 14, 22);
  doc.setFontSize(11);
  doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Format data for PDF table
  const headers = [['Account', 'Platform', 'Ad Text', 'Location', 'Contact', 'Date']];
  
  const rows = savedAds.map(savedAd => {
    const ad = savedAd.ads;
    // Truncate long texts for PDF readability
    const truncateText = (text: string | null, maxLength: number): string => {
      if (!text) return '';
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };
    
    return [
      truncateText(ad.account_name, 20) || 'Unknown',
      ad.platform || 'Unknown',
      truncateText(ad.ad_text, 60) || 'No content',
      truncateText(ad.location, 20) || 'Unknown',
      ad.email || 'N/A',
      ad.scraped_at ? new Date(ad.scraped_at).toLocaleDateString() : 'Unknown'
    ];
  });
  
  // Add the table to the PDF
  doc.autoTable({
    head: headers,
    body: rows,
    startY: 35,
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 35 }
  });
  
  // Save the PDF
  const filename = `saved_ads_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
