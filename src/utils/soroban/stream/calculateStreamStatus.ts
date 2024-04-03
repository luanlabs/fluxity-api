import { Status } from '../../../models/Stream';

const calculateStreamStatus = (startDate: number, endDate: number, cancellDate: number): Status => {
  if (cancellDate > 0) {
    return Status.Cancelled;
  }

  const currentDate = Math.floor(Date.now() / 1000);
  if (startDate > currentDate) {
    return Status.Pending;
  } else if (startDate <= currentDate && endDate > currentDate) {
    return Status.Ongoing;
  } else {
    return Status.Completed;
  }
};
export default calculateStreamStatus;
