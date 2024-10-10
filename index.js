// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   
}
function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));

}

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    }
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date===date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    }
    return 0;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wages = hoursWorked * employee.payPerHour;
    return wages;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, timeIn) => {
        const date = timeIn.date;
        return total + wagesEarnedOnDate(employee, date);
    }, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}
