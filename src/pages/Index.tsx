
import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import KeywordTagInput from '../components/KeywordTagInput';
import LocationFilter from '../components/LocationFilter';
import PlanToggle from '../components/PlanToggle';
import AdDisplayCounter from '../components/AdDisplayCounter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
