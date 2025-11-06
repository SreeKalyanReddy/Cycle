import { Link, useNavigate } from 'react-router-dom';
import { Check, TrendingUp, Bell, BarChart3, Calendar, DollarSign, Shield, Moon, Sun, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import logo from '../assets/logo.png';
import dashboardPreview from '../assets/dashboard-preview.png';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [demoCredentials, setDemoCredentials] = useState(null);
  const [savings, setSavings] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showUnlimited, setShowUnlimited] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleDemoLogin = () => {
    // Open modal with demo credentials pre-filled
    setDemoCredentials({
      email: 'demo@cycle.com',
      password: 'demo123'
    });
    setShowLoginModal(true);
  };

  const handleLoginClick = () => {
    setDemoCredentials(null);
    setShowLoginModal(true);
  };

  // Track hero section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  // Animate counter when stats section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Animate numbers when hasAnimated becomes true
  useEffect(() => {
    if (hasAnimated) {
      const duration = 1000; // 1 second
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Animate percentage from 0 to 100
        setPercentage(Math.floor(progress * 100));
        
        // Animate savings from 0 to 500
        setSavings(Math.floor(progress * 500));

        // Show "Unlimited" after a short delay
        if (progress > 0.2) {
          setShowUnlimited(true);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [hasAnimated]);

  const features = [
    {
      icon: TrendingUp,
      title: "Track Every Subscription",
      description: "Never lose track of your recurring payments. See all your subscriptions in one centralized dashboard."
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Get notified before renewal dates so you can cancel or budget accordingly. Stay in control."
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts and insights show exactly where your money goes each month."
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Identify and cancel unused subscriptions. Our users save an average of $300 per year."
    },
    {
      icon: Calendar,
      title: "Never Miss a Date",
      description: "Track renewal dates and billing cycles for all your services in one place."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secure. We never share your information."
    }
  ];

  const faqs = [
    {
      question: "Is Cycle really free?",
      answer: "Yes! Cycle is completely free to use. No credit card required, no hidden fees, no trials that expire."
    },
    {
      question: "How many subscriptions can I track?",
      answer: "Track unlimited subscriptions. Whether you have 5 or 500, Cycle can handle them all."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. Your data is encrypted and stored securely. We never share your information with third parties."
    },
    {
      question: "Can I cancel anytime?",
      answer: "No. You manually add your subscriptions, so there's no need to connect any financial accounts."
    }
  ];

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Animated Background with multiple small shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Large shapes - different shapes */}
        <div 
          className="absolute w-24 h-24 rounded-full bg-indigo-400 opacity-40 blur-xl animate-float-1"
          style={{ top: '5%', left: '5%' }}
        ></div>
        <div 
          className="absolute w-28 h-20 rounded-[40%] bg-purple-400 opacity-35 blur-xl animate-float-2"
          style={{ top: '60%', right: '8%' }}
        ></div>
        <div 
          className="absolute w-20 h-26 rounded-[45%] bg-pink-400 opacity-40 blur-xl animate-float-3"
          style={{ bottom: '15%', left: '35%' }}
        ></div>
        <div 
          className="absolute w-22 h-22 rounded-full bg-indigo-400 opacity-35 blur-xl animate-float-4"
          style={{ top: '40%', left: '70%' }}
        ></div>
        <div 
          className="absolute w-26 h-22 rounded-[40%] bg-purple-400 opacity-40 blur-xl animate-float-5"
          style={{ bottom: '50%', right: '25%' }}
        ></div>
        
        {/* Line shapes - vertical and horizontal */}
        <div 
          className="absolute w-1 h-32 bg-indigo-300 opacity-40 blur-sm animate-float-1"
          style={{ top: '25%', left: '15%', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute w-40 h-0.5 bg-purple-300 opacity-35 blur-sm animate-float-2"
          style={{ top: '50%', left: '10%', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute w-1 h-24 bg-pink-300 opacity-40 blur-sm animate-float-3"
          style={{ top: '65%', left: '18%', animationDelay: '3s' }}
        ></div>
        <div 
          className="absolute w-36 h-0.5 bg-indigo-300 opacity-35 blur-sm animate-float-4"
          style={{ top: '35%', left: '8%', animationDelay: '4s' }}
        ></div>
        <div 
          className="absolute w-1 h-28 bg-purple-300 opacity-40 blur-sm animate-float-5"
          style={{ top: '42%', left: '12%', animationDelay: '2.5s' }}
        ></div>
        <div 
          className="absolute w-32 h-0.5 bg-pink-300 opacity-35 blur-sm animate-float-6"
          style={{ top: '72%', left: '5%', animationDelay: '1.5s' }}
        ></div>
        <div 
          className="absolute w-1 h-20 bg-indigo-200 opacity-45 blur-sm animate-float-2"
          style={{ top: '15%', left: '20%', animationDelay: '3.5s' }}
        ></div>
        <div 
          className="absolute w-28 h-0.5 bg-purple-200 opacity-40 blur-sm animate-float-3"
          style={{ top: '80%', left: '12%', animationDelay: '4.5s' }}
        ></div>
        
        {/* Medium shapes - organic shapes */}
        <div 
          className="absolute w-18 h-18 rounded-full bg-indigo-300 opacity-45 blur-lg animate-float-4"
          style={{ top: '30%', left: '60%' }}
        ></div>
        <div 
          className="absolute w-22 h-16 rounded-[35%] bg-purple-300 opacity-40 blur-lg animate-float-5"
          style={{ top: '75%', left: '15%' }}
        ></div>
        <div 
          className="absolute w-16 h-20 rounded-[50%] bg-pink-300 opacity-45 blur-lg animate-float-6"
          style={{ top: '45%', right: '25%' }}
        ></div>
        <div 
          className="absolute w-20 h-18 rounded-[40%] bg-indigo-300 opacity-40 blur-lg animate-float-1"
          style={{ top: '10%', left: '80%', animationDelay: '3s' }}
        ></div>
        <div 
          className="absolute w-18 h-22 rounded-[45%] bg-purple-300 opacity-45 blur-lg animate-float-2"
          style={{ bottom: '60%', left: '25%', animationDelay: '4s' }}
        ></div>
        <div 
          className="absolute w-22 h-20 rounded-[35%] bg-pink-300 opacity-40 blur-lg animate-float-3"
          style={{ top: '65%', right: '45%', animationDelay: '2s' }}
        ></div>
        
        {/* More shapes in middle left */}
        <div 
          className="absolute w-16 h-16 rounded-full bg-indigo-300 opacity-45 blur-md animate-float-4"
          style={{ top: '48%', left: '8%', animationDelay: '3.2s' }}
        ></div>
        <div 
          className="absolute w-14 h-18 rounded-[40%] bg-purple-300 opacity-40 blur-md animate-float-5"
          style={{ top: '52%', left: '14%', animationDelay: '2.8s' }}
        ></div>
        <div 
          className="absolute w-18 h-14 rounded-[35%] bg-pink-300 opacity-45 blur-md animate-float-6"
          style={{ top: '58%', left: '10%', animationDelay: '4.2s' }}
        ></div>
        <div 
          className="absolute w-12 h-16 rounded-[50%] bg-indigo-200 opacity-50 blur-sm animate-float-1"
          style={{ top: '44%', left: '6%', animationDelay: '1.8s' }}
        ></div>
        <div 
          className="absolute w-16 h-12 rounded-[45%] bg-purple-200 opacity-45 blur-sm animate-float-2"
          style={{ top: '56%', left: '16%', animationDelay: '3.8s' }}
        ></div>
        
        {/* Small shapes - varied */}
        <div 
          className="absolute w-12 h-12 rounded-full bg-indigo-200 opacity-50 blur-md animate-float-1"
          style={{ top: '20%', right: '40%', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute w-14 h-10 rounded-[40%] bg-purple-200 opacity-50 blur-md animate-float-2"
          style={{ bottom: '30%', left: '50%', animationDelay: '3s' }}
        ></div>
        <div 
          className="absolute w-10 h-14 rounded-[45%] bg-pink-200 opacity-45 blur-md animate-float-3"
          style={{ top: '55%', left: '25%', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute w-16 h-16 rounded-[30%] bg-indigo-300 opacity-40 blur-lg animate-float-4"
          style={{ top: '15%', left: '45%', animationDelay: '4s' }}
        ></div>
        <div 
          className="absolute w-12 h-18 rounded-[50%] bg-purple-200 opacity-45 blur-md animate-float-5"
          style={{ bottom: '40%', right: '15%', animationDelay: '2.5s' }}
        ></div>
        <div 
          className="absolute w-18 h-12 rounded-[35%] bg-pink-300 opacity-40 blur-lg animate-float-6"
          style={{ top: '70%', right: '35%', animationDelay: '1.5s' }}
        ></div>
        <div 
          className="absolute w-14 h-14 rounded-full bg-indigo-200 opacity-50 blur-md animate-float-3"
          style={{ top: '8%', left: '30%', animationDelay: '5s' }}
        ></div>
        <div 
          className="absolute w-12 h-16 rounded-[40%] bg-purple-200 opacity-45 blur-md animate-float-4"
          style={{ bottom: '20%', right: '50%', animationDelay: '3.5s' }}
        ></div>
        <div 
          className="absolute w-16 h-12 rounded-[35%] bg-pink-200 opacity-50 blur-md animate-float-5"
          style={{ top: '85%', left: '55%', animationDelay: '2.8s' }}
        ></div>
      </div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode ? 'border-gray-800 bg-gray-900/95 backdrop-blur-sm' : 'border-white/30 bg-white/40 backdrop-blur-2xl shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src={logo} alt="Cycle Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <span className={`text-xl sm:text-2xl font-bold transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Cycle</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all hover:scale-110 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                )}
              </button>
              <button 
                onClick={handleLoginClick} 
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all border-2 text-sm sm:text-base ${
                  darkMode 
                    ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-500/10' 
                    : 'border-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                Log in
              </button>
              {!isHeroVisible && (
                <button
                  onClick={handleDemoLogin}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all hover:shadow-lg"
                >
                  Try Demo
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className={`relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-colors overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Gradient Orbs */}
          <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl ${
            darkMode ? 'bg-indigo-500/30' : 'bg-indigo-500/60'
          }`} style={{ animation: 'float 20s ease-in-out infinite' }} />
          
          <div className={`absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? 'bg-purple-500/25' : 'bg-purple-500/50'
          }`} style={{ animation: 'float 25s ease-in-out infinite reverse' }} />
          
          <div className={`absolute -bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl ${
            darkMode ? 'bg-pink-500/20' : 'bg-pink-500/45'
          }`} style={{ animation: 'float 30s ease-in-out infinite' }} />
          
          <div className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-500/45'
          }`} style={{ animation: 'float 22s ease-in-out infinite reverse' }} />

          {/* Floating Circles */}
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={darkMode ? 'text-indigo-500/40' : 'text-indigo-600/70'} stopColor="currentColor" />
                <stop offset="100%" className={darkMode ? 'text-purple-500/40' : 'text-purple-600/70'} stopColor="currentColor" />
              </linearGradient>
            </defs>
            
            {/* Animated circles */}
            <circle cx="10%" cy="20%" r="3" fill="url(#circleGradient)" opacity={darkMode ? "0.6" : "0.8"}>
              <animate attributeName="cy" values="20%;15%;20%" dur="8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.6;0.3;0.6" : "0.8;0.5;0.8"} dur="8s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="85%" cy="30%" r="4" fill="url(#circleGradient)" opacity={darkMode ? "0.5" : "0.7"}>
              <animate attributeName="cy" values="30%;25%;30%" dur="10s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.5;0.2;0.5" : "0.7;0.4;0.7"} dur="10s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="20%" cy="70%" r="2.5" fill="url(#circleGradient)" opacity={darkMode ? "0.7" : "0.9"}>
              <animate attributeName="cy" values="70%;75%;70%" dur="12s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.7;0.4;0.7" : "0.9;0.6;0.9"} dur="12s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="75%" cy="80%" r="3.5" fill="url(#circleGradient)" opacity={darkMode ? "0.6" : "0.8"}>
              <animate attributeName="cy" values="80%;85%;80%" dur="9s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.6;0.3;0.6" : "0.8;0.5;0.8"} dur="9s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="50%" cy="40%" r="2" fill="url(#circleGradient)" opacity={darkMode ? "0.5" : "0.7"}>
              <animate attributeName="cy" values="40%;35%;40%" dur="11s" repeatCount="indefinite" />
              <animate attributeName="cx" values="50%;55%;50%" dur="11s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.5;0.2;0.5" : "0.7;0.4;0.7"} dur="11s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="65%" cy="55%" r="3" fill="url(#circleGradient)" opacity={darkMode ? "0.4" : "0.6"}>
              <animate attributeName="cy" values="55%;60%;55%" dur="13s" repeatCount="indefinite" />
              <animate attributeName="cx" values="65%;60%;65%" dur="13s" repeatCount="indefinite" />
              <animate attributeName="opacity" values={darkMode ? "0.4;0.2;0.4" : "0.6;0.3;0.6"} dur="13s" repeatCount="indefinite" />
            </circle>

            <circle cx="30%" cy="45%" r="2.5" fill="url(#circleGradient)" opacity="0.6">
              <animate attributeName="cy" values="45%;50%;45%" dur="10s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="10s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="90%" cy="65%" r="2" fill="url(#circleGradient)" opacity="0.5">
              <animate attributeName="cy" values="65%;60%;65%" dur="14s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="14s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Free Forever Badge - Bottom Right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-colors ${
            darkMode ? 'bg-indigo-900/80 text-indigo-200 border border-indigo-700' : 'bg-indigo-100 text-indigo-600 border border-indigo-200'
          }`}>
            Free Forever • No Credit Card Required
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight transition-colors animate-fade-in-up ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Subscription management built for your peace of mind.
            </h1>
            <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 leading-relaxed transition-colors animate-fade-in-up ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`} style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Track, manage, and optimize all your subscriptions in one place. 
              Save money and never miss a renewal date again.
            </p>
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <button 
                onClick={handleDemoLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-indigo-500/30 transform hover:scale-105"
              >
                Try Demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className={`py-6 sm:py-8 md:py-10 px-4 sm:px-6 border-y transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-white via-indigo-50/30 to-white border-gray-300'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-10 md:gap-12 text-center">
            <div>
              <div className={`text-xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-1000 ${
                darkMode ? 'text-white' : 'text-gray-900'
              } ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                {showUnlimited ? 'Unlimited' : '0'}
              </div>
              <p className={`text-[10px] sm:text-base md:text-lg transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Subscriptions to Track</p>
            </div>
            <div>
              <div className={`text-xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-1000 delay-200 ${
                darkMode ? 'text-white' : 'text-gray-900'
              } ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                {percentage}%
              </div>
              <p className={`text-[10px] sm:text-base md:text-lg transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Free to Use</p>
            </div>
            <div>
              <div className={`text-xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-1000 delay-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              } ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                ${savings}+
              </div>
              <p className={`text-[10px] sm:text-base md:text-lg transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Average Annual Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-b transition-colors ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Beautiful Dashboard, Powerful Insights
            </h2>
            <p className={`text-base sm:text-lg md:text-xl transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Everything you need at a glance
            </p>
          </div>
          
          {/* Dashboard Image Container */}
          <div className="relative max-w-6xl mx-auto">
            <div className={`rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 transition-colors ${
              darkMode ? 'border-indigo-500/50' : 'border-indigo-300'
            }`}>
              <img 
                src={dashboardPreview} 
                alt="Cycle Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-b transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-100 border-gray-300'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 transition-colors inline-block relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Everything you need to manage subscriptions.
              <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[120%]" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6C50 2 100 0 150 2C200 4 250 8 300 6" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F46E5"/>
                    <stop offset="50%" stopColor="#9333EA"/>
                    <stop offset="100%" stopColor="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`text-center p-2 sm:p-5 md:p-6 rounded-lg md:rounded-2xl transition-all hover:scale-105 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-lg'
                }`}>
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg md:rounded-2xl mb-2 sm:mb-5 md:mb-6 ${
                    darkMode ? 'bg-indigo-900' : 'bg-indigo-100'
                  }`}>
                    <Icon className={`h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <h3 className={`text-[10px] sm:text-xl md:text-2xl font-bold mb-1 sm:mb-3 md:mb-4 transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-[8px] sm:text-base md:text-lg leading-snug sm:leading-relaxed transition-colors hidden sm:block ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-b transition-colors ${
        darkMode ? 'bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 border-gray-700' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-gray-300'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 transition-colors inline-block relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why choose Cycle?
              <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[120%]" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6C50 2 100 0 150 2C200 4 250 8 300 6" stroke="url(#gradient2)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F46E5"/>
                    <stop offset="50%" stopColor="#9333EA"/>
                    <stop offset="100%" stopColor="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className={`p-2 sm:p-6 md:p-8 rounded-lg md:rounded-2xl shadow-sm hover:shadow-lg transition-all hover:scale-105 ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl mb-2 sm:mb-5 md:mb-6 ${
                    darkMode ? 'bg-indigo-900' : 'bg-indigo-100'
                  }`}>
                    <Icon className={`h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <h3 className={`text-[10px] sm:text-xl md:text-2xl font-bold mb-1 sm:mb-3 md:mb-4 transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-[8px] sm:text-base leading-snug sm:leading-relaxed transition-colors hidden sm:block ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-b transition-colors ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-blue-50/60 border-gray-300'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <blockquote className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 italic transition-colors ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}>
            "Cycle has been a game-changer. I discovered three subscriptions I forgot about and saved over $400 this year."
          </blockquote>
          <p className={`text-sm sm:text-base font-semibold transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Sarah Johnson</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-b transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-violet-100 border-gray-300'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`rounded-lg md:rounded-xl transition-all ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`w-full p-4 sm:p-5 md:p-6 flex justify-between items-center text-left transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className={`px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 sm:py-14 md:py-16 px-6 transition-colors ${
        darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-indigo-600'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to take control?
          </h2>
          <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 transition-colors ${
            darkMode ? 'text-indigo-200' : 'text-indigo-100'
          }`}>
            Join thousands of users saving money with Cycle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto px-4">
            <button 
              onClick={handleDemoLogin}
              className="bg-white hover:bg-gray-100 text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105"
            >
              Try Demo →
            </button>
            <button 
              onClick={handleLoginClick} 
              className="border-2 border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-colors text-center"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        initialCredentials={demoCredentials} 
      />
    </div>
  );
};

export default LandingPage;
