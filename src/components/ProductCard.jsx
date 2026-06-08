import StatusBadge from './StatusBadge.jsx';

export default function ProductCard({ product, status, onOpen }) {
  const open = () => onOpen(product);

  return (
    <div
      className="app-product-card"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      }}
    >
      <div className="app-product-card__body">
        <div className="app-product-card__text">
          <div className="app-product-card__name">{product.name}</div>
          <div className="app-product-card__desc">{product.description}</div>
        </div>
        <img className="app-product-card__icon" src={product.icon} alt="" />
      </div>
      <div className="app-product-card__footer">
        <StatusBadge status={status} />
        <span className="app-tag">{product.category}</span>
      </div>
    </div>
  );
}
