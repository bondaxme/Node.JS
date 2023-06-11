// TASK 1

async function runSequent<T, R>(array: T[], callback: (item: T, index: number) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < array.length; i++) {
        const result = await callback(array[i], i);
        results.push(result);
    }
    return results;
}

async function main() {
    const array: Array<string> = ["one", "two", "three"];
    const results = await runSequent(array, async (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );

    console.log(results);
}

main();
