import { useJsonView } from './hooks';
import { JsonBody, ButtonsFooter } from './components';

interface props {
  configurationId: string;
  configurationsListLength: number;
  environmentId: string;
  applicationId: string;
}

export const JsonView = ({
  configurationId,
  configurationsListLength,
  applicationId,
  environmentId,
}: props) => {
  const {
    isActive,
    activateConfiguration,
    addConfiguration,
    jsonText,
    setJsonText,
    setDuplicate,
    isValid,
    setIsValid,
    duplicate,
  } = useJsonView({
    configurationId,
    applicationId,
    environmentId,
  });

  return (
    <div className="w-full gap-4 flex flex-col justify-between">
      <JsonBody
        jsonText={jsonText}
        setJsonText={(text: string) => setJsonText(text)}
        setIsValid={(valid: boolean) => setIsValid(valid)}
        isValid={isValid}
        configurationsListLength={configurationsListLength}
        duplicate={duplicate}
      />

      <ButtonsFooter
        configurationsListLength={configurationsListLength}
        activateConfiguration={activateConfiguration}
        isActive={isActive}
        addConfiguration={addConfiguration}
        duplicate={duplicate}
        setDuplicate={(value: boolean) => setDuplicate(value)}
      />
    </div>
  );
};
