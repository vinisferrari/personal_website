document.addEventListener('DOMContentLoaded', () => {
    const headerNoDrawer = document.querySelector('header.no-drawer');
    const headerWithDrawer = document.querySelector('header.with-drawer');
    const Drawer = document.getElementById('bar-drawer-menu');

    const placeholders = {
        'no-drawer': createPlaceholder(),
        'with-drawer': createPlaceholder()
    };

    function createPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.classList.add('header-placeholder');
        return placeholder;
    }

    function addPlaceholder(header, placeholder) {
        if (header) {
            header.parentNode.insertBefore(placeholder, header.nextSibling);
        }
    }

    function removePlaceholder(placeholder) {
        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
    }

    function initializePlaceholders() {
        if (headerNoDrawer) addPlaceholder(headerNoDrawer, placeholders['no-drawer']);
        if (headerWithDrawer) addPlaceholder(headerWithDrawer, placeholders['with-drawer']);
    }

    let lastScrollTop = 0;
    let isFixedNoDrawer = false;
    let isFixedWithDrawer = false;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (window.innerWidth > 720) {
            isFixedNoDrawer = manageHeader(headerNoDrawer, 'no-drawer', scrollTop, isFixedNoDrawer);
            if (headerWithDrawer) removePlaceholder(placeholders['with-drawer']);
        } else {
            isFixedWithDrawer = manageHeader(headerWithDrawer, 'with-drawer', scrollTop, isFixedWithDrawer);
            if (headerNoDrawer) removePlaceholder(placeholders['no-drawer']);
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    function manageHeader(header, type, scrollTop, isFixed) {
        const Drawer = document.getElementById('bar-drawer-menu');
        if (!Drawer.classList.contains('opened')) {
            const headerHeight = header.offsetHeight;


            if (scrollTop > headerHeight) {
                if (!isFixed && scrollTop < lastScrollTop) {
                    header.classList.add('fixed');
                    placeholders[type].style.display = 'block';
                    isFixed = true;
                    header.classList.remove('static');
                }

                if (scrollTop > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            } else {
                if (isFixed && scrollTop > lastScrollTop) {
                    header.classList.add('static');
                    header.classList.remove('fixed');
                    placeholders[type].style.display = 'none';
                    isFixed = false;
                }
            }

            return isFixed;

        }
    }

    function handleResize() {
        removePlaceholder(placeholders['no-drawer']);
        removePlaceholder(placeholders['with-drawer']);

        if (window.innerWidth > 720 && headerNoDrawer) {
            addPlaceholder(headerNoDrawer, placeholders['no-drawer']);
        } else if (window.innerWidth <= 720 && headerWithDrawer) {
            addPlaceholder(headerWithDrawer, placeholders['with-drawer']);
        }

        handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    initializePlaceholders();
    handleScroll();
});