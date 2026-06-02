

export const signup = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body

        console.log(userName, email, password)
    } catch (error) {
        next(error)
    }
}