export interface ResponseTemplateType {
  status: 'error' | 'success';
  message: string;
  result?: object | string | null;
}
const responseTemplate = (params: ResponseTemplateType) => {
  const response = {
    status: params.status,
    message: params.message,
    result: params.result,
  };
  return response;
};

export default responseTemplate;
