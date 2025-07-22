
import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const Tooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{ background: '#1b1c3a', color: 'white', padding: 10, borderRadius: 6 }}>
      <strong>{label}</strong>
      <ul style={{ padding: 0, margin: '8px 0 0 0', listStyle: 'none' }}>
        {payload.map((entry, index) => (
          <li key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value} %
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;