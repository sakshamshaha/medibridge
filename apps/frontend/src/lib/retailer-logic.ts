/**
 * Core business logic for Retailer Portal
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  requiresPrescription: boolean;
  qty: number;
}

/**
 * Checks if the cart can be checked out based on prescription requirements.
 * @param cart - Array of items in the cart
 * @param doctorName - The name of the prescribing doctor entered by the retailer
 * @returns boolean indicating if checkout is allowed
 */
export function canCheckoutCart(cart: CartItem[], doctorName: string): boolean {
  const hasRestrictedItems = cart.some((item) => item.requiresPrescription);
  if (hasRestrictedItems) {
    return doctorName.trim().length > 3;
  }
  return true;
}

/**
 * Calculates the stock status and suggested reorder quantity.
 * Formula: threshold = (avgDailySales * 2).
 * Needs reorder if currentStock < threshold.
 * Suggested qty = (threshold - currentStock) + (avgDailySales * 7) for a week's supply.
 * 
 * @param currentStock - The current stock on hand
 * @param avgDailySales - The average daily sales velocity
 * @returns Object with needsReorder boolean and suggestQty number
 */
export function calculateReorder(currentStock: number, avgDailySales: number): { needsReorder: boolean; suggestQty: number } {
  const threshold = avgDailySales * 2;
  
  if (currentStock < threshold) {
    const qty = Math.max(0, (threshold - currentStock) + (avgDailySales * 7));
    return { needsReorder: true, suggestQty: qty };
  }
  
  return { needsReorder: false, suggestQty: 0 };
}
