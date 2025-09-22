import { useState } from "react";
import {
  X,
  Phone,
  CheckCircle,
  User,
  Clock,
  PhoneCall,
} from "phosphor-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const isValidPhone = () => {
    const digits = phoneNumber.replace(/\D/g, "");
    return digits.length === 10;
  };

  const handleSubmit = async () => {
    if (!isValidPhone()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setPhoneNumber("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2c74b3] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Need Help?</h2>
                <p className="text-blue-100 text-sm">Get personal assistance</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Talk to Our Experts
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our home service experts are here to help you with your
                  project. Enter your phone number and we'll call you within 15
                  minutes.
                </p>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2c74b3] focus:ring-0 transition-all duration-200"
                    maxLength={14}
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll only use this to help with your current request
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  What you'll get:
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Expert guidance on your project
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Help choosing the right service
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Answers to technical questions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Free consultation - no obligation
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isValidPhone() || isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  isValidPhone() && !isSubmitting
                    ? "bg-[#2c74b3] text-white hover:bg-[#235d8f] shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Requesting Callback...
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-5 h-5" />
                    {isValidPhone() ? "Request Callback" : "Enter Phone Number"}
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" weight="fill" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Request Received!
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our expert will call you at <strong>{phoneNumber}</strong>{" "}
                  within the next 15 minutes.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">
                      What happens next?
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Our expert will call you within 15 minutes</li>
                      <li>• They'll help you complete your project request</li>
                      <li>• You'll get personalized recommendations</li>
                      <li>• Continue with confidence!</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
              >
                Continue with Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
