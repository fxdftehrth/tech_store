window.onload = function () {
  const dateEl = document.createElement("div");
  dateEl.style.textAlign = "center";
  dateEl.innerText = new Date().toLocaleString();
  document.body.appendChild(dateEl);
};

// Обработка поиска
const searchInput = document.getElementById('search');
const searchButton = searchInput.nextElementSibling;

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Здесь можно добавить логику поиска
        console.log('Поиск:', searchTerm);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Обработка добавления в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h4').textContent;
        
        // Анимация добавления в корзину
        this.textContent = 'Добавлено!';
        this.classList.add('added');
        
        setTimeout(() => {
            this.textContent = 'В корзину';
            this.classList.remove('added');
        }, 2000);
        
        // Здесь можно добавить логику добавления в корзину
        console.log('Добавлено в корзину:', productName);
    });
});

// Анимация при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-card, .category-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Мобильное меню
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.parentElement.insertBefore(menuButton, nav);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Проверяем, мобильное ли устройство
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        if (mobileMenuButton) {
            mobileMenuButton.remove();
            document.querySelector('nav').classList.remove('active');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на странице каталога
    const isCatalogPage = document.querySelector('.catalog-container') !== null;
    
    // Инициализируем компоненты в зависимости от страницы
    if (isCatalogPage) {
        initFilters();
        initSorting();
        initViewOptions();
        initPagination();
    }
    
    // Эти функции работают на всех страницах
    initAddToCart();
    initSearch();
    initReviewForm();
});

// Функционал фильтров
function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    const applyFiltersBtn = document.querySelector('.apply-filters');

    // Обработка чекбоксов
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Можно добавить визуальную реакцию
        });
    });

    // Применение фильтров
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Категории
            const categorySection = document.querySelectorAll('.filter-section')[0];
            const selectedCategories = Array.from(categorySection.querySelectorAll('input:checked'))
                .map(cb => cb.parentElement.textContent.trim());
            // Бренды
            const brandSection = document.querySelectorAll('.filter-section')[1];
            const selectedBrands = Array.from(brandSection.querySelectorAll('input:checked'))
                .map(cb => cb.parentElement.textContent.trim());

            filterProducts(selectedCategories, selectedBrands);
        });
    }
}

// Функционал сортировки
function initSorting() {
    const sortSelect = document.querySelector('.sort-options select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            console.log('Сортировка изменена:', sortValue);
            sortProducts(sortValue);
        });
    }
}

// Функционал переключения вида отображения
function initViewOptions() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productGrid = document.querySelector('.product-grid');

    if (gridViewBtn && listViewBtn && productGrid) {
        gridViewBtn.addEventListener('click', function() {
            productGrid.classList.remove('list-view-active');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', function() {
            productGrid.classList.add('list-view-active');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }
}

// Функционал пагинации
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-numbers button');
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');

    if (pageButtons.length) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const page = this.textContent;
                console.log('Переход на страницу:', page);
            });
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            const currentPage = document.querySelector('.page-numbers button.active');
            if (currentPage && currentPage.previousElementSibling) {
                currentPage.previousElementSibling.click();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const currentPage = document.querySelector('.page-numbers button.active');
            if (currentPage && currentPage.nextElementSibling) {
                currentPage.nextElementSibling.click();
            }
        });
    }
}

// Функционал добавления в корзину
function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.product-price strong').textContent;
            
            // Анимация добавления в корзину
            this.textContent = 'Добавлено ✓';
            this.classList.add('added');
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.classList.remove('added');
            }, 2000);

            console.log('Товар добавлен в корзину:', {
                name: productName,
                price: productPrice
            });

            addToCart(productName, productPrice);
        });
    });
}

