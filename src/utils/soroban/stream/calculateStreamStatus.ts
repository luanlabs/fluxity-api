import { Status } from '../../../models/Stream';

const calculateStreamStatus = (startDate: number, endDate: number): Status => {
  const currentDate = Math.floor(Date.now() / 1000);
  if (startDate > currentDate) {
    return Status.Pending;
  } else if (startDate <= currentDate && endDate > currentDate) {
    return Status.Ongoing;
  } else {
    return Status.Expired;
  }
};
export default calculateStreamStatus;
