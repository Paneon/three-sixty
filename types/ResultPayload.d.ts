interface ResultPayload {
    individual: { values: { result: number; value: string }[] };
    improve: string[];
    name: string;
    team: { values: { result: number; value: string }[] };
    sustain: string[]
}