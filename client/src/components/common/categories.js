const price = {
    list: [{ _id: 0, name: 'Any', array: [] },
        { _id: 1, name: '$0 - $99', array: [0, 99] },
        { _id: 2, name: '$100 - $199', array: [100, 199] },
        { _id: 3, name: 'More than $200', array: [200, 100000] },
    ],
    loading: false
}
export { price }