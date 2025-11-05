import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Brain,
  Code,
  CheckCircle2,
  ArrowRight,
  Zap,
  Trophy,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Welcome = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAppContext();

  useEffect(() => {
    // Check if user is already logged in
    
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Practice",
      description:
        "Get intelligent feedback and personalized interview questions",
    },
    {
      icon: Target,
      title: "Track Progress",
      description:
        "Monitor your improvement with detailed analytics and reports",
    },
    {
      icon: Code,
      title: "Technical Interviews",
      description: "Practice coding challenges and system design questions",
    },
    {
      icon: Trophy,
      title: "Real-World Scenarios",
      description: "Prepare with industry-standard interview formats",
    },
  ];

  const stats = [
    { number: "10K+", label: "Practice Sessions" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Interview Questions" },
    { number: "24/7", label: "AI Availability" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-6 md:px-20 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Mock
            </span>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg transition-all duration-300 font-semibold text-sm"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 md:px-20 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-8">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Interview Preparation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Master Your Next
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tech Interview
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Practice with AI, track your progress, and land your dream job. Get
            instant feedback on your coding skills and interview performance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="group flex items-center gap-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 font-semibold text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="px-6 md:px-20 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive tools and resources to help you ace your technical
            interviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-6 md:px-20 py-20 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start your journey in three simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Sign Up & Create Profile",
                description:
                  "Create your account and set up your profile with your skills and target roles",
              },
              {
                step: "02",
                title: "Practice with AI",
                description:
                  "Get personalized interview questions and practice with our AI-powered system",
              },
              {
                step: "03",
                title: "Track & Improve",
                description:
                  "Review your performance, identify weak areas, and improve continuously",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 group-hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 md:px-20 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-cyan-500/5 to-blue-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                Get Started?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of developers who have improved their interview
              skills
            </p>
            <button
              onClick={() => navigate("/login")}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 font-semibold text-lg"
            >
              Start Practicing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Mock
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 AI Mock. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
