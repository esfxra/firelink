import { useEffect, useRef, useState } from 'react';
import { Flex, Input, Icon, IconButton } from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';

interface Props {
  initialValue: string;
  onSave: ({ value: string }) => void;
}

export default function LinkText({ initialValue, onSave }: Props) {
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
    onSave({ value });
    setEnabled(false);
  };

  return (
    <Flex alignItems="center">
      <Input
        mr={5}
        value={value}
        isDisabled={!enabled}
        onChange={handleChange}
        ref={inputRef}
      />
      {enabled && <CheckIcon cursor="pointer" onClick={handleSave} />}
      {!enabled && <EditIcon cursor="pointer" onClick={handleEdit} />}
    </Flex>
  );
}
