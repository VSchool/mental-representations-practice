export const removeOneLine = (deletedLines, codeArray, whichLine) => {
    return codeArray.map((line, i)=>{
        if(i === whichLine || deletedLines.includes(i)){
            return "// code goes here"
        } else {
            return line
        }
    })
}

export const isThereAnyError = (usersCode, originalCode) => {
    console.log(originalCode.some((item, i) => {
        return item !== usersCode[i]
    }))
    return originalCode.some((item, i) => {
        return item !== usersCode[i]
    })
}