import { Textarea } from '@nextui-org/react';

interface props {
  jsonText: string;
  setJsonText: (text: string) => void;
  setIsValid: (valid: boolean) => void;
  isValid: boolean;
  configurationsListLength: number;
  duplicate: boolean;
}

export const JsonBody = ({
  jsonText,
  setJsonText,
  setIsValid,
  isValid,
  configurationsListLength,
  duplicate,
}: props) => {
  const setJsonValue = async (e) => {
    setJsonText(e.target.value);
    try {
      JSON.parse(e.target.value);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      console.error('Invalid JSON:', error.message);
    }
  };

  return (
    <Textarea
      value={jsonText}
      onChange={setJsonValue}
      placeholder="Enter configuration here..."
      isInvalid={!isValid}
      errorMessage={isValid ? '' : 'Please enter a valid json'}
      disabled={!configurationsListLength ? duplicate : !duplicate}
    ></Textarea>
  );
};
