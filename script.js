document.addEventListener('DOMContentLoaded', () => {
    // Expanded Product Data
    const products = [
        { id: 1, title: "Atlas of Stars", author: "Galileo (Echo)", price: 45.00, category: "sci-fi", era: "2150 AD", weight: "2.4 lbs", desc: "A holographic guide to the colonized systems." },
        { id: 2, title: "Grimoire of Shadows", author: "Merlin Ambrosis", price: 120.00, category: "fantasy", era: "500 AD", weight: "5.1 lbs", desc: "Bound in dragon leather, whispers when closed." },
        { id: 3, title: "The Lost Scroll", author: "Unknown Scribe", price: 85.50, category: "ancient", era: "1200 BC", weight: "0.5 lbs", desc: "Fragment of the Library of Alexandria." },
        { id: 4, title: "Clockwork Heart", author: "Artificer X", price: 50.00, category: "sci-fi", era: "1890 Alt", weight: "1.2 lbs", desc: "Blueprints for a steam-powered soul." },
        { id: 5, title: "Dragon's Blood Ink", author: "Alchemist Guild", price: 25.00, category: "fantasy", era: "1400 AD", weight: "0.8 lbs", desc: "Never fades, glows near gold." },
        { id: 6, title: "Sunken City Map", author: "Captain Nemo", price: 200.00, category: "ancient", era: "1870 AD", weight: "1.5 lbs", desc: "Chart to the ruins of Atlantis." },
        { id: 7, title: "Quantum Spells", author: "Dr. Strange-ish", price: 60.00, category: "sci-fi", era: "3000 AD", weight: "0.0 lbs", desc: "Spells encoded in light particles." },
        { id: 8, title: "Fairy Dust Vial", author: "Tinker Bell", price: 15.00, category: "fantasy", era: "Neverland", weight: "0.1 lbs", desc: "Do not inhale. Side effects: flight." },
        { id: 9, title: "Aztec Sun Stone", author: "Montezu-map", price: 300.00, category: "ancient", era: "1400 AD", weight: "20 lbs", desc: "A heavy replica of the calendar stone." },
        { id: 10, title: "Neon Bible", author: "Arcade Fire", price: 20.00, category: "sci-fi", era: "2007 AD", weight: "1.0 lbs", desc: "A sonic journey through the suburbs." },
        { id: 11, title: "Phoenix Feather", author: "Fawkes", price: 500.00, category: "fantasy", era: "1990 AD", weight: "0.01 lbs", desc: "Core material for wands." },
        { id: 12, title: "Rosetta Tablet", author: "Napoleon's Team", price: 150.00, category: "ancient", era: "196 BC", weight: "12 lbs", desc: "Key to deciphering hieroglyphs." }
    ];

    // Offers Data
    const offers = [
        { id: 101, title: "Beginner's Spellbook", desc: "Slightly singed, perfect for apprentices.", price: 15.00, oldPrice: 30.00, badge: "-50%" },
        { id: 102, title: "Rusty Compass", desc: "Points to what you desire most.", price: 40.00, oldPrice: 60.00, badge: "Deal" }
    ];

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
    updateCartUI(); // Load initial state

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
                <div class="product-image">
                    <div style="text-align:center; padding: 10px; color: #d4c5a9; font-family: 'Cinzel Decorative', cursive;">
                        <i class="fas fa-book" style="font-size: 3rem; margin-bottom: 10px; opacity: 0.7;"></i><br>
                        ${product.title}
                    </div>
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
