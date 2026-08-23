import { canCheckoutCart, calculateReorder, CartItem } from "./retailer-logic";

describe("Retailer Logic - Prescription Gating", () => {
  const safeItem: CartItem = { id: "1", name: "Paracetamol", price: 10, qty: 1, requiresPrescription: false };
  const restrictedItem: CartItem = { id: "2", name: "Amoxicillin", price: 50, qty: 1, requiresPrescription: true };

  it("should allow checkout if cart has no restricted items and no doctor name is provided", () => {
    const cart = [safeItem];
    expect(canCheckoutCart(cart, "")).toBe(true);
  });

  it("should block checkout if cart has restricted items but no doctor name is provided", () => {
    const cart = [safeItem, restrictedItem];
    expect(canCheckoutCart(cart, "")).toBe(false);
  });

  it("should block checkout if cart has restricted items and doctor name is too short", () => {
    const cart = [restrictedItem];
    expect(canCheckoutCart(cart, "Dr.")).toBe(false);
  });

  it("should allow checkout if cart has restricted items and a valid doctor name is provided", () => {
    const cart = [safeItem, restrictedItem];
    expect(canCheckoutCart(cart, "Dr. Sanjay Sharma")).toBe(true);
  });
});

describe("Retailer Logic - Reorder Formula", () => {
  // Formula: threshold = (avgDailySales * 2)
  // Needs reorder if currentStock < threshold

  it("should not flag for reorder if current stock is well above threshold", () => {
    // Threshold = 20 * 2 = 40. Current = 150.
    const result = calculateReorder(150, 20);
    expect(result.needsReorder).toBe(false);
    expect(result.suggestQty).toBe(0);
  });

  it("should flag for reorder if current stock is exactly at the threshold - 1", () => {
    // Threshold = 15 * 2 = 30. Current = 29.
    const result = calculateReorder(29, 15);
    expect(result.needsReorder).toBe(true);
    // suggestQty = (30 - 29) + (15 * 7) = 1 + 105 = 106
    expect(result.suggestQty).toBe(106);
  });

  it("should properly calculate suggested reorder quantity for extremely low stock", () => {
    // Threshold = 10 * 2 = 20. Current = 2.
    const result = calculateReorder(2, 10);
    expect(result.needsReorder).toBe(true);
    // suggestQty = (20 - 2) + (10 * 7) = 18 + 70 = 88
    expect(result.suggestQty).toBe(88);
  });

  it("should handle zero current stock", () => {
    // Threshold = 5 * 2 = 10. Current = 0.
    const result = calculateReorder(0, 5);
    expect(result.needsReorder).toBe(true);
    // suggestQty = (10 - 0) + (5 * 7) = 10 + 35 = 45
    expect(result.suggestQty).toBe(45);
  });
});
