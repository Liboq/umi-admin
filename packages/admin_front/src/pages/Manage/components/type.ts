type RoomStatusType = 0 | 1 | 2;
type DataNumType = RoomStatusType[];
type DataType = {
  [key in RoomStatusType]: number;
};
type HotiePie = {
  data: number[];
};
