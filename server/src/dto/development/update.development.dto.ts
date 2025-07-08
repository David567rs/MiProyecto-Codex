export class UpdateDevelopmentDto {
        records: {
                ageBlock: string;
                milestones: {
                        area: string;
                        question: string;
                        value: boolean;
                }[];
        }[];
}
