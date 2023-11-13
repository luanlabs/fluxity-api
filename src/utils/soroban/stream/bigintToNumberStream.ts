import { IStream } from '../../../models/Stream';

const bigintToNumberStream = (params: IStream) => {
  params.id_stream = Number(params.id_stream);
  params.amount = Number(params.amount);
  params.cancellable_date = Number(params.cancellable_date);
  params.cliff_date = Number(params.cliff_date);
  params.end_date = Number(params.end_date);
  params.start_date = Number(params.start_date);
  params.withdrawn = Number(params.withdrawn);
  return params;
};
export default bigintToNumberStream;
