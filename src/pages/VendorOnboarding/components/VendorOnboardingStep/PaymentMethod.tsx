import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "phosphor-react";
import { Button } from "@/components";

interface PaymentMethodProps {
  onPaymentMethodAdded: (paymentMethodId: string) => void;
}

const PaymentMethod = ({ onPaymentMethodAdded }: PaymentMethodProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvv?: string;
  }>({});

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: undefined });
      }
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiryDate(value);
      if (errors.expiryDate) {
        setErrors({ ...errors, expiryDate: undefined });
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setCvv(value);
      if (errors.cvv) {
        setErrors({ ...errors, cvv: undefined });
      }
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!cardNumber || cardNumber.length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!cardName || cardName.trim().length < 3) {
      newErrors.cardName = "Please enter the cardholder name";
    }

    if (!expiryDate || expiryDate.length !== 4) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    } else {
      const month = parseInt(expiryDate.slice(0, 2));
      const year = parseInt(expiryDate.slice(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.expiryDate = "Invalid month";
      } else if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!cvv || cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call to add payment method
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real implementation, you would call your payment processor API here
      // const response = await addPaymentMethod({ cardNumber, cardName, expiryDate, cvv });

      const mockPaymentMethodId = `pm_${Date.now()}`;
      onPaymentMethodAdded(mockPaymentMethodId);
    } catch (error) {
      console.error("Error adding payment method:", error);
      setErrors({
        cardNumber: "Failed to add payment method. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Add Payment Method
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Add a credit card to receive payments for completed projects
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        {/* Card Number */}
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              value={formatCardNumber(cardNumber)}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            <CreditCard
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label
            htmlFor="cardName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
              if (errors.cardName) {
                setErrors({ ...errors, cardName: undefined });
              }
            }}
            placeholder="John Doe"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.cardName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cardName && (
            <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={formatExpiryDate(expiryDate)}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Lock className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            Your payment information is encrypted and secure. We never store
            your full card details.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3 text-lg font-semibold"
        >
          {isProcessing ? "Processing..." : "Add Payment Method"}
        </Button>
      </form>
    </motion.div>
  );
};

export default PaymentMethod;
