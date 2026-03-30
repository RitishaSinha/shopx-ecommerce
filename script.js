const { useState, useMemo, useEffect } = React;

const allProducts = [
  { id: 1,  name: "Wireless Headphones",  category: "electronics", price: 79,  rating: 4.5, image: "images/headphones.jpg",    description: "Noise-isolating over-ear headphones with 24-hour battery and fast charging." },
  { id: 2,  name: "Smart Watch",          category: "electronics", price: 149, rating: 4.8, image: "images/watch.jpg",          description: "Track steps, heart rate, sleep and notifications with a bright AMOLED display." },
  { id: 3,  name: "Bluetooth Speaker",    category: "electronics", price: 59,  rating: 4.3, image: "images/speaker.jpg",        description: "Portable wireless speaker with deep bass and 12-hour playtime." },
  { id: 4,  name: "Laptop Stand",         category: "electronics", price: 39,  rating: 4.6, image: "images/stand.jpg",          description: "Ergonomic aluminum stand to raise your laptop and improve airflow." },
  { id: 5,  name: "USB-C Hub",            category: "electronics", price: 29,  rating: 4.4, image: "images/hub.jpg",            description: "Multi-port USB-C hub with HDMI, USB 3.0 and card reader." },
  { id: 6,  name: "Mechanical Keyboard",  category: "electronics", price: 99,  rating: 4.7, image: "images/keyboard.jpg",       description: "Tactile mechanical keyboard with RGB backlight and hot-swappable switches." },
  { id: 7,  name: "Running Sneakers",     category: "fashion",     price: 89,  rating: 4.5, image: "images/sneakers.jpg",       description: "Lightweight running shoes with breathable mesh upper and cushioned sole." },
  { id: 8,  name: "Casual Hoodie",        category: "fashion",     price: 49,  rating: 4.3, image: "images/hoodie.jpg",         description: "Soft fleece hoodie perfect for everyday wear and chilly evenings." },
  { id: 9,  name: "Sunglasses",           category: "fashion",     price: 35,  rating: 4.2, image: "images/sunglasses.jpg",     description: "UV-protected polarized sunglasses with a classic frame." },
  { id: 10, name: "Leather Wallet",       category: "fashion",     price: 45,  rating: 4.6, image: "images/wallet.jpg",         description: "Genuine leather wallet with multiple card slots and coin pocket." },
  { id: 11, name: "Baseball Cap",         category: "fashion",     price: 25,  rating: 4.1, image: "images/cap.jpg",            description: "Adjustable cotton cap with curved brim for sunny days." },
  { id: 12, name: "Wrist Watch (Classic)",category: "fashion",     price: 199, rating: 4.9, image: "images/classic-watch.jpg",  description: "Minimal analog wristwatch with stainless steel strap and date display." },
  { id: 13, name: "Desk Lamp",            category: "home",        price: 34,  rating: 4.4, image: "images/lamp.jpg",           description: "LED desk lamp with adjustable arm and 3 color temperatures." },
  { id: 14, name: "Coffee Maker",         category: "home",        price: 89,  rating: 4.6, image: "images/coffeemaker.jpg",    description: "Automatic drip coffee maker with programmable timer." },
  { id: 15, name: "Scented Candles",      category: "home",        price: 18,  rating: 4.5, image: "images/candles.jpg",        description: "Set of 3 aromatherapy candles with relaxing fragrances." },
  { id: 16, name: "Wall Clock",           category: "home",        price: 29,  rating: 4.2, image: "images/clock.jpg",          description: "Silent wall clock with modern minimal design." },
  { id: 17, name: "Plant Pot Set",        category: "home",        price: 22,  rating: 4.3, image: "images/plantpot.jpg",       description: "Ceramic plant pot set suitable for indoor succulents and herbs." },
  { id: 18, name: "Throw Blanket",        category: "home",        price: 44,  rating: 4.7, image: "images/blanket.jpg",        description: "Soft woven throw blanket to cozy up your sofa or bed." },
  { id: 19, name: "Yoga Mat",             category: "sports",      price: 35,  rating: 4.5, image: "images/yogamat.jpg",        description: "Non-slip yoga mat with comfortable cushioning." },
  { id: 20, name: "Dumbbell Set",         category: "sports",      price: 65,  rating: 4.6, image: "images/dumbbells.jpg",      description: "Adjustable dumbbell set for full-body workouts at home." },
  { id: 21, name: "Water Bottle",         category: "sports",      price: 22,  rating: 4.4, image: "images/bottle.jpg",         description: "Insulated stainless-steel water bottle that keeps drinks cold for 12 hours." },
  { id: 22, name: "Resistance Bands",     category: "sports",      price: 19,  rating: 4.3, image: "images/bands.jpg",          description: "Set of 5 resistance bands with different strength levels." },
  { id: 23, name: "Jump Rope",            category: "sports",      price: 14,  rating: 4.2, image: "images/jumprope.jpg",       description: "Adjustable speed jump rope for cardio workouts." },
  { id: 24, name: "Sports Bag",           category: "sports",      price: 55,  rating: 4.5, image: "images/bag.jpg",            description: "Spacious sports duffel with separate shoe compartment." },
];

