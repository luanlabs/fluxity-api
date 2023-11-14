import { Status } from '../../../models/Stream';

const calculateStreamStatus = (startDate: number, endDate: number): Status => {
  const dateNow = Number(String(new Date().getTime()).slice(0, 10));
  if (startDate > dateNow) {
    return Status.Pending;
  } else if (startDate <= dateNow && endDate > dateNow) {
    return Status.Ongoing;
  } else if (endDate < dateNow) {
    return Status.Expired;
  } else {
    return Status.Ongoing;
  }
};
export default calculateStreamStatus;
