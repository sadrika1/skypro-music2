const formatTwoDigits = (num: number) => {
    return num < 10 ? '0' + num : num;
}

export const formatSecondsToMMSS = (seconds: number) => {
    
    const date = new Date(seconds * 1000);
    //mm:ss
    return `${formatTwoDigits(date.getMinutes())}:${formatTwoDigits(date.getSeconds())}`
}
