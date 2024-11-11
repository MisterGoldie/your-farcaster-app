export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function logError(error: unknown) {
    // Using type assertion for error
    if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Error:', error.message);
    } else {
        // eslint-disable-next-line no-console
        console.error('Unknown error:', error);
    }
}