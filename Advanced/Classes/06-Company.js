class Company {
    constructor (input){
        this.departments = {};
    }
    addEmployee(username, salary, position, department){
        if(username && position && department && salary >= 0){
            if(this.departments[department] == undefined){
                this.departments[department] = [];
            }
            this.departments[department].push({
                'name': username,
                'salary': salary,
                'position': position,
                'department': department
            }); 
            return `New employee is hired. Name: ${username}. Position: ${position}`;
        } else {
            throw new Error("Invalid input!");
        }

    }
    //This function should return the department 
    //with the highest average salary and its 
    //employees sorted by their salary by descending and by name in the following format:
    bestDepartment(){
        let bestDepartment = '';
        let bestAvg = 0;
        let departments = Object.keys(this.departments);
        departments.forEach(department => {
            // iterate throug department
            let totalSalary = 0;
            let currentDep = '';
            this.departments[department].forEach(user => {
                totalSalary += user.salary;
                currentDep = user.department;
            });
            const average = totalSalary / this.departments[department].length;
            if(average > bestAvg){
                bestDepartment = currentDep;
                bestAvg = average;
            }
        });

        let result = `Best Department is: ${bestDepartment}\nAverage salary: ${bestAvg.toFixed(2)}`;
        let newArr = this.departments[bestDepartment];
        newArr.sort((a,b) => b.salary - a.salary==0?a.name.localeCompare(b.name):b.salary - a.salary);
        newArr.forEach(user =>{
            result += `\n${user.name} ${user.salary} ${user.position}`;
        });
        return result;

    }
    
}
let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());