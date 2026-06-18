import { useEffect } from "react";
import type { PaymentCardProps } from "../../Types";
import { CourseStore } from "../../ZustandStore/CourseStore";
import { PayStore } from "../../ZustandStore/PaymentStore";
import { useAuth } from "../../ZustandStore/AuthStore";
import { useNavigate } from "react-router-dom";

function PaymentCard({
  title,
  price,
  discount,
  isLoading,
  imgstring,
  courseId,
  isEnroll,
}: PaymentCardProps) {
  const fetchSpecificCourse = CourseStore((s) => s.FetchSpecificCourse);
  const specificCourse = CourseStore((s) => s.specificCourse);
  const finalPrice = (price - (discount * price) / 100).toFixed(2);
  const PayFunction = PayStore((s) => s.handlePayment);
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSpecificCourse(courseId);
  }, [courseId]);
  const onPay = async () => {
    if (specificCourse) await PayFunction(specificCourse);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">
        Complete Your Purchase
      </h2>
      <img
        src={imgstring}
        alt="Thumbnail"
        className="w-full aspect-auto object-cover"
      />
      {/* Course Title */}
      <p className="text-sm text-gray-600">{title}</p>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">₹{finalPrice}</span>
        <span className="text-gray-500 line-through text-sm">₹{price}</span>
        <span className="text-green-600 text-sm font-medium">
          {discount}% off
        </span>
      </div>

      {/* Secure Badge */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        🔒 Secure payment powered by Razorpay
      </div>

      {/* Pay Button */}
      <button
        onClick={() => (isAuthenticate ? onPay() : navigate("/signup"))}
        disabled={isEnroll}
        className={`w-full text-white py-2.5 rounded-xl font-medium transition
  ${
    isEnroll || isLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
  }`}
      >
        <div>
          {isLoading
            ? "Processing..."
            : isEnroll
              ? "Already Enrolled"
              : "Pay Now"}
        </div>
      </button>

      {/* Features */}
      <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
        <li>Lifetime access</li>
        <li>Certificate of completion</li>
        <li>30-day refund guarantee</li>
      </ul>
    </div>
  );
}

export default PaymentCard;
