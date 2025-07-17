export class CreateDetectionDto {
        childId: string;
        responses: { question: string; value: boolean }[];
        observations: string;
        suspect: boolean;
}
