const puppeteer = require("puppeteer");

async function getGrades(matricula: string, birthday: string) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://www.sge8147.com.br/hlogin.aspx");

    await page.click("#span_MMODNOMEXIBICAO_0001");

    await page.waitForNavigation();

    await page.type("#_ALUMATP", matricula);
    await page.type("#_ALUDATNASP", birthday);

    await page.keyboard.press("Enter");

    await page.click("input[name=PESQUISAR]");

    await page.waitForNavigation();

    await page.click("#span__SECNUMSTR_0001");

    await page.waitForNavigation();

    const name = await page.evaluate(() => {
        let name = <HTMLCanvasElement>document.querySelector("#span_W0008_ALUNOM");

        return name.innerText;
    });

    page.click("#W0008TEXTBLOCK21");

   await page.waitForNavigation();
    interface Grades {

    }
    const grades: object = await page.evaluate(() => {
        let grades: any = {};
        for (let i = 1; i <= 9; i++) {
            const subjectEl = <HTMLCanvasElement>document.querySelector(
                `#span_W0029_DISNOM_000${i}`
            );
            const gradeEl1T = <HTMLCanvasElement>document.querySelector(`#span_W0029_NT1C_000${i}`);
            const gradeEl2T = <HTMLCanvasElement>document.querySelector(`#span_W0029_NT2C_000${i}`);

            grades[subjectEl.innerText] = (Number(gradeEl1T.innerText) + Number(gradeEl2T.innerText)) / 2;
        }

        return grades;
    });
    console.log(name)

    await browser.close();
    const subjectsExcluded: Array<string> = ['ENSINO RELIGIOSO', 'HISTÓRIA', 'EDUCACAO FÍSICA']

    for (let subject of subjectsExcluded) {
        delete grades[subject]
    }
    const mean: number = Object.values(grades).reduce((total, current) => total+current
    ) / Object.values(grades).length

    console.log(grades);

    return {"name": name, "mean": mean}
}

export = getGrades

if (require.main === module) {
    getGrades("1400037228", "27/06/2007");
}
