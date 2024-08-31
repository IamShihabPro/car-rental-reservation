// utils/calculateTotalCost.ts
export const calculateTotalCost = (startTime: string, endTime: string, pricePerHour: number) => {
  const start = new Date(`1970-01-01T${startTime}:00Z`);
  const end = new Date(`1970-01-01T${endTime}:00Z`);
  const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // duration in hours
  const totalCost = duration * pricePerHour;
  return parseFloat(totalCost.toFixed(2));;
};
