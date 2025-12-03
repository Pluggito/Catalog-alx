import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

const PlaceOrder = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [coupon, setCoupon] = useState("");
	const [error, setError] = useState("");
	const [showCouponDialog, setShowCouponDialog] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Read cart and products from Redux
	const cart: (Product & { quantity: number })[] = useSelector((state: any) => state.cart.cart ?? []);
	const products: Product[] = useSelector((state: any) => state.products.items ?? []);

	// Calculate amounts
	const cartAmount = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
	const delivery_fee = 6000;
	const subtotal = cartAmount + delivery_fee;

	// Apply coupon discount
	let finalAmount = subtotal;
	if (coupon.trim().toUpperCase() === "1YEAR19") {
		finalAmount = subtotal * 0.85; // 15% discount
	}

	useEffect(() => {
		setError("");
	}, [firstName, lastName, email, phone, address]);

	const handleCoupon = () => {
		if (coupon.trim().toUpperCase() === "1YEAR19") {
			setError("");
			alert("15% off coupon applied!");
			setShowCouponDialog(false);
		} else {
			setError("Invalid coupon code");
		}
	};

	const userDetails = { firstName, lastName, email, phone, address };
	const isFormValid = firstName.trim() && lastName.trim() && email.trim() && phone.trim() && address.trim();

	const handlePlaceOrder = async () => {
		if (!isFormValid) {
			setError("Please fill in all fields");
			return;
		}

		setIsProcessing(true);

		try {
			// Mock payment processing - replace with real payment gateway (Paystack, Stripe, etc.)
			const orderData = {
				userDetails,
				cartItems: cart,
				subtotal: cartAmount,
				deliveryFee: delivery_fee,
				finalAmount,
				couponApplied: coupon.trim().toUpperCase() === "1YEAR19",
				timestamp: new Date().toISOString(),
			};

			// Save to localStorage or send to backend
			localStorage.setItem("lastOrder", JSON.stringify(orderData));

			// Simulate success
			alert("Order placed successfully!");
			navigate("/order-summary", { state: orderData });

			// Clear cart after successful order
			dispatch({ type: "cart/clearCart" });
		} catch (err) {
			setError("Failed to process order. Please try again.");
			console.error("Order error:", err);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4">
			{/* LEFT SIDE - Delivery Form */}
			<div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
				<div className="text-xl sm:text-2xl my-3">
					<Title text1={"DELIVERY "} text2={"INFORMATION"} />
				</div>

				{error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}

				<div className="flex gap-3">
					<input
						type="text"
						placeholder="First name"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Last name"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>

				<input
					type="email"
					placeholder="Email address"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="text"
					placeholder="Street Address"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>

				<input
					type="tel"
					placeholder="Phone number"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				{/* COUPON DIALOG */}
				<div className="border rounded p-3 bg-gray-50">
					<p
						className="cursor-pointer text-sm text-blue-600 hover:underline"
						onClick={() => setShowCouponDialog(!showCouponDialog)}
					>
						Have a coupon code?
					</p>
					{showCouponDialog && (
						<div className="mt-3 flex gap-2">
							<input
								type="text"
								placeholder="Enter coupon code"
								className="border border-gray-300 rounded px-2 py-1 flex-1 text-sm"
								value={coupon}
								onChange={(e) => setCoupon(e.target.value)}
							/>
							<button
								onClick={handleCoupon}
								className="bg-black text-white px-3 py-1 rounded text-sm"
							>
								Apply
							</button>
						</div>
					)}
					{coupon.trim().toUpperCase() === "1YEAR19" && (
						<p className="text-green-600 text-xs mt-2">✓ 15% discount applied</p>
					)}
				</div>

				{/* PLACE ORDER BUTTON */}
				<div className="w-full text-end mt-4">
					<button
						onClick={handlePlaceOrder}
						disabled={!isFormValid || isProcessing}
						className={`w-full py-3 text-sm font-medium rounded ${
							isFormValid && !isProcessing
								? "bg-black text-white hover:bg-gray-800"
								: "bg-gray-400 text-white opacity-50 cursor-not-allowed"
						}`}
					>
						{isProcessing ? "Processing..." : "PLACE ORDER"}
					</button>
				</div>
			</div>

			{/* RIGHT SIDE - Cart Total */}
			<div className="mt-8 sm:mt-0">
				<CartTotal />
				{coupon.trim().toUpperCase() === "1YEAR19" && (
					<div className="mt-4 bg-green-50 border border-green-200 p-3 rounded text-sm">
						<p className="text-green-700">
							You save: ₦{((subtotal - finalAmount).toLocaleString("en-NG", { maximumFractionDigits: 0 }))}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PlaceOrder;