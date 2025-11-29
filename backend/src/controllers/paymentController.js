import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15" });

// Create a Checkout session
export async function createCheckoutSession(req, res) {
  try {
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Payment error" });
  }
}

// webhook skeleton
export async function stripeWebhook(req, res) {
  // implement verifying signature and processing events
  res.json({ ok: true });
}
