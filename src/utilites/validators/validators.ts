type fieldValidatorsType = (value: string) => string | undefined

export const required: fieldValidatorsType = (value) => {
    if (value) return undefined

    return 'Field is required'
}


export const maxLengthCreator = (maxLength: number): fieldValidatorsType => {
    return (value) => {
        if (value && value.length > maxLength) {
            return `Max length is ${maxLength} symbols`
        }
        return undefined
    }
}
