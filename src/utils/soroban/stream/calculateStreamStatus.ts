import { Status } from '../../../models/Stream';

const calculateStreamStatus = (startDate: number, endDate: number): Status => {
  const dateNow = new Date().getTime();
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
