
export const getEthInstance = ()=>{
    try {
        if (window.ethereum) {
            return window.ethereum
        } else {
            throw new Error("ethereum is not available")
        }
    }

    catch (err){
        console.error(err)
    }
};