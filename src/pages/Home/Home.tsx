import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { ArrowRight, CheckCircle, Users, Buildings, Shield } from "phosphor-react";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  const features = [
    {
      icon: Users,
      title: "For Customers",
      description: "Get quotes from certified HVAC professionals in your area",
      benefits: [
        "Free project posting",
        "Multiple competitive bids",
        "Verified contractors",
      ],
    },
      {
        icon: Buildings,
        title: "For Vendors",
        description: "Connect with customers who need HVAC services",
        benefits: [
          "Access to local projects",
          "Build your customer base",
          "Competitive bidding",
        ],
      },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "All vendors are verified and certified",
      benefits: [
        "Background checks",
        "License verification",
        "Insurance confirmed",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with Certified HVAC Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Get competitive quotes for your HVAC installation or replacement
              from verified contractors in your area
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register?role=customer"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  I Need HVAC Service
                    <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/register?role=vendor"
                  className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-flex items-center justify-center border-2 border-primary-400"
                >
                  I'm a Contractor
                    <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex justify-center">
                <Link
                  to={
                    user?.role === "customer" ? "/create-project" : "/projects"
                  }
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  {user?.role === "customer"
                    ? "Create New Project"
                    : "View Projects"}
                    <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How CTMP Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, secure platform connecting homeowners with certified
              HVAC professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center justify-center text-sm text-gray-600"
                    >
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Post Your Project
              </h3>
              <p className="text-gray-600">
                Describe your HVAC needs, upload photos, and provide property
                details
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Receive Bids
              </h3>
              <p className="text-gray-600">
                Certified contractors in your area will submit competitive bids
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose & Connect
              </h3>
              <p className="text-gray-600">
                Compare bids and connect with the contractor that best fits your
                needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers and contractors
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=customer"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started as Customer
              </Link>
              <Link
                to="/register?role=vendor"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-primary-400"
              >
                Join as Contractor
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
