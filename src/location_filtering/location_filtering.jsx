import React, { useState } from "react";
import Navigation from "../components/navigation/navigation";
import styles from "../location_filtering/location_filtering.module.css";
import GoogleMapComponent from "../map/google_map_component";
import { MapPin, Users, Calendar, Search, ChevronDown, ChevronUp, Info, X } from "lucide-react";
import Footer from "../components/footer/footer";
import galle from './images/galle.jpg'
import colombo from './images/colombo.jpg'
import kandy from './images/kandy.jpg'
import { Navigate, useNavigate } from "react-router-dom";


export default function LocationFiltering() {  
  const [eventPlanners, setEventPlanners] = useState([]);
  const [location, setLocation] = useState("");
  const [searchedLocation, setSearchedLocation] = useState("");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Featured Locations Data
  const featuredLocations = [
    { 
      name: "Colombo", 
      count: 120, 
      image: colombo,
      description: "Sri Lanka's vibrant commercial capital"
    },
    { 
      name: "Kandy", 
      count: 85, 
      image: kandy,
      description: "The cultural heart of Sri Lanka"
    },
    { 
      name: "Galle", 
      count: 65, 
      image: galle,
      description: "Historic coastal fortress city"
    },
  ];

  // Statistics Data
  const statistics = [
    { icon: <Users size={24} />, label: "Event Planners", value: "500+" },
    { icon: <MapPin size={24} />, label: "Locations", value: "50+" },
    { icon: <Calendar size={24} />, label: "Events Planned", value: "1000+" },
  ];

  // Function to handle viewing planner profile
  const handleViewProfile = async (email) => {
    try {
      console.log('Sending request with email:', email);
      const response = await fetch('http://localhost:5000/plannerProfile2/getPlannerByMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      console.log('Profile data:', data);
      setSelectedProfile(data);
      setIsProfileModalOpen(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile. Please try again.');
    }
  };

  // Function to receive data from child
  const handlePlannerData = (data) => {
    setIsLoading(false);
    if (Array.isArray(data)) {
      console.log("Received event planners:", data.length);
      setEventPlanners(data);
    } else {
      console.error("Invalid data received: ", data);
      setEventPlanners([]);
    }
  };

  function handleSearch() {
    if (!location.trim()) {
      alert("Please enter a valid location.");
      return;
    }
    setIsLoading(true);
    setSearchedLocation(location);
  }

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Filter event planners based on activeTab
  const filteredPlanners = eventPlanners.filter(planner => {
    if (activeTab === 'all') return true;
    if (activeTab === 'premium') return planner.isPremium;
    if (activeTab === 'verified') return planner.isVerified;
    return true;
  });

    const navigate = useNavigate();
  

  return (
    <div>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <Navigation />
          
          {/* Header Section */}
          <header className={styles.header}>
            <h3 className={styles.h3}>
              <span className={styles["green-pipe"]}>|</span> Extravaganza Unit
            </h3>
            <p className={styles.p1}>
              Loved By Event Organizers.
              <br />
              Built for <span className={styles["box-text"]}>Location Filtering</span>
            </p>
          </header>

          {/* Statistics Section */}
          <div className={styles.statistics}>
            {statistics.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Locations */}
          <section className={styles.featuredSection}>
            <h3 className={styles.sectionTitle}>Featured Locations in Sri Lanka</h3>
            <div className={styles.featuredGrid}>
              {featuredLocations.map((loc, index) => (
                <div key={index} className={styles.locationCard}
                     onClick={() => {
                       setLocation(loc.name);
                       handleSearch();
                     }}>
                  <div className={styles.locationImageWrapper}>
                    <img src={loc.image} alt={loc.name} className={styles.locationImage} />
                    <div className={styles.locationOverlay}></div>
                  </div>
                  <div className={styles.locationInfo}>
                    <h4>{loc.name}</h4>
                    <p className={styles.locationDescription}>{loc.description}</p>
                    <p className={styles.plannerCount}>{loc.count} Event Planners</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accordion */}
          <div className={styles.accordion}>
            <button
              className={styles.accordionButton}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <Info size={20} />
              About Location Filtering
              {isAccordionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isAccordionOpen && (
              <div className={styles.accordionContent}>
                <p>
                  Finding the perfect event planner within your area has never been easier. Our advanced location filtering system allows you to:
                </p>
                <ul className={styles.featureList}>
                  <li>Search for event planners in any city or region</li>
                  <li>View detailed profiles and portfolios</li>
                  <li>Filter by experience level and specialization</li>
                  <li>Connect directly with professionals in your area</li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className={styles.searchContainer}>
            <label className={styles.span1} htmlFor="location-input">
              <MapPin size={20} />
              Location:
            </label>
            <div className={styles.searchInputWrapper}>
              <input
                id="location-input"
                type="text"
                placeholder="Enter Your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Enter your location"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                aria-label="Search for event planners"
              >
                {isLoading ? (
                  "Searching..."
                ) : (
                  <>
                    <Search size={20} />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Google Map */}
          <div className={styles["google-map"]}>
            <GoogleMapComponent
              location={searchedLocation}
              sendEventPlanners={handlePlannerData}
            />
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${activeTab === 'all' ? styles.active : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterTab} ${activeTab === 'premium' ? styles.active : ''}`}
              onClick={() => setActiveTab('premium')}
            >
              Premium
            </button>
            <button
              className={`${styles.filterTab} ${activeTab === 'verified' ? styles.active : ''}`}
              onClick={() => setActiveTab('verified')}
            >
              Verified
            </button>
          </div>

          {/* Event Count */}
          <p className={styles["event-count"]}>
            Total Event Planners Found: {filteredPlanners.length}
          </p>

          {/* Event Planners Table */}
          <div className={styles.tablediv}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Event Planner Name</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlanners.length > 0 ? (
                  filteredPlanners.map((planner, index) => (
                    <tr key={index}>
                      <td>{planner.FullName || "No Data Available"}</td>
                      <td>{planner.City || "No Data Available"}</td>
                      <td>
                        <div className={styles.statusBadges}>
                          {planner.isPremium && <span className={styles.premiumBadge}>Premium</span>}
                          {planner.isVerified && <span className={styles.verifiedBadge}>Verified</span>}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewProfile(planner.Email)}
                          className={styles.viewProfile}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noResults}>
                      {searchedLocation ? "No event planners found" : "Search for a location to see event planners"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Profile Modal */}
          {isProfileModalOpen && selectedProfile && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button 
                  className={styles.closeButton}
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setSelectedProfile(null);
                  }}
                >
                  <X size={24} />
                </button>
                <h2 className={styles.modalTitle}>Event Planner Profile</h2>
                <div className={styles.profileInfo}>
                  <div className={styles.profileField}>
                    <strong>Name:</strong> {selectedProfile.FullName}
                  </div>
                  <div className={styles.profileField}>
                    <strong>Email:</strong> {selectedProfile.Email}
                  </div>
                  <div className={styles.profileField}>
                    <strong>Phone:</strong> {selectedProfile.ContactNumber}
                  </div>
                  <div className={styles.profileField}>
                    <strong>City:</strong> {selectedProfile.City}
                  </div>
                  <div className={styles.profileField}>
                    <strong>Experience:</strong> {selectedProfile.Experience}
                  </div>
                  <div className={styles.profileField}>
                    <strong>Specialization:</strong> {selectedProfile.Speciality}
                  </div>
                  <br />
                  <button className={styles.bb1} onClick={()=>navigate('/Organizer_Inbox')}>Contact Now</button>
                  {selectedProfile.Description && (
                    <div className={styles.profileField}>
                      <strong>About:</strong>
                      <p>{selectedProfile.Description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
} 