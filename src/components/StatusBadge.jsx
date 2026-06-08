import { DotBadge } from '@rijkshuisstijl-community/components-react';

// Maps a ping status onto an NLDS semantic colour token. DotBadge renders an
// accessible coloured dot as an SVG filled with `currentColor`, so we drive the
// colour by setting `color` inline. (Note: DotBadge overwrites any `className`
// passed to it, so the pulse animation lives on the wrapper instead.)
const STATUS = {
  up: { label: 'Online', token: 'var(--rhc-color-positive-default)' },
  down: { label: 'Offline', token: 'var(--rhc-color-negative-default)' },
  checking: { label: 'Controleren…', token: 'var(--rhc-color-warning-default)' },
  unknown: { label: 'Onbekend', token: 'var(--rhc-color-cool-grey-500)' },
};

export default function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.unknown;
  return (
    <span className="app-status">
      <span className={status === 'checking' ? 'app-status__dot--pulse' : undefined}>
        <DotBadge label={s.label} style={{ color: s.token }} />
      </span>
      <span className="app-status__label" style={{ color: s.token }}>{s.label}</span>
    </span>
  );
}
