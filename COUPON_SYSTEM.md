# Coupon System Implementation

This document describes the coupon system implemented for the e-commerce application.

## Features

### 1. Coupon Types
- **Percentage Discount**: Reduces total by a percentage (e.g., 10% off)
- **Fixed Amount Discount**: Reduces total by a fixed amount (e.g., $15 off)

### 2. Coupon Validation
- Validates coupon codes against the database
- Checks if coupon is active and within valid date range
- Verifies minimum order amount requirements
- Enforces usage limits
- Applies maximum discount caps for percentage coupons

### 3. User Experience
- Real-time coupon application with immediate feedback
- Visual display of applied coupons with discount details
- Ability to remove applied coupons
- Persistent coupon state across page refreshes (24-hour validity)
- Toast notifications for success/error states

### 4. Admin Management
- Create, edit, and delete coupons
- View all active coupons with usage statistics
- Set coupon parameters (type, value, limits, dates)
- Enable/disable coupons

## Sample Coupons

The system comes with pre-configured sample coupons for testing:

| Code | Type | Value | Min Amount | Max Discount | Description |
|------|------|-------|------------|--------------|-------------|
| WELCOME10 | Percentage | 10% | $50 | $25 | 10% off on orders above $50 |
| SAVE20 | Percentage | 20% | $100 | $50 | 20% off on orders above $100 |
| FLAT15 | Fixed | $15 | $30 | - | $15 off on orders above $30 |
| FREESHIP | Fixed | $10 | $25 | - | $10 off shipping on orders above $25 |

## Implementation Details

### Database Structure
Coupons are stored in Firestore with the following structure:
```typescript
interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Key Components

1. **CouponService** (`src/services/coupons.ts`)
   - Database operations for coupons
   - Validation logic
   - Sample coupon initialization

2. **CouponContext** (`app/context/CouponContext.tsx`)
   - Manages coupon state across the application
   - Handles coupon application and removal
   - Provides discount calculations

3. **Cart & Checkout Pages**
   - Updated to use coupon functionality
   - Display applied coupons and discount amounts
   - Include coupon information in orders

4. **Admin Coupon Management** (`app/admin/coupons/page.tsx`)
   - Full CRUD operations for coupons
   - User-friendly interface for managing coupons

## Usage Instructions

### For Users
1. Add items to cart
2. Go to cart or checkout page
3. Enter a valid coupon code in the coupon input field
4. Click "Apply Coupon"
5. View the applied discount in the order summary
6. Remove coupon if needed using the "Remove" button

### For Admins
1. Navigate to Admin Panel → Coupons
2. Click "Create New Coupon" to add new coupons
3. Fill in the required fields:
   - Code: Unique coupon code (auto-uppercase)
   - Type: Percentage or Fixed amount
   - Value: Discount percentage or amount
   - Minimum Amount: Required order value
   - Max Discount: Maximum discount for percentage coupons
   - Usage Limit: Maximum number of uses
   - Valid Dates: Start and end dates
   - Description: Optional description
4. Set Active status
5. Save the coupon

### Initialization
To initialize sample coupons in your database:
1. Visit the homepage
2. Click "Initialize Sample Coupons" button
3. Wait for confirmation message
4. Sample coupons will be available for testing

## Technical Notes

- Coupons are validated in real-time against the database
- Applied coupons are stored in localStorage for persistence
- Coupon state is cleared after successful order placement
- All monetary values are handled as numbers with proper decimal formatting
- The system prevents negative totals by ensuring discount doesn't exceed subtotal

## Future Enhancements

Potential improvements for the coupon system:
- User-specific coupon limits
- Category-specific coupons
- First-time user coupons
- Referral coupon system
- Bulk coupon generation
- Coupon analytics and reporting
- Email coupon campaigns
