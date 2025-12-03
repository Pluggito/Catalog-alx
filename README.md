# Catalog ALX - E-Commerce Platform

A modern, full-featured e-commerce platform built with React, Redux, and TypeScript. Browse products, manage your cart, apply discounts, and place orders with an intuitive user interface.

## 🌟 Features

### Product Management
- **Browse Collections**: View all products with search and filter functionality
- **Search & Filter**: Find products by name, category, and price range
- **Pagination & Infinite Scroll**: 6 products per page with smooth infinite scroll loading
- **Product Details**: Comprehensive product pages with ratings, descriptions, and related products
- **Category Filtering**: Filter products by Electronics, Clothing, Accessories, Sports, and Home & Kitchen

### Shopping Cart
- **Add to Cart**: Add products with custom quantities
- **Quantity Management**: Increase, decrease, or update quantities directly
- **Remove Items**: Delete products from cart with one click
- **Cart Persistence**: Cart state managed via Redux
- **Cart Total**: Real-time subtotal, delivery fee, and total calculations

### Checkout & Orders
- **Order Form**: Collect delivery information (name, email, phone, address)
- **Coupon System**: Apply discount codes (e.g., "1YEAR19" = 15% off)
- **Dynamic Pricing**: Instant price recalculation with coupon application
- **Order Summary**: Clear breakdown of costs including delivery and discounts

### UI/UX
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Tailwind CSS**: Modern styling with utility-first approach
- **Icon Library**: Lucide React icons for visual clarity
- **Loading States**: Smart loading indicators and empty state messages
- **Error Handling**: Graceful error messages for user guidance

## 🛠️ Tech Stack

### Frontend
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript for robust development
- **Redux Toolkit**: State management with slices for products and cart
- **React Router v6**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for UI components
- **Vite**: Lightning-fast build tool and development server

### Data
- **JSON**: Product catalog stored as JSON (easily replaceable with API)
- **Redux Store**: Centralized state management for products and cart
- **Local Storage**: Optional persistence for order history

## 📁 Project Structure

```
catalog-alx/
├── src/
│   ├── pages/
│   │   ├── Collections.tsx        # Product listing with filters & pagination
│   │   ├── Products.tsx           # Single product detail page
│   │   ├── Cart.tsx               # Shopping cart view
│   │   ├── PlaceOrder.tsx         # Checkout & order form
│   │   └── NewCollections.tsx     # Featured new products
│   ├── components/
│   │   ├── ProductCard.tsx        # Reusable product card component
│   │   ├── CartTotal.tsx          # Cart summary component
│   │   └── Title.tsx              # Section title component
│   ├── redux/
│   │   ├── productSlice.ts        # Product state & filters
│   │   ├── cartSlice.ts           # Cart state & actions
│   │   ├── store.ts               # Redux store configuration
│   │ └── hooks.ts                # Redux hooks (optional)
│   ├── types/
│   │   └── product.ts             # TypeScript interfaces
│   ├── data/
│   │   └── products.json          # Product catalog (20 items in NGN)
│   └── App.tsx                    # Main app component with routes
├── README.md                      # This file
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/catalog-alx.git
   cd catalog-alx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 Usage

### Browse Products
- Navigate to **Collections** to see all products
- Use the search bar to find products by name
- Filter by category using the sidebar buttons
- Adjust price range (currently set to NGN 0-10,000,000)
- Scroll or use pagination to load more products

### View Product Details
- Click any product card to view full details
- See product rating, description, and price
- Select quantity and add to cart
- Browse related products in the same category

### Shopping Cart
- Click "ADD TO CART" from product details
- View cart by navigating to the **Cart** page
- Update quantities using the input field
- Remove items with the trash icon
- View real-time cart total on the right side

### Checkout
1. Navigate to **Cart**
2. Click "PROCEED TO CHECKOUT"
3. Fill in delivery information:
   - First Name
   - Last Name
   - Email
   - Street Address
   - Phone Number
4. (Optional) Apply coupon code "1YEAR19" for 15% discount
5. Click "PLACE ORDER"
6. Order confirmation with summary

## 💰 Pricing

All prices are in **Nigerian Naira (₦)** with examples:
- Wireless Bluetooth Headphones: ₦131,998
- Smart Fitness Watch: ₦329,983
- Organic Cotton T-Shirt: ₦49,483
- [See all 20 products in products.json]

**Delivery Fee**: ₦6,000 (flat rate)
**Coupon "1YEAR19"**: 15% discount on total

## 🎯 Key Features in Detail

### Redux State Management

**Product Slice**
- Manages product catalog, filtering, search, and pagination
- Actions: `setSearchQuery`, `setSelectedCategory`, `setCurrentPage`, `incrementPage`
- Supports infinite scroll by tracking current page

**Cart Slice**
- Manages shopping cart items and quantities
- Actions: `addToCart`, `removeFromCart`, `increaseQty`, `decreaseQty`, `clearCart`
- Persists cart state in Redux store

### Filtering System
- **Search**: Real-time product name filtering
- **Category**: Single category selection
- **Price Range**: Min and max price bounds (easily expandable)
- **Pagination**: 6 items per page with manual pagination controls
- **Infinite Scroll**: Auto-load next page when scrolling near bottom

### Coupon System
- Dialog-based coupon input
- Hardcoded coupon: "1YEAR19" = 15% discount
- Real-time price recalculation
- Visual discount confirmation

## 🔄 Data Flow

```
User Action → Component Dispatch → Redux Action → State Update → UI Re-render
    ↓            (PlaceOrder)      (addToCart)    (cartSlice)    (Cart page)
  Click Add     dispatch(...)      updateCart     cart: [...]    show ₦ total
  to Cart
```

## 🎨 Styling

- **Tailwind CSS**: Responsive grid layouts, flexbox utilities
- **Color Scheme**: Black, white, gray with accent colors
- **Responsive**: Mobile-first design with sm, md, lg breakpoints
- **Animations**: Hover effects, scale transitions, smooth scrolling

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Type Safety

Full TypeScript support with interfaces:
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
}
```

## 🚧 Future Enhancements

- [ ] Real payment gateway integration (Paystack, Stripe)
- [ ] User authentication & accounts
- [ ] Order history & tracking
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard for product management
- [ ] Backend API integration
- [ ] Email order confirmations
- [ ] Multiple payment methods
- [ ] Inventory management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**ALX Student Project**
- Portfolio: [Your portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the awesome framework
- Redux for state management
- Tailwind CSS for beautiful styling
- Lucide React for icons
- Unsplash for product images
- ALX Program for the opportunity

## 📞 Support

For support, email support@catalogalx.com or open an issue on GitHub.

---

**Happy Shopping! 🛍️**

Built with ❤️ using React, Redux, and TypeScript.
