import { useRef, useEffect, useState } from 'react';
import styles from './TextField.module.css';

interface Props {
  label: string;
  initialValue: string;
  saveValue: ({}) => void;
}

/**
 * @todo Consider saving input using onBlur() listener, and removing save button.
 * This could potentially lead to unwanted mutations. A visual indicator would be needed.
 * Some throttling to when saves occur, or additional conditions could also be helpful.
 */
export default function TextField({ label, initialValue, saveValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const [enabled, setEnabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      inputRef.current.focus();
    }
  }, [enabled]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEdit = () => {
    setEnabled(true);
  };

  const handleSave = () => {
    saveValue({ value });
    setEnabled(false);
  };

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        disabled={!enabled}
        ref={inputRef}
        onChange={handleChange}
      />

      {enabled && (
        <button className={styles.saveButton} onClick={handleSave}>
          save
        </button>
      )}
      {!enabled && (
        <button className={styles.editButton} onClick={handleEdit}>
          edit
        </button>
      )}
    </div>
  );
}
