// Vite entrypoint for the Product Highlight section.
// Importing the SCSS here lets Vite compile + emit assets/product-highlight.css,
// which the Liquid section loads via a stylesheet_tag.
import '../styles/product-highlight.scss';

/**
 * <product-highlight> — selecting a product in the row updates the featured
 * panel (image / title / price / link) from data-* attributes, with no reload
 * and no fetch. Written as a web component so each section instance is
 * self-contained and re-initialises when the theme editor re-renders it.
 */
class ProductHighlight extends HTMLElement {
  connectedCallback() {
    this.panel = this.querySelector('[data-featured]');
    this.featured = {
      link: this.querySelector('[data-featured-link]'),
      // image_tag doesn't take a data-* hook, so target the featured img by class.
      image: this.querySelector('img.product-highlight__featured-image'),
      title: this.querySelector('[data-featured-title]'),
      price: this.querySelector('[data-featured-price]'),
      cta: this.querySelector('[data-featured-cta]'),
    };

    // CTA labels come from Liquid so they stay translatable.
    this.selectLabel = this.dataset.labelSelect || 'Select';
    this.selectedLabel = this.dataset.labelSelected || 'Selected';

    this.selectors = Array.from(this.querySelectorAll('[data-selector]'));
    if (this.selectors.length === 0) return;

    this.addEventListener('click', this.onClick.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));

    // Roving tabindex: only the selected tab is in the tab order.
    this.selectors.forEach((btn) => {
      btn.tabIndex = btn.getAttribute('aria-selected') === 'true' ? 0 : -1;
    });
  }

  onClick(event) {
    const button = event.target.closest('[data-selector]');
    if (button) this.select(button);
  }

  onKeydown(event) {
    const current = event.target.closest('[data-selector]');
    if (!current) return;

    const index = this.selectors.indexOf(current);
    let nextIndex = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % this.selectors.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + this.selectors.length) % this.selectors.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = this.selectors.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const next = this.selectors[nextIndex];
    this.select(next);
    next.focus();
  }

  // Feature the given button's product and sync ARIA + tab order.
  select(button) {
    this.selectors.forEach((btn) => {
      const isSelected = btn === button;
      btn.setAttribute('aria-selected', String(isSelected));
      btn.tabIndex = isSelected ? 0 : -1;
      const cta = btn.querySelector('[data-cta]');
      if (cta) cta.textContent = isSelected ? this.selectedLabel : this.selectLabel;
    });

    // Point the tabpanel's accessible name at the newly selected tab.
    if (this.panel && button.id) this.panel.setAttribute('aria-labelledby', button.id);

    const data = button.dataset;

    if (this.featured.title) this.featured.title.textContent = data.title || '';
    if (this.featured.price) this.featured.price.textContent = data.price || '';
    if (this.featured.link && data.url) this.featured.link.href = data.url;
    if (this.featured.cta && data.url) {
      this.featured.cta.href = data.url;
      // Keep the link purpose product-specific for screen readers.
      this.featured.cta.setAttribute('aria-label', `${this.featured.cta.textContent}: ${data.title || ''}`);
    }

    if (this.featured.image) {
      if (data.image) {
        this.featured.image.src = data.image;
        this.featured.image.srcset = data.image400
          ? `${data.image400} 400w, ${data.image} 800w`
          : '';
        this.featured.image.alt = data.imageAlt || '';
      } else {
        this.featured.image.removeAttribute('srcset');
        this.featured.image.alt = '';
      }
    }
  }
}

// Guard against double-registration.
if (!customElements.get('product-highlight')) {
  customElements.define('product-highlight', ProductHighlight);
}
