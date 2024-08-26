interface SwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ enabled, onChange }) => {
  const handleToggle = () => {
    onChange(!enabled);
  };

  return (
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={enabled}
        onChange={handleToggle}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        style={{
          right: enabled ? "0" : "auto",
          left: enabled ? "auto" : "0",
        }}
      />
      <label
        htmlFor="toggle"
        className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}
        style={{
          backgroundColor: enabled ? "#00DAE8" : "grey",
        }}
      ></label>
    </div>
  );
};

export default Switch;
