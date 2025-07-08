export class UpdateDevelopmentDto {
        records: {
                ageBlock: string;
                milestones: { question: string; value: boolean }[];
        }[];
}
