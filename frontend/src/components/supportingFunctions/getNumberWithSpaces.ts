export const getNumberWithSpaces = (num: number): string => {
    const str = num.toString();
    let result: string = "";

    for (let i = str.length; i >= 0; i-=3) {
        if (i > 3) {
            if (result === "") {
                result = str.slice(i-3, i);
                continue;
            }
            else {
                result = str.slice(i-3, i) + " " + result;
                continue;
            }
        }


        if (i === 3) {
            result = str.slice(i-3, i) + " " + result;
            break;
        }
        else if (i === 2) {
            result = str.slice(i-2, i) + " " + result;
            break;
        }
        else if (i === 1) {
            result = str.slice(i-1, i) + " " + result;
            break;
        }
    }

    return result;
}