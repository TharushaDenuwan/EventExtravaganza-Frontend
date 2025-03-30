import React, { useState } from 'react';
import { Check, Star, Crown, Shield, Image, Calendar, ClipboardCheck, Headphones, Zap } from 'lucide-react';
import styles from './packages.module.css';
import Navigation from '../navigation/navigation';
import Footer from '../footer/planner_footer';

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      name: "Silver Package",
      price: "$100",
      icon: Shield,
      features: [
        { text: "Silver verification badge", icon: Shield },
        { text: "Up to 50 photo uploads", icon: Image },
        { text: "Portfolio section", icon: Star },
        { text: "Event calendar", icon: Calendar },
        { text: "Checklist", icon: ClipboardCheck },
        { text: "Customer support", icon: Headphones }
      ],
      color: "#C0C0C0"
    },
    {
      name: "Gold Package",
      price: "$200",
      icon: Star,
      popular: true,
      features: [
        { text: "Gold verification badge", icon: Shield },
        { text: "Up to 75 photo uploads", icon: Image },
        { text: "Enhanced portfolio section", icon: Star },
        { text: "Advanced event calendar", icon: Calendar },
        { text: "Priority checklist", icon: ClipboardCheck },
        { text: "Priority customer support", icon: Headphones },
        { text: "Analytics dashboard", icon: Zap }
      ],
      color: "#FFD700"
    },
    {
      name: "Platinum Package",
      price: "$300",
      icon: Crown,
      features: [
        { text: "Platinum verification badge", icon: Shield },
        { text: "Up to 100 photo uploads", icon: Image },
        { text: "Premium portfolio section", icon: Star },
        { text: "Full event management suite", icon: Calendar },
        { text: "Advanced checklist with templates", icon: ClipboardCheck },
        { text: "24/7 Priority support", icon: Headphones },
        { text: "Advanced analytics & reporting", icon: Zap },
        { text: "Custom branding options", icon: Crown }
      ],
      color: "#E5E4E2"
    }
  ];

  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
  };

  return (
    <div className={styles.page}>
      <Navigation />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Choose Your Perfect Package</h1>
          <p>
            Elevate your event planning experience with our carefully crafted packages.
            Each tier is designed to provide you with the tools and features you need to create extraordinary events.
          </p>
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`${styles.packageCard} ${pkg.popular ? styles.popular : ''} ${selectedPackage === pkg.name ? styles.selected : ''}`}
              onClick={() => handlePackageSelect(pkg.name)}
            >
              {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}
              
              <div className={styles.packageHeader} style={{ '--package-color': pkg.color }}>
                <pkg.icon size={32} className={styles.packageIcon} />
                <h2>{pkg.name}</h2>
                <div className={styles.price}>
                  <span>{pkg.price}</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>

              <div className={styles.features}>
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.feature}>
                    <feature.icon size={18} className={styles.featureIcon} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`${styles.selectButton} ${selectedPackage === pkg.name ? styles.selected : ''}`}
              >
                {selectedPackage === pkg.name ? (
                  <>
                    <Check size={18} />
                    Selected
                  </>
                ) : (
                  'Select Package'
                )}
              </button>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className={styles.callToAction}>
            <button className={styles.purchaseButton}>
              Purchase {selectedPackage}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}