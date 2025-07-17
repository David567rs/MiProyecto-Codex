export class CreateAgeControlDto {
  childId: string;
  name: string;
  date: string;
  hour: string;
  controls: {
    age: string;
    weight: string;
    height: string;
    notes: string;
    medicalCheck: boolean;
  }[];
}