// Функционал поиска
function initSearch() {
    const searchInput = document.querySelector('#search');
    const searchButton = searchInput?.nextElementSibling;

    if (searchInput && searchButton) {
        const performSearch = () => {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                console.log('Поиск:', searchQuery);
                // Если мы на странице каталога, используем фильтрацию
                if (document.querySelector('.catalog-container')) {
                    searchProducts(searchQuery);
                } else {
                    // На главной странице просто логируем поиск
                    console.log('Поиск на главной странице:', searchQuery);
                }
            }
        };

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Вспомогательные функции
function filterProducts(categories, brands) {
    const products = document.querySelectorAll('.catalog-container .product-card');
    let visibleCount = 0;
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productBrand = product.getAttribute('data-brand');
        let showProduct = true;

        // Фильтрация по категориям
        if (categories.length > 0 && !categories.includes(productCategory)) {
            showProduct = false;
        }

        // Фильтрация по брендам
        if (brands.length > 0 && !brands.includes(productBrand)) {
            showProduct = false;
        }

        if (showProduct) {
            product.style.opacity = '1';
            product.style.visibility = 'visible';
            product.style.position = 'relative';
            visibleCount++;
        } else {
            product.style.opacity = '0';
            product.style.visibility = 'hidden';
            product.style.position = 'absolute';
        }
    });

    // Показываем сообщение, если нет результатов
    const noResultsMessage = document.querySelector('.no-results-message');
    if (visibleCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = '<p>Товары не найдены</p><button class="reset-filters">Сбросить фильтры</button>';
            document.querySelector('.product-grid').appendChild(message);

            // Добавляем обработчик для кнопки сброса
            message.querySelector('.reset-filters').addEventListener('click', function() {
                resetFilters();
            });
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

function resetFilters() {
    // Сбрасываем все чекбоксы
    document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Показываем все товары
    document.querySelectorAll('.catalog-container .product-card').forEach(product => {
        product.style.opacity = '1';
        product.style.visibility = 'visible';
        product.style.position = 'relative';
    });

    // Удаляем сообщение об отсутствии результатов
    const noResultsMessage = document.querySelector('.no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

function sortProducts(sortValue) {
    const productGrid = document.querySelector('.catalog-container .product-grid');
    const products = Array.from(productGrid.children);

    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.product-price strong').textContent.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.querySelector('.product-price strong').textContent.replace(/[^\d]/g, ''));
        const ratingA = a.querySelector('.product-rating').textContent.match(/\d+/)[0];
        const ratingB = b.querySelector('.product-rating').textContent.match(/\d+/)[0];

        switch(sortValue) {
            case 'Цене (по возрастанию)':
                return priceA - priceB;
            case 'Цене (по убыванию)':
                return priceB - priceA;
            case 'Популярности':
                return ratingB - ratingA;
            default:
                return 0;
        }
    });

    products.forEach(product => productGrid.appendChild(product));
}

// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция добавления товара в корзину
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('Товар добавлен в корзину');
}

// Функция сохранения корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция отображения уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Добавляем стили для разных типов уведомлений
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Цвета для разных типов уведомлений
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(notification);

    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Обработчик клика по кнопке "В корзину"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.querySelector('h4').textContent,
            name: productCard.querySelector('h4').textContent,
            price: parseInt(productCard.querySelector('.product-price strong').textContent.replace(/[^\d]/g, '')),
            image: productCard.querySelector('img').src
        };
        
        addToCart(product);
    }
});

function searchProducts(query) {
    const products = document.querySelectorAll('.catalog-container .product-card');
    const searchQuery = query.toLowerCase();

    products.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase();
        const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
        
        const matches = productName.includes(searchQuery) || productDescription.includes(searchQuery);
        product.style.display = matches ? 'block' : 'none';
    });
}

// Функциональность для отправки отзывов
function initReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('review-name');
            const textInput = document.getElementById('review-text');
            
            const name = nameInput.value.trim();
            const text = textInput.value.trim();
            
            if (!name || !text) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            // Создаем объект отзыва
            const review = {
                id: Date.now(),
                name: name,
                text: text,
                date: new Date().toLocaleDateString('ru-RU'),
                rating: 5, // По умолчанию 5 звезд
                category: 'Общий'
            };
            
            // Сохраняем отзыв в localStorage
            saveReview(review);
            
            // Очищаем форму
            reviewForm.reset();
            
            // Показываем уведомление об успехе
            showNotification('Спасибо! Ваш отзыв успешно отправлен.', 'success');
        });
    }
}

// Функция сохранения отзыва
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Добавляем CSS анимации для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);
