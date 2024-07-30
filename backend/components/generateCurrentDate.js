function currentDate() {
    const options = { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date().toLocaleString('en-US', options).split(', ')[0];
    const sepDate = formattedDate.split('/');
    const currentDate = new Date(`${sepDate[2]}-${sepDate[0]}-${sepDate[1]}`);

    return currentDate
}
module.exports = currentDate;