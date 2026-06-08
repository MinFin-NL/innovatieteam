import { useEffect, useRef } from 'react';
import { Heading, Button, ButtonLink, Icon, Paragraph } from '@rijkshuisstijl-community/components-react';
import StatusBadge from './StatusBadge.jsx';

// Detail view for a product. Built on the native <dialog> element so we get an
// accessible modal (focus trap + Escape to close) for free; clicking the
// backdrop (the dialog element itself) also closes it.
export default function ProductDialog({ product, status, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (product && dialog && !dialog.open) dialog.showModal();
  }, [product]);

  if (!product) return null;

  return (
    <dialog
      ref={ref}
      className="app-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
    >
      <div className="app-dialog__inner">
        <div className="app-dialog__header">
          <img className="app-dialog__icon" src={product.icon} alt="" />
          <Heading level={2} className="app-dialog__title">{product.name}</Heading>
          <span className="app-dialog__category">{product.category}</span>
        </div>

        <div className="app-dialog__body">
          <Paragraph>{product.description}</Paragraph>

          <div className="app-dialog__status">
            <span className="app-dialog__status-label">Systeemstatus</span>
            <StatusBadge status={status} />
          </div>

          <div className="app-dialog__actions">
            {product.url ? (
              <ButtonLink href={product.url} target="_blank" rel="noopener noreferrer" appearance="primary-action-button">
                Open tool <Icon icon="externe-link" />
              </ButtonLink>
            ) : (
              <Button appearance="primary-action-button" disabled>
                Geen link beschikbaar
              </Button>
            )}
            <Button appearance="secondary-action-button" onClick={() => ref.current?.close()}>
              Sluiten
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
