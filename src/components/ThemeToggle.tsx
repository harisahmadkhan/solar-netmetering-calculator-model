interface Props {
  isDark: boolean;
  toggle: () => void;
}

export default function ThemeToggle({ isDark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        bg-white/15 hover:bg-white/25 text-white transition-colors"
    >
      {isDark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}
