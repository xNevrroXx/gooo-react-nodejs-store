export const getNumberWithSpaces = (num: number): string => {
    const str = num.toString();
    let result: string = "";

    for (let i = str.length; i >= 0; i-=3) {
        result = str.slice(i-3, i) + " " + result;
        if(i === 2) {
            result = str.slice(i-2, i) + " " + result;
        }
        if(i === 1) {
            result = str.slice(i-1, i) + " " + result;
        }
    }

    return result;
}