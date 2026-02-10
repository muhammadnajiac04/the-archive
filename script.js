document.addEventListener('DOMContentLoaded', () => {
    // 1. Procedural Image Generator
    function generateProductArt(type, title) {
        // Generate a unique color based on the title length to keep it consistent
        const colors = ["#8b0000", "#2c1e12", "#555555", "#b8860b", "#4a3b2a", "#1a1a1a"];
        const accent = colors[title.length % colors.length];

        // Base SVG structure
        let content = '';

        const t = title.toLowerCase();

        if (t.includes("scroll") || t.includes("map") || t.includes("blueprint") || type === "ancient") {
            // Scroll / Map
            content = `
                <rect x="40" y="40" width="120" height="120" fill="#fdfbf7" stroke="${accent}" stroke-width="3"/>
                <path d="M50,50 L150,50 M50,150 L150,150" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
                <path d="M60,70 Q100,60 140,70 M60,90 Q100,80 140,90 M60,110 Q100,100 140,110 M60,130 Q100,120 140,130" stroke="${accent}" stroke-width="1" fill="none"/>
                <circle cx="100" cy="100" r="15" stroke="${accent}" stroke-width="2" fill="none" opacity="0.3"/>
            `;
        } else if (t.includes("bottle") || t.includes("ink") || t.includes("vial") || t.includes("dust") || t.includes("feather")) {
            // Potion / Item
            content = `
                <path d="M80,60 L120,60 L120,90 L150,140 L150,160 Q150,180 100,180 Q50,180 50,160 L50,140 L80,90 Z" fill="rgba(139, 0, 0, 0.1)" stroke="${accent}" stroke-width="3"/>
                <rect x="75" y="50" width="50" height="15" fill="${accent}"/>
                <circle cx="100" cy="130" r="15" fill="${accent}" opacity="0.6"/>
            `;
        } else if (t.includes("clockwork") || t.includes("stone") || t.includes("tablet") || t.includes("heart")) {
            // Artifact / Gear
            content = `
                <circle cx="100" cy="100" r="50" stroke="${accent}" stroke-width="8" fill="none" stroke-dasharray="15,10"/>
                <circle cx="100" cy="100" r="20" fill="${accent}"/>
                <line x1="100" y1="30" x2="100" y2="170" stroke="${accent}" stroke-width="4"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="${accent}" stroke-width="4"/>
            `;
        } else {
            // Book / Tome (Default)
            content = `
                <rect x="60" y="30" width="80" height="140" fill="${accent}" stroke="#2c1e12" stroke-width="3" rx="4"/>
                <rect x="50" y="30" width="15" height="140" fill="#2c1e12"/>
                <circle cx="100" cy="80" r="20" stroke="#fdfbf7" stroke-width="2" fill="none"/>
                <line x1="100" y1="120" x2="100" y2="150" stroke="#fdfbf7" stroke-width="2"/>
                <line x1="85" y1="135" x2="115" y2="135" stroke="#fdfbf7" stroke-width="2"/>
            `;
        }

        const svgParam = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${content}</svg>`);
        return `data:image/svg+xml;charset=utf-8,${svgParam}`;
    }

    // 2. Expanded Product Data
    const products = [
        { id: 1, title: "Atlas of Stars", author: "Galileo (Echo)", price: 45.00, category: "sci-fi", era: "2150 AD", weight: "2.4 lbs", desc: "A holographic guide to the colonized systems.", image: "https://images.unsplash.com/photo-1536697246787-1d5da56cb9c9?auto=format&fit=crop&w=600" }, // Celestial Map
        { id: 2, title: "Grimoire of Shadows", author: "Merlin Ambrosis", price: 120.00, category: "fantasy", era: "500 AD", weight: "5.1 lbs", desc: "Bound in dragon leather, whispers when closed.", image: "https://images.unsplash.com/photo-1544414008-59b43343335e?auto=format&fit=crop&w=600" }, // Dark Book
        { id: 3, title: "The Lost Scroll", author: "Unknown Scribe", price: 85.50, category: "ancient", era: "1200 BC", weight: "0.5 lbs", desc: "Fragment of the Library of Alexandria.", image: "https://images.unsplash.com/photo-1599894019799-27083049583c?auto=format&fit=crop&w=600" }, // Papyrus
        { id: 4, title: "Clockwork Heart", author: "Artificer X", price: 50.00, category: "sci-fi", era: "1890 Alt", weight: "1.2 lbs", desc: "Blueprints for a steam-powered soul.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600" }, // Gears
        { id: 5, title: "Dragon's Blood Ink", author: "Alchemist Guild", price: 25.00, category: "fantasy", era: "1400 AD", weight: "0.8 lbs", desc: "Never fades, glows near gold.", image: "https://images.unsplash.com/photo-1515549832467-b39d3447cd1e?auto=format&fit=crop&w=600" }, // Red Ink/Liquid
        { id: 6, title: "Sunken City Map", author: "Captain Nemo", price: 200.00, category: "ancient", era: "1870 AD", weight: "1.5 lbs", desc: "Chart to the ruins of Atlantis.", image: "https://images.unsplash.com/photo-1524666643752-b381eb00effb?auto=format&fit=crop&w=600" }, // Old Map
        { id: 7, title: "Quantum Spells", author: "Dr. Strange-ish", price: 60.00, category: "sci-fi", era: "3000 AD", weight: "0.0 lbs", desc: "Spells encoded in light particles." },
        { id: 8, title: "Fairy Dust Vial", author: "Tinker Bell", price: 15.00, category: "fantasy", era: "Neverland", weight: "0.1 lbs", desc: "Do not inhale. Side effects: flight.", image: "https://images.unsplash.com/photo-1598157778946-b63bf015b638?auto=format&fit=crop&w=600" }, // Glitter/Vial
        { id: 9, title: "Aztec Sun Stone", author: "Montezu-map", price: 300.00, category: "ancient", era: "1400 AD", weight: "20 lbs", desc: "A heavy replica of the calendar stone.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600" }, // Stone texture
        { id: 10, title: "Neon Bible", author: "Arcade Fire", price: 20.00, category: "sci-fi", era: "2007 AD", weight: "1.0 lbs", desc: "A sonic journey through the suburbs." },
        { id: 11, title: "Phoenix Feather", author: "Fawkes", price: 500.00, category: "fantasy", era: "1990 AD", weight: "0.01 lbs", desc: "Core material for wands.", image: "https://images.unsplash.com/photo-1497215842964-222b430dc0a8?auto=format&fit=crop&w=600" }, // Feather
        { id: 12, title: "Rosetta Tablet", author: "Napoleon's Team", price: 150.00, category: "ancient", era: "196 BC", weight: "12 lbs", desc: "Key to deciphering hieroglyphs.", image: "https://images.unsplash.com/photo-1599894019799-27083049583c?auto=format&fit=crop&w=600" } // Same Papyrus for now
    ];

    // Assign Images dynamically (only if not already provided)
    products.forEach(p => {
        if (!p.image) {
            p.image = generateProductArt(p.category, p.title);
        }
    });

        //EXAMPLE: How to add a product manually with a custom image
    products.push({
        id: 1,
        title: "Atlas of Stars",
        author: "User",
        price: 400.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/5.jpg" // <--- Add your image link here
    });
    products.push({
        id: 2,
        title: "Grimoire of Shadows",
        author: "User",
        price: 500.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/3.png" // <--- Add your image link here
    });
    products.push({
        id: 3,
        title: "The Lost Scroll",
        author: "User",
        price: 799.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/2.png" // <--- Add your image link here
    });
    products.push({
        id: 1,
        title: "Clockwork Heart",
        author: "User",
        price: 800.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/1.png" // <--- Add your image link here
    });
    products.push({
        id: 2,
        title: "Dragon's Blood Ink",
        author: "User",
        price: 100.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/3.png" // <--- Add your image link here
    });
    products.push({
        id: 3,
        title: "Sunken City Map",
        author: "User",
        price: 189.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/4.jpg" // <--- Add your image link here
    });
    products.push({
        id: 1,
        title: "Quantum Spells",
        author: "User",
        price: 294.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/1.png" // <--- Add your image link here
    });
    products.push({
        id: 2,
        title: "Fairy Dust Vial",
        author: "User",
        price: 789.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/3.png" // <--- Add your image link here
    });
    products.push({
        id: 3,
        title: "Aztec Sun Stone",
        author: "User",
        price: 125.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/2.png" // <--- Add your image link here
    });
    products.push({
        id: 1,
        title: "Neon Bible",
        author: "User",
        price: 369.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/1.png" // <--- Add your image link here
    });
        products.push({
        id: 3,
        title: "Phoenix Feather",
        author: "User",
        price: 799.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/6.jpg" // <--- Add your image link here
    });
    products.push({
        id: 1,
        title: "Rosetta Tablet",
        author: "User",
        price: 800.00,
        category: "fantasy",
        era: "2024",
        weight: "1.0",
        desc: "Description",
        image: "image/5.jpg" // <--- Add your image link here
    });


    // 3. Offers Data
    const offers = [
        { id: 101, title: "Beginner's Spellbook", desc: "Slightly singed, perfect for apprentices.", price: 15.00, oldPrice: 30.00, badge: "-50%", category: "fantasy" },
        { id: 102, title: "Rusty Compass", desc: "Points to what you desire most.", price: 40.00, oldPrice: 60.00, badge: "Deal", category: "ancient" }
    ];

    offers.forEach(o => {
        o.image = generateProductArt(o.category, o.title);
    });

    // Load Cart from LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const offersGrid = document.getElementById('offers-grid');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const runeSearch = document.getElementById('rune-search');
    const customCursor = document.getElementById('custom-cursor');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Modal Elements
    const modal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalAuthor = document.getElementById('modal-author');
    const modalDesc = document.getElementById('modal-desc');
    const modalEra = document.getElementById('modal-era');
    const modalWeight = document.getElementById('modal-weight');
    const modalPrice = document.getElementById('modal-price');
    const modalAddBtn = document.getElementById('modal-add-btn');

    // Checkout Modal Elements
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');
    const orderReceipt = document.getElementById('order-receipt');

    // Initialize
    renderProducts('all');
    renderOffers();
    updateCartUI();

    // Cursor Logic
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;

            document.querySelectorAll('.parallax').forEach(el => {
                const speed = el.getAttribute('data-speed');
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                el.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        }
    });

    // Search Logic
    runeSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.author.toLowerCase().includes(term)
        );
        renderProductsInternal(filtered);
    });

    // Render Offers
    function renderOffers() {
        if (!offersGrid) return;
        offersGrid.innerHTML = '';
        offers.forEach(offer => {
            const card = document.createElement('div');
            card.className = 'offer-card';
            card.innerHTML = `
                <div class="offer-badge">${offer.badge}</div>
                <img src="${offer.image}" alt="${offer.title}" style="width:100%; height:150px; object-fit:contain; margin-bottom:15px; border-bottom:1px solid #ddd;">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-desc">"${offer.desc}"</p>
                <div class="card-footer" style="border:none; margin-top:0;">
                    <div>
                        <span class="old-price">${offer.oldPrice.toFixed(2)}</span>
                        <span class="offer-price">${offer.price.toFixed(2)}</span>
                    </div>
                    <button class="add-btn" onclick="addOfferToCart(${offer.id})">Claim</button>
                </div>
            `;
            offersGrid.appendChild(card);
        });
    }

    // Render Products Wrapper
    function renderProducts(category) {
        let filtered;
        if (category === 'all') {
            filtered = products;
        } else {
            filtered = products.filter(p => p.category === category);
        }
        renderProductsInternal(filtered);
    }

    // Internal Render
    function renderProductsInternal(list) {
        productGrid.innerHTML = '';
        if (list.length === 0) {
            productGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No tomes found matching your runes.</p>';
            return;
        }

        list.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = (e) => {
                // Open modal unless clicking the button
                if (!e.target.classList.contains('add-btn')) {
                    openModal(product.id);
                }
            };
            card.innerHTML = `
                <div class="product-image" style="display:block; padding:0; background:none; border:none; height:350px;">
                    <img src="${product.image}" alt="${product.title}" style="width:100%; height:100%; object-fit:contain; padding:20px;">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p style="font-style: italic; color: #555;">${product.author}</p>
                </div>
                <div class="card-footer">
                    <span class="price">${product.price.toFixed(2)} Gold</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">Acquire</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Modal Logic
    window.openModal = function (id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        modalTitle.textContent = product.title;
        modalAuthor.textContent = product.author;
        modalDesc.textContent = product.desc;
        modalEra.textContent = product.era;
        modalWeight.textContent = product.weight;
        modalPrice.textContent = `${product.price.toFixed(2)} Gold`;

        // Update Modal Image
        const modalImgContainer = document.querySelector('.modal-img');
        modalImgContainer.innerHTML = `<img src="${product.image}" style="width:100%; height:100%; object-fit:contain;">`;
        modalImgContainer.style.background = 'none'; // Remove placeholder bg

        modalAddBtn.onclick = () => {
            addToCart(product.id);
            closeModal();
        };

        modal.style.display = 'block';
    }

    window.closeModal = function () {
        modal.style.display = 'none';
    }

    // Checkout Logic
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your satchel is empty! Add some artifacts first.");
            return;
        }
        toggleCart(); // Close sidebar
        let total = cart.reduce((acc, item) => acc + item.price, 0);
        checkoutTotal.textContent = total.toFixed(2);

        // Reset View
        checkoutForm.style.display = 'block';
        orderReceipt.style.display = 'none';

        checkoutModal.style.display = 'block';
    });

    window.closeCheckout = function () {
        checkoutModal.style.display = 'none';
    }

    window.processOrder = function () {
        // Simulate processing
        const btn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = "Sealing with Wax...";
        btn.disabled = true;

        setTimeout(() => {
            // Generate Receipt
            const name = document.getElementById('cust-name').value;
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            const orderId = '#' + Math.floor(Math.random() * 9000 + 1000);

            document.getElementById('order-id').textContent = orderId;
            document.getElementById('receipt-name').textContent = name;
            document.getElementById('receipt-total').textContent = total.toFixed(2);

            const itemsContainer = document.getElementById('receipt-items');
            itemsContainer.innerHTML = '';
            cart.forEach(item => {
                const p = document.createElement('p');
                p.textContent = `1x ${item.title} - ${item.price.toFixed(2)}`;
                itemsContainer.appendChild(p);
            });

            // Clear Cart
            cart = [];
            saveCart();
            updateCartUI();

            // Show Receipt
            checkoutForm.style.display = 'none';
            orderReceipt.style.display = 'block';

            // Reset Button
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    }

    // General Modal Close
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
        if (event.target == checkoutModal) {
            closeCheckout();
        }
    }

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            runeSearch.value = '';
            renderProducts(btn.dataset.filter);
        });
    });

    // Cart Logic
    window.toggleCart = function () {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }

    window.addToCart = function (id) {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            saveCart();
            updateCartUI();
            if (!cartSidebar.classList.contains('open')) toggleCart();
        }
    }

    window.addOfferToCart = function (id) {
        const offer = offers.find(o => o.id === id);
        if (offer) {
            cart.push(offer);
            saveCart();
            updateCartUI();
            if (!cartSidebar.classList.contains('open')) toggleCart();
        }
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        cartCountEl.textContent = cart.length;
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your satchel is empty.</p>';
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                     <div style="width: 40px; height: 50px; background: #2c1e12; display: flex; align-items: center; justify-content: center; color: #fff;"><i class="fas fa-book"></i></div>
                     <div style="flex-grow:1;">
                        <h4 style="font-family: var(--font-header); font-size: 1rem;">${item.title}</h4>
                        <p>${item.price.toFixed(2)} Gold</p>
                     </div>
                     <button onclick="removeFromCart(${index})" style="background:none; border:none; color: #8b0000; cursor:pointer;"><i class="fas fa-times"></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
            cartTotalEl.textContent = total.toFixed(2);
        }
    }

    // Mobile Menu Toggle
    window.toggleMenu = function () {
        document.querySelector('.nav-links').classList.toggle('active');
    }

    // Ink Blot Effect
    document.addEventListener('click', (e) => {
        // Don't blot if clicking interactions
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.closest('.modal-content') || e.target.closest('.nav-links') || e.target.closest('#cart-sidebar')) return;

        const blot = document.createElement('div');
        blot.className = 'ink-blot';
        blot.style.left = `${e.pageX}px`;
        blot.style.top = `${e.pageY}px`;
        document.body.appendChild(blot);

        setTimeout(() => {
            blot.remove();
        }, 600);
    });
});
