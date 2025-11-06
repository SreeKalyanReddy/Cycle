import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Mail, Lock, User, Eye, EyeOff, ArrowRight, Moon, Sun, Bell, TrendingUp, Shield } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if demo credentials were passed from landing page
  useEffect(() => {
    if (location.state?.demoCredentials) {
      setFormData({
        name: '',
        email: location.state.demoCredentials.email,
        password: location.state.demoCredentials.password,
      });
    }
  }, [location.state]);

  // Carousel slides data
  const slides = [
    {
      title: "Track Your Subscriptions, Save Money",
      subtitle: "Never miss a renewal. Manage all your subscriptions in one place.",
      number: "01"
    },
    {
      title: "Smart Reminders & Notifications",
      subtitle: "Get notified before each renewal date. Stay in control of your spending.",
      number: "02"
    },
    {
      title: "Visual Analytics & Insights",
      subtitle: "See exactly where your money goes with beautiful charts and reports.",
      number: "03"
    }
  ];

  // Auto-cycle slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showSignup) {
        console.log('Attempting registration with:', formData);
        await register(formData.name, formData.email, formData.password);
      } else {
        console.log('Attempting login with email:', formData.email);
        await login(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      console.error('Error details:', error.response?.data);
      // Error is already shown via toast in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login initiated');
      await loginWithGoogle(credentialResponse);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      console.error('Error details:', error.response?.data);
      // Error is already shown via toast in AuthContext
    }
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Combined Hero + Form Section */}
      <div className={`w-full lg:w-1/2 relative overflow-hidden backdrop-blur-3xl transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-800/30' 
          : 'bg-gradient-to-br from-indigo-50/30 via-purple-50/30 to-pink-50/30'
      }`}>
        {/* Animated Background with floating squares */}
        <div className="absolute inset-0">
          <div className={`absolute top-[10%] left-[10%] w-16 h-16 border-4 animate-float-1 ${
            darkMode ? 'border-indigo-500/30' : 'border-indigo-400/30'
          }`}></div>
          <div className={`absolute top-[20%] left-[80%] w-20 h-20 border-4 animate-float-2 ${
            darkMode ? 'border-purple-500/30' : 'border-purple-400/30'
          }`}></div>
          <div className={`absolute top-[60%] left-[15%] w-12 h-12 border-4 animate-float-3 ${
            darkMode ? 'border-pink-500/30' : 'border-pink-400/30'
          }`}></div>
          <div className={`absolute top-[75%] left-[70%] w-24 h-24 border-4 animate-float-4 ${
            darkMode ? 'border-indigo-500/30' : 'border-indigo-400/30'
          }`}></div>
          <div className={`absolute top-[40%] left-[50%] w-14 h-14 border-4 animate-float-5 ${
            darkMode ? 'border-purple-500/30' : 'border-purple-400/30'
          }`}></div>
          <div className={`absolute top-[85%] left-[30%] w-18 h-18 border-4 animate-float-6 ${
            darkMode ? 'border-pink-500/30' : 'border-pink-400/30'
          }`}></div>
          <div className={`absolute top-[5%] left-[60%] w-16 h-16 border-4 animate-float-1 animation-delay-2000 ${
            darkMode ? 'border-indigo-500/30' : 'border-indigo-400/30'
          }`}></div>
          <div className={`absolute top-[50%] left-[85%] w-14 h-14 border-4 animate-float-2 animation-delay-4000 ${
            darkMode ? 'border-purple-500/30' : 'border-purple-400/30'
          }`}></div>
          <div className={`absolute top-[30%] left-[25%] w-20 h-20 border-4 animate-float-3 animation-delay-3000 ${
            darkMode ? 'border-pink-500/30' : 'border-pink-400/30'
          }`}></div>
          <div className={`absolute top-[70%] left-[55%] w-16 h-16 border-4 animate-float-4 animation-delay-5000 ${
            darkMode ? 'border-indigo-500/30' : 'border-indigo-400/30'
          }`}></div>
        </div>

        {/* Carousel Content */}
        <div className="relative z-10 flex flex-col justify-between p-16 w-full min-h-screen">
          <div className="flex-1 flex items-center">
            <div className="relative h-96 w-full flex items-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-700 ease-in-out ${
                    currentSlide === index
                      ? 'opacity-100 translate-x-0'
                      : currentSlide < index
                      ? 'opacity-0 translate-x-full'
                      : 'opacity-0 -translate-x-full'
                  }`}
                >
                  <div className="space-y-8">
                    {/* Number */}
                    <div className={`text-6xl font-light transition-colors duration-300 ${
                      darkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {slide.number}
                    </div>
                    
                    {/* Title */}
                    <h1 className={`text-5xl font-bold leading-tight max-w-lg transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {slide.title}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className={`text-xl max-w-md leading-relaxed transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center space-x-8">
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? darkMode 
                        ? 'w-12 bg-white' 
                        : 'w-12 bg-gray-900'
                      : darkMode
                        ? 'w-2 bg-gray-600 hover:bg-gray-400'
                        : 'w-2 bg-gray-400 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Slide Counter */}
            <div className={`text-sm font-mono transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Dark Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <img src={logo} alt="Cycle Logo" className="h-16 w-16 object-contain" />
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`} />
                ) : (
                  <Moon className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {showSignup ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {showSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={() => setShowSignup(!showSignup)}
                className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors underline"
              >
                {showSignup ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {showSignup && (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    darkMode
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  darkMode
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12 ${
                  darkMode
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {showSignup && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor="terms" className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I agree to the{' '}
                  <a href="#" className="text-indigo-500 hover:text-indigo-600 underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Processing...' : showSignup ? 'Create account' : 'Log in'}</span>
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or {showSignup ? 'register' : 'login'} with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-xl overflow-hidden">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('Google login failed')}
                theme={darkMode ? "filled_black" : "outline"}
                size="large"
                text={showSignup ? "signup_with" : "signin_with"}
                width="100%"
                shape="rectangular"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
