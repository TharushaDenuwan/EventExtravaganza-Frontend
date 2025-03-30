import React, { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin, DollarSign, MessageCircle, CheckSquare, Star, Package, Clock, Users, ChevronDown, ChevronUp, ArrowRight, Mail, Phone } from 'lucide-react';
import Navigation from '../navigation/navigation';
import Footer from '../footer/footer';
import styles from './home.module.css';
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const testimonialsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.section]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-section]').forEach((element) => {
      observer.observe(element);
    });
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  const scrollToTestimonial = (index) => {
    setActiveTab(index);
    if (testimonialsRef.current) {
      const scrollAmount = index * testimonialsRef.current.offsetWidth;
      testimonialsRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className={styles.container}>
      <Navigation />
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitleWrapper}>
            <h1>
              <span className={styles.heroTitleFirst}>Event</span>
              <span className={styles.heroTitleSecond}>Extravaganza</span>
            </h1>
            <div className={styles.decorativeLine}></div>
          </div>
          <h2 className={styles.heroSubtitle}>Weddings & Parties</h2>
          <p className={styles.heroDescription}>
            Transform your special moments into unforgettable experiences with our seamless event planning platform.
            Connect with top planners and bring your dream events to life.
          </p>
          <div className={styles.heroCta}>
            <button className={styles.primaryButton} onClick={()=>navigate('/Budget_Filtering')}>
              Book Now
              <ArrowRight className={styles.buttonIcon} />
            </button>
            <a href="#features"> <button  className={styles.secondaryButton}>
              Explore Services
            </button> </a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
            alt="Event celebration with elegant decorations and lighting"
          />
          <div className={styles.imageOverlay}></div>
          <div className={styles.floatingBadge}>
            <span>Premium Planning</span>
          </div>
        </div>
      </section>
      <section className={styles.statsSection} data-section="stats">
        <div className={styles.statsOverlay}></div>
        <div className={`${styles.statCard} ${isVisible.stats ? styles.visible : ''}`}>
          <Users className={styles.statIcon} />
          <div className={styles.statContent}>
            <h3>5,000+</h3>
            <div className={styles.statBar}><div className={styles.statProgress} style={{width: '80%'}}></div></div>
            <p>Event Organizers</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${isVisible.stats ? styles.visible : ''}`}>
          <Calendar className={styles.statIcon} />
          <div className={styles.statContent}>
            <h3>2,000+</h3>
            <div className={styles.statBar}><div className={styles.statProgress} style={{width: '65%'}}></div></div>
            <p>Event Planners</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${isVisible.stats ? styles.visible : ''}`}>
          <Star className={styles.statIcon} />
          <div className={styles.statContent}>
            <h3>8.1/10</h3>
            <div className={styles.statBar}><div className={styles.statProgress} style={{width: '81%'}}></div></div>
            <p>User Feedback</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${isVisible.stats ? styles.visible : ''}`}>
          <CheckSquare className={styles.statIcon} />
          <div className={styles.statContent}>
            <h3>12,000+</h3>
            <div className={styles.statBar}><div className={styles.statProgress} style={{width: '90%'}}></div></div>
            <p>Events Completed</p>
          </div>
        </div>
      </section>
      <section className={`${styles.featuresSection} ${isVisible.features ? styles.visible : ''}`} data-section="features">
        <h2>Key Features</h2>
        <div className={styles.sectionDivider}></div>
        <p id="features" className={styles.sectionSubtitle}>
          Seamlessly plan your perfect event with our powerful platform features
        </p>
        <div  className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureCardOverlay}></div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.howItWorks} ${isVisible.howItWorks ? styles.visible : ''}`} data-section="howItWorks">
        <h2>How It Works</h2>
        <div className={styles.sectionDivider}></div>
        <p className={styles.sectionSubtitle}>Planning your dream event is just four simple steps away</p>
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepConnector}></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.eventTypes} ${isVisible.eventTypes ? styles.visible : ''}`} data-section="eventTypes">
        <h2>Event Types We Cover</h2>
        <div className={styles.sectionDivider}></div>
        <p className={styles.sectionSubtitle}>From intimate gatherings to grand celebrations</p>
        <div className={styles.eventTypesGrid}>
          {eventTypes.map((type, index) => (
            <div key={index} className={styles.eventTypeCard}>
              <div className={styles.eventTypeImageWrapper}>
                <img src={type.image} alt={type.title} />
                <div className={styles.eventTypeOverlay}></div>
              </div>
              <div className={styles.eventTypeContent}>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <button className={styles.eventTypeButton}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.testimonials} ${isVisible.testimonials ? styles.visible : ''}`} data-section="testimonials">
        <h2>What Our Clients Say</h2>
        <div className={styles.sectionDivider}></div>
        <div className={styles.testimonialTabs}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.testimonialTab} ${activeTab === index ? styles.active : ''}`}
              onClick={() => scrollToTestimonial(index)}
            >
              <div className={styles.tabDot}></div>
            </button>
          ))}
        </div>
        <div className={styles.testimonialCardsContainer}>
          <div className={styles.testimonialCards} ref={testimonialsRef}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`${styles.testimonialCard} ${activeTab === index ? styles.activeCard : ''}`}
              >
                <div className={styles.testimonialQuote}>"</div>
                <div className={styles.testimonialRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={styles.starIcon}
                      fill={i < testimonial.rating ? "#284b63" : "#d9d9d9"}
                    />
                  ))}
                </div>
                <p>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.faqSection} ${isVisible.faq ? styles.visible : ''}`} data-section="faq">
        <h2>Frequently Asked Questions</h2>
        <div className={styles.sectionDivider}></div>
        <div className={styles.faqContainer}>
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${expandedFaq === index ? styles.expanded : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                {expandedFaq === index ? (
                  <ChevronUp className={styles.faqIcon} />
                ) : (
                  <ChevronDown className={styles.faqIcon} />
                )}
              </div>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.contactSection} ${isVisible.contact ? styles.visible : ''}`} data-section="contact">
        <h2>Get In Touch</h2>
        <div className={styles.sectionDivider}></div>
        <p className={styles.sectionSubtitle}>Have questions or feedback? We'd love to hear from you!</p>
        <div className={styles.contactContainer}>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className={styles.formGroup}>
              <select className={styles.formSelect}>
                <option value="" disabled selected>Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday Party</option>
                <option value="corporate">Corporate Event</option>
                <option value="anniversary">Anniversary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <textarea placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
          <div className={styles.contactInfo}>
            <h3>Other Ways to Reach Us</h3>
            <div className={styles.contactMethod}>
              <div className={styles.contactIconWrapper}>
                <Mail className={styles.contactIcon} />
              </div>
              <p>support@eventextravaganza.com</p>
            </div>
            <div className={styles.contactMethod}>
              <div className={styles.contactIconWrapper}>
                <Clock className={styles.contactIcon} />
              </div>
              <p>Monday-Friday: 9am-6pm</p>
            </div>
            <div className={styles.contactMethod}>
              <div className={styles.contactIconWrapper}>
                <MapPin className={styles.contactIcon} />
              </div>
              <p>123 Event Street, Planning City</p>
            </div>
            <div className={styles.contactMap}>
              <div className={styles.mapPlaceholder}>
                <MapPin className={styles.mapIcon} />
                <p>Visit Our Office</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
const features = [
  {
    icon: <MapPin />,
    title: "Location Filter",
    description: "Find the perfect local event planners who understand your venue and area requirements."
  },
  {
    icon: <DollarSign />,
    title: "Budget Filter",
    description: "Discover planners that match your budget constraints without compromising on quality."
  },
  {
    icon: <MessageCircle />,
    title: "Chat Bot",
    description: "Get instant answers and recommendations from our AI-powered assistant."
  },
  {
    icon: <CheckSquare />,
    title: "Task Management",
    description: "Keep track of all planning tasks with customized checklists and timelines."
  },
  {
    icon: <Users />,
    title: "RSVP Tracking",
    description: "Manage guest lists and responses with our streamlined invitation system."
  },
  {
    icon: <Package />,
    title: "Planner Packages",
    description: "Choose from tiered service packages to match your specific event needs."
  }
];
const steps = [
  {
    title: "Define Your Event",
    description: "Select your event type and customize preferences to match your vision."
  },
  {
    title: "Browse Planners",
    description: "Filter planners by location, budget, and reviews to find your perfect match."
  },
  {
    title: "Collaborate",
    description: "Use our platform to communicate, share ideas, and track progress."
  },
  {
    title: "Enjoy Your Event",
    description: "Relax as your planner handles the details for your perfect celebration."
  }
];
const eventTypes = [
  {
    title: "Weddings",
    description: "Create the perfect day with our specialized wedding planners.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Birthday Parties",
    description: "Make your birthday memorable with custom themes and activities.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Corporate Events",
    description: "Impress clients and team members with professional gatherings.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
  },
  {
    title: "Anniversaries",
    description: "Celebrate your special milestones with thoughtfully planned events.",
    image: "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
  }
];
const testimonials = [
  {
    rating: 5,
    text: "Event Extravaganza made planning our wedding so much easier! We found an amazing planner within our budget who understood exactly what we wanted.",
    name: "Sarah J.",
    event: "Wedding, June 2023",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    rating: 5,
    text: "The task management feature was a lifesaver! Nothing was forgotten and our corporate event went off without a hitch. Highly recommend!",
    name: "Michael T.",
    event: "Corporate Event, March 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    rating: 4,
    text: "I was able to plan my daughter's sweet sixteen party in just a week! The platform connected me with a planner who worked miracles on short notice.",
    name: "Lisa M.",
    event: "Birthday Party, May 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];
const faqData = [
  {
    question: "How do I choose the right event planner?",
    answer: "Our platform allows you to filter planners by location, budget, and ratings. You can also view their portfolios and read reviews from previous clients to find your perfect match."
  },
  {
    question: "What types of events can I plan on this platform?",
    answer: "We support a wide range of events including weddings, birthday parties, corporate events, anniversaries, baby showers, and more. Our planners specialize in different event types."
  },
  {
    question: "How far in advance should I book a planner?",
    answer: "For large events like weddings, we recommend booking 6-12 months in advance. For smaller events, 2-3 months is usually sufficient, but we also have planners who specialize in last-minute events."
  },
  {
    question: "Can I communicate with planners before booking?",
    answer: "Yes! Our platform offers a messaging system that allows you to discuss your needs with potential planners before making any commitments."
  }
];