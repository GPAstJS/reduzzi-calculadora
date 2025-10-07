/** @format */

export function stringReducer(param) {
    let split = param.split(' ');

    for (let i = 1; i < split.length - 1; i++) {
        if (split[i].length <= 2) {
            split[i] = split[i].slice(i, i);
        } else {
            split[i] = `${split[i][0]}.`;
        }
    }

    let newStr = split.filter((e) => e.length > 1);

    newStr = newStr.join(' ');

    return newStr;
}