const DISCOUNT_CODES = { SAVE10: 10, SHOPX20: 20, WELCOME15: 15, FLAT50: 50 };

function StarDisplay({ rating, size = "1rem" }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: size }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

function ReviewSection({ productId, reviews, onAddReview, onDeleteReview }) {
  const [userName, setUserName]   = useState("");
  const [comment, setComment]     = useState("");
  const [rating, setRating]       = useState(5);
  const [hovered, setHovered]     = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const productReviews = reviews.filter(r => r.productId === productId);

  const avgRating = productReviews.length
    ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;
    onAddReview({
      id: Date.now(),
      productId,
      userName: userName.trim(),
      comment: comment.trim(),
      rating,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    });
    setUserName("");
    setComment("");
    setRating(5);
    setHovered(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="reviews-container">
      <div className="review-summary">
        <h3>Customer Reviews <span className="review-count-badge">{productReviews.length}</span></h3>
        {avgRating && (
          <div className="review-avg">
            <span className="avg-number">{avgRating}</span>
            <StarDisplay rating={parseFloat(avgRating)} size="1rem" />
            <span className="avg-label">avg. from {productReviews.length} review{productReviews.length !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      <div className="review-form">
        <h4>✍️ Leave a Review</h4>
        <form onSubmit={handleSubmit}>
          <div className="rating-selector">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                className={`star ${num <= (hovered || rating) ? "selected" : ""}`}
                onClick={() => setRating(num)}
                onMouseEnter={() => setHovered(num)}
                onMouseLeave={() => setHovered(0)}
              >★</span>
            ))}
            <span className="rating-label">
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][(hovered || rating)]}
            </span>
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            maxLength={40}
            required
          />
          <textarea
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={300}
            required
          />
          <div className="char-count">{comment.length}/300</div>
          <button type="submit" className="add-to-cart post-review-btn">
            {submitted ? "✅ Review Posted!" : "Post Review"}
          </button>
        </form>
      </div>

      <div className="reviews-list">
        {productReviews.length === 0 ? (
          <div className="no-reviews">
            <span>💬</span>
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          productReviews.map((rev) => (
            <div key={rev.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-avatar">{rev.userName.charAt(0).toUpperCase()}</span>
                  <strong className="reviewer-name">{rev.userName}</strong>
                </div>
                <div className="review-meta">
                  <span className="review-date">{rev.date}</span>
                  <button
                    className="delete-review-btn"
                    onClick={() => onDeleteReview(rev.id)}
                    title="Delete review"
                  >✕</button>
                </div>
              </div>
              <div className="review-stars">
                <StarDisplay rating={rev.rating} size="0.9rem" />
                <span className="review-rating-text">{["","Poor","Fair","Good","Great","Excellent"][rev.rating]}</span>
              </div>
              <p className="review-comment">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart]                   = useState([]);
  const [category, setCategory]           = useState("all");
  const [maxPrice, setMaxPrice]           = useState(500);
  const [sort, setSort]                   = useState("default");
  const [search, setSearch]               = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [budget, setBudget]               = useState(1000);
  const [cartOpen, setCartOpen]           = useState(false);
  const [details, setDetails]             = useState(null);
  const [checkoutOpen, setCheckoutOpen]   = useState(false);
  const [successOpen, setSuccessOpen]     = useState(false);
  const [toast, setToast]                 = useState("");
  const [budgetMessage, setBudgetMessage] = useState("");
  const [budgetClass, setBudgetClass]     = useState("");
  const [orderId, setOrderId]             = useState("Order #000000");
  const [checkoutForm, setCheckoutForm]   = useState({
    name: "", email: "", address: "",
    state: "Tamil Nadu", pin: "", payment: "Credit / Debit Card",
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("shopx_reviews");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("shopx_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    showToast("✅ Review posted successfully!");
  };

  const deleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast("Review deleted.");
  };

  const getReviewCount = (productId) => reviews.filter(r => r.productId === productId).length;

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];
    if (category !== "all") list = list.filter(p => p.category === category);
    list = list.filter(p => p.price <= maxPrice);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, maxPrice, search, sort]);

  const cartCount   = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = discountApplied ? (subtotal * discountPercent) / 100 : 0;
  const shipping    = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 9.99;
  const total       = subtotal - discountAmt + shipping;

  useEffect(() => {
    if (budget <= 0 || total === 0) { setBudgetMessage(""); setBudgetClass(""); return; }
    const percent = Math.min((total / budget) * 100, 100);
    if (percent <= 80) {
      setBudgetMessage(`Great! ₹${(budget - total).toFixed(0)} remaining this month`);
      setBudgetClass("good");
    } else if (percent <= 100) {
      setBudgetMessage("Almost there! Remove 1 item to stay under budget");
      setBudgetClass("warning");
    } else {
      setBudgetMessage(`Over budget by ₹${(total - budget).toFixed(0)}`);
      setBudgetClass("over");
    }
  }, [budget, total]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }

  function removeFromCart(id) { setCart(prev => prev.filter(i => i.id !== id)); }

  function changeQty(id, delta) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }

  function applyDiscount() {
    const code = discountInput.trim().toUpperCase();
    if (DISCOUNT_CODES[code]) {
      setDiscountPercent(DISCOUNT_CODES[code]);
      setDiscountApplied(true);
      showToast(`${DISCOUNT_CODES[code]}% discount applied!`);
    } else {
      setDiscountPercent(0);
      setDiscountApplied(false);
      showToast("Invalid discount code");
    }
  }

  function placeOrder() {
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address || !checkoutForm.pin) {
      showToast("Please fill all fields!"); return;
    }
    if (!/^\d{6}$/.test(checkoutForm.pin)) { showToast("Enter a valid 6-digit PIN"); return; }
    const id = "SX" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(`Order #${id}`);
    setCheckoutOpen(false);
    setSuccessOpen(true);
    setCart([]);
    setDiscountApplied(false);
    setDiscountPercent(0);
    setDiscountInput("");
  }

  return (
    <div>
      <nav>
        <div className="logo">ShopX</div>
        <div className="nav-right">
          <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{filteredProducts.length} products</span>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      <div className="hero">
        <h1>Shop <span>Smarter.</span><br />Live Better.</h1>
        <p>Curated products for the modern lifestyle</p>
      </div>

      <div className="main">
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Category</h3>
            {["all", "electronics", "fashion", "home", "sports"].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="range" className="price-range"
              min="10" max="500" value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span id="price-display">Up to ₹{maxPrice}</span>
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            {[
              ["default", "Default"],
              ["price-asc", "Price: Low→High"],
              ["price-desc", "Price: High→Low"],
              ["rating", "Top Rated"],
            ].map(([val, label]) => (
              <button
                key={val}
                className={`filter-btn ${sort === val ? "active" : ""}`}
                onClick={() => setSort(val)}
              >{label}</button>
            ))}
          </div>
        </aside>

        <section>
          <div className="search-bar">
            <input
              type="text" placeholder="Search products..."
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="products-grid">
            {filteredProducts.length ? filteredProducts.map(p => {
              const reviewCount = getReviewCount(p.id);
              return (
                <div className="product-card" key={p.id}>
                  <div className="product-img">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="product-info">
                    <div className="product-category">{p.category}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-price">₹{p.price.toFixed(2)}</div>
                    <div className="product-rating">
                      <StarDisplay rating={p.rating} size="0.8rem" />
                      <span style={{ marginLeft: 4, fontSize: "0.75rem", color: "var(--muted)" }}>
                        {p.rating.toFixed(1)}
                      </span>
                      {reviewCount > 0 && (
                        <span className="card-review-badge">{reviewCount} review{reviewCount !== 1 ? "s" : ""}</span>
                      )}
                    </div>
                    <div className="product-actions">
                      <button className="secondary-btn" onClick={() => setDetails(p)}>View Details</button>
                      <button className="add-to-cart" onClick={() => addToCart(p.id)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="no-results">
                <span>🧐</span>
                <p>No products found. Try clearing filters or searching something else.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)}></div>

      <div className={`cart-panel ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart 🛒</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {!cart.length ? (
            <div className="empty-cart">
              <span className="emoji">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-emoji">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="discount-row">
            <input
              type="text" placeholder="Discount code"
              value={discountInput} onChange={(e) => setDiscountInput(e.target.value)}
            />
            <button className="apply-btn" onClick={applyDiscount}>Apply</button>
          </div>
          <div className="discount-msg">
            {discountApplied && <span className="success">{discountPercent}% discount applied!</span>}
          </div>

          <div className="totals">
            <div className="total-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="total-row"><span>Discount</span><span className="discount-val">-₹{discountAmt.toFixed(2)}</span></div>
            <div className="total-row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span></div>
            <div className="total-row final total-clean">
              <div className="total-left">
                <span className="total-label">Total</span>
                <span className="total-subtext">Including discounts &amp; shipping</span>
              </div>
              <div className="total-right">
                <span className="total-currency">₹</span>
                <span className="total-amount">{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="budget-coach">
            <div className="budget-top">
              <span className="budget-label">Monthly Budget</span>
              <div className="budget-input-wrap">
                <span className="currency">₹</span>
                <input
                  type="number" id="budget-input"
                  value={budget} min="0"
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="progress-bar">
              <div
                id="budget-progress"
                style={{
                  width: budget > 0 && total > 0 ? `${Math.min((total / budget) * 100, 100)}%` : "0%",
                  background: budget > 0 && total > budget
                    ? "var(--accent2)"
                    : budget > 0 && total / budget > 0.8
                    ? "var(--accent)"
                    : "var(--success)",
                }}
              ></div>
            </div>
            <span className={`budget-tip ${budgetClass}`}>{budgetMessage}</span>
          </div>

          <button className="checkout-btn" disabled={!cart.length} onClick={() => setCheckoutOpen(true)}>
            Proceed to Checkout →
          </button>
        </div>
      </div>

      {details && (
        <div className="modal-overlay open" onClick={() => setDetails(null)}>
          <div className="modal product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn detail-close" onClick={() => setDetails(null)}>✕</button>

            <div className="detail-scroll-area">
              <div className="detail-layout">
                <div className="detail-image-wrap">
                  <img src={details.image} alt={details.name} />
                </div>
                <div className="detail-info">
                  <h2>{details.name}</h2>
                  <p className="detail-category">{details.category}</p>
                  <p className="detail-rating">
                    <StarDisplay rating={details.rating} size="0.95rem" /> {details.rating.toFixed(1)}
                  </p>
                  <p className="detail-price">₹{details.price.toFixed(2)}</p>
                  <p className="detail-description">{details.description}</p>
                  <button className="add-to-cart" onClick={() => addToCart(details.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="reviews-divider"></div>
              <ReviewSection
                productId={details.id}
                reviews={reviews}
                onAddReview={addReview}
                onDeleteReview={deleteReview}
              />
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="modal-overlay open" onClick={() => setCheckoutOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Checkout <span>Details</span></h2>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={checkoutForm.name}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={checkoutForm.email}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <input type="text" value={checkoutForm.address}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <select value={checkoutForm.state}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}>
                  <option>Tamil Nadu</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                </select>
              </div>
              <div className="form-group">
                <label>PIN Code</label>
                <input type="text" maxLength="6" value={checkoutForm.pin}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, pin: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select value={checkoutForm.payment}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, payment: e.target.value })}>
                <option>Credit / Debit Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
                <option>Cash on Delivery</option>
              </select>
            </div>
            <div className="modal-btns">
              <button className="btn-cancel" onClick={() => setCheckoutOpen(false)}>Cancel</button>
              <button className="btn-place" onClick={placeOrder}>Place Order 🎉</button>
            </div>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="modal-overlay open" onClick={() => setSuccessOpen(false)}>
          <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
            <span className="big-check">✅</span>
            <h2>Order Placed!</h2>
            <p>Thanks for shopping with ShopX. Your order is on its way!</p>
            <div className="order-id">{orderId}</div>
            <button className="btn-place" onClick={() => setSuccessOpen(false)} style={{ width: "100%" }}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}

      <footer>
        &copy; 2025 ShopX — Built with React CDN, HTML &amp; CSS | Web Development Project
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
