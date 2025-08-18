'use client';

import { useCart } from '../context/CartContext';
import { useAuth } from '../../src/context/AuthContext';

export default function CartDebug() {
  const { cart, loading } = useCart();
  const { user } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="font-bold mb-2">Cart Debug</h3>
      <div className="text-xs space-y-1">
        <div>User: {user ? user.email : 'Not logged in'}</div>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Items: {cart.length}</div>
        <div>Total: ${cart.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0)}</div>
        <div className="mt-2">
          <strong>Items:</strong>
          {cart.map(item => (
            <div key={item.id} className="ml-2">
              • {item.name} (qty: {item.quantity})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
