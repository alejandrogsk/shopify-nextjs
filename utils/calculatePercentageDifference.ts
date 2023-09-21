function calculatePercentageDifference(a:number, b:number):number {
    const difference = a - b;
    if(difference === 100) return 50
    const percentageDifference = (difference / Math.abs(b)) * 100;
    return Math.floor(percentageDifference);
}
export default calculatePercentageDifference