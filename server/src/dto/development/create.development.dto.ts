export class CreateDevelopmentDto {
        childId: string;
        records: {
                ageBlock: string;
                milestones: {
                        area: string;
                        question: string;
                        value: boolean;
                }[];
        }[];
}
