
import React from 'react';
import Header from '../components/Header';
import AdsList from '../components/AdsList';
import Footer from '../components/Footer';
import Card from '../components/Card';
import KeywordTagInput from '../components/KeywordTagInput';
import LocationFilter from '../components/LocationFilter';
import PlanToggle from '../components/PlanToggle';
import AdDisplayCounter from '../components/AdDisplayCounter';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card title="Target Keywords">
            <KeywordTagInput />
          </Card>
          
          <Card title="Select Location">
            <LocationFilter />
          </Card>
          
          <Card title="Plan Type">
            <PlanToggle />
          </Card>
          
          <Card title="Ads Preview">
            <AdDisplayCounter />
          </Card>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Latest Ads</h2>
          <p className="text-gray-600">Browse recently scraped advertisements</p>
        </div>
        
        <AdsList />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
