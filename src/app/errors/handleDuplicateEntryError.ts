import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateEntryError = (
  err:any
): TGenericErrorResponse => {
    const match = err.message.match(/"([^"])"/)
    const extractedMessage = match && match[1]
  const statusCode = 400;

  const errorSources: TErrorSource = [
    {
      path: ``,
      message: `${extractedMessage} is already exists in the Database`,
    },
  ];

  return {
    statusCode,
    message: 'Duplication Error',
    errorSources,
  };
};
