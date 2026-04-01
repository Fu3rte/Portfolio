import { prepare, layout } from '@chenglou/pretext';
import { useMemo } from 'react';

export function TextMeasure({
  text,
  maxWidth,
  font,
  lineHeight,
}: {
  text: string;
  maxWidth: number;
  font: string;
  lineHeight: number;
}) {
  // Phase 1: Prepare text once when content or font changes
  const prepared = useMemo(() => prepare(text, font), [text, font]);

  // Phase 2: Layout on every render/resize
  const { height, lineCount } = useMemo(
    () => layout(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight]
  );

  return (
    <div style={{ height }}>
      {text} ({lineCount} lines)
    </div>
  );
}
