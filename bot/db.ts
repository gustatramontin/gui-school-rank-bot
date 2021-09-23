import fs from 'fs'

interface Data {
    content: any
}

class DB {
    fileName: string 
    data: Object

    constructor(file: string = "grades.json") {
        this.fileName = file
        this.data = this.read_db()
    }

    read_db() {
        return require('../' + this.fileName) 
    }

    sortGrades() {

        const namesSortedByGrade = Object.keys(this.data).sort((a, b) => this.data[b] - this.data[a])
        console.log(namesSortedByGrade)
        const gradesSorted: object = {}
        for (let name of namesSortedByGrade) {
            gradesSorted[name] = this.data[name]
        }

        this.data = gradesSorted

    }

    save_db() {

        this.sortGrades()

        fs.writeFile(this.fileName, JSON.stringify(this.data), (err) => {
            if (err) throw err;
            
            console.log('Saved!');
        })
    }
    
    addGrade(name: string, mean: number) {
        this.data[name] = mean

        this.save_db()
    }

    getGrade(name: string) {
        return this.data[name]
    }

    getGrades() {
        return this.data
    }
}

export default DB