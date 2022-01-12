export function setResData(name, value) {
    return {
        type: 'SET_RESUME_DATA',
        payload: { [name]: value },
    }
}