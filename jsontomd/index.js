const fs = require('fs');
const path = require('path');

function convertJsonToMdx(jsonData) {

    let syntax = jsonData.syntax.split('\n')

    let syntaxCode = syntax.shift();

    let newSyntax = []

    syntax.map(element => {
        let arr = element.split(' ')
        if (arr[0].length > 0) {
            arr[0] = `**${arr[0]}**`
        }
        
        newSyntax.push(arr.join(' '))
    });

    syntax = newSyntax

    newSyntax = []

    syntax.forEach((el) => {
        newSyntax.push(el.replace(/\{/g, `\\{`).replace(/\}/g, `\\}`).replace(/\</g, `\\<`).replace(/\>/g, `\\>`));
    })


    syntax = newSyntax.join(' <br /> ')

    let details = jsonData.details.split('\n')

    let newDetails = []
    details.forEach((el) => {
        newDetails.push(el.replace(/\{/g, `\\{`).replace(/\}/g, `\\}`).replace(/\</g, `\\<`).replace(/\>/g, `\\>`));
    })

    details = newDetails.join(' <br /> ')


    return (
`<details>
    <summary>**${jsonData.name}** - ${jsonData.description}</summary>
    
    **pg. ${jsonData.page}**

    ## Syntax

    \`${syntaxCode}\` <br />
    ${syntax}

    ## Details
    ${details}

</details>

`);
}

function main() {
    const inputFilePath = path.join(__dirname, './input/instructions.json');
    const outputFilePath = path.join(__dirname, 'output.mdx');
    
    if (!fs.existsSync(inputFilePath)) {
        console.error('Input file not found');
        process.exit(1);
    }

    const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

    
    let mdxContent = []
    jsonData.instructions.forEach((jdata) => {
        let newData = convertJsonToMdx(jdata)
        console.log(newData)
        mdxContent.push(newData);
    }) 

    mdxContent = mdxContent.join('')
    //console.log()    
    
    fs.writeFileSync(outputFilePath, mdxContent, 'utf8');
    console.log('MDX file created successfully:', outputFilePath);
}

main();
