export class CreateDevelopmentDto {
        childId: string;
        records: {
                ageBlock: string;
                milestones: { question: string; value: boolean }[];
        }[];
}