import { Position } from "./positon";

export interface Employee {
  id?: number;
  idNumber: number;
  name: string;
  photo: string;
  hireDate: Date;
  position: Position
}